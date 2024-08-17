"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DelayTask = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	TaskBase_1 = require("./TaskBase"),
	DEFAULT_DELAY_TIME = 1e3;
class DelayTask extends TaskBase_1.TaskBase {
	constructor(e, s, t, r = 1e3, i) {
		super(e, t, i),
			(this.Rvt = new CustomPromise_1.CustomPromise()),
			(this.QMr = s),
			(this.tBt = Math.max(r, TimerSystem_1.MIN_TIME));
	}
	async OnRun() {
		return !(
			(this.QMr && this.QMr()) ||
			(TimerSystem_1.TimerSystem.Delay(() => {
				this.Rvt.SetResult(!0);
			}, this.tBt),
			await this.Rvt.Promise,
			0)
		);
	}
}
exports.DelayTask = DelayTask;
