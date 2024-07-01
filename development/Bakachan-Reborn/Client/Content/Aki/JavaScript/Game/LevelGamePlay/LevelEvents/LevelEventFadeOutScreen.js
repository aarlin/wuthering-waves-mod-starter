"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventFadeOutScreen = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFadeOutScreen extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.yDe = () => {
				this.FinishExecute(!0);
			});
	}
	ExecuteNew(e, n) {
		e &&
			((ModelManager_1.ModelManager.PlotModel.IsFadeIn = !1),
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
						() => {
							this.FinishExecute(!0),
								(ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0);
						},
						e?.Ease?.Duration,
					)));
	}
	ExecuteInGm(e, n) {
		LevelLoadingController_1.LevelLoadingController.CloseLoading(
			0,
			() => {
				this.FinishExecute(!0),
					(ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0);
			},
			0,
		);
	}
	OnUpdateGuarantee() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RemGuaranteeAction,
			this.Type,
			this.BaseContext,
			{ Name: "ActionBlackScreenFadeOut" },
		);
	}
}
exports.LevelEventFadeOutScreen = LevelEventFadeOutScreen;
