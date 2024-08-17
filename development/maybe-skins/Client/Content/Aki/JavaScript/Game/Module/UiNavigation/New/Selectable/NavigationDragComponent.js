"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NavigationDragComponent = void 0);
const NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationDragComponent extends NavigationSelectableBase_1.NavigationSelectableBase {
	OnHandlePointerSelect(e) {
		return !1;
	}
}
exports.NavigationDragComponent = NavigationDragComponent;
