"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotAchievement = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDot/RedDotBase");
class RedDotAchievement extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.RefreshAchievementRedPoint];
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.AchievementModel.GetAchievementRedPointState();
	}
}
exports.RedDotAchievement = RedDotAchievement;
