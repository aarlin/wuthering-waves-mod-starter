"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	HideActorController_1 = require("./HideActorController");
class TsHideActorBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static HideMesh() {
		HideActorController_1.HideActorController.HideMesh();
	}
	static HideEffect() {
		HideActorController_1.HideActorController.HideEffect();
	}
	static ShowMesh() {
		HideActorController_1.HideActorController.ShowMesh();
	}
	static ShowEffect() {
		HideActorController_1.HideActorController.ShowEffect();
	}
}
exports.default = TsHideActorBlueprintFunctionLibrary;
