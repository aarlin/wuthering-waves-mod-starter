"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BigJumpUnit = exports.DEFAULT_GRAVITY = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	CurveUtils_1 = require("../../../../../../Core/Utils/Curve/CurveUtils"),
	Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
exports.DEFAULT_GRAVITY = 1960;
class BigJumpUnit {
	constructor() {
		(this.OYo = -0),
			(this.kYo = -0),
			(this.g$i = Vector_1.Vector.Create()),
			(this.FYo = Vector_1.Vector.Create()),
			(this.fDe = Vector_1.Vector.Create()),
			(this.VYo = ""),
			(this.HYo = void 0),
			(this.jYo = -0),
			(this.WYo = Vector_1.Vector.Create()),
			(this.KYo = Vector_1.Vector.Create()),
			(this.Rotator = Rotator_1.Rotator.Create());
	}
	SetAll(t, i, o, e, s = "", r = exports.DEFAULT_GRAVITY, h = void 0) {
		(this.OYo = t),
			this.g$i.DeepCopy(i),
			this.FYo.DeepCopy(o),
			this.fDe.DeepCopy(e),
			this.VYo !== s &&
				((this.VYo = s), (this.HYo = void 0), s) &&
				ResourceSystem_1.ResourceSystem.LoadAsync(
					s,
					UE.Object,
					(t) => {
						this.HYo = t;
					},
					104,
				),
			(this.jYo = r),
			h && this.Rotator.DeepCopy(h);
	}
	SetStartPoint(t) {
		this.g$i.DeepCopy(t);
	}
	Init() {
		0 < this.jYo
			? (this.fDe.Subtraction(this.g$i, BigJumpUnit.Lz),
				this.Rotator.Set(
					0,
					MathUtils_1.MathUtils.GetAngleByVector2D(BigJumpUnit.Lz),
					0,
				),
				this.FYo.Subtraction(this.g$i, BigJumpUnit.Tz),
				(BigJumpUnit.Lz.Z = 0),
				(BigJumpUnit.Tz.Z = 0),
				BigJumpUnit.Lz.Normalize(),
				BigJumpUnit.Lz.MultiplyEqual(BigJumpUnit.Tz.DotProduct(BigJumpUnit.Lz)),
				BigJumpUnit.Lz.AdditionEqual(this.g$i),
				(this.FYo.X = BigJumpUnit.Lz.X),
				(this.FYo.Y = BigJumpUnit.Lz.Y),
				(this.kYo = Math.sqrt((2 * (this.FYo.Z - this.fDe.Z)) / this.jYo)),
				this.fDe.Subtraction(this.FYo, BigJumpUnit.Lz),
				(BigJumpUnit.Lz.Z = 0),
				BigJumpUnit.Lz.Division(this.kYo, this.KYo),
				this.FYo.Subtraction(this.g$i, BigJumpUnit.Lz),
				(BigJumpUnit.Lz.Z = 0),
				BigJumpUnit.Lz.DivisionEqual(this.OYo),
				BigJumpUnit.Lz.MultiplyEqual(2),
				BigJumpUnit.Lz.Subtraction(this.KYo, this.WYo))
			: (this.FYo.Subtraction(this.g$i, BigJumpUnit.Lz),
				(BigJumpUnit.Lz.Z = 0),
				BigJumpUnit.Lz.DivisionEqual(this.OYo),
				this.WYo.DeepCopy(BigJumpUnit.Lz),
				this.KYo.DeepCopy(this.WYo),
				(this.kYo = 0));
	}
	ToString() {
		return (
			`TimeLength: ${this.OYo} + ${this.kYo}, Points: ${this.g$i.ToString()}, ${this.FYo.ToString()}, ${this.fDe.ToString()}\n  Gravity2: ${this.jYo}, Speeds: ${this.WYo.ToString()}, ` +
			this.KYo.ToString()
		);
	}
	get RisingTime() {
		return this.OYo;
	}
	get TimeLength() {
		return this.OYo + this.kYo;
	}
	GetLocation(t, i) {
		var o;
		t < this.OYo
			? (Vector_1.Vector.Lerp(this.WYo, this.KYo, t / this.OYo, i),
				i.AdditionEqual(this.WYo),
				i.MultiplyEqual(t / 2),
				i.AdditionEqual(this.g$i),
				(o = this.HYo
					? this.HYo.GetFloatValue(t / this.OYo)
					: CurveUtils_1.CurveUtils.DefaultPara.GetCurrentValue(t / this.OYo)),
				(i.Z = MathUtils_1.MathUtils.Lerp(this.g$i.Z, this.FYo.Z, o)))
			: ((o = t - this.OYo),
				this.KYo.Multiply(o, i),
				(i.Z = (-this.jYo * o * o) / 2),
				i.AdditionEqual(this.FYo));
	}
	GetOffset(t, i, o) {
		this.GetLocation(t, BigJumpUnit.Lz),
			this.GetLocation(t + i, o),
			o.SubtractionEqual(BigJumpUnit.Lz);
	}
	GetSpeed(t, i) {
		t < this.OYo
			? (Vector_1.Vector.Lerp(this.WYo, this.KYo, t / this.OYo, i),
				i.AdditionEqual(this.WYo),
				i.MultiplyEqual(0.5))
			: (i.DeepCopy(this.KYo), (t -= this.OYo), (i.Z = -this.jYo * t));
	}
}
((exports.BigJumpUnit = BigJumpUnit).Lz = Vector_1.Vector.Create()),
	(BigJumpUnit.Tz = Vector_1.Vector.Create());
