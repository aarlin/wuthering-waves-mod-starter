"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TextInputComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class TextInputComponent extends HotKeyComponent_1.HotKeyComponent {
	OnPress(t) {
		UiNavigationNewController_1.UiNavigationNewController.ActiveTextInput(
			t.BindButtonTag,
		);
	}
	OnRefreshSelfHotKeyState(t) {
		var e = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(e) ||
			((t = t.GetActiveListenerByTag(e)),
			this.SetVisibleMode(2, t?.IsListenerActive() ?? !1));
	}
}
exports.TextInputComponent = TextInputComponent;
