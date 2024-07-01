"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotBattlePassWeekTaskTab = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotBattlePassWeekTaskTab extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "BattlePassTask";
	}
	OnCheck() {
		return ModelManager_1.ModelManager.BattlePassModel.CheckHasTaskWaitTakeWithType(
			2,
		);
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
			EventDefine_1.EEventName.ReceiveBattlePassTaskEvent,
		];
	}
	IsAllEventParamAsUId() {
		return !1;
	}
}
exports.RedDotBattlePassWeekTaskTab = RedDotBattlePassWeekTaskTab;
