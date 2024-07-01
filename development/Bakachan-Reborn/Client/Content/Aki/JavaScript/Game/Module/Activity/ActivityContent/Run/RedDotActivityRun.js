"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotActivityRun = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../../../RedDot/RedDotBase");
class RedDotActivityRun extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.RefreshRunActivityRedDot];
	}
	OnCheck(e) {
		return (
			!!(e =
				ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(e)) &&
			e.GetRedPoint()
		);
	}
}
exports.RedDotActivityRun = RedDotActivityRun;
