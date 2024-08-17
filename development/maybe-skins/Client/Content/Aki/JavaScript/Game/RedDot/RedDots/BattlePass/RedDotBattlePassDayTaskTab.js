"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotBattlePassDayTaskTab = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotBattlePassDayTaskTab extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "BattlePassTask";
	}
	OnCheck() {
		return ModelManager_1.ModelManager.BattlePassModel.CheckHasTaskWaitTakeWithType(
			1,
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
exports.RedDotBattlePassDayTaskTab = RedDotBattlePassDayTaskTab;
