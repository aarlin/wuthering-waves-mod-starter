"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelEventFadeInScreen = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
	LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFadeInScreen extends LevelGeneralBase_1.LevelEventBase {
	constructor() {
		super(...arguments),
			(this.EDe = !1),
			(this.yDe = () => {
				this.FinishExecute(!0);
			});
	}
	ExecuteNew(e, n) {
		if (e) {
			let t;
			if (
				(e.KeepFadeAfterTreeEnd && (this.EDe = e.KeepFadeAfterTreeEnd),
				!this.EDe &&
					n &&
					6 === n.Type &&
					n &&
					n.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay &&
					((t = n.TreeConfigId), Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info("BlackScreen", 46, "玩法内开启黑幕：", [
						"treeId",
						n.TreeConfigId,
					]),
				(ModelManager_1.ModelManager.PlotModel.IsFadeIn = !0),
				ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent?.ExitCameraHook(
					!1,
				),
				"LevelC" ===
					ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
				void 0 !== e.TypeOverride
					? (ModelManager_1.ModelManager.PlotModel.BlackScreenType = 1)
					: (ModelManager_1.ModelManager.PlotModel.BlackScreenType = 0),
				0 === ModelManager_1.ModelManager.PlotModel.BlackScreenType)
			) {
				switch (e.ScreenType) {
					case IAction_1.EFadeInScreenShowType.White:
						ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 2;
						break;
					case IAction_1.EFadeInScreenShowType.Black:
						ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 1;
				}
				LevelLoadingController_1.LevelLoadingController.OpenLoading(
					0,
					3,
					() => {
						this.FinishExecute(!0);
					},
					e?.Ease?.Duration,
					e.ScreenType,
					!0,
					!0,
					t,
				);
			} else
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
					!0,
					this.yDe,
				);
		}
	}
	ExecuteInGm(e, n) {
		this.FinishExecute(!0);
	}
	OnUpdateGuarantee() {
		var e;
		this.EDe
			? ((e = { Name: "ActionBlackScreenFadeOut" }),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RemGuaranteeAction,
					this.Type,
					this.BaseContext,
					e,
				))
			: ((e = { Name: "ActionBlackScreenFadeOut" }),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.AddGuaranteeAction,
					this.Type,
					this.BaseContext,
					e,
				));
	}
	OnReset() {
		this.EDe = !1;
	}
}
exports.LevelEventFadeInScreen = LevelEventFadeInScreen;
