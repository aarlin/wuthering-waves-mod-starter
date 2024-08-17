"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdventureGuideModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	MonsterDetectionFilterAll_1 = require("../../../Core/Define/ConfigQuery/MonsterDetectionFilterAll"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	IEntity_1 = require("../../../UniverseEditor/Interface/IEntity"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	AdventureDefine_1 = require("./AdventureDefine"),
	AdventureGuideController_1 = require("./AdventureGuideController"),
	ENERGYCOST_ID = 5;
class AdventureGuideModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.a5e = new Map()),
			(this.CurrentGuideTabName = void 0),
			(this.h5e = new Map()),
			(this.l5e = 0),
			(this._5e = 0),
			(this.u5e = 0),
			(this.c5e = 0),
			(this.m5e = 0),
			(this.d5e = 0),
			(this.C5e = void 0),
			(this.g5e = 0),
			(this.f5e = 0),
			(this.p5e = 0),
			(this.v5e = 0),
			(this.M5e = 0),
			(this.S5e = 0),
			(this.E5e = !1),
			(this.CurrentMonsterId = 0),
			(this.CurrentSilentId = 0),
			(this.y5e = new Map()),
			(this.I5e = new Map()),
			(this.T5e = new Map()),
			(this.AllMonsterDetectionRecord = new Map()),
			(this.AllDungeonDetectionRecord = new Map()),
			(this.AllSilentAreaDetectionRecord = new Map()),
			(this.L5e = 0),
			(this.D5e = 0),
			(this.CurrentShowLevel = 1),
			(this.R5e = new Map()),
			(this.TypeUnLockMap = new Map()),
			(this.GuideTypeUnLockMap = new Map()),
			(this.U5e = void 0),
			(this.A5e = new Array());
	}
	UpdateSilentFirstAwards(e, t = !1) {
		t
			? this.a5e.set(e, Protocol_1.Aki.Protocol.GBs.qms)
			: this.a5e.set(e, Protocol_1.Aki.Protocol.GBs.Proto_IsFinish),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SilentRewardReceived,
				e,
			);
	}
	OnLeaveLevel() {
		return (
			ControllerHolder_1.ControllerHolder.AdventureGuideController.CancelDetectingRequest(),
			!0
		);
	}
	GetSilentFirstAwardById(e) {
		return this.a5e.get(e);
	}
	CheckCanGetFirstAward() {
		for (const e of this.a5e.values())
			if (e === Protocol_1.Aki.Protocol.GBs.Proto_IsFinish) return !0;
		return !1;
	}
	CheckCanGetFirstAwardById(e) {
		return (
			!!(e = this.a5e.get(e)) &&
			e === Protocol_1.Aki.Protocol.GBs.Proto_IsFinish
		);
	}
	CheckCanGetFirstAwardByTypeId(e) {
		for (const t of this.a5e) {
			if (
				this.GetSilentAreaDetectData(t[0]).Conf.Secondary === e &&
				t[1] === Protocol_1.Aki.Protocol.GBs.Proto_IsFinish
			)
				return !0;
		}
		return !1;
	}
	GetAdventureGuideTabList() {
		var e =
				ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
					"AdventureGuideView",
				),
			t = e.length,
			n = [];
		let o = -1;
		var r = this.GetAllTaskFinish();
		for (let s = 0; s < t; s++) {
			var i = e[s];
			r && "AdventureTargetView" === i.ChildViewName
				? (o = s)
				: this.GetIsTabViewHaveData(i.ChildViewName) &&
					ModelManager_1.ModelManager.FunctionModel.IsOpen(i.FunctionId) &&
					n.push(i);
		}
		return -1 !== o && n.push(e[o]), n;
	}
	GetReceivedChapter() {
		return this.D5e;
	}
	GetNowChapter() {
		return this.L5e;
	}
	GetIsFromManualDetect() {
		return this.E5e;
	}
	SetFromManualDetect(e) {
		this.E5e = e;
	}
	SetNowChapter(e) {
		this.L5e = e;
	}
	SetReceivedChapter(e) {
		this.D5e = e;
	}
	SetTaskById(e, t, n) {
		var o = this.GetTaskRecordById(e);
		o
			? ((o.Status = t), (o.Progress = n))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("AdventureGuide", 5, "开拓任务id不存在", ["Id", e]);
	}
	GetDetectingMonsterMarkId() {
		return this.c5e;
	}
	GetDetectingDungeonMarkId() {
		return this.m5e;
	}
	GetDetectingSilentAreaMarkId() {
		return this.d5e;
	}
	GetDetectingSlientAreaMarkType() {
		return this.C5e;
	}
	GetCurDetectingMonsterConfId() {
		return this.l5e;
	}
	GetCurDetectingDungeonConfId() {
		return this._5e;
	}
	GetCurDetectingSilentAreaConfId() {
		return this.u5e;
	}
	GetMonsterDetectData(e) {
		return this.AllMonsterDetectionRecord.get(e);
	}
	GetDetectingMonsterId() {
		return this.g5e;
	}
	SetDetectingMonsterId(e) {
		this.g5e = e;
	}
	SetDetectingDungeonId(e) {
		this.f5e = e;
	}
	GetDetectingDungeonId() {
		return this.f5e;
	}
	SetDetectingSilentAreaId(e) {
		this.p5e = e;
	}
	GetDetectingSilentAreaId() {
		return this.p5e;
	}
	GetPendingMonsterConfId() {
		return this.v5e;
	}
	GetPendingDungeonConfId() {
		return this.M5e;
	}
	GetPendingSilentAreaConfId() {
		return this.S5e;
	}
	GetChapterProgress(e) {
		var t = { Received: 0, Total: (e = this.h5e.get(e)).length };
		for (const n of e)
			n.Status >= Protocol_1.Aki.Protocol.bBs.Proto_Received && t.Received++;
		return t;
	}
	GetLevelOfLevelPlay(e) {
		if (
			void 0 ===
			(e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e))
		)
			return 0;
		let t = 0;
		if (e.ReferenceAllEntity)
			for (const r of e.ReferenceAllEntity) {
				var n,
					o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(r);
				void 0 === o
					? Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("AdventureGuide", 10, "玩法关联实体丢失", [
							"entity ",
							r,
						])
					: ((n = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
							o.BlueprintType,
						)),
						(o = (0, IEntity_1.decompressEntityData)(o, n)),
						(n = (0, IComponent_1.getComponent)(
							o.ComponentsData,
							"AttributeComponent",
						)).Level > t && (t = n.Level));
			}
		return t;
	}
	GetCostOfLevelPlay(e) {
		return void 0 ===
			(e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e)) ||
			"None" === (e = e.LevelPlayRewardConfig).Type ||
			"Variable" === e.Type
			? 0
			: ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(
					e.RewardId,
				).Cost.get(5);
	}
	GetPlayLevelPosition(e) {
		return (
			(e = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(e)),
			(e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
				e.LevelPlayEntityId,
			)),
			Vector_1.Vector.Create(
				e.Transform.Pos.X,
				e.Transform.Pos.Y,
				e.Transform.Pos.Z,
			)
		);
	}
	GetSilentAreaDetectData(e) {
		return this.AllSilentAreaDetectionRecord.get(e);
	}
	GetSoundAreaDetectData(e) {
		return this.AllDungeonDetectionRecord.get(e);
	}
	GetAllDetectMonsters() {
		return this.AllMonsterDetectionRecord;
	}
	GetAllDetectDungeons() {
		return this.AllDungeonDetectionRecord;
	}
	GetCanShowDungeonRecordsByType(e, t) {
		var n = new Array();
		if ((e = this.R5e.get(e)))
			for (const o of e)
				(t && o.DungeonDetectionRecord.Conf.MatType !== t) ||
					o.IsLock ||
					n.push(o);
		return n;
	}
	GetAllDetectSilentAreas() {
		return this.AllSilentAreaDetectionRecord;
	}
	GetDungeonDetectRecordByEntryId(e) {
		for (const n of this.AllDungeonDetectionRecord.keys()) {
			var t = this.AllDungeonDetectionRecord.get(n);
			if (t.Conf.DungeonId === e) return t;
		}
	}
	GetAllTaskFinish() {
		for (var [, e] of this.h5e)
			for (const t of e)
				if (t.Status !== Protocol_1.Aki.Protocol.bBs.Proto_Received) return !1;
		return !0;
	}
	SetCurDetectingMonsterConfId(e) {
		0 !== this.l5e &&
			(this.AllMonsterDetectionRecord.get(this.l5e).IsTargeting = !1);
		var t = this.AllMonsterDetectionRecord.get(e);
		void 0 !== t && (t.IsTargeting = !0), (this.l5e = e);
	}
	SetDetectingMonsterRefreshTime(e, t) {
		this.AllMonsterDetectionRecord.get(e).RefreshTime = t;
	}
	SetCurDetectingDungeonConfId(e) {
		0 !== this._5e &&
			(this.AllDungeonDetectionRecord.get(this._5e).IsTargeting = !1);
		var t = this.AllDungeonDetectionRecord.get(e);
		void 0 !== t && (t.IsTargeting = !0), (this._5e = e);
	}
	SetCurDetectingMonsterMarkId(e) {
		this.c5e = e;
	}
	SetDetectingDungeonMarkId(e) {
		this.m5e = e;
	}
	SetDetectingSilentAreaMarkId(e, t) {
		(this.d5e = e), (this.C5e = t);
	}
	SetCurDetectingSilentAreaConfId(e) {
		var t = this.AllSilentAreaDetectionRecord.get(this.u5e);
		(t =
			(0 !== this.u5e && t && (t.IsTargeting = !1),
			this.AllSilentAreaDetectionRecord.get(e))) && (t.IsTargeting = !0),
			(this.u5e = e);
	}
	GetSilentAreaConfVaild(e) {
		return !!this.AllSilentAreaDetectionRecord.get(e);
	}
	OnInit() {
		return this.InitAdventureTaskConfig(), !0;
	}
	InitDetectionData() {
		var e;
		for (const e of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllMonsterDetection())
			this.AllMonsterDetectionRecord.set(
				e.Id,
				new AdventureDefine_1.MonsterDetectionRecord(e, 0 !== e.LockCon, 0),
			);
		for (const e of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllDungeonDetection()) {
			var t = new AdventureDefine_1.DungeonDetectionRecord(
				e,
				0 !== e.LockCon,
				0,
			);
			this.AllDungeonDetectionRecord.set(e.Id, t);
			let n = this.R5e.get(e.Secondary);
			n || ((n = []), this.R5e.set(e.Secondary, n)),
				(t = new AdventureDefine_1.SoundAreaDetectionRecord(0, t)),
				n.push(t);
		}
		for (const e of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllSilentAreaDetection()) {
			var n = new AdventureDefine_1.SilentAreaDetectionRecord(
				e,
				0 !== e.LockCon,
				0,
			);
			this.AllSilentAreaDetectionRecord.set(e.Id, n);
			let t = this.R5e.get(e.Secondary);
			t || ((t = []), this.R5e.set(e.Secondary, t)),
				(n = new AdventureDefine_1.SoundAreaDetectionRecord(1, void 0, n)),
				t.push(n);
		}
		for ([e] of this.R5e)
			ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetSecondaryGuideDataConf(
				e,
			)?.ConditionGroupId || this.TypeUnLockMap.set(e, !0);
		ControllerHolder_1.ControllerHolder.AdventureGuideController.GetDetectionLabelInfoRequest();
	}
	UpdateByAdventureManualResponse(e) {
		if (e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys)
			ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
				e.Kms,
				28834,
			);
		else {
			(this.L5e = e.ggs.hgs), (this.D5e = e.ggs.lgs);
			for (const t of e.ggs.ags) this.P5e(t);
			for (const t of e.fgs) this.x5e(t);
			if (
				(this.HandleMonsterDetectLockStatus(e.pgs),
				this.a5e.clear(),
				0 !== e.Sgs.size)
			)
				for (const o of Object.keys(e.Sgs)) {
					var t = e.Sgs[o],
						n = Number(o);
					this.a5e.set(n, t),
						t === Protocol_1.Aki.Protocol.GBs.Proto_IsFinish &&
							ControllerHolder_1.ControllerHolder.AdventureGuideController.EmitRedDotFirstAwardEvent(
								n,
							);
				}
		}
	}
	HandleMonsterDetectLockStatus(e) {
		for (const n of e.dgs) {
			var t = this.GetMonsterDetectData(n);
			void 0 !== t && (t.IsLock = !1);
		}
		for (const t of e.mgs) {
			var n = this.GetSoundAreaDetectData(t);
			void 0 !== n && (n.IsLock = !1);
		}
		for (const t of e.Cgs) {
			var o = this.GetSilentAreaDetectData(t);
			void 0 !== o && (o.IsLock = !1);
		}
	}
	P5e(e) {
		var t =
			ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAdventureTaskConfig(
				e.Ekn,
			);
		if (t) {
			var n = t.ChapterId,
				o = this.h5e.get(n);
			let r;
			void 0 === o ? ((r = new Array()), this.h5e.set(n, r)) : (r = o),
				void 0 !== (n = r.find((t) => t.AdventureTaskBase.Id === e.Ekn))
					? ((n.Progress = e.sgs), (n.Status = e.ckn))
					: r.push(new AdventureDefine_1.AdventureTaskRecord(t, e.ckn));
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("AdventureGuide", 5, "找不到id为的开拓任务", [
					"task.Proto_Id",
					e.Ekn,
				]);
	}
	x5e(e) {
		switch (e.Ikn) {
			case Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster:
				void 0 !== (t = this.AllMonsterDetectionRecord.get(e.C3n))
					? t.RefreshTime > e.cgs && (t.RefreshTime = e.cgs)
					: ((t =
							ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMonsterDetectionConfById(
								e.C3n,
							)),
						this.AllMonsterDetectionRecord.set(
							e.C3n,
							new AdventureDefine_1.MonsterDetectionRecord(
								t,
								0 === t.LockCon,
								e.cgs,
							),
						));
				break;
			case Protocol_1.Aki.Protocol.d3n.Proto_Dungeon:
				if (void 0 !== (t = this.AllDungeonDetectionRecord.get(e.C3n)))
					t.RefreshTime > e.cgs && (t.RefreshTime = e.cgs);
				else {
					var t =
							ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDungeonDetectionConfById(
								e.C3n,
							),
						n = new AdventureDefine_1.DungeonDetectionRecord(
							t,
							0 === t.LockCon,
							e.cgs,
						);
					this.AllDungeonDetectionRecord.set(e.C3n, n);
					let o = this.R5e.get(t.Secondary);
					o || ((o = []), this.R5e.set(t.Secondary, o)),
						(t = new AdventureDefine_1.SoundAreaDetectionRecord(0, n)),
						o.push(t);
				}
				break;
			case Protocol_1.Aki.Protocol.d3n.Proto_SilentArea:
				if (void 0 !== (n = this.AllSilentAreaDetectionRecord.get(e.C3n)))
					n.RefreshTime > e.cgs && (n.RefreshTime = e.cgs);
				else {
					(t =
						ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSilentAreaDetectionConfById(
							e.C3n,
						)),
						(n = new AdventureDefine_1.SilentAreaDetectionRecord(
							t,
							0 === t.LockCon,
							e.cgs,
						)),
						this.AllSilentAreaDetectionRecord.set(e.C3n, n),
						this.UpdateDetectSilentAreas(n);
					let o = this.R5e.get(n.Conf.Secondary);
					o || ((o = []), this.R5e.set(n.Conf.Secondary, o)),
						(t = new AdventureDefine_1.SoundAreaDetectionRecord(1, void 0, n)),
						o.push(t);
				}
		}
	}
	GetChapterTasks(e) {
		return this.h5e.get(e);
	}
	SortChapterTasks(e) {
		var t = this.h5e.get(e);
		return (
			t.sort((e, t) => {
				var n =
						e.Status < Protocol_1.Aki.Protocol.bBs.Proto_Received
							? e.Status
							: -e.Status,
					o =
						t.Status < Protocol_1.Aki.Protocol.bBs.Proto_Received
							? t.Status
							: -t.Status;
				return n !== o
					? o - n
					: e.AdventureTaskBase.Id - t.AdventureTaskBase.Id;
			}),
			this.h5e.set(e, t),
			t
		);
	}
	GetTaskRecordById(e, t) {
		let n;
		if (0 !== t && void 0 !== t) {
			for (const o of (n = this.h5e.get(t)))
				if (o.AdventureTaskBase.Id === e) return o;
		} else
			for (const t of this.h5e.keys())
				for (const o of (n = this.h5e.get(t)))
					if (o.AdventureTaskBase.Id === e) return o;
	}
	InitAdventureTaskConfig() {
		for (const t of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetAllAdventureTaskConfig()) {
			var e = t.ChapterId;
			let n;
			void 0 === this.h5e.get(e)
				? ((n = new Array()), this.h5e.set(e, n))
				: (n = this.h5e.get(e)),
				n.push(
					new AdventureDefine_1.AdventureTaskRecord(
						t,
						Protocol_1.Aki.Protocol.bBs.Proto_UnFinish,
					),
				);
		}
	}
	GetMaxLevelOfBlueprintType(e) {
		var t =
			ModelManager_1.ModelManager.CreatureModel.GetAllEntityIdOfBlueprintType(
				e,
			);
		let n = 0;
		0 === t.length &&
			Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn("AdventureGuide", 10, "未找到实体配置", ["type ", e]);
		for (const e of t) {
			var o = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);
			void 0 !== o?.ComponentsData &&
				(o = (0, IComponent_1.getComponent)(
					o.ComponentsData,
					"AttributeComponent",
				)).Level > n &&
				(n = o.Level);
		}
		return n;
	}
	GetSilentAreaLevel(e) {
		if (
			((e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(e)),
			void 0 !== e?.ComponentsData)
		)
			return (0, IComponent_1.getComponent)(
				e.ComponentsData,
				"AttributeComponent",
			).Level;
	}
	UpdatePendingMonsterList(e, t) {
		if (0 !== e.length) {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"AdventureGuide",
					5,
					"更新怪物探测信息",
					["怪物id", e[0].Ekn],
					["探测id", e[0].C3n],
					["RefreshTime", e[0].cgs],
				),
				t !== this.GetCurDetectingMonsterConfId() &&
					(this.y5e.clear(), (this.v5e = t));
			for (const t of e) {
				var n = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t.Ekn)
					.Transform.Pos;
				n = {
					Id: t.Ekn,
					RefreshTime: t.cgs,
					PositionX: n.X,
					PositionY: n.Y,
					PositionZ: n.Z,
				};
				this.y5e.set(t.Ekn, n);
			}
		}
	}
	UpdatePendingDungeonList(e, t) {
		t !== this.GetCurDetectingDungeonConfId() &&
			(this.I5e.clear(), (this.M5e = t));
		for (const t of e) {
			var n;
			t.ugs
				? ((n =
						ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
							t.Ekn,
						)),
					(n = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
						n.TeleportEntityConfigId,
					)) &&
						((n = {
							Id: t.Ekn,
							RefreshTime: t.cgs,
							PositionX: n.Transform.Pos.X ?? 0,
							PositionY: n.Transform.Pos.Y ?? 0,
							PositionZ: n.Transform.Pos.Z ?? 0,
						}),
						this.I5e.set(t.Ekn, n)))
				: this.I5e.delete(t.Ekn);
		}
	}
	UpdatePendingSilentAreaList(e, t) {
		t !== this.GetCurDetectingSilentAreaConfId() &&
			(this.T5e.clear(), (this.S5e = t));
		for (const t of e) {
			var n;
			t.ugs
				? void 0 !==
						(n = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayConfig(
							t.Ekn,
						)) &&
					((n = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
						n.LevelPlayEntityId,
					).Transform.Pos),
					(n = {
						Id: t.Ekn,
						RefreshTime: t.cgs,
						PositionX: n.X,
						PositionY: n.Y,
						PositionZ: n.Z,
					}),
					this.T5e.set(t.Ekn, n))
				: this.T5e.delete(t.Ekn);
		}
	}
	GetMonsterPendingList() {
		return this.y5e;
	}
	GetDungeonPendingList() {
		return this.I5e;
	}
	GetSilentAreaPendingList() {
		return this.T5e;
	}
	IsTaskOfChapter(e, t) {
		return this.GetTaskRecordById(e).AdventureTaskBase.ChapterId === t;
	}
	CleanCurTrackingMonster() {
		var e = this.GetMonsterDetectData(this.l5e);
		e && (e.IsTargeting = !1),
			this.SetCurDetectingMonsterConfId(0),
			this.SetCurDetectingMonsterMarkId(0),
			this.SetDetectingMonsterId(0);
	}
	CleanCurTrackingDungeon() {
		var e = this.GetSoundAreaDetectData(this._5e);
		e && (e.IsTargeting = !1),
			this.SetCurDetectingDungeonConfId(0),
			this.SetDetectingDungeonMarkId(0),
			this.SetDetectingDungeonId(0);
	}
	CleanCurTrackingSilentArea() {
		var e = this.GetSilentAreaDetectData(this.u5e);
		e && (e.IsTargeting = !1),
			this.SetCurDetectingSilentAreaConfId(0),
			this.SetDetectingSilentAreaMarkId(0),
			this.SetDetectingSilentAreaId(0);
	}
	GetAllCulledMonsters() {
		var e;
		return (
			this.U5e ||
				((e =
					MonsterDetectionFilterAll_1.configMonsterDetectionFilterAll.GetConfigList()),
				(this.U5e = e ? new Set(e.map((e) => e.EntityConfigId)) : new Set())),
			this.U5e
		);
	}
	CheckTargetDungeonTypeCanShow(e) {
		return this.TypeUnLockMap.get(e);
	}
	GetAllCanShowDungeonTypeList() {
		let e;
		e = "NewSoundAreaView" === this.CurrentGuideTabName ? 3 : 2;
		var t,
			n,
			o = new Array();
		for ([t, n] of this.R5e) {
			var r = n[0];
			(0 === r.Type && r.DungeonDetectionRecord.Conf.GuideId !== e) ||
				(1 === r.Type && r.SilentAreaDetectionRecord.Conf.GuideId !== e) ||
				(this.CheckTargetDungeonTypeCanShow(t) && o.push(t));
		}
		return o.sort(
			(e, t) =>
				ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
					e,
				).SortNumber -
				ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
					t,
				).SortNumber,
		);
	}
	GetIsTabViewHaveData(e) {
		let t;
		if (
			("NewSoundAreaView" === e
				? (t = 3)
				: "DisposableChallengeView" === e && (t = 2),
			!t)
		)
			return !0;
		for (var [n, o] of this.R5e)
			if (
				!(
					(0 === (o = o[0]).Type &&
						o.DungeonDetectionRecord.Conf.GuideId !== t) ||
					(1 === o.Type && o.SilentAreaDetectionRecord.Conf.GuideId !== t)
				) &&
				this.CheckTargetDungeonTypeCanShow(n)
			)
				return !0;
		return !1;
	}
	get DetectionSilentAreasDataList() {
		return this.A5e;
	}
	InitAllDetectSilentAreasList() {
		var e = new Map();
		for (const n of this.AllSilentAreaDetectionRecord.values()) {
			var t = e.get(n.Conf.Secondary);
			t ? t.push(n) : ((t = new Array()).push(n), e.set(n.Conf.Secondary, t));
		}
		for (const t of e.values())
			t.sort(AdventureGuideController_1.silentAreasSortFunc);
		for (const t of Array.from(e.keys()).sort((e, t) => t - e)) {
			var n = e.get(t);
			if (0 !== n.length) {
				var o = n[0].Conf.DangerType;
				for (const e of n)
					this.A5e.push({
						IsShow: !1,
						DangerType: o,
						SilentAreaDetectionData: e,
						SilentAreaTitleData: void 0,
					});
			}
		}
	}
	UpdateDetectSilentAreas(e) {
		for (const t of this.A5e)
			if (
				t.SilentAreaDetectionData &&
				t.SilentAreaDetectionData.Conf.Id === e.Conf.Id
			) {
				t.SilentAreaDetectionData = e;
				break;
			}
	}
	GetShowSilentAreasList(e, t, n) {
		if (void 0 !== t) {
			var o = t;
			for (const t of this.A5e) this.B5e(e, t, o);
		} else if (void 0 !== n) {
			var r = this.GetSilentAreaDetectData(n);
			if (r) for (const t of this.A5e) this.B5e(e, t, r.Conf.Secondary);
		} else for (const t of this.A5e) this.B5e(e, t, void 0);
	}
	B5e(e, t, n) {
		e.push(t);
	}
}
exports.AdventureGuideModel = AdventureGuideModel;
