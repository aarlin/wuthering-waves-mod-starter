"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ClickBtnInsideComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnInsideComponent extends HotKeyComponent_1.HotKeyComponent {
	constructor() {
		super(...arguments),
			(this.Q4s = (t) => {
				(this.IsAxisAllDirection() ||
					(2 === t && this.IsAxisReverse()) ||
					(3 === t && this.IsAxisPositive())) &&
					UiNavigationNewController_1.UiNavigationNewController.ClickButtonInside(
						this.GetBindButtonTag(),
					);
			});
	}
	OnPress(t) {
		UiNavigationNewController_1.UiNavigationNewController.ClickButtonInside(
			t.BindButtonTag,
		);
	}
	OnStartInputAxis(t) {
		UiNavigationJoystickInput_1.UiNavigationJoystickInput.RegisterLeftJoystickFunction(
			this.Q4s,
		);
	}
	OnFinishInputAxis(t) {
		UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
			this.Q4s,
		);
	}
	OnRefreshHotKeyText(t) {
		var e = this.GetBindButtonTag();
		if (!StringUtils_1.StringUtils.IsEmpty(e) && (t = t.GetFocusListener())) {
			let i =
				UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
					t,
					e,
				);
			(t = (i = i || t.GetChildListenerByTag(e))?.GetTextChangeComponent()),
				t
					? this.SetHotKeyDescTextForce(t.Text.GetText())
					: this.ResetHotKeyDescTextForce();
		}
	}
	OnRefreshSelfHotKeyState(t) {
		var e = this.GetBindButtonTag();
		if (!StringUtils_1.StringUtils.IsEmpty(e))
			if ((t = t.GetFocusListener())) {
				let i =
					UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
						t,
						e,
					);
				(i = i || t.GetChildListenerByTag(e)),
					this.SetVisibleMode(2, i?.IsListenerActive() ?? !1);
			} else this.SetVisibleMode(2, !1);
	}
}
exports.ClickBtnInsideComponent = ClickBtnInsideComponent;
