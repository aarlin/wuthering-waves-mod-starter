"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalTabItem = void 0);
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
	CommonTabItem_1 = require("./CommonTabItem");
class PersonalTabItem extends CommonTabItem_1.CommonTabItem {
	RegisterViewModule(e) {
		e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
	}
}
exports.PersonalTabItem = PersonalTabItem;
