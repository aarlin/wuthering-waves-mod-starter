"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckFormationAnyRoleDead = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFormationAnyRoleDead extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		return ModelManager_1.ModelManager.SceneTeamModel.IsAnyRoleDead();
	}
}
exports.LevelConditionCheckFormationAnyRoleDead =
	LevelConditionCheckFormationAnyRoleDead;
