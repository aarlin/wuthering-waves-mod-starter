"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotInfluenceReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotInfluenceReward extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "InfluenceReputation";
	}
	IsMultiple() {
		return !0;
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.RedDotRefreshItemData,
			EventDefine_1.EEventName.RedDotInfluence,
		];
	}
	OnCheck(e) {
		return ModelManager_1.ModelManager.InfluenceReputationModel.RedDotInfluenceRewardCondition(
			e,
		);
	}
}
exports.RedDotInfluenceReward = RedDotInfluenceReward;
