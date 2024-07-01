"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventSetTargetPos = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetTargetPos extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, r) {
		if (e) {
			var t = e.get("xPos"),
				a = e.get("yPos"),
				o = e.get("zPos");
			if ((e = e.get("CreatureGen")) && t && a && o) {
				e = UE.KismetStringLibrary.Conv_StringToInt64(e);
				var l = new UE.Vector(parseFloat(t), parseFloat(a), parseFloat(o));
				t = new Array();
				if (
					(ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(
						e,
						t,
					),
					t.length)
				)
					for (const e of t)
						CharacterController_1.CharacterController.GetActor(
							e,
						).K2_SetActorLocation(l, !1, (0, puerts_1.$ref)(void 0), !1);
			}
		}
	}
}
exports.LevelEventSetTargetPos = LevelEventSetTargetPos;
