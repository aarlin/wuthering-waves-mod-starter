"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotRoguelikeSkillCanUnlock = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ActivityRogueController_1 = require("../../../Module/Activity/ActivityContent/RougeActivity/ActivityRogueController"),
	RedDotBase_1 = require("../../RedDotBase");
class RedDotRoguelikeSkillCanUnlock extends RedDotBase_1.RedDotBase {
	OnGetEvents() {
		return [
			EventDefine_1.EEventName.RoguelikeCurrencyUpdate,
			EventDefine_1.EEventName.RoguelikeDataUpdate,
		];
	}
	OnCheck() {
		return (
			ActivityRogueController_1.ActivityRogueController.RefreshActivityRedDot(),
			ModelManager_1.ModelManager.RoguelikeModel.CheckHasCanUnlockSkill()
		);
	}
}
exports.RedDotRoguelikeSkillCanUnlock = RedDotRoguelikeSkillCanUnlock;
