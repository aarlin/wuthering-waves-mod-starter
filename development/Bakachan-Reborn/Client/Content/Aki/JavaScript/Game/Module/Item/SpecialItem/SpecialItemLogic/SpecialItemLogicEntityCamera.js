"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialItemLogicEntityCamera = void 0);
const UiManager_1 = require("../../../../Ui/UiManager"),
	TsInteractionUtils_1 = require("../../../Interaction/TsInteractionUtils"),
	PhotographController_1 = require("../../../Photograph/PhotographController"),
	SpecialItemLogicBase_1 = require("./SpecialItemLogicBase");
class SpecialItemLogicEntityCamera extends SpecialItemLogicBase_1.SpecialItemLogicBase {
	CheckUseCondition() {
		return !0;
	}
	OnUse() {
		UiManager_1.UiManager.IsViewOpen("PhotographView") ||
			(PhotographController_1.PhotographController.TryOpenPhotograph(1) &&
				TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(
					"PhotographView",
				));
	}
}
exports.SpecialItemLogicEntityCamera = SpecialItemLogicEntityCamera;
