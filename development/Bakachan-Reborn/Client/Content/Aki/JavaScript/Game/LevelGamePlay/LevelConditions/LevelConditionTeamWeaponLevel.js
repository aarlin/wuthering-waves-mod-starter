"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionTeamWeaponLevel = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTeamWeaponLevel extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		var o, n;
		return (
			!!(
				e.LimitParams &&
				(o = e.LimitParams.get("Level")) &&
				((n = Number(e.LimitParams.get("Position"))),
				(n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)[
					n - 1
				])?.IsMyRole()) &&
				(n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
					n.GetConfigId,
				))
			) &&
			((e = e.LimitParams.get("Op")),
			this.CheckCompareValue(e, n.GetLevel(), Number(o)))
		);
	}
}
exports.LevelConditionTeamWeaponLevel = LevelConditionTeamWeaponLevel;
