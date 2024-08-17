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
			(this.Ete = new Set());
	}
	OnInit() {
		var e =
			AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(
				commonStateMachine,
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
		for (const r of BlackboardWhiteListAll_1.configBlackboardWhiteListAll.GetConfigList())
			this.Ete.add(r.Key);
		return !0;
	}
	OnClear() {
		return this.Ete.clear(), !0;
	}
	CheckBlackboardWhiteList(e) {
		return this.Ete.has(e);
	}
	LoadAiConfig(e, r, i = !1) {
		var o = e.CharActorComp;
		(e.AiBase = AiBaseById_1.configAiBaseById.GetConfig(r)),
			e.AiBase
				? (e.AiBase.SubBehaviorConfigs && this.Ste(e, i),
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
						["Id", r],
						["Target", o.Actor.GetName()],
						["CreatureId", o.CreatureData.GetOwnerId()],
					);
	}
	yte(e) {
		var r = e.CharActorComp,
			i = r.CreatureData?.GetPbEntityInitData();
		i &&
			(i = (0, IComponent_1.getComponent)(i.ComponentsData, "AiComponent"))
				?.InitState &&
			1 === i.InitState.Type &&
			i.InitState.Wander &&
			!e.AiWanderRadiusConfig &&
			((e.AiWanderRadiusConfig =
				AiWanderRadiusConfigById_1.configAiWanderRadiusConfigById.GetConfig(
					i.InitState.Wander,
				)),
			!e.AiWanderRadiusConfig) &&
			Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn(
				"BehaviorTree",
				58,
				"缺少AiWander的范围配置",
				["Id", i.InitState.Wander],
				["Target", r.Actor.GetName()],
				["CreatureId", r.CreatureData.GetOwnerId()],
			);
	}
	Ste(e, r = !1) {
		var i = e.CharActorComp,
			o = this.LoadSpecialHateAndSenseConfig(e);
		this.yte(e);
		let a = e.AiBase.SubBehaviorConfigs.get("AiWander");
		if (
			(a &&
				(e.AiWanderInfos ||
					(e.AiWanderInfos = new AiWanderInfos_1.AiWanderInfos()),
				(e.AiWanderInfos.AiWander = AiWanderById_1.configAiWanderById.GetConfig(
					Number(a),
				)),
				e.AiWanderInfos.AiWander ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							6,
							"缺少AiWander配置",
							["Id", a],
							["Target", i.Actor.GetName()],
							["CreatureId", i.CreatureData.GetOwnerId()],
						))),
			(a = e.AiBase.SubBehaviorConfigs.get("AiBattleWander")))
		) {
			e.AiWanderInfos ||
				(e.AiWanderInfos = new AiWanderInfos_1.AiWanderInfos());
			var n = AiBattleWanderById_1.configAiBattleWanderById.GetConfig(
				Number(a),
			);
			if (n)
				if (0 === n.GroupIds.length)
					e.AiWanderInfos.AiBattleWanderGroups = new Array();
				else {
					var t = new Array();
					for (const f of n.GroupIds) {
						var d =
							AiBattleWanderGroupById_1.configAiBattleWanderGroupById.GetConfig(
								f,
							);
						t.push(d);
					}
					var A = new Map();
					for (const B of t) A.set(B.Id, B);
					t.length = 0;
					for (const l of n.GroupIds) t.push(A.get(l));
					e.AiWanderInfos.AiBattleWanderGroups = t;
				}
			else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						6,
						"缺少AiBattleWander配置",
						["Id", a],
						["Target", i.Actor.GetName()],
						["CreatureId", i.CreatureData.GetOwnerId()],
					);
		}
		(a = e.AiBase.SubBehaviorConfigs.get("AiBaseSkill")) &&
			((e.AiSkill = new AiSkill_1.AiSkill(e)),
			(e.AiSkill.BaseSkill = AiBaseSkillById_1.configAiBaseSkillById.GetConfig(
				Number(a),
			)),
			e.AiSkill.BaseSkill
				? this.Ite(e.AiSkill)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"BehaviorTree",
						6,
						"缺少AiBaseSkill配置",
						["Id", a],
						["Target", i.Actor.GetName()],
						["CreatureId", i.CreatureData.GetOwnerId()],
					)),
			(e.AiHateList.AiHate = this.LoadAiHateByController(e, o)),
			(e.AiAlert.AiAlertConfig = this.LoadAiAlert(
				e.AiBase.SubBehaviorConfigs.get("AiAlert"),
			)),
			(r && !e.AiAlert.AiAlertConfig) ||
				(e.AiPerception = this.Tte(
					e,
					e.AiBase.SubBehaviorConfigs.get("AiSense"),
					o,
				)),
			(a = e.AiBase.SubBehaviorConfigs.get("AiPatrol")) &&
				((n = a.split("|")),
				(r = AiPatrolById_1.configAiPatrolById.GetConfig(Number(n[0]))),
				e.AiPatrol.ResetConfig(r),
				r ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							6,
							"缺少AiPatrol配置",
							["Id", a],
							["Target", i.Actor.GetName()],
							["CreatureId", i.CreatureData.GetOwnerId()],
						))),
			(a = e.AiBase.SubBehaviorConfigs.get("AiFlee")) &&
				((e.AiFlee = AiFleeById_1.configAiFleeById.GetConfig(Number(a))),
				e.AiFlee ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"BehaviorTree",
							6,
							"缺少AiFlee配置",
							["Id", a],
							["Target", i.Actor.GetName()],
							["CreatureId", i.CreatureData.GetOwnerId()],
						)));
	}
	Ite(e) {
		0 < e.BaseSkill.RandomSkills.length && e.ActiveSkillGroup.add(0);
		var r,
			i = new Set(),
			o = new Array();
		for (const t of e.BaseSkill.RandomSkills)
			for (const d of t.ArrayInt)
				i.has(d) ||
					(i.add(d),
					(r = AiSkillInfosById_1.configAiSkillInfosById.GetConfig(d)),
					o.push(r));
		i.clear();
		var a,
			n = new Array();
		for (const A of o)
			e.SkillInfos.set(A.Id, A),
				i.has(A.SkillPreconditionId) ||
					(i.add(A.SkillPreconditionId),
					(a =
						AiSkillPreconditionById_1.configAiSkillPreconditionById.GetConfig(
							A.SkillPreconditionId,
						)),
					n.push(a));
		for (const f of n) e.SkillPreconditionMap.set(f.Id, f);
		e.InitTagMap();
	}
	LoadAiTeamConfigNew(e, r) {
		if (
			((e.AiTeamLevel =
				AiTeamLevelNewById_1.configAiTeamLevelNewById.GetConfig(r)),
			e.AiTeamLevel)
		) {
			e.AiTeamAreas = [];
			for (const n of e.AiTeamLevel.PositionId) {
				var i = AiTeamAreaNewById_1.configAiTeamAreaNewById.GetConfig(n);
				e.AiTeamAreas.push(i);
			}
			e.AiTeamAttacks = new Array();
			var o = new Map();
			for (const t of e.AiTeamAreas) {
				var a = o.get(t.AttackWeightId);
				a
					? e.AiTeamAttacks.push(a)
					: (a = AiTeamAttackById_1.configAiTeamAttackById.GetConfig(
								t.AttackWeightId,
							))
						? (o.set(t.AttackWeightId, a), e.AiTeamAttacks.push(a))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"BehaviorTree",
								6,
								"没有配置AiTeamAttack",
								["AttackWeightId", t.AttackWeightId],
								["LocationId", t.Id],
							);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("AI", 6, "没有配置AiTeamLevel", ["Id", r]);
	}
	LoadAiPatrolConfig(e, r) {
		if (e && e.SubBehaviorConfigs) {
			e = e.SubBehaviorConfigs.get("AiPatrol");
			if (e) {
				e = e.split("|");
				if (!(e.length <= r)) {
					var i = AiPatrolById_1.configAiPatrolById.GetConfig(Number(e[r]));
					if (i) return i;
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "缺少AiPatrol配置", [
							"Id",
							e[r],
						]);
				}
			}
		}
	}
	LoadAiPatrolConfigById(e) {
		var r = AiPatrolById_1.configAiPatrolById.GetConfig(e);
		if (r) return r;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("BehaviorTree", 6, "缺少AiPatrol配置", ["Id", e]);
	}
	Tte(e, r, i) {
		if (r) {
			var o = AiSenseGroupById_1.configAiSenseGroupById.GetConfig(Number(r));
			if (o) {
				if (0 === o.AiSenseIds.length)
					return new AiPerception_1.AiPerception(e, o, new Array());
				let r = 0;
				var a = [],
					n = new Array();
				for (const A of o.AiSenseIds) {
					let e = -1;
					0 === r && i
						? ((e = i.FirstAiSenseId), a.push(i.FirstAiSenseId))
						: ((e = A), a.push(A));
					var t = AiSenseById_1.configAiSenseById.GetConfig(e);
					n.push(t), ++r;
				}
				var d = new Map();
				for (const f of n) d.set(f.Id, f);
				n.length = 0;
				for (const B of a) n.push(d.get(B));
				return new AiPerception_1.AiPerception(e, o, n);
			}
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"BehaviorTree",
					6,
					"缺少AiSenseGroup配置",
					["Id", r],
					["Actor", e.CharActorComp.Actor.GetName()],
				);
		}
	}
	LoadAiSense(e) {
		var r = AiSenseById_1.configAiSenseById.GetConfig(Number(e));
		if (r) return r;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("BehaviorTree", 6, "缺少AiSense配置", ["AiSenseId", e]);
	}
	LoadSpecialHateAndSenseConfig(e) {
		e = e.CharActorComp.Entity.GetComponent(0).GetMonsterComponent();
		let r = void 0;
		return (
			e?.SpecialHateAndSenseConfig &&
				!(r = SpecialHateAndSenseById_1.configSpecialHateAndSenseById.GetConfig(
					e.SpecialHateAndSenseConfig,
				)) &&
				Log_1.Log.CheckError() &&
				Log_1.Log.Error("BehaviorTree", 6, "缺少SpecialHateAndSense配置", [
					"Id",
					e.SpecialHateAndSenseConfig,
				]),
			r
		);
	}
	LoadAiHate(e) {
		var r;
		if (e)
			return (
				(r = AiHateById_1.configAiHateById.GetConfig(Number(e))) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "缺少AiHate配置", ["Id", e])),
				r
			);
	}
	LoadAiHateByController(e, r) {
		let i = r;
		r = (i = i || this.LoadSpecialHateAndSenseConfig(e))
			? i.AiHateId.toString()
			: e.AiBase.SubBehaviorConfigs.get("AiHate");
		return this.LoadAiHate(Number(r));
	}
	LoadAiAlert(e) {
		var r;
		if (e)
			return (
				(r = AiAlertById_1.configAiAlertById.GetConfig(Number(e))) ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("BehaviorTree", 6, "缺少AiAlert配置", ["Id", e])),
				r
			);
	}
}
exports.AiConfig = AiConfig;
//# sourceMappingURL=AiConfig.js.map
