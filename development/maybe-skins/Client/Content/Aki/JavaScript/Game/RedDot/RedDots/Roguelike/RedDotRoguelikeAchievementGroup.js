"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotRoguelikeAchievementGroup = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotRoguelikeAchievementGroup extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.OnAchievementGroupDataNotify];
	}
	OnCheck(e) {
		return (
			!!(e =
				ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(
					e,
				)) && e.SmallItemRedPoint()
		);
	}
}
exports.RedDotRoguelikeAchievementGroup = RedDotRoguelikeAchievementGroup;
