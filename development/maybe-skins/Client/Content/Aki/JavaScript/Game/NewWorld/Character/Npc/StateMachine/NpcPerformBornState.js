"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NpcPerformBornState = void 0);
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
	BORN_TIME = 100;
class NpcPerformBornState extends StateBase_1.StateBase {
	OnStart() {
		TimerSystem_1.TimerSystem.Delay(() => {
			0 === this.StateMachine.CurrentState && this.StateMachine.Switch(1);
		}, 100);
	}
}
exports.NpcPerformBornState = NpcPerformBornState;
