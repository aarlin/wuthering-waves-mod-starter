"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionFadeOutScreen = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	Global_1 = require("../../../Global"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
	FlowActionBase_1 = require("./FlowActionBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowActionFadeOutScreen extends FlowActionBase_1.FlowActionBase {
	constructor() {
		super(...arguments),
			(this.yDe = () => {
				this.FinishExecute(!0);
			});
	}
	OnExecute() {
		ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1);
		var e = this.ActionInfo.Params;
		(ModelManager_1.ModelManager.PlotModel.IsFadeIn = !1),
			1 === ModelManager_1.ModelManager.PlotModel.BlackScreenType &&
			"LevelC" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
						!1,
						this.yDe,
					)
				: ((Global_1.Global.CharacterCameraManager.FadeAmount = 0),
					LevelLoadingController_1.LevelLoadingController.CloseLoading(
						0,
						this.yDe,
						e?.Ease?.Duration,
					));
	}
	OnBackgroundExecute() {
		(ModelManager_1.ModelManager.PlotModel.IsFadeIn = !1),
			this.FinishExecute(!0);
	}
}
exports.FlowActionFadeOutScreen = FlowActionFadeOutScreen;
