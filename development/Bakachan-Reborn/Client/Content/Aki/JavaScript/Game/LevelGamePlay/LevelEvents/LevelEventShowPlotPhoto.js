"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventShowPlotPhoto = void 0);
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
	PhotographController_1 = require("../../Module/Photograph/PhotographController"),
	UiManager_1 = require("../../Ui/UiManager"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventShowPlotPhoto extends LevelGeneralBase_1.LevelEventBase {
	ExecuteNew(e, o) {
		e &&
			((PhotographController_1.PhotographController.CameraCaptureType = 1),
			UiManager_1.UiManager.IsViewOpen("PhotographView") ||
				(PhotographController_1.PhotographController.TryOpenPhotograph(1) &&
					TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
						"PhotographView",
					)),
			this.FinishExecute(!0));
	}
}
exports.LevelEventShowPlotPhoto = LevelEventShowPlotPhoto;
