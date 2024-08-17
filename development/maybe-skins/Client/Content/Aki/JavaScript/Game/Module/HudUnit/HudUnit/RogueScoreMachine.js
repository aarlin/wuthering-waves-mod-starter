"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueScoreMachine = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
	SERVER_SCORE_UP_INTERVAL = 300,
	SERVER_SCORE_DOWN_INTERVAL = 1e3,
	MAX_SCORE_DIFF = 1e3;
class RogueScoreMachine {
	constructor() {
		(this.nyn = void 0),
			(this.syn = void 0),
			(this.YDn = 0),
			(this.ayn = 0),
			(this.apo = 0),
			(this.hyn = void 0),
			(this.lyn = void 0),
			(this.unt = 0);
	}
	SetUpdateCallback(i, t) {
		(this.nyn = i), (this.syn = t);
	}
	UpdateTargetScore(i, t) {
		if (
			(t && i >= t.LowerUpperLimits[1]
				? (this.apo = t.LowerUpperLimits[1])
				: (this.apo = i),
			(this.lyn = t),
			this.ayn !== this.apo &&
				((t = this.apo > this.ayn) && this.syn?.(), this.hyn || this.lyn))
		) {
			var h = this.hyn?.Level ?? 0,
				s = this.lyn?.Level ?? 0;
			if (1 < Math.abs(s - h)) this._yn();
			else {
				let h = !1;
				if (!this.hyn) {
					if (
						((this.ayn = this.lyn.LowerUpperLimits[0]),
						(this.hyn = this.lyn),
						this.ayn === this.apo)
					)
						return (this.unt = 0), void this.nyn?.(this.ayn, this.hyn);
					h = !0;
				}
				Math.abs(i - this.ayn) >= 1e3
					? this._yn()
					: ((this.unt = t
							? (this.apo - this.ayn) / 300
							: (this.apo - this.ayn) / 1e3),
						h &&
							(this.nyn?.(this.ayn, this.hyn), (this.YDn = Time_1.Time.Frame)));
			}
		}
	}
	_yn() {
		(this.ayn = this.apo),
			(this.hyn = this.lyn),
			(this.unt = 0),
			this.nyn?.(this.ayn, this.hyn);
	}
	Tick(i) {
		var t;
		0 !== this.unt &&
			this.YDn !== Time_1.Time.Frame &&
			((this.ayn += this.unt * i),
			this.hyn !== this.lyn &&
				((i = this.hyn.LowerUpperLimits[0]),
				(t = this.hyn.LowerUpperLimits[1]),
				0 < this.unt
					? this.ayn >= t && (this.hyn = this.lyn)
					: this.ayn < i && (this.hyn = this.lyn)),
			0 < this.unt
				? this.ayn >= this.apo && ((this.ayn = this.apo), (this.unt = 0))
				: this.ayn <= this.apo && ((this.ayn = this.apo), (this.unt = 0)),
			this.nyn?.(this.ayn, this.hyn));
	}
}
exports.RogueScoreMachine = RogueScoreMachine;
