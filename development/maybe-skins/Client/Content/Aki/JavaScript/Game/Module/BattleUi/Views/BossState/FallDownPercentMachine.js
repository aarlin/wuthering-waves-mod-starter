"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FallDownPercentMachine = void 0);
const DURATION = 100;
class FallDownPercentMachine {
	constructor() {
		(this.lnt = 0), (this._nt = 0), (this.unt = 0);
	}
	SetTargetPercent(t) {
		t !== this.lnt &&
			(t > this.lnt && t < 1
				? ((this.lnt = t), (this.unt = (t - this._nt) / 100))
				: ((this.lnt = t), (this._nt = t), (this.unt = 0)));
	}
	Update(t) {
		return (
			0 !== this.unt &&
			((this._nt += this.unt * t),
			this._nt >= this.lnt && ((this._nt = this.lnt), (this.unt = 0)),
			!0)
		);
	}
	GetCurPercent() {
		return this._nt;
	}
}
exports.FallDownPercentMachine = FallDownPercentMachine;
