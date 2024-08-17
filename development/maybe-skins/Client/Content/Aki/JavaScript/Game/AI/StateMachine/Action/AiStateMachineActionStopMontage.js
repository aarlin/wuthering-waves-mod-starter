"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineActionStopMontage = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionStopMontage extends AiStateMachineAction_1.AiStateMachineAction {
	OnInit(t) {
		return !0;
	}
	DoAction() {
		this.Node.AnimationComponent.MainAnimInstance.Montage_Stop(0);
	}
	ToString(t, e = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(t, e);
	}
}
exports.AiStateMachineActionStopMontage = AiStateMachineActionStopMontage;
