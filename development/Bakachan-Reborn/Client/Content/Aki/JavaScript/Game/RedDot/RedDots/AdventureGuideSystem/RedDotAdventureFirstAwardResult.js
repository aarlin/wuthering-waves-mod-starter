"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotAdventureFirstAwardResult = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	RedDotBase_1 = require("../../RedDotBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RedDotAdventureFirstAwardResult extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.RedDotSilentFirstAwardResult];
	}
	OnCheck(e) {
		return ControllerHolder_1.ControllerHolder.AdventureGuideController.CheckCanGetFirstAwardById(
			e,
		);
	}
}
exports.RedDotAdventureFirstAwardResult = RedDotAdventureFirstAwardResult;
