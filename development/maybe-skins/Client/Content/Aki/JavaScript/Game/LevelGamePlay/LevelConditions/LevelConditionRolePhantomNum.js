"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionRolePhantomNum = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRolePhantomNum extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		if (e.LimitParams) {
			var o = Number(e.LimitParams.get("RoleId"));
			if (void 0 !== o) {
				var t = Number(e.LimitParams.get("Value")),
					r = e.LimitParams.get("Op");
				if (r) {
					if (0 < o) return this.mLe(o, t, r);
					for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleList())
						if (this.mLe(e.GetRoleId(), t, r)) return !0;
				}
			}
		}
		return !1;
	}
	mLe(e, a, o) {
		return (
			!!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e) &&
			this.CheckCompareValue(
				o,
				ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					e,
				).GetEquippedNum(),
				a,
			)
		);
	}
}
exports.LevelConditionRolePhantomNum = LevelConditionRolePhantomNum;
