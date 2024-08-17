"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineTaskSkill = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../../Utils/CombatDebugController"),
	AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskSkill extends AiStateMachineTask_1.AiStateMachineTask {
	constructor() {
		super(...arguments),
			(this.SkillName = ""),
			(this.SkillId = 0),
			(this.Timeout = 0),
			(this.Done = !1),
			(this.PreExecution = !1);
	}
	OnInit(e) {
		return this.Node.SkillId
			? (this.Node.Owner.PushErrorMessage(
					`状态节点配置错误，重复配置技能，节点[${this.Node.Name}]]`,
				),
				!1)
			: (e.TaskSkillByName
					? ((this.SkillName = e.TaskSkillByName.SkillName),
						(this.SkillId =
							this.Node.Entity.GetComponent(33).GetSkillByName(this.SkillName)
								?.SkillId ?? 0),
						(this.Node.SkillId = this.SkillId))
					: e.TaskSkill
						? ((this.SkillId = e.TaskSkill.SkillId),
							(this.Node.SkillId = e.TaskSkill.SkillId))
						: this.Node.Owner.PushErrorMessage(
								`状态节点配置错误，技能为空，节点[${this.Node.Name}]]`,
							),
				!0);
	}
	OnEnter(e) {
		var t;
		this.SkillId
			? ((this.PreExecution = this.Node.RootNode.WaitSwitchState),
				(this.Done = !1),
				this.SkillId &&
					(this.Node.ActorComponent.IsAutonomousProxy || this.PreExecution) &&
					(this.Node.SkillComponent.StopAllSkills(
						"AiStateMachineTaskSkill.OnEnter",
					),
					(t = this.Node.AiController.AiHateList.GetCurrentTarget()),
					(this.Done = this.Node.SkillComponent.BeginSkill(this.SkillId, {
						Target: t?.Entity,
						ContextId: e,
						Context: "AiStateMachineTaskSkill.OnEnter",
					}))))
			: CombatDebugController_1.CombatDebugController.CombatError(
					"StateMachineNew",
					this.Node.Entity,
					`状态节点执行技能失败，技能查询失败，节点[${this.Node.Name}]，技能名[${this.SkillName}]`,
				);
	}
	OnTick(e, t) {
		var i;
		this.Done ||
			(!this.Node.ActorComponent.IsAutonomousProxy && !this.PreExecution) ||
			(this.Node.ElapseTime < this.Timeout
				? (this.Done = this.Node.SkillComponent.BeginSkill(this.SkillId, {
						ContextId: t,
						Context: "AiStateMachineTaskSkill.OnTick",
					}))
				: (CombatDebugController_1.CombatDebugController.CombatInfo(
						"StateMachineNew",
						this.Node.Entity,
						`状态机技能释放失败 节点[${this.Node.Name}]，技能名[${this.SkillName}]`,
					),
					((i = Protocol_1.Aki.Protocol.UNn.create()).vkn = this.SkillId),
					CombatMessage_1.CombatNet.Call(
						14218,
						this.Node.Entity,
						i,
						() => {},
						t,
					),
					(this.Node.TaskFinish = !0),
					(this.Done = !0)));
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineTaskSkill = AiStateMachineTaskSkill;
