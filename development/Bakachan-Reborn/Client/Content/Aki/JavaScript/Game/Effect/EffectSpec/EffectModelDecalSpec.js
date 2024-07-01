"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EffectModelDecalSpec = void 0);
const UE = require("ue"),
	EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
	EffectMaterialParameter_1 = require("../../Render/Effect/Data/Parameters/EffectMaterialParameter"),
	EffectSpec_1 = require("./EffectSpec");
class EffectModelDecalSpec extends EffectSpec_1.EffectSpec {
	constructor() {
		super(...arguments),
			(this.DecalComponent = void 0),
			(this.t0e = !1),
			(this.ModelParameters = void 0),
			(this.i0e = void 0),
			(this.o0e = !1),
			(this.CachedLocationCurve = void 0),
			(this.CachedRotationCurve = void 0),
			(this.CachedScaleCurve = void 0);
	}
	OnInit() {
		this.i0e = this.EffectModel.DecalMaterialRef;
		let e = this.i0e;
		if (!e) return !1;
		(0 < this.EffectModel.MaterialFloatParameters.Num() ||
			0 < this.EffectModel.MaterialColorParameters.Num()) &&
			(e = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
				this.Handle.GetSureEffectActor(),
				e,
			)),
			(this.CachedLocationCurve = this.EffectModel.Location),
			(this.CachedRotationCurve = this.EffectModel.Rotation),
			(this.CachedScaleCurve = this.EffectModel.Scale),
			(this.o0e =
				this.CachedLocationCurve.bUseCurve ||
				this.CachedRotationCurve.bUseCurve ||
				this.CachedScaleCurve.bUseCurve);
		var t = this.Handle.GetSureEffectActor(),
			a = new UE.Transform(),
			i = (i = this.Handle.Parent)
				? i.GetEffectSpec()?.GetSceneComponent()
				: t.K2_GetRootComponent();
		return (
			(this.DecalComponent =
				EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
					t,
					UE.DecalComponent.StaticClass(),
					i,
					a,
					!1,
					this.EffectModel,
				)),
			(this.SceneComponent = this.DecalComponent),
			(this.t0e = this.DecalComponent.IsComponentTickEnabled()),
			this.DecalComponent.SetComponentTickEnabled(!1),
			(this.DecalComponent.DecalMaterial = e),
			this.DecalComponent.SetIsUIScenePrimitive(1 === this.GetEffectType()),
			(this.DecalComponent.DecalSize = new UE.Vector(100, 100, 100)),
			(this.DecalComponent.ZFadingFactor = this.EffectModel.ZfadingFactor),
			(this.DecalComponent.ZFadingPower = this.EffectModel.ZfadingPower),
			this.DecalComponent.SetVisibility(!1),
			(this.ModelParameters = new EffectMaterialParameter_1.default(
				this.EffectModel.MaterialFloatParameters,
				this.EffectModel.MaterialColorParameters,
			)),
			!0
		);
	}
	OnTick(e) {
		this.IsPlaying() &&
			this.DecalComponent?.IsValid() &&
			this.r0e(this.GetPlayInEditor());
	}
	OnEffectTypeChange() {
		this.DecalComponent?.IsValid() &&
			this.DecalComponent.SetIsUIScenePrimitive(1 === this.GetEffectType());
	}
	r0e(e) {
		(this.o0e || e) &&
			UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
				e,
				this.DecalComponent,
				this.CachedLocationCurve,
				this.CachedRotationCurve,
				this.CachedScaleCurve,
				this.LifeTime.PassTime,
			);
		var t = this.DecalComponent.DecalMaterial;
		t instanceof UE.MaterialInstanceDynamic &&
			this.ModelParameters.Apply(t, this.LifeTime.PassTime, e);
	}
	OnEnd() {
		return (
			this.DecalComponent?.IsValid() &&
				this.DecalComponent.K2_DestroyComponent(this.DecalComponent),
			!0
		);
	}
	OnStop(e, t) {
		this.DecalComponent?.IsValid() &&
			this.DecalComponent.SetComponentTickEnabled(!1);
	}
	OnPlay() {
		this.DecalComponent?.IsValid() &&
			(this.DecalComponent.SetComponentTickEnabled(this.t0e),
			this.DecalComponent.SetVisibility(!0),
			this.r0e(!0));
	}
	IsUseBoundsCalculateDistance() {
		return !0;
	}
}
exports.EffectModelDecalSpec = EffectModelDecalSpec;
