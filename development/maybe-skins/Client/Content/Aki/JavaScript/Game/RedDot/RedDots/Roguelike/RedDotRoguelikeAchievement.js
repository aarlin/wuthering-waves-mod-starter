"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotRoguelikeAchievement = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ActivityRogueController_1 = require("../../../Module/Activity/ActivityContent/RougeActivity/ActivityRogueController"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotRoguelikeAchievement extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.RefreshAchievementRedPoint];
	}
	OnCheck() {
		return (
			ActivityRogueController_1.ActivityRogueController.RefreshActivityRedDot(),
			ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeAchievementRedDot()
		);
	}
}
exports.RedDotRoguelikeAchievement = RedDotRoguelikeAchievement;
