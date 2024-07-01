"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TickBehaviorNode = void 0);
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	ChildQuestNodeBase_1 = require("./ChildQuestNodeBase");
class TickBehaviorNode extends ChildQuestNodeBase_1.ChildQuestNodeBase {
	constructor() {
		super(...arguments),
			(this.IRe = void 0),
			(this.IntervalTime = TimerSystem_1.MIN_TIME),
			(this.r6 = () => {
				this.OnTick(this.IntervalTime);
			});
	}
	get CorrelativeEntities() {}
	OnStart(e) {
		super.OnStart(e),
			(this.IRe = TimerSystem_1.TimerSystem.Forever(
				this.r6,
				this.IntervalTime,
			));
	}
	OnEnd(e) {
		TimerSystem_1.TimerSystem.Has(this.IRe) &&
			TimerSystem_1.TimerSystem.Remove(this.IRe),
			super.OnEnd(e);
	}
	OnTick(e) {}
}
exports.TickBehaviorNode = TickBehaviorNode;
