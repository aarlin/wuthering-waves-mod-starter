"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckRoleSkillTargetLevel = void 0);
const RoleController_1 = require("../../Module/RoleUi/RoleController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRoleSkillTargetLevel extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, l) {
		return (
			!!e.LimitParams &&
			((e = (e = e.LimitParams.get("Level")) ? parseInt(e) : 0),
			RoleController_1.RoleController.CheckRoleSkillTargetLevel(e))
		);
	}
}
exports.LevelConditionCheckRoleSkillTargetLevel =
	LevelConditionCheckRoleSkillTargetLevel;
