"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AnimalPerformBornState = void 0);
const ObjectSystem_1 = require("../../../../../Core/Object/ObjectSystem"),
	WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask"),
	AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformBornState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
	OnStart() {
		var e = this.Owner.GetComponent(0);
		WaitEntityTask_1.WaitEntityTask.Create(e.GetCreatureDataId(), (e) => {
			e &&
				ObjectSystem_1.ObjectSystem.IsValid(this.Owner) &&
				(this.Owner.GetComponent(185).AddTag(1900394806),
				this.StateMachine.Switch(1));
		});
	}
}
exports.AnimalPerformBornState = AnimalPerformBornState;
