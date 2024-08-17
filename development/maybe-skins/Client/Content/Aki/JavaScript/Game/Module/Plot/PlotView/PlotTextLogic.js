"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotTextCommonLogic =
		exports.PlotAudioDelegate =
		exports.PLAY_FLAG =
			void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
	InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId"),
	PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById"),
	SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	PlotAudioModel_1 = require("../PlotAudioModel"),
	PlotPortraitItem_1 = require("./PlotPortraitItem"),
	MAX_LOAD_AUDIO_TIME = 3e3,
	BREAK_TIME = 1e3,
	OptionHeight_Offset = 265;
exports.PLAY_FLAG = 8;
class PlotAudioDelegate {
	constructor() {
		(this.AudioDelegate = void 0),
			(this.AudioDelegateEnable = !1),
			(this.Callback = void 0),
			(this.lzi = (e, t) => {
				this.AudioDelegateEnable
					? 3 === e &&
						((e = t),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Plot", 22, "回调音频时长", ["", e.Duration]),
						this.Callback(e.Duration))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Plot", 18, "回调没移除成功");
			});
	}
	Init(e) {
		this.Callback = e;
	}
	Clear() {
		this.Disable(), (this.Callback = void 0);
	}
	Enable() {
		this.AudioDelegateEnable ||
			((this.AudioDelegate = (0, puerts_1.toManualReleaseDelegate)(this.lzi)),
			(this.AudioDelegateEnable = !0));
	}
	Disable() {
		void 0 !== this.AudioDelegate &&
			((0, puerts_1.releaseManualReleaseDelegate)(this.lzi),
			(this.AudioDelegate = void 0)),
			(this.AudioDelegateEnable = !1);
	}
}
exports.PlotAudioDelegate = PlotAudioDelegate;
class PlotTextCommonLogic {
	constructor(e, t, i, o, n, s, l) {
		(this.PlotItem = e),
			(this.NpcName = t),
			(this.NpcTitle = i),
			(this.PlotContent = o),
			(this.LineItem = n),
			(this.TextScrollView = s),
			(this.OptionAdjustItem = l),
			(this.CurrentContent = void 0),
			(this.ywn = ""),
			(this.OVs = 0),
			(this.PlayDelayTime = void 0),
			(this.Bqn = void 0),
			(this.czi = -1),
			(this.dzi = void 0),
			(this.wqn = 1),
			(this.bqn = !1),
			(this.yXt = !1),
			(this.qqn = !1),
			(this.Gqn = void 0),
			(this.Cwn = 0),
			(this.gwn = 0),
			(this.fwn = void 0),
			(this.pwn = void 0),
			(this.vwn = () => {
				if (((this.Gqn = void 0), this.Mwn(), this.TextScrollView)) {
					var e = this.PlotContent.GetTextRenderSize().Y,
						t = this.TextScrollView.GetRootComponent();
					if (e <= this.OVs)
						t.SetHeight(this.OVs),
							this.OptionAdjustItem?.SetHeight(this.OVs + 265);
					else {
						var i = this.PlotContent.GetRenderLineNum(),
							o = this.PlotContent.GetFontSpaceFinal().Y;
						if (i <= 6)
							t.SetHeight(e + o), this.OptionAdjustItem?.SetHeight(e + o + 265);
						else {
							let s = 0;
							for (let e = 1; e <= 6; e++)
								s += this.PlotContent.GetRenderLineHeight(e) + o;
							t.SetHeight(s),
								this.OptionAdjustItem?.SetHeight(s + 265),
								(e = this.Swn());
							let l =
								CommonParamById_1.configCommonParamById.GetIntConfig(
									"PlotAutoScrollDelayCharNum",
								) ?? 25;
							var n =
								((l =
									(t = this.PlotContent.GetDisplayCharLength()) <= l
										? this.PlotContent.GetRenderLineCharNum(0)
										: l) /
									e) *
								1e3;
							let a = (t = t - l);
							1 < i && (a = t - this.PlotContent.GetRenderLineCharNum(0)),
								(this.Cwn = (a / e) * 1e3),
								(this.pwn = TimerSystem_1.TimerSystem.Delay(this.Ewn, n));
						}
					}
				}
			}),
			(this.Ewn = () => {
				(this.gwn = 0),
					(this.fwn = TimerSystem_1.TimerSystem.Forever(() => {
						var e = this.gwn / this.Cwn;
						this.TextScrollView?.SetScrollProgress(e),
							1 <= e &&
								TimerSystem_1.TimerSystem.Has(this.fwn) &&
								TimerSystem_1.TimerSystem.Remove(this.fwn),
							(this.gwn += 100);
					}, 100));
			}),
			(this.Czi = void 0),
			(this.gzi = void 0),
			(this.SubtitleAnimationTimer = void 0),
			(this.IsInteraction = !1),
			(this.IsTextAnimPlaying = !1),
			(this.fzi = void 0),
			(this.pzi = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 打字机结束"),
					(this.Czi.GetPlayTween().from = 1),
					this.vzi(),
					(this.IsTextAnimPlaying = !1),
					(this.yXt = !0),
					this.fzi?.();
			}),
			(this.Mzi = void 0),
			this.PlotItem.SetUIActive(!1),
			this.LineItem.SetUIActive(!1),
			(this.Czi = this.PlotContent.GetOwner().GetComponentByClass(
				UE.LGUIPlayTweenComponent.StaticClass(),
			)),
			(this.gzi = this.PlotContent.GetOwner().GetComponentByClass(
				UE.UIEffectTextAnimation.StaticClass(),
			)),
			(this.ywn = LanguageSystem_1.LanguageSystem.PackageAudio),
			(this.OVs = s?.GetRootComponent()?.GetHeight() ?? 174);
	}
	Clear() {
		this.vzi(),
			this.ClearCurPlayAudio(),
			ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon &&
				((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !1),
				this.Mzi?.Destroy(),
				(this.Mzi = void 0)),
			this.Gqn?.Remove(),
			(this.Gqn = void 0),
			this.Mwn();
	}
	UpdatePlotSubtitle(e) {
		this.ClearPlotContent(), (this.IsInteraction = !1), this.PlaySubtitle(e);
	}
	ClearPlotContent() {
		(this.dzi = void 0),
			(this.bqn = !1),
			(this.yXt = !1),
			(this.IsInteraction = !1),
			(this.qqn = !1),
			(this.wqn = 1),
			this.vzi(),
			this.ClearCurPlayAudio(),
			this.Mwn(),
			this.Gqn?.Remove(),
			(this.Gqn = void 0),
			(this.CurrentContent = void 0);
	}
	Szi() {
		if (!this.qqn && this.CurrentContent.UniversalTone) {
			var e = this.CurrentContent.UniversalTone.TimberId ?? this.dzi?.TimberId,
				t = this.CurrentContent.UniversalTone.UniversalToneId;
			if (e && t) {
				var i =
					InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
						e,
						t,
					);
				if (i) return this.Ezi(i), !0;
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
		return !1;
	}
	yzi() {
		var e,
			t,
			i = this.CurrentContent.TalkAkEvent;
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
	Izi() {
		if (this.qqn) return !1;
		if (
			(this.ywn !== LanguageSystem_1.LanguageSystem.PackageAudio &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Plot",
						27,
						"[PlotTextLogic] 恢复时：音频切换了语言，重播",
					),
				(this.ywn = LanguageSystem_1.LanguageSystem.PackageAudio),
				this.ClearCurPlayAudio()),
			-1 !== this.czi)
		)
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 恢复时：恢复音频播放"),
				AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 2, {
					TransitionDuration: 1e3,
				}),
				this.uzi();
		else if (this.Bqn) this.Bqn.Resume();
		else {
			var e = this.CurrentContent.PlayVoice
				? PlotAudioById_1.configPlotAudioById.GetConfig(
						this.CurrentContent.TidTalk,
					)
				: void 0;
			if (!e) return !1;
			var t =
				ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
					e.ExternalSourceSetting,
				);
			const i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
				e.IsCheckSex,
				e.FileName,
			]);
			(e = (0, AudioSystem_1.parseAudioEventPath)(t.AudioEventPath)),
				PlotTextCommonLogic.Iwn++;
			const o = PlotTextCommonLogic.Iwn;
			(this.czi = AudioSystem_1.AudioSystem.PostEvent(e, void 0, {
				ExternalSourceName: t.ExternalSrcName,
				ExternalSourceMediaName: i,
				CallbackMask: 1048584,
				CallbackHandler: (e, t) => {
					o !== PlotTextCommonLogic.Iwn
						? Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Plot",
								27,
								"[PlotViewHud] 废弃的音频回调",
								["id", o],
								["mediaName", i],
								["type", e],
							)
						: 0 === e
							? (Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 音频播放完毕", [
										"mediaName",
										i,
									]),
								(this.qqn = !0),
								(this.czi = -1),
								PlotTextCommonLogic.Iwn++)
							: 3 === e &&
								((this.PlayDelayTime = t.Duration),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Plot",
										27,
										"[PlotTextLogic] 音频播放开始",
										["mediaName", i],
										["duration", this.PlayDelayTime],
									),
								this._zi(),
								this.bqn || this.uzi());
				},
			})),
				(this.Bqn = TimerSystem_1.TimerSystem.Delay(() => {
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							27,
							"[PlotTextLogic] 加载剧情音频超时，直接显示剧情文本",
						),
						this.ClearCurPlayAudio(),
						(this.PlayDelayTime = void 0),
						this.uzi();
				}, 3e3));
		}
		return !0;
	}
	Ezi(e) {
		if (this.Bqn) this.Bqn.Resume();
		else if (
			(this.ywn !== LanguageSystem_1.LanguageSystem.PackageAudio &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Plot",
						27,
						"[PlotTextLogic] 恢复时：音频切换了语言，重播",
					),
				(this.ywn = LanguageSystem_1.LanguageSystem.PackageAudio),
				this.ClearCurPlayAudio()),
			-1 !== this.czi)
		)
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 恢复时：恢复音频播放"),
				AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 2, {
					TransitionDuration: 1e3,
				}),
				this.uzi();
		else {
			const t = (0, AudioSystem_1.parseAudioEventPath)(e.AkEvent),
				i = PlotTextCommonLogic.Iwn;
			(this.czi = AudioSystem_1.AudioSystem.PostEvent(t, void 0, {
				CallbackMask: 1048584,
				CallbackHandler: (e, o) => {
					i !== PlotTextCommonLogic.Iwn
						? Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Plot",
								27,
								"[PlotViewHud] 废弃的音频回调",
								["id", i],
								["eventName", t],
								["type", e],
							)
						: 0 === e
							? (Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 音频播放完毕", [
										"eventName",
										t,
									]),
								(this.qqn = !0),
								(this.czi = -1),
								PlotTextCommonLogic.Iwn++)
							: 3 === e &&
								((this.PlayDelayTime = o.Duration),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Plot",
										27,
										"[PlotTextLogic] 音频播放开始",
										["eventName", t],
										["duration", this.PlayDelayTime],
									),
								this._zi(),
								this.bqn || this.uzi());
				},
			})),
				(this.Bqn = TimerSystem_1.TimerSystem.Delay(() => {
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Plot",
							18,
							"加载通用语气音频超时，直接显示剧情文本",
						),
						this.ClearCurPlayAudio(),
						(this.PlayDelayTime = void 0),
						this.uzi();
				}, 3e3));
		}
	}
	ClearCurPlayAudio() {
		this._zi(),
			PlotTextCommonLogic.Iwn++,
			AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 0, {
				TransitionDuration: 0,
			}),
			(this.czi = -1);
	}
	_zi() {
		TimerSystem_1.TimerSystem.Has(this.Bqn) &&
			TimerSystem_1.TimerSystem.Remove(this.Bqn),
			(this.Bqn = void 0);
	}
	PlaySubtitle(e) {
		(this.CurrentContent = e),
			this.yzi(),
			"Option" === this.CurrentContent.Type
				? this.PlotItem.SetUIActive(!1)
				: ((e = this.CurrentContent.CaptionParams),
					(this.dzi = SpeakerById_1.configSpeakerById.GetConfig(
						this.CurrentContent.WhoId,
					)),
					e
						? this.uzi(e.TotalTime, e.IntervalTime)
						: this.Izi() || this.Szi() || this.uzi());
	}
	PauseSubtitle() {
		this.CurrentContent &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 暂停字幕"),
			(this.bqn = !0),
			this.Bqn
				? (this.Bqn.Pause(),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 暂停时：音频加载中"))
				: (-1 !== this.czi &&
						(AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 1, {
							TransitionDuration: 1e3,
						}),
						Log_1.Log.CheckDebug()) &&
						Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 暂停时：音频播放中"),
					this.Gqn?.Remove(),
					(this.Gqn = void 0),
					this.Mwn(),
					this.SubtitleAnimationTimer &&
						((this.wqn = this.gzi.GetSelectorOffset()),
						this.Czi.Stop(),
						this.SubtitleAnimationTimer.Pause(),
						Log_1.Log.CheckDebug()) &&
						Log_1.Log.Debug(
							"Plot",
							27,
							"[PlotTextLogic] 暂停时：打字机播放中",
							["offset", this.wqn],
						)));
	}
	ResumeSubtitle(e) {
		(this.bqn = !1), this.PlaySubtitle(e);
	}
	uzi(e, t) {
		this.Tzi(),
			this.Lzi(),
			this.Dzi(e, t),
			(this.Gqn = TimerSystem_1.TimerSystem.Next(this.vwn));
	}
	Tzi() {
		var e;
		this.PlotItem.SetUIActive(!0),
			(this.CurrentContent.Type && "Talk" !== this.CurrentContent.Type) ||
			"InnerVoice" === this.CurrentContent.Style?.Type
				? (this.LineItem.SetUIActive(!1),
					this.NpcName.SetUIActive(!1),
					this.NpcTitle.SetUIActive(!1))
				: (this.LineItem.SetUIActive(!0),
					(e = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, this.dzi.Id)),
					StringUtils_1.StringUtils.IsEmpty(e)
						? this.NpcName.SetUIActive(!1)
						: (this.NpcName.SetUIActive(!0), this.NpcName.SetText(e)),
					(e = PublicUtil_1.PublicUtil.GetConfigTextByTable(1, this.dzi.Id)),
					StringUtils_1.StringUtils.IsEmpty(e)
						? this.NpcTitle.SetUIActive(!1)
						: (this.NpcTitle.SetUIActive(!0), this.NpcTitle.SetText(e)));
	}
	Lzi() {
		let e = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(
			this.CurrentContent.TidTalk,
		);
		StringUtils_1.StringUtils.IsEmpty(e) &&
			(ControllerHolder_1.ControllerHolder.FlowController.LogError("字幕为空", [
				"id",
				this.CurrentContent.TidTalk,
			]),
			(e = this.CurrentContent.TidTalk)),
			(e = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e)),
			this.PlotContent.SetText(e);
	}
	Swn() {
		return this.IsInteraction
			? ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
					.TextAnimSpeedInteraction
			: "LevelC" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
				? ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
						.TextAnimSpeedLevelC
				: ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
						.TextAnimSpeedLevelD;
	}
	Mwn() {
		TimerSystem_1.TimerSystem.Has(this.fwn) &&
			TimerSystem_1.TimerSystem.Remove(this.fwn),
			TimerSystem_1.TimerSystem.Has(this.pwn) &&
				TimerSystem_1.TimerSystem.Remove(this.pwn);
	}
	Dzi(e, t) {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 39, "CD级", [
					"字幕：",
					this.PlotContent.GetText(),
				]),
			this.Czi)
		)
			if (this.SubtitleAnimationTimer)
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Plot",
						27,
						"[PlotTextLogic] 恢复时：恢复打字机动画",
						["offset", this.wqn],
					),
					this.SubtitleAnimationTimer.Resume(),
					(this.Czi.GetPlayTween().from = this.wqn),
					(this.Czi.GetPlayTween().duration *= this.wqn),
					this.Czi.Play();
			else if (this.yXt) this.gzi.SetSelectorOffset(0);
			else {
				var i = this.PlotContent.GetDisplayCharLength();
				this.Czi.Stop();
				let o = 1;
				(o =
					e ||
					(this.IsInteraction
						? i /
							ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
								.TextAnimSpeedInteraction
						: "LevelC" ===
								ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
							? i /
								ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
									.TextAnimSpeedLevelC
							: i /
								ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
									.TextAnimSpeedLevelD)),
					this.gzi.SetSelectorOffset(1),
					(this.Czi.GetPlayTween().duration = o),
					this.Czi.Play(),
					(this.IsTextAnimPlaying = !0),
					(o *= CommonDefine_1.MILLIONSECOND_PER_SECOND),
					t
						? (this.PlayDelayTime = t * CommonDefine_1.MILLIONSECOND_PER_SECOND)
						: this.PlayDelayTime
							? (this.PlayDelayTime = this.PlayDelayTime - o)
							: (this.PlayDelayTime = 0),
					this.Rzi(o);
			}
		else
			Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 19, "找不到字幕动画组件"),
				this.pzi();
	}
	Rzi(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 打字机开始", [
				"duration",
				e,
			]),
			this.vzi(),
			(e = Math.max(e, TimerSystem_1.MIN_TIME)),
			(this.SubtitleAnimationTimer = TimerSystem_1.TimerSystem.Delay(
				this.pzi,
				e,
			));
	}
	vzi() {
		TimerSystem_1.TimerSystem.Has(this.SubtitleAnimationTimer) &&
			TimerSystem_1.TimerSystem.Remove(this.SubtitleAnimationTimer),
			(this.SubtitleAnimationTimer = void 0);
	}
	SetPlotContentAnimFinishCallback(e) {
		this.fzi = e;
	}
	ForceSkipPlotContentAnim() {
		this.Czi.Stop(),
			this.gzi.SetSelectorOffset(0),
			this.Mwn(),
			this.TextScrollView?.SetScrollProgress(1),
			this.pzi();
	}
	GetPlotContentAnimDuration() {
		return this.Czi.GetPlayTween().duration;
	}
	HandlePortraitVisible(e, t, i) {
		t &&
			i &&
			(t.Visible && !ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon
				? ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !0),
					(this.Mzi = new PlotPortraitItem_1.PlotPortraitItem()),
					this.Mzi.OpenAsync(e, t.HeadStyleConfig).finally(i))
				: t.Visible && ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon
					? (this.Mzi.CloseAsync(),
						(this.Mzi = new PlotPortraitItem_1.PlotPortraitItem()),
						this.Mzi.OpenAsync(e, t.HeadStyleConfig).finally(i))
					: !t.Visible &&
							ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon
						? ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !1),
							this.Mzi.CloseAsync().finally(i),
							(this.Mzi = void 0))
						: i());
	}
	async DestroyPortraitItem() {
		ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon &&
			((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !1),
			await this.Mzi.CloseAsync(),
			(this.Mzi = void 0));
	}
}
(exports.PlotTextCommonLogic = PlotTextCommonLogic).Iwn = 0;
