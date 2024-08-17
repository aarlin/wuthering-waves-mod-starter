"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionOnPlayerUseSkill = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnPlayerUseSkill extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, l, ...i) {
		return Number(e.LimitParams.get("SkillId")) === i[1];
	}
}
exports.LevelConditionOnPlayerUseSkill = LevelConditionOnPlayerUseSkill;
