"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateAiSenseEnable = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateAiSenseEnable extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments), (this.ConfigId = 0);
	}
	OnInit(e) {
		return (this.ConfigId = e.BindAiSenseEnable.ConfigId), !0;
	}
	OnActivate() {
		this.Node.AiController.AiPerception?.SetAiSenseEnable(this.ConfigId, !0);
	}
	OnDeactivate() {
		this.Node.AiController.AiPerception?.SetAiSenseEnable(this.ConfigId, !1);
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineStateAiSenseEnable = AiStateMachineStateAiSenseEnable;
