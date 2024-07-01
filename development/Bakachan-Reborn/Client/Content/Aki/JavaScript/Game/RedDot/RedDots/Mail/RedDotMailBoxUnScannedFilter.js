"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotMailBoxUnScannedFilter = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotMailBoxUnScannedFilter extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.SwitchUnfinishedFlag,
			EventDefine_1.EEventName.OnPlayerLevelChanged,
		];
	}
	OnCheck() {
		return ModelManager_1.ModelManager.MailModel.UnScannedRedPoint();
	}
}
exports.RedDotMailBoxUnScannedFilter = RedDotMailBoxUnScannedFilter;
