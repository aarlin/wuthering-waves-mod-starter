"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalPerformStateBase = void 0);
const StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase");
class AnimalPerformStateBase extends StateBase_1.StateBase {
	constructor() {
		super(...arguments),
			(this.EcologicalInterface = void 0),
			(this.ActionTime = -0);
	}
	get AnimalEcologicalInterface() {
		return this.EcologicalInterface;
	}
	set AnimalEcologicalInterface(e) {
		this.EcologicalInterface = e;
	}
	OnCreate(e) {
		this.EcologicalInterface = e;
	}
	OnDestroy() {
		(this.AnimalEcologicalInterface = void 0), (this.StateMachine = void 0);
	}
	GetActionTime() {
		return this.ActionTime ?? 0;
	}
}
exports.AnimalPerformStateBase = AnimalPerformStateBase;
