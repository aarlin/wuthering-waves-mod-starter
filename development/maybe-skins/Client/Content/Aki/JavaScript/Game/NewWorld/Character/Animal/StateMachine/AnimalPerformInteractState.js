"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalPerformInteractState = void 0);
const puerts_1 = require("puerts"),
	AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformInteractState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
	OnEnter(e) {
		this.EcologicalInterface?.IsValid() &&
			(0 === e &&
				this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
			this.EcologicalInterface.InteractStart(),
			(e = (0, puerts_1.$ref)(void 0)),
			this.EcologicalInterface.GetCurrentActionTime(e),
			(this.ActionTime = (0, puerts_1.$unref)(e)));
	}
	OnExit(e) {
		var t;
		this.EcologicalInterface?.IsValid() &&
			((t = this.Owner.GetComponent(185)).HasTag(502364103) &&
				(t.RemoveTag(502364103), t.AddTag(1900394806)),
			t.RemoveTag(351576188),
			this.Owner.GetComponent(178)?.SetInteractionState(
				!0,
				"AnimalPerformInteractState OnExit",
			),
			this.EcologicalInterface.InteractEnd());
	}
}
exports.AnimalPerformInteractState = AnimalPerformInteractState;
