"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneItemManipulableDropState = void 0);
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController"),
	SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableDropState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
	constructor(e) {
		super(e), (this.StateType = "BeDropping");
	}
	SetEnterCallback(e) {
		this.EnterCallback = e;
	}
	OnEnter() {
		this.SceneItem.ActorComp.PhysicsMode = 3;
		var e = this.SceneItem.ActorComp.GetPrimitiveComponent(),
			t = Vector_1.Vector.Create(e.GetPhysicsLinearVelocity());
		(t.X *= 0.1),
			(t.Y *= 0.1),
			e.SetPhysicsLinearVelocity(t.ToUeVector()),
			(this.SceneItem.NeedRemoveControllerId = !0),
			LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(
				this.SceneItem.Entity.Id,
				!0,
			),
			FNameUtil_1.FNameUtil.IsNothing(
				this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设,
			) ||
				this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(
					this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设,
				),
			this.EnterCallback && this.EnterCallback();
	}
}
exports.SceneItemManipulableDropState = SceneItemManipulableDropState;
