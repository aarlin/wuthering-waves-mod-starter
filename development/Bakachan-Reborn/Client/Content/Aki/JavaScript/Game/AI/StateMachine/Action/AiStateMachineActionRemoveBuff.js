"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineActionRemoveBuff = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionRemoveBuff extends AiStateMachineAction_1.AiStateMachineAction {
	constructor() {
		super(...arguments), (this.BuffId = void 0);
	}
	OnInit(e) {
		return (this.BuffId = BigInt(e.ActionRemoveBuff.BuffId)), !0;
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineActionRemoveBuff = AiStateMachineActionRemoveBuff;
