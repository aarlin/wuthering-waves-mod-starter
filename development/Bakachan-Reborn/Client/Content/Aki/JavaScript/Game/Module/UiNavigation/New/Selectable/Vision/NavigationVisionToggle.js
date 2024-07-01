"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationVisionToggle = void 0);
const UiNavigationNewController_1 = require("../../UiNavigationNewController"),
	NavigationToggle_1 = require("../NavigationToggle");
class NavigationVisionToggle extends NavigationToggle_1.NavigationToggle {
	OnHandlePointerSelect(e) {
		var i = this.Selectable;
		return (
			0 === i.ToggleState &&
				e &&
				1 === e.inputType &&
				i.bToggleOnSelect &&
				UiNavigationNewController_1.UiNavigationNewController.InteractClickByListener(
					this.Listener,
				),
			this.Listener.ScrollView &&
				this.Listener.ScrollView.ScrollToSelectableComponent(i),
			!!this.IsAllowNavigationByGroup()
		);
	}
	OnIsIgnoreScrollOrLayoutCheck() {
		return !0;
	}
}
exports.NavigationVisionToggle = NavigationVisionToggle;
