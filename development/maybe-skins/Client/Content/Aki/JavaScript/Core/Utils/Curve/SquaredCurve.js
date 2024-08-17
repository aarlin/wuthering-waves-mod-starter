"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SquaredCurve = void 0);
const Log_1 = require("../../Common/Log"),
	CurveBase_1 = require("./CurveBase");
class SquaredCurve extends CurveBase_1.CurveBase {
	constructor(...e) {
		super(),
			(this.RJ = 0),
			(this.Sl = 1),
			e[0] < 0 || 2 < e[0]
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Core",
							6,
							"二阶曲线配置的Slope不合法，必须大于等于0小于等于2。自动修复为1",
							["StartSlope", e[0]],
						),
					(this.RJ = 0),
					(this.Sl = 1))
				: ((this.RJ = 1 - e[0]), (this.Sl = e[0]));
	}
	GetCurrentValueInternal(e) {
		return (this.RJ * e + this.Sl) * e;
	}
}
exports.SquaredCurve = SquaredCurve;
//# sourceMappingURL=SquaredCurve.js.map
