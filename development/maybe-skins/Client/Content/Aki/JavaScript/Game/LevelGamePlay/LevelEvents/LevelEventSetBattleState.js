"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetBattleState = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class NotifyData {
	constructor() {
		(this.Entities = void 0), (this.Target = void 0);
	}
}
class LevelEventSetBattleState extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.MRe = new Array()),
			(this.SRe = 0),
			(this.ERe = 0),
			(this.aDe = void 0),
			(this.yRe = void 0),
			(this.IRe = void 0);
	}
	ExecuteInGm(e, t) {
		this.FinishExecute(!0);
	}
	ExecuteNew(e, t) {
		if (e)
			switch (((this.aDe = e.StateOption), this.aDe.Type)) {
				case IAction_1.ESetBattleStateType.SetBattleTag:
					if (this.aDe.SetTags && 0 !== this.aDe.SetTags.length) {
						var i = [];
						for (const e of this.aDe.SetTags) {
							i.push(e.EntityId);
							var o =
								ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
									e.EntityId,
								);
							e.BeforeHide && o?.Entity?.GetComponent(185)?.AddTag(447365096);
						}
						this.CreateWaitEntityTask(i),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Event",
									34,
									"LevelEventSetBattleState CreateWaitEntityTask",
									["EntityIds", i],
								);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Event",
								34,
								"LevelEventSetBattleState 未配置具体操作对象",
							),
							this.FinishExecute(!1);
					break;
				case IAction_1.ESetBattleStateType.NotifyMonsterPerception:
					this.TRe(this.aDe);
					break;
				case IAction_1.ESetBattleStateType.NotifyMonsterPlayStandbyTags:
					this.LRe(this.aDe, t);
			}
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Event", 34, "LevelEventSetBattleState 参数不合法"),
				this.FinishExecute(!1);
	}
	ExecuteWhenEntitiesReady() {
		switch (this.aDe.Type) {
			case IAction_1.ESetBattleStateType.SetBattleTag:
				this.DRe();
				break;
			case IAction_1.ESetBattleStateType.NotifyMonsterPerception:
				this.RRe(this.yRe);
		}
	}
	DRe() {
		var e = this.aDe;
		this.SRe = e.SetTags.length;
		for (const i of e.SetTags) {
			const e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
				i.EntityId,
			);
			if (e?.IsInit) {
				const o = i.GameplayTag;
				var t = i.DelayTime;
				switch (i.SetType) {
					case IAction_1.ESetEntityTagType.Add:
						t && 0 < t
							? this.MRe.push(
									TimerSystem_1.TimerSystem.Delay(() => {
										this.URe(i.EntityId, e, o);
									}, t * TimeUtil_1.TimeUtil.InverseMillisecond),
								)
							: this.URe(i.EntityId, e, o);
						break;
					case IAction_1.ESetEntityTagType.Remove:
						t && 0 < t
							? this.MRe.push(
									TimerSystem_1.TimerSystem.Delay(() => {
										this.ARe(i.EntityId, e, o);
									}, t * TimeUtil_1.TimeUtil.InverseMillisecond),
								)
							: this.ARe(i.EntityId, e, o);
				}
			} else this.ERe += 1;
		}
		this.ERe >= this.SRe && this.FinishExecute(!0);
	}
	URe(e, t, i) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Event",
				34,
				"LevelEventSetBattleState AddTag",
				["EntityId", e],
				["TagName", i],
			),
			(t = t.Entity.GetComponent(185))
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Event",
							34,
							"LevelEventSetBattleState AddTagByName",
							["EntityId", e],
							["TagName", i],
						),
					t.AddTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i)),
					(this.ERe += 1),
					this.ERe >= this.SRe && this.FinishExecute(!0))
				: this.FinishExecute(!1);
	}
	ARe(e, t, i) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Event",
				34,
				"LevelEventSetBattleState RemoveTag",
				["EntityId", e],
				["TagName", i],
			),
			(t = t.Entity.GetComponent(185))
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Event",
							34,
							"LevelEventSetBattleState RemoveTagByName",
							["EntityId", e],
							["TagName", i],
						),
					t.RemoveTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i)),
					(this.ERe += 1),
					this.ERe >= this.SRe && this.FinishExecute(!0))
				: this.FinishExecute(!1);
	}
	TRe(e) {
		var t = [],
			i = [];
		for (const a of e.EntityIds) {
			var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
			if (!o?.Valid)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Event", 32, "被通知Entity不合法", ["ID", a]),
					void this.FinishExecute(!1)
				);
			if (((o = o.Entity.GetComponent(38)), !o?.Valid))
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Event", 32, "被通知Entity没有AIComponent", [
							"ID",
							a,
						]),
					void this.FinishExecute(!1)
				);
			t.push(o.AiController), i.push(a);
		}
		switch (
			((this.yRe = new NotifyData()),
			(this.yRe.Entities = t),
			e.PerceptionBehaviorOption.Type)
		) {
			case IAction_1.EBattleStatePerceptionBehavior.NotifyGatherToEntity:
				var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
					e.PerceptionBehaviorOption.EntityId,
				);
				a?.Valid
					? (a = a.Entity.GetComponent(1))?.Valid
						? ((this.yRe.Target = a),
							i.push(e.PerceptionBehaviorOption.EntityId),
							this.CreateWaitEntityTask(i))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Event",
									34,
									"未能获取到该实体对应的有效Actor",
									["entityId", e.PerceptionBehaviorOption.EntityId],
								),
							this.FinishExecute(!1))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 34, "中心实体不合法", [
								"ID",
								e.PerceptionBehaviorOption.EntityId,
							]),
						this.FinishExecute(!1));
				break;
			case IAction_1.EBattleStatePerceptionBehavior.NotifyGatherToPlayer:
				(this.yRe.Target =
					Global_1.Global.BaseCharacter.CharacterActorComponent),
					this.CreateWaitEntityTask(i);
		}
	}
	RRe(e) {
		for (const t of e.Entities) if (!t.CharActorComp.Entity.IsInit) return;
		var t = CommonParamById_1.configCommonParamById.GetIntConfig(
			"qianxing_notify_interval",
		);
		const i = Global_1.Global.BaseCharacter.CharacterActorComponent;
		i?.Valid
			? e.Entities.sort(
					(e, t) =>
						Vector_1.Vector.DistSquared(
							i.ActorLocationProxy,
							e.CharActorComp.ActorLocationProxy,
						) -
						Vector_1.Vector.DistSquared(
							i.ActorLocationProxy,
							t.CharActorComp.ActorLocationProxy,
						),
				)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelEvent",
					32,
					"[NotifyGatherToEntity] 获取不到BaseCharacter的CharacterActorComponent，无法通知怪物靠近",
				);
		let o = 0;
		this.IRe = TimerSystem_1.TimerSystem.Loop(
			() => {
				e.Entities[o++].AiPerceptionEvents.ForceTriggerSceneItemDestroyEvent(
					e.Target.Owner,
				);
			},
			t,
			e.Entities.length,
		);
	}
	LRe(e, t) {
		if (
			0 !== e.StandbyTags.length &&
			1 === t.Type &&
			(t = EntitySystem_1.EntitySystem.Get(t.EntityId)) &&
			t.GetComponent(38)?.AiController?.AiPatrol
		) {
			const o = t.GetComponent(1);
			t = t.GetComponent(39);
			var i = Math.floor(
				MathUtils_1.MathUtils.GetRandomFloatNumber(0, e.StandbyTags.length),
			);
			const a = Protocol_1.Aki.Protocol.vds.create();
			(a.rkn = MathUtils_1.MathUtils.NumberToLong(
				o.CreatureData.GetCreatureDataId(),
			)),
				(a.Dkn = t?.GetCurrentPatrolSplineId() ?? 0),
				(a.Akn = t?.GetLastPointRawIndex() ?? -1),
				(a.Ukn =
					GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
						e.StandbyTags[i],
					) ?? 0),
				Net_1.Net.Call(14969, a, (e) => {
					e &&
						e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"AI",
							51,
							"请求状态机切换生态表演失败",
							["CreatureId", a.rkn],
							["PbDataId", o.CreatureData.GetPbDataId()],
							["SplineId", a.Dkn],
							["Index", a.Akn],
							["Tag", a.Ukn],
						);
				});
		}
		this.FinishExecute(!0);
	}
	OnReset() {
		for (const e of this.MRe)
			TimerSystem_1.TimerSystem.Has(e) && TimerSystem_1.TimerSystem.Remove(e);
		void 0 !== this.IRe && TimerSystem_1.TimerSystem.Remove(this.IRe),
			(this.MRe.length = 0),
			(this.SRe = 0),
			(this.ERe = 0);
	}
}
exports.LevelEventSetBattleState = LevelEventSetBattleState;
