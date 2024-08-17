"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	PostProcessTriggerStateBase_1 = require("./PostProcessTriggerStateBase");
class PostProcessTriggerStateInsideToOutside extends PostProcessTriggerStateBase_1.default {
	constructor() {
		super(...arguments), (this.Timer = -0);
	}
	OnEnter(e) {
		this.Timer = 0;
		var t = this.GetTargetDefaultValue();
		this.Owner.GetPostProcessComponent().BlendWeight = t;
	}
	OnUpdate(e) {
		var t;
		this.Timer > this.Owner.TransitionTime
			? this.StateMachine.Switch(1)
			: ((this.Timer += e / 1e3),
				(e = MathUtils_1.MathUtils.Clamp(
					this.Timer / this.Owner.TransitionTime,
					0,
					1,
				)),
				(t = this.GetTargetDefaultValue()),
				(this.Owner.GetPostProcessComponent().BlendWeight =
					MathUtils_1.MathUtils.Clamp(1 - e, 0, t)));
	}
}
exports.default = PostProcessTriggerStateInsideToOutside;
