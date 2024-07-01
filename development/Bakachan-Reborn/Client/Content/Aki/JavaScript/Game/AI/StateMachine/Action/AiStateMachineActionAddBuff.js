"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineActionAddBuff = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionAddBuff extends AiStateMachineAction_1.AiStateMachineAction {
	constructor() {
		super(...arguments), (this.BuffId = void 0);
	}
	OnInit(t) {
		return (this.BuffId = BigInt(t.ActionAddBuff.BuffId)), !0;
	}
	ToString(t, e = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(t, e);
	}
}
exports.AiStateMachineActionAddBuff = AiStateMachineActionAddBuff;
