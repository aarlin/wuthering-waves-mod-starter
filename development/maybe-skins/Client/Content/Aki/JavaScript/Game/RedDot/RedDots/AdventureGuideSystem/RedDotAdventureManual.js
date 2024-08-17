"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotAdventureManual = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	RedDotBase_1 = require("../../RedDotBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RedDotAdventureManual extends RedDotBase_1.RedDotBase {
	OnGetParentName() {
		return "FunctionAdventure";
	}
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.RedDotAdventureManualUpdate,
			EventDefine_1.EEventName.RedDotSilentFirstAward,
		];
	}
	OnCheck(e) {
		return ControllerHolder_1.ControllerHolder.AdventureGuideController.CheckCanGetTaskAward();
	}
}
exports.RedDotAdventureManual = RedDotAdventureManual;
