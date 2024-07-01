"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TsUiNavigationTextChangeListener = void 0);
const UE = require("ue"),
	GlobalData_1 = require("../../../GlobalData");
class TsUiNavigationTextChangeListener extends UE.UINavigationTextChangeListener {
	constructor() {
		super(...arguments), (this.Listener = void 0), (this.Text = void 0);
	}
	AwakeBP() {
		GlobalData_1.GlobalData.GameInstance &&
			(this.Listener = this.GetOwner().GetComponentByClass(
				UE.TsUiNavigationBehaviorListener_C.StaticClass(),
			));
	}
	StartBP() {
		GlobalData_1.GlobalData.GameInstance && this.NotifyDefaultText();
	}
	OnNotifyTextChangeBP(t) {
		GlobalData_1.GlobalData.GameInstance &&
			this.Listener &&
			this.Listener.NotifyTextChangeByComponent(t);
	}
	NotifyDefaultText() {
		this.Listener &&
			this.TextActor &&
			((this.Text = this.TextActor.GetComponentByClass(
				UE.UIText.StaticClass(),
			)),
			this.Text) &&
			this.Listener.NotifyTextChangeByComponent(this.Text.GetText());
	}
}
(exports.TsUiNavigationTextChangeListener = TsUiNavigationTextChangeListener),
	(exports.default = TsUiNavigationTextChangeListener);
