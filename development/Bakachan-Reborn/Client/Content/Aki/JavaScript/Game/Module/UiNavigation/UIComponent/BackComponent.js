"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BackComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class BackComponent extends HotKeyComponent_1.HotKeyComponent {
	OnPress() {
		UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView();
	}
}
exports.BackComponent = BackComponent;
