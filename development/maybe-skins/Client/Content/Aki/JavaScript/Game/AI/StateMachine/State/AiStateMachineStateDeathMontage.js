"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateDeathMontage = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateDeathMontage extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments),
			(this.DeathType = 0),
			(this.MontageName = ""),
			(this.Handle = -1);
	}
	OnActivate() {
		var e = this.Node.MontageComponent;
		if (e)
			switch (this.DeathType) {
				case 1:
					this.Handle = e.AddReplacement(1, this.MontageName);
					break;
				case 2:
					this.Handle = e.AddReplacement(2, this.MontageName);
					break;
				default:
					this.Handle = e.AddReplacement(0, this.MontageName);
			}
	}
	OnDeactivate() {
		this.Node.MontageComponent?.RemoveReplacement(this.Handle),
			(this.Handle = -1);
	}
	OnInit(e) {
		return (
			(this.DeathType = e.BindDeathMontage.DeathType),
			(this.MontageName = e.BindDeathMontage.MontageName),
			!0
		);
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineStateDeathMontage = AiStateMachineStateDeathMontage;
