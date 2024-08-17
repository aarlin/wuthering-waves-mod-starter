"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalPerformAlertState = void 0);
const puerts_1 = require("puerts"),
	AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformAlertState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
	OnEnter(e) {
		this.EcologicalInterface?.IsValid() &&
			(0 === e &&
				this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
			this.EcologicalInterface.AlertStart(),
			(e = (0, puerts_1.$ref)(void 0)),
			this.EcologicalInterface.GetCurrentActionTime(e),
			(this.ActionTime = (0, puerts_1.$unref)(e)));
	}
	OnUpdate(e) {}
	OnExit(e) {
		this.EcologicalInterface?.IsValid() && this.EcologicalInterface.AlertEnd();
	}
}
exports.AnimalPerformAlertState = AnimalPerformAlertState;
