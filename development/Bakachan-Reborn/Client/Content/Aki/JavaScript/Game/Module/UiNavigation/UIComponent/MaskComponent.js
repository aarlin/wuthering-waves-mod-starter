"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MaskComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class MaskComponent extends HotKeyComponent_1.HotKeyComponent {
	OnPress(e) {
		var o = this.RootItem.GetRootCanvas().GetOwner().RootComponent;
		UiNavigationNewController_1.UiNavigationNewController.SimulateClickItem(o);
	}
	OnRefreshSelfHotKeyState(e) {
		this.SetVisibleMode(2, !0);
	}
}
exports.MaskComponent = MaskComponent;
