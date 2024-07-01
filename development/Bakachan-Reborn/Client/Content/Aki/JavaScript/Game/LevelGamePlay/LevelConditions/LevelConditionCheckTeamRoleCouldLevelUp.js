"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckTeamRoleCouldLevelUp = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeamRoleCouldLevelUp extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		let l = !1;
		for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList())
			if (
				0 <
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.Id)
			) {
				l = !0;
				break;
			}
		if (l)
			for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
				!0,
			)) {
				var a = e.GetConfigId;
				if (
					(a =
						ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
							a,
						).GetLevelData()).GetLevel() < a.GetCurrentMaxLevel()
				)
					return !0;
			}
		return !1;
	}
}
exports.LevelConditionCheckTeamRoleCouldLevelUp =
	LevelConditionCheckTeamRoleCouldLevelUp;
