"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsFloatRange = void 0);
class TsFloatRange {
	constructor(s, t, e) {
		(this.Exclusive = s), (this.Min = t), (this.Max = e);
	}
	InRange(s) {
		return this.Exclusive
			? s > this.Min && s < this.Max
			: s >= this.Min && s <= this.Max;
	}
}
exports.TsFloatRange = TsFloatRange;
//# sourceMappingURL=TsFloatRange.js.map
