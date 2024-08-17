"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuaranteeActionExitOrbitalCamera = void 0);
const CameraController_1 = require("../../../Camera/CameraController"),
	GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionExitOrbitalCamera extends GuaranteeActionBase_1.GuaranteeActionBase {
	OnExecute(e) {
		CameraController_1.CameraController.OrbitalCamera.PlayerComponent.StopCameraOrbital();
	}
}
exports.GuaranteeActionExitOrbitalCamera = GuaranteeActionExitOrbitalCamera;
