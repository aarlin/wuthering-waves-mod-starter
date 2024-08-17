"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotCalabashTab = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotCalabashTab extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "FunctionCalabash";
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.GetCalabashReward,
			EventDefine_1.EEventName.RedDotRefreshCalabash,
			EventDefine_1.EEventName.CurWorldLevelChange,
		];
	}
	OnCheck() {
		return ModelManager_1.ModelManager.CalabashModel.CheckCanReceiveReward();
	}
}
exports.RedDotCalabashTab = RedDotCalabashTab;
