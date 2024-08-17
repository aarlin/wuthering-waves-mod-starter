"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class AiWeaponBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static CharacterRequestPickUpAiWeapon(e, r) {
		ModelManager_1.ModelManager.AiWeaponModel.Net.SendHoldWeaponPush(e, r);
	}
}
exports.default = AiWeaponBlueprintFunctionLibrary;
