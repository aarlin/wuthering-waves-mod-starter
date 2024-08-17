"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotCommonActivityPage = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDot/RedDotBase");
class RedDotCommonActivityPage extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "ActivityEntrance";
	}
	IsMultiple() {
		return !0;
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.RefreshCommonActivityRedDot];
	}
	OnCheck(e) {
		return (
			ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)
				?.RedPointShowState ?? !1
		);
	}
}
exports.RedDotCommonActivityPage = RedDotCommonActivityPage;
