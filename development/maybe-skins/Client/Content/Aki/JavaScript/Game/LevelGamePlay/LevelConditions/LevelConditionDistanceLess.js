"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionDistanceLess = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase"),
	LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelConditionDistanceLess extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		if (!e.LimitParams) return !1;
		var a = e.LimitParams.get("StartTarget"),
			n = e.LimitParams.get("EndTargetTag");
		e = e.LimitParams.get("Distance");
		if (!a || !n) return !1;
		let s = t;
		return (
			!!(s =
				"Trigger" !== a
					? LevelGeneralCommons_1.LevelGeneralCommons.FindTargetWithTag(a)
					: s) &&
			!!(t = LevelGeneralCommons_1.LevelGeneralCommons.FindTargetWithTag(n)) &&
			s.GetDistanceTo(t) < parseFloat(e)
		);
	}
}
exports.LevelConditionDistanceLess = LevelConditionDistanceLess;
