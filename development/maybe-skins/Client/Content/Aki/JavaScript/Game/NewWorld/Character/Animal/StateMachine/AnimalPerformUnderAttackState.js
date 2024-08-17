"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalPerformUnderAttackState = void 0);
const puerts_1 = require("puerts"),
	AnimalPerformStateBase_1 = require("./AnimalPerformStateBase"),
	BLEND_OUT_TIME = 0.25;
class AnimalPerformUnderAttackState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
	OnEnter(e) {
		this.EcologicalInterface?.IsValid() &&
			(0 === e &&
				this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
			this.EcologicalInterface.UnderAttackStart(),
			(e = (0, puerts_1.$ref)(void 0)),
			this.EcologicalInterface.GetCurrentActionTime(e),
			(this.ActionTime = (0, puerts_1.$unref)(e) - 0.25));
	}
	OnUpdate(e) {}
	OnExit(e) {
		this.EcologicalInterface?.IsValid() &&
			this.EcologicalInterface.UnderAttackEnd();
	}
}
exports.AnimalPerformUnderAttackState = AnimalPerformUnderAttackState;
