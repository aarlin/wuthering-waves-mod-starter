"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckRoleTargetLevel = void 0);
const RoleController_1 = require("../../Module/RoleUi/RoleController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRoleTargetLevel extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, l) {
		return (
			!!e.LimitParams &&
			((e = (e = e.LimitParams.get("Level")) ? parseInt(e) : 0),
			RoleController_1.RoleController.CheckRoleTargetLevel(e))
		);
	}
}
exports.LevelConditionCheckRoleTargetLevel = LevelConditionCheckRoleTargetLevel;
