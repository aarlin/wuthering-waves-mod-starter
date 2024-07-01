"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableBaseState = void 0);
const UE = require("ue"),
	Global_1 = require("../../../Global");
class SceneItemManipulableBaseState {
	constructor(t) {
		(this.SceneItem = void 0),
			(this.PropComp = void 0),
			(this.xrr = void 0),
			(this.StateType = "Reset"),
			(this.EnterCallback = void 0),
			(this.ExitCallback = void 0),
			(this.Timer = 0),
			(this.UeActorComp = void 0),
			(this.SceneItem = t),
			(this.PropComp = t.PropComp),
			(this.UeActorComp = t.ActorComp?.Owner?.GetComponentByClass(
				UE.ActorComponent.StaticClass(),
			));
	}
	Enter() {
		(this.SceneItem.State = this.StateType), this.OnEnter();
	}
	OnEnter() {}
	Tick(t) {
		return this.OnTick(t);
	}
	OnTick(t) {
		return !0;
	}
	Exit() {
		this.OnExit();
	}
	OnExit() {}
	End() {}
	StartCameraShake(t) {
		var e = Global_1.Global.CharacterCameraManager;
		e?.IsValid() && t?.IsValid() && (this.xrr = e.StartMatineeCameraShake(t));
	}
	StopCameraShake() {
		var t = Global_1.Global.CharacterCameraManager;
		t?.IsValid() && this.xrr?.IsValid() && t.StopCameraShake(this.xrr);
	}
	OpenPhysicsSplit() {
		this.UeActorComp?.IsValid() &&
			(this.UeActorComp.bEnableAutoPhysicsSplit = !0);
	}
	ClosePhysicsSplit() {
		this.UeActorComp?.IsValid() &&
			((this.UeActorComp.bEnableAutoPhysicsSplit = !1),
			this.UeActorComp.KuroCreatePhysicsState());
	}
}
exports.SceneItemManipulableBaseState = SceneItemManipulableBaseState;
