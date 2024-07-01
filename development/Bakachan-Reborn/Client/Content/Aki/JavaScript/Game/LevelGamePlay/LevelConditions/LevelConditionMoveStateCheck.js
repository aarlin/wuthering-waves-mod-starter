"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelConditionMoveStateCheck = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	Global_1 = require("../../Global"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionMoveStateCheck extends LevelGeneralBase_1.LevelConditionBase {
	Check(e, t) {
		if (!e.LimitParams || !t) return !1;
		if (!(t = Global_1.Global.BaseCharacter)) return !1;
		if (!(t = t.CharacterActorComponent.Entity.GetComponent(158))) return !1;
		switch (t.PositionState) {
			case CharacterUnifiedStateTypes_1.ECharPositionState.Air:
				if (e.LimitParams.get("Glide") === StringUtils_1.ONE_STRING) break;
				return !1;
			case CharacterUnifiedStateTypes_1.ECharPositionState.Climb:
				if (e.LimitParams.get("Climb") === StringUtils_1.ONE_STRING) break;
				return !1;
			case CharacterUnifiedStateTypes_1.ECharPositionState.Water:
				if (e.LimitParams.get("Swim") === StringUtils_1.ONE_STRING) break;
				return !1;
		}
		return !0;
	}
}
exports.LevelConditionMoveStateCheck = LevelConditionMoveStateCheck;
