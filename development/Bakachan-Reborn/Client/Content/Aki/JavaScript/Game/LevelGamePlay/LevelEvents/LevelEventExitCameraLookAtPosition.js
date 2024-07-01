"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventExitCameraLookAtPosition = void 0);
const CameraController_1 = require("../../Camera/CameraController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventExitCameraLookAtPosition extends LevelGeneralBase_1.LevelEventBase {
	Execute(e, o) {
		CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraGuide();
	}
}
exports.LevelEventExitCameraLookAtPosition = LevelEventExitCameraLookAtPosition;
