"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationRouletteExitButton = void 0);
const EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	UiNavigationNewController_1 = require("../../UiNavigationNewController"),
	NavigationButton_1 = require("../NavigationButton");
class NavigationRouletteExitButton extends NavigationButton_1.NavigationButton {
	InteractClickPrevGroup() {
		"Group1" ===
			UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener()
				?.GroupName &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnRouletteItemUnlock,
			);
	}
}
exports.NavigationRouletteExitButton = NavigationRouletteExitButton;
