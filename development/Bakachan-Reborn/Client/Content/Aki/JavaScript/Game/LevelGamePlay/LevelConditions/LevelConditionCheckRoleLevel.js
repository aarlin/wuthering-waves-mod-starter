"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckRoleLevel = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRoleLevel extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		var l, o;
		return (
			!!(
				e.LimitParams &&
				(l = e.LimitParams.get("Level")) &&
				(o = e.LimitParams.get("RoleId")) &&
				((o = parseInt(o)),
				(o =
					ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
						o,
					)?.GetLevelData()))
			) &&
			((e = e.LimitParams.get("Op")),
			this.CheckCompareValue(e, o.GetLevel(), Number(l)))
		);
	}
}
exports.LevelConditionCheckRoleLevel = LevelConditionCheckRoleLevel;
