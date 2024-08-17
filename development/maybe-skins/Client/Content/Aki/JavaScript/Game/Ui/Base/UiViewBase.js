"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiViewBase = void 0);
const UE = require("ue"),
	AudioController_1 = require("../../../Core/Audio/AudioController"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	Queue_1 = require("../../../Core/Container/Queue"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController"),
	UiSceneManager_1 = require("../../Module/UiComponent/UiSceneManager"),
	UiNavigationNewController_1 = require("../../Module/UiNavigation/New/UiNavigationNewController"),
	LguiUtil_1 = require("../../Module/Util/LguiUtil"),
	UiLayerType_1 = require("../Define/UiLayerType"),
	InputDistributeController_1 = require("../InputDistribute/InputDistributeController"),
	UiLayer_1 = require("../UiLayer"),
	UiManager_1 = require("../UiManager"),
	UiBehaviorAudio_1 = require("./UiAudioState/UiBehaviorAudio"),
	UiBehaviorUiBlur_1 = require("./UiBlur/UiBehaviorUiBlur"),
	UiPanelBase_1 = require("./UiPanelBase"),
	UiViewSequence_1 = require("./UiViewSequence");
class UiViewBase extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Info = void 0),
			(this.ChildPopView = void 0),
			(this.UiViewSequence = void 0),
			(this.UiBlurBehaviour = void 0),
			(this.AudioEvent = void 0),
			(this.K_r = !0),
			(this.LastHide = !1),
			(this.PlayEventResult = new AudioController_1.PlayResult()),
			(this.Q_r = !1),
			(this.IsPreOpening = !1),
			(this.X_r = void 0),
			(this.IsExistInLeaveLevel = !1),
			(this.OpenPromise = void 0),
			(this.ClosePromise = void 0),
			(this.ShowPromise = void 0),
			(this.LoadScenePromise = void 0),
			(this.$_r = !1),
			(this.Y_r = (e, i) => {
				0 === i &&
					((this.$_r = !0),
					this.UiViewSequence.HasSequenceNameInPlaying(
						this.UiViewSequence.StartSequenceName,
					) &&
						this.UiViewSequence.StopSequenceByKey(
							this.UiViewSequence.StartSequenceName,
							!0,
							!0,
						),
					InputDistributeController_1.InputDistributeController.UnBindActions(
						this.Info.SkipAnimActions,
						this.Y_r,
					));
			}),
			(this.gjt = new Queue_1.Queue()),
			(this.SkipLoadScene = !1),
			(this.SkipReleaseScene = !1),
			(this.SceneLoaded = !1),
			(this.SkipRemoveBlackScreen = !1),
			(this.Info = e);
	}
	get IsQueueView() {
		return void 0 !== this.Info && 0 <= this.Info.SortIndex;
	}
	GetClosePromiseImplement() {
		return this.ClosePromise;
	}
	OnAddEventListener() {}
	OnRemoveEventListener() {}
	async OnPlayingStartSequenceAsync() {}
	OnAfterPlayStartSequence() {}
	OnBeforePlayCloseSequence() {}
	async OnPlayingCloseSequenceAsync() {}
	OnCheckIfNeedScene() {
		return !0;
	}
	OnHandleLoadScene() {}
	OnHandleReleaseScene() {}
	CloseMe(e) {
		this.CloseMeAsync().then(
			() => {
				e?.(!0);
			},
			(i) => {
				i instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"UiCore",
							17,
							"[CloseMe]流程执行异常",
							i,
							["error", i.message],
							["ViewName", this.Info.Name],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"UiCore",
							17,
							"[CloseMe]流程执行异常",
							["ViewName", this.Info.Name],
							["error", i],
						),
					e?.(!1);
			},
		);
	}
	async CloseMeAsync() {
		return UiManager_1.UiManager.CloseViewImplementAsync(this);
	}
	GetViewId() {
		return this.ComponentId;
	}
	PlaySequence(e, i = void 0, t = !1) {
		this.PlaySequenceAsync(e, t).then(i);
	}
	async PlaySequenceAsync(e, i = !1) {
		var t = new CustomPromise_1.CustomPromise();
		await this.UiViewSequence.PlaySequenceAsync(e, t, i);
	}
	SetAudioEvent(e) {
		this.AudioEvent = e;
	}
	RegisterUiBehavior() {
		this.J_r(), this.z_r(), this.Z_r();
	}
	eur(e, i = void 0) {
		this.PlaySequence(
			e,
			i,
			0 < (this.Info.Type & UiLayerType_1.BLOCKCLICK_TYPE),
		);
	}
	async tur(e) {
		await this.PlaySequenceAsync(
			e,
			0 < (this.Info.Type & UiLayerType_1.BLOCKCLICK_TYPE),
		);
	}
	PauseCurrentSequence() {
		this.UiViewSequence?.PauseSequence();
	}
	ResumeCurrentSequence() {
		this.UiViewSequence?.ResumeSequence();
	}
	J_r() {
		(this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
			this.UiViewSequence.SetSequenceName(this.OpenParam),
			this.AddUiBehavior(this.UiViewSequence);
	}
	z_r() {
		var e = new UiBehaviorUiBlur_1.UiBehaviourUiBlur();
		(this.UiBlurBehaviour = e).SetCurrentLayer(this.Info.Type),
			e.SetViewInfo(this),
			this.AddUiBehavior(e);
	}
	Z_r() {
		var e = new UiBehaviorAudio_1.UiBehaviorAudio(this);
		this.AddUiBehavior(e);
	}
	GetUiAudioComponent() {
		return (
			this.ChildPopView
				? this.ChildPopView.GetPopViewRootActor()
				: this.RootActor
		).GetComponentByClass(UE.UIViewAudioEffectComponent.StaticClass());
	}
	iur() {
		var e, i;
		return this.IsPreOpening
			? UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pool)
			: (e = this.GetLayer()) === UiLayerType_1.ELayerType.Float
				? (i = ConfigManager_1.ConfigManager.UiViewConfig.GetUiFloatConfig(
						this.Info.Name,
					)).OnlyShowInMain
					? UiLayer_1.UiLayer.GetFloatUnit(
							UiLayerType_1.ELayerType.BattleFloat,
							i.RootItemIndex,
						)
					: UiLayer_1.UiLayer.GetFloatUnit(
							UiLayerType_1.ELayerType.Float,
							i.RootItemIndex,
						)
				: UiLayer_1.UiLayer.GetLayerRootUiItem(e);
	}
	InitRootActorLoadInfo() {
		var e = this.Info;
		this.SetRootActorLoadInfoByPath(
			e.UiPath,
			this.iur(),
			1 === e.SourceType,
			e.IsPermanent,
		);
	}
	OnBeforeCreateImplementImplement() {}
	OnBeforeCreateImplement() {
		this.RegisterUiBehavior(),
			this.our(),
			this.OnBeforeCreateImplementImplement();
	}
	OnAfterCreateImplement() {
		(this.IsExistInLeaveLevel || UiManager_1.UiManager.IsLockOpen) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCore", 11, "场景切换过程中, 设置无缝加载标记"),
			this.rur());
	}
	rur() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiCore", 17, "SetViewPermanent", [
				"ViewName",
				this.Info.Name,
			]),
			LguiUtil_1.LguiUtil.SetActorIsPermanent(this.GetOriginalActor(), !0, !0),
			this.ChildPopView && this.ChildPopView?.SetViewPermanent();
	}
	async OnCreateAsyncImplementImplement() {}
	OnStartImplementImplement() {}
	OnStartImplement() {
		this.SetAudioEvent(this.Info.AudioEvent),
			(this.Q_r = UE.LGUIBPLibrary.GetWorldUISceneRendering(
				this.GetRootActor(),
			)),
			(this.K_r = !0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnViewLoadCompleted,
				this.Info.Name,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnViewDone,
				this.Info.Name,
				this,
			),
			this.UiViewSequence.AddSequenceStartEvent(
				this.UiViewSequence.StartSequenceName,
				() => {
					(this.$_r = !1),
						TimerSystem_1.TimerSystem.Next(() => {
							InputDistributeController_1.InputDistributeController.BindActions(
								this.Info.SkipAnimActions,
								this.Y_r,
							);
						});
				},
			),
			this.UiViewSequence.AddSequenceFinishEvent(
				this.UiViewSequence.StartSequenceName,
				() => {
					InputDistributeController_1.InputDistributeController.UnBindActions(
						this.Info.SkipAnimActions,
						this.Y_r,
					);
				},
			),
			this.OnStartImplementImplement();
	}
	OnBeforeShowImplementImplement() {}
	async OnBeforeShowAsyncImplement() {
		await this.LoadScene(),
			this.LoadScenePromise?.SetResult(void 0),
			this.SceneLoaded &&
				!this.SkipRemoveBlackScreen &&
				BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
					"Close",
					this.Info.Name,
				);
	}
	OnBeforeShowImplement() {
		this.OnAddEventListener(),
			this.OnBeforeShowImplementImplement(),
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.ApplyPerformanceLimit(this.Info.Name);
	}
	async OnShowAsyncImplementImplement() {
		this.Info.IsFullScreen &&
			UE.LGUIBPLibrary.SetIsFullScreenUIRendering(this.GetRootActor(), !0),
			this.K_r
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiCore",
							17,
							"播放界面动画Start(开始)",
							["ViewName", this.Info.Name],
							["SequenceName", this.UiViewSequence.StartSequenceName],
						),
					(!this.Info.IsPermanent && this.IsExistInLeaveLevel) ||
						(await Promise.all([
							this.tur(this.UiViewSequence.StartSequenceName),
							this.OnPlayingStartSequenceAsync(),
						])),
					this.OnAfterPlayStartSequence(),
					this.UiViewSequence?.PlaySequencePurely("AutoLoop"),
					(this.K_r = !1))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiCore",
							17,
							"播放界面动画Show(开始)",
							["ViewName", this.Info.Name],
							["SequenceName", "ShowView"],
						),
					await this.tur("ShowView")),
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.ApplyPerformanceSeqLimit(this.Info.Name),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCore", 17, "播放界面动画(结束)", [
					"ViewName",
					this.Info.Name,
				]);
	}
	TryEmitInterruptOpExitView() {
		this.$_r &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiCore", 38, "跳过界面动画Start流程,关闭界面", [
					"ViewName",
					this.Info.Name,
				]),
			UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView(),
			(this.$_r = !1));
	}
	OnShowAsyncImplementImplementCompatible() {
		this.Info.IsFullScreen &&
			UE.LGUIBPLibrary.SetIsFullScreenUIRendering(this.GetRootActor(), !0),
			this.LoadScene(),
			this.K_r
				? (this.eur(this.UiViewSequence.StartSequenceName),
					this.OnAfterPlayStartSequence(),
					this.UiViewSequence?.PlaySequencePurely("AutoLoop"),
					(this.K_r = !1))
				: this.eur("ShowView");
	}
	OnAfterShowImplement() {
		this.OpenPromise?.SetResult(void 0),
			this.ShowPromise?.SetResult(void 0),
			this.HandleAllLoadingFinishOperation();
	}
	async OnHideAsyncImplementImplement() {
		GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
			.GetCurrentQualityInfo()
			.CancelPerformanceSeqLimit(this.Info.Name),
			this.WaitToDestroy ||
				(this.LastHide
					? ((this.LastHide = !1),
						this.OnBeforePlayCloseSequence(),
						await Promise.all([this.nur(), this.OnPlayingCloseSequenceAsync()]))
					: await this.tur("HideView")),
			this.ReleaseScene(),
			this.Info.IsFullScreen &&
				UE.LGUIBPLibrary.SetIsFullScreenUIRendering(
					this.GetRootActor(),
					this.Q_r,
				);
	}
	OnHideAsyncImplementImplementCompatible() {
		GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
			.GetCurrentQualityInfo()
			.CancelPerformanceSeqLimit(this.Info.Name),
			this.LastHide
				? ((this.LastHide = !1),
					this.OnBeforePlayCloseSequence(),
					this.eur(this.UiViewSequence.CloseSequenceName))
				: this.eur("HideView"),
			this.ReleaseScene(),
			this.Info.IsFullScreen &&
				UE.LGUIBPLibrary.SetIsFullScreenUIRendering(
					this.GetRootActor(),
					this.Q_r,
				);
	}
	OnAfterHideImplementImplement() {}
	OnAfterHideImplement() {
		this.OnAfterHideImplementImplement(),
			this.OnRemoveEventListener(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnViewHidden,
				this.Info.Name,
			),
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.CancelPerformanceLimit(this.Info.Name);
	}
	async OnDestroyAsyncImplementImplement() {
		return (
			(this.ChildPopView = void 0),
			this.ResetOperationQueue(),
			UiManager_1.UiManager.RemoveView(this.GetViewId()),
			this.sur(),
			Promise.resolve()
		);
	}
	OnDestroyAsyncImplementImplementCompatible() {
		(this.ChildPopView = void 0),
			this.ResetOperationQueue(),
			UiManager_1.UiManager.RemoveView(this.GetViewId()),
			this.sur();
	}
	OnAfterDestroyImplement() {
		this.ClosePromise?.SetResult(void 0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CloseView,
				this.Info.Name,
				this.GetViewId(),
			),
			this.Info.NeedGc &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("UiCore", 38, "执行Force GC", [
						"ViewName",
						this.Info.Name,
					]),
				ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(
					0,
				),
				UE.KuroStaticLibrary.ForceGarbageCollection(!1));
	}
	AddChildViewById(e) {
		this.AddChild(UiManager_1.UiManager.GetView(e));
	}
	our() {
		this.Info?.OpenAudioEvent &&
			AudioSystem_1.AudioSystem.PostEvent(this.Info.OpenAudioEvent);
	}
	sur() {
		this.Info?.CloseAudioEvent &&
			AudioSystem_1.AudioSystem.PostEvent(this.Info.CloseAudioEvent);
	}
	async nur() {
		var e = this.UiViewSequence.CloseSequenceName;
		e && (await this.tur(e));
	}
	DeleteCloseSequence() {
		this.UiViewSequence.CloseSequenceName = void 0;
	}
	GetLayer() {
		return this.OnGetLayer();
	}
	OnGetLayer() {
		return this.Info.Type;
	}
	SetLoadingFinishOperation(e) {
		this.gjt.Push(e);
	}
	HandleAllLoadingFinishOperation() {
		for (; 0 < this.gjt.Size; ) this.gjt.Pop()?.();
	}
	ResetOperationQueue() {
		this.gjt.Clear();
	}
	WillLoadScene() {
		return (
			!this.SkipLoadScene &&
			!StringUtils_1.StringUtils.IsEmpty(this.Info.ScenePath) &&
			this.OnCheckIfNeedScene() &&
			UiSceneManager_1.UiSceneManager.CurUiSceneName !== this.Info.ScenePath
		);
	}
	WillReleaseScene() {
		return !this.SkipReleaseScene && this.SceneLoaded;
	}
	async LoadScene() {
		this.WillLoadScene()
			? ((this.SceneLoaded = !0),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiCore",
						17,
						"开始加载UI场景",
						["ViewName", this.Info.Name],
						["ScenePath", this.Info.ScenePath],
					),
				await UiSceneManager_1.UiSceneManager.LoadScene(this.Info.ScenePath),
				this.OnHandleLoadScene())
			: (this.SkipLoadScene = !1);
	}
	ReleaseScene() {
		this.WillReleaseScene()
			? ((this.SceneLoaded = !1),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiCore",
						17,
						"开始释放UI场景",
						["ViewName", this.Info.Name],
						["ScenePath", this.Info.ScenePath],
					),
				UiSceneManager_1.UiSceneManager.ExitScene(),
				this.OnHandleReleaseScene())
			: (this.SkipReleaseScene = !1);
	}
	OnPreOpen() {
		(this.IsPreOpening = !0),
			(this.X_r = TimerSystem_1.TimerSystem.Delay(() => {
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiCore",
						17,
						"[PreOpeningTimerId] 预打开界面超时未调用打开, 自动销毁界面",
						["ViewName", this.Info.Name],
					),
					this.Destroy(),
					UiManager_1.UiManager.RemovePreOpenView(this.GetViewId()),
					(this.X_r = void 0);
			}, 6e4));
	}
	OnOpenAfterPreOpened() {
		(this.IsPreOpening = !1),
			TimerSystem_1.TimerSystem.Has(this.X_r) &&
				TimerSystem_1.TimerSystem.Remove(this.X_r),
			(this.X_r = void 0),
			this.GetRootItem().SetUIParent(this.iur());
	}
	GetViewParam() {
		return this.OpenParam;
	}
	async ClearAsync() {
		await this.OpenPromise?.Promise,
			this.Destroy(() => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiCore",
						11,
						"[Clear] 完成销毁的界面",
						["Name", this.constructor.name],
						["ComponentId", this.ComponentId],
					);
			});
	}
}
exports.UiViewBase = UiViewBase;
