"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineActionCue = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionCue extends AiStateMachineAction_1.AiStateMachineAction {
	constructor() {
		super(...arguments), (this.Vre = void 0);
	}
	OnInit(e) {
		this.Vre = [];
		for (const t of e.ActionCue.CueIds) this.Vre.push(BigInt(t));
		return !0;
	}
	DoAction() {
		this.Node.BuffComponent.AddGameplayCue(this.Vre, 0, "状态机");
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineActionCue = AiStateMachineActionCue;
