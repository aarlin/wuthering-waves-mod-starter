"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableCastToOutletState = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableCastToOutletState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
	constructor(t, e) {
		super(t, e), (this.F7o = void 0), (this.StateType = "BeCastingToOutlet");
	}
	SetTarget(t) {
		this.F7o = t;
	}
	SetEnterCallback(t) {
		this.EnterCallback = t;
	}
	OnEnter() {
		this.F7o?.Valid
			? (super.OnEnter(),
				(this.SceneItem.IsCanBeHeld = !1),
				(this.SceneItem.TargetActorComponent = this.F7o.GetComponent(1)),
				(this.SceneItem.TargetOutletComponent = this.F7o.GetComponent(145)),
				this.StartCast(),
				this.CalcDirection())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"SceneItem",
					32,
					"被控物进入CastToTarget时,没有设置目标",
				);
	}
	OnTick(t) {
		this.Timer += t;
		let e = MathUtils_1.MathUtils.Clamp(this.Timer / this.CastDuration, 0, 1);
		return (
			this.SceneItem.CastCurve &&
				(e = this.SceneItem.CastCurve.GetFloatValue(e)),
			this.UpdateLocation(e),
			this.T_e(e),
			this.kxe(),
			!0
		);
	}
	OnExit() {
		super.OnExit(), (this.F7o = void 0), this.SceneItem.StopSequence();
	}
	T_e(t) {
		t = UE.KismetMathLibrary.Ease(0, 1, t, 7);
		var e = this.SceneItem.TargetOutletComponent.GetSocketRotator(
				this.SceneItem.Entity,
			),
			a = Rotator_1.Rotator.Create();
		Rotator_1.Rotator.Lerp(this.StartRot, e, t, a),
			this.SceneItem.ActorComp.SetActorRotation(
				a.ToUeRotator(),
				"[ManipulableCastToOutletState.UpdateRotation]",
				!1,
			);
	}
	kxe() {
		(this.Timer < this.CastDuration && 0 < this.CastDuration) ||
			this.SceneItem.PlayingMatchSequence ||
			(this.SceneItem.MatchSequence
				? ((this.SceneItem.PlayingMatchSequence = !0),
					this.SceneItem.PlayMatchSequence(() => {
						this.enr(), (this.SceneItem.PlayingMatchSequence = !1);
					}, !1))
				: this.enr(),
			this.FinishCallback && this.FinishCallback());
	}
	enr() {
		(this.SceneItem.ActivatedOutlet = this.SceneItem.TargetOutletComponent),
			(this.SceneItem.ActivatedOutlet.EntityInSocket = this.SceneItem);
		var t = this.SceneItem.TargetOutletComponent.Entity;
		this.SceneItem.ShouldPlayMismatchSequence(t)
			? ((this.SceneItem.CastFreeState.NeedResetPhysicsMode = !1),
				(this.SceneItem.CurrentState = this.SceneItem.CastFreeState),
				this.SceneItem?.TryPlayMismatchSequence(t))
			: ((this.SceneItem.CurrentState = this.SceneItem.MatchOutletState),
				this.SceneItem.RequestAttachToOutlet());
	}
}
exports.SceneItemManipulableCastToOutletState =
	SceneItemManipulableCastToOutletState;
