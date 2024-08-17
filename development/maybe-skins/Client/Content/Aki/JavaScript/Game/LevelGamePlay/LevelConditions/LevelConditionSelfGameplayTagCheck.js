"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionSelfGameplayTagCheck = void 0);
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
	TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionSelfGameplayTagCheck extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, a) {
		return (
			!(!e.LimitParams || !a) &&
			!!(e = e.LimitParams.get("GamePlayTag")) &&
			a instanceof TsBaseCharacter_1.default &&
			(a.CharacterActorComponent?.Entity?.GetComponent(185)?.HasTag(
				GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e),
			) ??
				!1)
		);
	}
}
exports.LevelConditionSelfGameplayTagCheck = LevelConditionSelfGameplayTagCheck;
