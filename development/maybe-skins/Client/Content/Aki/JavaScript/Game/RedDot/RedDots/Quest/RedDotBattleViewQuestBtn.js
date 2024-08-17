"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotBattleViewQuestBtn = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotBattleViewQuestBtn extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.OnQuestRedDotStateChange];
	}
	OnCheck() {
		var e;
		for ([e] of ModelManager_1.ModelManager.QuestNewModel.GetAllRedDotData()) {
			var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
			if (t && t.CanShowInUiPanel()) return !0;
		}
		return !1;
	}
	IsAllEventParamAsUId() {
		return !1;
	}
}
exports.RedDotBattleViewQuestBtn = RedDotBattleViewQuestBtn;
