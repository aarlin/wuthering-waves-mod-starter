"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FloatLineFloatTips = void 0);
const UE = require("ue"),
	GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class FloatLineFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
	constructor() {
		super(...arguments), (this.Q$t = void 0), (this.X$t = void 0);
	}
	OnStart() {
		var t;
		super.OnStart(),
			(this.Q$t = this.MainText.GetOwner().GetComponentByClass(
				UE.UIEffectTextAnimation.StaticClass(),
			)),
			(this.X$t = this.ExtraText.GetOwner().GetComponentByClass(
				UE.LGUIPlayTweenComponent.StaticClass(),
			)),
			this.Q$t?.SetSelectorOffset(1),
			this.X$t &&
				((t = 0.5 * this.TickDuration),
				(t =
					this.X$t.GetPlayTween().duration > t
						? t
						: this.X$t.GetPlayTween().duration),
				(this.X$t.GetPlayTween().duration = t),
				this.X$t?.Play());
	}
}
exports.FloatLineFloatTips = FloatLineFloatTips;
