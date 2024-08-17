"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateBoneCollision = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateBoneCollision extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments),
			(this.BoneName = ""),
			(this.IsBlockPawn = !1),
			(this.IsBulletDetect = !1),
			(this.IsBlockCamera = !1),
			(this.IsBlockPawnOnExit = !1),
			(this.IsBulletDetectOnExit = !1),
			(this.IsBlockCameraOnExit = !1);
	}
	OnInit(t) {
		return (
			(this.BoneName = t.BindBoneCollision.BoneName),
			(this.IsBlockPawn = t.BindBoneCollision.IsBlockPawn),
			(this.IsBulletDetect = t.BindBoneCollision.IsBulletDetect),
			(this.IsBlockCamera = t.BindBoneCollision.IsBlockCamera),
			(this.IsBlockPawnOnExit = t.BindBoneCollision.IsBlockPawnOnExit),
			(this.IsBulletDetectOnExit = t.BindBoneCollision.IsBulletDetectOnExit),
			(this.IsBlockCameraOnExit = t.BindBoneCollision.IsBlockCameraOnExit),
			!0
		);
	}
	OnActivate() {
		this.Node.ActorComponent.SetPartCollisionSwitch(
			this.BoneName,
			this.IsBlockPawn,
			this.IsBulletDetect,
			this.IsBlockCamera,
		);
	}
	OnDeactivate() {
		this.Node.ActorComponent.SetPartCollisionSwitch(
			this.BoneName,
			this.IsBlockPawnOnExit,
			this.IsBulletDetectOnExit,
			this.IsBlockCameraOnExit,
		);
	}
	ToString(t, e = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(t, e);
	}
}
exports.AiStateMachineStateBoneCollision = AiStateMachineStateBoneCollision;
