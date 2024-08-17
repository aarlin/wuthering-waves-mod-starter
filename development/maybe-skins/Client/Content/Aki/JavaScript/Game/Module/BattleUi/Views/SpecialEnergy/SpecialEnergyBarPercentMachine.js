"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialEnergyBarPercentMachine = void 0);
const DURATION = 100;
class SpecialEnergyBarPercentMachine {
	constructor() {
		(this.lnt = 0), (this._nt = 0), (this.unt = 0);
	}
	Init(t) {
		(this._nt = t), (this.lnt = t);
	}
	SetTargetPercent(t) {
		t !== this.lnt &&
			(t > this.lnt
				? ((this.lnt = t),
					(this._nt = Math.min(this._nt, t)),
					(this.unt = (t - this._nt) / 100))
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
	GetTargetPercent() {
		return this.lnt;
	}
}
exports.SpecialEnergyBarPercentMachine = SpecialEnergyBarPercentMachine;
