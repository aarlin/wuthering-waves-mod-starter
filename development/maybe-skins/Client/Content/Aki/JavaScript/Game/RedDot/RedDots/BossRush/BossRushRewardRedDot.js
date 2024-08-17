"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushRewardRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class BossRushRewardRedDot extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.BossRefreshBossRushRewardRedDot];
	}
	OnCheck(e) {
		return (
			!!(e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) &&
			e.HaveRewardCanTake()
		);
	}
}
exports.BossRushRewardRedDot = BossRushRewardRedDot;
