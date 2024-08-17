"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ClickBtnComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnComponent extends HotKeyComponent_1.HotKeyComponent {
	OnPress(e) {
		this.m6i(e.BindButtonTag);
	}
	m6i(e) {
		e === HotKeyViewDefine_1.EXIT_TAG
			? UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView()
			: UiNavigationNewController_1.UiNavigationNewController.ClickButton(e);
	}
	OnRefreshSelfHotKeyState(e) {
		var t = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((e = e.GetActiveListenerByTag(t)),
			this.SetVisibleMode(2, e?.IsListenerActive() ?? !1));
	}
}
exports.ClickBtnComponent = ClickBtnComponent;
