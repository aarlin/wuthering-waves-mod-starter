"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	PostProcessTriggerStateBase_1 = require("./PostProcessTriggerStateBase");
class PostProcessTriggerStateInside extends PostProcessTriggerStateBase_1.default {
	constructor() {
		super(...arguments), (this.Olr = 0), (this.klr = !1), (this.j3 = -0);
	}
	OnEnter(t) {
		var e = this.GetTargetDefaultValue();
		(this.Owner.GetPostProcessComponent().BlendWeight = e),
			(this.Olr = e),
			(this.klr = !1),
			(this.j3 = 0);
	}
	OnUpdate(t) {
		var e = this.GetTargetDefaultValue();
		this.klr
			? ((this.j3 += t / 1e3),
				(t = MathUtils_1.MathUtils.Clamp(
					this.j3 / this.Owner.TransitionTime,
					0,
					1,
				)),
				(this.Owner.GetPostProcessComponent().BlendWeight =
					MathUtils_1.MathUtils.Lerp(this.Olr, e, t)),
				1 <= t && ((this.klr = !1), (this.j3 = 0), (this.Olr = e)))
			: this.Olr !== e && ((this.klr = !0), (this.j3 = 0));
	}
}
exports.default = PostProcessTriggerStateInside;
