"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
	AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
	Log_1 = require("../../../../Core/Common/Log"),
	TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EffectSystem_1 = require("../../../Effect/EffectSystem"),
	GlobalData_1 = require("../../../GlobalData"),
	AttachToActorController_1 = require("../../../World/Controller/AttachToActorController"),
	ItemMaterialManager_1 = require("./MaterialController/ItemMaterialManager");
class SequenceDirectorConfig {
	constructor(e, t = e.IsLoop, a = e.PlayRate, r = e.Reverse) {
		(this.UeConfig = e),
			(this.IsLoopOverride = t),
			(this.PlayRateOverride = a),
			(this.ReverseOverride = r);
	}
	get IsLoop() {
		return this.IsLoopOverride;
	}
	get PlayRate() {
		return this.PlayRateOverride;
	}
	get Reverse() {
		return this.ReverseOverride;
	}
	get Sequence() {
		return this.UeConfig.Sequence;
	}
}
class SceneInteractionActor extends UE.KuroSceneInteractionActor {
	constructor() {
		super(...arguments),
			(this.LevelName = ""),
			(this.HandleId = 0),
			(this.States = void 0),
			(this.Effects = void 0),
			(this.EndEffects = void 0),
			(this.ReferenceActors = void 0),
			(this.TagsAndCorrespondingEffects = void 0),
			(this.CollisionActors = void 0),
			(this.PartCollisionActorsAndCorrespondingTags = void 0),
			(this.InteractionEffectHookActors = void 0),
			(this.CharacterForOrgan = void 0),
			(this.ActorsForProjection = void 0),
			(this.MaterialForProjection = void 0),
			(this.ReceivingDecalsActors = void 0),
			(this.ActiveStateSequence = void 0),
			(this.ActiveSequenceDirectorMap = void 0),
			(this.DirectorConfigMap = void 0),
			(this.PlayingEffectIdSet = void 0),
			(this.PlayingState = void 0),
			(this.CurrentState = void 0),
			(this.NextState = void 0),
			(this.NextStateKey = void 0),
			(this.InTransition = !1),
			(this.IsPlayBack = !1),
			(this.KuroSceneInteractionActorSystem = void 0),
			(this.ProjectionRootActor = void 0),
			(this.IsProjecting = !1),
			(this.CharRenderingComponent = void 0),
			(this.CharRenderingKey = 0),
			(this.HitLocation = void 0),
			(this.HitDirection = new UE.Vector(0, 0, 1)),
			(this.SkeletalMeshActors = void 0),
			(this.CharRenderingComponents = void 0),
			(this.CrossStateEffectActors = void 0),
			(this.InteractionMaterialController = void 0),
			(this.ActorsOriginalRelTransform = void 0),
			(this.BasePlatformInternal = void 0),
			(this.OnEffectFinishCallback = void 0);
	}
	get BasePlatform() {
		if (!this.BasePlatformInternal) {
			var e = this.GetAttachParentActor();
			if (!e) return;
			let t;
			(this.BasePlatformInternal = ActorSystem_1.ActorSystem.Get(
				UE.BP_BasePlatform_C.StaticClass(),
				this.GetTransform(),
				e,
			)),
				AttachToActorController_1.AttachToActorController.AttachToActor(
					this.BasePlatformInternal,
					e,
					1,
					"SceneInteractionActor.BasePlatform",
					void 0,
					2,
					2,
					2,
					!1,
					!0,
				),
				(t =
					(t =
						this.CollisionActors && 0 < this.CollisionActors.Num()
							? this.CollisionActors?.Get(0)
							: t) || e),
				(e = (0, puerts_1.$ref)(void 0)),
				t.GetActorBounds(!0, void 0, e, !0),
				(e = (0, puerts_1.$unref)(e)),
				(e = Math.max(e.X, e.Y, e.Z)),
				(this.BasePlatformInternal.LeaveSphereRadius = e += 50),
				(this.BasePlatformInternal.LeaveSphereCenter = new UE.Vector(0, 0, 0));
		}
		return this.BasePlatformInternal;
	}
	ReceiveEndPlay() {
		this.BasePlatformInternal &&
			ActorSystem_1.ActorSystem.Put(this.BasePlatformInternal);
	}
	AddNewState() {
		this.States.Add(this.States.Num(), void 0);
	}
	AddNewEffect() {
		this.Effects.Add(this.Effects.Num(), void 0);
	}
	AddNewEndEffect() {
		this.EndEffects.Add(this.EndEffects.Num(), void 0);
	}
	ChangeDirection(e) {
		((e && !this.IsPlayBack) || (!e && this.IsPlayBack)) &&
			(this.ActiveStateSequence &&
				this.GetDirectorBySequence(
					this.ActiveStateSequence,
				)?.SequencePlayer?.ChangePlaybackDirection(),
			this.CurrentState.AnimMontage.Montage &&
				this.CurrentState.AnimMontage.SkeletalMesh &&
				this.CurrentState.AnimMontage.SkeletalMesh.SkeletalMeshComponent.SetPlayRate(
					-this.CurrentState.AnimMontage.SkeletalMesh.SkeletalMeshComponent.GetPlayRate(),
				),
			(this.IsPlayBack = !this.IsPlayBack));
	}
	PlayIndependentEffect(e) {
		var t = this.Effects.Get(e);
		if (
			t &&
			(t.Effect &&
				this.PlayEffect(
					t.Effect,
					"[SceneInteractionActor.PlayIndependentEffect]",
				),
			t.Material)
		)
			for (let e = 0; e < t.Material.Actors.Num(); e++)
				t.Material.Actors.Get(e) &&
					t.Material.Data &&
					(t.Material.TailIndex =
						ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
							t.Material.Actors.Get(e),
							t.Material.Data,
						));
	}
	EndIndependentEffect(e) {
		var t = this.Effects.Get(e);
		if (
			t &&
			(t.Effect &&
				this.StopEffect(
					t.Effect,
					"[SceneInteractionActor.EndIndependentEffect]",
					!1,
				),
			ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap)
		)
			for (let e = 0; e < t.Material.Actors.Num(); e++) {
				var a = t.Material.TailIndex - e;
				ItemMaterialManager_1.ItemMaterialManager.DisableActorData(a);
			}
	}
	PlayIndependentEndEffect(e) {
		(e = this.EndEffects.Get(e)) &&
			this.PlayEffect(e, "[SceneInteractionActor.PlayIndependentEndEffect]");
	}
	Update() {
		!this.InTransition ||
			this.CheckPlaying(this.CurrentState) ||
			(this.NextState &&
				(this.StopState(this.CurrentState, this.NextState),
				(this.PlayingState = this.NextStateKey),
				this.PlayState(
					this.NextState,
					this.CurrentState,
					!1,
					this.PlayingState,
				),
				(this.InTransition = !1),
				(this.NextState = void 0),
				(this.NextStateKey = void 0)));
	}
	SetTimeDilation(e) {
		this.CustomTimeDilation !== e &&
			((this.CustomTimeDilation = e), this.UpdateTimeDilation());
	}
	UpdateTimeDilation() {
		if (this.CurrentState) {
			var e = this.CustomTimeDilation;
			if (
				(this.CurrentState.AnimMontage?.SkeletalMesh &&
					this.CurrentState.AnimMontage.SkeletalMesh.SkeletalMeshComponent.SetPlayRate(
						this.CurrentState.AnimMontage.PlayRate * e,
					),
				this.ActiveSequenceDirectorMap && this.DirectorConfigMap)
			)
				for (var [, t] of this.ActiveSequenceDirectorMap) {
					var a = t.SequencePlayer,
						t = this.DirectorConfigMap.get(t);
					a?.IsValid() && t && a.SetPlayRate(t.PlayRate * e);
				}
		}
	}
	Init(e, t) {
		if (
			((this.HandleId = e),
			(this.LevelName = t),
			(this.PlayingState = 21),
			(this.NextState = void 0),
			(this.CurrentState = void 0),
			(this.InTransition = !1),
			(this.IsPlayBack = !1),
			this.CharacterForOrgan?.IsValid() &&
				((this.CharRenderingComponent =
					this.CharacterForOrgan.AddComponentByClass(
						UE.CharRenderingComponent_C.StaticClass(),
						!1,
						this.GetTransform(),
						!1,
					)),
				this.CharRenderingComponent.Init(this.CharacterForOrgan.RenderType),
				(this.CharRenderingKey = 0)),
			(this.CharRenderingComponents = new Map()),
			this.SkeletalMeshActors)
		)
			for (let e = 0; e < this.SkeletalMeshActors.Num(); e++) {
				var a = this.SkeletalMeshActors.Get(e),
					r = a.AddComponentByClass(
						UE.CharRenderingComponent_C.StaticClass(),
						!1,
						MathUtils_1.MathUtils.DefaultTransform,
						!1,
					);
				this.CharRenderingComponents.set(r, e),
					r.Init(2),
					a.SkeletalMeshComponent &&
						r.AddComponentByCase(0, a.SkeletalMeshComponent);
			}
		if (
			((this.OnEffectFinishCallback = (e) => {
				this.PlayingEffectIdSet?.delete(e);
			}),
			this.States)
		)
			for (let e = 0; e < this.States.Num(); e++)
				if (this.States.IsValidIndex(e)) {
					var i = this.States.GetKey(e),
						o = this.States.Get(i);
					if (o && o.CrossStateEffects)
						for (let e = 0; e < o.CrossStateEffects.Num(); e++) {
							var s = o.CrossStateEffects.Get(e);
							s &&
								s.Effect &&
								(this.CrossStateEffectActors ||
									(this.CrossStateEffectActors = new Set()),
								this.CrossStateEffectActors.add(s.Effect));
						}
				}
		if (this.ReferenceActors?.Num()) {
			this.ActorsOriginalRelTransform = new Map();
			for (let e = 0; e < this.ReferenceActors.Num(); ++e) {
				var n,
					c = this.ReferenceActors.GetKey(e);
				(c = this.ReferenceActors.Get(c)) &&
					((n = c.GetTransform().GetRelativeTransform(this.GetTransform())),
					this.ActorsOriginalRelTransform.set(c, n));
			}
		}
	}
	Clear() {
		if (void 0 !== this.ActiveSequenceDirectorMap)
			for (var [e] of this.ActiveSequenceDirectorMap) this.StopSequence(e);
	}
	GetActorByKey(e) {
		if (this.ReferenceActors) return this.ReferenceActors.Get(e);
	}
	GetRefActorsByTag(e) {
		if (this.TagsAndCorrespondingEffects)
			return this.TagsAndCorrespondingEffects.Get(e)?.Actors;
	}
	GetAllActor() {
		if (this.ReferenceActors) return this.ReferenceActors;
	}
	GetActorOriginalRelTransform(e) {
		if (this.ActorsOriginalRelTransform && e?.IsValid())
			return this.ActorsOriginalRelTransform.get(e);
	}
	GetCurrentState() {
		return this.PlayingState;
	}
	PlayEffect(e, t) {
		e?.IsValid() &&
			(e.Play(t),
			(t = (0, puerts_1.$ref)(void 0)),
			e.GetHandle(t),
			(e = (0, puerts_1.$unref)(t)),
			EffectSystem_1.EffectSystem.IsValid(e)) &&
			(void 0 === this.PlayingEffectIdSet &&
				(this.PlayingEffectIdSet = new Set()),
			this.PlayingEffectIdSet.add(e),
			EffectSystem_1.EffectSystem.AddFinishCallback(
				e,
				this.OnEffectFinishCallback,
			));
	}
	StopEffect(e, t, a) {
		e?.IsValid() && e.Stop(t, a);
	}
	PlaySequence(e, t, a, r) {
		void 0 === this.DirectorConfigMap && (this.DirectorConfigMap = new Map()),
			this.DirectorConfigMap.set(e, new SequenceDirectorConfig(t)),
			e.SetActorTickEnabled(!0);
		var i = e?.GetComponentByClass(UE.AkComponent.StaticClass());
		i?.IsValid() && i.SetComponentTickEnabled(!0),
			this.GetKuroSceneInteractionActorSystem().SetSequenceWithTargetLevelActor(
				e,
				t.Sequence,
				this,
			);
		for (let t = 0; t < a.Num(); t++) {
			var o = a.Get(t);
			o &&
				this.GetKuroSceneInteractionActorSystem().BindActorToLevelSequenceActor(
					o,
					e,
					UE.KismetSystemLibrary.GetDisplayName(o),
				);
		}
		e.SequencePlayer &&
			((this.IsPlayBack = !1),
			t.IsLoop
				? t.Reverse
					? e.SequencePlayer.PlayReverseLooping()
					: e.SequencePlayer.PlayLooping()
				: t.Reverse
					? e.SequencePlayer.PlayReverse()
					: e.SequencePlayer.Play(),
			r &&
				((i = (
					t.Reverse
						? e.SequencePlayer.GetStartTime()
						: e.SequencePlayer.GetEndTime()
				).Time),
				(r = new UE.MovieSceneSequencePlaybackParams(i, 0, "", 0, 0)),
				e.SequencePlayer.SetPlaybackPosition(r)),
			e.SequencePlayer.SetPlayRate(t.PlayRate * this.CustomTimeDilation));
	}
	StopSequence(e) {
		(e = this.GetDirectorBySequence(e)) &&
			(e.SequencePlayer.Stop(),
			e.SetActorTickEnabled(!1),
			(e = e?.GetComponentByClass(UE.AkComponent.StaticClass()))?.IsValid()) &&
			e.SetComponentTickEnabled(!1);
	}
	PlayDestruction(e, t) {
		e instanceof UE.BP_KuroDestructibleActor_C &&
			(t
				? (e.SetActorHiddenInGame(!0), e.SetActorEnableCollision(!1))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"SceneGameplay",
							7,
							"[SceneInteractionActor]PlayDestruction",
							["DestructActor:", e.GetName()],
							["Location:", e.K2_GetActorLocation()],
						),
					this.HitLocation
						? e.ApplyDamage(this.HitLocation, this.HitDirection)
						: e.ApplyDamage(e.K2_GetActorLocation(), this.HitDirection)));
	}
	GetActiveSequencePlaybackProgress(e) {
		e = this.GetDirectorBySequence(e);
		var t,
			a = e?.SequencePlayer;
		if (
			e &&
			a?.IsValid() &&
			((e = this.DirectorConfigMap?.get(e)),
			e &&
				!((t = (t = a.GetDuration().Time).FrameNumber.Value + t.SubFrame) < 1))
		) {
			var r = a.GetStartTime().Time,
				i = a.GetEndTime().Time;
			r = r.FrameNumber.Value + r.SubFrame;
			if (!((i = i.FrameNumber.Value + i.SubFrame) < r)) {
				a = (a = a.GetCurrentTime().Time).FrameNumber.Value + a.SubFrame;
				let o = 0;
				return (
					(o = e.Reverse ? i - a : a - r),
					(o = MathUtils_1.MathUtils.Clamp(o, r, i)),
					MathUtils_1.MathUtils.Clamp(o / t, 0, 1)
				);
			}
		}
	}
	SetActiveSequencePlaybackProgress(e, t) {
		e = this.GetDirectorBySequence(e);
		var a = e?.SequencePlayer;
		if (e && a?.IsValid() && ((e = this.DirectorConfigMap?.get(e)), e)) {
			t =
				(r = (r = a.GetDuration().Time).FrameNumber.Value + r.SubFrame) *
				MathUtils_1.MathUtils.Clamp(t, 0, 1);
			if (!(r < 1 || r < t)) {
				var r = a.GetStartTime().Time,
					i = a.GetEndTime().Time;
				r = r.FrameNumber.Value + r.SubFrame;
				if (!((i = i.FrameNumber.Value + i.SubFrame) < r)) {
					let o = 0;
					(o = e.Reverse ? i - t : r + t),
						(o = MathUtils_1.MathUtils.Clamp(o, r, i)),
						(t = o - (e = Math.floor(o))),
						(r = new UE.FrameTime(new UE.FrameNumber(e), t)),
						(e = (i = a.GetCurrentTime().Time).FrameNumber.Value + i.SubFrame),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"SceneItem",
								40,
								"SetActiveSequencePlaybackProgress",
								["current", e],
								["new", o],
							),
						MathUtils_1.MathUtils.IsNearlyEqual(
							e,
							o,
							MathUtils_1.MathUtils.KindaSmallNumber,
						) ||
							((t = new UE.MovieSceneSequencePlaybackParams(r, 0, "", 0, 0)),
							a.SetPlaybackPosition(t));
				}
			}
		}
	}
	GetActiveTagSequencePlaybackProgress(e) {
		if (((e = this.TagsAndCorrespondingEffects?.Get(e)?.Sequence?.Sequence), e))
			return this.GetActiveSequencePlaybackProgress(e);
	}
	SetActiveTagSequencePlaybackProgress(e, t) {
		(e = this.TagsAndCorrespondingEffects?.Get(e)?.Sequence?.Sequence),
			e && this.SetActiveSequencePlaybackProgress(e, t);
	}
	GetActiveSequenceDurationTime(e) {
		e = this.GetDirectorBySequence(e);
		var t = e?.SequencePlayer;
		if (
			e &&
			t?.IsValid() &&
			this.DirectorConfigMap?.get(e) &&
			((e = t.GetDuration()),
			!((t = e.Time.FrameNumber.Value + e.Time.SubFrame) < 1))
		)
			return t * (e.Rate.Denominator / e.Rate.Numerator);
	}
	GetActiveTagSequenceDurationTime(e) {
		if (((e = this.TagsAndCorrespondingEffects?.Get(e)?.Sequence?.Sequence), e))
			return this.GetActiveSequenceDurationTime(e);
	}
	SetActiveSequenceDurationTime(e, t) {
		e = this.GetDirectorBySequence(e);
		var a,
			r,
			i = e?.SequencePlayer;
		e &&
			i?.IsValid() &&
			(!(e = this.DirectorConfigMap?.get(e)) ||
				(r = (a = i.GetDuration()).Time.FrameNumber.Value + a.Time.SubFrame) <
					1 ||
				((r = (r * (a.Rate.Denominator / a.Rate.Numerator)) / t) &&
					isFinite(r) &&
					!isNaN(r) &&
					!MathUtils_1.MathUtils.IsNearlyZero(r) &&
					((e.PlayRateOverride = r),
					i.SetPlayRate(r * this.CustomTimeDilation))));
	}
	SetActiveTagSequenceDurationTime(e, t) {
		(e = this.TagsAndCorrespondingEffects?.Get(e)?.Sequence?.Sequence),
			e && this.SetActiveSequenceDurationTime(e, t);
	}
	PauseActiveSequence(e) {
		e = this.GetDirectorBySequence(e);
		var t = e?.SequencePlayer;
		e && t?.IsValid() && (t.IsPaused() || t.Pause());
	}
	PauseActiveTagSequence(e) {
		(e = this.TagsAndCorrespondingEffects?.Get(e)?.Sequence?.Sequence),
			e && this.PauseActiveSequence(e);
	}
	ResumeActiveSequence(e, t = !1) {
		e = this.GetDirectorBySequence(e);
		var a = e?.SequencePlayer;
		e &&
			a?.IsValid() &&
			(e = this.DirectorConfigMap?.get(e)) &&
			(a.IsPlaying() && a.Pause(),
			(e.Reverse && !t) || (!e.Reverse && t)
				? e.IsLoop
					? a.PlayReverseLooping()
					: a.PlayReverse()
				: e.IsLoop
					? a.PlayLooping()
					: a.Play());
	}
	ResumeActiveTagSequence(e, t = !1) {
		(e = this.TagsAndCorrespondingEffects?.Get(e)?.Sequence?.Sequence),
			e && this.ResumeActiveSequence(e, t);
	}
	PlayState(e, t, a, r) {
		e &&
			(this.PlayStateSequence(e, a),
			this.PlayStateMontage(e, t),
			this.PlayStateEffect(e),
			this.PlayStateMaterialController(e, a),
			this.PlayStateCharMaterialController(e),
			this.PlayStateCharMaterialControllerNew(e),
			this.PlayStateCrossStateEffects(e),
			this.PostStateAkEvent(e, a),
			this.SetStateActorShow(e),
			this.SetStateActorHide(e),
			this.PlayStateBasedEffect(e, r),
			this.PlayStateDestruction(e, a),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"RenderScene",
					14,
					"场景交互物切换状态",
					["Actor", this.LevelName],
					["HandleID", this.HandleId],
					["已切换状态到:", this.PlayingState + 1],
				),
			(this.CurrentState = e));
	}
	PlayStateSequence(e, t) {
		var a;
		e.Sequence.Sequence &&
			(this.ActiveStateSequence &&
				this.ActiveStateSequence !== e.Sequence.Sequence &&
				this.StopSequence(this.ActiveStateSequence),
			(a = this.CreateDirectorBySequence(e.Sequence.Sequence))) &&
			((this.ActiveStateSequence = e.Sequence.Sequence),
			this.PlaySequence(a, e.Sequence, e.Actors, t));
	}
	PlayStateMontage(e, t) {
		e.AnimMontage.SkeletalMesh &&
			e.AnimMontage.Montage &&
			((t?.AnimMontage.Montage &&
				t.AnimMontage.Montage === e.AnimMontage.Montage) ||
				(e.AnimMontage.SkeletalMesh.SkeletalMeshComponent.PlayAnimation(
					e.AnimMontage.Montage,
					e.AnimMontage.Loop,
				),
				e.AnimMontage.SkeletalMesh.SkeletalMeshComponent.SetPlayRate(
					e.AnimMontage.PlayRate * this.CustomTimeDilation,
				)));
	}
	PlayStateEffect(e) {
		if (e.Effects)
			for (let t = 0; t < e.Effects.Num(); t++)
				this.PlayEffect(
					e.Effects.Get(t),
					"[SceneInteractionActor.PlayStateEffect]",
				);
	}
	PlayStateMaterialController(e, t) {
		var a,
			r = e.MaterialControllers;
		if (r)
			for (let e = 0; e < r.Num(); e++) {
				if (r.Get(e).Materials) {
					var i = r.Get(e).Materials,
						o = r.Get(e).Actors;
					for (let e = 0; e < o.Num(); e++) {
						var s = o
							.Get(e)
							.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
						for (let e = 0; e < s.Num(); e++) {
							var n = s.Get(e),
								c = n.GetNumMaterials();
							for (let e = 0; e < c; e++) n.SetMaterial(e, i);
						}
					}
				}
				for (let i = 0; i < r.Get(e).Actors.Num(); i++)
					r.Get(e).Actors.Get(i) &&
						r.Get(e).Data &&
						((a =
							ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.get(
								(r.Get(e).TailIndex =
									ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
										r.Get(e).Actors.Get(i),
										r.Get(e).Data,
									)),
							)?.GetLifeTimeController()),
						t) &&
						a?.JumpToEnd();
			}
	}
	PlayStateCharMaterialController(e) {
		this.CharRenderingKey++,
			e.CharacterDataGroupForOrgan?.IsValid() &&
				this.CharacterForOrgan?.IsValid() &&
				this.CharRenderingComponent.AddMaterialControllerDataGroup(
					e.CharacterDataGroupForOrgan,
				);
	}
	PlayStateCharMaterialControllerNew(e) {
		if (
			e.CharacterDataGroupForOrgan?.IsValid() &&
			this.CharRenderingComponents
		) {
			var t = this.CharRenderingComponents.keys(),
				a = Array.from(t),
				r = a.length;
			for (let t = 0; t < r; t++) {
				var i = a[t].AddMaterialControllerDataGroup(
					e.CharacterDataGroupForOrgan,
				);
				this.CharRenderingComponents.set(a[t], i);
			}
		}
	}
	PlayStateCrossStateEffects(e) {
		if (e.CrossStateEffects) {
			const o = new Set();
			for (let s = 0; s < e.CrossStateEffects.Num(); s++) {
				var t,
					a,
					r,
					i = e.CrossStateEffects.Get(s);
				i &&
					i.Effect?.IsValid() &&
					((r = i.Effect),
					o.add(r),
					(t = (0, puerts_1.$ref)(void 0)),
					r.GetHandle(t),
					(a = (0, puerts_1.$unref)(t)),
					EffectSystem_1.EffectSystem.IsValid(a) ||
						this.PlayEffect(
							r,
							"[SceneInteractionActor.PlayStateCrossStateEffects]",
						),
					(t = (0, puerts_1.$ref)(void 0)),
					r.GetHandle(t),
					(a = (0, puerts_1.$unref)(t)),
					EffectSystem_1.EffectSystem.IsValid(a)) &&
					((r = i.EffectExtraState),
					EffectSystem_1.EffectSystem.SetEffectExtraState(a, r));
			}
			this.CrossStateEffectActors?.forEach((e) => {
				o.has(e) ||
					this.StopEffect(
						e,
						"[SceneInteractionActor.PlayStateCrossStateEffects]",
						!1,
					);
			});
		}
	}
	PlayStateDestruction(e, t) {
		if (e.DestructibleActors)
			for (let r = 0, i = e.DestructibleActors.Num(); r < i; r++) {
				var a = e.DestructibleActors.Get(r);
				this.PlayDestruction(a, t);
			}
	}
	PlayTagDestruction(e, t) {
		if (this.TagsAndCorrespondingEffects) {
			var a = this.TagsAndCorrespondingEffects.Get(e)?.DestructibleActors;
			if (a)
				for (let e = 0, i = a.Num(); e < i; e++) {
					var r = a.Get(e);
					this.PlayDestruction(r, t);
				}
		}
	}
	PlayTagSequence(e, t) {
		var a, r;
		this.TagsAndCorrespondingEffects &&
			(e = this.TagsAndCorrespondingEffects.Get(e)) &&
			(a = e.Sequence) &&
			(r = a.Sequence) &&
			(r = this.CreateDirectorBySequence(r)) &&
			this.PlaySequence(r, a, e.Actors, t);
	}
	StopTagSequence(e) {
		this.TagsAndCorrespondingEffects &&
			(e = this.TagsAndCorrespondingEffects.Get(e)?.Sequence?.Sequence) &&
			this.StopSequence(e);
	}
	PlayTagEffect(e) {
		if (this.TagsAndCorrespondingEffects) {
			var t = this.TagsAndCorrespondingEffects.Get(e)?.Effects;
			if (t)
				for (let e = 0; e < t.Num(); e++)
					this.PlayEffect(t.Get(e), "[SceneInteractionActor.PlayTagEffect]");
		}
	}
	StopTagEffect(e) {
		if (this.TagsAndCorrespondingEffects) {
			var t = this.TagsAndCorrespondingEffects.Get(e)?.Effects;
			if (t)
				for (let e = 0; e < t.Num(); e++)
					this.StopEffect(
						t.Get(e),
						"[SceneInteractionActor.StopTagEffect]",
						!1,
					);
			var a = this.TagsAndCorrespondingEffects.Get(e)?.EndEffects;
			if (a)
				for (let e = 0; e < a.Num(); e++)
					this.PlayEffect(
						a.Get(e),
						"[SceneInteractionActor.StopTagEffect:PlayingEndEffects]",
					);
		}
	}
	PlayTagMaterialController(e) {
		if (this.TagsAndCorrespondingEffects) {
			var t = this.TagsAndCorrespondingEffects.Get(e)?.MaterialControllers;
			if (t)
				for (let e = 0; e < t.Num(); e++) {
					if (t.Get(e).Materials) {
						var a = t.Get(e).Materials,
							r = t.Get(e).Actors;
						for (let e = 0; e < r.Num(); e++) {
							var i = (0, puerts_1.$ref)(void 0),
								o = (r.Get(e).GetAttachedActors(i), (0, puerts_1.$unref)(i));
							for (let e = 0; e < o.Num(); e++) {
								var s = o
									.Get(e)
									.K2_GetComponentsByClass(
										UE.StaticMeshComponent.StaticClass(),
									);
								for (let e = 0; e < s.Num(); e++) {
									var n = s.Get(e),
										c = n.GetNumMaterials();
									for (let e = 0; e < c; e++) n.SetMaterial(e, a);
								}
							}
							var l = r
								.Get(e)
								.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
							for (let e = 0; e < l.Num(); e++) {
								var S = l.Get(e),
									h = S.GetNumMaterials();
								for (let e = 0; e < h; e++) S.SetMaterial(e, a);
							}
						}
					}
					for (let a = 0; a < t.Get(e).Actors.Num(); a++)
						t.Get(e).Actors.Get(a) &&
							t.Get(e).Data &&
							(t.Get(e).TailIndex =
								ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(
									t.Get(e).Actors.Get(a),
									t.Get(e).Data,
								));
				}
		}
	}
	StopTagMaterialController(e) {
		if (this.TagsAndCorrespondingEffects) {
			var t = this.TagsAndCorrespondingEffects.Get(e)?.MaterialControllers;
			if (t)
				for (let e = 0; e < t.Num(); e++) {
					var a = t.Get(e);
					if (a.Actors)
						for (let e = 0; e < a.Actors.Num(); e++) {
							var r = a.TailIndex - e;
							ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.has(
								r,
							) &&
								ItemMaterialManager_1.ItemMaterialManager.DisableActorData(r);
						}
				}
		}
	}
	PostTagAkEvent(e, t) {
		(e = this.TagsAndCorrespondingEffects?.Get(e)?.AkEvent),
			!e?.AkEvent ||
				(!e.AkEvent.IsInfinite && t) ||
				(e.IsFollow
					? AudioSystem_1.AudioSystem.PostEvent(e.AkEvent.GetName(), this)
					: AudioSystem_1.AudioSystem.PostEvent(
							e.AkEvent.GetName(),
							this.GetTransform(),
						));
	}
	PlayStateBasedEffect(e, t) {
		if (e.StateBasedEffect)
			for (let r = 0; r < e.StateBasedEffect.Num(); r++) {
				var a = e.StateBasedEffect.Get(r).StateBasedEffect;
				a?.IsValid() &&
					(0 === t
						? a.SetState(0)
						: 1 === t
							? a.SetState(1)
							: 2 === t
								? a.SetState(2)
								: 3 === t
									? a.SetState(3)
									: 4 === t && a.SetState(4));
			}
	}
	PostStateAkEvent(e, t) {
		!(e = e.AkEvent).AkEvent ||
			(!e.AkEvent.IsInfinite && t) ||
			(e.IsFollow
				? AudioSystem_1.AudioSystem.PostEvent(e.AkEvent.GetName(), this)
				: AudioSystem_1.AudioSystem.PostEvent(
						e.AkEvent.GetName(),
						this.GetTransform(),
					));
	}
	SetStateActorHide(e) {
		var t = e.HideActors;
		if (t)
			for (let e = 0, r = t.Num(); e < r; e++) {
				var a = t.Get(e);
				a && (a.SetActorHiddenInGame(!0), a.SetActorEnableCollision(!1));
			}
	}
	SetStateActorShow(e) {
		var t = e.Actors;
		if (t)
			for (let e = 0, r = t.Num(); e < r; e++) {
				var a = t.Get(e);
				a && (a.SetActorHiddenInGame(!1), a.SetActorEnableCollision(!0));
			}
	}
	MakeActorProjection(e, t) {
		if (this.IsProjecting)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderEffect",
					32,
					"当前已经在投影中，重复调用投影接口",
				);
		else {
			var a = this.ActorsForProjection;
			if (
				(this.ProjectionRootActor?.IsValid() ||
					((this.ProjectionRootActor = UE.KuroActorManager.SpawnActor(
						this.GetWorld(),
						UE.StaticMeshActor.StaticClass(),
						this.GetTransform(),
					)),
					this.ProjectionRootActor.RootComponent.SetMobility(2)),
				a && a?.Num() && e)
			) {
				this.IsProjecting = !0;
				for (let e = 0; e < a.Num(); e++) {
					var r = UE.KuroStaticLibrary.SpawnActorFromAnother(a.Get(e));
					if (r?.IsValid) {
						if (
							(r.K2_AttachToActor(
								this.ProjectionRootActor,
								void 0,
								1,
								1,
								1,
								!0,
							),
							this.MaterialForProjection)
						) {
							var i = (0, puerts_1.$ref)(void 0),
								o = (r.GetAttachedActors(i), (0, puerts_1.$unref)(i));
							for (let e = 0; e < o.Num(); e++) {
								var s = o
									.Get(e)
									.K2_GetComponentsByClass(
										UE.StaticMeshComponent.StaticClass(),
									);
								for (let e = 0; e < s.Num(); e++) {
									var n = s.Get(e),
										c = n.GetNumMaterials();
									for (let e = 0; e < c; e++)
										n.SetMaterial(e, this.MaterialForProjection);
								}
							}
							var l = r.K2_GetComponentsByClass(
								UE.StaticMeshComponent.StaticClass(),
							);
							for (let e = 0; e < l.Num(); e++) {
								var S = l.Get(e),
									h = S.GetNumMaterials();
								for (let e = 0; e < h; e++)
									S.SetMaterial(e, this.MaterialForProjection);
							}
						}
						t && this.AddMatrialDataForChildrenActor(r, t);
					}
				}
				this.ProjectionRootActor.K2_SetActorTransform(e, !1, void 0, !1);
			}
		}
	}
	AddMatrialDataForChildrenActor(e, t) {
		if (e.IsValid()) {
			var a = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
				r = (e.GetAttachedActors(a), (0, puerts_1.$unref)(a));
			for (let e = 0; e < r.Num(); e++) {
				var i = r.Get(e);
				i.IsValid() &&
					ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(i, t);
			}
			ItemMaterialManager_1.ItemMaterialManager.AddMaterialData(e, t);
		}
	}
	RemoveActorProjection() {
		this.IsProjecting
			? this.ProjectionRootActor?.IsValid()
				? ((this.IsProjecting = !1),
					this.DestroyActor(this.ProjectionRootActor))
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("RenderEffect", 32, "找不到投影的Root Actor")
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("RenderEffect", 32, "当前不在投影中，无法移除投影");
	}
	DestroyActor(e) {
		var t = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
			a = (e.GetAttachedActors(t), (0, puerts_1.$unref)(t));
		for (let e = 0; e < a.Num(); e++) this.DestroyActor(a.Get(e));
		e instanceof UE.BP_EffectActor_C && (e.StopEffect(), e.RemoveHandle()),
			e.K2_DestroyActor();
	}
	DestroySelf() {
		this.DestroyActor(this);
	}
	SetTagActorHide(e) {
		if (this.TagsAndCorrespondingEffects) {
			var t = this.TagsAndCorrespondingEffects.Get(e)?.HideActors;
			if (t)
				for (let e = 0, r = t.Num(); e < r; e++) {
					var a = t.Get(e);
					a && (a.SetActorHiddenInGame(!0), a.SetActorEnableCollision(!1));
				}
		}
	}
	ResetTagActorHide(e) {
		if (this.TagsAndCorrespondingEffects) {
			var t = this.TagsAndCorrespondingEffects.Get(e)?.HideActors;
			if (t)
				for (let e = 0, r = t.Num(); e < r; e++) {
					var a = t.Get(e);
					a && (a.SetActorHiddenInGame(!1), a.SetActorEnableCollision(!0));
				}
		}
	}
	SetTagActorShow(e) {
		if (this.TagsAndCorrespondingEffects) {
			var t = this.TagsAndCorrespondingEffects.Get(e)?.Actors;
			if (t)
				for (let e = 0, r = t.Num(); e < r; e++) {
					var a = t.Get(e);
					a && (a.SetActorHiddenInGame(!1), a.SetActorEnableCollision(!0));
				}
		}
	}
	ResetTagActorShow(e) {
		if (this.TagsAndCorrespondingEffects) {
			var t = this.TagsAndCorrespondingEffects.Get(e)?.Actors;
			if (t)
				for (let e = 0, r = t.Num(); e < r; e++) {
					var a = t.Get(e);
					a && (a.SetActorHiddenInGame(!0), a.SetActorEnableCollision(!1));
				}
		}
	}
	SetState(e, t, a) {
		this.States ||
			(Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"RenderScene",
					40,
					"状态为Undefined",
					["Actor", this.LevelName],
					["HandleID", this.HandleId],
				));
		var r = this.States.Get(e);
		if (r)
			if (this.InTransition && !r.IsForceSetState)
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"RenderScene",
						14,
						"正在过渡状态, 不可设置其他状态",
						["Actor", this.LevelName],
						["HandleID", this.HandleId],
					);
			else if (this.NextState && !r.IsForceSetState)
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"RenderScene",
						14,
						"正在过渡状态, 不可设置其他状态",
						["Actor", this.LevelName],
						["HandleID", this.HandleId],
					);
			else if (e === this.PlayingState)
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"RenderScene",
						14,
						"不可转换到目标状态,因为目标状态即为当前状态",
						["Actor", this.LevelName],
						["HandleID", this.HandleId],
					);
			else {
				if (
					t &&
					this.CurrentState &&
					void 0 !== (t = this.CurrentState.TransitionMap.Get(e))
				) {
					var i = this.States.Get(t);
					if (i)
						return (
							(this.InTransition = !0),
							this.StopState(this.CurrentState, i),
							(this.PlayingState = t),
							this.PlayState(i, this.CurrentState, a, this.PlayingState),
							(this.NextState = r),
							void (this.NextStateKey = e)
						);
				}
				(this.InTransition = !1),
					this.CurrentState && this.StopState(this.CurrentState, r),
					(this.PlayingState = e),
					this.PlayState(r, this.CurrentState, a, this.PlayingState),
					(this.NextState = void 0),
					(this.NextStateKey = void 0);
			}
		else
			20 !== e &&
				Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"RenderScene",
					14,
					"状态未配置",
					["未配置状态", e + 1],
					["Actor", this.LevelName],
					["HandleID", this.HandleId],
				);
	}
	StopState(e, t) {
		if (e) {
			this.ActiveStateSequence &&
				this.ActiveStateSequence === e.Sequence.Sequence &&
				e.Sequence.Sequence !== t.Sequence.Sequence &&
				this.StopSequence(this.ActiveStateSequence);
			for (let t = 0; t < e.HideActors.Num(); t++) {
				var a = e.HideActors.Get(t);
				a && (a.SetActorHiddenInGame(!1), a.SetActorEnableCollision(!0));
			}
			for (let t = 0; t < e.Effects.Num(); t++)
				e.Effects.Get(t)?.Stop("[SceneInteractionActor.StopState]", !1);
			if (ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap)
				for (let t = 0; t < e.MaterialControllers.Num(); t++)
					for (let a = 0; a < e.MaterialControllers.Get(t).Actors.Num(); a++) {
						var r = e.MaterialControllers.Get(t).TailIndex - a;
						ItemMaterialManager_1.ItemMaterialManager.AllActorControllerInfoMap.has(
							r,
						) && ItemMaterialManager_1.ItemMaterialManager.DisableActorData(r);
					}
			if (this.CharRenderingComponents) {
				t = this.CharRenderingComponents.keys();
				var i,
					o = Array.from(t),
					s = o.length;
				for (let e = 0; e < s; e++)
					this.CharRenderingComponents.get(o[e]) &&
						(i = this.CharRenderingComponents.get(o[e])) &&
						o[e].RemoveMaterialControllerDataGroupWithEnding(i);
			}
		}
	}
	CheckPlaying(e) {
		let t = !1;
		var a;
		this.ActiveStateSequence &&
			(a = this.GetDirectorBySequence(
				this.ActiveStateSequence,
			)?.SequencePlayer) &&
			(t = a.IsPlaying());
		let r = !1;
		return (
			e.AnimMontage.SkeletalMesh &&
				(r = e.AnimMontage.SkeletalMesh.SkeletalMeshComponent.IsPlaying()),
			t || r
		);
	}
	GetKuroSceneInteractionActorSystem() {
		return (
			this.KuroSceneInteractionActorSystem ||
				(this.KuroSceneInteractionActorSystem =
					UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
						GlobalData_1.GlobalData.World,
						UE.KuroSceneInteractionActorSystem.StaticClass(),
					)),
			this.KuroSceneInteractionActorSystem
		);
	}
	GetDirectorBySequence(e) {
		return this.ActiveSequenceDirectorMap?.get(e);
	}
	CreateDirectorBySequence(e) {
		void 0 === this.ActiveSequenceDirectorMap &&
			(this.ActiveSequenceDirectorMap = new Map()),
			this.GetDirectorBySequence(e) && this.StopSequence(e);
		const t = ActorSystem_1.ActorSystem.Get(
			UE.LevelSequenceActor.StaticClass(),
			this.GetTransform(),
			void 0,
			!1,
		);
		var a = t.SequencePlayer;
		if (a) {
			(t.bOverrideInstanceData = !0),
				(t.DefaultInstanceData.TransformOriginActor =
					this).ActiveSequenceDirectorMap.set(e, t);
			const r = () => {
				const a = t;
				var i;
				a &&
					((i = a.SequencePlayer) &&
						(i.OnStop.Remove(r), i.OnFinished.Remove(r)),
					this.ActiveSequenceDirectorMap &&
						this.ActiveSequenceDirectorMap.get(e) === a &&
						this.ActiveSequenceDirectorMap.delete(e),
					this.DirectorConfigMap?.delete(a),
					this.ActiveStateSequence === e && (this.ActiveStateSequence = void 0),
					a.IsValid()) &&
					TimerSystem_1.TimerSystem.Next(() => {
						ActorSystem_1.ActorSystem.Put(a);
					});
			};
			return a.OnStop.Add(r), a.OnFinished.Add(r), t;
		}
		Log_1.Log.CheckError() &&
			Log_1.Log.Error(
				"RenderScene",
				40,
				"LevelSequenceActor.SequencePlayer invalid",
				["Actor", this.LevelName],
				["HandleID", this.HandleId],
			);
	}
	PlayExtraEffectOnTagsChange(e, t = !1) {
		this.PlayTagEffect(e),
			this.PlayTagMaterialController(e),
			this.PostTagAkEvent(e, t),
			this.SetTagActorShow(e),
			this.SetTagActorHide(e),
			this.PlayTagSequence(e, t),
			this.PlayTagDestruction(e, t);
	}
	StopExtraEffectOnTagsChange(e) {
		this.StopTagEffect(e),
			this.StopTagMaterialController(e),
			this.ResetTagActorShow(e),
			this.ResetTagActorHide(e),
			this.StopTagSequence(e);
	}
	UpdateHitInfo(e, t) {
		(this.HitLocation = e), (this.HitDirection = t);
	}
}
exports.default = SceneInteractionActor;
