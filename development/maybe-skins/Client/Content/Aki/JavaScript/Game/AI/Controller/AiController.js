"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (e, i, t, o) {
		var r,
			n = arguments.length,
			s =
				n < 3
					? i
					: null === o
						? (o = Object.getOwnPropertyDescriptor(i, t))
						: o;
		if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
			s = Reflect.decorate(e, i, t, o);
		else
			for (var a = e.length - 1; 0 <= a; a--)
				(r = e[a]) && (s = (n < 3 ? r(s) : 3 < n ? r(i, t, s) : r(i, t)) || s);
		return 3 < n && s && Object.defineProperty(i, t, s), s;
	};
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiController = void 0);
const cpp_1 = require("cpp"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	PerformanceController_1 = require("../../../Core/Performance/PerformanceController"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../Utils/CombatDebugController"),
	BlackboardController_1 = require("../../World/Controller/BlackboardController"),
	AiModelController_1 = require("../Common/AiModelController"),
	AiAlertClass_1 = require("./AiAlertClass"),
	AiConditionEvents_1 = require("./AiConditionEvents"),
	AiHateList_1 = require("./AiHateList"),
	AiPatrolController_1 = require("./AiPatrolController"),
	AiPerceptionEvents_1 = require("./AiPerceptionEvents"),
	AiTaunt_1 = require("./AiTaunt"),
	NpcDecisionController_1 = require("./Npc/NpcDecisionController");
class AiController {
	constructor() {
		(this.CharAiDesignComp = void 0),
			(this.CharActorComp = void 0),
			(this.CharSkillComp = void 0),
			(this.AiTeam = void 0),
			(this.AiTaunt = new AiTaunt_1.AiTaunt(this)),
			(this.AiHateList = new AiHateList_1.AiHateList(this)),
			(this.AiCoolDownList = new Map()),
			(this.AiSkill = void 0),
			(this.AiConditionEvents = new AiConditionEvents_1.AiConditionEvents(
				this,
			)),
			(this.AiPerceptionEvents = new AiPerceptionEvents_1.AiPerceptionEvents(
				this,
			)),
			(this.AiWanderInfos = void 0),
			(this.AiWanderRadiusConfig = void 0),
			(this.AiPerception = void 0),
			(this.AiAlert = new AiAlertClass_1.AiAlertClass(this)),
			(this.AiPatrol = new AiPatrolController_1.AiPatrolController()),
			(this.NpcDecision = void 0),
			(this.cY = !1),
			(this.mie = 0),
			(this.die = 0),
			(this.ControllerPlayerId = 0),
			(this.AiBase = void 0),
			(this.StateMachineConfig = void 0),
			(this.AiFlee = void 0),
			(this.Cie = void 0),
			(this.gie = 0),
			(this.AiCombatMessageId = void 0),
			(this.fie = 0),
			(this.OnChangeMode = () => {
				var e = ModelManager_1.ModelManager.GameModeModel.IsMulti
					? TimeUtil_1.TimeUtil.GetServerTimeStamp() - Time_1.Time.WorldTime
					: Time_1.Time.WorldTime - TimeUtil_1.TimeUtil.GetServerTimeStamp();
				for (const t of this.AiCoolDownList.keys()) {
					var i = this.AiCoolDownList.get(t);
					i && (i[0] = i[0] + e);
				}
			}),
			(this.AiCoolDownEvents = new Map());
	}
	get HatredGroupId() {
		return this.Cie;
	}
	Tick(e) {
		var i;
		this.UpdateCooldownTrigger(),
			this.cY &&
				(this.fie === Protocol_1.Aki.Protocol.wks.Proto_Monster &&
					(i = this.GetTeamLevelId()) !== this.AiTeam?.AiTeamLevel.Id &&
					(AiModelController_1.AiModelController.RemoveAiFromTeam(this),
					AiModelController_1.AiModelController.AddAiToTeam(this, i)),
				(this.mie += e),
				ModelManager_1.ModelManager.AiModel.AddAiScore(this));
	}
	ScoreUpdate() {
		var e, i;
		this.CharAiDesignComp.Active &&
			((e = cpp_1.KuroTime.GetMilliseconds64()),
			this.AiPerception &&
				(this.AiPerception.Tick(), this.AiPerceptionEvents.TickPerception()),
			this.AiAlert.Tick(this.mie),
			this.fie === Protocol_1.Aki.Protocol.wks.Proto_Monster &&
				(this.AiTaunt.Tick(),
				this.AiHateList.Tick(this.mie),
				this.AiPerceptionEvents.TickHate()),
			(this.mie = 0),
			PerformanceController_1.PerformanceController
				.IsEntityTickPerformanceTest) &&
			((i = cpp_1.KuroTime.GetMilliseconds64()),
			PerformanceController_1.PerformanceController.CollectTickPerformanceInfo(
				"EntityTick" + this.CharActorComp.Entity.Id,
				!1,
				i - e,
			));
	}
	SetAiDesignComp(e) {
		this.CharAiDesignComp !== e &&
			(this.CharAiDesignComp?.Valid &&
				(ModelManager_1.ModelManager.AiModel.RemoveActiveAiController(this),
				this.AiHateList.UnBindEvents(),
				this.AiTaunt.Clear(),
				this.AiPerception?.Clear(!1)),
			(this.CharAiDesignComp = e),
			(this.CharActorComp = void 0),
			this.pie(),
			!this.NpcDecision) &&
			this.cY &&
			this.CharActorComp &&
			this.fie === Protocol_1.Aki.Protocol.wks.Proto_Npc &&
			((this.NpcDecision = new NpcDecisionController_1.NpcDecisionController()),
			this.NpcDecision.Init(this));
	}
	pie() {
		var e, i;
		this.CharAiDesignComp?.Valid &&
			((e = this.CharAiDesignComp.Entity),
			(this.CharActorComp = e.GetComponent(3)),
			(i = this.CharActorComp.CreatureData),
			(this.fie = this.CharActorComp.CreatureData.GetEntityType()),
			(this.CharSkillComp = e.GetComponent(33)),
			(i = i.ComponentDataMap.get("Kvs"))?.Kvs?.Aps &&
				(this.Cie = MathUtils_1.MathUtils.LongToBigInt(i?.Kvs?.Aps)),
			i?.Kvs?.Ups &&
				(this.AiCombatMessageId = MathUtils_1.MathUtils.LongToBigInt(
					i?.Kvs?.Ups,
				)),
			(i = i?.Kvs?.Pps ?? 0),
			(this.gie = i),
			ModelManager_1.ModelManager.AiModel.AddActiveAiController(this),
			this.AiHateList.RefreshAbilityComp(),
			this.AiTaunt.Init(this.AiHateList),
			this.AiPatrol.Init(this.CharActorComp),
			this.AiAlert.Init(this.CharActorComp),
			this.AiPerception) &&
			(i = e.GetComponent(106)) &&
			i.SetLogicRange(this.AiPerception.MaxSenseRange),
			(this.cY = !!this.CharAiDesignComp && this.CharAiDesignComp.Active),
			this.CharActorComp &&
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"Ai",
					this.CharActorComp?.Entity,
					"AiController.InitBaseInfo",
					["enabled", this.cY],
				);
	}
	GetTeamLevelId() {
		if (this.CharAiDesignComp?.Valid) {
			var e = BlackboardController_1.BlackboardController.GetIntValueByEntity(
				this.CharAiDesignComp.Entity.Id,
				"TeamID",
			);
			if (e) return e;
		}
		return (
			this.gie ||
				((this.gie = 1),
				(e = this.CharActorComp.CreatureData.GetPbEntityInitData()) &&
					(e = (0, IComponent_1.getComponent)(
						e.ComponentsData,
						"AiComponent",
					)?.AiTeamLevelId) &&
					(this.gie = e)),
			this.gie
		);
	}
	LoadAiConfigs(e, i = !1) {
		this.CharActorComp?.Valid
			? (ConfigManager_1.ConfigManager.AiConfig.LoadAiConfig(this, e, i),
				this.cY &&
					(this.AiHateList.UnBindEvents(), this.AiHateList.BindEvents()),
				this.AiTaunt.Reset(this.AiHateList))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"BehaviorTree",
					6,
					"Can't load ai config without binding a Character.",
				);
	}
	Clear() {
		AiModelController_1.AiModelController.RemoveAiFromTeam(this),
			this.AiTaunt.Clear(),
			this.AiPerceptionEvents.Clear(!0),
			this.AiHateList.Clear(),
			this.AiPerception &&
				(this.AiPerception.Clear(), (this.AiPerception = void 0)),
			this.AiConditionEvents.Clear(),
			this.AiAlert.Clear(),
			this.AiCoolDownEvents.clear(),
			ModelManager_1.ModelManager.AiModel.RemoveActiveAiController(this),
			ModelManager_1.ModelManager.AiModel.RemoveObject(this),
			this.AiPatrol.Clear(),
			(this.AiTeam = void 0),
			(this.CharAiDesignComp = void 0),
			(this.CharActorComp = void 0),
			(this.CharSkillComp = void 0),
			(this.AiSkill = void 0),
			(this.AiWanderInfos = void 0),
			(this.AiBase = void 0),
			(this.AiFlee = void 0),
			this.NpcDecision &&
				(this.NpcDecision.Destroy(), (this.NpcDecision = void 0)),
			(this.cY = !1);
	}
	SetEnable(e) {
		this.cY !== e &&
			((this.cY = e)
				? (this.AiHateList.BindEvents(),
					this.AiTaunt.Reset(this.AiHateList),
					AiModelController_1.AiModelController.AddAiToTeam(
						this,
						this.GetTeamLevelId(),
					))
				: (this.AiPerception?.Clear(!1),
					this.AiTaunt.Clear(),
					this.AiHateList.Clear(!1),
					this.AiPerceptionEvents.Clear(),
					AiModelController_1.AiModelController.RemoveAiFromTeam(this)),
			(this.mie = 0));
	}
	OnSwitchControl(e, i) {
		this.SetControllerPlayerId(i),
			e && this.AiConditionEvents.ResetAllConditionEvent(),
			this.ResetSwitchControlState(),
			this.UpdateCooldownTrigger();
	}
	SetControllerPlayerId(e) {
		this.ControllerPlayerId = e;
	}
	PreSwitchControl() {
		this.CharActorComp.IsAutonomousProxy &&
			(this.CharSkillComp.CurrentSkill
				? (this.die = 1)
				: (this.AiControlSwitchRequest(this.CharActorComp.Entity, this),
					(this.die = 2)));
	}
	OnSkillEnd() {
		this.CharActorComp.IsAutonomousProxy &&
			1 === this.die &&
			(this.AiControlSwitchRequest(this.CharActorComp.Entity, this),
			(this.die = 2));
	}
	IsWaitingSwitchControl() {
		return 1 === this.die || 2 === this.die;
	}
	ResetSwitchControlState() {
		this.die = 0;
	}
	GetCoolDownTime(e) {
		return this.AiCoolDownList.get(e)?.[0] ?? 0;
	}
	GetCoolDownRemainTime(e) {
		e = this.GetCoolDownTime(e);
		var i = ModelManager_1.ModelManager.GameModeModel.IsMulti
			? TimeUtil_1.TimeUtil.GetServerTimeStamp()
			: Time_1.Time.WorldTime;
		return e < i ? 0 : e - i;
	}
	IsCoolDownTriggered(e) {
		return this.AiCoolDownList.get(e)?.[1] ?? !0;
	}
	UpdateCooldownTrigger() {
		if (this.CharActorComp?.IsAutonomousProxy) {
			var e,
				i,
				t,
				o = ModelManager_1.ModelManager.GameModeModel.IsMulti
					? TimeUtil_1.TimeUtil.GetServerTimeStamp()
					: Time_1.Time.WorldTime;
			for ([e, [i, t]] of this.AiCoolDownList)
				!t && i < o && this.ActivateCooldownTrigger(e);
		}
	}
	ActivateCooldownTrigger(e) {
		var i,
			t,
			o = this.AiCoolDownList.get(e)?.[0],
			r = this.AiCoolDownEvents.get(e);
		this.AiCoolDownList.set(e, [o ?? 0, !0]),
			ModelManager_1.ModelManager.GameModeModel.IsMulti &&
				(((t = (i = Protocol_1.Aki.Protocol.Ai).vNn.create()).nkn = [
					i.a2s.create({ skn: e, akn: !0 }),
				]),
				CombatMessage_1.CombatNet.Call(26355, this.CharAiDesignComp.Entity, t)),
			void 0 !== o && r && r.IsValid() && r.Callback.Broadcast(!0);
	}
	GetCoolDownReady(e) {
		return this.GetCoolDownRemainTime(e) <= 0;
	}
	AddCoolDownTime(e, i) {
		let t = this.GetCoolDownTime(e);
		var o = ModelManager_1.ModelManager.GameModeModel.IsMulti
			? Time_1.Time.ServerTimeStamp
			: Time_1.Time.WorldTime;
		(!t || o > t) && (t = o), this.SetCoolDownTime(e, t + i, !0, "使用技能");
	}
	SetCoolDownTime(e, i, t, o = "") {
		var r = this.GetCoolDownTime(e);
		r && i < r
			? CombatDebugController_1.CombatDebugController.CombatInfo(
					"Ai",
					this.CharAiDesignComp.Entity,
					o + ":设置Cd失败，比当前冷却结束时间小",
					["id", e],
					["curNetTime", r],
					["nextTime", i],
				)
			: (CombatDebugController_1.CombatDebugController.CombatInfo(
					"Ai",
					this.CharAiDesignComp.Entity,
					o + ":设置Cd",
					["id", e],
					["nextTime", i],
				),
				this.AiCoolDownList.set(e, [i, !1]),
				(r = Protocol_1.Aki.Protocol.Ai),
				ModelManager_1.ModelManager.GameModeModel.IsMulti &&
					t &&
					(((o = r.vNn.create()).hkn = [r.s2s.create({ skn: e, akn: i })]),
					(o.nkn = [r.a2s.create({ skn: e, akn: !1 })]),
					CombatMessage_1.CombatNet.Call(
						26355,
						this.CharAiDesignComp.Entity,
						o,
					)));
	}
	InitCooldownTimer(e, i) {
		var t = ModelManager_1.ModelManager.GameModeModel.IsMulti
			? Time_1.Time.ServerTimeStamp
			: Time_1.Time.WorldTime;
		this.AiCoolDownEvents.has(e)
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"MultiplayerCombat",
					20,
					"重复注册AIC计时器",
					["Actor", this.CharActorComp?.Actor?.GetName()],
					["id", e],
				)
			: (this.AiCoolDownEvents.set(e, i),
				this.SetCoolDownTime(e, t, !0, "初始化AIC延迟节点"));
	}
	static AiInformationNotify(e, i) {
		var t = e.GetComponent(38)?.AiController;
		for (const e of i.tfs)
			t.SetCoolDownTime(
				e.skn,
				MathUtils_1.MathUtils.LongToNumber(e.akn),
				!1,
				"远程同步",
			);
	}
	static AiInformationS(e, i) {
		var t = e.GetComponent(38)?.AiController;
		if (t) {
			for (var { skn: o, akn: r } of i.hkn) {
				var n = t.AiCoolDownList.get(o)?.[1] ?? !0;
				t.AiCoolDownList.set(o, [
					Number(MathUtils_1.MathUtils.LongToBigInt(r)),
					n,
				]);
			}
			for (var { skn: s, akn: a } of i.nkn) {
				var l = t.AiCoolDownList.get(s)?.[0] ?? 0;
				t.AiCoolDownList.set(s, [l, a]);
			}
			for (const e of i.ifs)
				t.AiCoolDownList.delete(e), t.AiCoolDownEvents.delete(e);
		}
	}
	AiControlSwitchRequest(e, i) {
		var t = Protocol_1.Aki.Protocol.Ai.Jjn.create();
		const o = e.GetComponent(0).GetCreatureDataId();
		(t.rkn = MathUtils_1.MathUtils.NumberToLong(o)),
			Net_1.Net.Call(18260, t, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"AI",
							15,
							"AiControlSwitchRequest返回错误",
							["EntityId", o],
							["ErrorCode", e.lkn],
						),
					i.ResetSwitchControlState());
			});
	}
}
__decorate(
	[CombatMessage_1.CombatNet.SyncHandle("l2n")],
	AiController,
	"AiInformationNotify",
	null,
),
	__decorate(
		[CombatMessage_1.CombatNet.SyncHandle("m2n")],
		AiController,
		"AiInformationS",
		null,
	),
	(exports.AiController = AiController);
