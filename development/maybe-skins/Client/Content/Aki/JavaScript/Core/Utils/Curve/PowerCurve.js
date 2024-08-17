"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PowerCurve = void 0);
const Log_1 = require("../../Common/Log"),
	CurveBase_1 = require("./CurveBase");
class PowerCurve extends CurveBase_1.CurveBase {
	constructor(...e) {
		super(),
			e[(this.PJ = 0)] < 0
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error("Core", 6, "幂函数N值不合法，自动修复为0", [
							"StartSlope",
							e[0],
						]),
					(this.PJ = 0))
				: (this.PJ = e[0]);
	}
	GetCurrentValueInternal(e) {
		e = 2 * e - 1;
		return Math.sign(e) * Math.pow(Math.abs(e), this.PJ) * 0.5 + 0.5;
	}
}
exports.PowerCurve = PowerCurve;
//# sourceMappingURL=PowerCurve.js.map
