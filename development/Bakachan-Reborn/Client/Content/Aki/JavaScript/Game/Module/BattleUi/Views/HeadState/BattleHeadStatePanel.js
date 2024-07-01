"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleHeadStatePanel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
	ObjectSystem_1 = require("../../../../../Core/Object/ObjectSystem"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	CharacterController_1 = require("../../../../NewWorld/Character/CharacterController"),
	UiLayer_1 = require("../../../../Ui/UiLayer"),
	CommonHeadState_1 = require("./CommonHeadState"),
	DurabilityDamageHeadState_1 = require("./DurabilityDamageHeadState"),
	DurabilityHeadState_1 = require("./DurabilityHeadState"),
	EliteMonsterHeadStateView_1 = require("./EliteMonsterHeadStateView"),
	GuardianHeadState_1 = require("./GuardianHeadState"),
	HeadStateData_1 = require("./HeadStateData"),
	MingSuTiHeadState_1 = require("./MingSuTiHeadState"),
	ProgressControlHeadState_1 = require("./ProgressControlHeadState"),
	headStateViewMap = new Map([
		[1, CommonHeadState_1.CommonHeadState],
		[2, EliteMonsterHeadStateView_1.EliteMonsterHeadStateView],
		[4, MingSuTiHeadState_1.MingSuTiHeadState],
		[5, GuardianHeadState_1.GuardianHeadState],
		[6, DurabilityHeadState_1.DurabilityHeadState],
		[7, DurabilityDamageHeadState_1.DurabilityDamageHeadState],
		[8, DurabilityDamageHeadState_1.DurabilityDamageHeadState],
		[9, ProgressControlHeadState_1.ProgressControlHeadState],
	]);
class BattleHeadStatePanel {
	constructor() {
		(this.Wat = new Map()),
			(this.Kat = new Map()),
			(this.Qat = 0),
			(this.Xat = 0),
			(this.$at = 0),
			(this.Yat = 0),
			(this.Jat = 0),
			(this.zat = void 0),
			(this.Zat = void 0),
			(this.eht = 0),
			(this.qot = 0),
			(this.tht = 0),
			(this.iht = (t, e, a) => {
				var n = EntitySystem_1.EntitySystem.Get(t);
				n?.Valid &&
					CharacterController_1.CharacterController.GetCharacter(n) &&
					!n.GetComponent(185).HasTag(1008164187) &&
					(n = this.oht(t)) &&
					n.OnHealthChanged(t);
			}),
			(this.rht = (t) => {
				8 === this.nht(t.Id) &&
					this.sht(t) &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Battle",
							8,
							"[HeadState]当任何使用多阶段打击机关耐久度（不可完全破坏）的可破坏物受击时，添加显示血条的实体",
							["EntityId", t.Id],
						),
					this.aht(t));
			}),
			(this.hht = (t, e, a) => {
				if (e !== a)
					if (
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Battle",
								8,
								"[HeadState]当任何可破坏物受击时",
								["EntityId", t.Id],
								["newDurability", e],
								["currentDurability", a],
							),
						e <= 0)
					) {
						var n = this.oht(t.Id);
						if (n)
							switch (n.HeadStateType) {
								case 7:
								case 8:
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Battle",
											8,
											"[HeadState]可破坏物耐久度<=0时，不自动删除可破坏物血条",
											["EntityId", t.Id],
											["newDurability", e],
											["currentDurability", a],
										);
									break;
								default:
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Battle",
											8,
											"[HeadState]可破坏物耐久度<=0时，删除可破坏物血条",
											["EntityId", t.Id],
											["newDurability", e],
											["currentDurability", a],
										),
										this.lht(t.Entity, !0);
							}
						else
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Battle",
									8,
									"[HeadState]可破坏物耐久度<=0时，找不到对应的可破坏物血条",
									["EntityId", t.Id],
									["newDurability", e],
									["currentDurability", a],
								);
					} else
						this.sht(t.Entity) &&
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Battle",
									8,
									"[HeadState]当任何可破坏物耐久改变时，添加显示血条的实体",
									["EntityId", t.Id],
									["newDurability", e],
									["currentDurability", a],
								),
							this.aht(t.Entity, a));
			}),
			(this._ht = (t, e, a) => {
				var n = t.GetComponent(0)?.GetPbDataId();
				if (
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Battle",
							40,
							"[HeadState] 当任何进度控制机关启用状态改变时",
							["EntityId", t.Id],
							["PbDataId", n],
							["IsEnable", e],
							["ProgressData", a],
						),
					!e)
				)
					return this.oht(t.Id)
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Battle",
									40,
									"[HeadState] 进度控制机关停用时，删除进度条",
									["EntityId", t.Id],
									["PbDataId", n],
									["ProgressData", a],
								),
							void this.lht(t, !0))
						: void (
								Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Battle",
									40,
									"[HeadState] 进度控制机关停用时，找不到对应的进度条",
									["EntityId", t.Id],
									["PbDataId", n],
									["ProgressData", a],
								)
							);
				this.sht(t) &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Battle",
							40,
							"[HeadState] 进度控制机关启用时，尝试添加进度条",
							["EntityId", t.Id],
							["PbDataId", n],
							["ProgressData", a],
						),
					"CaptureStrategicPoint" === a.ProgressCtrlType
						? this.aht(t, a.CurrentValue / a.MaxValue, !1)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Battle",
								40,
								"[HeadState] 进度控制机关启用时，尚未支持所用的进度数据类型",
								["EntityId", t.Id],
								["PbDataId", n],
								["ProgressData", a],
							));
			}),
			(this.hMe = () => {
				this.ClearAllHeadState();
			}),
			(this.uht = () => {
				this.ClearAllHeadState();
			}),
			(this.OnAddOrRemoveBuff = (t, e, a, n) => {
				var i = this.oht(t);
				i && i.AddOrRemoveBuff(t, e, a, n);
			}),
			(this.OnRoleLevelChange = (t, e, a) => {
				for (const n of this.Kat.values()) n.RoleLevelChange(t, e, a);
			}),
			(this.OnChangeTeam = () => {
				for (const t of this.Kat.values()) t.ChangeTeam();
			}),
			(this.cht = (t) => {
				this.lht(t);
			}),
			(this.Xat = CommonParamById_1.configCommonParamById.GetIntConfig(
				"ComStateShowMaxDistance",
			)),
			(this.$at = CommonParamById_1.configCommonParamById.GetIntConfig(
				"ComStateShowDistance",
			)),
			(this.Yat = CommonParamById_1.configCommonParamById.GetIntConfig(
				"GameplayStateShowMaxDistance",
			)),
			(this.Jat = CommonParamById_1.configCommonParamById.GetIntConfig(
				"GameplayStateShowDistance",
			));
		var t = CommonParamById_1.configCommonParamById.GetStringConfig(
				"HeadStateScaleCurvePath",
			),
			e = CommonParamById_1.configCommonParamById.GetStringConfig(
				"DurabilityHeadStateScaleCurvePath",
			);
		(this.eht = CommonParamById_1.configCommonParamById.GetIntConfig(
			"TempHeadStateHideTime",
		)),
			(this.qot = CommonParamById_1.configCommonParamById.GetIntConfig(
				"ComHPAttenuateBufferSpeed",
			)),
			(this.tht = CommonParamById_1.configCommonParamById.GetIntConfig(
				"Detail_Head_State_Range",
			)),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				e,
				UE.CurveFloat,
				(t) => {
					t?.IsValid() && (this.Zat = t);
				},
				103,
			),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				t,
				UE.CurveFloat,
				(t) => {
					t?.IsValid() &&
						((this.zat = t),
						this.RefreshCurrentRole(),
						this.InitializeEntityList(),
						this.Ore());
				},
				103,
			);
	}
	InitializeEntityList() {
		var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
		if (t) {
			for (const e of t) e.IsInit && this.mht(e.Entity) && this.dht(e.Entity);
			this.RefreshAllHeadState(0);
		}
	}
	ResetAllHeadStates() {
		this.kre(),
			this.ClearAllHeadState(),
			this.Cht(),
			(this.zat = void 0),
			(this.Zat = void 0);
	}
	ClearAllHeadState() {
		for (const t of this.Kat.values()) t.Destroy();
		this.Kat.clear();
	}
	Cht() {
		for (const t of this.Wat.values()) t.Clear();
		this.Wat.clear();
	}
	Ore() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.CharOnHealthChanged,
			this.iht,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAnySceneItemEntityHit,
				this.rht,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAnySceneItemDurabilityChange,
				this.hht,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange,
				this._ht,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnStartLoadingState,
				this.hMe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CharOnBuffAddUITexture,
				this.OnAddOrRemoveBuff,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.RoleLevelUp,
				this.OnRoleLevelChange,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.OnChangeTeam,
			);
	}
	kre() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.CharOnHealthChanged,
			this.iht,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAnySceneItemEntityHit,
				this.rht,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAnySceneItemDurabilityChange,
				this.hht,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAnyProgressControlEnableStateChange,
				this._ht,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnStartLoadingState,
				this.hMe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TeleportComplete,
				this.uht,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CharOnBuffAddUITexture,
				this.OnAddOrRemoveBuff,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.RoleLevelUp,
				this.OnRoleLevelChange,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.OnChangeTeam,
			);
	}
	Tick(t) {
		this.RefreshAllHeadState(t);
	}
	RefreshAllHeadState(t) {
		for (const n of this.Wat.values()) {
			var e,
				a = n.GetEntityId();
			this.fht(n)
				? (e = this.oht(a))
					? this.pht(e, n.DistanceSquared, t)
					: this.Mht(n)
				: this.Sht(a);
		}
	}
	fht(t) {
		if (t.IsEntityActive() && !t.HasDeadTag && !t.HasHideTag) {
			t.RefreshDistance();
			var e = t.DistanceSquared,
				a = t.GetHeadStateType();
			if (1 === a || 2 === a) {
				if (e <= this.$at) return !1;
				if (t.HasFightTag) return !0;
				if (e <= this.Xat) return !0;
			} else {
				if (e <= this.Jat) return !1;
				if (e <= this.Yat) return !0;
			}
		}
		return !1;
	}
	pht(t, e, a) {
		let n = -1;
		1 === t.HeadStateType || 2 === t.HeadStateType
			? this.zat && (n = this.zat.GetFloatValue(e))
			: this.Zat && (n = this.Zat.GetFloatValue(e)),
			n < 0 || t.OnRefresh(e, n, a);
	}
	RefreshCurrentRole() {
		var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		this.Qat = t?.Id ?? 0;
	}
	OnCreateEntity(t) {
		this.mht(t) && this.dht(t);
	}
	OnRemoveEntity(t) {
		(this.mht(t) || this.sht(t)) && this.lht(t);
	}
	dht(t, e) {
		if (ObjectSystem_1.ObjectSystem.IsValid(t)) {
			var a = t.Id,
				n = this.nht(a);
			if (n && !this.Wat.has(a))
				return (
					(n = new HeadStateData_1.HeadStateData()).Initialize(t),
					n.SetOriginalHp(e ?? 0),
					this.Wat.set(a, n),
					n
				);
		}
	}
	aht(t, e, a = !0) {
		var n;
		(a && !this.eht) ||
			((n = this.oht(t.Id))
				? a && n.ActivateHideTimeDown(this.eht, this.cht)
				: (n = this.dht(t, e)) &&
					(a
						? this.Mht(n).then(
								(t) => {
									t && t.ActivateHideTimeDown(this.eht, this.cht);
								},
								() => {},
							)
						: this.Mht(n)));
	}
	lht(t, e = !1) {
		this.yht(t, e),
			(e = t.Id),
			(t = this.Wat.get(e)) && (t.Clear(), this.Wat.delete(e));
	}
	async Iht(t) {
		var e = t.GetHeadStateType();
		if ((n = headStateViewMap.get(e))) {
			var a = t.GetEntityId(),
				n = new n();
			let i, o;
			if (
				(this.Kat.set(a, n),
				(o =
					1 === e || 2 === e
						? ((i = this.Xat), this.$at)
						: ((i = this.Yat), this.Jat)),
				await n.InitializeHeadState(
					UiLayer_1.UiLayer.WorldSpaceUiRootItem,
					e,
					this.qot,
					this.tht,
					i,
					o,
					t,
				),
				n.GetRootActor())
			)
				return n;
		}
	}
	async Mht(t) {
		if (
			t.GetEntityId() !== this.Qat &&
			(t.IsNormalMonster() || t.IsSceneItem())
		)
			return this.Iht(t);
	}
	Sht(t, e = !1) {
		var a = this.oht(t);
		a
			? (e &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Battle", 8, "[HeadState]休眠头顶状态条", [
						"EntityId",
						t,
					]),
				a.Destroy(),
				this.Kat.delete(t))
			: e &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Battle",
					8,
					"[HeadState]休眠头顶状态条时，找不到对应的状态条",
					["EntityId", t],
				);
	}
	yht(t, e = !1) {
		var a;
		t?.Valid
			? ((a = t.Id), this.Sht(a, e))
			: e &&
				Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Battle", 8, "[HeadState]休眠头顶状态条时，实体不可用", [
					"EntityId",
					t.Id,
				]);
	}
	mht(t) {
		return (
			(t = t.GetComponent(3)),
			!!t?.Valid &&
				t.CreatureData.GetEntityType() ===
					Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
				!t.IsBoss
		);
	}
	sht(t) {
		return (
			(t = t.GetComponent(1)),
			!!t?.Valid &&
				t.CreatureData.GetEntityType() ===
					Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
		);
	}
	nht(t) {
		if (((t = EntitySystem_1.EntitySystem.Get(t).GetComponent(0)), t?.Valid))
			return t.GetBaseInfo()?.HeadStateViewConfig?.HeadStateViewType ?? 0;
	}
	oht(t) {
		return this.Kat.get(t);
	}
}
((exports.BattleHeadStatePanel = BattleHeadStatePanel).ght = void 0),
	(BattleHeadStatePanel.Tht = void 0),
	(BattleHeadStatePanel.vht = void 0),
	(BattleHeadStatePanel.Eht = void 0);
