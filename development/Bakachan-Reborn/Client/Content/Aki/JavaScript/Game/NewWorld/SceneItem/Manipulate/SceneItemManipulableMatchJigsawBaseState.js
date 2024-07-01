"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableMatchJigsawBaseState = void 0);
const SceneItemManipulableMatchOutletState_1 = require("./SceneItemManipulableMatchOutletState");
class SceneItemManipulableMatchJigsawBaseState extends SceneItemManipulableMatchOutletState_1.SceneItemManipulableMatchOutletState {
	OnEnter() {
		this.SceneItem.TryAddTagById(this.Tnr() ? 741712776 : 1488947861),
			(this.SceneItem.IsCanBeHeld = !0),
			this.OpenPhysicsSplit();
	}
	OnExit() {
		this.SceneItem.TryRemoveTagById(741712776),
			this.SceneItem.TryRemoveTagById(1488947861),
			this.ClosePhysicsSplit();
	}
	Tnr() {
		return this.SceneItem.ActivatedOutlet.GetIsCorrect(
			this.SceneItem.Entity,
			this.SceneItem.PutIndex,
		);
	}
}
exports.SceneItemManipulableMatchJigsawBaseState =
	SceneItemManipulableMatchJigsawBaseState;
