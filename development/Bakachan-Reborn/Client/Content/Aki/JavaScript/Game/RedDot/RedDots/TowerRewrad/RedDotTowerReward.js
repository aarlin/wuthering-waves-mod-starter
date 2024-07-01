"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotTowerReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotTowerReward extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.OnTowerRewardReceived,
			EventDefine_1.EEventName.RedDotTowerReward,
		];
	}
	OnCheck() {
		return ModelManager_1.ModelManager.TowerModel.CanGetReward();
	}
}
exports.RedDotTowerReward = RedDotTowerReward;
