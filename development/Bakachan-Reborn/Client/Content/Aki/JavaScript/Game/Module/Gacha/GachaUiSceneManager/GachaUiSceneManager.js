"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaUiSceneManager = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	CameraController_1 = require("../../../Camera/CameraController"),
	GlobalData_1 = require("../../../GlobalData"),
	RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController"),
	BlackScreenController_1 = require("../../BlackScreen/BlackScreenController"),
	UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
	GachaDefine_1 = require("../GachaDefine");
class GachaUiSceneManager {
	static async OpenUiScene() {
		const e = new CustomPromise_1.CustomPromise();
		return (
			RenderModuleController_1.RenderModuleController.DebugNewUiSceneWorkflow,
			UiSceneManager_1.UiSceneManager.OpenUiScene(
				GachaDefine_1.GACHA_3D_SCENE_PATH,
				() => {
					e.SetResult(!0);
				},
			),
			await e.Promise,
			GlobalData_1.GlobalData.World &&
				CameraController_1.CameraController.EnterCameraMode(2, 0, 2, 0),
			!0
		);
	}
	static async CloseUiScene() {
		return (
			await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
				"Start",
				"GachaScene",
			),
			GlobalData_1.GlobalData.World &&
				(CameraController_1.CameraController.ExitCameraMode(2, 0, 2, 0),
				CameraController_1.CameraController.WidgetCamera.GetComponent(
					12,
				).CineCamera.CameraComponent.SetFieldOfView(90)),
			UiSceneManager_1.UiSceneManager.ForceCloseUiScene(),
			BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
				"Close",
				"GachaScene",
			),
			!0
		);
	}
}
exports.GachaUiSceneManager = GachaUiSceneManager;
