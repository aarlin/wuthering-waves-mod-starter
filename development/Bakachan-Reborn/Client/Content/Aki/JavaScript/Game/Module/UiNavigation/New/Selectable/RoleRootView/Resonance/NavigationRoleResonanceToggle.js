"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationRoleResonanceToggle = void 0);
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
	UiNavigationNewController_1 = require("../../../UiNavigationNewController"),
	NavigationToggle_1 = require("../../NavigationToggle");
class NavigationRoleResonanceToggle extends NavigationToggle_1.NavigationToggle {
	OnStart() {
		var e = this.PanelHandle;
		StringUtils_1.StringUtils.IsBlank(e.GroupName) ||
			((this.Selectable.bToggleOnSelect = !0),
			e.SetDefaultNavigationListener(this.Listener),
			UiNavigationNewController_1.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty());
	}
	OnToggleClick() {
		var e = this.PanelHandle;
		StringUtils_1.StringUtils.IsBlank(e.GroupName)
			? e.SetToggleSelectByGroupName(this.Listener.GroupName)
			: e.SetDefaultNavigationListener(this.Listener);
	}
}
exports.NavigationRoleResonanceToggle = NavigationRoleResonanceToggle;
