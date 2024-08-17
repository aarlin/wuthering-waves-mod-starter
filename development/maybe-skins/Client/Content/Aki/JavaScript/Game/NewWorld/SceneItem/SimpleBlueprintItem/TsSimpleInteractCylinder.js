"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	TsSimpleInteractBase_1 = require("./TsSimpleInteractBase"),
	redColor = new UE.LinearColor(1, 0, 0, 1),
	yellowColor = new UE.LinearColor(1, 1, 0, 1),
	greenColor = new UE.LinearColor(0, 1, 0, 1),
	DRAW_TIME = 0.05,
	DEFAULT_THICKNESS = 4,
	DEFAULT_ARROW_SIZE = 50,
	NOT_INTRO_SIZE = 1.5,
	DRAW_ANGLE_PERIOD = 10,
	textColor = new UE.Color(255, 128, 128, 255),
	TEXT_SIZE = 200,
	CHECK_ANGLE_PERIODIC = 1,
	MINUS_180 = -180,
	TRY_GET_ANGLE_PERIODIC = 15,
	PROFILE_KEY_CEHCK_LEGAL = "TsSimpleInteractCylinder_CheckLegal",
	PROFILE_KEY = "TsSimpleInteractCylindere_GetBestTransform";
class AngleLimit {
	constructor() {
		this.Limits = new Array();
	}
	GetAngleFromLimits(t) {
		if (0 === this.Limits.length) return [t, 0];
		let i = 360,
			e = 360;
		for (const s of this.Limits) {
			if (0 === s[2]) {
				var o = s[0] - t;
				if (0 < o) {
					i > o && ((i = o), (e = s[0]));
					continue;
				}
				if (0 < (o = t - s[1])) {
					i > o && ((i = o), (e = s[0]));
					continue;
				}
				return [t, 0];
			}
			let r = 0;
			if (
				(0 < (o = s[0] - t) && (i > o && ((i = o), (e = s[0])), ++r),
				0 < (o = t - s[1]) && (i > o && ((i = o), (e = s[0])), ++r),
				r < 2)
			)
				return [t, 0];
		}
		return [e, i];
	}
}
class TsSimpleInteractCylinder extends TsSimpleInteractBase_1.default {
	constructor() {
		super(...arguments),
			(this.CylinderHalfHeight = 200),
			(this.CylinderRadius = 500),
			(this.Intro = !1),
			(this.Angle = 180),
			(this.SelfForward = void 0),
			(this.SelfRight = void 0),
			(this.SelfUp = void 0),
			(this.AngleLimit = void 0),
			(this.ActorAngleInSelf = void 0),
			(this.TmpResultLocation = void 0),
			(this.ActorFinalUp = void 0),
			(this.TmpLocation = void 0),
			(this.TmpRotator = void 0),
			(this.StartLocation = void 0),
			(this.EndLocation = void 0);
	}
	OnBeginPlay() {
		(this.SelfForward = Vector_1.Vector.Create()),
			(this.SelfRight = Vector_1.Vector.Create()),
			(this.SelfUp = Vector_1.Vector.Create()),
			(this.AngleLimit = new AngleLimit()),
			(this.TmpResultLocation = Vector_1.Vector.Create()),
			(this.TmpLocation = Vector_1.Vector.Create()),
			(this.TmpRotator = Rotator_1.Rotator.Create()),
			(this.StartLocation = Vector_1.Vector.Create()),
			(this.EndLocation = Vector_1.Vector.Create()),
			(this.ActorFinalUp = Vector_1.Vector.Create()),
			super.OnBeginPlay();
	}
	UpdateData() {
		super.UpdateData();
		var t = this.SelfTransform.GetRotation();
		t.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.SelfForward),
			t.RotateVector(Vector_1.Vector.RightVectorProxy, this.SelfRight),
			this.SelfForward.CrossProduct(this.SelfRight, this.SelfUp),
			this.SelfUp.Z < 0
				? this.ActorFinalUp.Set(-this.SelfUp.X, -this.SelfUp.Y, -this.SelfUp.Z)
				: this.ActorFinalUp.Set(this.SelfUp.X, this.SelfUp.Y, this.SelfUp.Z);
	}
	CheckLegal() {
		if (
			(this.TmpLocation || (this.TmpLocation = Vector_1.Vector.Create()),
			this.StartLocation || (this.StartLocation = Vector_1.Vector.Create()),
			this.EndLocation || (this.EndLocation = Vector_1.Vector.Create()),
			void 0 !== this.IsLegal) &&
			(0 === (t = UE.EditorLevelLibrary.GetSelectedLevelActors()).Num() ||
				t.Get(0) !== this)
		)
			return this.IsLegal;
		this.LineTrace || this.InitTraceInfo();
		var t = Math.min(180, this.Angle),
			i = Math.ceil((2 * t) / 1) + 1,
			e = 1 < i ? ((2 * t) / (i - 1)) * MathUtils_1.MathUtils.DegToRad : 0;
		let o = -t * MathUtils_1.MathUtils.DegToRad;
		for (let t = 0; t < i; ++t) {
			if (
				((this.TmpLocation.X = Math.cos(o) * this.CylinderRadius),
				(this.TmpLocation.Y = Math.sin(o) * this.CylinderRadius),
				(this.TmpLocation.Z = -this.CylinderHalfHeight),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpLocation,
					this.StartLocation,
				),
				(this.TmpLocation.Z = this.CylinderHalfHeight),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpLocation,
					this.EndLocation,
				),
				(this.LineTrace.WorldContextObject = this),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.LineTrace,
					this.StartLocation,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.LineTrace,
					this.EndLocation,
				),
				TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.LineTrace,
					PROFILE_KEY_CEHCK_LEGAL,
				))
			)
				return !1;
			o += e;
		}
		return !0;
	}
	OnDraw() {
		this.LineTrace || this.InitTraceInfo();
		var t = this.IsLegal ? greenColor : yellowColor,
			i = Math.min(180, this.Angle),
			e = Math.floor((2 * i) / 10) + 1,
			o = 1 < e ? ((2 * i) / (e - 1)) * MathUtils_1.MathUtils.DegToRad : 0;
		let s = -i * MathUtils_1.MathUtils.DegToRad;
		var r = Vector_1.Vector.Create(),
			a = Vector_1.Vector.Create(),
			n = Vector_1.Vector.Create(),
			h = Vector_1.Vector.Create();
		for (let i = 0; i < e; ++i)
			(this.TmpLocation.X = Math.cos(s) * this.CylinderRadius),
				(this.TmpLocation.Y = Math.sin(s) * this.CylinderRadius),
				(this.TmpLocation.Z = -this.CylinderHalfHeight),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpLocation,
					this.StartLocation,
				),
				(this.TmpLocation.Z = this.CylinderHalfHeight),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpLocation,
					this.EndLocation,
				),
				UE.KismetSystemLibrary.DrawDebugLine(
					this,
					this.StartLocation.ToUeVector(),
					this.EndLocation.ToUeVector(),
					t,
					0.05,
					4,
				),
				0 === i
					? (r.DeepCopy(this.StartLocation), a.DeepCopy(this.EndLocation))
					: (UE.KismetSystemLibrary.DrawDebugLine(
							this,
							n.ToUeVector(),
							this.StartLocation.ToUeVector(),
							t,
							0.05,
							4,
						),
						UE.KismetSystemLibrary.DrawDebugLine(
							this,
							h.ToUeVector(),
							this.EndLocation.ToUeVector(),
							t,
							0.05,
							4,
						)),
				n.DeepCopy(this.StartLocation),
				h.DeepCopy(this.EndLocation),
				(s += o);
		180 <= this.Angle &&
			(UE.KismetSystemLibrary.DrawDebugLine(
				this,
				n.ToUeVector(),
				r.ToUeVector(),
				t,
				0.05,
				4,
			),
			UE.KismetSystemLibrary.DrawDebugLine(
				this,
				h.ToUeVector(),
				a.ToUeVector(),
				t,
				0.05,
				4,
			));
		for (let t = 0; t < 2 * Math.PI; t += 0.5 * Math.PI)
			(this.TmpLocation.X = Math.cos(t) * this.CylinderRadius),
				(this.TmpLocation.Y = Math.sin(t) * this.CylinderRadius),
				(this.TmpLocation.Z = 0),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpLocation,
					this.StartLocation,
				),
				(this.TmpLocation.X *= this.Intro ? 0.5 : 1.5),
				(this.TmpLocation.Y *= this.Intro ? 0.5 : 1.5),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpLocation,
					this.EndLocation,
				),
				UE.KismetSystemLibrary.DrawDebugArrow(
					this,
					this.StartLocation.ToUeVector(),
					this.EndLocation.ToUeVector(),
					50,
					redColor,
					0.05,
					4,
				);
	}
	SetText(t) {
		(this.Text.HorizontalAlignment = 1),
			this.Text.SetWorldSize(200),
			this.Text.SetTextRenderColor(textColor),
			(this.Text.Text = "Cylinder " + this.TypeId);
	}
	OnGetBestTransform(t, i, e, o) {
		this.UpdateData();
		var s = this.TmpResult,
			r = this.Intro ? this.CylinderRadius - o : this.CylinderRadius + o;
		if (r <= 0) s.Success = !1;
		else if (
			(this.ActorLocation.FromUeVector(t.K2_GetActorLocation()),
			this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor),
			this.MoveOffset.FromUeVector(i),
			this.CalAngleLimit(r))
		) {
			this.TmpVector1.DeepCopy(this.ActorLocation),
				(this.TmpVector1.Z += this.MoveOffset.Z);
			var a = this.MoveOffset.SizeSquared2D(),
				n = this.ActorLocation.Z + this.MoveOffset.Z,
				h = this.CylinderHalfHeight / this.SelfUp.Z;
			let i = MathUtils_1.MathUtils.LargeNumber,
				e = ((s.Success = !1), 1);
			for (const t of this.AngleLimit.Limits) {
				let o = t[1] - t[0];
				0 < t[2] && (o += 360);
				var c = Math.ceil(o / 15) + 1,
					l = (o / (c - 1)) * MathUtils_1.MathUtils.DegToRad;
				let L = t[0] * MathUtils_1.MathUtils.DegToRad;
				for (let t = 0; t < c; ++t) {
					this.SelfForward.Multiply(Math.cos(L) * r, this.TmpVector3),
						this.SelfRight.Multiply(Math.sin(L) * r, this.TmpVector4),
						this.TmpVector3.AdditionEqual(this.TmpVector4),
						this.TmpVector3.AdditionEqual(this.SelfLocation);
					var m = n - this.TmpVector3.Z;
					(m =
						(this.SelfUp.Multiply(
							(Math.sign(m) * Math.min(Math.abs(m), h)) / this.SelfUp.Z,
							this.TmpVector4,
						),
						this.TmpVector3.AdditionEqual(this.TmpVector4),
						Vector_1.Vector.DistSquared2D(this.TmpVector1, this.TmpVector3))),
						(m =
							MathUtils_1.MathUtils.Square(
								this.TmpVector1.Z - this.TmpVector3.Z,
							) +
							m +
							a -
							2 * Math.sqrt(m * a));
					Math.abs(i - m) < MathUtils_1.MathUtils.KindaSmallNumber
						? (++e,
							Math.random() * e < 1 &&
								this.TmpResultLocation.DeepCopy(this.TmpVector3))
						: i > m &&
							((e = 1),
							(i = m),
							(s.Success = !0),
							this.TmpResultLocation.DeepCopy(this.TmpVector3)),
						(L += l);
				}
			}
			s.Success &&
				((this.LineTrace.WorldContextObject = t),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.LineTrace,
					this.ActorLocation,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.LineTrace,
					this.TmpResultLocation,
				),
				(s.Success = !TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.LineTrace,
					PROFILE_KEY,
				)),
				(this.LineTrace.WorldContextObject = void 0),
				s.Success) &&
				((s.Location = this.TmpResultLocation.ToUeVector()),
				(s.SquaredOffsetLength = i),
				this.Intro
					? this.TmpResultLocation.Subtraction(
							this.SelfLocation,
							this.TmpVector1,
						)
					: this.SelfLocation.Subtraction(
							this.TmpResultLocation,
							this.TmpVector1,
						),
				MathUtils_1.MathUtils.LookRotationUpFirst(
					this.TmpVector1,
					this.ActorFinalUp,
					this.TmpRotator,
				),
				(s.Rotator = this.TmpRotator.ToUeRotator()));
		} else s.Success = !1;
		return s;
	}
	CalAngleLimit(t) {
		(this.AngleLimit.Limits.length = 0),
			this.SelfTransform.InverseTransformPositionNoScale(
				this.ActorLocation,
				this.TmpVector1,
			);
		var i = this.TmpVector1;
		if (1 <= (t = (t * t) / i.SizeSquared2D()))
			return (
				!!this.Intro &&
				(this.Angle < 180
					? this.AngleLimit.Limits.push([-this.Angle, this.Angle, 0])
					: this.AngleLimit.Limits.push([-180, 180, 0]),
				!0)
			);
		(t = Math.acos(Math.sqrt(t)) * MathUtils_1.MathUtils.RadToDeg),
			(this.ActorAngleInSelf = MathUtils_1.MathUtils.GetAngleByVector2D(i));
		let e = 0,
			o = 0;
		if (
			(this.Intro
				? ((o = this.ActorAngleInSelf - t) < -180 && (o += 360),
					180 < (e = this.ActorAngleInSelf + t) && (e -= 360))
				: ((e = this.ActorAngleInSelf - t) < -180 && (e += 360),
					180 < (o = this.ActorAngleInSelf + t) && (o -= 360)),
			this.Angle < 180)
		) {
			if (e < o)
				return (
					(e = Math.max(e, -this.Angle)),
					(o = Math.min(o, this.Angle)),
					!(e > o || (this.AngleLimit.Limits.push([e, o, 0]), 0))
				);
			if (
				(e <= this.Angle &&
					o >= -this.Angle &&
					this.AngleLimit.Limits.push([e, this.Angle, 0]),
				o <= this.Angle &&
					o >= -this.Angle &&
					this.AngleLimit.Limits.push([-this.Angle, o, 0]),
				0 === this.AngleLimit.Limits.length)
			) {
				if (e * o < 0) return !1;
				this.AngleLimit.Limits.push([-this.Angle, this.Angle, 0]);
			}
		} else this.AngleLimit.Limits.push([e, o, e < o ? 0 : 1]);
		return !0;
	}
}
exports.default = TsSimpleInteractCylinder;
