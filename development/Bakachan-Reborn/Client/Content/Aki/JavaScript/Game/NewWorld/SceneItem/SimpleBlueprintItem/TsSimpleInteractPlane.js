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
	DEFAULT_ARROW_SIZE = 100,
	DRAW_LENGTH = 200,
	forwardOffset = Vector_1.Vector.Create(200, 0, 0),
	drawPoints = [
		new UE.Vector(0, -1, -1),
		new UE.Vector(0, -1, 1),
		new UE.Vector(0, 1, -1),
		new UE.Vector(0, 1, 1),
	],
	textColor = new UE.Color(255, 128, 128, 255),
	TEXT_SIZE = 200,
	LEGAL_CHECK_PERIOD = 100,
	SMALL_VALUE = 0.1,
	PROFILE_KEY_CEHCK_LEGAL = "TsSimpleInteractPlane_CheckLegal",
	PROFILE_KEY = "TsSimpleInteractPlane_GetBestTransform";
class TsSimpleInteractPlane extends TsSimpleInteractBase_1.default {
	constructor() {
		super(...arguments),
			(this.PlaneHalfHeight = 500),
			(this.PlaneHalfWidth = 500),
			(this.SelfForward = void 0),
			(this.SelfBackward = void 0),
			(this.SelfRight = void 0),
			(this.SelfUp = void 0),
			(this.IsHorizontalPlane = !1),
			(this.TmpResultLocation = void 0),
			(this.TmpResultRotator = void 0),
			(this.ForwardSizeSquared2D = -0),
			(this.Forward2D = void 0),
			(this.NormalRotator = void 0),
			(this.TmpLocation = void 0),
			(this.StartLocation = void 0),
			(this.EndLocation = void 0);
	}
	OnBeginPlay() {
		(this.SelfForward = Vector_1.Vector.Create()),
			(this.SelfRight = Vector_1.Vector.Create()),
			(this.SelfUp = Vector_1.Vector.Create()),
			(this.SelfBackward = Vector_1.Vector.Create()),
			(this.Forward2D = Vector_1.Vector.Create()),
			(this.TmpResultLocation = Vector_1.Vector.Create()),
			(this.TmpResultRotator = Rotator_1.Rotator.Create()),
			(this.TmpLocation = Vector_1.Vector.Create()),
			(this.StartLocation = Vector_1.Vector.Create()),
			(this.EndLocation = Vector_1.Vector.Create()),
			(this.NormalRotator = Rotator_1.Rotator.Create()),
			super.OnBeginPlay();
	}
	UpdateData() {
		super.UpdateData();
		var t = this.SelfTransform.GetRotation();
		t.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.SelfForward),
			t.RotateVector(Vector_1.Vector.RightVectorProxy, this.SelfRight),
			this.SelfForward.CrossProduct(this.SelfRight, this.SelfUp),
			(this.ForwardSizeSquared2D =
				1 - MathUtils_1.MathUtils.Square(this.SelfForward.Z)),
			this.IsHorizontalPlane ||
				(this.Forward2D.DeepCopy(this.SelfForward),
				(this.Forward2D.Z = 0),
				this.Forward2D.DivisionEqual(this.ForwardSizeSquared2D),
				MathUtils_1.MathUtils.LookRotationForwardFirst(
					this.SelfBackward,
					Vector_1.Vector.UpVectorProxy,
					this.NormalRotator,
				));
	}
	CheckLegal() {
		if (
			(this.TmpLocation || (this.TmpLocation = Vector_1.Vector.Create()),
			this.StartLocation || (this.StartLocation = Vector_1.Vector.Create()),
			this.EndLocation || (this.EndLocation = Vector_1.Vector.Create()),
			void 0 !== this.IsLegal)
		) {
			var t = UE.EditorLevelLibrary.GetSelectedLevelActors();
			if (0 === t.Num() || t.Get(0) !== this) return this.IsLegal;
		}
		this.LineTrace || this.InitTraceInfo();
		var o = Math.ceil((2 * this.PlaneHalfHeight) / 100) + 1,
			i = 1 < o ? (2 * this.PlaneHalfHeight) / (o - 1) : 0;
		let e = -this.PlaneHalfHeight;
		for (let t = 0; t < o; ++t) {
			if (
				((this.TmpLocation.X = 0),
				(this.TmpLocation.Y = -this.PlaneHalfWidth),
				(this.TmpLocation.Z = e),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpLocation,
					this.StartLocation,
				),
				(this.TmpLocation.Y = this.PlaneHalfWidth),
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
			e += i;
		}
		var a = Math.ceil((2 * this.PlaneHalfWidth) / 100) + 1,
			s = 1 < a ? (2 * this.PlaneHalfWidth) / (a - 1) : 0;
		let r = -this.PlaneHalfWidth;
		for (let t = 0; t < a; ++t) {
			if (
				((this.TmpLocation.X = 0),
				(this.TmpLocation.Y = r),
				(this.TmpLocation.Z = -this.PlaneHalfHeight),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpLocation,
					this.StartLocation,
				),
				(this.TmpLocation.Z = this.PlaneHalfHeight),
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
			r += s;
		}
		return !0;
	}
	OnDraw() {
		var t = this.IsLegal ? greenColor : yellowColor,
			o = ((this.TmpLocation.X = 0), drawPoints.length);
		for (let i = 0; i < o; ++i) {
			(this.TmpLocation.Y = drawPoints[i].Y * this.PlaneHalfWidth),
				(this.TmpLocation.Z = drawPoints[i].Z * this.PlaneHalfHeight),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpLocation,
					this.StartLocation,
				);
			for (let e = i + 1; e < o; ++e)
				(this.TmpLocation.Y = drawPoints[e].Y * this.PlaneHalfWidth),
					(this.TmpLocation.Z = drawPoints[e].Z * this.PlaneHalfHeight),
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
					);
		}
		this.SelfTransform.TransformPositionNoScale(
			forwardOffset,
			this.EndLocation,
		),
			UE.KismetSystemLibrary.DrawDebugArrow(
				this,
				this.K2_GetActorLocation(),
				this.EndLocation.ToUeVector(),
				100,
				redColor,
				0.05,
				4,
			);
	}
	SetText(t) {
		(this.Text.HorizontalAlignment = 1),
			this.Text.SetWorldSize(200),
			this.Text.SetTextRenderColor(textColor),
			(this.Text.Text = "Plane " + this.TypeId);
	}
	OnGetBestTransform(t, o, i, e) {
		this.UpdateData();
		var a = this.TmpResult;
		return (
			this.ActorLocation.FromUeVector(t.K2_GetActorLocation()),
			this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor),
			(a.Success = this.SelfToActor.DotProduct(this.SelfForward) > e),
			a.Success &&
				(this.MoveOffset.FromUeVector(o),
				this.IsHorizontalPlane
					? ((o = this.GetBestTransformHorizontal(i, e)),
						(a.Location = o[0].ToUeVector()),
						(a.Rotator = o[1].ToUeRotator()),
						(a.SquaredOffsetLength = o[2]))
					: ((o = this.GetBestTransformNotHorizontal(i, e)),
						(a.Location = o[0].ToUeVector()),
						(a.Rotator = o[1].ToUeRotator()),
						(a.SquaredOffsetLength = o[2])),
				(this.LineTrace.WorldContextObject = t),
				TraceElementCommon_1.TraceElementCommon.SetStartLocation(
					this.LineTrace,
					this.ActorLocation,
				),
				TraceElementCommon_1.TraceElementCommon.SetEndLocation(
					this.LineTrace,
					a.Location,
				),
				(a.Success = !TraceElementCommon_1.TraceElementCommon.LineTrace(
					this.LineTrace,
					PROFILE_KEY,
				)),
				a.Success),
			a
		);
	}
	GetBestTransformHorizontal(t, o) {
		var i = this.SelfRight.DotProduct(this.SelfToActor),
			e = this.SelfUp.DotProduct(this.SelfToActor),
			a = i + this.SelfRight.DotProduct(this.MoveOffset),
			s = e + this.SelfUp.DotProduct(this.MoveOffset),
			r = Math.abs(a),
			h = Math.abs(s),
			n = this.PlaneHalfWidth,
			c = this.PlaneHalfHeight;
		if (r < n && h < c)
			return (
				this.ActorLocation.Addition(this.MoveOffset, this.TmpResultLocation),
				(h =
					(r = this.SelfLocation.Z + this.SelfForward.X * o) -
					this.TmpResultLocation.Z),
				(this.TmpResultLocation.Z = r),
				MathUtils_1.MathUtils.LookRotationForwardFirst(
					this.SelfBackward,
					this.MoveOffset,
					this.TmpResultRotator,
				),
				[this.TmpResultLocation, this.TmpResultRotator, h * h]
			);
		(r = Math.abs(i)), (h = Math.abs(e));
		var l =
				MathUtils_1.MathUtils.Square(r + n) +
				MathUtils_1.MathUtils.Square(h + c),
			m = this.MoveOffset.SizeSquared2D();
		if (l <= m) {
			(this.TmpResultLocation.X = o),
				(this.TmpResultLocation.Y = 0 < a ? -n : n),
				(this.TmpResultLocation.Z = 0 < s ? -c : c),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpResultLocation,
					this.TmpResultLocation,
				),
				this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1),
				MathUtils_1.MathUtils.LookRotationForwardFirst(
					this.SelfBackward,
					this.TmpVector1,
					this.TmpResultRotator,
				);
			const t =
				MathUtils_1.MathUtils.Square(
					this.TmpResultLocation.Z - (this.ActorLocation.Z + this.MoveOffset.Z),
				) + MathUtils_1.MathUtils.Square(Math.sqrt(m) - Math.sqrt(l));
			return [this.TmpResultLocation, this.TmpResultRotator, t];
		}
		if (this.FindHitMatrixAndCircle(n, c, i, e, m, a, s)) {
			(this.TmpResultLocation.X = o),
				this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1),
				MathUtils_1.MathUtils.LookRotationForwardFirst(
					this.SelfBackward,
					this.TmpVector1,
					this.TmpResultRotator,
				);
			const t = MathUtils_1.MathUtils.Square(
				this.TmpResultLocation.Z - (this.ActorLocation.Z + this.MoveOffset.Z),
			);
			return [this.TmpResultLocation, this.TmpResultRotator, t];
		}
		(this.TmpResultLocation.X = o),
			(this.TmpResultLocation.Y = 0 < a ? n : -n),
			(this.TmpResultLocation.Z = 0 < s ? c : -c),
			this.SelfTransform.TransformPositionNoScale(
				this.TmpResultLocation,
				this.TmpResultLocation,
			),
			this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1),
			MathUtils_1.MathUtils.LookRotationForwardFirst(
				this.SelfBackward,
				this.TmpVector1,
				this.TmpResultRotator,
			),
			(l =
				MathUtils_1.MathUtils.Square(r - n) +
				MathUtils_1.MathUtils.Square(h - c));
		const T =
			MathUtils_1.MathUtils.Square(
				this.TmpResultLocation.Z - (this.ActorLocation.Z + this.MoveOffset.Z),
			) +
			m +
			l -
			2 * Math.sqrt(m * l);
		return [this.TmpResultLocation, this.TmpResultRotator, T];
	}
	FindHitMatrixAndCircle(t, o, i, e, a, s, r) {
		let h = 10 * a;
		for (let T = 0; T < 2; ++T) {
			var n,
				c,
				l = 0 === T ? t : -t,
				m = a - MathUtils_1.MathUtils.Square(i - l);
			0 < m &&
				((n = e - (m = Math.sqrt(m))),
				Math.abs(n) < o &&
					(c =
						MathUtils_1.MathUtils.Square(l - s) +
						MathUtils_1.MathUtils.Square(n - r)) < h &&
					((h = c),
					(this.TmpResultLocation.Y = l),
					(this.TmpResultLocation.Z = n)),
				(n = e + m),
				Math.abs(n) < o) &&
				(c =
					MathUtils_1.MathUtils.Square(l - s) +
					MathUtils_1.MathUtils.Square(n - r)) < h &&
				((h = c),
				(this.TmpResultLocation.Y = l),
				(this.TmpResultLocation.Z = n));
		}
		for (let n = 0; n < 2; ++n) {
			var T,
				p,
				L = 0 === n ? o : -o,
				f = a - MathUtils_1.MathUtils.Square(e - L);
			0 < f &&
				((T = i - (f = Math.sqrt(f))),
				Math.abs(i) < t &&
					(p =
						MathUtils_1.MathUtils.Square(T - s) +
						MathUtils_1.MathUtils.Square(L - r)) < h &&
					((h = p),
					(this.TmpResultLocation.Y = T),
					(this.TmpResultLocation.Z = L)),
				(T = i + f),
				Math.abs(T) < o) &&
				(p =
					MathUtils_1.MathUtils.Square(T - s) +
					MathUtils_1.MathUtils.Square(L - r)) < h &&
				((h = p),
				(this.TmpResultLocation.Y = T),
				(this.TmpResultLocation.Z = L));
		}
		return h < 10 * a;
	}
	GetBestTransformNotHorizontal(t, o) {
		this.TmpVector1.DeepCopy(this.SelfToActor),
			(this.TmpVector1.Z += this.MoveOffset.Z);
		var i = this.SelfForward.DotProduct(this.TmpVector1),
			e = MathUtils_1.MathUtils.Square(i - o) / this.ForwardSizeSquared2D,
			a = this.MoveOffset.SizeSquared2D(),
			s = this.PlaneHalfWidth,
			r = this.PlaneHalfHeight;
		if (a <= e)
			return (
				this.TmpVector2.DeepCopy(this.Forward2D),
				this.TmpVector2.MultiplyEqual(Math.sqrt(a)),
				this.TmpVector1.SubtractionEqual(this.TmpVector2),
				(this.TmpResultLocation.X = o),
				(this.TmpResultLocation.Y = MathUtils_1.MathUtils.Clamp(
					this.SelfRight.DotProduct(this.TmpVector1),
					-s,
					s,
				)),
				(this.TmpResultLocation.Z = MathUtils_1.MathUtils.Clamp(
					this.SelfUp.DotProduct(this.TmpVector1),
					-r,
					r,
				)),
				this.SelfTransform.TransformPositionNoScale(
					this.TmpResultLocation,
					this.TmpResultLocation,
				),
				this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1),
				[
					this.TmpResultLocation,
					this.NormalRotator,
					MathUtils_1.MathUtils.Square(
						this.TmpVector1.Size2D() - Math.sqrt(a),
					) +
						MathUtils_1.MathUtils.Square(this.TmpVector1.Z - this.MoveOffset.Z),
				]
			);
		Vector_1.Vector.UpVectorProxy.CrossProduct(
			this.SelfForward,
			this.TmpVector1,
		),
			Vector_1.Vector.UpVectorProxy.CrossProduct(
				this.TmpVector1,
				this.TmpVector2,
			),
			this.TmpVector2.MultiplyEqual(
				Math.sign(i - o) * Math.sqrt(e / this.TmpVector2.SizeSquared()),
			),
			this.TmpVector2.AdditionEqual(this.ActorLocation),
			(this.TmpVector2.Z += this.MoveOffset.Z),
			this.TmpVector1.MultiplyEqual(
				Math.sqrt((a - e) / this.TmpVector1.SizeSquared()),
			),
			this.TmpVector2.Addition(this.TmpVector1, this.TmpVector3),
			this.SelfTransform.InverseTransformPositionNoScale(
				this.TmpVector3,
				this.TmpVector3,
			);
		let h =
			MathUtils_1.MathUtils.Square(
				Math.max(0, Math.abs(this.TmpVector3.Y) - s),
			) +
			MathUtils_1.MathUtils.Square(
				Math.max(0, Math.abs(this.TmpVector3.Z) - r),
			);
		return (
			(this.TmpVector3.Y =
				Math.sign(this.TmpVector3.Y) *
				Math.min(Math.abs(this.TmpVector3.Y), s)),
			(this.TmpVector3.Z =
				Math.sign(this.TmpVector3.Z) *
				Math.min(Math.abs(this.TmpVector3.Z), r)),
			this.TmpVector2.Subtraction(this.TmpVector1, this.TmpVector4),
			this.SelfTransform.InverseTransformPositionNoScale(
				this.TmpVector4,
				this.TmpVector4,
			),
			h >
				(i =
					MathUtils_1.MathUtils.Square(
						Math.max(0, Math.abs(this.TmpVector4.Y) - s),
					) +
					MathUtils_1.MathUtils.Square(
						Math.max(0, Math.abs(this.TmpVector4.Z) - r),
					)) ||
			(Math.abs(h - i) < 0.1 && 0.5 <= Math.random())
				? ((h = i),
					(this.TmpVector4.Y =
						Math.sign(this.TmpVector4.Y) *
						Math.min(Math.abs(this.TmpVector4.Y), s)),
					(this.TmpVector4.Z =
						Math.sign(this.TmpVector4.Z) *
						Math.min(Math.abs(this.TmpVector4.Z), r)),
					this.SelfTransform.InverseTransformPositionNoScale(
						this.TmpVector4,
						this.TmpResultLocation,
					))
				: ((this.TmpVector3.Y =
						Math.sign(this.TmpVector3.Y) *
						Math.min(Math.abs(this.TmpVector3.Y), s)),
					(this.TmpVector3.Z =
						Math.sign(this.TmpVector3.Z) *
						Math.min(Math.abs(this.TmpVector3.Z), r)),
					this.SelfTransform.InverseTransformPositionNoScale(
						this.TmpVector3,
						this.TmpResultLocation,
					)),
			[this.TmpResultLocation, this.NormalRotator, h]
		);
	}
}
exports.default = TsSimpleInteractPlane;
