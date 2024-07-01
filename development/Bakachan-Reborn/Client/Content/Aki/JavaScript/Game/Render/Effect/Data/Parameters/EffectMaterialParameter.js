"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const EffectParameterBase_1 = require("./EffectParameterBase");
class EffectMaterialParameters extends EffectParameterBase_1.default {
	constructor(e = void 0, r = void 0) {
		super(),
			e && (this.EffectParameter.FloatCurveMap = e),
			r && (this.EffectParameter.LinearColorCurveMap = r),
			(e || r) && (this.HasCurveParameters = !0);
	}
}
exports.default = EffectMaterialParameters;
