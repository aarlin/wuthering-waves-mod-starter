"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableResetState = void 0);
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableResetState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
	constructor(e) {
		super(e), (this.StateType = "Reset");
	}
	OnEnter() {
		super.OnEnter(),
			this.SceneItem.TryAddTagById(-293539602),
			FNameUtil_1.FNameUtil.IsNothing(
				this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设,
			) ||
				this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
					this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设,
				),
			this.OpenPhysicsSplit(),
			(this.PropComp.IsMoving = !1),
			this.SceneItem.FinishCheckInitAttach &&
				this.SceneItem.EnableDynamicAttach &&
				this.SceneItem.TryReqAttachToFloor();
	}
	OnExit() {
		super.OnExit(),
			this.SceneItem.TryRemoveTagById(-293539602),
			this.ClosePhysicsSplit(),
			(this.PropComp.IsMoving = !0);
	}
}
exports.SceneItemManipulableResetState = SceneItemManipulableResetState;
