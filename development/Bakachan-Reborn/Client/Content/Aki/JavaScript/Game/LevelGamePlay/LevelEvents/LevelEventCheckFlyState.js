"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventCheckFlyState = void 0);
const Global_1 = require("../../Global"),
	CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
	LevelGeneralBase_1 = require("../LevelGeneralBase"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelEventCheckFlyState extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, t) {
		var r,
			l = Global_1.Global.BaseCharacter;
		l &&
			(l.CharacterActorComponent.Entity.GetComponent(158).MoveState ===
			CharacterUnifiedStateTypes_1.ECharMoveState.Glide
				? (r = e.get("Success")) &&
					ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByString(
						r,
						l,
					)
				: (r = e.get("Failure")) &&
					ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByString(
						r,
						l,
					));
	}
}
exports.LevelEventCheckFlyState = LevelEventCheckFlyState;
