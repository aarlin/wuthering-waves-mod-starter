"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MarkBookPrevComponent = exports.MarkBookNextComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class MarkBookNextComponent extends HotKeyComponent_1.HotKeyComponent {
	OnPress() {
		UiNavigationNewController_1.UiNavigationNewController.BookMarkNavigation(
			4,
			this.GetBindButtonTag(),
		);
	}
	OnRefreshSelfHotKeyState(t) {
		var e = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(e) ||
			((t = t.GetActiveListenerByTag(e)),
			(e =
				UiNavigationNewController_1.UiNavigationNewController.GetMarkBookActiveListenerList(
					t?.GetNavigationGroup(),
				)),
			this.SetVisibleMode(2, 1 < e.length));
	}
}
exports.MarkBookNextComponent = MarkBookNextComponent;
class MarkBookPrevComponent extends HotKeyComponent_1.HotKeyComponent {
	OnPress() {
		UiNavigationNewController_1.UiNavigationNewController.BookMarkNavigation(
			3,
			this.GetBindButtonTag(),
		);
	}
	OnRefreshSelfHotKeyState(t) {
		var e = this.GetBindButtonTag();
		StringUtils_1.StringUtils.IsEmpty(e) ||
			((t = t.GetActiveListenerByTag(e)),
			(e =
				UiNavigationNewController_1.UiNavigationNewController.GetMarkBookActiveListenerList(
					t?.GetNavigationGroup(),
				)),
			this.SetVisibleMode(2, 1 < e.length));
	}
}
exports.MarkBookPrevComponent = MarkBookPrevComponent;
