"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotBattlePass = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotBattlePass extends RedDotBase_1.RedDotBase {
	OnCheck() {
		return (
			ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange() &&
			(!ModelManager_1.ModelManager.BattlePassModel.HadEnter ||
				ModelManager_1.ModelManager.BattlePassModel.PayButtonRedDotState)
		);
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.BattlePassHadEnterUpdate];
	}
	GetActiveEvents() {
		return [EventDefine_1.EEventName.UpdateBattlePassTaskEvent];
	}
	GetDisActiveEvents() {
		return [EventDefine_1.EEventName.OnBattlePassExpireEvent];
	}
}
exports.RedDotBattlePass = RedDotBattlePass;
