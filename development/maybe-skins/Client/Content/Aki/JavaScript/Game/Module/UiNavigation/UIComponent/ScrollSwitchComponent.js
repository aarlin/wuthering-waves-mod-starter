"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScrollSwitchComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent"),
	THRESHOLD = 0.6;
class ScrollSwitchComponent extends HotKeyComponent_1.HotKeyComponent {
	constructor() {
		super(...arguments), (this.xbo = !1);
	}
	OnPress(o) {
		UiNavigationNewController_1.UiNavigationNewController.FindScrollbar(!0);
	}
	OnInputAxis(o, e) {
		this.xbo
			? 0 === e && (this.xbo = !1)
			: Math.abs(e) <= 0.6 ||
				(UiNavigationNewController_1.UiNavigationNewController.FindScrollbar(
					e < 0,
				),
				(this.xbo = !0));
	}
	OnRefreshSelfHotKeyState(o) {
		(o = o.GetScrollbarData()),
			this.SetVisibleMode(2, o.HasActiveScrollbarList());
	}
}
exports.ScrollSwitchComponent = ScrollSwitchComponent;
