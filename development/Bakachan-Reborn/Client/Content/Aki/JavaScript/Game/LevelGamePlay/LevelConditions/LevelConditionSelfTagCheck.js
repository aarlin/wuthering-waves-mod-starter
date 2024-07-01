"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionSelfTagCheck = void 0);
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionSelfTagCheck extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		return (
			!(!e.LimitParams || !a || !(e = e.LimitParams.get("Tag"))) &&
			a.Tags.Contains(FNameUtil_1.FNameUtil.GetDynamicFName(e))
		);
	}
}
exports.LevelConditionSelfTagCheck = LevelConditionSelfTagCheck;
