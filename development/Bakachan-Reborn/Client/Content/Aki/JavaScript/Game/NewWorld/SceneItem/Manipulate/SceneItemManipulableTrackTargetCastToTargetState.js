"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableTrackTargetCastToTargetState = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	CameraController_1 = require("../../../Camera/CameraController"),
	SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableTrackTargetCastToTargetState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
	constructor(t, e) {
		super(t, e),
			(this.jAo = void 0),
			(this.Xii = void 0),
			(this.$ii = void 0),
			(this.unt = void 0),
			(this.Onr = void 0),
			(this.knr = void 0),
			(this.Fnr = void 0),
			(this.$rr = void 0),
			(this.StateType = "BeCastingToTarget");
	}
	SetTargetActorWithPart(t, e) {
		(this.jAo = t),
			void 0 !== e &&
				((this.Xii = t?.Actor.Mesh), (this.$ii = e.PartSocketName));
	}
	OnEnter() {
		var t, e;
		super.OnEnter(),
			this.jAo &&
				((t = this.SceneItem.Config.ThrowCfg.MotionConfig),
				(this.unt = t.Velocity),
				StringUtils_1.StringUtils.IsEmpty(t.VelocityCurve) ||
					ResourceSystem_1.ResourceSystem.LoadAsync(
						t.VelocityCurve,
						UE.CurveFloat,
						(t) => {
							this.Onr = t;
						},
					),
				(this.knr = t.AngularVelocity),
				StringUtils_1.StringUtils.IsEmpty(t.AngularVelocityCurve) ||
					ResourceSystem_1.ResourceSystem.LoadAsync(
						t.AngularVelocityCurve,
						UE.CurveFloat,
						(t) => {
							this.Fnr = t;
						},
					),
				(this.$rr = Vector_1.Vector.Create()),
				(void 0 !== t.VelocityOffset
					? ((t = Rotator_1.Rotator.Create(
							t.VelocityOffset.Y ?? 0,
							t.VelocityOffset.Z ?? 0,
							t.VelocityOffset.X ?? 0,
						)),
						(e = Rotator_1.Rotator.Create(
							CameraController_1.CameraController.CameraRotator,
						)),
						MathUtils_1.MathUtils.ComposeRotator(e, t, e),
						e)
					: CameraController_1.CameraController.CameraRotator
				).Vector(this.$rr),
				this.$rr.Normalize());
	}
	OnTick(t) {
		super.OnTick(t), (this.Timer += t);
		let e = this.knr,
			r =
				(this.Fnr?.IsValid && (e *= this.Fnr.GetFloatValue(this.Timer)),
				this.unt);
		this.Onr?.IsValid && (r *= this.Onr.GetFloatValue(this.Timer)),
			this.$rr.Normalize();
		var o = Vector_1.Vector.Create(),
			i =
				(void 0 !== this.$ii
					? o.DeepCopy(this.Xii.GetSocketLocation(this.$ii))
					: o.DeepCopy(this.jAo.ActorLocationProxy),
				Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocationProxy)),
			a =
				((o = Vector_1.Vector.Create(o)).SubtractionEqual(i),
				o.Normalize(),
				Vector_1.Vector.DotProduct(this.$rr, o)),
			s =
				((a = Math.acos(a) * MathCommon_1.MathCommon.RadToDeg),
				(a = MathUtils_1.MathUtils.Clamp(a, -e * t, e * t)),
				Vector_1.Vector.Create());
		Vector_1.Vector.CrossProduct(this.$rr, o, s),
			this.$rr.RotateAngleAxis(a, s, this.$rr),
			(o = Vector_1.Vector.Create(i));
		return (
			(a = Vector_1.Vector.Create(this.$rr)).MultiplyEqual(r * t),
			o.AdditionEqual(a),
			this.SceneItem.ActorComp.SetActorLocation(o.ToUeVector()),
			this.SceneItem.ManipulateBaseConfig.随速度调整朝向 &&
				!this.AfterHit &&
				((s = UE.KismetMathLibrary.FindLookAtRotation(
					this.SceneItem.ActorComp.ActorLocation,
					this.SceneItem.ActorComp.ActorLocation.op_Addition(
						this.$rr.ToUeVector(),
					),
				)),
				this.SceneItem.ActorComp.SetActorRotation(
					s,
					"[ManipulableCastState.UpdateRotationAccordingToVelocity]",
					!1,
				)),
			!0
		);
	}
}
exports.SceneItemManipulableTrackTargetCastToTargetState =
	SceneItemManipulableTrackTargetCastToTargetState;
