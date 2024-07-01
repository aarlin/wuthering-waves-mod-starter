"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotTransitionView = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioController_1 = require("../../../../Core/Audio/AudioController"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
	InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId"),
	PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	ColorUtils_1 = require("../../../Utils/ColorUtils"),
	PlotAudioModel_1 = require("../PlotAudioModel"),
	TYPEWRITERRANGE = 0.01,
	FADEOUTRANGE = 9999,
	FADEMAXTIME = 30,
	PLAY_FLAG = 8;
class PlotTransitionView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Q$t = void 0),
			(this.X$t = void 0),
			(this.Uzi = void 0),
			(this.Azi = void 0),
			(this.Pzi = void 0),
			(this.xzi = void 0),
			(this.zNe = 0),
			(this.wzi = void 0),
			(this.B7 = void 0),
			(this.czi = new AudioController_1.PlayResult()),
			(this.Bzi = 0),
			(this.bzi = 0),
			(this.W1e = 0),
			(this.qzi = 1),
			(this.Gzi = 1),
			(this.unt = 0),
			(this.Nzi = void 0),
			(this.Ozi = void 0),
			(this.kzi = void 0),
			(this.Fzi = void 0),
			(this.Vzi = () => {
				var e;
				4 !== this.Bzi &&
					3 !== this.Bzi &&
					((e =
						this.zNe ||
						ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
							.EndWaitTimeCenterText),
					this.Hzi(e));
			}),
			(this.jzi = () => {
				if (4 === this.Bzi || 3 === this.Bzi) {
					let e =
						ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
							.EndWaitTimeCenterText;
					0 < this.W1e &&
						((this.Q$t.GetSelector().lineByLine = !1),
						this.Wzi(!1, this.W1e),
						(e = this.W1e)),
						this.Hzi(e);
				}
			}),
			(this.Kzi = () => {
				this.B7 = void 0;
			}),
			(this.Qzi = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Plot",
						46,
						"PlotTransitionView:OnUpdatePlotCenterText",
					);
				var e,
					t,
					i = ModelManager_1.ModelManager.PlotModel.CenterText;
				(this.wzi = i).Text &&
					((e = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(
						i.Text,
					)),
					(t = this.GetText(0)).SetText(e),
					t.SetUIActive(!0),
					this.Xzi(),
					this.$zi(),
					this.Yzi(e.length)),
					i.Config?.BgImageId &&
						((t =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								i.Config.BgImageId,
							)),
						ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, (e) => {
							e?.IsValid() &&
								(this.GetTexture(2).SetTexture(e),
								this.GetTexture(2).SetUIActive(!0));
						})),
					ModelManager_1.ModelManager.GameModeModel.UseShowCenterText
						? ((this.zNe = 999),
							this.Jzi(),
							this.GetTexture(2).SetUIActive(!0),
							(this.B7 = i.Callback),
							this.ExecuteCallBack())
						: (this.GetButton(3)
								.GetRootComponent()
								.SetUIActive(i.Config?.IsManualNext ?? !1),
							this.ExecuteCallBack(),
							(this.B7 = i.Callback),
							i.AutoClose &&
								(this.zNe || (this.zNe = i.Config?.TotalTime), this.Vzi()),
							this.wzi.AudioId ? this.Jzi() : this.Szi(),
							this.yzi()),
					ModelManager_1.ModelManager.PlotModel.CenterText.Clear();
			}),
			(this.zzi = () => {
				void 0 === this.xzi && this.Ozi && ((this.Ozi = void 0), this.Zzi());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UITexture],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [[3, this.zzi]]);
	}
	OnStart() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Plot", 46, "PlotTransitionView:OnStart"),
			(this.X$t = this.GetText(0)
				.GetOwner()
				.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
			(this.Uzi = this.GetTexture(1)
				.GetOwner()
				.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
			(this.Q$t = this.GetText(0)
				.GetOwner()
				.GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
			(this.kzi = (0, puerts_1.toManualReleaseDelegate)(this.jzi)),
			(this.Fzi = this.X$t.GetPlayTween().RegisterOnComplete(this.kzi)),
			this.GetTexture(2).SetUIActive(!1),
			(ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
			ModelManager_1.ModelManager.GameModeModel.UseShowCenterText ||
			ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Plot",
							46,
							"PlotTransitionView:FadeLoading子界面开启",
						),
					this.GetItem(5).SetUIActive(!0),
					this.GetButton(3).GetRootComponent())
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Plot", 46, "PlotTransitionView:字幕子界面开启"),
					this.GetItem(5))
			).SetUIActive(!1);
	}
	async OnPlayingStartSequenceAsync() {
		"FadeLoadingView" === this.Info?.Name &&
			(await this.PlaySequenceAsync("Start01"));
	}
	async OnPlayingCloseSequenceAsync() {
		"FadeLoadingView" === this.Info?.Name &&
			(await this.PlaySequenceAsync("Close01"));
	}
	ExecuteCallBack() {
		var e;
		this.B7 && ((e = this.B7), (this.B7 = void 0), e());
	}
	Hzi(e) {
		void 0 !== this.Azi && TimerSystem_1.TimerSystem.Remove(this.Azi),
			(this.Azi = TimerSystem_1.TimerSystem.Delay(() => {
				(this.Azi = void 0),
					this.eZi(),
					this.GetText(0).SetUIActive(!1),
					this.GetTexture(2).SetUIActive(!1),
					this.ExecuteCallBack();
			}, TimeUtil_1.TimeUtil.SetTimeMillisecond(e)));
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnPlotTransitionRemoveCallback,
			this.Kzi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdatePlotCenterText,
				this.Qzi,
			);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnPlotTransitionRemoveCallback,
			this.Kzi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdatePlotCenterText,
				this.Qzi,
			);
	}
	Szi() {
		if (this.wzi.UniversalTone) {
			var e = this.wzi.UniversalTone.TimberId,
				t = this.wzi.UniversalTone.UniversalToneId;
			if (e && t) {
				var i =
					InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
						e,
						t,
					);
				if (i) return void this.Ezi(i);
			}
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Plot",
					27,
					"通用语气配置无法获取，策划检查配置",
					["timberId", e],
					["universalToneId", t],
				);
		}
	}
	Ezi(e) {
		AudioController_1.AudioController.PostEventByUi(e.AkEvent, this.czi, 8);
	}
	yzi() {
		var e,
			t,
			i = this.wzi.TalkAkEvent;
		i &&
			(e = (0, AudioSystem_1.parseAudioEventPath)(i.AkEvent)) &&
			(i.Type === IAction_1.EPostAkEvent.Global
				? AudioSystem_1.AudioSystem.PostEvent(e)
				: i.Type === IAction_1.EPostAkEvent.Target &&
					((i = i.EntityId),
					(t =
						ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)) ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 27, "实体不存在", ["entityId", i])),
					(t = t.Entity.GetComponent(1)?.Owner)?.IsValid()
						? AudioSystem_1.AudioSystem.PostEvent(e, t)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Event", 27, "未能获取到该实体对应的有效Actor", [
								"entityId",
								i,
							])));
	}
	OnBeforeDestroy() {
		this.X$t.GetPlayTween().UnregisterOnComplete(this.Fzi),
			(0, puerts_1.releaseManualReleaseDelegate)(this.jzi),
			(this.kzi = void 0) !== this.Azi &&
				(TimerSystem_1.TimerSystem.Remove(this.Azi), (this.Azi = void 0)),
			void 0 !== this.Pzi &&
				(TimerSystem_1.TimerSystem.Remove(this.Pzi), (this.Pzi = void 0)),
			void 0 !== this.Ozi &&
				(TimerSystem_1.TimerSystem.Remove(this.Ozi), (this.Ozi = void 0)),
			this.ExecuteCallBack(),
			(this.wzi = void 0),
			(this.Nzi = void 0);
	}
	Wzi(e, t) {
		var i = this.X$t.GetPlayTween();
		(i.from = e ? 1 : 0), (i.to = e ? 0 : 1), (i.duration = t), this.X$t.Play();
	}
	tZi(e) {
		var t = this.X$t.GetPlayTween()?.GetTweener();
		t && (e ? (t.Pause(), this.iZi(!0)) : (t.Resume(), this.iZi(!1)));
	}
	oZi(e, t) {
		var i = this.Uzi.GetPlayTween();
		(i.from = e ? this.GetTexture(1).GetAlpha() : 0),
			(i.to = e ? 0 : 1),
			(i.duration = t),
			this.Uzi.Play();
	}
	Jzi() {
		var e = StringUtils_1.StringUtils.IsEmpty(this.wzi.AudioId)
			? void 0
			: PlotAudioById_1.configPlotAudioById.GetConfig(this.wzi.AudioId);
		e && this.rZi(e);
	}
	rZi(e) {
		var t =
			ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
				e.ExternalSourceSetting,
			);
		e = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
			e.IsCheckSex,
			e.FileName,
		]);
		AudioController_1.AudioController.PostEventByExternalSourcesByUi(
			t.AudioEventPath,
			e,
			t.ExternalSrcName,
			this.czi,
			void 0,
			8,
		);
	}
	iZi(e) {
		if (this.PlayEventResult)
			if (e)
				for (const e of this.czi.PlayingIds)
					AudioController_1.AudioController.PauseAudioByPlayId(e);
			else
				for (const e of this.czi.PlayingIds)
					AudioController_1.AudioController.ResumeAudioByPlayId(e);
	}
	eZi() {
		AudioController_1.AudioController.StopEvent(this.czi);
	}
	Xzi() {
		var e = this.wzi,
			t = this.GetText(0),
			i = e.Config?.TextStyle?.TextAlign;
		(i =
			(i === IAction_1.ETextAlign.Bottom
				? (t.SetAnchorVAlign(3),
					t.SetPivot(Vector2D_1.Vector2D.Create(0.5, -1).ToUeVector2D()))
				: i === IAction_1.ETextAlign.Top
					? (t.SetAnchorVAlign(1),
						t.SetPivot(Vector2D_1.Vector2D.Create(0.5, 2).ToUeVector2D()))
					: (t.SetAnchorVAlign(2),
						t.SetPivot(Vector2D_1.Vector2D.Create(0.5, 0.5).ToUeVector2D())),
			e.Config?.TextStyle?.TextHorizontal)) === IAction_1.ETextHorizontal.Left
			? t.SetParagraphHorizontalAlignment(0)
			: i === IAction_1.ETextHorizontal.Right
				? t.SetParagraphHorizontalAlignment(2)
				: t.SetParagraphHorizontalAlignment(1),
			t.SetAnchorOffsetX(0),
			t.SetAnchorOffsetY(0);
	}
	$zi() {
		var e = this.wzi.Config?.TextStyle?.FontSize;
		if (e) {
			var t = this.GetText(0);
			let i = -1;
			e === IAction_1.EFontSize.Big
				? (i =
						ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
							.CenterTextFontSizeBig)
				: e === IAction_1.EFontSize.Middle
					? (i =
							ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
								.CenterTextFontSizeMiddle)
					: e === IAction_1.EFontSize.Small &&
						(i =
							ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
								.CenterTextFontSizeSmall),
				0 < i && t.SetFontSize(i);
		}
	}
	Yzi(e) {
		var t = this.wzi,
			i = t.Config?.TextStyle?.ShowAnim;
		if (i) {
			(this.zNe = void 0), this.Q$t.SetSelectorOffset(1);
			var o = t.Config?.IsMulLine ?? !1;
			if (
				(((n = this.Q$t.GetSelector()).lineByLine =
					o && i.Type === IAction_1.ECenterTextShowAnim.FadeOut),
				(n.flipDirection = !n.lineByLine),
				n.SetRange(
					i.Type === IAction_1.ECenterTextShowAnim.FadeOut ? 9999 : 0.01,
				),
				o && i.Type === IAction_1.ECenterTextShowAnim.TypeWriter)
			) {
				this.Bzi = 3;
				var n =
						0 < i.TextCountPerSecond
							? i.TextCountPerSecond
							: ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
									.TextAnimSpeedSeq,
					s = (this.Wzi(!0, e / n), this.nZi());
				(this.unt = n),
					1 < s &&
						((this.qzi = 1),
						(this.bzi = this.Nzi.Get(this.qzi - 1) / this.unt),
						(this.Gzi = s),
						this.sZi());
			} else if (o && i.Type === IAction_1.ECenterTextShowAnim.FadeOut)
				this.Q$t.SetSelectorOffset(0),
					(this.Bzi = 4),
					(n = i.FadeInTime),
					(s = this.nZi()),
					this.Wzi(!1, n * s),
					1 < s &&
						((this.qzi = 1),
						(this.bzi = n),
						(this.W1e = i.FadeOutTime),
						(this.Gzi = s),
						this.sZi());
			else if (i.Type === IAction_1.ECenterTextShowAnim.TypeWriter)
				(this.Bzi = 1),
					(o =
						e /
						(0 < i.TextCountPerSecond
							? i.TextCountPerSecond
							: ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
									.TextAnimSpeedSeq)),
					this.Wzi(!0, o),
					(n = t.Config?.TotalTime ?? 0),
					(this.zNe = n + o);
			else if (i.Type === IAction_1.ECenterTextShowAnim.FadeOut) {
				(this.Bzi = 2), (s = i.FadeInTime);
				const o = i.FadeOutTime;
				this.Wzi(!0, s),
					(e = t.Config?.TotalTime ?? 0),
					(this.Pzi = TimerSystem_1.TimerSystem.Delay(
						() => {
							this.Wzi(!1, o), (this.Pzi = void 0);
						},
						TimeUtil_1.TimeUtil.SetTimeMillisecond(s + e),
					)),
					(this.zNe = s + e + o);
			} else this.Q$t.SetSelectorOffset(0);
		} else this.Q$t.SetSelectorOffset(0);
	}
	sZi() {
		this.qzi >= this.Gzi ||
			(this.Pzi = TimerSystem_1.TimerSystem.Delay(() => {
				this.tZi(!0), (this.Pzi = void 0), this.aZi();
			}, TimeUtil_1.TimeUtil.SetTimeMillisecond(this.bzi)));
	}
	aZi() {
		this.Ozi = TimerSystem_1.TimerSystem.Delay(() => {
			(this.Ozi = void 0), this.Zzi();
		}, TimeUtil_1.TimeUtil.SetTimeMillisecond(
			ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
				.EndWaitTimeCenterText,
		));
	}
	Zzi() {
		this.tZi(!1),
			(this.qzi = this.qzi + 1),
			3 === this.Bzi && (this.bzi = this.Nzi.Get(this.qzi - 1) / this.unt),
			this.sZi();
	}
	nZi() {
		if (!this.Nzi) {
			var e = this.GetText(0),
				t = (0, puerts_1.$ref)(void 0);
			e.GetTextLineNumArray(t), (this.Nzi = (0, puerts_1.$unref)(t));
			for (let e = 0; e < this.Nzi.Num(); e++) {
				var i = this.Nzi.Get(e);
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Temp", 36, "LineNumArray", ["element", i]);
			}
		}
		return this.Nzi.Num();
	}
	FadeInScreen(e, t) {
		this.GetButton(3).GetRootComponent().SetUIActive(!1);
		var i = e?.Ease?.Duration
			? MathUtils_1.MathUtils.Clamp(e.Ease.Duration, 0, 30)
			: 1;
		e?.ScreenType === IAction_1.EFadeInScreenShowType.White &&
			this.GetTexture(1).SetColor(ColorUtils_1.ColorUtils.ColorWhile),
			this.oZi(!1, i),
			this.ExecuteCallBack(),
			(this.B7 = t),
			void 0 !== this.xzi && TimerSystem_1.TimerSystem.Remove(this.xzi),
			(this.xzi = TimerSystem_1.TimerSystem.Delay(() => {
				this.ExecuteCallBack(), (this.xzi = void 0);
			}, TimeUtil_1.TimeUtil.SetTimeMillisecond(i)));
	}
	FadeOutScreen(e, t) {
		this.GetButton(3).GetRootComponent().SetUIActive(!1),
			(e = e?.Ease?.Duration
				? MathUtils_1.MathUtils.Clamp(e.Ease.Duration, 0, 30)
				: 1),
			this.oZi(!0, e),
			this.ExecuteCallBack(),
			(this.B7 = t),
			void 0 !== this.xzi && TimerSystem_1.TimerSystem.Remove(this.xzi),
			(this.xzi = TimerSystem_1.TimerSystem.Delay(() => {
				this.ExecuteCallBack(), (this.xzi = void 0);
			}, TimeUtil_1.TimeUtil.SetTimeMillisecond(e)));
	}
}
exports.PlotTransitionView = PlotTransitionView;
