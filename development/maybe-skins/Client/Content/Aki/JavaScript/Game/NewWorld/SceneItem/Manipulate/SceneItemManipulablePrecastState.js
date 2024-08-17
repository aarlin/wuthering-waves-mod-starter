"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulablePrecastState = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	Global_1 = require("../../../Global"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulablePrecastState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
	constructor(e) {
		super(e),
			(this.nCt = 0),
			(this.Rnr = ""),
			(this.Unr = void 0),
			(this.Anr = Vector_1.Vector.Create()),
			(this.StateType = "BePrecasting");
	}
	SetDirection(e) {
		this.nCt = e;
	}
	OnEnter() {
		this.Rnr =
			ConfigManager_1.ConfigManager.ManipulateConfig.ManipulatePrecastLines[
				this.nCt
			];
	}
	OnTick(e) {
		this.Timer += 1e3 * e;
		e = ConfigManager_1.ConfigManager.ManipulateConfig.GetPrecastLineValue(
			this.Rnr,
			this.Timer / ConfigManager_1.ConfigManager.ManipulateConfig.PrecastTime,
		);
		var t = Vector_1.Vector.Create(),
			r = Vector_1.Vector.Create(),
			a = this.soi();
		return (
			this.Pnr(),
			this.Unr.Multiply(e.X, t),
			this.Anr.Multiply(e.Z, r),
			r.AdditionEqual(t),
			r.AdditionEqual(a),
			this.SceneItem.ActorComp.SetActorLocation(r.ToUeVector()),
			!0
		);
	}
	soi() {
		var e =
				Global_1.Global.BaseCharacter.CharacterActorComponent.ActorTransform,
			t = this.SceneItem.UsingAssistantHoldOffset
				? this.SceneItem.ConfigAssistantHoldOffset
				: this.SceneItem.ConfigHoldOffset;
		e = e.TransformPositionNoScale(t);
		return Vector_1.Vector.Create(e);
	}
	Pnr() {
		var e = Vector_1.Vector.Create();
		(this.Unr =
			Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorForwardProxy),
			this.Unr.CrossProduct(Vector_1.Vector.UpVectorProxy, e),
			e.CrossProduct(this.Unr, this.Anr),
			this.Anr.Normalize();
	}
}
exports.SceneItemManipulablePrecastState = SceneItemManipulablePrecastState;
