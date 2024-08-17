"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
	TsSimpleInteractBase_1 = require("./TsSimpleInteractBase"),
	redColor = new UE.LinearColor(1, 0, 0, 1),
	blueColor = new UE.LinearColor(0, 0, 1, 1),
	DRAW_TIME = 0.05,
	DEFAULT_THICKNESS = 4,
	DEFAULT_ARROW_SIZE = 20,
	DRAW_LENGTH = 100,
	forwardOffset = new UE.Vector(100, 0, 0),
	upOffset = new UE.Vector(0, 0, 100),
	textColor = new UE.Color(255, 128, 128, 255),
	TEXT_SIZE = 80,
	PROFILE_KEY = "TsSimpleInteractPoint_GetBestTransform";
class TsSimpleInteractPoint extends TsSimpleInteractBase_1.default {
	constructor() {
		super(...arguments),
			(this.OnWall = !0),
			(this.OutRotator = void 0),
			(this.TmpLocation = void 0);
	}
	OnBeginPlay() {
		(this.OutRotator = Rotator_1.Rotator.Create()),
			(this.TmpLocation = Vector_1.Vector.Create()),
			super.OnBeginPlay();
	}
	CheckLegal() {
		return !0;
	}
	OnDraw() {
		var t = this.K2_GetActorLocation(),
			o = this.GetTransform();
		this.OnWall
			? UE.KismetSystemLibrary.DrawDebugArrow(
					this,
					t,
					o.TransformPosition(forwardOffset),
					20,
					redColor,
					0.05,
					4,
				)
			: UE.KismetSystemLibrary.DrawDebugArrow(
					this,
					t,
					o.TransformPosition(upOffset),
					20,
					blueColor,
					0.05,
					4,
				);
	}
	SetText(t) {
		(this.Text.HorizontalAlignment = 1),
			this.Text.SetWorldSize(80),
			this.Text.SetTextRenderColor(textColor),
			(this.Text.Text = "Point " + this.TypeId);
	}
	OnGetBestTransform(t, o, e, r) {
		return (
			this.UpdateData(),
			this.ActorLocation.FromUeVector(t.K2_GetActorLocation()),
			this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor),
			(this.OnWall &&
				MathUtils_1.MathUtils.DotProduct(
					this.SelfToActor,
					this.GetActorForwardVector(),
				) > r) ||
				(this.OnWall
					? ((this.TmpVector1.X = r),
						(this.TmpVector1.Y = 0),
						(this.TmpVector1.Z = 0))
					: ((this.TmpVector1.X = 0),
						(this.TmpVector1.Y = 0),
						(this.TmpVector1.Z = e)),
				this.SelfTransform.TransformPosition(this.TmpVector1, this.TmpLocation),
				(this.TmpResult.Location = this.TmpLocation.ToUeVector()),
				this.OnWall
					? (((r = this.LineTrace).WorldContextObject = t),
						TraceElementCommon_1.TraceElementCommon.SetStartLocation(
							r,
							this.ActorLocation,
						),
						TraceElementCommon_1.TraceElementCommon.SetEndLocation(
							r,
							this.TmpResult.Location,
						),
						(this.TmpResult.Success =
							!TraceElementCommon_1.TraceElementCommon.LineTrace(
								r,
								PROFILE_KEY,
							)),
						(r.WorldContextObject = void 0),
						this.TmpResult.Success &&
							(this.MoveOffset.FromUeVector(o),
							this.SelfLocation.Subtraction(
								this.ActorLocation,
								this.TmpVector1,
							),
							(this.TmpResult.SquaredOffsetLength =
								MathUtils_1.MathUtils.Square(
									this.SelfToActor.Size2D() - this.MoveOffset.Size2D(),
								) +
								MathUtils_1.MathUtils.Square(
									this.SelfToActor.Z + this.MoveOffset.Z,
								)),
							(e = this.SelfTransform.GetRotation()).RotateVector(
								Vector_1.Vector.ForwardVectorProxy,
								this.TmpVector1,
							),
							e.RotateVector(Vector_1.Vector.UpVectorProxy, this.TmpVector2),
							this.TmpVector1.UnaryNegation(this.TmpVector1),
							MathUtils_1.MathUtils.LookRotationForwardFirst(
								this.TmpVector1,
								this.TmpVector2,
								this.OutRotator,
							),
							(this.TmpResult.Rotator = this.OutRotator.ToUeRotator())))
					: ((this.TmpResult.Success = !0),
						this.MoveOffset.FromUeVector(o),
						this.SelfLocation.Subtraction(this.ActorLocation, this.TmpVector1),
						(this.TmpResult.SquaredOffsetLength =
							MathUtils_1.MathUtils.Square(
								this.SelfToActor.Size2D() - this.MoveOffset.Size2D(),
							) +
							MathUtils_1.MathUtils.Square(
								this.SelfToActor.Z + this.MoveOffset.Z,
							)),
						this.SelfTransform.GetRotation().RotateVector(
							Vector_1.Vector.UpVectorProxy,
							this.TmpVector2,
						),
						MathUtils_1.MathUtils.LookRotationForwardFirst(
							this.TmpVector1,
							this.TmpVector2,
							this.OutRotator,
						),
						(this.TmpResult.Rotator = this.OutRotator.ToUeRotator()))),
			this.TmpResult
		);
	}
}
exports.default = TsSimpleInteractPoint;
