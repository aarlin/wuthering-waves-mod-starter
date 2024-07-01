"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotQuestViewTab = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotQuestViewTab extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.OnQuestRedDotStateChange];
	}
	OnCheck(e) {
		for (const o of ConfigManager_1.ConfigManager.QuestNewConfig.GetQuesTypesByMainType(
			e,
		)) {
			var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(o.Id);
			if (t)
				for (const o of t)
					if (
						o.CanShowInUiPanel() &&
						ModelManager_1.ModelManager.QuestNewModel.CheckQuestRedDotDataState(
							o.Id,
						)
					)
						return (
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Quest",
									19,
									"RedDotQuestViewTab：任务红点显示",
									["mainTypeId", e],
									["questId", o.Id],
								),
							!0
						);
		}
		return !1;
	}
	IsMultiple() {
		return !0;
	}
	IsAllEventParamAsUId() {
		return !1;
	}
}
exports.RedDotQuestViewTab = RedDotQuestViewTab;
