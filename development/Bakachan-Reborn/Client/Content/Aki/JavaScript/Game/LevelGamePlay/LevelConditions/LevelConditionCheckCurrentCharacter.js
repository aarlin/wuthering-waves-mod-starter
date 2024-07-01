"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckCurrentCharacter = void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCurrentCharacter extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e) {
		var r;
		return (
			!!e &&
			((r = ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId()),
			(r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r)?.Id),
			(r = e.RoleId === r),
			"Eq" === e.Compare ? r : !r)
		);
	}
}
exports.LevelConditionCheckCurrentCharacter =
	LevelConditionCheckCurrentCharacter;
