"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SplineCurve =
		exports.InterpCurvePointNumber =
		exports.InterpCurvePointQuat =
		exports.InterpCurvePointVector =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../Common/Log"),
	Quat_1 = require("../Math/Quat"),
	Transform_1 = require("../Math/Transform"),
	Vector_1 = require("../Math/Vector"),
	MathUtils_1 = require("../MathUtils"),
	LegendreGaussCoefficients = [
		[0, 0.5688889],
		[-0.5384693, 0.47862867],
		[0.5384693, 0.47862867],
		[-0.90617985, 0.23692688],
		[0.90617985, 0.23692688],
	];
function getTsInterpCurveMode(t) {
	return t;
}
function splinePointTypeToCurveMode(t) {
	switch (t) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 5;
		case 4:
			return 3;
		default:
			return 6;
	}
}
class InterpCurvePointVector {
	constructor(t) {
		(this.InVal = 0),
			(this.OutVal = Vector_1.Vector.Create()),
			(this.ArriveTangent = Vector_1.Vector.Create()),
			(this.LeaveTangent = Vector_1.Vector.Create()),
			(this.InterpMode = 0),
			(this.InterpMode = getTsInterpCurveMode(t));
	}
	DeepCopy(t) {
		(this.InVal = t.InVal),
			this.OutVal.DeepCopy(t.OutVal),
			this.ArriveTangent.DeepCopy(t.ArriveTangent),
			this.LeaveTangent.DeepCopy(t.LeaveTangent),
			(this.InterpMode = getTsInterpCurveMode(t.InterpMode));
	}
	Clear() {
		(this.InVal = 0),
			this.ArriveTangent.Reset(),
			this.LeaveTangent.Reset(),
			this.OutVal.Reset();
	}
}
exports.InterpCurvePointVector = InterpCurvePointVector;
class InterpCurvePointQuat {
	constructor(t) {
		(this.InVal = 0),
			(this.OutVal = Quat_1.Quat.Create()),
			(this.ArriveTangent = Quat_1.Quat.Create()),
			(this.LeaveTangent = Quat_1.Quat.Create()),
			(this.InterpMode = 1),
			(this.InterpMode = getTsInterpCurveMode(t));
	}
	DeepCopy(t) {
		(this.InVal = t.InVal),
			this.OutVal.DeepCopy(t.OutVal),
			this.ArriveTangent.DeepCopy(t.ArriveTangent),
			this.LeaveTangent.DeepCopy(t.LeaveTangent),
			(this.InterpMode = getTsInterpCurveMode(t.InterpMode));
	}
	Clear() {
		(this.InVal = 0),
			this.ArriveTangent.Reset(),
			this.LeaveTangent.Reset(),
			this.OutVal.Reset();
	}
}
exports.InterpCurvePointQuat = InterpCurvePointQuat;
class InterpCurvePointNumber {
	constructor(t) {
		(this.InVal = 0),
			(this.OutVal = 0),
			(this.ArriveTangent = 0),
			(this.LeaveTangent = 0),
			(this.InterpMode = 0),
			(this.InterpMode = getTsInterpCurveMode(t));
	}
	DeepCopy(t) {
		(this.InVal = t.InVal),
			(this.OutVal = t.OutVal),
			(this.ArriveTangent = t.ArriveTangent),
			(this.LeaveTangent = t.LeaveTangent),
			(this.InterpMode = getTsInterpCurveMode(t.InterpMode));
	}
	Clear() {
		(this.InVal = 0),
			(this.ArriveTangent = 0),
			(this.LeaveTangent = 0),
			(this.OutVal = 0);
	}
}
exports.InterpCurvePointNumber = InterpCurvePointNumber;
class SplineCurve {
	constructor() {
		(this.jye = Vector_1.Vector.Create()),
			(this.RTe = Vector_1.Vector.Create()),
			(this.Ybn = Vector_1.Vector.Create()),
			(this.Lz = Vector_1.Vector.Create()),
			(this.Tz = Vector_1.Vector.Create()),
			(this.fHo = Vector_1.Vector.Create()),
			(this.pHo = Vector_1.Vector.Create()),
			(this.vHo = Vector_1.Vector.Create()),
			(this.JKs = Vector_1.Vector.Create()),
			(this.zKs = Vector_1.Vector.Create()),
			(this.jJo = Quat_1.Quat.Create()),
			(this.az = Quat_1.Quat.Create()),
			(this.KJ = Quat_1.Quat.Create()),
			(this.QJ = Quat_1.Quat.Create()),
			(this.ZKs = Quat_1.Quat.Create()),
			(this.eQs = Quat_1.Quat.Create()),
			(this.Z_e = Transform_1.Transform.Create()),
			(this.SplineTransform = Transform_1.Transform.Create()),
			(this.tQs = []),
			(this.iQs = []),
			(this.rQs = void 0),
			(this.oQs = void 0),
			this.SplineTransform.Set(
				Vector_1.Vector.ZeroVectorProxy,
				Quat_1.Quat.IdentityProxy,
				Vector_1.Vector.OneVectorProxy,
			);
	}
	Init(i, s, e, h) {
		if (
			(this.SplineTransform.Set(
				Vector_1.Vector.ZeroVectorProxy,
				Quat_1.Quat.IdentityProxy,
				Vector_1.Vector.OneVectorProxy,
			),
			i instanceof UE.InterpCurveVector)
		) {
			for (let t = this.tQs.length; t < i.Points.Num(); t++)
				this.tQs[t] = new InterpCurvePointVector(3);
			for (let t = 0; t < i.Points.Num(); t++)
				this.tQs[t].DeepCopy(i.Points.Get(t));
		} else {
			for (let t = this.tQs.length; t < i.Num(); t++)
				this.tQs[t] = new InterpCurvePointVector(3);
			for (let t = i.Num(); t < this.tQs.length; t++) this.tQs.pop();
			for (let t = 0; t < i.Num(); t++) {
				var r = i.Get(t);
				(this.tQs[t].InVal = r.InputKey),
					this.tQs[t].ArriveTangent.DeepCopy(r.ArriveTangent),
					this.tQs[t].LeaveTangent.DeepCopy(r.LeaveTangent),
					this.tQs[t].OutVal.DeepCopy(r.Position),
					(this.tQs[t].InterpMode = splinePointTypeToCurveMode(r.Type));
			}
		}
		if (s) {
			for (let t = this.iQs.length; t < s.Num(); t++)
				this.iQs[t] = new InterpCurvePointNumber(0);
			for (let t = s.Num(); t < this.iQs.length; t++) this.iQs.pop();
			for (let t = 0; t < s.Num(); t++) this.iQs[t].DeepCopy(s.Get(t));
		} else this.UpdateSplineCurves();
		if (e) {
			this.rQs || (this.rQs = []);
			for (let t = this.rQs.length; t < e.Points.Num(); t++)
				this.rQs[t] = new InterpCurvePointQuat(1);
			for (let t = e.Points.Num(); t < this.rQs.length; t++) this.iQs.pop();
			for (let t = 0; t < e.Points.Num(); t++)
				this.rQs[t].DeepCopy(e.Points.Get(t));
		} else this.rQs = void 0;
		if (h) {
			this.oQs || (this.oQs = []);
			for (let t = this.oQs.length; t < h.Points.Num(); t++)
				this.oQs[t] = new InterpCurvePointVector(1);
			for (let t = h.Points.Num(); t < this.oQs.length; t++) this.iQs.pop();
			for (let t = 0; t < h.Points.Num(); t++)
				this.oQs[t].DeepCopy(h.Points.Get(t));
		} else this.oQs = void 0;
	}
	GetSplinePointsNum() {
		return this.Position.length;
	}
	SetSplineTransform(t, i) {
		this.SplineTransform.Set(t.GetLocation(), t.GetRotation(), t.GetScale3D()),
			i && this.UpdateSplineCurves();
	}
	get Position() {
		return this.tQs;
	}
	get Rotation() {
		return this.rQs;
	}
	get Scale() {
		return this.oQs;
	}
	get ReparamTable() {
		return this.iQs;
	}
	UpdateSplineCurves(t = 0) {
		var i = this.Position.length,
			s = i - 1;
		for (let t = this.ReparamTable.length; t < s * SplineCurve.nQs + 1; t++)
			this.ReparamTable.push(new InterpCurvePointNumber(0));
		for (let t = 1; t < i; t++)
			if (this.Position[t - 1].InVal >= this.Position[t].InVal)
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Movement",
							43,
							"TsAnimNotifyStateCurveMove曲线初始化异常,Position.Points的InVal非严格递增",
						),
					!1
				);
		let e = -0,
			h = 0;
		0 < t && ((h = t * SplineCurve.nQs), (e += this.ReparamTable[h].InVal));
		for (let i = t; i < s; i++) {
			for (let t = 0; t < SplineCurve.nQs; t++) {
				var r = t / SplineCurve.nQs,
					o = 0 === t ? 0 : this.sQs(i, r);
				const n = this.ReparamTable[h];
				(n.InVal = o + e), (n.OutVal = i + r), h++;
			}
			e += this.sQs(i, 1);
		}
		const n = this.ReparamTable[h];
		return (n.InVal = e), (n.OutVal = s), !0;
	}
	sQs(t, i) {
		var s = this.Position.length,
			e = this.Position[t],
			s = this.Position[t === s - 1 ? 0 : t + 1],
			t = e.OutVal,
			h = e.LeaveTangent,
			r = s.OutVal,
			s = s.ArriveTangent;
		if (0 === e.InterpMode)
			return (
				this.jye.DeepCopy(t),
				this.fHo.DeepCopy(r),
				this.fHo.Subtraction(this.jye, this.jye),
				this.jye.Size() * i
			);
		if (2 === e.InterpMode) return 0;
		this.jye.DeepCopy(t),
			this.fHo.DeepCopy(r),
			this.pHo.DeepCopy(h),
			this.vHo.DeepCopy(s),
			this.jye.Subtraction(this.fHo, this.JKs),
			this.JKs.MultiplyEqual(2),
			this.JKs.AdditionEqual(this.pHo),
			this.JKs.AdditionEqual(this.vHo),
			this.JKs.MultiplyEqual(3),
			this.Lz.DeepCopy(h),
			this.Lz.MultiplyEqual(4),
			this.Tz.DeepCopy(s),
			this.Tz.MultiplyEqual(2),
			this.fHo.Subtraction(this.jye, this.zKs),
			this.zKs.MultiplyEqual(6),
			this.zKs.SubtractionEqual(this.Lz),
			this.zKs.SubtractionEqual(this.Tz);
		var o = 0.5 * i;
		let n = -0;
		for (const u of LegendreGaussCoefficients) {
			var a = o * (1 + u[0]);
			this.Lz.DeepCopy(this.JKs),
				this.Lz.MultiplyEqual(a),
				this.Lz.AdditionEqual(this.zKs),
				this.Lz.MultiplyEqual(a),
				this.Lz.AdditionEqual(this.pHo),
				(n += this.Lz.Size() * u[1]);
		}
		return (n *= o);
	}
	GetSplineLength() {
		var t;
		return 0 < this.Position.length
			? ((t = this.ReparamTable.length - 1), this.ReparamTable[t].InVal)
			: 0;
	}
	GetWorldLocationAtSplinePoint(t, i) {
		t = this.Position[t];
		this.jye.DeepCopy(t.OutVal),
			this.SplineTransform.TransformPosition(this.jye, i);
	}
	GetLocationAtSplinePoint(t, i, s) {
		t = this.Position[t];
		this.jye.DeepCopy(t.OutVal),
			1 === i
				? this.SplineTransform.TransformPosition(this.jye, s)
				: s.DeepCopy(this.jye);
	}
	SetLocationAtSplinePoint(t, i, s, e) {
		var h = this.Position.length;
		0 <= t &&
			t < h &&
			(1 === s
				? this.SplineTransform.InverseTransformPosition(i, this.jye)
				: this.jye.DeepCopy(i),
			(this.Position[t].OutVal.X = this.jye.X),
			(this.Position[t].OutVal.Y = this.jye.Y),
			(this.Position[t].OutVal.Z = this.jye.Z)),
			e && this.UpdateSplineCurves(t - 1);
	}
	GetTransformAtRateAlongSpline(t, i, s) {
		var e = this.ReparamTable[this.ReparamTable.length - 1].InVal,
			e = this.aQs(this.ReparamTable, e * t);
		this.GetTransformAtSplineInput(e, i, s);
	}
	GetTransformAtDistanceAlongSpline(t, i, s) {
		t = this.aQs(this.ReparamTable, t);
		this.GetTransformAtSplineInput(t, i, s);
	}
	GetTransformAtSplineInput(t, i, s) {
		this.hQs(t, 0, this.jye),
			this.lQs(t, 0, this.RTe),
			this._Qs(t, 0, this.jJo),
			this.Z_e.SetLocation(this.jye),
			this.Z_e.SetRotation(this.jJo),
			this.Z_e.SetScale3D(this.RTe),
			1 === i && this.Z_e.ComposeTransforms(this.SplineTransform, s);
	}
	hQs(t, i, s) {
		this.uQs(this.Position, t, s),
			1 === i && this.SplineTransform.TransformPosition(s, s);
	}
	lQs(t, i, s) {
		this.Scale
			? this.uQs(this.Scale, t, s)
			: s.DeepCopy(Vector_1.Vector.OneVectorProxy),
			1 === i && this.SplineTransform.TransformPosition(s, s);
	}
	_Qs(t, i, s) {
		this.Rotation
			? (this.cQs(this.Rotation, t, this.eQs), this.eQs.Normalize())
			: this.eQs.DeepCopy(Quat_1.Quat.IdentityProxy),
			this.mQs(this.Position, t, this.Ybn),
			this.Ybn.GetSafeNormal(this.Ybn),
			this.Lz.DeepCopy(Vector_1.Vector.UpVectorProxy),
			this.eQs.RotateVector(this.Lz, this.Lz),
			MathUtils_1.MathUtils.LookRotationForwardFirst(this.Ybn, this.Lz, s),
			1 === i && this.SplineTransform.GetRotation().Multiply(s, s);
	}
	cQs(t, i, s, e = Quat_1.Quat.IdentityProxy) {
		var h = t.length,
			r = h - 1;
		if (0 === h) s.DeepCopy(e);
		else {
			var o,
				n,
				h = this.dQs(t, i);
			if (h < 0) s.DeepCopy(t[0].OutVal);
			else {
				if (h !== r)
					return (
						(e = t[h]),
						0 < (n = (o = t[h + 1]).InVal - e.InVal) && 2 !== e.InterpMode
							? (i = (i - e.InVal) / n) < 0 || 1 < i
								? void (
										Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Movement",
											43,
											"TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常",
										)
									)
								: 0 === e.InterpMode
									? (this.az.DeepCopy(e.OutVal),
										this.KJ.DeepCopy(o.OutVal),
										void Quat_1.Quat.Slerp(this.az, this.KJ, i, s))
									: (this.az.DeepCopy(e.OutVal),
										this.KJ.DeepCopy(e.LeaveTangent),
										this.KJ.Multiply(n, this.KJ),
										this.QJ.DeepCopy(o.OutVal),
										this.ZKs.DeepCopy(o.ArriveTangent),
										this.ZKs.Multiply(n, this.KJ),
										void Quat_1.Quat.Squad(
											this.az,
											this.KJ,
											this.QJ,
											this.ZKs,
											i,
											s,
										))
							: void s.DeepCopy(t[h].OutVal)
					);
				s.DeepCopy(t[r].OutVal);
			}
		}
	}
	uQs(t, i, s, e = Vector_1.Vector.ZeroVectorProxy) {
		var h = t.length,
			r = h - 1;
		if (0 === h) s.DeepCopy(e);
		else {
			var o,
				n,
				h = this.dQs(t, i);
			if (h < 0) s.DeepCopy(t[0].OutVal);
			else {
				if (h !== r)
					return (
						(e = t[h]),
						0 < (n = (o = t[h + 1]).InVal - e.InVal) && 2 !== e.InterpMode
							? (i = (i - e.InVal) / n) < 0 || 1 < i
								? void (
										Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Movement",
											43,
											"TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常",
										)
									)
								: 0 === e.InterpMode
									? (this.Lz.DeepCopy(e.OutVal),
										this.Tz.DeepCopy(o.OutVal),
										void Vector_1.Vector.Lerp(this.Lz, this.Tz, i, s))
									: (this.Lz.DeepCopy(e.OutVal),
										this.Tz.DeepCopy(e.LeaveTangent),
										this.Tz.MultiplyEqual(n),
										this.fHo.DeepCopy(o.OutVal),
										this.pHo.DeepCopy(o.ArriveTangent),
										this.pHo.MultiplyEqual(n),
										void Vector_1.Vector.LerpCubic(
											this.Lz,
											this.Tz,
											this.fHo,
											this.pHo,
											i,
											s,
										))
							: void s.DeepCopy(t[h].OutVal)
					);
				s.DeepCopy(t[r].OutVal);
			}
		}
	}
	aQs(t, i, s = 0) {
		var e,
			h,
			r = t.length,
			o = r - 1;
		return 0 === r
			? s
			: (r = this.dQs(t, i)) < 0
				? t[0].OutVal
				: r === o
					? t[o].OutVal
					: ((o = t[r]),
						0 < (h = (e = t[r + 1]).InVal - o.InVal) && 2 !== o.InterpMode
							? (i = (i - o.InVal) / h) < 0 || 1 < i
								? (Log_1.Log.CheckError() &&
										Log_1.Log.Error(
											"Movement",
											43,
											"TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常",
										),
									s)
								: 0 === o.InterpMode
									? MathUtils_1.MathUtils.Lerp(o.OutVal, e.OutVal, i)
									: MathUtils_1.MathUtils.LerpCubic(
											o.OutVal,
											o.LeaveTangent * h,
											e.OutVal,
											e.ArriveTangent * h,
											i,
										)
							: t[r].OutVal);
	}
	mQs(t, i, s, e = Vector_1.Vector.ZeroVectorProxy) {
		var h = t.length,
			r = h - 1;
		if (0 === h) s.DeepCopy(e);
		else {
			var o,
				n,
				h = this.dQs(t, i);
			if (h < 0) s.DeepCopy(t[0].LeaveTangent);
			else {
				if (h !== r)
					return (
						(e = t[h]),
						0 < (n = (o = t[h + 1]).InVal - e.InVal) && 2 !== e.InterpMode
							? 0 === e.InterpMode
								? (this.Lz.DeepCopy(e.OutVal),
									s.DeepCopy(o.OutVal),
									s.SubtractionEqual(this.Lz),
									void s.DivisionEqual(n))
								: (i = (i - e.InVal) / n) < 0 || 1 < i
									? void (
											Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Movement",
												43,
												"TsAnimNotifyStateCurveMove.InterpVectorEvalDerivative计算Alpha异常",
											)
										)
									: (this.Lz.DeepCopy(e.OutVal),
										this.Tz.DeepCopy(e.LeaveTangent),
										this.Tz.MultiplyEqual(n),
										this.fHo.DeepCopy(o.OutVal),
										this.pHo.DeepCopy(o.ArriveTangent),
										this.pHo.MultiplyEqual(n),
										Vector_1.Vector.LerpCubicDerivative(
											this.Lz,
											this.Tz,
											this.fHo,
											this.pHo,
											i,
											s,
										),
										void s.DivisionEqual(n))
							: void s.DeepCopy(t[h].OutVal)
					);
				s.DeepCopy(t[r].ArriveTangent);
			}
		}
	}
	dQs(t, i) {
		var s = t.length,
			e = s - 1;
		if (i < t[0].InVal) return -1;
		if (i >= t[e].InVal) return e;
		let h = 0,
			r = s;
		var o;
		for (Math.floor((h + r) / 2); 1 < r - h; )
			t[(o = Math.floor((h + r) / 2))].InVal <= i ? (h = o) : (r = o);
		return h;
	}
}
(exports.SplineCurve = SplineCurve).nQs = 10;
//# sourceMappingURL=SplineCurve.js.map
