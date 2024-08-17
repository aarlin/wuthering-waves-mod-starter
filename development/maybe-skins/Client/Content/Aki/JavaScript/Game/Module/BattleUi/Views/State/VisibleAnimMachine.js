"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VisibleAnimMachine = void 0);
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
class VisibleAnimMachine {
	constructor() {
		(this.State = 0),
			(this.Visible = !1),
			(this.VisibleCallback = void 0),
			(this.PlayAnimCallback = void 0),
			(this.StopAnimCallback = void 0),
			(this.zmt = void 0),
			(this.Zmt = () => {
				(this.zmt = void 0),
					3 === this.State
						? ((this.State = 0), this.VisibleCallback(!1))
						: 2 === this.State && (this.State = 1);
			});
	}
	InitCallback(i, t, s) {
		(this.VisibleCallback = i),
			(this.PlayAnimCallback = t),
			(this.StopAnimCallback = s);
	}
	InitVisible(i) {
		(this.Visible = i), (this.State = i ? 1 : 0);
	}
	SetVisible(i, t) {
		this.Visible !== i &&
			((this.Visible = i),
			this.StopAnimCallback(!i),
			0 < t
				? (i ? (this.VisibleCallback(!0), (this.State = 2)) : (this.State = 3),
					this.PlayAnimCallback(i),
					this.BCe(),
					(this.zmt = TimerSystem_1.TimerSystem.Delay(this.Zmt, t)))
				: ((this.State = i ? 1 : 0), this.VisibleCallback(i)));
	}
	ForcePlayShowAnim(i) {
		2 !== this.State &&
			(3 === this.State && this.StopAnimCallback(!1),
			(this.State = 2),
			this.PlayAnimCallback(!0),
			this.BCe(),
			(this.zmt = TimerSystem_1.TimerSystem.Delay(this.Zmt, i)));
	}
	Reset() {
		this.BCe();
	}
	BCe() {
		this.zmt &&
			(TimerSystem_1.TimerSystem.Remove(this.zmt), (this.zmt = void 0));
	}
}
exports.VisibleAnimMachine = VisibleAnimMachine;
