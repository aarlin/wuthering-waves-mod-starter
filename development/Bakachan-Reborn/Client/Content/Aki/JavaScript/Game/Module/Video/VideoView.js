"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.VideoView = void 0);
const UE = require("ue"),
	Application_1 = require("../../../Core/Application/Application"),
	AudioController_1 = require("../../../Core/Audio/AudioController"),
	AudioDefine_1 = require("../../../Core/Audio/AudioDefine"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	PlotSkipComponent_1 = require("../Plot/PlotView/PlotSkipComponent"),
	VideoDefine_1 = require("./VideoDefine"),
	VideoLauncher_1 = require("./VideoLauncher"),
	USE_TICK = !0;
class VideoView extends UiTickViewBase_1.UiTickViewBase {
	constructor() {
		super(...arguments),
			(this.bGo = void 0),
			(this.qGo = void 0),
			(this.GGo = void 0),
			(this.NGo = void 0),
			(this.kGo = 0),
			(this.FGo = 0),
			(this.VGo = void 0),
			(this.HGo = void 0),
			(this.fZi = void 0),
			(this.MUe = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.aIn = !1),
			(this.jGo = !1),
			(this.WGo = !0),
			(this.HPn = void 0),
			(this.jPn = !0),
			(this.KGo = () => {
				ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
					"UI点击跳过(VideoView)",
				);
			}),
			(this.n9s = (e) => {
				(this.OpenParam = e), this.OnStart(), (this.jPn = !1), this.JGo();
			}),
			(this.QGo = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Video",
						28,
						"UE.EApplicationDelegate.ApplicationHasReactivatedDelegate",
						["this.VideoPauseTime", this.HGo],
					),
					(this.WGo = !0),
					this.HGo &&
						(2 !== ModelManager_1.ModelManager.PlatformModel.PlatformType &&
							this.qGo?.Seek(this.HGo),
						this.qGo?.Play(),
						(this.HGo = void 0)),
					this.VGo &&
						this.HGo &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Audio",
								56,
								"[VideoView] ResumeVideo 当前只绑定返回应用，全部音频已在CPP的返回应用时处理，跳过此处的音频 Resume",
							),
						void 0 !== this.NGo) &&
						TimerSystem_1.TimerSystem.IsPause(this.NGo) &&
						TimerSystem_1.TimerSystem.Resume(this.NGo);
			}),
			(this.XGo = () => {
				(this.HGo = this.qGo?.GetTime()),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Video",
							28,
							"UE.EApplicationDelegate.ApplicationWillDeactivateDelegate",
							["this.VideoPauseTime", this.HGo],
						),
					(this.WGo = !1),
					2 !== ModelManager_1.ModelManager.PlatformModel.PlatformType &&
						this.qGo?.Pause(),
					this.VGo &&
						0 !==
							VideoLauncher_1.VideoLauncher.AudioEventResult.PlayingIds
								.length &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Audio",
								56,
								"[VideoView] PauseVideo 当前只绑定切换后台，全部音频已在CPP的切换后台时处理，跳过此处的音频 Pause",
							),
						void 0 === this.NGo ||
							TimerSystem_1.TimerSystem.IsPause(this.NGo) ||
							TimerSystem_1.TimerSystem.Pause(this.NGo));
			}),
			(this.WPn = () => {
				var e = this.OpenParam.RemainViewWhenEnd;
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Video", 39, "开始关闭VideoView", ["bRemain", e]),
					this.HPn &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Video",
								39,
								"MediaPlayer还在倒计时检查状态中,提前移除timer",
							),
						this.HPn.Remove(),
						(this.HPn = void 0),
						this.MFs()),
					e
						? (this.s9s(),
							(0, this.OpenParam?.VideoCloseCb)?.(),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Video", 17, "VideoView callback done"))
						: (this.jPn || this.CloseMe(), (this.jPn = !0));
			}),
			(this.$Go = () => {
				(this.jGo = !0),
					this.WPn(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Video", 28, "视频播放结束", ["视频名称", this.VGo]);
			}),
			(this.YGo = () => {
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Video",
						39,
						"视频文件打开失败,可能需要修复修复系统文件",
					),
					this.WPn();
			}),
			(this.JGo = () => {
				if (this.VGo)
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Video", 39, "必须等上个视频放完才能放下一个"),
						this.WPn();
				else {
					const e = this.OpenParam.VideoDataConf;
					e
						? ((this.MUe = ResourceSystem_1.ResourceSystem.LoadAsync(
								e.CgFile,
								UE.MediaSource,
								(o) => {
									if (o)
										if (
											((this.MUe = ResourceSystem_1.ResourceSystem.InvalidId),
											this.qGo.OpenSource(o))
										) {
											AudioController_1.AudioController.SetState(
												AudioDefine_1.PLOT_VIDEO_GROUP,
												AudioDefine_1.PLOT_VIDEO,
											),
												(this.VGo = e.CgName),
												(this.aIn = !1),
												(o =
													!ModelManager_1.ModelManager.GameModeModel
														.PlayTravelMp4 &&
													(ModelManager_1.ModelManager.PlotModel.IsGmCanSkip ||
														e.CanSkip)),
												ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(
													o,
												),
												(this.GGo = [
													...ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptions(
														this.VGo,
													),
												]),
												this.GGo.sort((e, o) => o.ShowMoment - e.ShowMoment),
												this.zGo(),
												(o =
													ConfigManager_1.ConfigManager.VideoConfig.GetVideoSounds(
														this.VGo,
													));
											for (const e of o) {
												var i = e.EventPath;
												AudioController_1.AudioController.PostEventByUi(
													i,
													VideoLauncher_1.VideoLauncher.AudioEventResult,
												);
											}
											EventSystem_1.EventSystem.Emit(
												EventDefine_1.EEventName.VideoStart,
												this.VGo,
											),
												Log_1.Log.CheckDebug() &&
													Log_1.Log.Debug(
														"Video",
														39,
														"MediaPlayer开始5秒倒计时检查",
													),
												(this.HPn = TimerSystem_1.TimerSystem.Delay(() => {
													(this.HPn = void 0),
														this.qGo
															? this.qGo.IsPlaying() || this.qGo.IsPaused()
																? (Log_1.Log.CheckDebug() &&
																		Log_1.Log.Debug(
																			"Video",
																			39,
																			"MediaPlayer状态检查通过",
																		),
																	this.MFs())
																: (Log_1.Log.CheckWarn() &&
																		Log_1.Log.Warn(
																			"Video",
																			39,
																			"MediaPlayer加载了5秒超时，强制关闭CG界面",
																			["配置名称", e.CgName],
																			["视频路径", e.CgFile],
																		),
																	this.WPn())
															: Log_1.Log.CheckDebug() &&
																Log_1.Log.Debug(
																	"Video",
																	39,
																	"MediaPlayer已经没有了",
																);
												}, 5e3));
										} else
											Log_1.Log.CheckError() &&
												Log_1.Log.Error(
													"Video",
													39,
													"打开视频失败",
													["配置名称", e.CgName],
													["视频路径", e.CgFile],
												),
												this.WPn();
									else
										Log_1.Log.CheckError() &&
											Log_1.Log.Error(
												"Video",
												39,
												"mediaSource加载失败",
												["配置名称", e.CgName],
												["视频路径", e.CgFile],
											),
											this.WPn();
								},
							)),
							this.MUe < 0 &&
								(Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Video",
										39,
										"mediaSource加载失败",
										["配置名称", e.CgName],
										["视频路径", e.CgFile],
									),
								this.WPn()))
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("Video", 39, "事件被错误触发了", [
									"名称",
									EventDefine_1.EEventName.ShowVideo,
								]),
							this.WPn());
				}
			}),
			(this.ZGo = () => {
				var e,
					o = this.qGo.GetVideoTrackAspectRatio(0, 0),
					i =
						UiLayer_1.UiLayer.UiRootItem.GetWidth() /
						UiLayer_1.UiLayer.UiRootItem.GetHeight();
				o < i
					? ((e = UiLayer_1.UiLayer.UiRootItem.GetWidth() / o),
						this.bGo.SetHeight(e),
						this.bGo.SetWidth(UiLayer_1.UiLayer.UiRootItem.GetWidth()))
					: i < o &&
						((e = UiLayer_1.UiLayer.UiRootItem.GetHeight() * o),
						this.bGo.SetWidth(e),
						this.bGo.SetHeight(UiLayer_1.UiLayer.UiRootItem.GetHeight()));
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIButtonComponent],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIButtonComponent],
		];
	}
	OnStart() {
		if (
			(this.GetButton(1).RootUIComp.SetUIActive(!1),
			(this.fZi = new PlotSkipComponent_1.PlotSkipComponent(
				this.GetButton(1),
				this.KGo,
				void 0,
				this,
			)),
			this.fZi.AddEventListener(),
			this.fZi.EnableSkipButton(!1),
			(this.bGo = this.GetButton(0)
				.GetOwner()
				.GetComponentByClass(UE.UITexture.StaticClass())),
			this.bGo)
		) {
			var e = this.bGo.GetTexture(),
				o =
					((this.qGo = e?.GetMediaPlayer()),
					this.qGo ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error("Video", 39, "获取MediaPlayer异常！！")),
					this.qGo.OnEndReached.Add(this.$Go),
					this.qGo.OnMediaOpened.Add(this.ZGo),
					this.qGo.OnMediaOpenFailed.Add(this.YGo),
					this.GetText(2).SetUIActive(!1),
					this.OpenParam?.BackgroundColor?.FadeInBackgroundType ??
						IAction_1.EMovieBackgroundType.Black);
			let i;
			(i =
				o === IAction_1.EMovieBackgroundType.White
					? new UE.LinearColor(1, 1, 1, 1)
					: (IAction_1.EMovieBackgroundType.Black,
						new UE.LinearColor(0, 0, 0, 1))),
				(e.ClearColor = i),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Video", 27, "改变CG界面底色", ["color", o]);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Video", 39, "获取CgTexture异常！！");
	}
	async OnPlayingStartSequenceAsync() {
		const e = new CustomPromise_1.CustomPromise();
		Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 27, "VideoView界面隐藏"),
			this.SetUiActive(!1),
			TimerSystem_1.TimerSystem.Delay(() => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Video", 27, "VideoView界面显示"),
					this.SetUiActive(!0),
					e.SetResult();
			}, 100),
			await e.Promise;
	}
	OnAfterShow() {
		Log_1.Log.CheckDebug() && Log_1.Log.Debug("Video", 28, "VideoView OnShow"),
			(this.jPn = !1),
			this.JGo();
	}
	s9s() {
		void 0 !== this.NGo &&
			(TimerSystem_1.TimerSystem.Remove(this.NGo), (this.NGo = void 0)),
			this.MUe !== ResourceSystem_1.ResourceSystem.InvalidId &&
				(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MUe),
				(this.MUe = ResourceSystem_1.ResourceSystem.InvalidId)),
			(this.VGo = void 0),
			this.qGo?.OnEndReached.Remove(this.$Go),
			this.qGo?.OnMediaOpened.Remove(this.ZGo),
			this.qGo?.OnMediaOpenFailed.Remove(this.YGo),
			this.qGo?.Close(),
			(this.qGo = void 0),
			(this.GGo = void 0),
			(this.HGo = void 0),
			AudioController_1.AudioController.StopEvent(
				VideoLauncher_1.VideoLauncher.AudioEventResult,
				!this.jGo,
			),
			AudioController_1.AudioController.SetState(
				AudioDefine_1.PLOT_VIDEO_GROUP,
				AudioDefine_1.PLOT_NOT_VIDEO,
			),
			(this.aIn = !1),
			this.fZi?.OnClear(),
			this.fZi?.RemoveEventListener(),
			(this.fZi = void 0);
	}
	OnBeforeHide() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Video", 17, "VideoView OnBeforeHide"),
			this.fZi.EnableSkipButton(!1);
	}
	OnBeforeDestroy() {
		this.s9s(),
			(0, this.OpenParam?.VideoCloseCb)?.(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Video", 17, "VideoView callback done");
	}
	OnAddEventListener() {
		Application_1.Application.AddApplicationHandler(1, this.QGo),
			Application_1.Application.AddApplicationHandler(0, this.XGo),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlayVideo,
				this.n9s,
			);
	}
	OnRemoveEventListener() {
		Application_1.Application.RemoveApplicationHandler(1, this.QGo),
			Application_1.Application.RemoveApplicationHandler(0, this.XGo),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlayVideo,
				this.n9s,
			);
	}
	zGo() {
		this.GGo?.length, (this.NGo = void 0);
	}
	eNo(e) {
		if (this.GGo?.length && this.WGo) {
			var o,
				i,
				t = UE.KismetMathLibrary.GetTotalMilliseconds(this.qGo.GetTime());
			let e;
			for (
				;
				0 < this.GGo.length &&
				((e = this.GGo[this.GGo.length - 1]).ShowMoment + e.Duration) *
					VideoDefine_1.VideoUtils.MillisecondPerFrame <
					t;
			)
				this.GGo.pop(),
					this.aIn
						? ((this.aIn = !1),
							this.GetText(2).SetUIActive(!1),
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Video",
									27,
									"CG字幕关闭",
									["id", e.CaptionId],
									["frame", t * VideoDefine_1.VideoUtils.FramePerMillisecond],
									["config frame", e.ShowMoment + e.Duration],
								))
						: Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Video", 27, "CG字幕废弃", ["id", e.CaptionId]),
					(e = void 0);
			!e ||
				this.aIn ||
				t < e.ShowMoment * VideoDefine_1.VideoUtils.MillisecondPerFrame ||
				((this.aIn = !0),
				(o = this.GetText(2)),
				(i = ConfigManager_1.ConfigManager.VideoConfig.GetVideoCaptionText(e)),
				o.SetUIActive(!0),
				o.SetText(i),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Video",
						27,
						"CG字幕",
						["text", i],
						["frame", t * VideoDefine_1.VideoUtils.FramePerMillisecond],
						["config frame", e.ShowMoment],
						["id", e.CaptionId],
					));
		}
	}
	MFs() {
		var e = this.OpenParam?.BackgroundColor?.FadeOutBackgroundType;
		let o,
			i = !0;
		switch (e) {
			case IAction_1.EMovieBackgroundType.White:
				(o = new UE.LinearColor(1, 1, 1, 1)),
					(i =
						ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(
							IAction_1.EFadeInScreenShowType.White,
						));
				break;
			case IAction_1.EMovieBackgroundType.Black:
				(o = new UE.LinearColor(0, 0, 0, 1)),
					(i =
						ControllerHolder_1.ControllerHolder.LevelLoadingController.CameraFade.SetColor(
							IAction_1.EFadeInScreenShowType.Black,
						));
				break;
			default:
				o = new UE.LinearColor(0, 0, 0, 1);
		}
		i ||
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Video",
					27,
					"[VideoView] 当前未开启黑幕界面，继承颜色失败",
				)),
			(this.bGo.GetTexture().ClearColor = o),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Video", 27, "改变CG界面底色", ["color", e]);
	}
	OnTick(e) {
		this.eNo(e);
	}
}
exports.VideoView = VideoView;
