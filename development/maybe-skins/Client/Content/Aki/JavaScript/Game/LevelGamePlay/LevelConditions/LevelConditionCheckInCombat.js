"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckInCombat = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	FormationDataController_1 = require("../../Module/Abilities/FormationDataController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInCombat extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e) {
		return (
			!!e &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Temp", 36, "LevelConditionCheckInCombat", [
					"CharacterUnifiedStateComponent.GlobalIsInFight",
					FormationDataController_1.FormationDataController.GlobalIsInFight,
				]),
			FormationDataController_1.FormationDataController.GlobalIsInFight ===
				e.InCombat)
		);
	}
}
exports.LevelConditionCheckInCombat = LevelConditionCheckInCombat;
