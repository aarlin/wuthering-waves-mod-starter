"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const CPP = require("cpp");
class EffectParametersBase {
	constructor() {
		(this.HasCurveParameters = !1),
			(this.EffectParameter = new CPP.KuroEffectParameters());
	}
	CollectFloatCurve(e, t) {
		(this.HasCurveParameters = !0),
			t.bUseCurve
				? this.EffectParameter.FloatCurveMap.Set(e, t)
				: this.CollectFloatConst(e, t.Constant);
	}
	CollectFloatConst(e, t) {
		this.EffectParameter.FloatConstMap.Set(e, t);
	}
	CollectLinearColorCurve(e, t) {
		(this.HasCurveParameters = !0),
			t.bUseCurve
				? this.EffectParameter.LinearColorCurveMap.Set(e, t)
				: this.CollectLinearColorConst(e, t.Constant);
	}
	CollectLinearColorConst(e, t) {
		this.EffectParameter.LinearColorConstMap.Set(e, t);
	}
	CollectVectorCurve(e, t) {
		(this.HasCurveParameters = !0),
			t.bUseCurve
				? this.EffectParameter.VectorCurveMap.Set(e, t)
				: this.CollectVectorConst(e, t.Constant);
	}
	CollectVectorConst(e, t) {
		this.EffectParameter.VectorConstMap.Set(e, t);
	}
	Apply(e, t, r) {
		e && this.HasCurveParameters && this.EffectParameter.Apply(e, t, r);
	}
}
exports.default = EffectParametersBase;
