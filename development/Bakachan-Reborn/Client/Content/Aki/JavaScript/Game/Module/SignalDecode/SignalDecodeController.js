"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDecodeController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiManager_1 = require("../../Ui/UiManager");
class SignalDecodeController extends ControllerBase_1.ControllerBase {
	static Open(e) {
		ModelManager_1.ModelManager.SignalDecodeModel.GameplayStart(e),
			UiManager_1.UiManager.OpenView("SignalDecodeView");
	}
}
exports.SignalDecodeController = SignalDecodeController;
