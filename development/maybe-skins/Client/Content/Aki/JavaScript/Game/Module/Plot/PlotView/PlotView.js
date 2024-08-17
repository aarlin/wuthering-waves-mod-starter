"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	InputController_1 = require("../../../Input/InputController"),
	InputEnums_1 = require("../../../Input/InputEnums"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
	UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	PlotController_1 = require("../PlotController"),
	PlotOptionItem_1 = require("./PlotOptionItem"),
	PlotSkipComponent_1 = require("./PlotSkipComponent"),
	PlotTextLogic_1 = require("./PlotTextLogic"),
	FADE_TIME = 1e3,
	ROTATE_RATE = 0.1,
	ZOOM_RATE = 1.2,
	DEFAULT_PATH =
		"/Game/Aki/UI/UIResources/Common/Image/T_CommonDefault_UI.T_CommonDefault_UI",
	CLICK_AUDIO_EVENT = "play_ui_ia_spl_plot_next";
class PlotView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.hZi = void 0),
			(this.CurOption = new Array()),
			(this.lZi = void 0),
			(this.Ozi = void 0),
			(this.InteractController = void 0),
			(this._Zi = void 0),
			(this.uZi = 0),
			(this.cZi = !1),
			(this.mZi = void 0),
			(this.dZi = void 0),
			(this.CZi = void 0),
			(this.gZi = !1),
			(this.fZi = void 0),
			(this.vZi = void 0),
			(this.PPn = !1),
			(this.wPn = !1),
			(this.EZi = void 0),
			(this.yZi = void 0),
			(this.IZi = void 0),
			(this.TZi = void 0),
			(this.LZi = void 0),
			(this.DZi = void 0),
			(this.RZi = void 0),
			(this.UZi = void 0),
			(this.AZi = void 0),
			(this.PZi = 0),
			(this.xZi = 0),
			(this.wZi = !1),
			(this.BZi = !1),
			(this.cot = !0),
			(this.bZi = !1),
			(this.qZi = void 0),
			(this.GZi = !1),
			(this.w6i = void 0),
			(this.jLn = () => {
				this.gZi || this.CZi.SetActive(!1);
			}),
			(this.NZi = () => {
				var t = new PlotOptionItem_1.PlotOptionItem(this);
				return t.BindOnHover(this.OZi), t;
			}),
			(this.OZi = (t) => {
				this.hZi?.SetFollowItemActive(!1),
					(this.hZi = t).SetFollowItemActive(!0);
			}),
			(this.B6i = (t) => {
				this.w6i = t.GetLocalPointInPlane();
			}),
			(this.O6i = (t) => {
				(t = 1.2 * t.scrollAxisValue),
					InputController_1.InputController.InputAxis(
						InputEnums_1.EInputAxis.Zoom,
						t,
					);
			}),
			(this.b6i = (t) => {
				var e;
				1 < TouchFingerManager_1.TouchFingerManager.GetTouchFingerCount()
					? (this.w6i = void 0)
					: ((e = this.w6i),
						(this.w6i = t.GetLocalPointInPlane()),
						e &&
							((t = 0.1 * (this.w6i.Y - e.Y)),
							(e = 0.1 * (this.w6i.X - e.X)),
							InputController_1.InputController.InputAxis(
								InputEnums_1.EInputAxis.Turn,
								e,
							),
							InputController_1.InputController.InputAxis(
								InputEnums_1.EInputAxis.LookUp,
								-t,
							)));
			}),
			(this.q6i = (t) => {
				this.w6i = void 0;
			}),
			(this.kZi = () => {
				this.hZi?.SetFollowItemActive(!1);
				var t = this.CZi.GetDisplayGridEndIndex();
				for (let i = 0; i <= t; i++) {
					var e = this.CZi.GetLayoutItemByIndex(i);
					if (e?.GetActive())
						return (
							(this.hZi = e),
							this.hZi?.SetFollowItemActive(!0),
							void UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
								this.hZi.GetToggleItem().GetRootComponent(),
							)
						);
				}
			}),
			(this.FZi = () => {
				ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
					"UI点击跳过(PlotView)",
				);
			}),
			(this.VZi = () => {
				this.fZi.EnableSkipButton(!1);
				var t = ModelManager_1.ModelManager.PlotModel.PlotConfig.CanPause;
				this.GetExtendToggle(0).RootUIComp.SetUIActive(t),
					this.GetButton(16).RootUIComp.SetUIActive(t),
					this.GetButton(1).RootUIComp.SetUIActive(!0),
					this.HZi(),
					(this.GZi = !0),
					this.GetSprite(9).SetUIActive(this.GZi);
			}),
			(this.jZi = (t) => {
				this.WZi(),
					(this.cZi = !1),
					this.vZi.UpdatePlotSubtitle(t),
					this.KZi(t);
			}),
			(this.QZi = () => {
				this.HasOptions &&
					(this.SetOptionsShow(!0),
					(this.CurOption = this.XZi(this.vZi.CurrentContent.Options)),
					this.CZi.RefreshByData(this.CurOption, this.kZi));
			}),
			(this.$Zi = (t, e) => {
				this.vZi.HandlePortraitVisible(this.RootItem, t, e);
			}),
			(this.YZi = (t) => {
				(this.vZi.IsInteraction = !0),
					(this.InteractController = t),
					(this._Zi = PlotController_1.PlotController.GetTalkItemsOfFlow(
						this.InteractController.PreTalkConfigs,
					)),
					(this.uZi = -1),
					this._Zi
						? ((ModelManager_1.ModelManager.PlotModel.FlowListName =
								this.InteractController.PreTalkConfigs.FlowListName),
							this.JZi())
						: this.zZi();
			}),
			(this.pzi = () => {
				this.vZi.IsInteraction
					? this.ZZi()
					: this.cZi &&
						(this.HasOptions
							? (this.eeo(!1), this.teo())
							: ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay &&
								this.ZZi());
			}),
			(this.OnBtnSubtitleSkipClick = () => {
				if (this.vZi.IsInteraction) {
					if (!this._Zi || this.uZi >= this._Zi.length) return;
				} else if (
					!ControllerHolder_1.ControllerHolder.FlowController.IsInShowTalk()
				)
					return;
				this.cZi
					? void 0 !== this.vZi.SubtitleAnimationTimer
						? this.vZi.ForceSkipPlotContentAnim()
						: (this.eeo(!1),
							this.teo(),
							AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT))
					: void 0 !== this.Ozi &&
						void 0 === this.vZi.SubtitleAnimationTimer &&
						Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							27,
							"当前字幕已显示完全，但等待时间未结束，无法点到下一句",
							["TalkId", this.vZi.CurrentContent.Id],
							["WaitTime", this.vZi.CurrentContent.WaitTime],
							["AnimationTime", this.vZi.GetPlotContentAnimDuration()],
						);
			}),
			(this.OnBtnAutoClick = () => {
				var t = !ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay;
				(ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = t),
					(ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlayCache = t)
						? (this.vZi.IsTextAnimPlaying ||
								this.HasOptions ||
								this.OnBtnSubtitleSkipClick(),
							this.GetItem(14).SetUIActive(!0))
						: (this.WZi(), this.GetItem(14).SetUIActive(!1));
			}),
			(this.ieo = () => {
				(ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = !1),
					(ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlayCache =
						!1),
					this.WZi(),
					this.HZi();
			}),
			(this.oeo = () => {
				this.H7s(), (this.cot = !1);
				var t = ModelManager_1.ModelManager.PlotModel.PlotConfig;
				(t.IsAutoPlay = !1), (t.IsAutoPlayCache = !1), this.HZi();
			}),
			(this.$Ji = (t) => {
				this.RootItem.SetUIActive(!t);
			}),
			(this.eUt = (t) => {
				!t || this.cot || ((this.cot = !0), this.j7s());
			}),
			(this.reo = (t, e) => {
				0 !== e.TouchType || this.cot || ((this.cot = !0), this.j7s());
			}),
			(this.neo = async (t, e, i, o) => {
				this.seo(),
					(this.wZi = t),
					(this.qZi = e),
					t
						? e
							? await this.FadeInBgPhoto(i, o)
							: await this.FadeInBgPhotoMiddle(i, o)
						: ((this.qZi = !0),
							await this.FadeOutBgPhoto(),
							(this.qZi = !1),
							await this.FadeOutBgPhotoMiddle(),
							o && o());
			}),
			(this.aeo = async (t, e) => {
				(this.BZi = t)
					? await this.FadeInBgBlackScreen(e)
					: await this.FadeOutBgBlackScreen(e);
			}),
			(this.heo = () => {
				this.leo(), this.vZi.ClearPlotContent();
			}),
			(this._eo = (t) => {
				this.PZi < 0 && (this.PZi = 0),
					this.PZi > 1e3 && (this.PZi = 1e3),
					this.wZi
						? ((this.PZi += t),
							this.qZi
								? 1 < this.ueo() && (this.ceo(), this.meo())
								: 1 < this.deo() && (this.ceo(), this.meo()))
						: ((this.PZi -= t),
							this.qZi
								? this.ueo() <= 0 && (this.ceo(), this.meo())
								: this.deo() <= 0 && (this.ceo(), this.meo()));
			}),
			(this.meo = () => {
				this.qZi
					? this.wZi && this.RZi
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("BlackScreen", 46, "Plot图片FadeIn结束"),
							this.bZi &&
								(this.EZi.SetTexture(this.yZi.GetTexture()),
								this.yZi.SetAlpha(0)),
							this.RZi.SetResult(!0),
							(this.RZi = void 0),
							(this.bZi = !0))
						: !this.wZi &&
							this.DZi &&
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("BlackScreen", 46, "Plot图片FadeOut结束"),
							this.DZi.SetResult(!0),
							(this.DZi = void 0),
							this.SetTextureByPath(DEFAULT_PATH, this.EZi),
							(this.bZi = !1))
					: this.wZi && this.RZi
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("BlackScreen", 46, "Plot Middle图片FadeIn结束"),
							this.bZi,
							this.RZi.SetResult(!0),
							(this.RZi = void 0),
							(this.bZi = !0))
						: !this.wZi &&
							this.DZi &&
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("BlackScreen", 46, "Plot Middle图片FadeOut结束"),
							this.TZi?.SetUIActive(!1),
							this.DZi.SetResult(!0),
							(this.DZi = void 0),
							this.SetTextureByPath(DEFAULT_PATH, this.IZi),
							(this.bZi = !1)),
					this.UZi && this.UZi();
			}),
			(this.Ceo = (t) => {
				this.xZi < 0 && (this.xZi = 0),
					this.xZi > 1e3 && (this.xZi = 1e3),
					this.BZi
						? ((this.xZi += t), 1 < this.geo() && (this.feo(), this.peo()))
						: ((this.xZi -= t), this.geo() < 0 && (this.feo(), this.peo()));
			}),
			(this.peo = () => {
				this.BZi && this.RZi
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("BlackScreen", 46, "Plot黑幕FadeIn结束"),
						this.RZi.SetResult(!0),
						(this.RZi = void 0))
					: !this.BZi &&
						this.DZi &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("BlackScreen", 46, "Plot黑幕FadeOut结束"),
						this.DZi.SetResult(!0),
						(this.DZi = void 0)),
					this.AZi && this.AZi();
			});
	}
	get Options() {
		return this.CZi?.GetLayoutItemList();
	}
	get CurrentSubtitle() {
		return this.vZi.CurrentContent;
	}
	get HasOptions() {
		return (
			!(!this.CurrentSubtitle || !this.CurrentSubtitle.Options) &&
			0 !== this.CurrentSubtitle.Options.length
		);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UILayoutBase],
			[8, UE.UIItem],
			[9, UE.UISprite],
			[10, UE.UIItem],
			[11, UE.UIItem],
			[12, UE.UIText],
			[13, UE.UIItem],
			[14, UE.UIItem],
			[15, UE.UIText],
			[16, UE.UIButtonComponent],
			[17, UE.UIItem],
			[18, UE.UIItem],
			[19, UE.UISprite],
			[20, UE.UITexture],
			[21, UE.UITexture],
			[22, UE.UIItem],
			[23, UE.UITexture],
			[24, UE.UISprite],
			[25, UE.UIScrollViewComponent],
			[26, UE.UIItem],
			[27, UE.UIItem],
			[28, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[1, this.OnBtnSubtitleSkipClick],
				[0, this.OnBtnAutoClick],
				[16, this.oeo],
			]);
	}
	OnStart() {
		var t = this.GetScrollView(25);
		t?.SetCanScroll(!1),
			t?.SetRayCastTargetForScrollView(!1),
			(this.vZi = new PlotTextLogic_1.PlotTextCommonLogic(
				this.GetItem(3),
				this.GetText(4),
				this.GetText(15),
				this.GetText(5),
				this.GetItem(11),
				t,
				this.GetItem(26),
			)),
			this.vZi.SetPlotContentAnimFinishCallback(this.pzi),
			(this.CZi = new GenericLayout_1.GenericLayout(
				this.GetLayoutBase(7),
				this.NZi,
				this.GetItem(6).GetOwner(),
			)),
			this.GetButton(2).RootUIComp.SetUIActive(!1),
			(this.fZi = new PlotSkipComponent_1.PlotSkipComponent(
				this.GetButton(2),
				this.FZi,
				this.ieo,
			)),
			this.fZi.EnableSkipButton(!1),
			(this.mZi = this.GetItem(17)),
			this.eeo(!1),
			this.veo(!1),
			this.GetItem(6).SetUIActive(!1),
			this.GetLayoutBase(7).RootUIComp.SetAlpha(1),
			this.CZi.SetActive(!1),
			(this.gZi = !1),
			this.VZi(),
			this.AddScreenEffectPlotRoot(),
			(this.PZi = 0),
			(this.xZi = 0),
			(this.EZi = this.GetTexture(20)),
			this.EZi && this.EZi.SetAlpha(0),
			(this.yZi = this.GetTexture(21)),
			this.yZi && this.yZi.SetAlpha(0),
			(this.IZi = this.GetTexture(23)),
			this.IZi && this.IZi.SetAlpha(0),
			(this.TZi = this.GetSprite(24)),
			this.TZi && this.TZi.SetUIActive(!1),
			(this.LZi = this.GetSprite(19)),
			this.LZi && this.LZi.SetAlpha(0),
			(this.cot = !0),
			this.UiViewSequence.AddSequenceFinishEvent("ChoiceClose", this.jLn);
	}
	Meo(t) {
		t !== this.GZi &&
			((this.GZi = t), this.PlaySequence(t ? "PlotStart" : "PlotClose"));
	}
	async OnPlayingStartSequenceAsync() {
		this.OpenParam?.DisableAnim ||
			(await this.PlaySequenceAsync("Start01", !0));
	}
	async OnPlayingCloseSequenceAsync() {
		await this.vZi.DestroyPortraitItem(),
			this.OpenParam?.DisableAnim ||
				(await this.PlaySequenceAsync("Close01", !0));
	}
	OnAfterShow() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PlotViewChange,
			this.Info.Name,
			!0,
		);
	}
	OnBeforeHide() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PlotViewChange,
			this.Info.Name,
			!1,
		),
			this.SetTextureByPath(DEFAULT_PATH, this.EZi),
			this.SetTextureByPath(DEFAULT_PATH, this.yZi),
			this.SetTextureByPath(DEFAULT_PATH, this.IZi),
			(this.bZi = !1),
			(this.PZi = 0),
			(this.xZi = 0),
			this.ceo(),
			this.feo(),
			this.vZi.ClearPlotContent(),
			this.leo(),
			this.CZi.SetActive(!1);
	}
	OnBeforeDestroy() {
		this.vZi.Clear(),
			this.RemoveScreenEffectPlotRoot(),
			(this.InteractController = void 0),
			(this.DZi = void 0),
			(this.RZi = void 0),
			(this.CZi = void 0),
			this.fZi?.OnClear(),
			(this.fZi = void 0);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlotConfigChanged,
			this.VZi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdatePlotSubtitle,
				this.jZi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ShowPlotSubtitleOptions,
				this.QZi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdatePortraitVisible,
				this.$Zi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearPlotSubtitle,
				this.heo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TriggerPlotInteraction,
				this.YZi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.HidePlotUi,
				this.$Ji,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnInputAnyKey,
				this.eUt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotViewBgFadePhoto,
				this.neo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
				this.aeo,
			),
			InputDistributeController_1.InputDistributeController.BindTouch(
				InputMappingsDefine_1.touchIdMappings.Touch1,
				this.reo,
			),
			this.fZi.AddEventListener();
		var t = this.GetButton(1)
			.RootUIComp.GetOwner()
			.GetComponentByClass(UE.UIDraggableComponent.StaticClass());
		t &&
			(t.OnPointerBeginDragCallBack.Bind(this.B6i),
			t.OnPointerDragCallBack.Bind(this.b6i),
			t.OnPointerEndDragCallBack.Bind(this.q6i),
			t.OnPointerScrollCallBack.Bind(this.O6i));
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlotConfigChanged,
			this.VZi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdatePlotSubtitle,
				this.jZi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ShowPlotSubtitleOptions,
				this.QZi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdatePortraitVisible,
				this.$Zi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ClearPlotSubtitle,
				this.heo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TriggerPlotInteraction,
				this.YZi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.HidePlotUi,
				this.$Ji,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnInputAnyKey,
				this.eUt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotViewBgFadePhoto,
				this.neo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotViewBgFadeBlackScreen,
				this.aeo,
			),
			this.fZi.RemoveEventListener(),
			InputDistributeController_1.InputDistributeController.UnBindTouch(
				InputMappingsDefine_1.touchIdMappings.Touch1,
				this.reo,
			);
		var t = this.GetButton(1)
			.RootUIComp.GetOwner()
			.GetComponentByClass(UE.UIDraggableComponent.StaticClass());
		t &&
			(t.OnPointerDragCallBack.Unbind(),
			t.OnPointerEndDragCallBack.Unbind(),
			t.OnPointerUpCallBack.Unbind(),
			t.OnPointerScrollCallBack.Unbind());
	}
	OnTick(t) {
		this.wPn && this._eo(t), this.PPn && this.Ceo(t);
	}
	SimulateClickSubtitle() {
		Info_1.Info.IsBuildDevelopmentOrDebug && this.OnBtnSubtitleSkipClick();
	}
	SimulateClickOption() {
		if (Info_1.Info.IsBuildDevelopmentOrDebug)
			for (let e = this.Options.length - 1; 0 <= e; --e) {
				var t = this.Options[e];
				t.CheckToggleGray() || t.OptionClick(!0);
			}
	}
	H7s() {
		this.GetItem(27)?.SetUIActive(!1), this.GetItem(28)?.SetUIActive(!1);
	}
	j7s() {
		this.GetItem(27)?.SetUIActive(!0), this.GetItem(28)?.SetUIActive(!0);
	}
	HZi() {
		var t = this.GetExtendToggle(0);
		ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay
			? (t.SetToggleState(0), this.GetItem(14).SetUIActive(!0))
			: (t.SetToggleState(1), this.GetItem(14).SetUIActive(!1));
	}
	XZi(t) {
		var e = new Array();
		for (const i of t)
			ModelManager_1.ModelManager.PlotModel.CheckOptionCondition(
				i,
				this.CurrentSubtitle,
			) && e.push(i);
		return e;
	}
	KZi(t) {
		if ("Option" === t.Type) this.Meo(!1), this.teo();
		else if (
			(this.seo(),
			this.Meo(!0),
			this.vZi.IsInteraction ||
				!ModelManager_1.ModelManager.PlotModel.PlotConfig.CanInteractive)
		)
			this.cZi = !0;
		else {
			let e = t.WaitTime;
			void 0 === e &&
				((e =
					ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.JumpWaitTime),
				(t.WaitTime = e)),
				e < ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime &&
					((e =
						ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime),
					(t.WaitTime = e)),
				(e = TimeUtil_1.TimeUtil.SetTimeMillisecond(e)) < TimerSystem_1.MIN_TIME
					? (this.eeo(!0), this.veo(!1), (this.cZi = !0))
					: (this.eeo(!1),
						this.veo(!0),
						(this.Ozi = TimerSystem_1.TimerSystem.Delay((t) => {
							if (
								(this.veo(!1),
								(this.Ozi = void 0),
								(this.cZi = !0),
								!this.vZi.IsTextAnimPlaying)
							) {
								if (this.HasOptions) return void this.teo();
								ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay &&
									this.ZZi();
							}
							this.eeo(!0);
						}, e)));
		}
	}
	ZZi() {
		this.WZi();
		let t = 1;
		this.vZi.IsInteraction
			? (t =
					ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
						.EndWaitTimeInteraction)
			: "LevelC" ===
					ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel &&
				(t =
					ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
						.EndWaitTimeLevelC),
			t < ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime &&
				(t = ModelManager_1.ModelManager.PlotModel.PlotTemplate.MinWaitingTime),
			(t *= CommonDefine_1.MILLIONSECOND_PER_SECOND),
			(this.lZi = TimerSystem_1.TimerSystem.Delay(
				() => {
					this.eeo(!1), this.teo();
				},
				this.vZi.PlayDelayTime <= t ? t : this.vZi.PlayDelayTime,
			));
	}
	teo() {
		this.WZi(),
			this.vZi.IsInteraction
				? this.JZi()
				: ((this.cZi = !1),
					ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SubmitSubtitle(
						this.vZi.CurrentContent,
					));
	}
	zZi() {
		var t;
		this.InteractController &&
			(this.SetOptionsShow(!0),
			(t = this.InteractController.ShowOptions),
			this.CZi.RefreshByData(t, this.kZi));
	}
	JZi() {
		var t;
		this.uZi++,
			this.uZi < this._Zi.length
				? ((t = this._Zi[this.uZi]), this.vZi.PlaySubtitle(t), this.KZi(t))
				: this.uZi === this._Zi.length && this.zZi();
	}
	eeo(t) {
		this.mZi?.SetUIActive(t);
	}
	veo(t) {
		this.GetItem(18).SetUIActive(t);
	}
	WZi() {
		TimerSystem_1.TimerSystem.Has(this.lZi) &&
			TimerSystem_1.TimerSystem.Remove(this.lZi),
			(this.lZi = void 0);
	}
	RemoveWaitSkipTimer() {
		TimerSystem_1.TimerSystem.Has(this.Ozi) &&
			TimerSystem_1.TimerSystem.Remove(this.Ozi),
			(this.Ozi = void 0);
	}
	leo() {
		this.RemoveWaitSkipTimer(),
			this.WZi(),
			this.seo(),
			this.GetItem(3).SetUIActive(!1),
			this.GetText(4).SetUIActive(!1),
			this.GetText(15).SetUIActive(!1),
			this.GetItem(11).SetUIActive(!1);
	}
	seo() {
		(this.CurOption.length = 0), this.SetOptionsShow(!1), (this.hZi = void 0);
	}
	SetOptionsShow(t) {
		t !== this.gZi &&
			((ModelManager_1.ModelManager.PlotModel.OptionEnable = t),
			(this.gZi = t)
				? (this.CZi.SetActive(!0),
					this.CZi.GetRootUiItem().SetRaycastTarget(!0),
					this.UiViewSequence.PlaySequence("ChoiceStart"))
				: (this.CZi.GetRootUiItem().SetRaycastTarget(!1),
					this.UiViewSequence.PlaySequence("ChoiceClose")));
	}
	AddScreenEffectPlotRoot() {
		var t = (0, puerts_1.$ref)(void 0),
			e = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
		e?.IsValid() &&
			(e.GetScreenEffectPlotRoot(t),
			(this.dZi = (0, puerts_1.$unref)(t)),
			(e = this.GetItem(13)),
			this.dZi?.IsValid()) &&
			(this.dZi.K2_AttachRootComponentTo(e), Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug("Plot", 46, "PlotView::AddScreenEffectPlotRoot");
	}
	RemoveScreenEffectPlotRoot() {
		this.dZi?.IsValid() &&
			(this.dZi.K2_DetachFromActor(), Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug("Plot", 46, "PlotView::RemoveScreenEffectPlotRoot"),
			(this.dZi = void 0);
	}
	Seo() {
		this.wPn = !0;
	}
	ceo() {
		this.wPn = !1;
	}
	ueo() {
		var t = MathUtils_1.MathUtils.GetRangePct(0, 1e3, this.PZi);
		if (this.bZi && this.wZi) this.yZi.SetAlpha(t);
		else {
			if (!this.wZi && this.EZi.GetAlpha() <= 0) return 0;
			this.EZi.SetAlpha(t);
		}
		return t;
	}
	deo() {
		var t = MathUtils_1.MathUtils.GetRangePct(0, 1e3, this.PZi);
		return !this.wZi && this.IZi.GetAlpha() <= 0
			? 0
			: (this.IZi.SetAlpha(t), t);
	}
	async FadeInBgPhoto(t, e) {
		(this.RZi = new CustomPromise_1.CustomPromise()),
			(this.wZi = !0),
			(this.PZi = 0),
			this.bZi
				? t
					? this.SetTextureByPath(t, this.yZi, void 0, () => {
							(this.UZi = e), this.Seo();
						})
					: this.SetTextureByPath(DEFAULT_PATH, this.yZi, void 0, () => {
							(this.UZi = e), this.Seo();
						})
				: t
					? this.SetTextureByPath(t, this.EZi, void 0, () => {
							(this.UZi = e), this.Seo();
						})
					: this.SetTextureByPath(DEFAULT_PATH, this.EZi, void 0, () => {
							(this.UZi = e), this.Seo();
						}),
			await this.RZi.Promise;
	}
	async FadeOutBgPhoto(t) {
		(this.PZi = 1e3),
			(this.UZi = t),
			(this.DZi = new CustomPromise_1.CustomPromise()),
			this.Seo(),
			await this.DZi.Promise;
	}
	async FadeInBgPhotoMiddle(t, e) {
		(this.RZi = new CustomPromise_1.CustomPromise()),
			(this.wZi = !0),
			(this.PZi = 0),
			t
				? this.SetTextureByPath(t, this.IZi, void 0, () => {
						this.TZi?.SetUIActive(!0), (this.UZi = e), this.Seo();
					})
				: (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("BlackScreen", 46, "PlotView设置图片,但未找到Path"),
					this.SetTextureByPath(DEFAULT_PATH, this.IZi, void 0, () => {
						(this.UZi = e), this.Seo();
					})),
			await this.RZi.Promise;
	}
	async FadeOutBgPhotoMiddle(t) {
		(this.PZi = 1e3),
			(this.UZi = t),
			(this.DZi = new CustomPromise_1.CustomPromise()),
			this.Seo(),
			await this.DZi.Promise;
	}
	Eeo() {
		this.PPn = !0;
	}
	feo() {
		this.PPn = !1;
	}
	geo() {
		var t = MathUtils_1.MathUtils.GetRangePct(0, 1e3, this.xZi);
		return this.LZi.SetAlpha(t), t;
	}
	async FadeInBgBlackScreen(t) {
		(this.RZi = new CustomPromise_1.CustomPromise()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("BlackScreen", 46, "FadeInBgBlackScreen黑幕进入"),
			(this.AZi = t),
			this.Eeo(),
			await this.RZi.Promise;
	}
	async FadeOutBgBlackScreen(t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("BlackScreen", 46, "FadeInBgBlackScreen黑幕退出"),
			(this.AZi = t),
			(this.DZi = new CustomPromise_1.CustomPromise()),
			this.Eeo(),
			await this.DZi.Promise;
	}
}
exports.PlotView = PlotView;
