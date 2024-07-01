"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuaranteeActionRestorePlayerCameraAdjustment = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	CameraController_1 = require("../../../Camera/CameraController"),
	RenderUtil_1 = require("../../../Render/Utils/RenderUtil"),
	GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionRestorePlayerCameraAdjustment extends GuaranteeActionBase_1.GuaranteeActionBase {
	OnExecute(e) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 40, "保底相机调整"),
			CameraController_1.CameraController.FightCamera.LogicComponent.CameraConfigController?.DisableHookConfig(),
			RenderUtil_1.RenderUtil.EnableVelocityScreenSizeCull(),
			CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraSpline(),
			CameraController_1.CameraController.FightCamera.LogicComponent.ExitDepthOfField(),
			CameraController_1.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(
				!0,
			),
			CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitFixSceneSubCamera();
	}
}
exports.GuaranteeActionRestorePlayerCameraAdjustment =
	GuaranteeActionRestorePlayerCameraAdjustment;
