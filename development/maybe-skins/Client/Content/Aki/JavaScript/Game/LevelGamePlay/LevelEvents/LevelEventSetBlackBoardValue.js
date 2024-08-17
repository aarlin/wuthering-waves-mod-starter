"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetBlackBoardValue = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	TsAiController_1 = require("../../AI/Controller/TsAiController"),
	TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	BlackboardController_1 = require("../../World/Controller/BlackboardController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetBlackBoardValue extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, r) {
		var a = e.get("Tag"),
			t = UE.KismetStringLibrary.Conv_StringToInt64(e.get("GenId")),
			l = e.get("Type"),
			o = e.get("Key"),
			n = e.get("Value");
		e = new Array();
		if (
			(ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(t, e),
			e.length)
		) {
			var i = FNameUtil_1.FNameUtil.GetDynamicFName(a);
			for (const r of e) {
				var s = CharacterController_1.CharacterController.GetActor(r);
				s instanceof TsBaseCharacter_1.default &&
					-1 !== s?.Tags.FindIndex(i) &&
					(s = s.GetController()) instanceof TsAiController_1.default &&
					s.AiController &&
					(s = s?.AiController?.CharAiDesignComp?.Entity?.Id) &&
					this.PRe(s, l, o, n);
			}
		}
	}
	PRe(e, r, a, t) {
		switch (r.toLowerCase()) {
			case "string":
				BlackboardController_1.BlackboardController.SetStringValueByEntity(
					e,
					a,
					t,
				);
				break;
			case "int":
				BlackboardController_1.BlackboardController.SetIntValueByEntity(
					e,
					a,
					parseInt(t),
				);
				break;
			case "float":
				BlackboardController_1.BlackboardController.SetFloatValueByEntity(
					e,
					a,
					parseFloat(t),
				);
				break;
			case "boolean":
				BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
					e,
					a,
					"true" === t.toLowerCase(),
				);
		}
	}
}
exports.LevelEventSetBlackBoardValue = LevelEventSetBlackBoardValue;
