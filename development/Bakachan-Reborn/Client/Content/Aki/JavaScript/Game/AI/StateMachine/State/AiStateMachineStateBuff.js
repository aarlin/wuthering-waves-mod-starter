"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateBuff = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateBuff extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments), (this.BuffId = void 0);
	}
	OnInit(t) {
		return (this.BuffId = BigInt(t.BindBuff.BuffId)), !0;
	}
	ToString(t, e = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(t, e);
	}
}
exports.AiStateMachineStateBuff = AiStateMachineStateBuff;
