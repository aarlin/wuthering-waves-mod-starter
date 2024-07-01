"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationVisionTabViewToggle = void 0);
const UiNavigationGlobalData_1 = require("../../UiNavigationGlobalData"),
	NavigationDragComponent_1 = require("../NavigationDragComponent");
class NavigationVisionTabViewToggle extends NavigationDragComponent_1.NavigationDragComponent {
	InteractClickFailHandle() {
		UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault =
			!1;
	}
	InteractClickHandle() {
		UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault =
			!1;
	}
}
exports.NavigationVisionTabViewToggle = NavigationVisionTabViewToggle;
