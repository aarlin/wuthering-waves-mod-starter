"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineStateBoneVisible = void 0);
const UE = require("ue"),
	AiStateMachine_1 = require("../AiStateMachine"),
	AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateBoneVisible extends AiStateMachineState_1.AiStateMachineState {
	constructor() {
		super(...arguments), (this.Ene = void 0), (this.yne = !1);
	}
	OnInit(e) {
		return (
			(this.Ene = new UE.FName(e.BindBoneVisible.BoneName)),
			(this.yne = e.BindBoneVisible.Visible),
			!0
		);
	}
	OnActivate() {
		this.Node.AnimationComponent.HideBone(this.Ene, !this.yne, !1);
	}
	OnDeactivate() {
		this.Node.AnimationComponent.HideBone(this.Ene, this.yne, !1);
	}
	ToString(e, t = 0) {
		(0, AiStateMachine_1.appendDepthSpace)(e, t);
	}
}
exports.AiStateMachineStateBoneVisible = AiStateMachineStateBoneVisible;
