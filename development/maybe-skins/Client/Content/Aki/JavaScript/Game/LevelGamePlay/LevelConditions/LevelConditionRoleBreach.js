"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionRoleBreach = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	RoleInstance_1 = require("../../Module/RoleUi/View/ViewData/RoleInstance"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRoleBreach extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a, ...r) {
		if (!e.LimitParams) return !1;
		var t = e.LimitParams.get("Breach");
		if (!t) return !1;
		let l = 0;
		return (
			(e = e.LimitParams.get("RoleId")) && (l = parseInt(e)),
			0 < r.length && (l = r[0]),
			!!(e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(l)) &&
				e instanceof RoleInstance_1.RoleInstance &&
				!!(r = e.GetLevelData()).GetBreachLevel() &&
				r.GetBreachLevel() >= parseInt(t)
		);
	}
}
exports.LevelConditionRoleBreach = LevelConditionRoleBreach;
