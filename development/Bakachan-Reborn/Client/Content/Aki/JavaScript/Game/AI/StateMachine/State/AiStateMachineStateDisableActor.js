"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateDisableActor = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateDisableActor extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments), (this.Ane = 0);
	}
	OnActivate() {
		this.Ane = this.Node.ActorComponent.DisableActor("状态机隐藏");
	}
	OnDeactivate() {
		this.Node.ActorComponent.EnableActor(this.Ane), (this.Ane = 0);
	}
	ToString(t, e = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(t, e);
	}
}
exports.AiStateMachineStateDisableActor = AiStateMachineStateDisableActor;
