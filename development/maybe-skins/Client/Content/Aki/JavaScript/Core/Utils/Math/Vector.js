"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Vector = void 0);
const UE = require("ue"),
	Macro_1 = require("../../Preprocessor/Macro"),
	MathCommon_1 = require("./MathCommon"),
	Quat_1 = require("./Quat"),
	VECTOR_POOL_MAX_CAPACITY = 50;
class Vector {
	constructor(t, r, h) {
		(this.Tuple = [t ?? 0, r ?? 0, h ?? 0]), (this.hz = void 0);
	}
	get X() {
		return this.Tuple[0];
	}
	set X(t) {
		this.Tuple[0] = t;
	}
	get Y() {
		return this.Tuple[1];
	}
	set Y(t) {
		this.Tuple[1] = t;
	}
	get Z() {
		return this.Tuple[2];
	}
	set Z(t) {
		this.Tuple[2] = t;
	}
	ToUeVector(t = !1) {
		var r = this.Tuple;
		return (
			(this.hz = Vector.lz.pop()),
			void 0 === this.hz && (this.hz = new UE.Vector()),
			this.hz.Set(r[0], r[1], r[2]),
			t
				? ((r = this.hz), Vector.lz.push(this.hz), (this.hz = void 0), r)
				: this.hz
		);
	}
	ToString() {
		return `X=${this.Tuple[0]}, Y=${this.Tuple[1]}, Z=` + this.Tuple[2];
	}
	FromUeVector(t) {
		var r = this.Tuple;
		(r[0] = t.X), (r[1] = t.Y), (r[2] = t.Z);
	}
	FromConfigVector(t) {
		var r = this.Tuple;
		(r[0] = t.X ?? 0), (r[1] = t.Y ?? 0), (r[2] = t.Z ?? 0);
	}
	static Create(t, r, h) {
		var a = new Vector();
		return (
			"number" == typeof t || void 0 === t
				? a.Set(t || 0, r || 0, h || 0)
				: t && a.FromUeVector(t),
			a
		);
	}
	DotProduct(t) {
		var r = this.Tuple,
			t = t.Tuple;
		return r[0] * t[0] + r[1] * t[1] + r[2] * t[2];
	}
	static DotProduct(t, r) {
		return t.DotProduct(r);
	}
	CrossProduct(t, r) {
		var h = this.Tuple,
			t = t.Tuple,
			r = r.Tuple;
		[r[0], r[1], r[2]] = [
			h[1] * t[2] - h[2] * t[1],
			h[2] * t[0] - h[0] * t[2],
			h[0] * t[1] - h[1] * t[0],
		];
	}
	CrossProductEqual(t) {
		return this.CrossProduct(t, this), this;
	}
	static CrossProduct(t, r, h) {
		t.CrossProduct(r, h);
	}
	DeepCopy(t) {
		var r = this.Tuple;
		(r[0] = t.X), (r[1] = t.Y), (r[2] = t.Z), this.hz && this.ToUeVector();
	}
	AdditionEqual(t) {
		var r = this.Tuple;
		return (
			"number" == typeof t
				? ((r[0] += t), (r[1] += t), (r[2] += t))
				: ((t = t.Tuple), (r[0] += t[0]), (r[1] += t[1]), (r[2] += t[2])),
			this
		);
	}
	SubtractionEqual(t) {
		var r = this.Tuple;
		return (
			"number" == typeof t
				? ((r[0] -= t), (r[1] -= t), (r[2] -= t))
				: ((t = t.Tuple), (r[0] -= t[0]), (r[1] -= t[1]), (r[2] -= t[2])),
			this
		);
	}
	MultiplyEqual(t) {
		var r = this.Tuple;
		return (
			"number" == typeof t
				? ((r[0] *= t), (r[1] *= t), (r[2] *= t))
				: ((t = t.Tuple), (r[0] *= t[0]), (r[1] *= t[1]), (r[2] *= t[2])),
			this
		);
	}
	DivisionEqual(t) {
		var r,
			h = this.Tuple;
		return (
			"number" == typeof t
				? ((h[0] *= r = 1 / t), (h[1] *= r), (h[2] *= r))
				: ((r = t.Tuple), (h[0] /= r[0]), (h[1] /= r[1]), (h[2] /= r[2])),
			this
		);
	}
	Addition(t, r) {
		var h = this.Tuple,
			a = r.Tuple;
		return (
			"number" == typeof t
				? ((a[0] = h[0] + t), (a[1] = h[1] + t), (a[2] = h[2] + t))
				: ((t = t.Tuple),
					(a[0] = h[0] + t[0]),
					(a[1] = h[1] + t[1]),
					(a[2] = h[2] + t[2])),
			r
		);
	}
	Subtraction(t, r) {
		var h = this.Tuple,
			a = r.Tuple;
		return (
			"number" == typeof t
				? ((a[0] = h[0] - t), (a[1] = h[1] - t), (a[2] = h[2] - t))
				: ((t = t.Tuple),
					(a[0] = h[0] - t[0]),
					(a[1] = h[1] - t[1]),
					(a[2] = h[2] - t[2])),
			r
		);
	}
	Multiply(t, r) {
		var h = this.Tuple,
			a = r.Tuple;
		return (
			"number" == typeof t
				? ((a[0] = h[0] * t), (a[1] = h[1] * t), (a[2] = h[2] * t))
				: ((t = t.Tuple),
					(a[0] = h[0] * t[0]),
					(a[1] = h[1] * t[1]),
					(a[2] = h[2] * t[2])),
			r
		);
	}
	Division(t, r) {
		var h,
			a = this.Tuple,
			i = r.Tuple;
		return (
			"number" == typeof t
				? ((i[0] = a[0] * (h = 1 / t)), (i[1] = a[1] * h), (i[2] = a[2] * h))
				: ((h = t.Tuple),
					(i[0] = a[0] / h[0]),
					(i[1] = a[1] / h[1]),
					(i[2] = a[2] / h[2])),
			r
		);
	}
	Equality(t) {
		var r = this.Tuple,
			t = t.Tuple;
		return r[0] === t[0] && r[1] === t[1] && r[2] === t[2];
	}
	Inequality(t) {
		var r = this.Tuple,
			t = t.Tuple;
		return r[0] !== t[0] || r[1] !== t[1] || r[2] !== t[2];
	}
	Equals(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
		var h = this.Tuple,
			t = t.Tuple;
		return (
			Math.abs(h[0] - t[0]) <= r &&
			Math.abs(h[1] - t[1]) <= r &&
			Math.abs(h[2] - t[2]) <= r
		);
	}
	AllComponentsEqual(t = MathCommon_1.MathCommon.KindaSmallNumber) {
		var r = this.Tuple;
		return !(
			Math.abs(r[0] - r[1]) > t ||
			Math.abs(r[0] - r[2]) > t ||
			Math.abs(r[1] - r[2]) > t
		);
	}
	UnaryNegation(t) {
		var r = this.Tuple,
			t = t.Tuple;
		(t[0] = -r[0]), (t[1] = -r[1]), (t[2] = -r[2]);
	}
	Component(t) {
		switch (t) {
			case 0:
				return this.Tuple[0];
			case 1:
				return this.Tuple[1];
			case 2:
				return this.Tuple[2];
			default:
				return;
		}
	}
	GetComponentForAxis(t) {
		switch (t) {
			case 1:
				return this.Tuple[0];
			case 2:
				return this.Tuple[1];
			case 3:
				return this.Tuple[2];
			default:
				return 0;
		}
	}
	SetComponentForAxis(t, r) {
		switch (t) {
			case 1:
				this.Tuple[0] = r;
				break;
			case 2:
				this.Tuple[1] = r;
				break;
			case 3:
				this.Tuple[2] = r;
		}
	}
	Set(t, r, h) {
		var a = this.Tuple;
		(a[0] = t), (a[1] = r), (a[2] = h), this.hz && this.ToUeVector();
	}
	GetMax() {
		var t = this.Tuple;
		return Math.max(t[0], t[1], t[2]);
	}
	GetAbsMax() {
		var t = this.Tuple;
		return Math.max(Math.abs(t[0]), Math.abs(t[1]), Math.abs(t[2]));
	}
	GetMin() {
		var t = this.Tuple;
		return Math.min(t[0], t[1], t[2]);
	}
	GetAbsMin() {
		var t = this.Tuple;
		return Math.min(Math.abs(t[0]), Math.abs(t[1]), Math.abs(t[2]));
	}
	ComponentMin(t, r) {
		var h = this.Tuple,
			t = t.Tuple,
			r = r.Tuple;
		(r[0] = Math.min(h[0], t[0])),
			(r[1] = Math.min(h[1], t[1])),
			(r[2] = Math.min(h[2], t[2]));
	}
	ComponentMax(t, r) {
		var h = this.Tuple,
			t = t.Tuple,
			r = r.Tuple;
		(r[0] = Math.max(h[0], t[0])),
			(r[1] = Math.max(h[1], t[1])),
			(r[2] = Math.max(h[2], t[2]));
	}
	GetAbs(t) {
		var r = this.Tuple,
			t = t.Tuple;
		(t[0] = Math.abs(r[0])), (t[1] = Math.abs(r[1])), (t[2] = Math.abs(r[2]));
	}
	Size() {
		return Math.sqrt(this.SizeSquared());
	}
	SizeSquared() {
		var t = this.Tuple;
		return t[0] * t[0] + t[1] * t[1] + t[2] * t[2];
	}
	Size2D() {
		return Math.sqrt(this.SizeSquared2D());
	}
	SizeSquared2D() {
		var t = this.Tuple;
		return t[0] * t[0] + t[1] * t[1];
	}
	IsNearlyZero(t = MathCommon_1.MathCommon.KindaSmallNumber) {
		var r = this.Tuple;
		return !(Math.abs(r[0]) > t || Math.abs(r[1]) > t || Math.abs(r[2]) > t);
	}
	IsZero() {
		var t = this.Tuple;
		return 0 === t[0] && 0 === t[1] && 0 === t[2];
	}
	IsUnit(t = MathCommon_1.MathCommon.KindaSmallNumber) {
		return Math.abs(1 - this.SizeSquared()) < t;
	}
	IsNormalized() {
		return this.IsUnit(MathCommon_1.MathCommon.ThreshVectorNormalized);
	}
	Normalize(t = MathCommon_1.MathCommon.SmallNumber) {
		var r = this.SizeSquared();
		return t < r && ((t = 1 / Math.sqrt(r)), this.MultiplyEqual(t), !0);
	}
	GetUnsafeNormal(t) {
		var r = 1 / this.Size();
		this.Multiply(r, t);
	}
	GetUnsafeNormal2D(t) {
		var r = this.Tuple,
			t = t.Tuple,
			h = 1 / this.Size2D();
		(t[0] = r[0] * h), (t[1] = r[1] * h), (t[2] = 0);
	}
	GetSafeNormal(t, r = MathCommon_1.MathCommon.SmallNumber) {
		var h = this.SizeSquared();
		1 === h
			? t.DeepCopy(this)
			: h < r
				? t.Reset()
				: ((r = 1 / Math.sqrt(h)), this.Multiply(r, t));
	}
	GetSafeNormal2D(t, r = MathCommon_1.MathCommon.SmallNumber) {
		var h = this.Tuple,
			a = t.Tuple,
			i = this.SizeSquared2D();
		1 === i
			? t.DeepCopy(this)
			: i < r
				? t.Reset()
				: ((r = 1 / Math.sqrt(i)), (a[0] = h[0] * r), (a[1] = h[1] * r)),
			(a[2] = 0);
	}
	ToDirectionAndLength(t) {
		var r,
			h = this.Size();
		return (
			h > MathCommon_1.MathCommon.SmallNumber
				? ((r = 1 / h), t.MultiplyEqual(this).MultiplyEqual(r))
				: t.Reset(),
			h
		);
	}
	GetSignVector(t) {
		var r = this.Tuple,
			t = t.Tuple;
		(t[0] = MathCommon_1.MathCommon.FloatSelect(r[0], 1, -1)),
			(t[1] = MathCommon_1.MathCommon.FloatSelect(r[1], 1, -1)),
			(t[2] = MathCommon_1.MathCommon.FloatSelect(r[2], 1, -1));
	}
	Projection(t) {
		var r = this.Tuple,
			t = t.Tuple,
			h = 1 / r[2];
		(t[0] = r[0] * h), (t[1] = r[1] * h), (t[2] = 1);
	}
	GridSnap(t, r) {
		var h = this.Tuple,
			r = r.Tuple;
		(r[0] = t ? Math.floor((h[0] + 0.5 * t) / t) * t : r[0]),
			(r[1] = t ? Math.floor((h[1] + 0.5 * t) / t) * t : r[0]),
			(r[2] = t ? Math.floor((h[2] + 0.5 * t) / t) * t : r[0]);
	}
	BoundToCube(t, r) {
		var h = this.Tuple,
			r = r.Tuple;
		(r[0] = MathCommon_1.MathCommon.Clamp(h[0], -t, t)),
			(r[1] = MathCommon_1.MathCommon.Clamp(h[1], -t, t)),
			(r[2] = MathCommon_1.MathCommon.Clamp(h[2], -t, t));
	}
	BoundToBox(t, r, h) {
		var a = this.Tuple,
			h = h.Tuple,
			t = t.Tuple,
			r = r.Tuple;
		(h[0] = MathCommon_1.MathCommon.Clamp(a[0], t[0], r[0])),
			(h[1] = MathCommon_1.MathCommon.Clamp(a[1], t[1], r[1])),
			(h[2] = MathCommon_1.MathCommon.Clamp(a[2], t[2], r[2]));
	}
	GetClampedToSize(t, r, h) {
		var a = this.Size();
		a > MathCommon_1.MathCommon.SmallNumber ? this.Division(a, h) : h.Reset(),
			(a = MathCommon_1.MathCommon.Clamp(a, t, r)),
			h.MultiplyEqual(a);
	}
	GetClampedToSize2D(t, r, h) {
		var a = this.Tuple,
			i = h.Tuple,
			o = this.Size2D();
		o > MathCommon_1.MathCommon.SmallNumber
			? h.DivisionEqual(this).DivisionEqual(o)
			: h.Reset(),
			(o = MathCommon_1.MathCommon.Clamp(o, t, r)),
			(i[0] = i[0] * o),
			(i[1] = i[1] * o),
			(i[2] = a[2]);
	}
	GetClampedToMaxSize(t, r) {
		var h;
		t < MathCommon_1.MathCommon.KindaSmallNumber
			? r.Reset()
			: (h = this.SizeSquared()) > Math.pow(t, 2)
				? ((t = t / Math.sqrt(h)), this.Multiply(t, r))
				: r.DeepCopy(this);
	}
	GetClampedToMaxSize2D(t, r) {
		var h,
			a = this.Tuple,
			i = r.Tuple;
		(i[2] = a[2]),
			t < MathCommon_1.MathCommon.KindaSmallNumber
				? (i[0] = i[1] = 0)
				: (h = this.SizeSquared2D()) > Math.pow(t, 2)
					? ((t = +t / Math.sqrt(h)), (i[0] = a[0] * t), (i[1] = a[1] * t))
					: r.DeepCopy(this);
	}
	AddBounded(t, r = MathCommon_1.MathCommon.MaxInt16) {
		this.AdditionEqual(t), this.BoundToCube(r, this);
	}
	Reciprocal(t) {
		var r = this.Tuple,
			t = t.Tuple;
		(t[0] = 0 !== r[0] ? 1 / r[0] : MathCommon_1.MathCommon.BigNumber),
			(t[1] = 0 !== r[1] ? 1 / r[1] : MathCommon_1.MathCommon.BigNumber),
			(t[2] = 0 !== r[2] ? 1 / r[2] : MathCommon_1.MathCommon.BigNumber);
	}
	IsUniform(t = MathCommon_1.MathCommon.KindaSmallNumber) {
		return this.AllComponentsEqual(t);
	}
	MirrorByVector(t, r) {
		var h = this.DotProduct(t);
		t.MultiplyEqual(-2 * h), r.AdditionEqual(this);
	}
	MirrorByPlane(t, r) {
		var h = this.Tuple,
			a = t.Tuple,
			h = h[0] * a[0] + h[1] * a[1] + h[2] * a[2] - t.W;
		t.Multiply(-2 * h, r), r.AdditionEqual(this);
	}
	RotateAngleAxis(t, r, h) {
		var a = this.Tuple,
			r = r.Tuple,
			h = h.Tuple,
			t = t * MathCommon_1.MathCommon.DegToRad,
			i = Math.sin(t),
			t = Math.cos(t),
			o = r[0] * r[0],
			e = r[1] * r[1],
			s = r[2] * r[2],
			n = r[0] * r[1],
			M = r[1] * r[2],
			m = r[2] * r[0],
			c = r[0] * i,
			u = r[1] * i,
			r = r[2] * i,
			i = 1 - t,
			C = a[0],
			v = a[1],
			a = a[2];
		(h[0] = (i * o + t) * C + (i * n - r) * v + (i * m + u) * a),
			(h[1] = (i * n + r) * C + (i * e + t) * v + (i * M - c) * a),
			(h[2] = (i * m - u) * C + (i * M + c) * v + (i * s + t) * a);
	}
	CosineAngle2D(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
		var h,
			a = this.Tuple[0],
			i = this.Tuple[1],
			o = t.Tuple[0],
			t = t.Tuple[1],
			e = a * a + i * i;
		return e <= r || (h = o * o + t * t) <= r
			? 0
			: (a * o + i * t) / Math.sqrt(e * h);
	}
	ProjectOnTo(t, r) {
		var h = this.DotProduct(t) / t.SizeSquared();
		t.Multiply(h, r);
	}
	ProjectOnToNormal(t, r) {
		var h = this.DotProduct(t);
		t.Multiply(h, r);
	}
	ToOrientationRotator(t) {
		(t.Yaw =
			Math.atan2(this.Tuple[1], this.Tuple[0]) *
			MathCommon_1.MathCommon.RadToDeg),
			(t.Pitch =
				Math.atan2(this.Tuple[2], this.Size2D()) *
				MathCommon_1.MathCommon.RadToDeg),
			(t.Roll = 0);
	}
	ToOrientationQuat(t) {
		var r = Math.atan2(this.Tuple[1], this.Tuple[0]),
			h = Math.atan2(this.Tuple[2], this.Size2D()),
			a = Math.sin(0.5 * h),
			h = Math.cos(0.5 * h),
			i = Math.sin(0.5 * r),
			r = Math.cos(0.5 * r);
		(t.X = a * i), (t.Y = -a * r), (t.Z = h * i), (t.W = h * r);
	}
	Rotation(t) {
		this.ToOrientationRotator(t);
	}
	FindBestAxisVectors(t, r) {
		var h = this.Tuple,
			a = t.Tuple,
			i = Math.abs(h[0]),
			o = Math.abs(h[1]),
			e = Math.abs(h[2]),
			i =
				(i < e && o < e
					? ((a[0] = 1), (a[1] = a[2] = 0))
					: ((a[0] = a[1] = 0), (a[2] = 1)),
				this.DotProduct(t)),
			o = a[0] - h[0] * i,
			e = a[1] - h[1] * i,
			h = a[2] - h[2] * i,
			i = o * o + e * e + h * h;
		1 == i
			? ((a[0] = o), (a[1] = e), (a[2] = h))
			: i < MathCommon_1.MathCommon.SmallNumber
				? t.Reset()
				: ((i = 1 / Math.sqrt(i)),
					(a[0] = o * i),
					(a[1] = e * i),
					(a[2] = h * i)),
			t.CrossProduct(this, r);
	}
	UnwindEuler() {
		var t = this.Tuple;
		(t[0] = MathCommon_1.MathCommon.UnwindDegrees(t[0])),
			(t[1] = MathCommon_1.MathCommon.UnwindDegrees(t[1])),
			(t[2] = MathCommon_1.MathCommon.UnwindDegrees(t[2]));
	}
	ContainsNaN() {
		var t = this.Tuple;
		return !isFinite(t[0]) || !isFinite(t[1]) || !isFinite(t[2]);
	}
	UnitCartesianToSpherical(t) {
		var r = this.Tuple,
			h = r[0],
			a = r[1],
			r = r[2];
		(t.X = Math.acos(r / this.Size())), (t.Y = Math.atan2(a, h));
	}
	HeadingAngle() {
		var t = this.Tuple,
			r = Math.abs(t[0]) < MathCommon_1.MathCommon.KindaSmallNumber ? 0 : t[0],
			t = Math.abs(t[1]) < MathCommon_1.MathCommon.KindaSmallNumber ? 0 : t[1];
		return 0 === r && 0 === t ? 0 : Math.atan2(t, r);
	}
	static CreateOrthonormalBasis(t, r, h) {
		var a = t.Tuple,
			i = r.Tuple,
			o = h.Tuple,
			e = t.DotProduct(h) / h.SizeSquared(),
			s = r.DotProduct(h) / h.SizeSquared(),
			a =
				((a[0] -= e * o[0]),
				(a[1] -= e * o[1]),
				(a[2] -= e * o[2]),
				(i[0] -= s * o[0]),
				(i[1] -= s * o[1]),
				(i[2] -= s * o[2]),
				MathCommon_1.MathCommon.Delta * MathCommon_1.MathCommon.Delta);
		t.SizeSquared() < a && r.CrossProduct(h, t),
			r.SizeSquared() < a && t.CrossProduct(h, r),
			t.Normalize(),
			r.Normalize(),
			h.Normalize();
	}
	static PointsAreSame(t, r) {
		return this.PointsAreNear(t, r, MathCommon_1.MathCommon.ThreshPointAreSame);
	}
	static PointsAreNear(t, r, h) {
		(t = t.Tuple), (r = r.Tuple);
		return (
			Math.abs(t[0] - r[0]) < h &&
			Math.abs(t[1] - r[1]) < h &&
			Math.abs(t[2] - r[2]) < h
		);
	}
	static PointPlaneDist(t, r, h) {
		var t = t.Tuple,
			r = r.Tuple,
			h = h.Tuple,
			a = t[0] - r[0],
			i = t[1] - r[1],
			t = t[2] - r[2];
		return a * h[0] + i * h[1] + t * h[2];
	}
	static PointPlaneProject(...t) {
		var r, h, a, i, o, e, s, n, M, m;
		t.length < 3 ||
			5 < t.length ||
			((r = t[0]),
			(a = (h = t[t.length - 1]).Tuple),
			3 === t.length
				? ((M = t[1]),
					(i = this.DotProduct(r, M) - M.W),
					M.Multiply(-i, h),
					h.AdditionEqual(r))
				: 4 === t.length
					? ((M = t[1]),
						(i = t[2]),
						(M = this.PointPlaneDist(r, M, i)),
						i.Multiply(-M, h),
						h.AdditionEqual(r))
					: 5 === t.length &&
						((M = (i = t[1]).Tuple),
						(m = t[2].Tuple),
						(t = t[3].Tuple),
						(o = m[0] - M[0]),
						(e = m[1] - M[1]),
						(m = m[2] - M[2]),
						(s = t[0] - M[0]),
						(n = t[1] - M[1]),
						(t = t[0] - M[2]),
						(a[0] = e * t - m * n),
						(a[1] = m * s - o * t),
						(a[2] = o * n - e * s),
						(m = this.DotProduct(i, (M = h))),
						(t = this.DotProduct(r, M) - m),
						M.Multiply(-t, h),
						h.AdditionEqual(r)));
	}
	static VectorPlaneProject(t, r, h) {
		t.ProjectOnToNormal(r, h), h.UnaryNegation(h), h.AdditionEqual(t);
	}
	static DistSquaredXY(t, r) {
		(t = t.Tuple), (r = r.Tuple);
		return Math.pow(r[0] - t[0], 2) + Math.pow(r[1] - t[1], 2);
	}
	static DistXY(t, r) {
		return Math.sqrt(this.DistSquaredXY(t, r));
	}
	static DistSquared(t, r) {
		(t = t.Tuple), (r = r.Tuple);
		return (
			Math.pow(r[0] - t[0], 2) +
			Math.pow(r[1] - t[1], 2) +
			Math.pow(r[2] - t[2], 2)
		);
	}
	static Dist(t, r) {
		return Math.sqrt(this.DistSquared(t, r));
	}
	static Distance(t, r) {
		return this.Dist(t, r);
	}
	static Dist2D(t, r) {
		return this.DistXY(t, r);
	}
	static DistSquared2D(t, r) {
		return this.DistSquaredXY(t, r);
	}
	static BoxPushOut(t, r) {
		(t = t.Tuple), (r = r.Tuple);
		return (
			Math.abs(t[0] * r[0]) + Math.abs(t[1] * r[1]) + Math.abs(t[2] * r[2])
		);
	}
	static Parallel(t, r, h = MathCommon_1.MathCommon.ThreshNormalsAreParallel) {
		t = this.DotProduct(t, r);
		return Math.abs(t) >= h;
	}
	static Coincident(
		t,
		r,
		h = MathCommon_1.MathCommon.ThreshNormalsAreParallel,
	) {
		return h <= this.DotProduct(t, r);
	}
	static Orthogonal(
		t,
		r,
		h = MathCommon_1.MathCommon.ThreshNormalsAreOrthogonal,
	) {
		t = this.DotProduct(t, r);
		return Math.abs(t) <= h;
	}
	static Coplanar(
		t,
		r,
		h,
		a,
		i = MathCommon_1.MathCommon.ThreshNormalsAreParallel,
	) {
		return !(
			!this.Parallel(r, a, i) ||
			Math.abs(this.PointPlaneDist(t, h, r)) >
				MathCommon_1.MathCommon.ThreshPointOnPlane
		);
	}
	static Triple(t, r, h) {
		(t = t.Tuple), (r = r.Tuple), (h = h.Tuple);
		return (
			t[0] * (r[1] * h[2] - r[2] * h[1]) +
			t[1] * (r[2] * h[0] - r[0] * h[2]) +
			t[2] * (r[0] * h[1] - r[1] * h[0])
		);
	}
	static RadiansToDegrees(t, r) {
		(t = t.Tuple), (r = r.Tuple);
		(r[0] = t[0] * MathCommon_1.MathCommon.RadToDeg),
			(r[1] = t[1] * MathCommon_1.MathCommon.RadToDeg),
			(r[2] = t[2] * MathCommon_1.MathCommon.RadToDeg);
	}
	static DegreesToRadians(t, r) {
		(t = t.Tuple), (r = r.Tuple);
		(r[0] = t[0] * MathCommon_1.MathCommon.DegToRad),
			(r[1] = t[1] * MathCommon_1.MathCommon.DegToRad),
			(r[2] = t[2] * MathCommon_1.MathCommon.DegToRad);
	}
	Reset() {
		var t = this.Tuple;
		(t[0] = 0), (t[1] = 0), (t[2] = 0), this.hz && this.ToUeVector();
	}
	DeepCopy2D(t) {
		var r = this.Tuple,
			t = t.Tuple;
		(t[0] = r[0]), (t[1] = r[1]), (t[2] = 0), this.hz && this.ToUeVector();
	}
	SineAngle2D(t, r = MathCommon_1.MathCommon.KindaSmallNumber) {
		var h = this.Tuple,
			t = t.Tuple;
		let a = h[0],
			i = h[1],
			o = t[0],
			e = t[1];
		(h = a * a + i * i),
			r < h && ((t = 1 / Math.sqrt(h)), (a *= t), (i *= t)),
			(h = o * o + e * e);
		return r < h && ((t = 1 / Math.sqrt(h)), (o *= t), (e *= t)), a * e - i * o;
	}
	static VectorBlendEaseIn(t, r, h, a, i) {
		var t = t.Tuple,
			r = r.Tuple,
			i = i.Tuple,
			o = t[0],
			e = t[1],
			t = t[2],
			s = r[0] - o,
			n = r[1] - e,
			r = r[2] - t,
			h = MathCommon_1.MathCommon.Lerp(0, 1, Math.pow(h, a));
		(i[0] = o + s * h), (i[1] = e + n * h), (i[2] = t + r * h);
	}
	static DirectLerp(t, r, h, a) {
		var i,
			o = Vector.DotProduct(t, r),
			o = Math.acos(o) * MathCommon_1.MathCommon.RadToDeg;
		o < h
			? a.DeepCopy(r)
			: ((i = Quat_1.Quat.Create()),
				Quat_1.Quat.FindBetween(t, r, i),
				Quat_1.Quat.Slerp(Quat_1.Quat.IdentityProxy, i, h / o, i),
				i.RotateVector(t, a));
	}
	static Lerp(t, r, h, a) {
		h = MathCommon_1.MathCommon.Clamp(h, 0, 1);
		r.Subtraction(t, a), a.MultiplyEqual(h), a.AdditionEqual(t);
	}
	static LerpSin(t, r, h, a) {
		(t = t.Tuple), (r = r.Tuple), (h = MathCommon_1.MathCommon.Clamp(h, 0, 1));
		a.Set(
			MathCommon_1.MathCommon.LerpSin(t[0], r[0], h),
			MathCommon_1.MathCommon.LerpSin(t[1], r[1], h),
			MathCommon_1.MathCommon.LerpSin(t[2], r[2], h),
		);
	}
	static LerpCubic(t, r, h, a, i, o) {
		var e = i * i,
			s = e * i,
			n = 2 * s - 3 * e + 1,
			i = s - 2 * e + i,
			M = -2 * s + 3 * e,
			s = s - e;
		this.dHo.DeepCopy(t),
			this.dHo.MultiplyEqual(n),
			o.DeepCopy(this.dHo),
			this.dHo.DeepCopy(r),
			this.dHo.MultiplyEqual(i),
			o.AdditionEqual(this.dHo),
			this.dHo.DeepCopy(a),
			this.dHo.MultiplyEqual(s),
			o.AdditionEqual(this.dHo),
			this.dHo.DeepCopy(h),
			this.dHo.MultiplyEqual(M),
			o.AdditionEqual(this.dHo);
	}
	static LerpCubicDerivative(t, r, h, a, i, o) {
		var e = i * i;
		this.dHo.DeepCopy(t),
			this.dHo.MultiplyEqual(6),
			this.Tz.DeepCopy(this.dHo),
			this.dHo.DeepCopy(r),
			this.dHo.MultiplyEqual(3),
			this.Tz.AdditionEqual(this.dHo),
			this.dHo.DeepCopy(a),
			this.dHo.MultiplyEqual(3),
			this.Tz.AdditionEqual(this.dHo),
			this.dHo.DeepCopy(h),
			this.dHo.MultiplyEqual(-6),
			this.Tz.AdditionEqual(this.dHo),
			this.dHo.DeepCopy(t),
			this.dHo.MultiplyEqual(-6),
			this.fHo.DeepCopy(this.dHo),
			this.dHo.DeepCopy(r),
			this.dHo.MultiplyEqual(-4),
			this.fHo.AdditionEqual(this.dHo),
			this.dHo.DeepCopy(a),
			this.dHo.MultiplyEqual(-2),
			this.fHo.AdditionEqual(this.dHo),
			this.dHo.DeepCopy(h),
			this.dHo.MultiplyEqual(6),
			this.fHo.AdditionEqual(this.dHo),
			this.Tz.MultiplyEqual(e),
			this.fHo.MultiplyEqual(i),
			o.DeepCopy(r),
			o.AdditionEqual(this.Tz),
			o.AdditionEqual(this.fHo);
	}
	static VectorCopy(t, r) {
		(r.X = t.X), (r.Y = t.Y), (r.Z = t.Z);
	}
	static GetVector2dByAngle(t) {
		t *= MathCommon_1.MathCommon.DegToRad;
		return Vector.Create(Math.cos(t), Math.sin(t), 0);
	}
	static GetAngleByVector2D(t) {
		return t.HeadingAngle() * MathCommon_1.MathCommon.RadToDeg;
	}
}
((exports.Vector = Vector).lz = new Array(VECTOR_POOL_MAX_CAPACITY)),
	(Vector.ZeroVectorProxy = Vector.Create(0, 0, 0)),
	(Vector.OneVectorProxy = Vector.Create(1, 1, 1)),
	(Vector.UpVectorProxy = Vector.Create(0, 0, 1)),
	(Vector.DownVectorProxy = Vector.Create(0, 0, -1)),
	(Vector.ForwardVectorProxy = Vector.Create(1, 0, 0)),
	(Vector.BackwardVectorProxy = Vector.Create(-1, 0, 0)),
	(Vector.RightVectorProxy = Vector.Create(0, 1, 0)),
	(Vector.LeftVectorProxy = Vector.Create(0, -1, 0)),
	(Vector.XAxisVectorProxy = Vector.ForwardVectorProxy),
	(Vector.YAxisVectorProxy = Vector.RightVectorProxy),
	(Vector.ZAxisVectorProxy = Vector.UpVectorProxy),
	(Vector.ZeroVector = Vector.ZeroVectorProxy.ToUeVector()),
	(Vector.OneVector = Vector.OneVectorProxy.ToUeVector()),
	(Vector.UpVector = Vector.UpVectorProxy.ToUeVector()),
	(Vector.DownVector = Vector.DownVectorProxy.ToUeVector()),
	(Vector.ForwardVector = Vector.ForwardVectorProxy.ToUeVector()),
	(Vector.BackwardVector = Vector.BackwardVectorProxy.ToUeVector()),
	(Vector.RightVector = Vector.RightVectorProxy.ToUeVector()),
	(Vector.LeftVector = Vector.LeftVectorProxy.ToUeVector()),
	(Vector.XAxisVector = Vector.XAxisVectorProxy.ToUeVector()),
	(Vector.YAxisVector = Vector.YAxisVectorProxy.ToUeVector()),
	(Vector.ZAxisVector = Vector.ZAxisVectorProxy.ToUeVector()),
	(Vector.dHo = Vector.Create()),
	(Vector.Tz = Vector.Create()),
	(Vector.fHo = Vector.Create());
//# sourceMappingURL=Vector.js.map
