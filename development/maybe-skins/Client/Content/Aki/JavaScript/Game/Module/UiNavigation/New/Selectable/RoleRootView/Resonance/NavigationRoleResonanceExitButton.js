"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationRoleResonanceExitButton = void 0);
const UiNavigationViewManager_1 = require("../../../UiNavigationViewManager"),
	NavigationButton_1 = require("../../NavigationButton");
class NavigationRoleResonanceExitButton extends NavigationButton_1.NavigationButton {
	OnButtonClick() {
		var e =
			UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetPanelConfigByType(
				"RoleResonance",
			);
		e &&
			((e = e?.GetPanelHandle()).ResetToggleSelect(),
			e.SetDefaultNavigationListener(void 0));
	}
}
exports.NavigationRoleResonanceExitButton = NavigationRoleResonanceExitButton;
