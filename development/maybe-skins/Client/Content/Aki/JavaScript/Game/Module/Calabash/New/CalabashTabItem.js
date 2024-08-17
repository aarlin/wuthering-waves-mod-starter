"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashTabItem = void 0);
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem"),
	UiTabSequence_1 = require("../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class CalabashTabItem extends CommonTabItem_1.CommonTabItem {
	RegisterViewModule(e) {
		e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
	}
}
exports.CalabashTabItem = CalabashTabItem;
