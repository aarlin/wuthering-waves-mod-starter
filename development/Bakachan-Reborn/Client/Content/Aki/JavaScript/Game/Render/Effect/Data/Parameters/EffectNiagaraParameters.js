"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const EffectParameterBase_1 = require("./EffectParameterBase");
class EffectNiagaraParameters extends EffectParameterBase_1.default {
	constructor(e = void 0, a = void 0, r = void 0) {
		super(),
			e && (this.EffectParameter.FloatCurveMap = e),
			a && (this.EffectParameter.VectorCurveMap = a),
			r && (this.EffectParameter.LinearColorCurveMap = r),
			(e || a || r) && (this.HasCurveParameters = !0);
	}
}
exports.default = EffectNiagaraParameters;
