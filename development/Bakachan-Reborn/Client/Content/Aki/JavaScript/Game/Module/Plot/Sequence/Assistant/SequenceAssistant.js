"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SequenceAssistant = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
	Log_1 = require("../../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
	Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
	Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
	ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	CameraController_1 = require("../../../../Camera/CameraController"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	Global_1 = require("../../../../Global"),
	GlobalData_1 = require("../../../../GlobalData"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LevelLoadingController_1 = require("../../../LevelLoading/LevelLoadingController"),
	LoginDefine_1 = require("../../../Login/Data/LoginDefine"),
	SequenceController_1 = require("../SequenceController"),
	SequenceDefine_1 = require("../SequenceDefine"),
	SeqBaseAssistant_1 = require("./SeqBaseAssistant");
class SequenceAssistant extends SeqBaseAssistant_1.SeqBaseAssistant {
	constructor() {
		super(...arguments),
			(this.vto = ResourceSystem_1.ResourceSystem.InvalidId),
			(this.Mto = void 0),
			(this.Sto = !1),
			(this.Eto = void 0),
			(this.yto = void 0);
	}
	Load(e) {
		StringUtils_1.StringUtils.IsEmpty(this.Model.Config?.Path)
			? (ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"剧情SequenceDA路径为空，检查配置",
				),
				e(!1))
			: (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Plot", 39, "[剧情加载等待] SequenceDA-开始"),
				(this.vto = ResourceSystem_1.ResourceSystem.LoadAsync(
					this.Model.Config.Path,
					UE.BP_SequenceData_C,
					(t) => {
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Plot", 39, "[剧情加载等待] SequenceDA-结束"),
							(this.vto = ResourceSystem_1.ResourceSystem.InvalidId),
							ObjectUtils_1.ObjectUtils.IsValid(t)
								? ((this.Model.SequenceData = t),
									(this.vto = ResourceSystem_1.ResourceSystem.InvalidId),
									e(!0))
								: e(!1);
					},
				)));
	}
	PreAllPlay() {
		void 0 === this.Model.EndLeastTime &&
			((this.Model.EndLeastTime =
				ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.SequenceEndLeastTime),
			this.Model.EndLeastTime <
				TimerSystem_1.MIN_TIME * TimeUtil_1.TimeUtil.Millisecond) &&
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Plot",
					27,
					"配置的最后一句话淡出时间不能小于最小时间",
					["CurTime", this.Model.EndLeastTime],
					["MinTime", TimerSystem_1.MIN_TIME * TimeUtil_1.TimeUtil.Millisecond],
				),
			(this.Model.EndLeastTime = SequenceDefine_1.DEFAULT_LAST_SUBTITLE_TIME)),
			this.Ito(),
			this.Model.UseRuntimeData
				? (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 27, "运行时获取FadeEnd数据"),
					this.Tto())
				: this.Lto(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "处理FadeEnd数据完成", [
					"FadeEnd",
					this.Model.IsFadeEnd,
				]),
			this.Model.SequenceData.SaveFinalTransform
				? (this.Model.UseRuntimeData
						? (Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Plot", 27, "运行时处理SequenceData最终位置"),
							this.Dto())
						: this.Rto(),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Plot", 27, "处理SequenceData数据完成", [
							"FinalPosNum",
							this.Model.CurFinalPos.length,
						]))
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Plot", 39, "不使用最终位置");
	}
	PreEachPlay() {
		var e = this.Model.GetCurrentSequence();
		ObjectUtils_1.ObjectUtils.IsValid(e)
			? ((this.Sto = !0),
				this.Uto(),
				this.Ato(),
				this.Pto(),
				this.Model.UseRuntimeData
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Plot", 27, "运行时处理SequenceData帧信息"),
						this.xto())
					: this.wto(),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Plot",
						27,
						"处理SequenceData数据完成",
						["SubtitleStartNum", this.Model.CurSubtitleStartFrames.length],
						["SubtitleEndNum", this.Model.CurSubtitleEndFrames.length],
						["ShotStartNum", this.Model.CurShotStartFrames.length],
						["ShotEndNum", this.Model.CurShotEndFrames.length],
					))
			: ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"剧情Sequence失效",
					["index", this.Model.SubSeqIndex],
				);
	}
	Play(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Plot", 27, "开始播放剧情Sequence：", [
				"Name",
				this.Model.CurLevelSeqActor.GetSequence().GetName(),
			]),
			LevelLoadingController_1.LevelLoadingController.CloseLoading(
				0,
				void 0,
				0,
			),
			(this.Model.NeedsQueueLatentAction = !0);
		const t = UE.NewArray(UE.BuiltinInt);
		this.Model.CurSubtitleStartFrames?.forEach((e) => {
			t.Add(e);
		}),
			this.Model.CurSubtitleEndFrames?.forEach((e) => {
				t.Add(e);
			}),
			this.Model.CurLevelSeqActor.SequencePlayer.SetKeyFrames(t),
			this.Model.TwiceAnimFlag
				? (UE.KismetSystemLibrary.ExecuteConsoleCommand(
						GlobalData_1.GlobalData.World,
						"Animation.ForbiddenEvaluateTwice 0",
					),
					this.Model.CurLevelSeqActor.SequencePlayer.Play(),
					UE.KismetSystemLibrary.ExecuteConsoleCommand(
						GlobalData_1.GlobalData.World,
						"Animation.ForbiddenEvaluateTwice 1",
					))
				: this.Model.CurLevelSeqActor.SequencePlayer.Play(),
			SequenceController_1.SequenceController.TriggerCutChange(),
			(this.Model.TalkNpcList = this.Model.CurLevelSeqActor?.GetBindingByTag(
				SequenceDefine_1.TALK_NPC_TAG,
				!0,
			)),
			(this.Model.NeedsQueueLatentAction = !1),
			this.Model.RunLatentActions(),
			(this.Model.IsPaused = !1),
			(this.yto = e),
			this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Add(e);
	}
	EachStop() {
		SequenceController_1.SequenceController.FlushDialogueState(),
			(this.Sto = !1),
			this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Clear(),
			(this.yto = void 0),
			this.Model.CurLevelSeqActor.SequencePlayer.ClearKeyFrames(),
			this.Model.CurLevelSeqActor.ResetBindings(),
			ActorSystem_1.ActorSystem.Put(this.Model.CurLevelSeqActor),
			(this.Model.CurLevelSeqActor = void 0),
			(this.Model.TalkNpcList = void 0),
			this.Bto();
	}
	AllStop() {}
	End() {
		this.vto !== ResourceSystem_1.ResourceSystem.InvalidId &&
			(ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.vto),
			(this.vto = ResourceSystem_1.ResourceSystem.InvalidId)),
			this.Sto &&
				(this.Model.CurLevelSeqActor.SequencePlayer.OnStop.Clear(),
				this.Model.CurLevelSeqActor.SequencePlayer.GoToEndAndStop(0),
				this.Model.CurLevelSeqActor.ResetBindings(),
				ActorSystem_1.ActorSystem.Put(this.Model.CurLevelSeqActor),
				(this.Model.CurLevelSeqActor = void 0)),
			this.Mto && this.Mto.Remove(),
			(this.Model.RelativeTransform = void 0),
			(this.Sto = !1),
			this.Bto();
	}
	Uto() {
		var e = this.Model.GetCurrentSequence();
		switch (ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(9)) {
			case LoginDefine_1.ELoginSex.Boy:
				UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
					e,
					SequenceDefine_1.MALE_TAG,
					!1,
				),
					UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
						e,
						SequenceDefine_1.FEMALE_TAG,
						!0,
					);
				break;
			case LoginDefine_1.ELoginSex.Girl:
				UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
					e,
					SequenceDefine_1.FEMALE_TAG,
					!1,
				),
					UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
						e,
						SequenceDefine_1.MALE_TAG,
						!0,
					);
				break;
			default:
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Plot", 27, "剧情Seq播放时无法获取性别"),
					UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
						e,
						SequenceDefine_1.FEMALE_TAG,
						!0,
					),
					UE.KuroSequenceRuntimeFunctionLibrary.MuteTrackByTag(
						e,
						SequenceDefine_1.MALE_TAG,
						!0,
					);
		}
		UE.KuroSequenceRuntimeFunctionLibrary.ResetMovieSceneCompiledData(e);
		var t = e.MovieScene.MasterTracks,
			r = t?.Num() || 0;
		for (let e = 0; e < r; e++) {
			var o = t.Get(e);
			if (o instanceof UE.MovieSceneSubTrack) {
				var a = o.Sections,
					i = a?.Num() || 0;
				for (let e = 0; e < i; e++) {
					var n = a.Get(e);
					n instanceof UE.MovieSceneSubSection &&
						UE.KuroSequenceRuntimeFunctionLibrary.ResetMovieSceneCompiledData(
							n.SubSequence,
						);
				}
			}
		}
	}
	Ato() {
		var e = this.Model.GetCurrentSequence(),
			t = ActorSystem_1.ActorSystem.Spawn(
				UE.LevelSequenceActor.StaticClass(),
				new UE.Transform(),
				void 0,
			),
			r =
				(((r = new UE.MovieSceneSequencePlaybackSettings()).PlayRate =
					this.Model.PlayRate),
				(t.PlaybackSettings = r),
				t.SetSequence(e),
				(this.Model.CurLevelSeqActor = t),
				this.Model.CurLevelSeqActor.SequencePlayer);
		(this.Model.CurStartFrame = r.GetStartTime().Time.FrameNumber.Value),
			(this.Model.CurEndFrame = r.GetEndTime().Time.FrameNumber.Value),
			(e = r.GetFrameRate());
		(this.Model.CurFrameRate = e.Numerator / e.Denominator),
			0 !== this.Model.CurStartFrame &&
				Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Plot", 18, "剧情Seq开始帧不规范，编号不是0");
	}
	Ito() {
		if (!this.Model.SequenceData.是否固定起始点) {
			let r;
			if (this.Model.SequenceData.IsTransformOverride)
				r = this.Model.SequenceData.OverrideTransform;
			else if (
				!StringUtils_1.StringUtils.IsEmpty(
					this.Model.SequenceData.绑定起始点标签,
				)
			)
				switch (this.Model.SequenceData.绑定起始点标签) {
					case "Player":
						r = Global_1.Global.BaseCharacter.GetTransform();
						break;
					case "SequenceCamera":
						r =
							CameraController_1.CameraController.SequenceCamera.GetComponent(
								9,
							).CineCamera.GetTransform();
						break;
					default:
						for (var [e, t] of this.Model.BindingEntityMap)
							if (e.toString() === this.Model.SequenceData.绑定起始点标签) {
								r = t.Entity.GetComponent(1).ActorTransform;
								break;
							}
				}
			r
				? (this.Model.RelativeTransform = Transform_1.Transform.Create(r))
				: ControllerHolder_1.ControllerHolder.FlowController.LogError(
						"需要绑定起始点的Sequence读不到坐标",
						["UseTransform", this.Model.SequenceData.IsTransformOverride],
						["UseTag", this.Model.SequenceData.绑定起始点标签],
					);
		}
	}
	Pto() {
		var e;
		this.Model.RelativeTransform &&
			((this.Model.CurLevelSeqActor.bOverrideInstanceData = !0),
			((e = this.Model.CurLevelSeqActor.DefaultInstanceData).TransformOrigin =
				this.Model.RelativeTransform.ToUeTransform()),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug(
				"Plot",
				27,
				"剧情Sequence起始点被改变",
				["x", e.TransformOrigin.GetTranslation().X],
				["y", e.TransformOrigin.GetTranslation().Y],
				["z", e.TransformOrigin.GetTranslation().Z],
			);
	}
	Bto() {
		(this.Model.CurSubtitleStartFrames.length = 0),
			(this.Model.CurSubtitleEndFrames.length = 0),
			(this.Model.CurShotStartFrames.length = 0),
			(this.Model.CurShotEndFrames.length = 0),
			(this.Model.CurStartFrame = void 0),
			(this.Model.CurEndFrame = void 0);
	}
	wto() {
		var e = this.Model.GetCurrentKeyFramesInfo(),
			t = e.SubtitleStartFrames,
			r = t.Num();
		for (let e = 0; e < r; e++)
			this.Model.CurSubtitleStartFrames.push(t.Get(e));
		var o = e.SubtitleEndFrames,
			a = o.Num();
		for (let e = 0; e < a; e++) this.Model.CurSubtitleEndFrames.push(o.Get(e));
		var i = e.ShotStartFrames,
			n = i.Num();
		for (let e = 0; e < n; e++) this.Model.CurShotStartFrames.push(i.Get(e));
		var s = e.ShotEndFrames,
			l = s.Num();
		for (let e = 0; e < l; e++) this.Model.CurShotEndFrames.push(s.Get(e));
	}
	Tto() {
		this.Model.IsFadeEnd.length = 0;
		var e = this.Model.SequenceData;
		for (let n = 0; n < e.剧情资源.Num(); n++) {
			var t = e.剧情资源.Get(n),
				r = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackEnd(t) - 1;
			let s = 0;
			if (
				((s = this.GetFadeAmountAt(t, r)),
				(t =
					(t = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(
						t,
						UE.MovieSceneCinematicShotTrack.StaticClass(),
					)) && 0 < t.Num()
						? t.Get(0)
						: void 0),
				ObjectUtils_1.ObjectUtils.IsValid(t))
			) {
				var o = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(t);
				if (0 < o.Num()) {
					let e,
						n = 0,
						l = 0,
						u = 0;
					for (let t = o.Num() - 1; 0 <= t; t--) {
						var a = o.Get(t);
						let i = UE.KuroSequenceRuntimeFunctionLibrary.GetEndFrame(a);
						(i = i > r ? r : i) > n &&
							((e = a),
							(u = e.Parameters.StartFrameOffset.Value),
							(l = UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(e)),
							(n = i));
					}
					var i;
					t = e?.GetSequence();
					ObjectUtils_1.ObjectUtils.IsValid(t) &&
						((i =
							r -
							l +
							u +
							(i = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(t))),
						0 <= (t = this.GetFadeAmountAt(t, i))) &&
						(s = t);
				}
			}
			this.Model.IsFadeEnd.push(0.9 < s);
		}
	}
	GetFadeAmountAt(e, t) {
		var r = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(
			e,
			UE.MovieSceneFadeTrack.StaticClass(),
		);
		if (!r || r.Num() <= 0) return -1;
		var o = [];
		for (let e = 0; e < r.Num(); e++) {
			var a = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(r.Get(e));
			for (let e = 0; e < a.Num(); e++) o.push(a.Get(e));
		}
		if (0 === o.length) return -1;
		let i = 0;
		var n = new UE.FrameTime(new UE.FrameNumber(t), 0);
		for (const e of o) {
			var s = e;
			if (UE.KuroSequenceRuntimeFunctionLibrary.SectionContains(s, n)) {
				i =
					0 !== s.FloatCurve.Times.Num() || s.FloatCurve.bHasDefaultValue
						? UE.KuroSequenceRuntimeFunctionLibrary.GetFadeAmountAt(s, n)
						: -1;
				break;
			}
		}
		return i;
	}
	Lto() {
		if (this.Model.SequenceData.GeneratedData)
			for (
				let e = 0;
				e < this.Model.SequenceData.GeneratedData.IsFadeEnd.Num();
				e++
			)
				this.Model.IsFadeEnd.push(
					this.Model.SequenceData.GeneratedData.IsFadeEnd.Get(e),
				);
		else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Plot", 27, "使用了最终黑幕，却没有后处理");
	}
	Rto() {
		if (this.Model.SequenceData.GeneratedData) {
			var e = this.Model.SequenceData.GeneratedData.FinalPos,
				t = e.Num();
			for (let a = 0; a < t; a++) {
				var r = e.Get(a),
					o = Rotator_1.Rotator.Create(r.Rotator());
				r = Vector_1.Vector.Create(r.GetLocation());
				(0 !== this.Model.Type && 2 !== this.Model.Type) || (o.Yaw += 90),
					this.Model.AddFinalPos(
						Transform_1.Transform.Create(
							o.Quaternion(),
							r,
							Vector_1.Vector.OneVectorProxy,
						),
					);
			}
		} else
			Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Plot", 39, "使用了最终位置，但是没有后处理位置。");
	}
	JumpToNextSubtitleOrChildSeq() {
		if (this.Model.HasSubtitle()) {
			const t = this.Model.CurLevelSeqActor.SequencePlayer,
				r = t.GetCurrentTime().Time.FrameNumber.Value;
			let o = SequenceDefine_1.MAX_FRAME;
			for (const e of this.Model.CurSubtitleStartFrames) {
				if (e === r) return;
				if (e > r) {
					o = e;
					break;
				}
			}
			let a = SequenceDefine_1.MAX_FRAME;
			for (const e of this.Model.CurShotStartFrames)
				if (e > r) {
					a = e;
					break;
				}
			let i = 0;
			var e = this.Model.GetType();
			0 === (i = 1 === e ? o : Math.min(o, a)) ||
			i === SequenceDefine_1.MAX_FRAME
				? ((i = this.Model.CurEndFrame),
					this.Model.WillFinish()
						? (this.Model.CurEndFrame - r) / this.Model.CurFrameRate >
								this.Model.EndLeastTime &&
							(LevelLoadingController_1.LevelLoadingController.OpenLoading(
								0,
								3,
								void 0,
								this.Model.EndLeastTime,
							),
							ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(!1),
							(this.Mto = TimerSystem_1.TimerSystem.Delay(() => {
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Plot",
										27,
										"Sequence最后一句话淡出跳至结束",
										["curFrame", r],
										["targetFrame", i],
									),
									(this.Mto = void 0),
									t.GoToEndAndStop(0);
							}, this.Model.EndLeastTime *
								TimeUtil_1.TimeUtil.InverseMillisecond)))
						: (Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug(
									"Plot",
									27,
									"Sequence跳至结束",
									["curFrame", r],
									["targetFrame", i],
								),
							t.OnStop.Clear(),
							t.GoToEndAndStop(0),
							this.yto &&
								(SequenceController_1.SequenceController.FlushDialogueState(),
								this.yto())))
				: i > r &&
					i <= this.Model.CurEndFrame &&
					((r < a && a < i) ||
						((e = (0, puerts_1.$ref)(void 0)),
						UE.GameplayStatics.GetAllActorsOfClass(
							GlobalData_1.GlobalData.World,
							UE.BP_BaseRole_Seq_V2_C.StaticClass(),
							e,
						),
						(this.Eto = (0, puerts_1.$unref)(e)),
						(this.Model.BeginBlendFrame = 1),
						this.bto(r, i),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Plot", 39, "BlendPose 开始")),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"Plot",
							27,
							"SequenceAssistant:Sequence跳至下一句",
							["curFrame", r],
							["targetFrame", i],
						),
					this.qto(i));
		}
	}
	qto(e, t = 0) {
		3 === this.Model.State &&
			((e = new UE.FrameNumber(e)),
			(e = new UE.FrameTime(e, 0)),
			(e = new UE.MovieSceneSequencePlaybackParams(e, 0, "", 0, t)),
			this.Model.CurLevelSeqActor.SequencePlayer.SetPlaybackPositionWithNoEval(
				e,
			));
	}
	bto(e, t) {
		if (this.Eto && 0 !== this.Eto.Num()) {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Plot",
					27,
					"SequenceAssistant:开始混合",
					["curFrame", e],
					["targetFrame", t],
				);
			for (let e = 0; e < this.Eto.Num(); ++e) {
				var r = this.Eto.Get(e);
				r.BeginSwitchPose(r, r, 0.5, !1);
			}
		}
	}
	EndSwitchPose() {
		if (this.Eto && 0 !== this.Eto.Num()) {
			var e =
				this.Model.CurLevelSeqActor.SequencePlayer.GetCurrentTime()?.Time
					.FrameNumber.Value;
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Plot", 27, "SequenceAssistant:结束混合", [
					"curFrame",
					e,
				]);
			for (let e = 0; e < this.Eto.Num(); ++e) {
				var t = this.Eto.Get(e);
				t?.EndSwitchPose(t, !1);
			}
		}
	}
	PauseSequence() {
		3 !== this.Model.State
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Plot", 27, "剧情Sequence未开始播放")
			: (this.Model.CurLevelSeqActor.SequencePlayer.IsPlaying() &&
					this.Model.CurLevelSeqActor.SequencePlayer.PauseOnNextFrame(),
				(this.Model.IsPaused = !0));
	}
	ResumeSequence() {
		3 !== this.Model.State
			? Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("Plot", 27, "剧情Sequence未开始播放")
			: (this.Model.CurLevelSeqActor.SequencePlayer.IsPaused() &&
					this.Model.CurLevelSeqActor.SequencePlayer.Play(),
				(this.Model.IsPaused = !1));
	}
	xto() {
		var e = this.Model.SequenceData.剧情资源.Get(this.Model.SubSeqIndex),
			t = e.MovieScene.MasterTracks,
			r = t?.Num() || 0,
			o = e.MovieScene.TickResolution,
			a = e.MovieScene.DisplayRate,
			i = (a.Denominator * o.Numerator) / (a.Numerator * o.Denominator);
		for (let e = 0; e < r; e++) {
			var n = t.Get(e);
			if (!n.bIsEvalDisabled)
				if (n instanceof UE.MovieSceneDialogueTrack) {
					var s = n.Sections,
						l = s?.Num() || 0;
					for (let e = 0; e < l; e++) {
						var u = s.Get(e);
						u instanceof UE.MovieSceneDialogueSection &&
							(this.Model.CurSubtitleStartFrames.push(
								u.GetStartFrame().Value.Value / i,
							),
							this.Model.CurSubtitleEndFrames.push(
								u.GetEndFrame().Value.Value / i,
							));
					}
				} else if (n instanceof UE.MovieSceneDialogueStateTrack) {
					if (!n.bIsEvalDisabled) {
						var c = n.Sections,
							S = c?.Num() || 0;
						for (let e = 0; e < S; e++) {
							var d = c.Get(e);
							d instanceof UE.MovieSceneDialogueStateSection &&
								0 === d.SectionData.State &&
								(this.Model.CurSubtitleStartFrames.push(
									d.GetStartFrame().Value.Value / i,
								),
								this.Model.CurSubtitleEndFrames.push(
									d.GetEndFrame().Value.Value / i,
								));
						}
					}
				} else if (n instanceof UE.MovieSceneSubTrack) {
					var m = n.Sections,
						h = m?.Num() || 0;
					for (let e = 0; e < h; e++) {
						var g = m.Get(e);
						g instanceof UE.MovieSceneSubSection &&
							(this.Model.CurShotStartFrames.push(
								g.GetStartFrame().Value.Value / i,
							),
							this.Model.CurShotEndFrames.push(
								g.GetEndFrame().Value.Value / i,
							));
					}
				}
		}
		1 === this.Model.Type &&
			((this.Model.CurShotStartFrames.length = 0),
			(this.Model.CurShotEndFrames.length = 0),
			(a = this.Gto(e)),
			this.Model.CurShotStartFrames.push(0),
			a?.forEach((e) => {
				this.Model.CurShotStartFrames.push(e);
			}),
			this.Model.CurShotStartFrames.pop(),
			a?.forEach((e) => {
				this.Model.CurShotEndFrames.push(e);
			})),
			this.Model.CurSubtitleStartFrames.sort((e, t) => e - t),
			this.Model.CurSubtitleEndFrames.sort((e, t) => e - t),
			this.Model.CurShotStartFrames.sort((e, t) => e - t),
			this.Model.CurShotEndFrames.sort((e, t) => e - t);
	}
	Gto(e) {
		var t = new Array();
		if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
			let d;
			const m = UE.KuroSequenceRuntimeFunctionLibrary.GetMasterTracks(e);
			for (let e = 0; e < m.Num(); e++) {
				var r = m.Get(e);
				if (r instanceof UE.MovieSceneSubTrack) {
					d = r;
					break;
				}
			}
			if (d) {
				const e = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(d);
				for (let r = 0; r < e.Num(); r++) {
					var o = e.Get(r),
						a = o.GetSequence(),
						i = o.GetStartFrame().Value.Value,
						n = o.GetEndFrame().Value.Value,
						s = o.Parameters.StartFrameOffset.Value,
						l = UE.KuroSequenceRuntimeFunctionLibrary.GetSpawnables(a);
					for (let e = 0; e < l.Num(); e++) {
						var u = l.Get(e);
						if (
							UE.KuroSequenceRuntimeFunctionLibrary.GetObjectTemplate(
								u,
							).GetClass() === UE.CineCameraActor.StaticClass()
						) {
							const e = UE.KuroSequenceRuntimeFunctionLibrary.GetTracks(u);
							for (let r = 0; r < e.Num(); r++) {
								var c = e.Get(r);
								if (
									c.GetClass() === UE.MovieScene3DTransformTrack.StaticClass()
								) {
									const e =
										UE.KuroSequenceRuntimeFunctionLibrary.GetSections(c);
									for (let r = 0; r < e.Num(); r++) {
										var S =
											e.Get(r).GetEndFrame().Value.Value -
											s +
											i -
											UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(a);
										i < S && S <= n ? t.push(S) : n < S && t.push(n);
									}
									break;
								}
							}
							break;
						}
					}
				}
				return t.sort((e, t) => e - t), t;
			}
		}
	}
	Dto() {
		var e = this.Model.SequenceData;
		for (let o = 0; o < e.剧情资源.Num(); o++) {
			var t,
				r = e.剧情资源.Get(o);
			(r = this.Nto(r))
				? ((t = Rotator_1.Rotator.Create(r.Rotator())),
					(r = Vector_1.Vector.Create(r.GetLocation())),
					(0 !== e.类型 && 2 !== e.类型) || (t.Yaw += 90),
					this.Model.AddFinalPos(
						Transform_1.Transform.Create(
							t.Quaternion(),
							r,
							Vector_1.Vector.OneVectorProxy,
						),
					))
				: this.Model.CurFinalPos.push(void 0);
		}
	}
	Nto(e) {
		let t = this.Model.SequenceData.GeneratedData?.BlendOutTag,
			r =
				(FNameUtil_1.FNameUtil.IsNothing(t) && (t = SequenceDefine_1.HERO_TAG),
				this.Oto(e, t)),
			o = e,
			a = UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackEnd(e) - 1;
		if (!r?.Guid?.IsValid()) {
			const l = UE.KuroSequenceRuntimeFunctionLibrary.FindMasterTracksByType(
				e,
				UE.MovieSceneCinematicShotTrack.StaticClass(),
			);
			if (0 === l.Num()) return;
			if (((e = l?.Get(0)), !ObjectUtils_1.ObjectUtils.IsValid(e))) return;
			var i = UE.KuroSequenceRuntimeFunctionLibrary.GetSections(e);
			let u,
				c = 0,
				S = 0,
				d = 0;
			for (let e = i.Num() - 1; 0 <= e; e--) {
				var n = i.Get(e),
					s = UE.KuroSequenceRuntimeFunctionLibrary.GetEndFrame(n);
				s > c &&
					((u = n),
					(d = u.Parameters.StartFrameOffset.Value),
					(S = UE.KuroSequenceRuntimeFunctionLibrary.GetStartFrame(u)),
					(c = s));
			}
			if (((o = u?.GetSequence()), !ObjectUtils_1.ObjectUtils.IsValid(o)))
				return;
			if (!(r = this.Oto(o, t))?.Guid?.IsValid()) return;
			a =
				c -
				S +
				d -
				1 +
				UE.KuroSequenceRuntimeFunctionLibrary.GetPlaybackStart(o);
		}
		e = UE.KuroSequenceRuntimeFunctionLibrary.FindBindingById(o, r.Guid);
		const l = UE.KuroSequenceRuntimeFunctionLibrary.FindTracksByType(
			e,
			UE.MovieScene3DTransformTrack.StaticClass(),
		);
		if (1 === l.Num())
			return (
				(e = l.Get(0)),
				UE.KuroSequenceRuntimeFunctionLibrary.GetFrameTransform(
					e,
					new UE.FrameTime(new UE.FrameNumber(a), 0),
				)
			);
	}
	Oto(e, t) {
		var r = e.FindBindingsByTag(t),
			o = r.Num();
		for (let t = 0; t < o; t++) {
			var a = r.Get(t);
			if (
				UE.KuroSequenceRuntimeFunctionLibrary.FindBindingById(
					e,
					a.Guid,
				).BindingID?.IsValid()
			)
				return a;
		}
	}
}
exports.SequenceAssistant = SequenceAssistant;
