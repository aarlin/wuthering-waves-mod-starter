"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetOffset = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetOffset extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, r) {
		if (e) {
			var t = e.get("zOffset");
			if ((e = e.get("CreatureGen")) && t) {
				e = UE.KismetStringLibrary.Conv_StringToInt64(e);
				var a = new Array();
				if (
					(ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(
						e,
						a,
					),
					a.length)
				)
					for (const e of a) {
						var o = CharacterController_1.CharacterController.GetActor(e),
							n = o.K2_GetActorLocation();
						(n.Z += parseFloat(t)),
							o.K2_SetActorLocation(n, !1, (0, puerts_1.$ref)(void 0), !1);
					}
			}
		}
	}
}
exports.LevelEventSetOffset = LevelEventSetOffset;
