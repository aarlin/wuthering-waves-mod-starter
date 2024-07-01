"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckBattleRoleWeaponType = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckBattleRoleWeaponType extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, o) {
		var a;
		return 0 === e.LimitParams.size
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelCondition",
						17,
						"配置错误！条件的参数不应该为空",
						["inConditionInfo.Id", e.Id],
					),
				!1)
			: !!(e = e.LimitParams.get("WeaponType")) &&
					((e = parseInt(e)),
					!!(a =
						ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId())) &&
					ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(a)
						.WeaponType === e;
	}
}
exports.LevelConditionCheckBattleRoleWeaponType =
	LevelConditionCheckBattleRoleWeaponType;
