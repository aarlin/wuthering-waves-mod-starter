"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils"),
	LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
	UiManager_1 = require("../../Ui/UiManager"),
	TimeTrackController_1 = require("../TimeTrackControl/TimeTrackController"),
	CAMERA_TAG = new UE.FName("SequenceCamera");
class SimpleLevelSequenceActor {
	constructor(e) {
		(this.bPe = void 0),
			(this.qPe = void 0),
			(this.GPe = UE.NewArray(UE.Actor)),
			(this.NPe = 0),
			(this.OPe = 0),
			(this.kPe = 0),
			(this.FPe = 0),
			(this.VPe = 0),
			(this.HPe = 0),
			(this.jPe = 0),
			(this.WPe = 0),
			(this.KPe = !1),
			(this.QPe = !1),
			(this.XPe = !1),
			(this.$Pe = ""),
			(this.YPe = !1),
			(this.JPe = !1),
			(this.zPe = 0),
			(this.exe = void 0),
			(this.txe = !1),
			(this.ixe = 0),
			(this.oxe = 0),
			(this.rxe = !1),
			(this.nxe = 1),
			(this.sxe = !1),
			(this.axe = () => {
				CameraController_1.CameraController.SequenceCamera.GetComponent(
					10,
				)?.GetIsInCinematic()
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("UiCore", 46, "DoPlayToMark在Cinematic因此跳过"),
						(this.XPe = !0),
						this.PlayLevelsequence(this.$Pe, this.XPe))
					: this.sxe
						? this.PlayLevelsequence(this.$Pe, this.XPe)
						: this.XPe || !this.hxe
							? (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"UiCore",
										46,
										"DoPlayToMark为JumpToEnd或者没有camera轨道",
										[
											"CameraMode",
											ModelManager_1.ModelManager.CameraModel?.CameraMode,
										],
									),
								this.PlayLevelsequence(this.$Pe, this.XPe))
							: (this.YPe
									? Log_1.Log.CheckInfo() &&
										Log_1.Log.Info("UiCore", 46, "DoPlayToMark非首次绑定", [
											"CameraMode",
											ModelManager_1.ModelManager.CameraModel?.CameraMode,
										])
									: Log_1.Log.CheckInfo() &&
										Log_1.Log.Info("UiCore", 46, "DoPlayToMark首次绑定", [
											"CameraMode",
											ModelManager_1.ModelManager.CameraModel?.CameraMode,
										]),
								1 === this.jPe
									? this.lxe(
											this.ixe,
											this.VPe,
											this.NPe,
											this.OPe,
											() => {
												this._xe();
											},
											() => {
												this.PlayLevelsequence(this.$Pe, this.XPe);
											},
										)
									: this._xe(() => {
											this.PlayLevelsequence(this.$Pe, this.XPe);
										}));
			}),
			(this.B_e = () => {
				(this.exe = void 0),
					CameraController_1.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(
						this,
					),
					(this.rxe = !1),
					LevelLoadingController_1.LevelLoadingController.CloseLoading(9),
					this.JPe ||
						ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi ||
						CameraController_1.CameraController.SceneCamera.DisplayComponent.SetUiActive(
							!0,
						);
			}),
			(this.bPe = e).HasBindingTag(CAMERA_TAG, !0) && (this.hxe = !0),
			this.mxe();
	}
	UpdateSettings(e) {
		this.JPe = e ?? !1;
	}
	ForceSwitchSceneCamera(e) {
		return this.qPe?.IsValid()
			? this.hxe
				? ((this.sxe = !0),
					e
						? ((this.txe = !0),
							this._xe(() => {
								UiManager_1.UiManager.OpenView(
									"TimeTrackControlView",
									void 0,
									(e) => {
										e
											? CameraController_1.CameraController.Model.IsToSceneCameraMode() ||
												(TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
												TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose(),
												UiManager_1.UiManager.GetViewByName(
													"TimeTrackControlView",
												)?.CloseMe())
											: (TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
												TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose());
									},
								);
							}))
						: ((this.txe = !1), this.dxe()),
					!0)
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"SceneGameplay",
							46,
							"时间控制装置启动请求:失败，!this.HasCameraTrack",
						),
					!1)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"SceneGameplay",
						46,
						"时间控制装置启动请求:失败，!this.Director?.IsValid()",
					),
				!1);
	}
	PlayToMarkOld(e, t, a, i) {
		this.Cxe(e) &&
			((this.$Pe = e),
			(this.NPe = t),
			(this.FPe = a),
			(this.XPe = i),
			(this.zPe = 0),
			this.gxe());
	}
	PlayToMark(e, t, a, i) {
		if (this.Cxe(e)) {
			if (((this.$Pe = e), t))
				switch (((this.jPe = t.TransitType), this.jPe)) {
					case 0:
						(this.VPe = t.Duration ?? 0),
							(this.NPe = t.Duration ?? 0),
							(this.OPe = 0),
							(this.KPe = t.IsValid ?? !1);
						break;
					case 1:
						(this.VPe = t.Duration ?? 0),
							(this.NPe = t.TransitFadeIn ?? 0),
							(this.OPe = t.TransitFadeOut ?? 0),
							(this.KPe = t.IsValid ?? !1),
							(this.ixe = t.Mask);
				}
			if (a)
				switch (((this.WPe = a.TransitType), this.WPe)) {
					case 0:
						(this.HPe = a.Duration ?? 0),
							(this.kPe = 0),
							(this.FPe = a.Duration ?? 0),
							(this.QPe = a.IsValid ?? !1);
						break;
					case 1:
						(this.HPe = a.Duration ?? 0),
							(this.kPe = a.TransitFadeIn ?? 0),
							(this.FPe = a.TransitFadeOut ?? 0),
							(this.QPe = a.IsValid ?? !1),
							(this.oxe = a.Mask);
				}
			(this.XPe = i), (this.zPe = 0), this.gxe();
		}
	}
	gxe() {
		ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed
			? this.axe()
			: EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.WorldDoneAndCloseLoading,
					this.axe,
				);
	}
	PlayLevelsequence(e, t) {
		if (this.qPe?.IsValid()) {
			var a = this.qPe.SequencePlayer;
			if (a?.IsValid()) {
				if (t)
					a.Play(),
						a.SetPlaybackPosition(
							new UE.MovieSceneSequencePlaybackParams(
								new UE.FrameTime(),
								0,
								e,
								2,
								1,
							),
						),
						a.Pause();
				else
					switch (this.zPe) {
						case 0:
							a.PlayTo(
								new UE.MovieSceneSequencePlaybackParams(
									new UE.FrameTime(),
									0,
									e,
									2,
									0,
								),
							);
							break;
						case 1:
							a.PlayTo_Circle(
								new UE.MovieSceneSequencePlaybackParams(
									new UE.FrameTime(),
									0,
									e,
									2,
									0,
								),
								!0,
							);
					}
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Interaction",
						34,
						"LevelSequence播放至对应mark",
						["levelSequence", this.bPe.GetName()],
						["mark", e],
					);
			}
		}
	}
	mxe() {
		var e =
			(((e =
				new UE.MovieSceneSequencePlaybackSettings()).bDisableMovementInput =
				!1),
			(e.bDisableLookAtInput = !1),
			(this.qPe = ActorSystem_1.ActorSystem.Get(
				UE.LevelSequenceActor.StaticClass(),
				new UE.Transform(),
				void 0,
				!1,
			)),
			(this.qPe.PlaybackSettings = e),
			this.qPe.SetSequence(this.bPe),
			this.qPe.SequencePlayer);
		e?.IsValid()
			? (e.OnPause.Add(this.pxe.bind(this)),
				e.OnStop.Add(this.vxe.bind(this)),
				e.OnFinished.Add(this.Mxe.bind(this)))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Level", 46, "SimpleLevelSequenceActor 没找到Player");
	}
	vxe() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Level", 34, "SimpleLevelSequenceActor OnSequenceStop", [
				"levelSequence",
				this.bPe.GetName(),
			]);
	}
	pxe() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Level", 34, "SimpleLevelSequenceActor OnSequencePause", [
				"levelSequence",
				this.bPe.GetName(),
			]),
			this.XPe ||
				(1 !== this.WPe || this.sxe
					? this.Sxe()
					: this.lxe(
							this.oxe,
							this.HPe,
							this.kPe,
							this.FPe,
							() => {
								CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
									this.exe,
									void 0,
									this.WPe,
								);
							},
							() => {
								this.Sxe();
							},
						));
	}
	Mxe() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Level",
				34,
				"SimpleLevelSequenceActor OnSequenceFinish",
				["levelSequence", this.bPe.GetName()],
			),
			this.XPe ||
				(1 !== this.WPe || this.sxe
					? this.Sxe()
					: this.lxe(
							this.oxe,
							this.HPe,
							this.kPe,
							this.FPe,
							() => {
								CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
									this.exe,
									void 0,
									this.WPe,
								);
							},
							() => {
								this.Sxe();
							},
						));
	}
	Sxe() {
		(Global_1.Global.CharacterCameraManager.FadeAmount = 0),
			!this.hxe ||
				(ModelManager_1.ModelManager.StaticSceneModel
					.IsNotAutoExitSceneCamera &&
					this.txe) ||
				this.sxe ||
				this.dxe();
	}
	Cxe(e) {
		var t = this.bPe.GetMovieScene();
		let a = !1;
		if (t)
			for (let i = 0; i < t.MarkedFrames.Num(); i++)
				if (t.MarkedFrames.Get(i).Label === e) {
					a = !0;
					break;
				}
		return (
			!!a ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"Interaction",
					34,
					"mark配置不合法",
					["levelSequence", this.bPe.GetName()],
					["mark", e],
				),
			!1)
		);
	}
	_xe(e = () => {}) {
		var t;
		this.qPe?.IsValid()
			? ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()
				? (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"Camera",
							46,
							"SimpleLevelSeqeunce:演出中触发了场景镜头切换 请检查配置",
						),
					e())
				: ((t = this.qPe.SequencePlayer.IsPlaying()),
					this.JPe ||
						ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi ||
						t ||
						CameraController_1.CameraController.SceneCamera.DisplayComponent.SetUiActive(
							!1,
						),
					this.exe?.IsBinding ||
						((this.exe =
							CameraController_1.CameraController.SceneCamera.DisplayComponent.GetUnBoundSceneCamera(
								0,
							)),
						(this.exe.IsKeepUi = this.JPe),
						this.KPe
							? (this.exe.FadeIn = 0 !== this.NPe ? this.NPe : this.VPe)
							: (this.exe.FadeIn = 0),
						this.QPe
							? (this.exe.FadeOut = 0 !== this.FPe ? this.FPe : this.HPe)
							: (this.exe.FadeOut = 0)),
					this.GPe.Empty(),
					this.GPe.Add(this.exe.Camera),
					this.qPe.SetBindingByTag(CAMERA_TAG, this.GPe, !0),
					3 === ModelManager_1.ModelManager.CameraModel.CameraMode
						? ((this.YPe = !0),
							(this.exe.IsBinding = !0),
							CameraController_1.CameraController.SceneCamera.PlayerComponent.EnterSceneSubCamera(
								this.exe,
							),
							e())
						: this.sxe
							? 1 === this.jPe
								? this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
										CameraController_1.CameraController.EnterCameraMode(
											3,
											0,
											0,
											0,
											() => {
												CameraController_1.CameraController.Model.IsToSceneCameraMode()
													? e()
													: (TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
														TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose());
											},
											!0,
										);
									})
								: CameraController_1.CameraController.EnterCameraMode(
										3,
										this.NPe ?? 1,
										0,
										0,
										() => {
											CameraController_1.CameraController.Model.IsToSceneCameraMode()
												? e()
												: (TsInteractionUtils_1.TsInteractionUtils.ClearCurrentOpenViewName(),
													TimeTrackController_1.TimeTrackController.HandleTimeTrackControlViewClose());
										},
										!0,
									)
							: (this.YPe
									? Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Level",
											34,
											"EnterSceneCamera CameraBindFinished为True",
											["levelSequence", this.bPe.GetName()],
										)
									: Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Level",
											34,
											"EnterSceneCamera CameraBindFinished为False",
											["levelSequence", this.bPe.GetName()],
										),
								CameraController_1.CameraController.EnterCameraMode(
									3,
									this.NPe ?? 1,
									0,
									0,
									e,
								) || e(),
								(this.YPe = !0),
								(this.exe.IsBinding = !0)))
			: (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"UiCore",
						46,
						"SimpleLevelSeqeunce:EnterSceneCamera Director为空",
					),
				e());
	}
	dxe() {
		this.qPe.ResetBindings(),
			(this.YPe = !1),
			this.exe?.IsBinding
				? this.sxe
					? 1 === this.WPe
						? this.lxe(this.ixe, this.VPe, this.NPe, this.OPe, () => {
								(this.exe.FadeOut = 0),
									CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
										this.exe,
										this.B_e,
										this.WPe,
									);
							})
						: ((this.exe.FadeOut = 0 !== this.FPe ? this.FPe : this.HPe),
							CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
								this.exe,
								this.B_e,
								this.WPe,
							))
					: 1 === this.WPe
						? this.B_e()
						: CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
								this.exe,
								this.B_e,
								this.WPe,
							)
				: this.B_e();
	}
	lxe(e, t, a, i, r = () => {}, o = () => {}) {
		CameraController_1.CameraController.FightCamera.LogicComponent.CameraInputController.Lock(
			this,
		),
			(this.rxe = !0),
			LevelLoadingController_1.LevelLoadingController.OpenLoading(
				9,
				3,
				() => {
					r && r(),
						t <= 0
							? LevelLoadingController_1.LevelLoadingController.CloseLoading(
									9,
									() => {
										o && o();
									},
									i ?? 0,
								)
							: TimerSystem_1.TimerSystem.Delay(
									() => {
										LevelLoadingController_1.LevelLoadingController.CloseLoading(
											9,
											() => {
												o && o();
											},
											i ?? 0,
										);
									},
									1e3 * t ?? 0,
								);
				},
				a ?? 0,
				0 === e
					? IAction_1.EFadeInScreenShowType.Black
					: IAction_1.EFadeInScreenShowType.White,
			);
	}
	SetSequenceData(e) {
		e !== this.bPe && ((this.bPe = e), this.qPe.SetSequence(e));
	}
	Clear() {
		if (
			(EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				this.axe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.WorldDoneAndCloseLoading,
					this.axe,
				),
			this.exe &&
				(this.exe.IsBinding &&
					(this.JPe ||
						ModelManager_1.ModelManager.StaticSceneModel.IsForceKeepUi ||
						this.txe ||
						CameraController_1.CameraController.SceneCamera.DisplayComponent.SetUiActive(
							!0,
						),
					CameraController_1.CameraController.SceneCamera.PlayerComponent.ExitSceneSubCamera(
						this.exe,
					)),
				CameraController_1.CameraController.SceneCamera.DisplayComponent.RemoveBoundSceneCamera(
					this.exe,
				)),
			this.qPe?.IsValid())
		) {
			const e = this.qPe;
			e.SequencePlayer?.Stop(),
				TimerSystem_1.TimerSystem.Next(() => {
					ActorSystem_1.ActorSystem.Put(e);
				}),
				(this.qPe = void 0);
		}
		this.rxe &&
			(CameraController_1.CameraController.FightCamera.LogicComponent.CameraInputController.Unlock(
				this,
			),
			(this.rxe = !1));
	}
	PlayToMarkByCheckWay(e, t, a, i) {
		if (this.Cxe(e)) {
			if (((this.$Pe = e), t))
				switch (((this.jPe = t.TransitType), this.jPe)) {
					case 0:
						(this.VPe = t.Duration ?? 0),
							(this.NPe = t.Duration ?? 0),
							(this.OPe = 0),
							(this.KPe = t.IsValid ?? !1);
						break;
					case 1:
						(this.VPe = t.Duration ?? 0),
							(this.NPe = t.TransitFadeIn ?? 0),
							(this.OPe = t.TransitFadeOut ?? 0),
							(this.KPe = t.IsValid ?? !1),
							(this.ixe = t.Mask);
				}
			if (a)
				switch (((this.WPe = a.TransitType), this.WPe)) {
					case 0:
						(this.HPe = a.Duration ?? 0),
							(this.kPe = 0),
							(this.FPe = a.Duration ?? 0),
							(this.QPe = a.IsValid ?? !1);
						break;
					case 1:
						(this.HPe = a.Duration ?? 0),
							(this.kPe = a.TransitFadeIn ?? 0),
							(this.FPe = a.TransitFadeOut ?? 0),
							(this.QPe = a.IsValid ?? !1),
							(this.oxe = a.Mask);
				}
			(this.XPe = i), this.CheckLatestWay(), this.gxe();
		}
	}
	GetMarkValue(e) {
		var t = this.bPe.GetMovieScene();
		for (let a = 0; a < t.MarkedFrames.Num(); a++)
			if (t.MarkedFrames.Get(a).Label === e)
				return this.Exe(t.MarkedFrames.Get(a).FrameNumber.Value);
	}
	CheckLatestWay() {
		var e, t, a, i;
		this.bPe.GetMovieScene()
			? ((i = this.qPe.SequencePlayer),
				(e = this.GetMarkValue(this.$Pe)),
				(t = i.GetStartTime().Time.FrameNumber.Value),
				(a = i.GetEndTime().Time.FrameNumber.Value),
				(i = i.GetCurrentTime().Time.FrameNumber.Value),
				Math.abs(e - i) > Math.abs(a - t - Math.abs(e - i))
					? (this.zPe = 1)
					: (this.zPe = 0))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Interaction", 46, "检查最短路径，但movieScene为空");
	}
	Exe(e) {
		var t = this.bPe.GetMovieScene();
		return (e * t.DisplayRate.Numerator) / t.TickResolution.Numerator;
	}
	SetTimeDilation(e) {
		this.nxe !== e && ((this.nxe = e), this.yxe());
	}
	yxe() {
		var e = this.nxe;
		this.qPe.SequencePlayer.SetPlayRate(e);
	}
}
exports.default = SimpleLevelSequenceActor;
