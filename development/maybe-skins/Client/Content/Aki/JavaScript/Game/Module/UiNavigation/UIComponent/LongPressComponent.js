"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LongPressComponent = void 0);
const UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
	HotKeyComponent_1 = require("./HotKeyComponent");
class LongPressComponent extends HotKeyComponent_1.HotKeyComponent {
	OnRelease(o) {
		UiNavigationNewController_1.UiNavigationNewController.SimulationPointUp(
			o.BindButtonTag,
		);
	}
	OnPress(o) {
		UiNavigationNewController_1.UiNavigationNewController.SimulationPointDown(
			o.BindButtonTag,
		);
	}
}
exports.LongPressComponent = LongPressComponent;
