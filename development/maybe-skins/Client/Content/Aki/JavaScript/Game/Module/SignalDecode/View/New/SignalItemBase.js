"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalItemBase = void 0);
const UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction");
class SignalItemBase extends UiComponentsAction_1.UiComponentsAction {
	constructor(t, e, i) {
		super(),
			(this.Type = 0),
			(this.GameplayType = 2),
			(this.Width = 0),
			(this.DecisionShowSize = 36),
			(this.CurrentRelativeX = 0),
			(this.StartDecisionSize = 0),
			(this.EndDecisionSize = 0),
			(this.IsCatchBtnDown = !1),
			(this.RelativeXWhenCatchDown = 0),
			(this.RelativeXWhenCatchUp = 0),
			(this.Type = t),
			(this.StartDecisionSize = e),
			(this.EndDecisionSize = i);
	}
	Reset() {
		(this.CurrentRelativeX = 0), this.OnReset();
	}
	InitByGameplayType(t) {
		this.GameplayType = t;
	}
	Update(t) {
		(this.CurrentRelativeX = t), this.OnUpdate();
	}
	GetProgress() {
		return 0;
	}
	OnCatchBtnDown() {
		(this.IsCatchBtnDown = !0),
			(this.RelativeXWhenCatchDown = this.CurrentRelativeX);
	}
	OnCatchBtnUp() {
		(this.IsCatchBtnDown = !1),
			(this.RelativeXWhenCatchUp = this.CurrentRelativeX);
	}
	OnReset() {}
	OnUpdate() {}
	TestCanBtnDown() {
		return !1;
	}
	TestCanBtnUp() {
		return !1;
	}
}
exports.SignalItemBase = SignalItemBase;
