"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableCastFreeState = void 0);
const UE = require("ue"),
	IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
	SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableCastFreeState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
	constructor(e, t) {
		super(e, t),
			(this.jrr = new UE.Vector()),
			(this.StateType = "BeCastingFree");
	}
	SetForward(e) {
		this.jrr = e;
	}
	OnEnter() {
		super.OnEnter();
		let e = 1,
			t = 0;
		var n =
				((n = this.SceneItem.Config.ThrowCfg.MotionConfig).Type ===
					IComponent_1.EThrowMotion.Projectile &&
					((e = n.Velocity), (t = n.AngularVelocity)),
				(this.SceneItem.IsCanBeHeld = !1),
				this.NeedResetPhysicsMode && (this.SceneItem.ActorComp.PhysicsMode = 3),
				UE.KismetMathLibrary.RandomUnitVector()),
			i = this.SceneItem.ActorComp.GetPrimitiveComponent();
		i.SetPhysicsLinearVelocity(this.jrr.op_Multiply(e)),
			i.SetPhysicsAngularVelocityInDegrees(n.op_Multiply(t)),
			(this.SceneItem.TargetActorComponent = void 0),
			(this.SceneItem.TargetOutletComponent = void 0),
			this.EnterCallback && this.EnterCallback();
	}
	OnTick(e) {
		return this.UpdateRotationAccordingToVelocity(), !0;
	}
}
exports.SceneItemManipulableCastFreeState = SceneItemManipulableCastFreeState;
