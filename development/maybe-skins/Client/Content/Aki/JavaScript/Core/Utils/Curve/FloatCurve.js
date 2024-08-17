"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FloatCurve = void 0);
const CurveBase_1 = require("./CurveBase");
class FloatCurve extends CurveBase_1.CurveBase {
	constructor(e) {
		super(), (this.AJ = void 0), (this.AJ = e);
	}
	GetCurrentValueInternal(e) {
		return this.AJ.GetFloatValue(e);
	}
	GetCurrentValueByTime(e) {
		return this.AJ.GetFloatValue(e);
	}
}
exports.FloatCurve = FloatCurve;
//# sourceMappingURL=FloatCurve.js.map
