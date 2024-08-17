"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetRotation = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetRotation extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, t) {
		if (e) {
			var r = e.get("zOffset");
			if ((e = e.get("CreatureGen")) && r) {
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
							n = o.K2_GetActorRotation();
						(n.Yaw += parseFloat(r)), o.K2_SetActorRotation(n, !1);
					}
			}
		}
	}
}
exports.LevelEventSetRotation = LevelEventSetRotation;
