"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationInventoryDestroyEnterButton = void 0);
const NavigationButton_1 = require("../NavigationButton");
class NavigationInventoryDestroyEnterButton extends NavigationButton_1.NavigationButton {
	OnButtonClick() {
		this.PanelHandle.SetItemGridDestroyMode(!0);
	}
}
exports.NavigationInventoryDestroyEnterButton =
	NavigationInventoryDestroyEnterButton;
