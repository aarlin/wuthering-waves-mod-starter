"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateCollisionChannel = void 0);
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateCollisionChannel extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments), (this.IgnoreChannels = void 0);
	}
	OnInit(e) {
		this.IgnoreChannels = [];
		for (const n of e.BindCollisionChannel.IgnoreChannels)
			this.IgnoreChannels.push(n);
		return !0;
	}
	OnActivate() {
		for (const e of this.IgnoreChannels)
			this.Node.ActorComponent.Actor.CapsuleComponent.SetCollisionResponseToChannel(
				e,
				0,
			);
	}
	OnDeactivate() {
		for (const e of this.IgnoreChannels)
			this.Node.ActorComponent.Actor.CapsuleComponent.SetCollisionResponseToChannel(
				e,
				2,
			);
	}
}
exports.AiStateMachineStateCollisionChannel =
	AiStateMachineStateCollisionChannel;
