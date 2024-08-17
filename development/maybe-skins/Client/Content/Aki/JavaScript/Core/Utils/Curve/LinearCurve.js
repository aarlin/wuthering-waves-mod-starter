"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LinearCurve = void 0);
const CurveBase_1 = require("./CurveBase");
class LinearCurve extends CurveBase_1.CurveBase {
	GetCurrentValueInternal(e) {
		return e;
	}
}
exports.LinearCurve = LinearCurve;
//# sourceMappingURL=LinearCurve.js.map
