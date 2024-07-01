"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackScreenTransitionView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../Util/LguiUtil"),
	BlackScreenGlobalData_1 = require("./BlackScreenGlobalData"),
	BlackScreenViewData_1 = require("./BlackScreenViewData");
class BlackScreenTransitionView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.EPe = void 0),
			(this.ggt = "None"),
			(this.fgt = "None"),
			(this.ogt = new BlackScreenViewData_1.BlackScreenViewData()),
			(this.ngt = (e) => {
				e === this.ggt
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("BlackScreen", 11, "开始动画结束", [
								"动画名称",
								e,
							]),
						BlackScreenGlobalData_1.BlackScreenGlobalData.FinishShowPromise())
					: e === this.fgt &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("BlackScreen", 11, "关闭动画结束", [
								"动画名称",
								e,
							]),
						BlackScreenGlobalData_1.BlackScreenGlobalData.FinishHidePromise(),
						this.GetTexture(0).SetAlpha(1),
						this.SetUiActive(!1));
			}),
			(this.pgt = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("BlackScreen", 11, "开始显示黑屏"),
					this.SetUiActive(!0),
					BlackScreenGlobalData_1.BlackScreenGlobalData.FinishShowPromise();
			}),
			(this.sgt = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("BlackScreen", 11, "开始显示黑屏", [
						"动画名称",
						this.ggt.toString(),
					]),
					this.SetUiActive(!0),
					this.EPe.PlayLevelSequenceByName(this.ggt.toString());
			}),
			(this.vgt = () => {
				this.EPe.StopCurrentSequence(!0, !0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("BlackScreen", 11, "开始隐藏黑屏"),
					this.GetTexture(0).SetAlpha(1),
					this.SetUiActive(!1),
					BlackScreenGlobalData_1.BlackScreenGlobalData.FinishHidePromise();
			}),
			(this.hgt = () => {
				this.EPe.StopCurrentSequence(!0, !0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("BlackScreen", 11, "开始隐藏黑屏", [
							"动画名称",
							this.fgt.toString(),
						]),
					this.EPe.PlayLevelSequenceByName(this.fgt.toString());
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [[0, UE.UITexture]];
	}
	OnStart() {
		(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
			this.EPe.BindSequenceCloseEvent(this.ngt),
			this.ogt.RegisterStateDelegate(1, this.pgt),
			this.ogt.RegisterStateDelegate(2, this.sgt),
			this.ogt.RegisterStateDelegate(3, this.vgt),
			this.ogt.RegisterStateDelegate(4, this.hgt),
			this.GetTexture(0).SetAlpha(1),
			LguiUtil_1.LguiUtil.SetActorIsPermanent(this.RootActor, !0, !0),
			this.ogt.TriggerCurrentStateDelegate();
	}
	OnBeforeDestroy() {
		BlackScreenGlobalData_1.BlackScreenGlobalData.ResetGlobalData(),
			this.EPe?.Clear();
	}
	ShowTemp(e) {
		BlackScreenGlobalData_1.BlackScreenGlobalData.CreateShowPromise();
		var t = this.ggt;
		e = "None" !== (this.ggt = e);
		this.ogt.SwitchState(e ? 2 : 1) || (this.ggt = t);
	}
	HideTemp(e) {
		BlackScreenGlobalData_1.BlackScreenGlobalData.CreateHidePromise();
		var t = this.fgt;
		e = "None" !== (this.fgt = e);
		this.ogt.SwitchState(e ? 4 : 3) || (this.fgt = t);
	}
}
exports.BlackScreenTransitionView = BlackScreenTransitionView;
