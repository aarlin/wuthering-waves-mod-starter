"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckBattleRoleIsNot = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckBattleRoleIsNot extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		var r;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: (r = parseInt(e.LimitParams.get("RoleId")))
				? ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId() !== r
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							`配置错误！条件${e.Id}的RoleId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckBattleRole}的定义`,
						),
					!1);
	}
}
exports.LevelConditionCheckBattleRoleIsNot = LevelConditionCheckBattleRoleIsNot;
