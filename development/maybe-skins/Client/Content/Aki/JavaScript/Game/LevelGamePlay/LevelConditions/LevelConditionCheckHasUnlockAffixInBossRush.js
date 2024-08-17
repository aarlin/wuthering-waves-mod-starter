"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckHasUnlockAffixInBossRush = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckHasUnlockAffixInBossRush extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, n) {
		return (
			!!e.LimitParams &&
			!!(e = Number(e.LimitParams.get("ActivityId"))) &&
			1 <
				ModelManager_1.ModelManager.ActivityModel.GetActivityById(
					e,
				).GetUnlockedBuffIndices().length
		);
	}
}
exports.LevelConditionCheckHasUnlockAffixInBossRush =
	LevelConditionCheckHasUnlockAffixInBossRush;
