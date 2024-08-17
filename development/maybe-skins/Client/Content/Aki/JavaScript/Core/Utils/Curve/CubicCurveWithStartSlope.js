"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CubicCurveWithStartSlope = void 0);
const Log_1 = require("../../Common/Log"),
	CurveBase_1 = require("./CurveBase");
class CubicCurveWithStartSlope extends CurveBase_1.CurveBase {
	constructor(...t) {
		super(),
			(this.RJ = 0),
			(this.Sl = 0),
			(this.UJ = 1),
			t[0] <= 0
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Core",
							6,
							"三阶曲线配置的Slope不合法，必须大于0。自动修复为1",
							["StartSlope", t[0]],
						),
					(this.RJ = 0),
					(this.Sl = 0),
					(this.UJ = 1))
				: ((this.RJ = t[0] + 1 / t[0] - 2),
					(this.Sl = 3 - 2 * t[0] - 1 / t[0]),
					(this.UJ = t[0]));
	}
	GetCurrentValueInternal(t) {
		return ((this.RJ * t + this.Sl) * t + this.UJ) * t;
	}
}
exports.CubicCurveWithStartSlope = CubicCurveWithStartSlope;
//# sourceMappingURL=CubicCurveWithStartSlope.js.map
