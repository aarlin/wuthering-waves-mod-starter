"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineActionActivateSkillGroup = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionActivateSkillGroup extends AiStateMachineAction_1.AiStateMachineAction {
	constructor() {
		super(...arguments), (this.ConfigId = 0), (this.Activate = !1);
	}
	OnInit(t) {
		return (
			(this.ConfigId = t.ActionActivateSkillGroup.ConfigId),
			(this.Activate = t.ActionActivateSkillGroup.Activate),
			!0
		);
	}
	DoAction() {
		this.Node.AiController?.AiSkill?.ActivateSkillGroup(
			this.ConfigId,
			this.Activate,
		);
	}
	ToString(t, i = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(t, i);
	}
}
exports.AiStateMachineActionActivateSkillGroup =
	AiStateMachineActionActivateSkillGroup;
