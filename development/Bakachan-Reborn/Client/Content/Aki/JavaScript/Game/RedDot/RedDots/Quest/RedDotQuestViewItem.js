"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotQuestViewItem = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotQuestViewItem extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.OnQuestRedDotStateChange];
	}
	OnCheck(e) {
		return (
			ModelManager_1.ModelManager.QuestNewModel.CheckQuestRedDotDataState(e) ??
			!1
		);
	}
}
exports.RedDotQuestViewItem = RedDotQuestViewItem;
