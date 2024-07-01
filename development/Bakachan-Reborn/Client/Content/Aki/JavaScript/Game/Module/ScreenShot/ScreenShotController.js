"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScreenShotController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	ScreenShotManager_1 = require("./ScreenShotManager");
class ScreenShotController extends ControllerBase_1.ControllerBase {
	static OnClear() {
		return ScreenShotManager_1.ScreenShotManager.Clear(), !0;
	}
	static OnLeaveLevel() {
		return ScreenShotManager_1.ScreenShotManager.Clear(), !0;
	}
}
exports.ScreenShotController = ScreenShotController;
