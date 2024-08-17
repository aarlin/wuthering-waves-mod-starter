"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotAchievementCategory = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDot/RedDotBase");
class RedDotAchievementCategory extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.RefreshAchievementRedPoint];
	}
	IsMultiple() {
		return !0;
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.AchievementModel.GetCategoryRedPointState(
			e,
		);
	}
}
exports.RedDotAchievementCategory = RedDotAchievementCategory;
