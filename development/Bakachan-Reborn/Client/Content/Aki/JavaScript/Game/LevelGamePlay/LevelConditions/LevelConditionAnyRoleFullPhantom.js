"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionAnyRoleFullPhantom = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionAnyRoleFullPhantom extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		if (!e.LimitParams) return !1;
		if (!(e = e.LimitParams.get("CheckValue"))) return !1;
		var n = "TRUE" === e;
		for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0))
			if (
				!ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					e.GetConfigId,
				)?.CheckHasEmpty()
			)
				return n;
		return !n;
	}
}
exports.LevelConditionAnyRoleFullPhantom = LevelConditionAnyRoleFullPhantom;
