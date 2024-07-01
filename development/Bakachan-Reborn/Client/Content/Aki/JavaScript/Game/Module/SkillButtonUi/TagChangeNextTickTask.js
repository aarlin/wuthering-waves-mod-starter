"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TagChangeNextTickTask = void 0);
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
class TagChangeNextTickTask {
	constructor() {
		(this.pyo = new Map()),
			(this.vyo = void 0),
			(this.Myo = []),
			(this.Syo = () => {
				if (((this.vyo = void 0), 0 < this.Myo.length))
					for (const e of this.Myo) e(this.pyo);
				(this.Myo.length = 0), this.pyo.clear();
			});
	}
	TagChangeWaitNextTick(e, t, s) {
		this.pyo.set(e, t),
			this.Myo.push(s),
			this.vyo || (this.vyo = TimerSystem_1.TimerSystem.Next(this.Syo));
	}
	Clear() {
		this.vyo &&
			TimerSystem_1.TimerSystem.Has(this.vyo) &&
			TimerSystem_1.TimerSystem.Remove(this.vyo),
			(this.vyo = void 0),
			(this.Myo.length = 0),
			this.pyo.clear(),
			(this.Myo = void 0);
	}
}
exports.TagChangeNextTickTask = TagChangeNextTickTask;
