"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionTeamCouldEquipPhantom = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTeamCouldEquipPhantom extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		if (
			0 !==
			ModelManager_1.ModelManager.PhantomBattleModel.GetUnEquipVisionArray()
				.length
		)
			for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
				!0,
			))
				if (
					ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
						e.GetConfigId,
					)?.CheckHasEmpty()
				)
					return !0;
		return !1;
	}
}
exports.LevelConditionTeamCouldEquipPhantom =
	LevelConditionTeamCouldEquipPhantom;
