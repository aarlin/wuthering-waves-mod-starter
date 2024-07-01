"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableChantState = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableChantState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
	constructor(e, t, n) {
		super(e),
			(this.M$i = void 0),
			(this.inr = void 0),
			(this.M$i = t),
			(this.inr = n),
			(this.StateType = "Reset");
	}
	OnEnter() {
		this.StartCameraShake(this.M$i),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.AddSubCameraTag,
				this.inr,
			),
			(this.SceneItem.NeedRemoveControllerId = !0);
	}
	OnExit() {
		this.StopCameraShake(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RemoveSubCameraTag,
				this.inr,
			);
	}
}
exports.SceneItemManipulableChantState = SceneItemManipulableChantState;
