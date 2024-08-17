"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeLimit = void 0);
class TimeLimit {
	constructor() {
		(this.FY = 0), (this.VY = 0), (this.cY = !0);
	}
	SetEnable(t) {
		this.cY = t;
	}
	get CurrentCost() {
		return this.FY;
	}
	ResetCost() {
		this.FY = 0;
	}
	set TimeLimit(t) {
		this.VY = t;
	}
	get TimeLimit() {
		return this.VY;
	}
	AddCost(t) {
		this.FY += t;
	}
	IsTimeLimitExceeded() {
		return this.cY && 0 < this.VY && this.FY >= this.VY;
	}
}
exports.TimeLimit = TimeLimit;
//# sourceMappingURL=TimeLimit.js.map
