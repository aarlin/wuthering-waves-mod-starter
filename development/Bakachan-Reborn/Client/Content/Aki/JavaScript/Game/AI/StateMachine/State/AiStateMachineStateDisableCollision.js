"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateDisableCollision = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateDisableCollision extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments), (this.Pne = 0);
	}
	OnActivate() {
		this.Pne = this.Node.ActorComponent.DisableCollision("状态机隐藏碰撞");
	}
	OnDeactivate() {
		this.Node.ActorComponent.EnableCollision(this.Pne), (this.Pne = 0);
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineStateDisableCollision =
	AiStateMachineStateDisableCollision;
