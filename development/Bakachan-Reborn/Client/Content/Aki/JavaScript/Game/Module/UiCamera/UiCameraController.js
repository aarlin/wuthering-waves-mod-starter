"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	UiCameraManager_1 = require("./UiCameraManager");
class UiCameraController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return UiCameraManager_1.UiCameraManager.Initialize(), !0;
	}
	static OnClear() {
		return UiCameraManager_1.UiCameraManager.Clear(), !0;
	}
	static OnLeaveLevel() {
		return UiCameraManager_1.UiCameraManager.Clear(), !0;
	}
}
exports.UiCameraController = UiCameraController;
