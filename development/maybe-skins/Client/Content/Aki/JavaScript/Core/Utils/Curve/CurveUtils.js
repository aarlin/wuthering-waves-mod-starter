"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CurveUtils = void 0);
const UE = require("ue"),
	Log_1 = require("../../Common/Log"),
	CubicCurve_1 = require("./CubicCurve"),
	CubicCurveWithStartSlope_1 = require("./CubicCurveWithStartSlope"),
	FloatCurve_1 = require("./FloatCurve"),
	LinearCurve_1 = require("./LinearCurve"),
	PowerCurve_1 = require("./PowerCurve"),
	PowerCurve2_1 = require("./PowerCurve2"),
	PowerCurve3_1 = require("./PowerCurve3"),
	SquaredCurve_1 = require("./SquaredCurve"),
	curveTypeMap = {
		[0]: LinearCurve_1.LinearCurve,
		1: CubicCurve_1.CubicCurve,
		2: CubicCurveWithStartSlope_1.CubicCurveWithStartSlope,
		3: SquaredCurve_1.SquaredCurve,
		4: PowerCurve_1.PowerCurve,
		5: PowerCurve2_1.PowerCurve2,
	};
class CurveUtils {
	static CreateCurve(e, ...r) {
		return 0 === e ? this.DefaultLinear : new curveTypeMap[e](...r);
	}
	static CreateCurveByStruct(e) {
		if (!e) return this.DefaultLinear;
		if (e instanceof UE.SFloatCurve)
			return e.FloatCurve
				? new FloatCurve_1.FloatCurve(e.FloatCurve)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("Core", 58, "浮点曲线参数不合法"),
					this.DefaultLinear);
		switch (e.CurveType) {
			case 0:
				return this.DefaultLinear;
			case 5:
				return new CubicCurve_1.CubicCurve(e.N);
			case 6:
				return 0 === e.N
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Core", 6, "三阶 - 反S函数不接受0作为N"),
						this.DefaultLinear)
					: new CubicCurve_1.CubicCurve(1 / e.N);
			case 3:
				return 0 === e.N
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Core", 6, "三阶 - 凹函数不接受0作为N"),
						this.DefaultLinear)
					: new CubicCurveWithStartSlope_1.CubicCurveWithStartSlope(1 / e.N);
			case 4:
				return new CubicCurveWithStartSlope_1.CubicCurveWithStartSlope(e.N);
			case 1:
				return 0 === e.N
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Core", 6, "二阶 - 凹函数不接受0作为N"),
						this.DefaultLinear)
					: new SquaredCurve_1.SquaredCurve(1 / e.N);
			case 2:
				return new SquaredCurve_1.SquaredCurve(e.N);
			case 7:
				return new PowerCurve3_1.PowerCurve3(e.N);
			case 8:
				return 0 === e.N
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Core", 6, "幂函数 - 凸函数不接受0作为N"),
						this.DefaultLinear)
					: new PowerCurve3_1.PowerCurve3(1 / e.N);
			case 9:
				return 0 === e.N
					? (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Core", 6, "幂函数 - S函数不接受0作为N"),
						this.DefaultLinear)
					: new PowerCurve_1.PowerCurve(1 / e.N);
			case 10:
				return new PowerCurve_1.PowerCurve(e.N);
			case 11:
				return new PowerCurve2_1.PowerCurve2(e.N);
			default:
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Core", 6, "无效曲线类型", ["Type", e.CurveType]),
					this.DefaultLinear
				);
		}
	}
}
((exports.CurveUtils = CurveUtils).DefaultLinear =
	new LinearCurve_1.LinearCurve()),
	(CurveUtils.DefaultPara = new SquaredCurve_1.SquaredCurve(2));
//# sourceMappingURL=CurveUtils.js.map
