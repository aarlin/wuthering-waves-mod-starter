"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleTabItem = void 0);
const UiTabCamera_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabCamera"),
	UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
	CommonTabItem_1 = require("./CommonTabItem");
class RoleTabItem extends CommonTabItem_1.CommonTabItem {
	RegisterViewModule(e) {
		e
			.AddUiTabViewBehavior(UiTabCamera_1.UiTabCamera)
			.SetTabData(e.GetViewName()),
			e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
	}
}
exports.RoleTabItem = RoleTabItem;
