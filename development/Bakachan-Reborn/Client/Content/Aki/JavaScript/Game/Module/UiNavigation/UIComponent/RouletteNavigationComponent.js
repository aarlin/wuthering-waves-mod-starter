"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteNavigationComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class RouletteNavigationComponent extends HotKeyComponent_1.HotKeyComponent {
	constructor() {
		super(...arguments), (this.FPo = void 0), (this.Pbo = !1);
	}
	OnPress() {
		(this.FPo =
			UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener()),
			(this.Pbo =
				UiNavigationNewController_1.UiNavigationNewController.Interact(!0));
	}
	OnRelease(o) {
		var e =
				UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener(),
			t = UiNavigationNewController_1.UiNavigationNewController.Interact(!1);
		this.FPo === e &&
			this.Pbo &&
			t &&
			UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroup(
				5,
			);
	}
	OnRefreshSelfHotKeyState(o) {
		void 0 !== (o = o.GetFocusListener()) && "Group1" === o.GroupName
			? this.SetVisibleMode(2, !0)
			: this.SetVisibleMode(2, !1);
	}
}
exports.RouletteNavigationComponent = RouletteNavigationComponent;
