"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SceneInteractionLevel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class SceneInteractionLevel {
	constructor() {
		(this.LevelStreamingDynamic = void 0),
			(this.LevelName = ""),
			(this.Location = void 0),
			(this.Rotation = void 0),
			(this.HandleId = 0),
			(this.CurrentState = void 0),
			(this.LoadingLevelComplete = !1),
			(this.InteractionActor = void 0),
			(this.HasTempState = !1),
			(this.TempTargetState = void 0),
			(this.TempNeedTransition = !1),
			(this.IsDestroyed = !1),
			(this.TempForce = !1),
			(this.OnLevelStreamingCompleteCallback = void 0),
			(this.r1r = !1);
	}
	Init(t, e, i, r, o, n, a, c, s = !1) {
		(this.LevelStreamingDynamic = t),
			(this.LevelName = e),
			(this.Location = i),
			(this.Rotation = r),
			(this.HandleId = o),
			(this.CurrentState = n),
			(this.HasTempState = !1),
			(this.r1r = s),
			(this.LevelStreamingDynamic.bInitiallyLoaded = !0),
			(this.LevelStreamingDynamic.bInitiallyVisible = !0),
			this.LevelStreamingDynamic.SetShouldBeLoaded(!0),
			this.LevelStreamingDynamic.SetShouldBeVisible(c),
			(this.LoadingLevelComplete = !1),
			(this.IsDestroyed = !1),
			(this.OnLevelStreamingCompleteCallback = a),
			this.LevelStreamingDynamic.OnLevelShown.Add(() => {
				this.n1r();
			});
	}
	ToggleLevelVisible(t, e, i = void 0) {
		if (this.LevelStreamingDynamic?.IsValid()) {
			var r = this.GetAllActorsInLevel();
			if (r && !t && e)
				for (let t = 0, e = r.Num(); t < e; t++) {
					var o = r.Get(t);
					o instanceof UE.Actor && o.SetActorHiddenInGame(!0);
				}
			this.LevelStreamingDynamic.SetShouldBeVisible(t),
				t &&
					((this.OnLevelStreamingCompleteCallback = i),
					this.LevelStreamingDynamic.OnLevelShown.Clear(),
					this.LevelStreamingDynamic.OnLevelShown.Add(() => {
						this.n1r();
					}));
		}
	}
	get MainActor() {
		return this.InteractionActor;
	}
	GetAllActorsInLevel() {
		var t;
		if (this.LevelStreamingDynamic)
			return (t = this.LevelStreamingDynamic.GetLoadedLevel())
				? UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelActors(t)
				: void 0;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("RenderScene", 12, "错误，流送关卡为空!!!!!!!!!!!!!");
	}
	IsStreamingComplete() {
		return this.LoadingLevelComplete;
	}
	IsInfoDestroyed() {
		return this.IsDestroyed;
	}
	Destroy() {
		(this.IsDestroyed = !0),
			this.SetCollisionActorsOwner(void 0),
			this.InteractionActor && this.InteractionActor.Clear(),
			this.LevelStreamingDynamic &&
				(this.LevelStreamingDynamic.OnLevelShown.Clear(),
				this.LevelStreamingDynamic.SetShouldBeLoaded(!1)),
			(this.LevelStreamingDynamic = void 0),
			(this.InteractionActor = void 0),
			(this.OnLevelStreamingCompleteCallback = void 0);
	}
	Update() {
		this.IsDestroyed ||
			(this.LoadingLevelComplete &&
				this.InteractionActor?.IsValid() &&
				this.InteractionActor.Update());
	}
	SwitchToState(t, e, i, r) {
		return this.InteractionActor
			? this.s1r(t, e, i, r)
			: ((this.HasTempState = !0),
				(this.TempTargetState = t),
				(this.TempNeedTransition = e),
				(this.TempForce = i),
				!0);
	}
	GetAllActor() {
		if (this.LoadingLevelComplete && this.InteractionActor?.IsValid())
			return this.InteractionActor.GetAllActor();
	}
	GetActorByKey(t) {
		var e;
		if (this.LoadingLevelComplete && this.InteractionActor?.IsValid())
			return (
				void 0,
				(e = this.InteractionActor.GetActorByKey(t)) ||
					(Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"RenderScene",
							12,
							"获取actor失败 level:" +
								this.LevelName +
								" 不存在key=" +
								t +
								" 的Actor",
						)),
				e
			);
	}
	GetActorOriginalRelTransform(t) {
		if (this.LoadingLevelComplete && this.InteractionActor?.IsValid())
			return this.InteractionActor.GetActorOriginalRelTransform(t);
	}
	GetRefActorsByTag(t) {
		if (this.LoadingLevelComplete && this.InteractionActor?.IsValid())
			return this.InteractionActor.GetRefActorsByTag(t);
	}
	s1r(t, e, i, r) {
		return (
			!!this.InteractionActor?.IsValid() &&
			(i || this.CurrentState !== t
				? ((this.CurrentState = t), this.InteractionActor.SetState(t, e, r), !0)
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"RenderScene",
							14,
							"切换状态失败，无法切换到当前状态",
							["LevelName", this.LevelName],
						),
					!1))
		);
	}
	GetCurrentState() {
		return this.InteractionActor ? this.InteractionActor.GetCurrentState() : 21;
	}
	ChangePlayDirection(t) {
		this.InteractionActor && this.InteractionActor.ChangeDirection(t);
	}
	PlaySceneEffect(t) {
		this.InteractionActor && this.InteractionActor.PlayIndependentEffect(t);
	}
	EndSceneEffect(t) {
		this.InteractionActor && this.InteractionActor.EndIndependentEffect(t);
	}
	PlaySceneEndEffect(t) {
		this.InteractionActor && this.InteractionActor.PlayIndependentEndEffect(t);
	}
	n1r() {
		var t;
		this.LevelStreamingDynamic
			? ((this.LoadingLevelComplete = !0),
				(t = this.LevelStreamingDynamic.GetLoadedLevel()),
				(t =
					UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSceneInteractionLevelActor(
						t,
					)),
				(this.InteractionActor = t),
				this.InteractionActor?.IsValid()
					? (this.InteractionActor.Init(this.HandleId, this.LevelName),
						this.s1r(this.CurrentState, !1, !0, !this.r1r),
						this.OnLevelStreamingCompleteCallback &&
							this.OnLevelStreamingCompleteCallback(),
						(this.OnLevelStreamingCompleteCallback = void 0),
						this.HasTempState &&
							(this.s1r(
								this.TempTargetState,
								this.TempNeedTransition,
								this.TempForce,
								!this.r1r,
							),
							(this.HasTempState = !1)))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"RenderScene",
							12,
							"找不到关卡蓝图,查看prefab是否按照规范进行制作",
						),
				this.LevelStreamingDynamic.OnLevelShown.Clear())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("RenderScene", 12, "错误，流送关卡为空!!!!!!!!!!!!!", [
					"this.LevelName",
					this.LevelName,
				]);
	}
	GetAttachActor() {
		if (this.InteractionActor?.IsValid())
			return this.InteractionActor.GetAttachParentActor();
	}
	AttachToActor(t) {
		this.InteractionActor?.IsValid() &&
			this.InteractionActor.RootComponent?.IsValid() &&
			(0 === this.InteractionActor.RootComponent.Mobility &&
				(Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"RenderScene",
						40,
						"Prefab根场景组件的移动性为Static, 将被强行设置为Movable, 后续请检查Prefab并修改",
						["LevelName", this.LevelName],
					),
				this.InteractionActor.RootComponent.SetMobility(2)),
			ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(
				this.InteractionActor,
				t,
				2,
				"SceneInteractionLevel.AttachToActor",
				void 0,
				1,
				1,
				1,
				!0,
			),
			this.InteractionActor.K2_SetActorRelativeLocation(
				Vector_1.Vector.ZeroVector,
				!1,
				void 0,
				!1,
			),
			this.InteractionActor.K2_SetActorRelativeRotation(
				Rotator_1.Rotator.ZeroRotator,
				!1,
				void 0,
				!1,
			));
	}
	SetCollisionActorsOwner(t) {
		if (this.InteractionActor?.IsValid()) {
			if (this.InteractionActor.CollisionActors) {
				var e = this.InteractionActor.CollisionActors.Num();
				for (let r = 0; r < e; r++) {
					var i = this.InteractionActor.CollisionActors.Get(r);
					ObjectUtils_1.ObjectUtils.IsValid(i) && i.SetOwner(t);
				}
			}
			if (this.InteractionActor.PartCollisionActorsAndCorrespondingTags) {
				var r =
					this.InteractionActor.PartCollisionActorsAndCorrespondingTags.Num();
				for (let e = 0; e < r; e++) {
					var o =
						this.InteractionActor.PartCollisionActorsAndCorrespondingTags.GetKey(
							e,
						);
					ObjectUtils_1.ObjectUtils.IsValid(o) && o.SetOwner(t);
				}
			}
		}
	}
	GetMainCollisionActor() {
		return this.InteractionActor?.IsValid() &&
			this.InteractionActor.CollisionActors &&
			0 < this.InteractionActor.CollisionActors?.Num()
			? this.InteractionActor.CollisionActors.Get(0)
			: void 0;
	}
	GetPartCollisionActorTag(t) {
		if (this.InteractionActor?.IsValid())
			return this.InteractionActor.PartCollisionActorsAndCorrespondingTags?.Get(
				t,
			);
	}
	GetPartCollisionActorsNum() {
		if (this.InteractionActor?.IsValid())
			return this.InteractionActor.PartCollisionActorsAndCorrespondingTags?.Num();
	}
	GetInteractionEffectHookActors() {
		if (this.InteractionActor.InteractionEffectHookActors)
			return this.InteractionActor.InteractionEffectHookActors;
	}
	PlayExtraEffect(t, e) {
		this.InteractionActor?.IsValid() &&
			this.InteractionActor.PlayExtraEffectOnTagsChange(t, e);
	}
	StopExtraEffect(t) {
		this.InteractionActor?.IsValid() &&
			this.InteractionActor.StopExtraEffectOnTagsChange(t);
	}
	UpdateHitInfo(t, e) {
		this.InteractionActor?.IsValid() &&
			this.InteractionActor.UpdateHitInfo(t.ToUeVector(), e);
	}
	GetActiveTagSequencePlaybackProgress(t) {
		if (this.InteractionActor?.IsValid())
			return this.InteractionActor.GetActiveTagSequencePlaybackProgress(t);
	}
	SetActiveTagSequencePlaybackProgress(t, e) {
		this.InteractionActor?.IsValid() &&
			this.InteractionActor.SetActiveTagSequencePlaybackProgress(t, e);
	}
	GetActiveTagSequenceDurationTime(t) {
		if (this.InteractionActor?.IsValid())
			return this.InteractionActor.GetActiveTagSequenceDurationTime(t);
	}
	SetActiveTagSequenceDurationTime(t, e) {
		this.InteractionActor?.IsValid() &&
			this.InteractionActor.SetActiveTagSequenceDurationTime(t, e);
	}
	PauseActiveTagSequence(t) {
		this.InteractionActor?.IsValid() &&
			this.InteractionActor.PauseActiveTagSequence(t);
	}
	ResumeActiveTagSequence(t, e = !1) {
		this.InteractionActor?.IsValid() &&
			this.InteractionActor.ResumeActiveTagSequence(t, e);
	}
	GetReceivingDecalsActors() {
		if (this.InteractionActor?.IsValid())
			return this.InteractionActor.ReceivingDecalsActors;
	}
}
exports.SceneInteractionLevel = SceneInteractionLevel;
