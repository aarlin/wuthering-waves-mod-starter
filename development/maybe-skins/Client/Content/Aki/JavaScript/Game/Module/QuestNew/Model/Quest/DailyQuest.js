"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DailyQuest = void 0);
const Quest_1 = require("./Quest");
class DailyQuest extends Quest_1.Quest {
	constructor() {
		super(...arguments), (this.TriggerQuestTips = !1);
	}
	SetUpBehaviorTree(e) {
		super.SetUpBehaviorTree(e), e.SetMapMarkResident(!0);
	}
}
exports.DailyQuest = DailyQuest;
