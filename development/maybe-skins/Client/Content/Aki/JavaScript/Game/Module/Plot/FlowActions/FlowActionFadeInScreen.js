"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowActionFadeInScreen = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
	FlowActionBase_1 = require("./FlowActionBase"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowActionFadeInScreen extends FlowActionBase_1.FlowActionBase {
	constructor() {
		super(...arguments),
			(this.yDe = () => {
				this.FinishExecute(!0);
			});
	}
	OnExecute() {
		ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1);
		var e = this.ActionInfo.Params;
		(ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
			(ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1),
			"LevelC" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
			void 0 !== e.TypeOverride
				? (ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1)
				: (ModelManager_1.ModelManager.PlotModel.BlackScreenType = 0),
			0 === ModelManager_1.ModelManager.PlotModel.BlackScreenType
				? LevelLoadingController_1.LevelLoadingController.OpenLoading(
						0,
						3,
						this.yDe,
						e?.Ease?.Duration,
						e?.ScreenType
							? e.ScreenType
							: LevelLoadingController_1.LevelLoadingController.CameraFade.ColorSearch(),
					)
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
						!0,
						this.yDe,
					);
	}
	OnBackgroundExecute() {
		(ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
			this.FinishExecute(!0);
	}
}
exports.FlowActionFadeInScreen = FlowActionFadeInScreen;
