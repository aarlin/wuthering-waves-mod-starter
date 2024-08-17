"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionIsPlayer = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionIsPlayer extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, l) {
		var r;
		return (
			!(!e.LimitParams || !l) &&
			((r = Global_1.Global.BaseCharacter),
			e.LimitParams.get("IsPlayer") === StringUtils_1.ONE_STRING
				? r === l
				: r !== l)
		);
	}
}
exports.LevelConditionIsPlayer = LevelConditionIsPlayer;
