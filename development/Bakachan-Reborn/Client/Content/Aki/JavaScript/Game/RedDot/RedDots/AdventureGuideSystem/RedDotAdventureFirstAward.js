"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotAdventureFirstAward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	RedDotBase_1 = require("../../RedDotBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RedDotAdventureFirstAward extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "FunctionAdventure";
	}
	OnGetEvents() {
		return [EventDefine_1.EEventName.RedDotSilentFirstAward];
	}
	OnCheck(e) {
		return ControllerHolder_1.ControllerHolder.AdventureGuideController.CheckCanGetFirstAward();
	}
}
exports.RedDotAdventureFirstAward = RedDotAdventureFirstAward;
