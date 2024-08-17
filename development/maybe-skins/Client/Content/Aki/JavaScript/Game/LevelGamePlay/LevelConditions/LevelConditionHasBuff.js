"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionHasBuff = void 0);
const Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionHasBuff extends LevelGeneralBase_1.LevelConditionBase {
	CheckNew(e, t) {
		if (!e) return !1;
		if (!e) return !1;
		var o = e.BuffId;
		if (!(r = Global_1.Global.BaseCharacter)) return !1;
		var r,
			n = (r = r.CharacterActorComponent.Entity).CheckGetComponent(157);
		if (!n) return !1;
		let a = 0 < n.GetBuffTotalStackById(BigInt(o));
		return (
			(n = r.CheckGetComponent(171)) &&
				(a ||=
					0 <
					(n.GetFormationBuffComp()?.GetBuffTotalStackById(BigInt(o)) ?? 0)),
			"Eq" === e.Compare ? a : !a
		);
	}
}
exports.LevelConditionHasBuff = LevelConditionHasBuff;
