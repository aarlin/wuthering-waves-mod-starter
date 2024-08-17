"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationVisionTabViewReplaceButton = void 0);
const UiNavigationGlobalData_1 = require("../../UiNavigationGlobalData"),
	NavigationButton_1 = require("../NavigationButton");
class NavigationVisionTabViewReplaceButton extends NavigationButton_1.NavigationButton {
	InteractClickHandle() {
		UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault =
			!0;
	}
}
exports.NavigationVisionTabViewReplaceButton =
	NavigationVisionTabViewReplaceButton;
