"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventFocusOnInformationBoard = void 0);
const Global_1 = require("../../Global"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFocusOnInformationBoard extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, t) {
		var r = Global_1.Global.BaseCharacter;
		r &&
			r.CharacterActorComponent.Entity.CheckGetComponent(158).SetDirectionState(
				CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection,
			);
	}
}
exports.LevelEventFocusOnInformationBoard = LevelEventFocusOnInformationBoard;
