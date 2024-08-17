"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotBattlePassReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotBattlePassReward extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "BattlePass";
	}
	OnCheck() {
		return ModelManager_1.ModelManager.BattlePassModel.CheckHasRewardWaitTake();
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.GetBattlePassRewardEvent,
			EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
			EventDefine_1.EEventName.OnBattlePassLevelUpEvent,
		];
	}
	IsAllEventParamAsUId() {
		return !1;
	}
}
exports.RedDotBattlePassReward = RedDotBattlePassReward;
