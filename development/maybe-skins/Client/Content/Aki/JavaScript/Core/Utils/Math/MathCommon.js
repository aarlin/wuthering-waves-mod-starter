"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MathCommon = void 0);
class MathCommon {
	constructor() {}
	static Clamp(t, o, a) {
		return t < o ? o : t < a ? t : a;
	}
	static UnwindDegrees(t) {
		let o = t;
		for (; o > this.FlatAngle; ) o -= this.RoundAngle;
		for (; o < -this.FlatAngle; ) o += this.RoundAngle;
		return o;
	}
	static FloatSelect(t, o, a) {
		return 0 <= t ? o : a;
	}
	static DegreeToRadian(t) {
		return this.DegToRad * t;
	}
	static RadianToDegree(t) {
		return this.RadToDeg * t;
	}
	static Lerp(t, o, a) {
		return t * (1 - a) + o * a;
	}
	static LerpSin(t, o, a) {
		a = Math.sin((a * Math.PI) / 2);
		return t * (1 - a) + o * a;
	}
	static VectorNormalizeRotator(t) {
		var o = t.Pitch,
			a = t.Yaw,
			m = t.Roll,
			o = this.WrapAngle(o),
			a = this.WrapAngle(a),
			m = this.WrapAngle(m);
		(t.Pitch = o), (t.Yaw = a), (t.Roll = m);
	}
	static WrapAngle(t) {
		return (
			(((t % this.RoundAngle) + this.RoundAngle + this.FlatAngle) %
				this.RoundAngle) -
			this.FlatAngle
		);
	}
	static Warp(t, o, a) {
		a < o && ([o, a] = [a, o]);
		a -= o;
		return a < MathCommon.SmallNumber ? o : (((t % a) + a - o) % a) + o;
	}
}
((exports.MathCommon = MathCommon).ThreshPointOnPlane = 0.1),
	(MathCommon.ThreshVectorNormalized = 0.01),
	(MathCommon.ThreshPointAreSame = 2e-5),
	(MathCommon.ThreshNormalsAreParallel = 0.999845),
	(MathCommon.ThreshNormalsAreOrthogonal = 0.017455),
	(MathCommon.SmallNumber = 1e-8),
	(MathCommon.KindaSmallNumber = 1e-4),
	(MathCommon.BigNumber = 34e37),
	(MathCommon.Delta = 1e-5),
	(MathCommon.MaxInt16 = 32767),
	(MathCommon.RightAngle = 90),
	(MathCommon.FlatAngle = 180),
	(MathCommon.RoundAngle = 360),
	(MathCommon.ProgressTotalValue = 100),
	(MathCommon.DegToRad = Math.PI / MathCommon.FlatAngle),
	(MathCommon.RadDividedBy2 = 0.5 * MathCommon.DegToRad),
	(MathCommon.RadToDeg = MathCommon.FlatAngle / Math.PI);
//# sourceMappingURL=MathCommon.js.map
