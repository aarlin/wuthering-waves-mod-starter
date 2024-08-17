"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionRoleLevel = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRoleLevel extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, l) {
		var a;
		return (
			!!(
				e.LimitParams &&
				(a = e.LimitParams.get("Level")) &&
				((e = (e = e.LimitParams.get("RoleId"))
					? parseInt(e)
					: ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId()),
				(e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e))) &&
				(e = e.GetLevelData()).GetLevel()
			) && e.GetLevel() >= parseInt(a)
		);
	}
}
exports.LevelConditionRoleLevel = LevelConditionRoleLevel;
