"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionTeamRoleLevel = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTeamRoleLevel extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		var l, o;
		return (
			!!e.LimitParams &&
			!!(l = e.LimitParams.get("Level")) &&
			((o = Number(e.LimitParams.get("Position"))),
			!!(o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)[
				o - 1
			])?.IsMyRole()) &&
			((o =
				ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o.GetConfigId)
					?.GetLevelData()
					.GetLevel() ?? 0),
			(e = e.LimitParams.get("Op")),
			this.CheckCompareValue(e, o || 0, Number(l)))
		);
	}
}
exports.LevelConditionTeamRoleLevel = LevelConditionTeamRoleLevel;
