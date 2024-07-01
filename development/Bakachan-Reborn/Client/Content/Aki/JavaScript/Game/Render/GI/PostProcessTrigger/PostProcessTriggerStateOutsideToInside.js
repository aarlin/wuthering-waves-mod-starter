"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	PostProcessTriggerStateBase_1 = require("./PostProcessTriggerStateBase");
class PostProcessTriggerStateOutsideToInside extends PostProcessTriggerStateBase_1.default {
	constructor() {
		super(...arguments), (this.Timer = -0);
	}
	OnEnter(e) {
		(this.Timer = 0), (this.Owner.GetPostProcessComponent().BlendWeight = 0);
	}
	OnUpdate(e) {
		this.Timer > this.Owner.TransitionTime
			? this.StateMachine.Switch(0)
			: ((this.Timer += e / 1e3),
				(e = MathUtils_1.MathUtils.Clamp(
					this.Timer / this.Owner.TransitionTime,
					0,
					this.GetTargetDefaultValue(),
				)),
				(this.Owner.GetPostProcessComponent().BlendWeight = e));
	}
}
exports.default = PostProcessTriggerStateOutsideToInside;
