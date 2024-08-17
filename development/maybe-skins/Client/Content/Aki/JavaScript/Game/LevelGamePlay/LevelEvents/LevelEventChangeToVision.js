"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventChangeToVision = void 0);
const Global_1 = require("../../Global"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangeToVision extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, n) {
		var o;
		e &&
			((o = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity)
				.GetComponent(3)
				.ClearInput(),
			o.GetComponent(185)?.AddTag(-1697149502),
			(o = o.GetComponent(33))) &&
			(o.EndOwnerAndFollowSkills(),
			o.BeginSkill(e.Id, { Context: "LevelEventChangeToVision.ExecuteNew" }));
	}
}
exports.LevelEventChangeToVision = LevelEventChangeToVision;
