"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationFunctionPageLeftButton = void 0);
const NavigationButton_1 = require("../NavigationButton");
class NavigationFunctionPageLeftButton extends NavigationButton_1.NavigationButton {
	OnButtonClick() {
		"MainMenu" === this.PanelHandle?.GetType() &&
			this.PanelHandle.FindPrevFocusListener();
	}
}
exports.NavigationFunctionPageLeftButton = NavigationFunctionPageLeftButton;
