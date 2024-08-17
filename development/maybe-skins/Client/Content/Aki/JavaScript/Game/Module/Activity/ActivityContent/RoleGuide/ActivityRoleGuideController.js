"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRoleGuideController = void 0);
const ActivityControllerBase_1 = require("../../ActivityControllerBase"),
	ActivityRoleGuideData_1 = require("./ActivityRoleGuideData"),
	ActivitySubViewRoleGuide_1 = require("./ActivitySubViewRoleGuide");
class ActivityRoleGuideController extends ActivityControllerBase_1.ActivityControllerBase {
	OnAddEvents() {}
	OnRemoveEvents() {}
	OnGetActivityResource(e) {
		return "UiItem_ActivityRoleGuide";
	}
	OnCreateSubPageComponent(e) {
		return new ActivitySubViewRoleGuide_1.ActivitySubViewRoleGuide();
	}
	OnCreateActivityData(e) {
		return (
			(ActivityRoleGuideController.CurrentActivityId = e.Ekn),
			new ActivityRoleGuideData_1.ActivityRoleGuideData()
		);
	}
	OnOpenView(e) {}
	OnGetIsOpeningActivityRelativeView() {
		return !1;
	}
}
(exports.ActivityRoleGuideController =
	ActivityRoleGuideController).CurrentActivityId = 0;
