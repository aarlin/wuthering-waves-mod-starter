"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FragmentMemoryEntranceRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	RedDotBase_1 = require("../../RedDotBase");
class FragmentMemoryEntranceRedDot extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.FragmentRewardEntranceRedDot];
	}
	OnCheck() {
		return ModelManager_1.ModelManager.FragmentMemoryModel.GetRedDotState();
	}
}
exports.FragmentMemoryEntranceRedDot = FragmentMemoryEntranceRedDot;
