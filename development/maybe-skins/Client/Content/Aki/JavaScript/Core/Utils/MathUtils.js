"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MathUtils =
		exports.FastUeFloatRange =
		exports.INT_BIT =
		exports.intBit =
		exports.PI_DEG_DOUBLE =
		exports.PI_DEG =
			void 0);
const UE = require("ue"),
	Long = require("../../Core/Define/Net/long"),
	Stack_1 = require("../Container/Stack"),
	MathCommon_1 = require("./Math/MathCommon"),
	Quat_1 = require("./Math/Quat"),
	Rotator_1 = require("./Math/Rotator"),
	Transform_1 = require("./Math/Transform"),
	Vector_1 = require("./Math/Vector");
(exports.PI_DEG = 180),
	(exports.PI_DEG_DOUBLE = 2 * exports.PI_DEG),
	(exports.intBit = 32n),
	(exports.INT_BIT = 32);
class FastUeFloatRange {
	constructor(t) {
		(this.LowerBoundValue = 0),
			(this.UpperBoundValue = 0),
			(this.LowerBoundValue = t.LowerBound.Value),
			(this.UpperBoundValue = t.UpperBound.Value),
			(this.LowerBoundType = t.LowerBound.Type),
			(this.UpperBoundType = t.UpperBound.Type);
	}
}
exports.FastUeFloatRange = FastUeFloatRange;
class MathUtils {
	static IsNearlyEqual(t, a, i = this.SmallNumber) {
		return Math.abs(t - a) <= i;
	}
	static IsNearlyZero(t, a = this.SmallNumber) {
		return Math.abs(t) <= a;
	}
	static IsAngleNearEqual(t, a, i = MathCommon_1.MathCommon.KindaSmallNumber) {
		return Math.abs(MathUtils.WrapAngle(t - a)) <= i;
	}
	static Clamp(t, a, i) {
		return MathCommon_1.MathCommon.Clamp(t, a, i);
	}
	static GetRangePct(t, a, i) {
		var r = a - t;
		return this.IsNearlyZero(r) ? (a <= i ? 1 : 0) : (i - t) / r;
	}
	static RangeClamp(t, a, i, r, s) {
		a = this.Clamp(this.GetRangePct(a, i, t), 0, 1);
		return this.Lerp(r, s, a);
	}
	static Lerp(t, a, i) {
		return t * (1 - i) + a * i;
	}
	static LerpCubic(t, a, i, r, s) {
		var e = s * s,
			o = e * s;
		return (
			(2 * o - 3 * e + 1) * t +
			(o - 2 * e + s) * a +
			(o - e) * r +
			(-2 * o + 3 * e) * i
		);
	}
	static LerpSin(t, a, i) {
		i = Math.sin((i * Math.PI) / 2);
		return t * (1 - i) + a * i;
	}
	static LerpVector(t, a, i, r = void 0) {
		i = this.Clamp(i, 0, 1);
		return r
			? ((r.X = this.Lerp(t.X, a.X, i)),
				(r.Y = this.Lerp(t.Y, a.Y, i)),
				(r.Z = this.Lerp(t.Z, a.Z, i)),
				r)
			: new UE.Vector(
					this.Lerp(t.X, a.X, i),
					this.Lerp(t.Y, a.Y, i),
					this.Lerp(t.Z, a.Z, i),
				);
	}
	static LerpDirect2dByMaxAngle(t, a, i, r, s, e) {
		var o = MathUtils.GetAngleByVector2D(t),
			n = MathUtils.GetAngleByVector2D(a),
			t = Math.asin(t.Z) * MathUtils.RadToDeg,
			a = Math.asin(a.Z) * MathUtils.RadToDeg * i;
		let h = n - o;
		for (; 180 < h; ) h -= 360;
		for (; 180 < -h; ) h += 360;
		s && (h = 0 < h ? h - 360 : h + 360);
		let c = a - t;
		(i = Math.sqrt(h * h + c * c)),
			r < i && ((h *= r / i), (c *= r / i)),
			(n = o + h),
			(s = (t + c) * MathUtils.DegToRad),
			(e.Z = Math.sin(s)),
			(a = Math.cos(s));
		(e.X = Math.cos(n * MathUtils.DegToRad) * a),
			(e.Y = Math.sin(n * MathUtils.DegToRad) * a);
	}
	static InterpTo(t, a, i, r) {
		var s = a - t;
		return Math.abs(s) < MathCommon_1.MathCommon.KindaSmallNumber
			? a
			: t + s * this.Clamp(i * r, 0, 1);
	}
	static InterpConstantTo(t, a, i, r) {
		var s = a - t;
		return Math.abs(s) < MathCommon_1.MathCommon.KindaSmallNumber
			? a
			: t + this.Clamp(s, -(a = i * r), a);
	}
	static VectorInterpTo(t, a, i, r, s) {
		a.Subtraction(t, this.cz),
			this.cz.MultiplyEqual(this.Clamp(i * r, 0, 1)),
			this.cz.Addition(t, s);
	}
	static RotatorInterpTo(t, a, i, r, s) {
		r <= 0
			? s.DeepCopy(a)
			: ((r *= i),
				(s.Pitch = a.Pitch - t.Pitch),
				(s.Yaw = a.Yaw - t.Yaw),
				(s.Roll = a.Roll - t.Roll),
				MathCommon_1.MathCommon.VectorNormalizeRotator(s),
				(s.Pitch = 1 <= r ? s.Pitch : s.Pitch * r),
				(s.Yaw = 1 <= r ? s.Yaw : s.Yaw * r),
				(s.Roll = 1 <= r ? s.Roll : s.Roll * r),
				(s.Pitch += t.Pitch),
				(s.Yaw += t.Yaw),
				(s.Roll += t.Roll),
				MathCommon_1.MathCommon.VectorNormalizeRotator(s));
	}
	static RotatorAxisInterpTo(t, a, i, r) {
		return r <= 0
			? a
			: ((r = r * i),
				(i = MathCommon_1.MathCommon.WrapAngle(a - t)),
				(i = 1 <= r ? i : i * r),
				(i += t),
				MathCommon_1.MathCommon.WrapAngle(i));
	}
	static RotatorInterpConstantTo(t, a, i, r, s) {
		i <= 0 || r <= 0
			? s.DeepCopy(t)
			: ((r *= i),
				(s.Pitch = a.Pitch - t.Pitch),
				(s.Yaw = a.Yaw - t.Yaw),
				(s.Roll = a.Roll - t.Roll),
				MathCommon_1.MathCommon.VectorNormalizeRotator(s),
				(s.Pitch = this.Clamp(s.Pitch, -r, r)),
				(s.Yaw = this.Clamp(s.Yaw, -r, r)),
				(s.Roll = this.Clamp(s.Roll, -r, r)),
				(s.Pitch += t.Pitch),
				(s.Yaw += t.Yaw),
				(s.Roll += t.Roll),
				MathCommon_1.MathCommon.VectorNormalizeRotator(s));
	}
	static RotatorInterpConstantToAvoid(t, a, i, r, s, e) {
		r <= 0 || s <= 0
			? e.DeepCopy(t)
			: ((s *= r),
				(e.Pitch = a.Pitch - t.Pitch),
				(e.Yaw = a.Yaw - t.Yaw),
				(e.Roll = a.Roll - t.Roll),
				MathCommon_1.MathCommon.VectorNormalizeRotator(e),
				(e.Pitch = this.Clamp(e.Pitch, -s, s)),
				(e.Yaw = this.Clamp(e.Yaw, -s, s)),
				(e.Roll = this.Clamp(e.Roll, -s, s)),
				(e.Pitch += t.Pitch),
				(e.Yaw += t.Yaw),
				(e.Roll += t.Roll),
				MathCommon_1.MathCommon.VectorNormalizeRotator(e));
	}
	static GetRandomFloatNumber(t, a) {
		return t + (a - t) * Math.random();
	}
	static GetRandomVector(t, a) {
		var i = new UE.Vector();
		return (
			(i.X = MathUtils.GetRandomFloatNumber(t, a)),
			(i.Y = MathUtils.GetRandomFloatNumber(t, a)),
			(i.Z = MathUtils.GetRandomFloatNumber(t, a)),
			i
		);
	}
	static GetRandomVector2d(t, a) {
		var i = new UE.Vector2D();
		return (
			(i.X = MathUtils.GetRandomFloatNumber(t, a)),
			(i.Y = MathUtils.GetRandomFloatNumber(t, a)),
			i
		);
	}
	static GetAngleByVector2D(t) {
		let a = 0;
		return (
			(a = (
				t instanceof UE.Vector ? (this.cz.FromUeVector(t), this.cz) : t
			).HeadingAngle()) * this.RadToDeg
		);
	}
	static GetVector2dByAngle(t) {
		t *= this.DegToRad;
		return new UE.Vector(Math.cos(t), Math.sin(t), 0);
	}
	static InRange(t, a) {
		return t >= a.Min && t <= a.Max;
	}
	static InRangeArray(t, a) {
		return t >= a[0] && t <= a[1];
	}
	static InRangeAngle(t, a) {
		let i = t;
		for (; i + 360 <= a.Max; ) i += 360;
		for (; i - 360 >= a.Min; ) i -= 360;
		return this.InRange(i, a);
	}
	static InRangeAngleArray(t, a) {
		let i = t;
		for (; i + 360 <= a[1]; ) i += 360;
		for (; i - 360 >= a[0]; ) i -= 360;
		return this.InRangeArray(i, a);
	}
	static InUeRange(t, a) {
		return (
			(0 === a.LowerBound.Type
				? t > a.LowerBound.Value
				: t >= a.LowerBound.Value) &&
			(0 === a.UpperBound.Type
				? t < a.UpperBound.Value
				: t <= a.UpperBound.Value)
		);
	}
	static InFastUeRange(t, a) {
		return (
			(0 === a.LowerBoundType
				? t > a.LowerBoundValue
				: t >= a.LowerBoundValue) &&
			(0 === a.UpperBoundType ? t < a.UpperBoundValue : t <= a.UpperBoundValue)
		);
	}
	static InUeRangeAngle(t, a) {
		let i = t;
		for (; i + 360 <= a.UpperBound.Value; ) i += 360;
		for (; i - 360 >= a.LowerBound.Value; ) i -= 360;
		return this.InUeRange(i, a);
	}
	static InFastUeRangeAngle(t, a) {
		let i = t;
		for (; i + 360 <= a.UpperBoundValue; ) i += 360;
		for (; i - 360 >= a.LowerBoundValue; ) i -= 360;
		return this.InFastUeRange(i, a);
	}
	static LocationInRangeArray(t, a, i, r, s, e, o) {
		this.InverseTransformPositionNoScale(t, a, i, this.cz);
		t = this.cz.Z;
		return (
			!!this.InRangeArray(t, o) &&
			((a = this.cz.Size2D() - r), !!this.InRangeArray(a, s)) &&
			((i = MathUtils.GetAngleByVector2D(this.cz)),
			this.InRangeAngleArray(i, e))
		);
	}
	static LocationInUeRange(t, a, i, r, s, e, o) {
		this.InverseTransformPositionNoScale(t, a, i, this.cz);
		t = this.cz.Z;
		return (
			!!this.InUeRange(t, o) &&
			((a = this.cz.Size2D() - r), !!this.InUeRange(a, s)) &&
			((i = MathUtils.GetAngleByVector2D(this.cz)), this.InUeRangeAngle(i, e))
		);
	}
	static LocationInFastUeRange(t, a, i, r, s, e, o) {
		this.InverseTransformPositionNoScale(t, a, i, this.cz);
		t = this.cz.Z;
		return (
			!!this.InFastUeRange(t, o) &&
			((a = this.cz.Size2D() - r), !!this.InFastUeRange(a, s)) &&
			((i = MathUtils.GetAngleByVector2D(this.cz)),
			this.InFastUeRangeAngle(i, e))
		);
	}
	static GetFloatPointFloor(t, a = 0) {
		(a = Math.pow(10, a)), (t *= a), (t = Math.floor(t));
		return (t /= a);
	}
	static GetFloatPointFloorString(t, a = 0) {
		return MathUtils.GetFloatPointFloor(t, a).toFixed(a);
	}
	static SafeDivide(t, a) {
		return 0 !== a ? t / a : 0;
	}
	static LongToBigInt(t) {
		if ("number" == typeof t) {
			const i = BigInt(t);
			return i;
		}
		var a = BigInt(t.low >>> 0);
		const i = (BigInt(t.high) << exports.intBit) | a;
		return i;
	}
	static LongToNumber(t) {
		var a;
		return "number" == typeof t
			? t
			: ((a = BigInt(t.low >>> 0)),
				(t = (BigInt(t.high) << exports.intBit) | a),
				Number(t));
	}
	static NumberToLong(t) {
		t = BigInt(t);
		return Long.fromBigInt(t);
	}
	static BigIntToLong(t) {
		return Long.fromBigInt(t);
	}
	static GetRandomRange(t, a) {
		a -= t;
		return t + Math.random() * a;
	}
	static BlendEaseIn(t, a, i, r) {
		return t + (a - t) * this.Lerp(0, 1, Math.pow(i, r));
	}
	static StandardizingPitch(t) {
		return 180 < t ? t - 360 : t < -180 ? t + 360 : t;
	}
	static WrapAngle(t) {
		return MathCommon_1.MathCommon.WrapAngle(t);
	}
	static GetAngleByVectorDot(t, a) {
		t = this.DotProduct(t, a);
		return Math.acos(MathCommon_1.MathCommon.Clamp(t, -1, 1)) * this.RadToDeg;
	}
	static DotProduct(t, a) {
		return t.X * a.X + t.Y * a.Y + t.Z * a.Z;
	}
	static ComposeRotator(t, a, i) {
		(t = t.Quaternion()), (a = a.Quaternion());
		i instanceof Quat_1.Quat
			? a.Multiply(t, i)
			: i instanceof Rotator_1.Rotator &&
				(a.Multiply(t, this.az), this.az.Rotator(i));
	}
	static VectorToRotator(t, a) {
		return (
			(a.Yaw = Math.atan2(t.Y, t.X) * this.RadToDeg),
			(a.Pitch =
				Math.atan2(t.Z, Math.sqrt(t.X * t.X + t.Y * t.Y)) * this.RadToDeg),
			(a.Roll = 0),
			a
		);
	}
	static RotatorToVector(t, a) {
		var i = MathCommon_1.MathCommon.WrapAngle(t.Pitch),
			t = MathCommon_1.MathCommon.WrapAngle(t.Yaw),
			i = MathCommon_1.MathCommon.DegreeToRadian(i),
			t = MathCommon_1.MathCommon.DegreeToRadian(t),
			r = Math.cos(i),
			i = Math.sin(i),
			s = Math.cos(t),
			t = Math.sin(t);
		return (a.X = r * s), (a.Y = r * t), (a.Z = i), a;
	}
	static Bisection(t, a, i, r) {
		let s = a,
			e = i;
		for (; e - s > r; ) {
			var o = (s + e) / 2;
			t(o) ? (e = o) : (s = o + r);
		}
		return s;
	}
	static Square(t) {
		return t * t;
	}
	static TransformPosition(t, a, i, r, s) {
		i.Multiply(r, s), a.Quaternion().RotateVector(s, s), t.Addition(s, s);
	}
	static TransformPositionNoScale(t, a, i, r) {
		a.Quaternion().RotateVector(i, r), t.Addition(r, r);
	}
	static InverseTransformPosition(t, a, i, r, s) {
		r.Subtraction(t, s),
			a.Quaternion(this.az),
			this.az.Inverse(this.az),
			this.az.RotateVector(s, s),
			i.Multiply(s, s);
	}
	static InverseTransformPositionNoScale(t, a, i, r) {
		i.Subtraction(t, r),
			a.Quaternion(this.az),
			this.az.Inverse(this.az),
			this.az.RotateVector(r, r);
	}
	static mz() {
		return (
			this.dz ||
				((this.dz = new Array(3)),
				(this.dz[0] = new Array(3)),
				(this.dz[1] = new Array(3)),
				(this.dz[2] = new Array(3))),
			this.dz
		);
	}
	static Cz() {
		return this.gz || (this.gz = new Array(3)), this.gz;
	}
	static LookRotation(a, i, r, s) {
		let e = a.X + i.Y + r.Z;
		if (0 < e) {
			e += 1;
			var o = 0.5 / Math.sqrt(e),
				n = o * e,
				h = (i.Z - r.Y) * o,
				c = (r.X - a.Z) * o,
				o = (a.Y - i.X) * o;
			s.Set(h, c, o, n);
		} else {
			(h = this.mz()),
				(c =
					((h[0][0] = a.X),
					(h[0][1] = i.X),
					(h[0][2] = r.X),
					(h[1][0] = a.Y),
					(h[1][1] = i.Y),
					(h[1][2] = r.Y),
					(h[2][0] = a.Z),
					(h[2][1] = i.Z),
					(h[2][2] = r.Z),
					this.Cz()));
			let t = 0;
			i.Y > a.Y && (t = 1);
			(o = ((t = r.Z > h[t][t] ? 2 : t) + 1) % 3),
				(n = (1 + o) % 3),
				(i = ((e = h[t][t] - h[o][o] - h[n][n] + 1), 0.5 / Math.sqrt(e))),
				(a = ((c[t] = i * e), (h[n][o] - h[o][n]) * i));
			(c[o] = (h[o][t] + h[t][o]) * i),
				(c[n] = (h[n][t] + h[t][n]) * i),
				s.Set(c[0], c[1], c[2], a);
		}
		s.Normalize();
	}
	static LookRotationUpFirst(t, a, i) {
		var r = this.cz,
			a = (r.FromUeVector(a), r.Normalize(), this.fz),
			t = (r.CrossProduct(t, a), a.Normalize(), this.pz);
		a.CrossProduct(r, t),
			i instanceof Quat_1.Quat
				? this.LookRotation(t, a, r, i)
				: i instanceof Rotator_1.Rotator &&
					(this.LookRotation(t, a, r, this.az), this.az.Rotator(i));
	}
	static LookRotationForwardFirst(t, a, i) {
		var r = this.cz,
			t = (r.FromUeVector(t), r.Normalize(), this.fz),
			a = (a.CrossProduct(r, t), t.Normalize(), this.pz);
		r.CrossProduct(t, a),
			i instanceof Quat_1.Quat
				? this.LookRotation(r, t, a, i)
				: i instanceof Rotator_1.Rotator &&
					(this.LookRotation(r, t, a, this.az), this.az.Rotator(i));
	}
	static GetCubicValue(t) {
		return (-2 * t + 3) * t * t;
	}
	static DecimalToBinary(t) {
		let a = t,
			i = "";
		if (a < 0) (i = "-"), (a = 0 - a);
		else {
			if (0 === a) return "0";
			i = "+";
		}
		for (var r = new Stack_1.Stack(); 0 < a; )
			r.Push(Math.floor(a % 2)), (a = Math.floor(a / 2));
		var s = r.Size;
		for (let t = 0; t < s; t++) i += r.Pop().toString();
		return i;
	}
	static GetObliqueTriangleAngle(t, a, i) {
		return Math.acos((t * t + a * a - i * i) / (2 * t * a));
	}
	static GetTriangleCircumradius(t, a, i) {
		var r = (t + a + i) / 2;
		return (
			(t * a * i) /
			(this.CircumradiusRatio * Math.sqrt(r * (r - t) * (r - a) * (r - i)))
		);
	}
	static VerticalFovToHorizontally(t, a) {
		t = Math.tan((t / 2) * MathUtils.DegToRad);
		return 2 * Math.atan(t * a) * MathUtils.RadToDeg;
	}
	static HorizontalFovToVertically(t, a) {
		t = Math.tan((t / 2) * MathUtils.DegToRad);
		return 2 * Math.atan(t / a) * MathUtils.RadToDeg;
	}
	static IsValidNumbers(t, a, i, r = 1e8) {
		return (
			void 0 !== t &&
			void 0 !== a &&
			void 0 !== i &&
			null !== t &&
			null !== a &&
			null !== i &&
			!(isNaN(t) || isNaN(a) || isNaN(i)) &&
			Math.abs(t) < r &&
			Math.abs(a) < r &&
			Math.abs(i) < r
		);
	}
	static IsValidVector(t, a = 1e8) {
		var i, r;
		return (
			!!t &&
			((i = t.X), (r = t.Y), (t = t.Z), void 0 !== i) &&
			void 0 !== r &&
			void 0 !== t &&
			null !== i &&
			null !== r &&
			null !== t &&
			!(isNaN(i) || isNaN(r) || isNaN(t)) &&
			Math.abs(i) < a &&
			Math.abs(r) < a &&
			Math.abs(t) < a
		);
	}
	static IsValidRotator(t, a = 1e8) {
		var i, r;
		return (
			!!t &&
			((i = t.Roll), (r = t.Pitch), (t = t.Yaw), void 0 !== i) &&
			void 0 !== r &&
			void 0 !== t &&
			null !== i &&
			null !== r &&
			null !== t &&
			!(isNaN(i) || isNaN(r) || isNaN(t)) &&
			Math.abs(i) < a &&
			Math.abs(r) < a &&
			Math.abs(t) < a
		);
	}
}
((exports.MathUtils = MathUtils).MaxFloat = 3402823466e29),
	(MathUtils.Int32Max = 2147483647),
	(MathUtils.Int16Max = 32767),
	(MathUtils.SmallNumber = 1e-8),
	(MathUtils.KindaSmallNumber = 1e-4),
	(MathUtils.LargeNumber = 1e50),
	(MathUtils.MillisecondToSecond = 0.001),
	(MathUtils.SecondToMillisecond = 1e3),
	(MathUtils.CircumradiusRatio = 4),
	(MathUtils.RadToDeg = exports.PI_DEG / Math.PI),
	(MathUtils.DegToRad = Math.PI / exports.PI_DEG),
	(MathUtils.DefaultTransform = new UE.Transform()),
	(MathUtils.DefaultTransformProxy = Transform_1.Transform.Create()),
	(MathUtils.cz = Vector_1.Vector.Create()),
	(MathUtils.fz = Vector_1.Vector.Create()),
	(MathUtils.pz = Vector_1.Vector.Create()),
	(MathUtils.CommonTempVector = Vector_1.Vector.Create()),
	(MathUtils.CommonTempRotator = Rotator_1.Rotator.Create()),
	(MathUtils.CommonTempQuat = Quat_1.Quat.Create()),
	(MathUtils.az = Quat_1.Quat.Create());
//# sourceMappingURL=MathUtils.js.map
