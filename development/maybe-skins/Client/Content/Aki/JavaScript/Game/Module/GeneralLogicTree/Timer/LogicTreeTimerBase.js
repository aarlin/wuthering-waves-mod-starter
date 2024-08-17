"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogicTreeTimerBase = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
class LogicTreeTimerBase {
	constructor(e, r, i = 0, t = 20) {
		(this.TreeId = BigInt(0)),
			(this.TimerId = void 0),
			(this.InnerTimerType = ""),
			(this.r6 = (e) => {
				this.OnTick(e);
			}),
			(this.OnTick = (e) => {}),
			(this.TreeId = e),
			(this.InnerTimerType = r),
			(this.TimerId = TimerSystem_1.TimerSystem.Forever(this.r6, t));
	}
	get TimerType() {
		return this.InnerTimerType;
	}
	Destroy() {
		void 0 !== this.TimerId && TimerSystem_1.TimerSystem.Remove(this.TimerId);
	}
	StartShowTimer(e) {}
	EndShowTimer() {}
	GetRemainTime() {
		return 0;
	}
}
exports.LogicTreeTimerBase = LogicTreeTimerBase;
