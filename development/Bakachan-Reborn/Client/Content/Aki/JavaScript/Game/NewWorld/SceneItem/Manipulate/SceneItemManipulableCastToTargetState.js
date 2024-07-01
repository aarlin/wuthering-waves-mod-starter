"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableCastToTargetState = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableCastToTargetState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
	constructor(t, e) {
		super(t, e),
			(this.F7o = void 0),
			(this.tnr = Vector_1.Vector.Create()),
			(this.StateType = "BeCastingToTarget");
	}
	SetTarget(t) {
		this.F7o = t;
	}
	SetEnterCallback(t) {
		this.EnterCallback = t;
	}
	OnEnter() {
		var t;
		this.F7o?.Valid
			? (super.OnEnter(),
				(this.SceneItem.IsCanBeHeld = !1),
				(t = this.F7o.GetComponent(1)),
				(this.SceneItem.TargetActorComponent = t),
				(this.SceneItem.TargetOutletComponent = void 0),
				this.StartCast(),
				this.CalcDirection(),
				this.EnterCallback && this.EnterCallback())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"SceneItem",
					32,
					"被控物没有进入CastToTarget时,没有设置目标",
				);
	}
	OnTick(t) {
		this.Timer += t;
		let e = MathUtils_1.MathUtils.Clamp(this.Timer / this.CastDuration, 0, 1);
		return (
			this.SceneItem.CastCurve &&
				(e = this.SceneItem.CastCurve.GetFloatValue(e)),
			this.tnr.DeepCopy(this.SceneItem.ActorComp.ActorLocation),
			this.UpdateLocation(e),
			this.UpdateRotation(),
			this.UpdateRotationAccordingToVelocity(),
			this.kxe(),
			!0
		);
	}
	OnExit() {
		super.OnExit(), (this.F7o = void 0);
	}
	UpdateRotation() {
		let t = 0;
		var e =
			(t =
				(e = this.SceneItem.Config.ThrowCfg.MotionConfig).Type ===
				IComponent_1.EThrowMotion.Projectile
					? e.AngularVelocity
					: t) * this.Timer;
		e = UE.KismetMathLibrary.RotatorFromAxisAndAngle(
			this.CastRotAxis.ToUeVector(),
			e,
		);
		this.SceneItem.ActorComp.SetActorRotation(
			e,
			"[SceneItemManipulableCastToTargetState.UpdateLocation]",
			void 0 !== this.HitCallback,
		);
	}
	UpdateRotationAccordingToVelocity() {
		var t;
		this.SceneItem.ManipulateBaseConfig.随速度调整朝向 &&
			!this.AfterHit &&
			((t = Vector_1.Vector.Create()),
			this.SceneItem.ActorComp.ActorLocationProxy.Subtraction(this.tnr, t),
			t.Normalize(),
			(t = UE.KismetMathLibrary.FindLookAtRotation(
				this.SceneItem.ActorComp.ActorLocation,
				this.SceneItem.ActorComp.ActorLocation.op_Addition(t.ToUeVector()),
			)),
			this.SceneItem.ActorComp.SetActorRotation(
				t,
				"[ManipulableCastState.UpdateRotationAccordingToVelocity]",
				!1,
			));
	}
	kxe() {
		var t;
		this.Timer >= this.CastDuration &&
			0 < this.CastDuration &&
			((this.SceneItem.ActorComp.PhysicsMode = 3),
			(t = Vector_1.Vector.Create(
				this.SceneItem.ActorComp.ActorLocation,
			)).SubtractionEqual(this.tnr),
			t.Normalize(),
			t.MultiplyEqual(this.SceneItem.Config.ThrowCfg.MotionConfig.Velocity),
			this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(
				t.ToUeVector(),
			),
			(this.SceneItem.CurrentState = this.SceneItem.ResetState));
	}
}
exports.SceneItemManipulableCastToTargetState =
	SceneItemManipulableCastToTargetState;
