"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Time_1 = require("../../../Core/Common/Time"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	DRAW_ARROW_SIZE = 100,
	DRAW_LINE_THICKNESS = 3,
	ARROW_LENGTH_SUB = 20,
	targetLinkColor = new UE.LinearColor(1, 0, 0, 1),
	teamMemberLinkColor = new UE.LinearColor(0, 1, 0, 1),
	allyLinkColor = new UE.LinearColor(0.6, 1, 0.6, 1),
	neutralLinkColor = new UE.LinearColor(1, 1, 0, 1),
	enemyLinkColor = new UE.LinearColor(1, 0, 1, 1),
	areaCenterColor = new UE.LinearColor(0, 1, 1, 1),
	DEFAULT_SEGMENTS = 24,
	minHateAreaColor = new UE.LinearColor(1, 0, 1, 1),
	maxHateAreaColor = new UE.LinearColor(0, 1, 1, 1),
	minHateInitAreaColor = new UE.LinearColor(1, 0, 0, 1),
	maxHateInitAreaColor = new UE.LinearColor(0, 1, 0, 1);
class TsAiController extends UE.KuroAIController {
	constructor() {
		super(...arguments),
			(this.CharAiDesignComp = void 0),
			(this.CharTagComp = void 0),
			(this.CharBuffComp = void 0),
			(this.CharStateMachineComp = void 0),
			(this.AiController = void 0),
			(this.BehaviorTree = void 0),
			(this.StateMachineGroup = void 0),
			(this.DebugDraw = 0),
			(this.DebugDrawInternal = 0);
	}
	ChangeDebugDraw() {
		this.DebugDraw = this.DebugDraw ? 0 : 1;
	}
	get IsDebugDraw() {
		return (
			void 0 === this.DebugDrawInternal &&
				(this.DebugDrawInternal = this.DebugDraw),
			this.DebugDrawInternal
		);
	}
	GetEntity() {
		return this.CharAiDesignComp?.Entity;
	}
	SetupBehaviorTree(e) {
		return (
			this.BehaviorTree !== e &&
			((this.BehaviorTree = e), this.RunBehaviorTree(e), !0)
		);
	}
	InitAiController(e) {
		(this.CharAiDesignComp = e),
			(this.AiController = e.AiController),
			(this.CharBuffComp = e.Entity.GetComponent(157)),
			(this.CharTagComp = e.Entity.GetComponent(185)),
			(this.CharStateMachineComp = e.Entity.GetComponent(65));
	}
	DrawDebugLines(e) {
		var r, t, o;
		this.CharAiDesignComp?.Valid &&
			((o = this.AiController.CharActorComp.ActorLocationProxy),
			(r = this.AiController.AiHateList.GetCurrentTarget()),
			this.DrawPerception(o, r),
			r?.Valid) &&
			((r = r.Entity.GetComponent(3)),
			this.DrawArrow(o, r.ActorLocationProxy, targetLinkColor),
			(r = this.AiController.AiTeam.GetAiTeamAreaMemberData(this.AiController))
				?.IsAttacker &&
				((t = new UE.Vector(
					o.X,
					o.Y,
					o.Z + this.AiController.CharActorComp.HalfHeight,
				)),
				UE.KismetSystemLibrary.DrawDebugBox(
					this,
					t,
					new UE.Vector(10, 10, 10),
					enemyLinkColor,
					this.AiController.CharActorComp.ActorRotation,
					0,
					3,
				)),
			r) &&
			0 <= r.AreaIndex &&
			((t = Vector_1.Vector.Create(
				o.X,
				o.Y,
				o.Z - this.AiController.CharActorComp.HalfHeight + 10,
			)),
			(o =
				(r.CachedControllerYaw + r.AngleCenter) *
				MathUtils_1.MathUtils.DegToRad),
			(o = Vector_1.Vector.Create(
				r.CachedTargetLocation.X + Math.cos(o) * r.DistanceCenter,
				r.CachedTargetLocation.Y + Math.sin(o) * r.DistanceCenter,
				t.Z,
			)),
			this.DrawArrow(t, o, areaCenterColor));
	}
	DrawPerception(e, r) {
		var t,
			o,
			i = this.AiController.AiPerception;
		if (i) {
			for (const r of i.ShareAllyLink) {
				var n =
					CharacterController_1.CharacterController.GetCharacterActorComponentById(
						r,
					);
				n && this.DrawArrow(e, n.ActorLocationProxy, teamMemberLinkColor);
			}
			for (const r of i.Allies)
				i.ShareAllyLink.has(r) ||
					((t =
						CharacterController_1.CharacterController.GetCharacterActorComponentById(
							r,
						)) &&
						this.DrawArrow(e, t.ActorLocationProxy, allyLinkColor));
			for (const t of i.AllEnemies)
				(r?.Valid && t === r.Id) ||
					((o =
						CharacterController_1.CharacterController.GetCharacterActorComponentById(
							t,
						)) &&
						this.DrawArrow(e, o.ActorLocationProxy, enemyLinkColor));
			for (const r of i.Neutrals) {
				var a =
					CharacterController_1.CharacterController.GetCharacterActorComponentById(
						r,
					);
				a && this.DrawArrow(e, a.ActorLocationProxy, neutralLinkColor);
			}
		}
		var l = this.AiController.CharActorComp,
			C =
				(TsAiController.TmpVector.FromUeVector(l.GetInitLocation()),
				TsAiController.TmpVector),
			s = ((C.Z -= l.HalfHeight), this.AiController.AiHateList.AiHate);
		l = l.FloorLocation;
		UE.KismetSystemLibrary.DrawDebugSphere(
			this,
			l.ToUeVector(),
			s.DisengageDistanceRange.Min,
			24,
			minHateAreaColor,
		),
			UE.KismetSystemLibrary.DrawDebugSphere(
				this,
				l.ToUeVector(),
				s.DisengageDistanceRange.Max,
				24,
				maxHateAreaColor,
			),
			UE.KismetSystemLibrary.DrawDebugSphere(
				this,
				C.ToUeVector(),
				s.DisengageBornDistance.Min,
				24,
				minHateInitAreaColor,
			),
			UE.KismetSystemLibrary.DrawDebugSphere(
				this,
				C.ToUeVector(),
				s.DisengageBornDistance.Max,
				24,
				maxHateInitAreaColor,
			);
	}
	OnStart() {}
	获取控制权时() {}
	状态切换时(e, r, t) {}
	AddComplicatedEventBinder(e, r) {
		this.AiController
			? this.AiController.AiConditionEvents.AddConditionEvent(e, r)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Test", 6, "Error Call AddComplicatedEventBinder", [
					"AIC",
					this.GetName(),
				]);
	}
	AddSceneItemDestroyEventBinder(e, r) {
		this.AiController
			? this.AiController.AiPerceptionEvents.AddSceneItemDestroyEvent(e, r)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Test",
					6,
					"Error Call AddSceneItemDestroyEventBinder",
					["AIC", this.GetName()],
				);
	}
	AddHateEventBinder(e) {
		this.AiController?.AiPerceptionEvents.AddAiHateEvent(e);
	}
	AddPerceptionEventBinder(e) {
		this.AiController?.AiPerceptionEvents.AddAiPerceptionEvent(e, !1, !0, !1);
	}
	SetPerceptionEventState(e, r, t) {
		this.AiController?.AiPerceptionEvents.SetPerceptionEventState(e, r, t);
	}
	AddHateOutRangeEventBinder(e) {
		this.AiController?.AiPerceptionEvents.AddAiHateOutRangeEvent(e);
	}
	ActivateSkillGroup(e, r) {
		this.AiController?.AiSkill &&
			this.AiController.AiSkill.ActivateSkillGroup(e, r);
	}
	AddSkillCd(e, r) {
		this.AiController?.AiSkill && this.AiController.AiSkill.AddSkillCd(e, r);
	}
	AicApplyBuff(e) {
		this.CharBuffComp?.Valid &&
			this.CharBuffComp.AddBuffFromAi(this.AiController.AiCombatMessageId, e, {
				InstigatorId: this.CharBuffComp.CreatureDataId,
				Reason: "AIC蓝图添加buff(AicApplyBuff)",
			});
	}
	AicApplyBuffToTarget(e, r) {
		(e = EntitySystem_1.EntitySystem.GetComponent(e, 187)) &&
			this.CharBuffComp?.Valid &&
			e.AddBuffFromAi(this.AiController.AiCombatMessageId, r, {
				InstigatorId: this.CharBuffComp.CreatureDataId,
				Reason: "AIC蓝图添加buff(AicApplyBuffToTarget)",
			});
	}
	AicRemoveBuff(e) {
		this.CharBuffComp?.Valid &&
			this.CharBuffComp.RemoveBuff(e, -1, "AIC蓝图移除buff（AIC Remove Buff）");
	}
	AicAddTag(e) {
		this.CharTagComp?.Valid && this.CharTagComp.AddTag(e?.TagId);
	}
	AicRemoveTag(e) {
		this.CharTagComp?.Valid && this.CharTagComp.RemoveTag(e?.TagId),
			this.CharBuffComp?.Valid &&
				this.CharBuffComp.RemoveBuffByTag(e?.TagId, "AIC蓝图移除buff");
	}
	SetBattleWanderTime(e, r) {
		this.AiController.AiWanderInfos?.AiBattleWanderGroups
			? this.AiController.AiWanderInfos.SetOverrideBattleWanderTime(e, r)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("AI", 6, "没有配置战斗游荡，不能设置战斗游荡时长", [
					"AiBaseConfigId",
					this.AiController.AiBase.Id,
				]);
	}
	SetBattleWanderIndex(e) {
		this.AiController.AiWanderInfos?.AiBattleWanderGroups
			? e < 0 ||
				this.AiController.AiWanderInfos.AiBattleWanderGroups.length <= e
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"AI",
						6,
						"设置战斗游荡组不合法",
						["AiBaseConfigId", this.AiController.AiBase.Id],
						["TargetIndex", e],
					)
				: (this.AiController.AiWanderInfos.CurrentBattleWanderIndex = e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("AI", 6, "没有配置战斗游荡，不能设置战斗游荡组", [
					"AiBaseConfigId",
					this.AiController.AiBase.Id,
				]);
	}
	AddBattleWanderEndTime(e) {
		this.AiController.AiWanderInfos?.AiBattleWanderGroups
			? (this.AiController.AiWanderInfos.BattleWanderAddTime += e)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("AI", 6, "没有配置战斗游荡，不能增加游荡结束时间", [
					"AiBaseConfigId",
					this.AiController.AiBase.Id,
				]);
	}
	SetAiSenseEnable(e, r) {
		this.AiController.AiPerception?.SetAiSenseEnable(e, r);
	}
	AddOrRemoveAiSense(e, r) {
		this.AiController.AiPerception?.AddOrRemoveAiSense(e, r);
	}
	EnableAiSenseByType(e, r) {
		this.AiController.AiPerception?.EnableAiSenseByType(e, r);
	}
	SetAiHateConfig(e) {
		this.AiController.AiHateList.AiHate = e
			? ConfigManager_1.ConfigManager.AiConfig.LoadAiHate(Number(e))
			: ConfigManager_1.ConfigManager.AiConfig.LoadAiHateByController(
					this.AiController,
					void 0,
				);
	}
	ChangeHatred(e, r, t) {
		this.AiController.AiHateList.ChangeHatred(e, r, t);
	}
	ClearHatred(e) {
		this.AiController.AiHateList.ClearHatred(e);
	}
	AddAlertEventBinder(e) {
		this.AiController.AiAlert.CallbackEvent = e;
	}
	SetAiAlertConfig(e) {
		this.AiController.AiAlert.AiAlertConfig = e
			? ConfigManager_1.ConfigManager.AiConfig.LoadAiAlert(e)
			: ConfigManager_1.ConfigManager.AiConfig.LoadAiAlert(
					this.AiController.AiBase.SubBehaviorConfigs.get("AiAlert"),
				);
	}
	SetAiEnable(e, r) {
		(r = "TsAiController_" + r),
			e
				? this.CharAiDesignComp.EnableAi(r)
				: this.CharAiDesignComp.DisableAi(r);
	}
	TestChangeAi(e) {
		this.CharAiDesignComp.LoadAiConfigs(Number(e));
	}
	LogReport(e) {
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("BehaviorTree", 9, "埋点废弃,请删除相关配置");
	}
	逻辑主控() {
		return this.AiController.CharActorComp.IsAutonomousProxy;
	}
	移动主控() {
		return this.AiController.CharActorComp.IsMoveAutonomousProxy;
	}
	检查状态机状态(e) {
		return !1;
	}
	切换状态机状态(e) {}
	GetCoolDownDone(e) {
		return 0 === this.AiController.GetCoolDownRemainTime(e);
	}
	GetCoolDownRemainTime(e) {
		return this.AiController.GetCoolDownRemainTime(e);
	}
	SetCoolDown(e, r) {
		var t = ModelManager_1.ModelManager.GameModeModel.IsMulti
			? Time_1.Time.ServerTimeStamp
			: Time_1.Time.WorldTime;
		this.AiController.SetCoolDownTime(e, t + r, !0, "蓝图");
	}
	InitCooldownEvent(e, r) {
		this.AiController.InitCooldownTimer(e, r);
	}
	StartCooldownTimer(e, r) {
		var t = ModelManager_1.ModelManager.GameModeModel.IsMulti
			? Time_1.Time.ServerTimeStamp
			: Time_1.Time.WorldTime;
		this.AiController.SetCoolDownTime(e, t + r, !0, "蓝图AIC延迟节点");
	}
	GetDebugStateMachine(e) {
		this.CharStateMachineComp?.StateMachineGroup?.RequestServerDebugInfo();
		var r = this.CharStateMachineComp?.StateMachineGroup?.ToString(),
			t = (0, puerts_1.$unref)(e);
		if (r) for (const e of r) t.Add(e);
	}
	GetDebugText() {
		return `激活的技能组：\n ${JSON.stringify([...this.AiController.AiSkill.ActiveSkillGroup])}\n技能CD：${this.AiController.AiSkill.GetCdDebugString()}\n战斗游荡组：${this.AiController.AiWanderInfos?.CurrentBattleWanderIndex}\n仇恨：\n${this.AiController.AiHateList.GetHatredMapDebugText()}\n团队AI：\n逻辑主控：${this.AiController.CharActorComp.IsAutonomousProxy}\n移动主控：${this.AiController.CharActorComp.IsMoveAutonomousProxy}\n等待切换主控：${this.AiController.IsWaitingSwitchControl()}\n感知：${this.AiController.AiPerception?.GetEnableAiSenseDebug()}\n怪物仇恨组： ${this.AiController.HatredGroupId}\n部位血量: ${this.CharBuffComp?.Entity?.GetComponent(58)?.GetDebugText()}\n集群Id：${this.AiController.GetTeamLevelId()}\n`;
	}
	ReceiveDestroyed() {
		ObjectUtils_1.ObjectUtils.IsValid(this) &&
			(this.Clear(), super.ReceiveDestroyed());
	}
	Clear() {
		(this.CharAiDesignComp = void 0),
			(this.CharBuffComp = void 0),
			(this.CharTagComp = void 0),
			(this.AiController = void 0),
			(this.BehaviorTree = void 0),
			(this.CharStateMachineComp = void 0);
	}
	DrawArrow(e, r, t) {
		r.Subtraction(e, TsAiController.TmpVector),
			(r = TsAiController.TmpVector.Size()),
			TsAiController.TmpVector.MultiplyEqual((r - 20) / r),
			TsAiController.TmpVector.AdditionEqual(e),
			UE.KismetSystemLibrary.DrawDebugArrow(
				this,
				e.ToUeVector(),
				TsAiController.TmpVector.ToUeVector(),
				100,
				t,
				0,
				3,
			);
	}
}
(TsAiController.TmpVector = Vector_1.Vector.Create()),
	(TsAiController.StatSetAiHateConfig = void 0),
	(exports.default = TsAiController);
