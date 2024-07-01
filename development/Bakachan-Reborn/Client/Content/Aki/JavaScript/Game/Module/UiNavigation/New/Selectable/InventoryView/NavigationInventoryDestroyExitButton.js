"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationInventoryDestroyExitButton = void 0);
const NavigationButton_1 = require("../NavigationButton");
class NavigationInventoryDestroyExitButton extends NavigationButton_1.NavigationButton {
	OnButtonClick() {
		this.PanelHandle.SetItemGridDestroyMode(!1);
	}
}
exports.NavigationInventoryDestroyExitButton =
	NavigationInventoryDestroyExitButton;
