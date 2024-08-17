"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FallDownBarStateMachine = void 0);
const TimeUtil_1 = require("../../../../Common/TimeUtil");
class FallDownBarStateMachine {
	constructor(t) {
		(this.Wht = -0),
			(this.Kht = -0),
			(this.Qht = 0),
			(this.vq = !1),
			(this.Xht = t),
			(this.Qht = 1);
	}
	Update(t) {
		this.vq &&
			((this.Kht += t * this.Qht), (t = this.Kht / this.Wht), this.Xht(t));
	}
	OnFallDownStart(t) {
		(this.Wht = t * TimeUtil_1.TimeUtil.InverseMillisecond),
			(this.Kht = 0),
			(this.vq = !0);
	}
	OnChangeTimeDilation(t) {
		this.Qht = t;
	}
	OnFallDownEnd() {
		this.vq = !1;
	}
	OnDestroy() {
		(this.vq = !1), (this.Qht = 1);
	}
}
exports.FallDownBarStateMachine = FallDownBarStateMachine;
