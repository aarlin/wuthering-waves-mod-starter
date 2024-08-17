"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotAdventureDailyActivityTab = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotAdventureDailyActivityTab extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "FunctionAdventure";
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.DailyActivityStateNotify];
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.DailyActivityModel.CheckIsRewardWaitTake();
	}
}
exports.RedDotAdventureDailyActivityTab = RedDotAdventureDailyActivityTab;
