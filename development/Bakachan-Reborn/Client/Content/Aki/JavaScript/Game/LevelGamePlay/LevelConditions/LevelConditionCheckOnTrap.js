"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionCheckOnTrap = void 0);
const puerts_1 = require("puerts"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckOnTrap extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, r) {
		var t, i;
		return (
			!(!e.LimitParams || ((e = e.LimitParams.get("TrapState")), !r) || !e) &&
			((i = (!1, puerts_1.$ref)(!1)),
			r.IsPhysicInteracted(i),
			(t = (0, puerts_1.$unref)(i)),
			e === StringUtils_1.ONE_STRING ? t : !t)
		);
	}
}
exports.LevelConditionCheckOnTrap = LevelConditionCheckOnTrap;
