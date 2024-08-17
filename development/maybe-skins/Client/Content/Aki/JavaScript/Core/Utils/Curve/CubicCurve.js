"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CubicCurve = void 0);
const CurveBase_1 = require("./CurveBase");
class CubicCurve extends CurveBase_1.CurveBase {
	constructor(...e) {
		super(),
			(this.RJ = 0),
			(this.Sl = 0),
			(this.UJ = 1),
			(this.RJ = -2 * (1 - e[0])),
			(this.Sl = 3 * (1 - e[0])),
			(this.UJ = e[0]);
	}
	GetCurrentValueInternal(e) {
		return ((this.RJ * e + this.Sl) * e + this.UJ) * e;
	}
}
exports.CubicCurve = CubicCurve;
//# sourceMappingURL=CubicCurve.js.map
