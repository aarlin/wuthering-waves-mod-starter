"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationFunctionPageRightButton = void 0);
const NavigationButton_1 = require("../NavigationButton");
class NavigationFunctionPageRightButton extends NavigationButton_1.NavigationButton {
	OnButtonClick() {
		"MainMenu" === this.PanelHandle?.GetType() &&
			this.PanelHandle.FindNextFocusListener();
	}
}
exports.NavigationFunctionPageRightButton = NavigationFunctionPageRightButton;
