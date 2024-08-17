"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoadingView = void 0);
const UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
	HotFixSceneManager_1 = require("../../../../Launcher/Ui/HotFix/HotFixSceneManager"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	InputManager_1 = require("../../../Ui/Input/InputManager"),
	UiManager_1 = require("../../../Ui/UiManager"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoadingShowData_1 = require("../Data/LoadingShowData"),
	LoadingDefine_1 = require("../LoadingDefine");
class LoadingView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.Upi = 0),
			(this.Api = void 0),
			(this.Ppi = void 0),
			(this.xpi = void 0),
			(this.wpi = !1),
			(this.Bpi = () => {
				this.bpi();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UITexture],
			[4, UE.UIButtonComponent],
			[5, UE.UIText],
			[6, UE.UISprite],
			[7, UE.UILayoutBase],
		]),
			(this.BtnBindInfo = [[4, this.Bpi]]);
	}
	OnStartImplementImplement() {
		InputManager_1.InputManager.SetShowCursor(!0),
			ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(!0),
			ModelManager_1.ModelManager.LoadingModel.SetIsLoading(!0),
			AudioSystem_1.AudioSystem.PostEvent(LoadingDefine_1.MUSIC_EVENT),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Audio", 57, "[Game.Loading] Loading 音乐播放");
	}
	OnStart() {
		(this.Ppi = this.GetTexture(0)),
			(this.xpi = this.GetText(5)),
			(this.Api = new LoadingShowData_1.LoadingShowData()),
			this.Api.Initialize(),
			this.RootItem?.SetAlpha(1),
			this.qpi(),
			this.bpi(),
			this.Gpi(),
			this.Npi(),
			HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm();
	}
	OnAfterShow() {
		this.Opi();
	}
	OnTick(e) {
		(e /= TimeUtil_1.TimeUtil.InverseMillisecond),
			this.kpi(e),
			(this.Upi += e),
			this.Upi >= ModelManager_1.ModelManager.LoadingModel.TipTime &&
				this.bpi();
	}
	kpi(e) {
		var i = ModelManager_1.ModelManager.LoadingModel,
			t = i.CurrentProgress + i.Speed * i.SpeedRate * e;
		(t = Math.min(t, i.NextProgress)),
			(e =
				(i.CurrentProgress = t) / MathCommon_1.MathCommon.ProgressTotalValue);
		for (this.Ppi.SetFillAmount(e), this.Qbe(t); i.ReachHandleQueue.Size; ) {
			var o = i.ReachHandleQueue.Front;
			if (o[0] > t) break;
			i.ReachHandleQueue.Pop(),
				o[1](),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Loading", 17, "TickProgress", ["progress", t]);
		}
		!this.wpi &&
			t >= MathCommon_1.MathCommon.ProgressTotalValue &&
			((this.wpi = !0), UiManager_1.UiManager.CloseView(this.Info.Name));
	}
	qpi() {
		var e = ConfigManager_1.ConfigManager.LoadingConfig.GetBroadcastImageConfig(
			this.Api.GetImageId(),
		);
		this.SetTextureByPath(e.Image, this.GetTexture(3), this.Info.Name);
	}
	Gpi() {
		var e = ConfigManager_1.ConfigManager.LoadingConfig.GetBroadcastImageConfig(
			this.Api.GetImageId(),
		);
		this.SetSpriteByPath(e.Icon, this.GetSprite(6), !0, this.Info.Name);
	}
	Opi() {
		const e = this.GetLayoutBase(7);
		e?.GetRootComponent()?.SetAlpha(0),
			e?.OnLateUpdate.Bind(() => {
				e?.OnLateUpdate.Unbind(), e?.GetRootComponent()?.SetAlpha(1);
			});
	}
	bpi() {
		this.Upi = 0;
		var e = this.Api.GetNextTip();
		e &&
			(LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TipsText),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Title));
	}
	Npi() {
		var e =
			ModelManager_1.ModelManager.LoadingModel.CurrentProgress /
			MathCommon_1.MathCommon.ProgressTotalValue;
		this.Ppi.SetFillAmount(e),
			this.Qbe(ModelManager_1.ModelManager.LoadingModel.CurrentProgress);
	}
	Qbe(e) {
		(e = Math.round(e)), this.xpi.SetText(e.toString());
	}
	OnBeforeDestroyImplement() {
		AudioSystem_1.AudioSystem.ExecuteAction(LoadingDefine_1.MUSIC_EVENT, 0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Audio", 57, "[Game.Loading] Loading 音乐停止");
		var e = ModelManager_1.ModelManager.LoadingModel;
		if (e)
			for (
				e.SetIsLoading(!1),
					e.SetIsLoadingView(!1),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCursor,
					);
				e.ReachHandleQueue.Size;
			)
				e.ReachHandleQueue.Pop()[1](),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Loading", 17, "OnBeforeDestroyImplement", [
							"loadingModel.ReachHandleQueue.Size",
							e.ReachHandleQueue.Size,
						]);
	}
}
exports.LoadingView = LoadingView;
