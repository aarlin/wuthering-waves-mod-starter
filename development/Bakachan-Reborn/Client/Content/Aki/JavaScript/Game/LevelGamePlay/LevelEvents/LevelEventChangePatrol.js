"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventChangePatrol = void 0);
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangePatrol extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, t) {
		t &&
			e &&
			t instanceof TsBaseCharacter_1.default &&
			((e = e.get("PatrolIndex")), void 0 !== (e = Number.parseInt(e))) &&
			(t = t.CharacterActorComponent.Entity.GetComponent(38)) &&
			t.TsAiController &&
			t.TsAiController.AiController.AiPatrol.ResetPatrol(e);
	}
}
exports.LevelEventChangePatrol = LevelEventChangePatrol;
