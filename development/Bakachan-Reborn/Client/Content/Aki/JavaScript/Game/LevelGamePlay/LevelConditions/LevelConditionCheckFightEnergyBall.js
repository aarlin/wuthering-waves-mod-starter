"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckFightEnergyBall = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	SceneTeamDefine_1 = require("../../Module/SceneTeam/SceneTeamDefine"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckFightEnergyBall extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, n) {
		var o;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: (o = Number(e.LimitParams.get("能量球状态"))) < 0 || 2 < o
				? (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"LevelCondition",
							17,
							`配置错误！条件${e.Id}的能量球状态只能是0，1`,
						),
					!1)
				: (0 ===
						(e =
							ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
								79,
							)?.RoleElementEnergy) &&
						0 === o) ||
					(0 < e && e < SceneTeamDefine_1.MAX_ELEMENT_ENERGY && 2 === o) ||
					(e >= SceneTeamDefine_1.MAX_ELEMENT_ENERGY && 1 === o);
	}
}
exports.LevelConditionCheckFightEnergyBall = LevelConditionCheckFightEnergyBall;
