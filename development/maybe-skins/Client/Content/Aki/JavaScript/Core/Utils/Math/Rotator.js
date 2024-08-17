"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Rotator = void 0);
const UE = require("ue"),
	Macro_1 = require("../../Preprocessor/Macro"),
	MathCommon_1 = require("./MathCommon"),
	Quat_1 = require("./Quat");
class Rotator {
	constructor(t, o, a) {
		(this.iz = void 0),
			(this.oz = void 0),
			(this.Tuple = [t ?? 0, o ?? 0, a ?? 0]);
	}
	ToString() {
		return `(Pitch = ${this.Pitch}, Yaw = ${this.Yaw}, Roll = ${this.Roll})`;
	}
	get Pitch() {
		return this.Tuple[0];
	}
	set Pitch(t) {
		this.Tuple[0] = t;
	}
	get Yaw() {
		return this.Tuple[1];
	}
	set Yaw(t) {
		this.Tuple[1] = t;
	}
	get Roll() {
		return this.Tuple[2];
	}
	set Roll(t) {
		this.Tuple[2] = t;
	}
	Set(t, o, a) {
		var r = this.Tuple;
		(r[0] = t), (r[1] = o), (r[2] = a), this.oz && this.ToUeRotator();
	}
	FromUeRotator(t) {
		var o = this.Tuple;
		(o[0] = t.Pitch), (o[1] = t.Yaw), (o[2] = t.Roll);
	}
	DeepCopy(t) {
		this.Set(t.Pitch, t.Yaw, t.Roll);
	}
	static Create(...t) {
		var o,
			a,
			r = new Rotator();
		return (
			1 === t.length && t[0]
				? r.FromUeRotator(t[0])
				: (void 0 !== t[0] && "number" != typeof t[0]) ||
					((o = t[0]), (a = t[1]), (t = t[2]), r.Set(o || 0, a || 0, t || 0)),
			r
		);
	}
	ToUeRotator() {
		var t = this.Tuple;
		return (
			void 0 === this.oz
				? (this.oz = new UE.Rotator(t[0], t[1], t[2]))
				: ((this.oz.Pitch = t[0]), (this.oz.Yaw = t[1]), (this.oz.Roll = t[2])),
			this.oz
		);
	}
	static NormalizeAxis(t) {
		let o = this.ClampAxis(t);
		return (
			o > MathCommon_1.MathCommon.FlatAngle &&
				(o -= MathCommon_1.MathCommon.RoundAngle),
			o
		);
	}
	static ClampAxis(t) {
		let o = t % MathCommon_1.MathCommon.RoundAngle;
		return o < 0 && (o += MathCommon_1.MathCommon.RoundAngle), o;
	}
	Clamp(t) {
		var o = this.Tuple,
			a = t.Tuple;
		return (
			(a[0] = Rotator.ClampAxis(o[0])),
			(a[1] = Rotator.ClampAxis(o[1])),
			(a[2] = Rotator.ClampAxis(o[2])),
			t
		);
	}
	Vector(t) {
		var o = this.Tuple,
			t = t.Tuple,
			a = MathCommon_1.MathCommon.WrapAngle(o[0]),
			o = MathCommon_1.MathCommon.WrapAngle(o[1]),
			a = MathCommon_1.MathCommon.DegreeToRadian(a),
			o = MathCommon_1.MathCommon.DegreeToRadian(o),
			r = Math.cos(a),
			a = Math.sin(a),
			h = Math.cos(o),
			o = Math.sin(o);
		(t[0] = r * h), (t[1] = r * o), (t[2] = a);
	}
	Quaternion(t) {
		let o = t;
		o ||
			(void 0 === this.iz && (this.iz = Quat_1.Quat.Create()), (o = this.iz));
		var t = o.Tuple,
			a = this.Tuple[0] % MathCommon_1.MathCommon.RoundAngle,
			r = this.Tuple[1] % MathCommon_1.MathCommon.RoundAngle,
			h = this.Tuple[2] % MathCommon_1.MathCommon.RoundAngle,
			a = a * MathCommon_1.MathCommon.RadDividedBy2,
			r = r * MathCommon_1.MathCommon.RadDividedBy2,
			h = h * MathCommon_1.MathCommon.RadDividedBy2,
			i = Math.sin(a),
			a = Math.cos(a),
			s = Math.sin(r),
			r = Math.cos(r),
			e = Math.sin(h),
			h = Math.cos(h),
			n = -h * i * r - e * a * s,
			m = +h * a * s - e * i * r,
			M = +h * a * r + e * i * s;
		return (
			(t[0] = +h * i * s - e * a * r), (t[1] = n), (t[2] = m), (t[3] = M), o
		);
	}
	IsNearlyZero() {
		var t = MathCommon_1.MathCommon.KindaSmallNumber,
			o = this.Tuple;
		return !(
			Math.abs(Rotator.NormalizeAxis(o[1])) > t ||
			Math.abs(Rotator.NormalizeAxis(o[0])) > t ||
			Math.abs(Rotator.NormalizeAxis(o[2])) > t
		);
	}
	Equals(t, o = MathCommon_1.MathCommon.KindaSmallNumber) {
		var a = this.Tuple,
			t = t.Tuple;
		return !(
			Math.abs(Rotator.NormalizeAxis(a[1] - t[1])) > o ||
			Math.abs(Rotator.NormalizeAxis(a[0] - t[0])) > o ||
			Math.abs(Rotator.NormalizeAxis(a[2] - t[2])) > o
		);
	}
	Equals2(t, o = MathCommon_1.MathCommon.KindaSmallNumber) {
		var a = this.Tuple;
		return !(
			Math.abs(Rotator.NormalizeAxis(a[1] - t.Yaw)) > o ||
			Math.abs(Rotator.NormalizeAxis(a[0] - t.Pitch)) > o ||
			Math.abs(Rotator.NormalizeAxis(a[2] - t.Roll)) > o
		);
	}
	AdditionEqual(t) {
		var o = this.Tuple;
		return (o[0] += t.Pitch), (o[1] += t.Yaw), (o[2] += t.Roll), this;
	}
	SubtractionEqual(t) {
		var o = this.Tuple;
		return (o[0] -= t.Pitch), (o[1] -= t.Yaw), (o[2] -= t.Roll), this;
	}
	MultiplyEqual(t) {
		var o = this.Tuple;
		return (o[0] *= t), (o[1] *= t), (o[2] *= t), this;
	}
	UnaryNegation(t) {
		var o = this.Tuple,
			t = t.Tuple;
		(t[0] = -o[0]), (t[1] = -o[1]), (t[2] = -o[2]);
	}
	Reset() {
		(this.Pitch = 0),
			(this.Yaw = 0),
			(this.Roll = 0),
			this.oz && this.ToUeRotator();
	}
	static UeRotatorCopy(t, o) {
		(o.Pitch = t.Pitch), (o.Yaw = t.Yaw), (o.Roll = t.Roll);
	}
	static Lerp(t, o, a, r) {
		var h = r.Tuple,
			o = o.Tuple,
			t = t.Tuple;
		(h[0] = o[0] - t[0]),
			(h[1] = o[1] - t[1]),
			(h[2] = o[2] - t[2]),
			MathCommon_1.MathCommon.VectorNormalizeRotator(r),
			(h[0] = h[0] * a),
			(h[1] = h[1] * a),
			(h[2] = h[2] * a),
			(h[0] += t[0]),
			(h[1] += t[1]),
			(h[2] += t[2]),
			MathCommon_1.MathCommon.VectorNormalizeRotator(r);
	}
	static AxisLerp(t, o, a) {
		o = (o = MathCommon_1.MathCommon.WrapAngle(o - t)) * a + t;
		return MathCommon_1.MathCommon.WrapAngle(o);
	}
}
((exports.Rotator = Rotator).ZeroRotatorProxy = Rotator.Create(0, 0, 0)),
	(Rotator.ZeroRotator = Rotator.ZeroRotatorProxy.ToUeRotator());
//# sourceMappingURL=Rotator.js.map
