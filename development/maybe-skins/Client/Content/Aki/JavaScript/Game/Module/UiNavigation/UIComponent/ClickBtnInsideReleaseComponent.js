"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ClickBtnInsideReleaseComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnInsideReleaseComponent extends HotKeyComponent_1.HotKeyComponent {
	OnRelease(e) {
		UiNavigationNewController_1.UiNavigationNewController.ClickButtonInside(
			e.BindButtonTag,
		);
	}
	OnRefreshSelfHotKeyState(e) {
		var t = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = e.GetFocusListener())
				? ((e = e.GetChildListenerByTag(t)),
					this.SetVisibleMode(2, e?.IsListenerActive() ?? !1))
				: this.SetVisibleMode(2, !1));
	}
}
exports.ClickBtnInsideReleaseComponent = ClickBtnInsideReleaseComponent;
