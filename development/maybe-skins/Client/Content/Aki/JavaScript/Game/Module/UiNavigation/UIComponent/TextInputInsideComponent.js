"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TextInputInsideComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class TextInputInsideComponent extends HotKeyComponent_1.HotKeyComponent {
	OnPress(e) {
		UiNavigationNewController_1.UiNavigationNewController.ActiveTextInputInside(
			e.BindButtonTag,
		);
	}
	OnRefreshSelfHotKeyState(e) {
		var t = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = e.GetFocusListener()) &&
			(e =
				UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
					e,
					t,
				))
				? this.SetVisibleMode(2, e?.IsListenerActive() ?? !1)
				: this.SetVisibleMode(2, !1));
	}
}
exports.TextInputInsideComponent = TextInputInsideComponent;
