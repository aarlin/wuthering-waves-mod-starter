"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackScreenFadeView = void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	UiManager_1 = require("../../Ui/UiManager"),
	ColorUtils_1 = require("../../Utils/ColorUtils"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	BlackScreenFadeController_1 = require("./BlackScreenFadeController"),
	BlackScreenViewData_1 = require("./BlackScreenViewData"),
	GUARANTEED_TIME = 1e4,
	MAX_FADE_VALUE = 0.9;
class BlackScreenFadeView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.zCt = 0),
			(this.ZCt = 0),
			(this.egt = 0),
			(this.a1e = !0),
			(this.tgt = TickSystem_1.TickSystem.InvalidId),
			(this.igt = TickSystem_1.TickSystem.InvalidId),
			(this.ogt = new BlackScreenViewData_1.BlackScreenViewData()),
			(this.rgt = void 0),
			(this.ngt = () => {
				this.a1e
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("BlackScreen", 46, "黑幕FadeIn结束"),
						ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise())
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("BlackScreen", 46, "黑幕FadeOut结束"),
						ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraHidePromise(),
						this.SetActive(!1),
						(BlackScreenFadeController_1.BlackScreenFadeController.NeedInputDis =
							!1),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnBlackFadeScreenFinish,
						),
						ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("BlackScreen", 46, "黑幕输入恢复", [
								"BlackScreenFadeController.NeedInputDis",
								BlackScreenFadeController_1.BlackScreenFadeController
									.NeedInputDis,
							]),
						UiManager_1.UiManager.RemoveOpenViewCheckFunction(
							"All",
							BlackScreenFadeController_1.BlackScreenFadeController
								.CheckCanOpen,
						));
			}),
			(this.sgt = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("BlackScreen", 46, "开始显示黑屏"),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnBlackFadeScreenStart,
					),
					this.agt(this.tgt),
					this.SetActive(!0);
			}),
			(this.hgt = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("BlackScreen", 46, "开始隐藏黑屏"),
					this.SetActive(!0),
					this.agt(this.tgt);
			}),
			(this.lgt = (e) => {
				0 < this.ZCt && (this.ZCt -= e),
					this.ZCt <= 0 &&
						((this.ZCt = 0),
						this.a1e && (Global_1.Global.CharacterCameraManager.FadeAmount = 0),
						this.ngt(),
						this._gt(this.tgt)),
					this.ugt();
			}),
			(this.cgt = (e) => {
				(this.zCt += e),
					this.zCt > 1e4 &&
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("BlackScreen", 46, "触发保底机制,内部隐藏黑屏"),
						this.HideItem());
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	OnStart() {
		this.ogt.RegisterStateDelegate(2, this.sgt),
			this.ogt.RegisterStateDelegate(4, this.hgt),
			(this.rgt = this.GetTexture(0)),
			LguiUtil_1.LguiUtil.SetActorIsPermanent(this.RootActor, !0, !0),
			this.ogt.TriggerCurrentStateDelegate();
	}
	OnBeforeDestroy() {
		(ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise =
			void 0),
			(ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise =
				void 0),
			(this.a1e = !0),
			(this.egt = 0),
			(this.ZCt = 0),
			(this.rgt = void 0),
			this._gt(this.tgt),
			this._gt(this.igt);
	}
	agt(e) {
		e === TickSystem_1.TickSystem.InvalidId &&
			(e === this.tgt
				? (InputDistributeController_1.InputDistributeController.RefreshInputTag(),
					(this.tgt = TickSystem_1.TickSystem.Add(
						this.lgt,
						"BlackScreenTransitionView",
						0,
						!0,
					).Id))
				: e === this.igt &&
					(this.igt = TickSystem_1.TickSystem.Add(
						this.cgt,
						"BlackScreenTransitionView",
						0,
						!0,
					).Id));
	}
	_gt(e) {
		e !== TickSystem_1.TickSystem.InvalidId &&
			(e === this.tgt
				? (TickSystem_1.TickSystem.Remove(this.tgt),
					(this.tgt = TickSystem_1.TickSystem.InvalidId),
					this.a1e ||
						InputDistributeController_1.InputDistributeController.RefreshInputTag())
				: e === this.igt &&
					(TickSystem_1.TickSystem.Remove(this.igt),
					(this.igt = TickSystem_1.TickSystem.InvalidId)));
	}
	ShowItem() {
		this.ogt.SwitchState(2);
	}
	HideItem() {
		var e = this.ogt.SwitchState(4);
		(ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeHidePromise =
			new CustomPromise_1.CustomPromise()),
			e ||
				(ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise(),
				ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraHidePromise());
	}
	UpdateScreenColor(e) {
		switch (e) {
			case IAction_1.EFadeInScreenShowType.Black:
				this.rgt?.SetColor(ColorUtils_1.ColorUtils.ColorBlack),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("BlackScreen", 46, "改变黑幕颜色为黑色");
				break;
			case IAction_1.EFadeInScreenShowType.White:
				this.rgt?.SetColor(ColorUtils_1.ColorUtils.ColorWhile),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("BlackScreen", 46, "改变黑幕颜色为白色");
		}
	}
	ugt() {
		var e = this.mgt();
		this.rgt?.SetAlpha(e);
	}
	mgt() {
		return this.a1e
			? Global_1.Global.CharacterCameraManager.FadeAmount >= 0.9 ||
				0 === this.egt
				? 1
				: 1 - MathUtils_1.MathUtils.GetRangePct(0, this.egt, this.ZCt)
			: 0 === this.egt
				? 0
				: MathUtils_1.MathUtils.GetRangePct(0, this.egt, this.ZCt);
	}
	SetFadeTime(e) {
		(this.ZCt = e),
			(this.egt = e),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"BlackScreen",
					46,
					"现在的Fade时间为：",
					["this.FadeTime", this.ZCt],
					["this.FullFadeTime", this.egt],
				);
	}
	SetIsFadeIn(e) {
		this.a1e = e;
	}
}
exports.BlackScreenFadeView = BlackScreenFadeView;
