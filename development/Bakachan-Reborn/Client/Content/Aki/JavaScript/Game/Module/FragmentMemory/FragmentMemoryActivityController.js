"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FragmentMemoryActivityController = void 0);
const FragmentMemorySubView_1 = require("../Activity/ActivityContent/FragmentMemory/FragmentMemorySubView"),
	ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
	FragmentMemoryActivityData_1 = require("./FragmentMemoryActivityData");
class FragmentMemoryActivityController extends ActivityControllerBase_1.ActivityControllerBase {
	OnOpenView(e) {}
	OnGetActivityResource(e) {
		return "UiItem_ActivityProcessMemory";
	}
	OnCreateSubPageComponent(e) {
		return new FragmentMemorySubView_1.FragmentMemorySubView();
	}
	OnCreateActivityData(e) {
		return new FragmentMemoryActivityData_1.FragmentMemoryActivityData();
	}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
}
exports.FragmentMemoryActivityController = FragmentMemoryActivityController;
