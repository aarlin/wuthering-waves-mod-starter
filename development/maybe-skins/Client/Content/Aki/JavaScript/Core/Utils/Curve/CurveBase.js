"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CurveBase = void 0);
const MathUtils_1 = require("../MathUtils");
class CurveBase {
	constructor() {}
	GetCurrentValue(t) {
		return this.GetCurrentValueInternal(MathUtils_1.MathUtils.Clamp(t, 0, 1));
	}
	GetCurrentValueInternal(t) {
		return 0;
	}
	GetOffsetValue(t, e) {
		return this.GetCurrentValue(t + e) - this.GetCurrentValue(t);
	}
	GetOffsetRate(t, e) {
		var r;
		return 1 <= t
			? 1
			: ((r = this.GetCurrentValue(t)),
				(this.GetCurrentValue(t + e) - r) / (1 - r));
	}
}
exports.CurveBase = CurveBase;
//# sourceMappingURL=CurveBase.js.map
