"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	AiAlertById_1 = require("../../../Core/Define/ConfigQuery/AiAlertById"),
	AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById"),
	AiBaseSkillById_1 = require("../../../Core/Define/ConfigQuery/AiBaseSkillById"),
	AiBattleWanderById_1 = require("../../../Core/Define/ConfigQuery/AiBattleWanderById"),
	AiBattleWanderGroupById_1 = require("../../../Core/Define/ConfigQuery/AiBattleWanderGroupById"),
	AiFleeById_1 = require("../../../Core/Define/ConfigQuery/AiFleeById"),
	AiHateById_1 = require("../../../Core/Define/ConfigQuery/AiHateById"),
	AiPatrolById_1 = require("../../../Core/Define/ConfigQuery/AiPatrolById"),
	AiSenseById_1 = require("../../../Core/Define/ConfigQuery/AiSenseById"),
	AiSenseGroupById_1 = require("../../../Core/Define/ConfigQuery/AiSenseGroupById"),
	AiSkillInfosById_1 = require("../../../Core/Define/ConfigQuery/AiSkillInfosById"),
	AiSkillPreconditionById_1 = require("../../../Core/Define/ConfigQuery/AiSkillPreconditionById"),
	AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById"),
	AiTeamAreaNewById_1 = require("../../../Core/Define/ConfigQuery/AiTeamAreaNewById"),
	AiTeamAttackById_1 = require("../../../Core/Define/ConfigQuery/AiTeamAttackById"),
	AiTeamLevelNewById_1 = require("../../../Core/Define/ConfigQuery/AiTeamLevelNewById"),
	AiWanderById_1 = require("../../../Core/Define/ConfigQuery/AiWanderById"),
	AiWanderRadiusConfigById_1 = require("../../../Core/Define/ConfigQuery/AiWanderRadiusConfigById"),
	BlackboardWhiteListAll_1 = require("../../../Core/Define/ConfigQuery/BlackboardWhiteListAll"),
	SpecialHateAndSenseById_1 = require("../../../Core/Define/ConfigQuery/SpecialHateAndSenseById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	AiPerception_1 = require("../Controller/AiPerception"),
	AiSkill_1 = require("../Controller/AiSkill"),
	AiWanderInfos_1 = require("../Controller/AiWanderInfos"),
	commonStateMachine = "SM_Common";
class AiConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments),
			(this.CommonStateMachineJsonObject = void 0),
			(this.Ste = new Set());
	}
	OnInit() {
		var e =
			AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
				"SM_Common",
			);
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						31,
						"AiConfig Init fail, no commonStateMachine config",
					),
				!1
			);
		this.CommonStateMachineJsonObject = JSON.parse(e.StateMachineJson);
		for (const e of BlackboardWhiteListAll_1.configBlackboardWhiteListAll.GetConfigList())
			this.Ste.add(e.Key);
		return !0;
	}
	OnClear() {
		return this.Ste.clear(), !0;
	}
	CheckBlackboardWhiteList(e) {
		return this.Ste.has(e);
	}
	LoadAiConfig(e, i, r = !1) {
		var o = e.CharActorComp;
		(e.AiBase = AiBaseById_1.configAiBaseById.GetConfig(i)),
			e.AiBase
				? (e.AiBase.SubBehaviorConfigs && this.Ete(e, r),
					e.AiBase.StateMachine &&
						(e.StateMachineConfig =
							AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
								e.AiBase.StateMachine,
							)))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						6,
						"缺少AiBase配置",
						["Id", i],
						["Target", o.Actor.GetName()],
						["CreatureId", o.CreatureData.GetOwnerId()],
					);
	}
	yte(e) {
		var i = e.CharActorComp,
			r = i.CreatureData?.GetPbEntityInitData();
		r &&
			(r = (0, IComponent_1.getComponent)(r.ComponentsData, "AiComponent"))
				?.InitState &&
			1 === r.InitState.Type &&
			r.InitState.Wander &&
			!e.AiWanderRadiusConfig &&
			((e.AiWanderRadiusConfig =
				AiWanderRadiusConfigById_1.configAiWanderRadiusConfigById.GetConfig(
					r.InitState.Wander,
				)),
			!e.AiWanderRadiusConfig) &&
			Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"BehaviorTree",
				58,
				"缺少AiWander的范围配置",
				["Id", r.InitState.Wander],
				["Target", i.Actor.GetName()],
				["CreatureId", i.CreatureData.GetOwnerId()],
			);
	}
	Ete(e, i = !1) {
		var r = e.CharActorComp,
			o = this.LoadSpecialHateAndSenseConfig(e);
		this.yte(e);
		let t = e.AiBase.SubBehaviorConfigs.get("AiWander");
		if (
			(t &&
				(e.AiWanderInfos ||
					(e.AiWanderInfos = new AiWanderInfos_1.AiWanderInfos()),
				(e.AiWanderInfos.AiWander = AiWanderById_1.configAiWanderById.GetConfig(
					Number(t),
				)),
				e.AiWanderInfos.AiWander ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							6,
							"缺少AiWander配置",
							["Id", t],
							["Target", r.Actor.GetName()],
							["CreatureId", r.CreatureData.GetOwnerId()],
						))),
			(t = e.AiBase.SubBehaviorConfigs.get("AiBattleWander")))
		) {
			e.AiWanderInfos ||
				(e.AiWanderInfos = new AiWanderInfos_1.AiWanderInfos());
			var n = AiBattleWanderById_1.configAiBattleWanderById.GetConfig(
				Number(t),
			);
			if (n)
				if (0 === n.GroupIds.length)
					e.AiWanderInfos.AiBattleWanderGroups = new Array();
				else {
					var a = new Array();
					for (const e of n.GroupIds) {
						var A =
							AiBattleWanderGroupById_1.configAiBattleWanderGroupById.GetConfig(
								e,
							);
						a.push(A);
					}
					var d = new Map();
					for (const e of a) d.set(e.Id, e);
					a.length = 0;
					for (const e of n.GroupIds) a.push(d.get(e));
					e.AiWanderInfos.AiBattleWanderGroups = a;
				}
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						6,
						"缺少AiBattleWander配置",
						["Id", t],
						["Target", r.Actor.GetName()],
						["CreatureId", r.CreatureData.GetOwnerId()],
					);
		}
		(t = e.AiBase.SubBehaviorConfigs.get("AiBaseSkill")) &&
			((e.AiSkill = new AiSkill_1.AiSkill(e)),
			(e.AiSkill.BaseSkill = AiBaseSkillById_1.configAiBaseSkillById.GetConfig(
				Number(t),
			)),
			e.AiSkill.BaseSkill
				? this.Ite(e.AiSkill)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						6,
						"缺少AiBaseSkill配置",
						["Id", t],
						["Target", r.Actor.GetName()],
						["CreatureId", r.CreatureData.GetOwnerId()],
					)),
			(e.AiHateList.AiHate = this.LoadAiHateByController(e, o)),
			(e.AiAlert.AiAlertConfig = this.LoadAiAlert(
				e.AiBase.SubBehaviorConfigs.get("AiAlert"),
			)),
			(i && !e.AiAlert.AiAlertConfig) ||
				(e.AiPerception = this.Tte(
					e,
					e.AiBase.SubBehaviorConfigs.get("AiSense"),
					o,
				)),
			(t = e.AiBase.SubBehaviorConfigs.get("AiPatrol")) &&
				((n = t.split("|")),
				(i = AiPatrolById_1.configAiPatrolById.GetConfig(Number(n[0]))),
				e.AiPatrol.ResetConfig(i),
				i ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							6,
							"缺少AiPatrol配置",
							["Id", t],
							["Target", r.Actor.GetName()],
							["CreatureId", r.CreatureData.GetOwnerId()],
						))),
			(t = e.AiBase.SubBehaviorConfigs.get("AiFlee")) &&
				((e.AiFlee = AiFleeById_1.configAiFleeById.GetConfig(Number(t))),
				e.AiFlee ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							6,
							"缺少AiFlee配置",
							["Id", t],
							["Target", r.Actor.GetName()],
							["CreatureId", r.CreatureData.GetOwnerId()],
						)));
	}
	Ite(e) {
		0 < e.BaseSkill.RandomSkills.length && e.ActiveSkillGroup.add(0);
		var i,
			r = new Set(),
			o = new Array();
		for (const t of e.BaseSkill.RandomSkills)
			for (const e of t.ArrayInt)
				r.has(e) ||
					(r.add(e),
					(i = AiSkillInfosById_1.configAiSkillInfosById.GetConfig(e)),
					o.push(i));
		r.clear();
		var t,
			n = new Array();
		for (const i of o)
			e.SkillInfos.set(i.Id, i),
				r.has(i.SkillPreconditionId) ||
					(r.add(i.SkillPreconditionId),
					(t =
						AiSkillPreconditionById_1.configAiSkillPreconditionById.GetConfig(
							i.SkillPreconditionId,
						)),
					n.push(t));
		for (const i of n) e.SkillPreconditionMap.set(i.Id, i);
		e.InitTagMap();
	}
	LoadAiTeamConfigNew(e, i) {
		if (
			((e.AiTeamLevel =
				AiTeamLevelNewById_1.configAiTeamLevelNewById.GetConfig(i)),
			e.AiTeamLevel)
		) {
			e.AiTeamAreas = [];
			for (const i of e.AiTeamLevel.PositionId) {
				var r = AiTeamAreaNewById_1.configAiTeamAreaNewById.GetConfig(i);
				e.AiTeamAreas.push(r);
			}
			e.AiTeamAttacks = new Array();
			var o = new Map();
			for (const i of e.AiTeamAreas) {
				var t = o.get(i.AttackWeightId);
				t
					? e.AiTeamAttacks.push(t)
					: (t = AiTeamAttackById_1.configAiTeamAttackById.GetConfig(
								i.AttackWeightId,
							))
						? (o.set(i.AttackWeightId, t), e.AiTeamAttacks.push(t))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"BehaviorTree",
								6,
								"没有配置AiTeamAttack",
								["AttackWeightId", i.AttackWeightId],
								["LocationId", i.Id],
							);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("AI", 6, "没有配置AiTeamLevel", ["Id", i]);
	}
	LoadAiPatrolConfig(e, i) {
		if (
			e &&
			e.SubBehaviorConfigs &&
			(e = e.SubBehaviorConfigs.get("AiPatrol")) &&
			!((e = e.split("|")).length <= i)
		) {
			var r = AiPatrolById_1.configAiPatrolById.GetConfig(Number(e[i]));
			if (r) return r;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "缺少AiPatrol配置", ["Id", e[i]]);
		}
	}
	LoadAiPatrolConfigById(e) {
		var i = AiPatrolById_1.configAiPatrolById.GetConfig(e);
		if (i) return i;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("BehaviorTree", 6, "缺少AiPatrol配置", ["Id", e]);
	}
	Tte(e, i, r) {
		if (i) {
			var o = AiSenseGroupById_1.configAiSenseGroupById.GetConfig(Number(i));
			if (o) {
				if (0 === o.AiSenseIds.length)
					return new AiPerception_1.AiPerception(e, o, new Array());
				let i = 0;
				var t = [],
					n = new Array();
				for (const e of o.AiSenseIds) {
					let o = -1;
					0 === i && r
						? ((o = r.FirstAiSenseId), t.push(r.FirstAiSenseId))
						: ((o = e), t.push(e));
					var a = AiSenseById_1.configAiSenseById.GetConfig(o);
					n.push(a), ++i;
				}
				var A = new Map();
				for (const e of n) A.set(e.Id, e);
				n.length = 0;
				for (const e of t) n.push(A.get(e));
				return new AiPerception_1.AiPerception(e, o, n);
			}
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"BehaviorTree",
					6,
					"缺少AiSenseGroup配置",
					["Id", i],
					["Actor", e.CharActorComp.Actor.GetName()],
				);
		}
	}
	LoadAiSense(e) {
		var i = AiSenseById_1.configAiSenseById.GetConfig(Number(e));
		if (i) return i;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("BehaviorTree", 6, "缺少AiSense配置", ["AiSenseId", e]);
	}
	LoadSpecialHateAndSenseConfig(e) {
		let i;
		return (
			(e = e.CharActorComp.Entity.GetComponent(0).GetMonsterComponent()),
			e?.SpecialHateAndSenseConfig &&
				!(i = SpecialHateAndSenseById_1.configSpecialHateAndSenseById.GetConfig(
					e.SpecialHateAndSenseConfig,
				)) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "缺少SpecialHateAndSense配置", [
					"Id",
					e.SpecialHateAndSenseConfig,
				]),
			i
		);
	}
	LoadAiHate(e) {
		var i;
		if (e)
			return (
				(i = AiHateById_1.configAiHateById.GetConfig(Number(e))) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "缺少AiHate配置", ["Id", e])),
				i
			);
	}
	LoadAiHateByController(e, i) {
		let r = i;
		return (
			(i = (r = r || this.LoadSpecialHateAndSenseConfig(e))
				? r.AiHateId.toString()
				: e.AiBase.SubBehaviorConfigs.get("AiHate")),
			this.LoadAiHate(Number(i))
		);
	}
	LoadAiAlert(e) {
		var i;
		if (e)
			return (
				(i = AiAlertById_1.configAiAlertById.GetConfig(Number(e))) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "缺少AiAlert配置", ["Id", e])),
				i
			);
	}
}
exports.AiConfig = AiConfig;
