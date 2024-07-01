"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConfigCurveUtils = void 0);
const UE = require("ue"),
	CurveUtils_1 = require("../../Core/Utils/Curve/CurveUtils");
class ConfigCurveUtils {
	static CreateCurveByBaseCurve(e) {
		return CurveUtils_1.CurveUtils.CreateCurveByStruct(this.SCr(e));
	}
	static SCr(e) {
		switch (
			(this.BaseCurve || (this.BaseCurve = new UE.SBaseCurve()), e.Type)
		) {
			case 1:
				this.BaseCurve.CurveType = 1;
				break;
			case 2:
				this.BaseCurve.CurveType = 2;
				break;
			case 3:
				this.BaseCurve.CurveType = 3;
				break;
			case 4:
				this.BaseCurve.CurveType = 4;
				break;
			case 5:
				this.BaseCurve.CurveType = 5;
				break;
			case 6:
				this.BaseCurve.CurveType = 6;
				break;
			default:
				this.BaseCurve.CurveType = 0;
		}
		return (this.BaseCurve.N = e.N), this.BaseCurve;
	}
}
(exports.ConfigCurveUtils = ConfigCurveUtils).BaseCurve = void 0;
