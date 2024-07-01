"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotSubtitleView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioController_1 = require("../../../../Core/Audio/AudioController"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
	Info_1 = require("../../../../Core/Common/Info"),
	Log_1 = require("../../../../Core/Common/Log"),
	Stats_1 = require("../../../../Core/Common/Stats"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
	PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById"),
	SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
	UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
	InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
	UiManager_1 = require("../../../Ui/UiManager"),
	PlotAudioModel_1 = require("../../Plot/PlotAudioModel"),
	PlotController_1 = require("../../Plot/PlotController"),
	PlotOptionItem_1 = require("../../Plot/PlotView/PlotOptionItem"),
	PlotSkipComponent_1 = require("../../Plot/PlotView/PlotSkipComponent"),
	PlotTextLogic_1 = require("../../Plot/PlotView/PlotTextLogic"),
	UiAssistant_1 = require("../../Plot/Sequence/Assistant/UiAssistant"),
	SequenceController_1 = require("../../Plot/Sequence/SequenceController"),
	SequenceDefine_1 = require("../../Plot/Sequence/SequenceDefine"),
	UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	AUDIO_FADE_TIME = 500,
	TIME_SKIP_SEQ = 300,
	CLICK_AUDIO_EVENT = "play_ui_ia_spl_plot_next",
	FADE_TIME = 200,
	DEFAULT_PATH =
		"/Game/Aki/UI/UIResources/Common/Image/T_CommonDefault_UI.T_CommonDefault_UI",
	OptionHeight_Offset = 265;
class SubtitleInfo {
	constructor() {
		(this.ppo = new SequenceDefine_1.PlotSubtitleConfig()),
			(this.HasOption = !1),
			(this.ShowAllText = !1),
			(this.ShowOption = !1),
			(this.Skip = !1),
			(this.EnableSkipTime = 0);
	}
	get CurrentConfig() {
		return this.ppo.Subtitles;
	}
	get CurrentDelayTime() {
		return this.ppo.AudioDelay;
	}
	get CurrentAudioTransitionDuration() {
		return this.ppo.AudioTransitionDuration;
	}
	HasSubtitle() {
		return void 0 !== this.ppo.Subtitles;
	}
	SetCurrentSubtitle(t) {
		this.ppo.CopyFrom(t), this.Qto();
	}
	Qto() {
		this.HasSubtitle() &&
			((this.HasOption = 0 < (this.CurrentConfig.Options?.length ?? 0)),
			(this.ShowAllText = !1),
			(this.ShowOption = !1),
			(this.EnableSkipTime =
				TimeUtil_1.TimeUtil.GetServerTimeStamp() + this.ppo.GuardTime));
	}
	Clear() {
		this.ppo.Clear(),
			(this.HasOption = !1),
			(this.ShowAllText = !1),
			(this.ShowOption = !1),
			(this.Skip = !1),
			(this.EnableSkipTime = 0);
	}
}
class PlotSubtitleView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.vpo = ""),
			(this.OptionKeys = new Array()),
			(this.OsList = new Array()),
			(this.Mpo = ""),
			(this.Spo = void 0),
			(this.Czi = void 0),
			(this.gzi = void 0),
			(this.Mzi = void 0),
			(this.Epo = !1),
			(this.ypo = new AudioController_1.PlayResult()),
			(this.Ipo = new AudioController_1.PlayResult()),
			(this.Tpo = 0),
			(this.Wht = 0),
			(this.Lpo = void 0),
			(this.Dpo = void 0),
			(this.mZi = void 0),
			(this.Ozi = void 0),
			(this.HoverIndex = 0),
			(this.dZi = void 0),
			(this.CZi = void 0),
			(this.gZi = !1),
			(this.fZi = void 0),
			(this.cot = !0),
			(this.hZi = void 0),
			(this.B8 = "LevelA"),
			(this.CurOption = new Array()),
			(this.PZi = 0),
			(this.wZi = !1),
			(this.wPn = !1),
			(this.bZi = !1),
			(this.qZi = void 0),
			(this.Rpo = !1),
			(this.EZi = void 0),
			(this.yZi = void 0),
			(this.IZi = void 0),
			(this.TZi = void 0),
			(this.DZi = void 0),
			(this.RZi = void 0),
			(this.UZi = void 0),
			(this.R5s = void 0),
			(this.Yzt = new PlotTextLogic_1.PlotAudioDelegate()),
			(this.Upo = void 0),
			(this.OVs = 0),
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
			(this.Apo = (t) => {
				0 < t.TalkItems.length && "LevelA" === this.B8
					? this.Meo(!0, !1)
					: this.Meo(!1, !1);
			}),
			(this.Ppo = () => {
				this.VZi();
			}),
			(this.FZi = () => {
				ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
					"UI点击跳过(PlotSubtitleView)",
				);
			}),
			(this.xpo = (t) => {
				this.GetItem(22).SetUIActive(t);
			}),
			(this.OnBtnSubtitleSkipClick = () => {
				!ModelManager_1.ModelManager.PlotModel.PlotConfig.CanInteractive ||
					!this.Spo.HasSubtitle() ||
					"CenterText" === this.CurrentSubtitle?.Type ||
					this.Spo.ShowOption ||
					this.Spo.Skip ||
					(this.Epo
						? (this.wpo(),
							AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT))
						: this.Spo.EnableSkipTime >
								TimeUtil_1.TimeUtil.GetServerTimeStamp() ||
							(Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Plot", 18, "点击字幕", [
									"offset",
									this.gzi.GetSelectorOffset(),
								]),
							this.Spo.ShowAllText || 0 === this.gzi.GetSelectorOffset()
								? (this.Bpo(),
									AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT))
								: this.bpo()));
			}),
			(this.OnBtnAutoClick = () => {
				let t = !1;
				var e = !ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay;
				(ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay = e),
					(ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlayCache = e)
						? (this.GetItem(14).SetUIActive(!0), (t = !0))
						: this.GetItem(14).SetUIActive(!1),
					t &&
						ModelManager_1.ModelManager.SequenceModel.IsPlaying &&
						ModelManager_1.ModelManager.SequenceModel.IsPaused &&
						((this.Spo.HasSubtitle() && this.Spo.HasOption) || this.wpo());
			}),
			(this.ieo = () => {
				var t = ModelManager_1.ModelManager.PlotModel.PlotConfig;
				(t.IsAutoPlay = !1), (t.IsAutoPlayCache = !1), this.HZi();
			}),
			(this.oeo = () => {
				this.H7s(), (this.cot = !1);
				var t = ModelManager_1.ModelManager.PlotModel.PlotConfig;
				(t.IsAutoPlay = !1), (t.IsAutoPlayCache = !1), this.HZi();
			}),
			(this.kZi = () => {
				this.hZi?.SetFollowItemActive(!1);
				var t = this.CZi.GetDisplayGridEndIndex();
				for (let i = 0; i <= t; i++) {
					var e = this.CZi.GetLayoutItemByIndex(i);
					if (e?.GetActive())
						return (
							(e.OptionIndex = this.CurrentSubtitle.Options.indexOf(e.Option)),
							(this.hZi = e),
							this.hZi?.SetFollowItemActive(!0),
							void UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(
								this.hZi.GetToggleItem().GetRootComponent(),
							)
						);
				}
			}),
			(this.$Ji = (t) => {
				this.RootItem.SetUIActive(!t);
			}),
			(this.lZt = (t) => {
				(this.Wht = t),
					(this.Upo = TimerSystem_1.TimerSystem.Delay(this.qpo, this.Wht));
			}),
			(this.qpo = () => {
				(this.Upo = void 0),
					this.Spo?.HasSubtitle() &&
						this.Epo &&
						!this.Spo.ShowOption &&
						this.Gpo() &&
						this.wpo();
			}),
			(this.Cwn = 0),
			(this.gwn = 0),
			(this.fwn = void 0),
			(this.pwn = void 0),
			(this.vwn = () => {
				this.Mwn();
				var t = this.GetScrollView(25),
					e = this.GetItem(26);
				if (t) {
					var i = this.GetText(5),
						o = i.GetTextRenderSize().Y;
					t = t.GetRootComponent();
					if (o <= this.OVs)
						t.SetHeight(this.OVs), e?.SetHeight(this.OVs + 265);
					else {
						var s = i.GetRenderLineNum(),
							n = i.GetFontSpaceFinal().Y;
						if (s <= 6) t.SetHeight(o + n), e?.SetHeight(o + n + 265);
						else {
							let h = 0;
							for (let t = 1; t <= 6; t++) h += i.GetRenderLineHeight(t) + n;
							t.SetHeight(h), e?.SetHeight(h + 265), (o = this.Swn());
							let r =
								CommonParamById_1.configCommonParamById.GetIntConfig(
									"PlotAutoScrollDelayCharNum",
								) ?? 25;
							e =
								((r =
									(t = i.GetDisplayCharLength()) <= r
										? i.GetRenderLineCharNum(0)
										: r) /
									o) *
								1e3;
							let l = (t -= r);
							1 < s && (l = t - i.GetRenderLineCharNum(0)),
								(this.Cwn = (l / o) * 1e3),
								(this.pwn = TimerSystem_1.TimerSystem.Delay(this.Ewn, e));
						}
					}
				}
			}),
			(this.Ewn = () => {
				(this.gwn = 0),
					(this.fwn = TimerSystem_1.TimerSystem.Forever(() => {
						var t = this.gwn / this.Cwn;
						this.GetScrollView(25)?.SetScrollProgress(t),
							1 <= t &&
								TimerSystem_1.TimerSystem.Has(this.fwn) &&
								TimerSystem_1.TimerSystem.Remove(this.fwn),
							(this.gwn += 100);
					}, 100));
			}),
			(this.jZi = async (t) => {
				this.Spo.HasSubtitle()
					? ControllerHolder_1.ControllerHolder.FlowController.LogError(
							"剧情Seq字幕重复触发",
							["curId", this.Spo.CurrentConfig.Id],
							["newId", t.Subtitles.Id],
						)
					: (this.Npo(),
						this.Spo.Clear(),
						this.Spo.SetCurrentSubtitle(t),
						await this.DPn(t, () => {
							this.Opo();
						}));
			}),
			(this.kpo = (t) => {
				this.Epo ? this.wpo() : this.Fpo();
			}),
			(this.eUt = (t) => {
				!t || this.cot || ((this.cot = !0), this.j7s());
			}),
			(this.reo = (t, e) => {
				0 !== e.TouchType || this.cot || ((this.cot = !0), this.j7s());
			}),
			(this.Vpo = (t) => {
				this.Spo.HasSubtitle() && this.CurrentSubtitle.Id === t
					? this.Spo.Skip
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Plot", 36, "Sequence黑幕监听日志-Skip"),
							this.Hpo())
						: this.Spo.ShowOption
							? (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("Plot", 36, "Sequence黑幕监听日志-ShowOption"),
								this.jpo())
							: this.Spo.HasOption
								? (Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Plot",
											36,
											"Sequence黑幕监听日志-HasOption",
										),
									this.Wpo(),
									this.jpo())
								: ((t = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
									"LevelA" !== this.B8 &&
									(t - this.Tpo < this.Wht || !this.Gpo()) &&
									this.Spo.EnableSkipTime <= t
										? (Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"Plot",
													36,
													"Sequence黑幕监听日志-Others",
												),
											this.jpo())
										: (this.Npo(), this.Hpo()))
					: Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Plot", 36, "Sequence黑幕监听日志-!HasSubtitle");
			}),
			(this.Kpo = () => {
				this.Spo.HasSubtitle() &&
					(this.Npo(), this.Hpo(), this.Qpo(), this.Xpo());
			}),
			(this.$po = (t, e, i) => {
				var o;
				t
					? (t = PlotAudioById_1.configPlotAudioById.GetConfig(e))
						? ((o =
								ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
									t.ExternalSourceSetting,
								)),
							(t = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
								t.IsCheckSex,
								t.FileName,
							])),
							AudioController_1.AudioController.PostEventByExternalSourcesByUi(
								o.AudioEventPath,
								t,
								o.ExternalSrcName,
								this.Ipo,
								void 0,
								0,
								void 0,
							))
						: ControllerHolder_1.ControllerHolder.FlowController.LogError(
								"读取语音配置为空",
								["audioKey", e],
							)
					: this.Xpo();
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
			(this._eo = (t) => {
				this.PZi < 0 && (this.PZi = 0),
					this.PZi > 200 && (this.PZi = 200),
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
			});
	}
	Meo(t, e = !0) {
		t !== this.Rpo &&
			((this.Rpo = t)
				? (this.GetSprite(9).SetUIActive(!0),
					e &&
						(this.UiViewSequence.StopSequenceByKey("PlotClose"),
						this.PlaySequence("PlotStart")))
				: e
					? (this.UiViewSequence.StopSequenceByKey("PlotStart"),
						this.PlaySequence("PlotClose"))
					: this.GetSprite(9).SetUIActive(!1));
	}
	get Options() {
		return this.CZi?.GetLayoutItemList();
	}
	get CurrentSubtitle() {
		return this.Spo?.CurrentConfig;
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
		this.GetButton(2).RootUIComp.SetUIActive(!1),
			(this.fZi = new PlotSkipComponent_1.PlotSkipComponent(
				this.GetButton(2),
				this.FZi,
				this.ieo,
			)),
			this.fZi.EnableSkipButton(!1),
			this.GetSprite(19).SetAlpha(0),
			(this.Spo = new SubtitleInfo()),
			(this.CZi = new GenericLayout_1.GenericLayout(
				this.GetLayoutBase(7),
				this.NZi,
				this.GetItem(6).GetOwner(),
			)),
			this.CZi.SetActive(!1),
			(this.gZi = !1),
			(this.Czi = this.GetItem(8)
				.GetOwner()
				.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
			(this.gzi = this.GetItem(8)
				.GetOwner()
				.GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
			this.GetItem(6).SetUIActive(!1),
			this.GetItem(22).SetUIActive(!1),
			(this.Rpo = !1),
			this.GetSprite(9).SetUIActive(!1),
			(this.mZi = this.GetItem(17)),
			this.GetButton(1)
				.RootUIComp.GetOwner()
				.GetComponentByClass(UE.UIDraggableComponent.StaticClass())
				.SetActive(!1),
			this.eeo(!1),
			this.veo(!1),
			this.VZi(),
			(this.Epo = !1),
			this.AddScreenEffectPlotRoot(),
			(this.cot = !0),
			this.Yzt.Init(this.lZt),
			this.UiViewSequence.AddSequenceFinishEvent("ChoiceClose", this.jLn);
		var t = this.GetScrollView(25);
		t?.SetCanScroll(!1),
			t?.SetRayCastTargetForScrollView(!1),
			(this.OVs = t?.GetRootComponent()?.GetHeight() ?? 174),
			(this.PZi = 0),
			(this.EZi = this.GetTexture(20)),
			this.EZi && this.EZi.SetAlpha(0),
			(this.yZi = this.GetTexture(21)),
			this.yZi && this.yZi.SetAlpha(0),
			(this.IZi = this.GetTexture(23)),
			this.IZi && this.IZi.SetAlpha(0),
			(this.TZi = this.GetSprite(24)),
			this.TZi && this.TZi.SetUIActive(!1);
	}
	ResetSubtitle() {
		this.GetText(4).SetText(""),
			this.GetText(4).SetUIActive(!1),
			this.GetText(15).SetText(""),
			this.GetText(15).SetUIActive(!1),
			this.GetItem(11).SetUIActive(!1),
			this.GetText(5).SetText(""),
			this.GetText(12).SetText(""),
			this.GetText(5).SetUIActive(!1),
			this.GetText(12).SetUIActive(!1);
	}
	OnAfterShow() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PlotViewChange,
			this.Info.Name,
			!0,
		);
		var t = ModelManager_1.ModelManager.SequenceModel.CurSubtitle;
		t.Subtitles && this.jZi(t);
	}
	async OnPlayingStartSequenceAsync() {
		this.OpenParam?.DisableAnim ||
			(await this.PlaySequenceAsync("Start01", !0));
	}
	OnBeforeHide() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PlotViewChange,
			this.Info.Name,
			!1,
		),
			this.RemoveScreenEffectPlotRoot(),
			this.Mzi && this.Mzi.SetActive(!1),
			this.Ypo(),
			this.Qpo(),
			this.Xpo(),
			this.Jpo(),
			this.fZi.EnableSkipButton(!1),
			ModelManager_1.ModelManager.SequenceModel.CurSubtitle.Clear(),
			this.CZi.SetActive(!1),
			this.SetTextureByPath(DEFAULT_PATH, this.EZi),
			this.SetTextureByPath(DEFAULT_PATH, this.yZi),
			this.SetTextureByPath(DEFAULT_PATH, this.IZi),
			(this.bZi = !1),
			(this.PZi = 0),
			this.ceo();
	}
	async OnPlayingCloseSequenceAsync() {
		this.OpenParam?.DisableAnim ||
			(await this.PlaySequenceAsync("Close01", !0));
	}
	OnBeforeDestroy() {
		this.Yzt.Clear(),
			this.fZi?.OnClear(),
			(this.fZi = void 0),
			(this.DZi = void 0),
			(this.RZi = void 0),
			this.Mwn();
	}
	eeo(t) {
		this.mZi?.SetUIActive(t);
	}
	veo(t) {
		this.GetItem(18).SetUIActive(t);
	}
	VZi() {
		var t = ModelManager_1.ModelManager.PlotModel.PlotConfig,
			e = t.CanPause;
		this.GetExtendToggle(0).RootUIComp.SetUIActive(e),
			this.GetButton(16).RootUIComp.SetUIActive(e),
			this.GetButton(1).RootUIComp.SetUIActive(t.CanInteractive),
			(this.B8 = t.PlotLevel),
			this.HZi(),
			this.ResetSubtitle();
	}
	HZi() {
		var t = this.GetExtendToggle(0);
		ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay
			? (t.SetToggleState(0), this.GetItem(14).SetUIActive(!0))
			: (t.SetToggleState(1), this.GetItem(14).SetUIActive(!1));
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlotConfigChanged,
			this.Ppo,
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
				EventDefine_1.EEventName.PlotDoingTextShow,
				this.xpo,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotStartShowTalk,
				this.Apo,
			),
			SequenceController_1.SequenceController.Event.Add(
				UiAssistant_1.ESequenceEventName.UpdateSeqSubtitle,
				this.jZi,
			),
			SequenceController_1.SequenceController.Event.Add(
				UiAssistant_1.ESequenceEventName.HandlePlotOptionSelected,
				this.kpo,
			),
			SequenceController_1.SequenceController.Event.Add(
				UiAssistant_1.ESequenceEventName.HandleSeqSubtitleEnd,
				this.Vpo,
			),
			SequenceController_1.SequenceController.Event.Add(
				UiAssistant_1.ESequenceEventName.HandleSubSequenceStop,
				this.Kpo,
			),
			SequenceController_1.SequenceController.Event.Add(
				UiAssistant_1.ESequenceEventName.HandleIndependentSeqAudio,
				this.$po,
			),
			this.fZi.AddEventListener(),
			InputDistributeController_1.InputDistributeController.BindTouch(
				InputMappingsDefine_1.touchIdMappings.Touch1,
				this.reo,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlotConfigChanged,
			this.Ppo,
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
				EventDefine_1.EEventName.PlotDoingTextShow,
				this.xpo,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotStartShowTalk,
				this.Apo,
			),
			SequenceController_1.SequenceController.Event.Remove(
				UiAssistant_1.ESequenceEventName.UpdateSeqSubtitle,
				this.jZi,
			),
			SequenceController_1.SequenceController.Event.Remove(
				UiAssistant_1.ESequenceEventName.HandlePlotOptionSelected,
				this.kpo,
			),
			SequenceController_1.SequenceController.Event.Remove(
				UiAssistant_1.ESequenceEventName.HandleSeqSubtitleEnd,
				this.Vpo,
			),
			SequenceController_1.SequenceController.Event.Remove(
				UiAssistant_1.ESequenceEventName.HandleSubSequenceStop,
				this.Kpo,
			),
			SequenceController_1.SequenceController.Event.Remove(
				UiAssistant_1.ESequenceEventName.HandleIndependentSeqAudio,
				this.$po,
			),
			this.fZi.RemoveEventListener(),
			InputDistributeController_1.InputDistributeController.UnBindTouch(
				InputMappingsDefine_1.touchIdMappings.Touch1,
				this.reo,
			);
	}
	bpo() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Plot", 18, "第一次点击，显示完整字幕"),
			this.Mwn(),
			this.GetScrollView(25)?.SetScrollProgress(1),
			this.Czi.Stop(),
			this.gzi.SetSelectorOffset(0),
			(this.Spo.EnableSkipTime =
				TimeUtil_1.TimeUtil.GetServerTimeStamp() + 300),
			(this.Spo.ShowAllText = !0),
			this.Spo.HasOption && this.Wpo();
	}
	Bpo() {
		this.Spo.HasOption
			? this.Spo.ShowOption || this.Wpo()
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Plot", 18, "第二次点击，跳到下一个镜头或字幕"),
				(this.Spo.Skip = !0),
				SequenceController_1.SequenceController.JumpToNextSubtitleOrChildSeq());
	}
	H7s() {
		this.GetItem(27)?.SetUIActive(!1), this.GetItem(28)?.SetUIActive(!1);
	}
	j7s() {
		this.GetItem(27)?.SetUIActive(!0), this.GetItem(28)?.SetUIActive(!0);
	}
	KZi() {
		switch (this.Spo?.CurrentConfig?.Type) {
			case "Option":
				this.ResetSubtitle(),
					this.eeo(!1),
					this.veo(!1),
					(this.Spo.ShowAllText = !0);
				break;
			case "CenterText":
				this.zpo();
				break;
			default:
				this.Zpo(),
					this.evo(
						this.Mpo,
						this.Spo.CurrentDelayTime,
						this.Spo.CurrentAudioTransitionDuration,
					),
					this.tvo();
		}
	}
	ivo() {
		this.ResetSubtitle(),
			this.Qpo(),
			this.eeo(!1),
			this.veo(!1),
			this.Jpo(),
			this.Spo.Clear();
	}
	Wpo() {
		this.Spo?.HasOption &&
			((this.Spo.ShowOption = !0),
			this.SetOptionsShow(!0),
			(this.CurOption = this.XZi(this.CurrentSubtitle.Options)),
			this.CZi.RefreshByData(this.Spo.CurrentConfig.Options, this.kZi),
			this.tvo());
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
	ovo() {
		this.seo();
	}
	evo(t, e, i) {
		StringUtils_1.StringUtils.IsEmpty(t) ||
			((t = StringUtils_1.StringUtils.IsEmpty(t)
				? void 0
				: PlotAudioById_1.configPlotAudioById.GetConfig(t)) &&
				((this.Dpo = t),
				(this.Tpo = TimeUtil_1.TimeUtil.GetServerTimeStamp() + e),
				this.nvo()));
	}
	tvo() {
		var t;
		this.Jpo(),
			ModelManager_1.ModelManager.PlotModel.PlotConfig.CanInteractive &&
			this.Spo.HasSubtitle() &&
			!this.Spo.ShowOption
				? (t =
						this.Spo.EnableSkipTime -
						TimeUtil_1.TimeUtil.GetServerTimeStamp()) < TimerSystem_1.MIN_TIME
					? (this.eeo(!0), this.veo(!1))
					: (this.eeo(!1),
						this.veo(!0),
						(this.Ozi = TimerSystem_1.TimerSystem.Delay((t) => {
							this.eeo(!0), this.veo(!1), (this.Ozi = void 0);
						}, t)))
				: (this.eeo(!1), this.veo(!1));
	}
	Jpo() {
		this.Ozi &&
			(TimerSystem_1.TimerSystem.Has(this.Ozi) &&
				TimerSystem_1.TimerSystem.Remove(this.Ozi),
			(this.Ozi = void 0));
	}
	nvo() {
		var t;
		this.Dpo &&
			((t = this.Tpo - TimeUtil_1.TimeUtil.GetServerTimeStamp()) <
			TimerSystem_1.MIN_TIME
				? this.svo()
				: (this.Lpo = TimerSystem_1.TimerSystem.Delay(() => {
						this.Dpo && this.svo();
					}, t)));
	}
	svo() {
		var t =
				ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
					this.Dpo.ExternalSourceSetting,
				),
			e = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
				this.Dpo.IsCheckSex,
				this.Dpo.FileName,
			]);
		this.Yzt.Enable(),
			AudioController_1.AudioController.PostEventByExternalSourcesByUi(
				t.AudioEventPath,
				e,
				t.ExternalSrcName,
				this.ypo,
				void 0,
				PlotTextLogic_1.PLAY_FLAG,
				this.Yzt.AudioDelegate,
			);
	}
	Qpo() {
		this.Dpo &&
			(SequenceController_1.SequenceController.StopMouthAnim(),
			this.Upo?.Remove(),
			(this.Upo = void 0),
			(this.Tpo = 0),
			(this.Wht = 0),
			this.Yzt.Disable(),
			AudioController_1.AudioController.StopEvent(this.ypo, !0, 500),
			this.avo(),
			(this.Dpo = void 0));
	}
	avo() {
		void 0 !== this.Lpo &&
			(TimerSystem_1.TimerSystem.Has(this.Lpo) &&
				TimerSystem_1.TimerSystem.Remove(this.Lpo),
			(this.Lpo = void 0));
	}
	Zpo() {
		var t = this.Spo.CurrentConfig;
		if ("LevelA" === this.B8) {
			let t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.vpo);
			StringUtils_1.StringUtils.IsEmpty(t) &&
				(ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"字幕为空",
					["id", this.vpo],
				),
				(t = this.vpo)),
				(t = this.ParseSubtitle(t)),
				this.GetText(12).SetText(t),
				this.GetText(12).SetUIActive(!0),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Plot", 39, "A级", ["字幕：", t]);
		} else {
			this.Meo(!0);
			var e,
				i = this.GetText(4),
				o = this.GetText(15),
				s = this.GetItem(11);
			(s =
				("InnerVoice" === t.Style?.Type
					? (i.SetUIActive(!1), o.SetUIActive(!1), s.SetUIActive(!1))
					: ((e = (t = SpeakerById_1.configSpeakerById.GetConfig(t.WhoId))
							? PublicUtil_1.PublicUtil.GetConfigTextByTable(0, t.Id)
							: void 0),
						(t = t
							? PublicUtil_1.PublicUtil.GetConfigTextByTable(1, t.Id)
							: void 0),
						s.SetUIActive(!0),
						StringUtils_1.StringUtils.IsEmpty(e)
							? i.SetUIActive(!1)
							: (i.SetUIActive(!0), i.SetText(e)),
						StringUtils_1.StringUtils.IsEmpty(t)
							? o.SetUIActive(!1)
							: (o.SetUIActive(!0), o.SetText(t))),
				PublicUtil_1.PublicUtil.GetFlowConfigLocalText(this.vpo))),
				(s = this.ParseSubtitle(s)),
				(i =
					(this.GetText(5).SetText(s),
					this.GetText(5).SetUIActive(!0),
					this.GetText(5).GetDisplayCharLength()));
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 39, "B级", ["字幕：", s]),
				this.Czi &&
					((e =
						i /
						ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
							.TextAnimSpeedSeq),
					this.gzi.SetSelectorOffset(1),
					(this.Czi.GetPlayTween().duration = e),
					this.Czi.Play()),
				TimerSystem_1.TimerSystem.Next(this.vwn);
		}
	}
	Swn() {
		return ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
			.TextAnimSpeedSeq;
	}
	Mwn() {
		TimerSystem_1.TimerSystem.Has(this.fwn) &&
			TimerSystem_1.TimerSystem.Remove(this.fwn),
			TimerSystem_1.TimerSystem.Has(this.pwn) &&
				TimerSystem_1.TimerSystem.Remove(this.pwn);
	}
	Opo() {
		ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.OnSubtitleStart(
			this.Spo.CurrentConfig.Id,
		),
			this.hvo(),
			this.lvo(),
			this._vo(),
			this.yzi(this.Spo.CurrentConfig.TalkAkEvent),
			this.KZi();
	}
	Hpo() {
		"LevelB" === this.B8 && this.uvo() && this.Meo(!1), this.ivo(), this.ovo();
	}
	uvo() {
		var t =
			ControllerHolder_1.ControllerHolder.FlowController.FlowSequence.GetNextTalkItem();
		return (
			!t || "Option" === t?.Type || this.CurrentSubtitle?.WhoId !== t?.WhoId
		);
	}
	zpo() {
		let t;
		var e;
		((e =
			("" !== (e = this.vpo)
				? ((t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(e)),
					(t = this.ParseSubtitle(t)))
				: ControllerHolder_1.ControllerHolder.FlowController.LogError(
						"该字幕没配置对白",
						["id", this.Spo.CurrentConfig.Id],
					),
			ModelManager_1.ModelManager.PlotModel.CenterText)).Text = t),
			(e.AutoClose = !1),
			(e.TalkAkEvent = this.Spo?.CurrentConfig?.TalkAkEvent),
			(e.UniversalTone = this.Spo?.CurrentConfig?.UniversalTone),
			PlotController_1.PlotController.HandleShowCenterText(!0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Plot", 36, "Sequence黑幕监听日志-打开黑幕", [
					"subtitleKey",
					this.vpo,
				]);
	}
	Npo() {
		return !(
			!this.Spo.HasSubtitle() ||
			"CenterText" !== this.Spo.CurrentConfig.Type ||
			(this.Ypo(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Plot", 36, "Sequence黑幕监听日志-关闭黑幕"),
			0)
		);
	}
	Ypo() {
		UiManager_1.UiManager.IsViewOpen("PlotTransitionViewPop") &&
			UiManager_1.UiManager.CloseView("PlotTransitionViewPop");
	}
	Xpo() {
		AudioController_1.AudioController.StopEvent(this.Ipo);
	}
	Fpo() {
		(this.Spo.Skip = !0),
			SequenceController_1.SequenceController.JumpToNextSubtitleOrChildSeq();
	}
	jpo() {
		(this.Epo = !0), SequenceController_1.SequenceController.PauseSequence();
	}
	wpo() {
		SequenceController_1.SequenceController.ResumeSequence(),
			(this.Epo = !1),
			this.Hpo();
	}
	yzi(t) {
		var e, i, o;
		t &&
			(t.Type === IAction_1.EPostAkEvent.Global
				? ((e = t.AkEvent),
					AudioController_1.AudioController.PostEvent(e, void 0),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Event",
							27,
							"[PlotSubtitleView][FlowAudio][Global]",
							["AkEvent", t?.AkEvent],
						))
				: t.Type === IAction_1.EPostAkEvent.Target &&
					((e = t.AkEvent),
					(i = t.EntityId),
					(o =
						ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)) ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 27, "实体不存在", ["entityId", i])),
					(o = o.Entity.GetComponent(1)?.Owner)?.IsValid()
						? (AudioController_1.AudioController.PostEvent(e, o),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Event",
									27,
									"[PlotSubtitleView][FlowAudio][Entity]",
									["EntityID", i],
									["AkEvent", t?.AkEvent],
								))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 27, "未能获取到该实体对应的有效Actor", [
								"entityId",
								i,
							])));
	}
	hvo() {
		this.vpo = this.Spo.CurrentConfig.TidTalk;
	}
	lvo() {
		(this.OptionKeys.length = 0),
			(this.OsList.length = 0),
			this.Spo.CurrentConfig.Options?.forEach((t) => {
				this.OptionKeys.push(t.TidTalkOption), this.OsList.push(t.Icon);
			});
	}
	_vo() {
		this.Mpo = this.Spo.CurrentConfig?.PlayVoice
			? this.Spo.CurrentConfig.TidTalk
			: void 0;
	}
	seo() {
		(this.CurOption.length = 0), this.SetOptionsShow(!1);
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
	ParseSubtitle(t) {
		return t
			? ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t)
			: "";
	}
	Gpo() {
		return (
			!(
				!this.Spo.HasSubtitle() || "CenterText" !== this.Spo.CurrentConfig.Type
			) || ModelManager_1.ModelManager.PlotModel.PlotConfig.IsAutoPlay
		);
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
			Log_1.Log.Debug("Plot", 39, "PlotSubtitleView::AddScreenEffectPlotRoot");
	}
	RemoveScreenEffectPlotRoot() {
		this.dZi?.IsValid() &&
			(this.dZi.K2_DetachFromActor(), Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug(
				"Plot",
				39,
				"PlotSubtitleView::RemoveScreenEffectPlotRoot",
			),
			(this.dZi = void 0);
	}
	GetOptionList() {
		return this.CZi.GetLayoutItemList();
	}
	OnTick(t) {
		this.wPn && this._eo(t);
	}
	SimulateClickSubtitle() {
		Info_1.Info.IsBuildDevelopmentOrDebug && this.OnBtnSubtitleSkipClick();
	}
	SimulateClickOption() {
		var t;
		Info_1.Info.IsBuildDevelopmentOrDebug &&
			this.Spo.ShowOption &&
			((t =
				ControllerHolder_1.ControllerHolder.FlowController.GetRecommendedOption()),
			(t = this.GetOptionList()[t])) &&
			t.OptionClick(!0);
	}
	async DPn(t, e) {
		var i = t.Subtitles?.BackgroundConfig;
		if (i) {
			const t = new CustomPromise_1.CustomPromise();
			var o = () => {
				e && e(), t.SetResult();
			};
			switch (((this.R5s = i.Type), i.Type)) {
				case "Clean":
					this.neo(!1, !0, void 0, o);
					break;
				case "Image":
					var s = i;
					this.RemovePhotoAtOnce(), this.neo(!0, !0, s?.ImageAsset, o);
					break;
				case "Icon":
					(s = i), this.RemovePhotoAtOnce(), this.neo(!0, !1, s?.ImageAsset, o);
					break;
				default:
					o();
			}
			await t.Promise;
		} else
			"Clean" === this.R5s && this.RemovePhotoAtOnce(),
				(this.R5s = void 0),
				e && e();
	}
	Seo() {
		this.wPn = !0;
	}
	ceo() {
		this.wPn = !1;
	}
	ueo() {
		var t = MathUtils_1.MathUtils.GetRangePct(0, 200, this.PZi);
		if (this.bZi && this.wZi) this.yZi.SetAlpha(t);
		else {
			if (!this.wZi && this.EZi.GetAlpha() <= 0) return 0;
			this.EZi.SetAlpha(t);
		}
		return t;
	}
	deo() {
		var t = MathUtils_1.MathUtils.GetRangePct(0, 200, this.PZi);
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
		(this.PZi = 200),
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
		(this.PZi = 200),
			(this.UZi = t),
			(this.DZi = new CustomPromise_1.CustomPromise()),
			this.Seo(),
			await this.DZi.Promise;
	}
	async RemovePhotoAtOnce() {
		this.ceo(),
			(this.PZi = 0),
			this._eo(0),
			(this.UZi = void 0),
			await this.RZi?.Promise;
	}
}
(exports.PlotSubtitleView = PlotSubtitleView).rvo = void 0;
