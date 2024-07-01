"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelSkeletalMeshSpec = void 0);
const UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../GlobalData"),
	RenderConfig_1 = require("../../Render/Config/RenderConfig"),
	EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
	EffectSpec_1 = require("./EffectSpec");
class EffectModelSkeletalMeshSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments),
			(this.SkeletalMeshComponent = void 0),
			(this.CharRenderingComponent = void 0),
			(this.t0e = !1),
			(this.tfe = void 0),
			(this.ife = void 0),
			(this.o0e = !1),
			(this.CachedLocationCurve = void 0),
			(this.CachedRotationCurve = void 0),
			(this.CachedScaleCurve = void 0),
			(this.HideCounter = 0);
	}
	OnBodyEffectChanged(e) {
		var t;
		this.SkeletalMeshComponent &&
			(this.CharRenderingComponent ||
				((t = this.Handle.GetSureEffectActor()),
				(this.CharRenderingComponent = t.GetComponentByClass(
					UE.CharRenderingComponent_C.StaticClass(),
				)),
				this.CharRenderingComponent ||
					((this.CharRenderingComponent = t.AddComponentByClass(
						UE.CharRenderingComponent_C.StaticClass(),
						!1,
						new UE.Transform(),
						!1,
					)),
					GlobalData_1.GlobalData.IsUiSceneOpen
						? this.CharRenderingComponent.Init(5)
						: this.CharRenderingComponent.Init(7)),
				this.CharRenderingComponent.SetLogicOwner(t),
				this.CharRenderingComponent.AddComponentByCase(
					0,
					this.SkeletalMeshComponent,
				)),
			this.CharRenderingComponent.SetDitherEffect(e, 1));
	}
	OnInit() {
		!this.tfe &&
			this.EffectModel.SkeletalMeshRef &&
			(this.tfe = this.EffectModel.SkeletalMeshRef),
			!this.ife &&
				this.EffectModel.AnimationRef &&
				(this.ife = this.EffectModel.AnimationRef);
		var e,
			t,
			i = this.tfe,
			n = this.ife;
		return !(
			!i ||
			!n ||
			((n = this.Handle.GetSureEffectActor()),
			(e = (e = this.Handle.Parent)
				? e.GetEffectSpec()?.GetSceneComponent()
				: n.K2_GetRootComponent()),
			(t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
				n,
				UE.SkeletalMeshComponent.StaticClass(),
				e,
				void 0,
				!0,
				this.EffectModel,
			)),
			(this.SceneComponent = t),
			1 === this.GetEffectType() && t.SetTickableWhenPaused(!0),
			t.SetIsUIScenePrimitive(1 === this.GetEffectType()),
			t.SetSkeletalMesh(i, !0),
			t.SetUpdateAnimationInEditor(!0),
			this.EffectModel.EnableCollision
				? t.SetCollisionProfileName(RenderConfig_1.RenderConfig.PhysicsActor)
				: t.SetCollisionEnabled(0),
			n.FinishAddComponent(
				t,
				void 0 !== e,
				MathUtils_1.MathUtils.DefaultTransform,
			),
			t.SetVisibility(!1),
			(this.SkeletalMeshComponent = t),
			(this.t0e = this.SkeletalMeshComponent.IsComponentTickEnabled()),
			this.SkeletalMeshComponent.SetComponentTickEnabled(!1),
			this.SkeletalMeshComponent.SetExcludeFromLightAttachmentGroup(!0),
			this.SkeletalMeshComponent.SetCastShadow(this.EffectModel.CastShadow),
			(this.CachedLocationCurve = this.EffectModel.Location),
			(this.CachedRotationCurve = this.EffectModel.Rotation),
			(this.CachedScaleCurve = this.EffectModel.Scale),
			(this.o0e =
				this.CachedLocationCurve.bUseCurve ||
				this.CachedRotationCurve.bUseCurve ||
				this.CachedScaleCurve.bUseCurve),
			0)
		);
	}
	OnTick(e) {
		this.SkeletalMeshComponent?.IsValid() &&
			(this.SkeletalMeshComponent.SetPlayRate(
				this.GetTimeScale() * this.GetGlobalTimeScale(),
			),
			this.r0e(this.GetPlayInEditor()));
	}
	OnEffectTypeChange() {
		this.SkeletalMeshComponent?.IsValid() &&
			(this.SkeletalMeshComponent.SetIsUIScenePrimitive(
				1 === this.GetEffectType(),
			),
			1 === this.GetEffectType()) &&
			this.SkeletalMeshComponent.SetTickableWhenPaused(!0);
	}
	r0e(e) {
		(this.o0e || e) &&
			UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
				e,
				this.SkeletalMeshComponent,
				this.CachedLocationCurve,
				this.CachedRotationCurve,
				this.CachedScaleCurve,
				this.LifeTime.PassTime,
			);
	}
	OnStop() {
		this.SkeletalMeshComponent?.IsValid() &&
			(this.CharRenderingComponent?.ResetAllRenderingState(),
			this.CharRenderingComponent?.K2_DestroyComponent(
				this.CharRenderingComponent,
			),
			(this.CharRenderingComponent = void 0),
			this.SkeletalMeshComponent.SetVisibility(!1),
			this.SkeletalMeshComponent.SetComponentTickEnabled(!1),
			this.SkeletalMeshComponent.Stop(),
			UE.KuroAnimLibrary.EndAnimNotifyStates(
				this.SkeletalMeshComponent.AnimScriptInstance,
			));
	}
	OnPlay() {
		this.SkeletalMeshComponent?.IsValid() &&
			(this.SkeletalMeshComponent.SetComponentTickEnabled(this.t0e),
			Info_1.Info.IsGameRunning()
				? ((this.HideCounter = this.EffectModel.HideFrames + 1),
					this.TickHideState())
				: this.SkeletalMeshComponent.SetVisibility(!0),
			this.SkeletalMeshComponent.SetHiddenInGame(!1),
			this.SkeletalMeshComponent.SetPlayRate(1),
			this.SkeletalMeshComponent.PlayAnimation(
				this.ife,
				this.EffectModel.Looping,
			),
			this.r0e(!0));
	}
	OnEnd() {
		return this.SkeletalMeshComponent && this.SkeletalMeshComponent.Stop(), !0;
	}
	TickHideState() {
		this.Handle.IsPlaying() &&
			(this.HideCounter--,
			0 === this.HideCounter
				? this.SkeletalMeshComponent?.SetVisibility(!0)
				: (this.SkeletalMeshComponent?.SetVisibility(!1),
					TimerSystem_1.TimerSystem.Next(() => {
						this.TickHideState();
					})));
	}
}
exports.EffectModelSkeletalMeshSpec = EffectModelSkeletalMeshSpec;
