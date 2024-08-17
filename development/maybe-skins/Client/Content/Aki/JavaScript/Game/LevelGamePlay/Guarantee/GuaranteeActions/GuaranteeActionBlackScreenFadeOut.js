"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuaranteeActionBlackScreenFadeOut = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Global_1 = require("../../../Global"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelLoadingController_1 = require("../../../Module/LevelLoading/LevelLoadingController"),
	GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionBlackScreenFadeOut extends GuaranteeActionBase_1.GuaranteeActionBase {
	OnExecute(e) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 46, "保底黑幕结束"),
			(ModelManager_1.ModelManager.PlotModel.IsFadeIn = !1),
			(Global_1.Global.CharacterCameraManager.FadeAmount = 0),
			LevelLoadingController_1.LevelLoadingController.CloseLoading(
				0,
				() => {
					ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0;
				},
				1,
			);
	}
}
exports.GuaranteeActionBlackScreenFadeOut = GuaranteeActionBlackScreenFadeOut;
