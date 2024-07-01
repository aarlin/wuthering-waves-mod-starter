"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DungeonAutoExitFloatTips = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class DungeonAutoExitFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
	constructor() {
		super(...arguments),
			(this.P$t = (e) => {
				void 0 === e ? this.CloseMe() : this.SetMainText(e.toString());
			});
	}
	OnAddEventListener() {
		super.OnAddEventListener(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnGamePlayCdChanged,
				this.P$t,
			);
	}
	OnRemoveEventListener() {
		super.OnRemoveEventListener(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnGamePlayCdChanged,
				this.P$t,
			);
	}
}
exports.DungeonAutoExitFloatTips = DungeonAutoExitFloatTips;
