"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckBattleRole = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneTeamDefine_1 = require("../../Module/SceneTeam/SceneTeamDefine"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckBattleRole extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		var r, n, l, a;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: (r = Number(e.LimitParams.get("RoleId")))
				? ((n =
						ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId()),
					(l = Number(e.LimitParams.get("Slot")))
						? l <= 0 || l > SceneTeamDefine_1.SCENE_TEAM_MAX_NUM || isNaN(l)
							? (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"LevelCondition",
										17,
										`配置错误！条件${e.Id}的Slot参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckBattleRole}的定义`,
									),
								!1)
							: !!(a =
									ModelManager_1.ModelManager.SceneTeamModel
										.GetCurrentTeamItem) &&
								((a =
									ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
										!0,
									).indexOf(a) + 1),
								n === r) &&
								l === a
						: n === r)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							`配置错误！条件${e.Id}的RoleId参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckBattleRole}的定义`,
						),
					!1);
	}
}
exports.LevelConditionCheckBattleRole = LevelConditionCheckBattleRole;
