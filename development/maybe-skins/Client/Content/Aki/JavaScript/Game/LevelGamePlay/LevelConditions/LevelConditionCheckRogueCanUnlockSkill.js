"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckRogueCanUnlockSkill = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRogueCanUnlockSkill extends LevelGeneralBase_1.LevelConditionBase {
	Check() {
		return ModelManager_1.ModelManager.RoguelikeModel.CheckHasCanUnlockSkill();
	}
}
exports.LevelConditionCheckRogueCanUnlockSkill =
	LevelConditionCheckRogueCanUnlockSkill;
