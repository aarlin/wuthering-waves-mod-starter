"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalPerformStandState = void 0);
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformStandState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
	OnEnter(t) {
		this.EcologicalInterface?.IsValid() &&
			(0 === t &&
				this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
			this.EcologicalInterface.NoneStateStart());
	}
	OnExit(t) {
		this.EcologicalInterface?.IsValid() &&
			(this.Owner.GetComponent(178)?.SetInteractionState(
				!1,
				"AnimalPerformStandState OnExit",
			),
			this.EcologicalInterface.NoneStateEnd());
	}
}
exports.AnimalPerformStandState = AnimalPerformStandState;
