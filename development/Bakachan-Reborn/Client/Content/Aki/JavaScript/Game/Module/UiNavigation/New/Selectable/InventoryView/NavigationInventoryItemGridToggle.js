"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationInventoryItemGridToggle = void 0);
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationInventoryItemGridToggle extends NavigationToggle_1.NavigationToggle {
	OnStart() {
		var e;
		"Inventory" === this.PanelHandle?.GetType() &&
			((e = this.PanelHandle),
			(this.Selectable.bToggleOnSelect = !e.IsInDestroyMode));
	}
}
exports.NavigationInventoryItemGridToggle = NavigationInventoryItemGridToggle;
