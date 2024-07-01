"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotAdventureFirstAwardCategory = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	RedDotBase_1 = require("../../RedDotBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RedDotAdventureFirstAwardCategory extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [EventDefine_1.EEventName.RedDotSilentFirstAwardCategory];
	}
	OnCheck(e) {
		return ControllerHolder_1.ControllerHolder.AdventureGuideController.CheckCanGetFirstAwardByTypeId(
			e,
		);
	}
}
exports.RedDotAdventureFirstAwardCategory = RedDotAdventureFirstAwardCategory;
