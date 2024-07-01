"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemMaterialGlobalController =
		exports.ItemMaterialActorController =
		exports.ItemMaterialSimpleController =
		exports.ItemMaterialControllerBase =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	RenderConfig_1 = require("../../../Config/RenderConfig"),
	EffectMaterialParameter_1 = require("../../../Effect/Data/Parameters/EffectMaterialParameter"),
	EffectLifeTimeController_1 = require("../../../Effect/EffectLifeTimeController"),
	RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig");
class ItemMaterialControllerBase {
	GetName() {
		return "";
	}
}
class ItemMaterialSimpleController extends (exports.ItemMaterialControllerBase =
	ItemMaterialControllerBase) {
	constructor(e) {
		super(),
			(this.CachedMaterials = []),
			(this.ScalarParameterValue = void 0),
			(this.VectorParameterValue = void 0),
			(this.Actor = e),
			this.ForEachComponent(this.Actor, (e) => {
				this.CheckMaterial(e) && this.CachedComponentMaterials(e);
			});
	}
	GetActor() {
		if (this.Actor?.IsValid()) return this.Actor;
	}
	ForEachComponent(e, t) {
		if (e?.IsValid()) {
			var i = this.Actor.K2_GetComponentsByClass(
					UE.PrimitiveComponent.StaticClass(),
				),
				r = i.Num();
			for (let e = 0; e < r; e++) t(i.Get(e));
		}
	}
	CheckMaterial(e) {
		if (!e?.IsValid()) return !1;
		var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
		if (2 === t || 4 === t) {
			var i = e.GetNumMaterials();
			for (let t = 0; t < i; t++) {
				var r = e.GetMaterial(t);
				if (
					r &&
					!UE.KuroRenderingRuntimeBPPluginBPLibrary.MaterialHasParameter_EditorOnly(
						r,
						RenderConfig_1.RenderConfig.E_Action_UseScanning.toString(),
					)
				)
					return !1;
			}
		}
		return !0;
	}
	CachedComponentMaterials(e) {
		if (e?.IsValid() && this.CachedMaterials.findIndex((t) => t[0] === e) < 0) {
			var t = this.CachedMaterials.push([e, [], []]) - 1,
				i = e.GetNumMaterials();
			for (let a = 0; a < i; a++) {
				var r = e.GetMaterial(a);
				let i;
				this.CachedMaterials[t][1].push(r),
					r
						? ((i =
								r instanceof UE.MaterialInstanceDynamic
									? r
									: e.CreateDynamicMaterialInstance(a, r)),
							this.CachedMaterials[t][2].push(i))
						: this.CachedMaterials[t][2].push(void 0),
					i ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error("Render", 33, "材质控制器 - 使用了空材质", [
								"Actor",
								e.GetOwner().GetName(),
							]));
			}
		}
	}
	UpdateParameters() {
		for (const e of this.CachedMaterials)
			if (e[2])
				for (const t of e[2])
					if (t?.IsValid() && this.ScalarParameterValue)
						for (const e of this.ScalarParameterValue.keys())
							t.SetScalarParameterValue(e, this.ScalarParameterValue.get(e));
		for (const e of this.CachedMaterials)
			if (e[2])
				for (const t of e[2])
					if (t?.IsValid() && this.VectorParameterValue)
						for (const e of this.VectorParameterValue.keys())
							t.SetVectorParameterValue(e, this.VectorParameterValue.get(e));
	}
}
exports.ItemMaterialSimpleController = ItemMaterialSimpleController;
class ItemMaterialActorController extends ItemMaterialControllerBase {
	constructor(e, t) {
		super(),
			(this.ModelParameters = void 0),
			(this.CachedMaterials = []),
			(this.CachedDecalMaterials = []),
			(this.LifeTimeController =
				new EffectLifeTimeController_1.EffectLifeTimeController(
					t.StartTime,
					t.LoopTime,
					t.EndTime,
					0,
					() => {
						this.Destroy();
					},
				)),
			(this.Actor = e),
			(this.Data = t),
			(this.CachedMaterials = []),
			this.ForEachComponent(this.Actor, (e) => {
				this.CheckMaterial(e) && this.CachedComponentMaterials(e);
			}),
			this.ForEachDecalComponent(this.Actor, (e) => {
				this.CheckDecalMaterial(e) && this.CachedDecalComponentMaterials(e);
			}),
			this.CollectParameter(),
			this.Play();
	}
	IsValid() {
		return (
			void 0 !== this.LifeTimeController &&
			this.Actor?.IsValid() &&
			this.Data?.IsValid()
		);
	}
	GetActor() {
		if (this.Actor?.IsValid()) return this.Actor;
	}
	GetData() {
		if (this.Data?.IsValid()) return this.Data;
	}
	GetLifeTimeController() {
		if (this.LifeTimeController) return this.LifeTimeController;
	}
	CollectParameter() {
		if (
			(RenderModuleConfig_1.RenderStats.Init(),
			(this.ModelParameters = new EffectMaterialParameter_1.default()),
			this.Data?.EnableBaseColorScale &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseBaseColorScale,
					1,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_BaseColorScale,
					this.Data.BaseColorScale,
				)),
			this.Data?.EnableAddEmissionColor &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseEmissionColor,
					1,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_EmissionColor,
					this.Data.AddEmissionColor,
				)),
			this.Data?.EnableRimLight &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseRimLight,
					1,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_RimLightColor,
					this.Data.RimLightColor,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_RimPower,
					this.Data.RimPower,
				)),
			this.Data?.EnableEmissionChange &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseEmissionChange,
					1,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_EmissionLightColorChangeColor,
					this.Data.EmissionLightColorChangeColor,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_EmissionLightColorChangeStrength,
					this.Data.EmissionLightColorChangeStrength,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_EmissionLightColorChangeProgress,
					this.Data.EmissionLightColorChangeProgress,
				)),
			this.Data?.EnableDissolve)
		)
			switch (
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseDissolve,
					1,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_DissolveProgress,
					this.Data.DissolveProgress,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_DissolveAdjustment,
					this.Data.DissolveAdjustment,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_DissolveEdageWidth,
					this.Data.DissolveEdageWidth,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_DissolveEdageColor,
					this.Data.DissolveEdageColor,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_DissolveEdageStrength,
					this.Data.DissolveEdageStrength,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_DissolveTex_S_O,
					this.Data.DissolveTexScaleOffset,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_DissolveTexSpeed,
					this.Data.DissolveTexSpeed,
				),
				this.Data.DissolveUv)
			) {
				case 0:
					this.ModelParameters.CollectLinearColorConst(
						RenderConfig_1.RenderConfig.E_Tex_DissolveTexUVSwitch,
						new UE.LinearColor(1, 0, 0, 0),
					);
					break;
				case 1:
					this.ModelParameters.CollectLinearColorConst(
						RenderConfig_1.RenderConfig.E_Tex_DissolveTexUVSwitch,
						new UE.LinearColor(0, 1, 0, 0),
					);
					break;
				case 2:
					this.ModelParameters.CollectLinearColorConst(
						RenderConfig_1.RenderConfig.E_Tex_DissolveTexUVSwitch,
						new UE.LinearColor(0, 0, 1, 0),
					);
					break;
				case 3:
					this.ModelParameters.CollectLinearColorConst(
						RenderConfig_1.RenderConfig.E_Tex_DissolveTexUVSwitch,
						new UE.LinearColor(0, 0, 0, 1),
					);
			}
		this.Data?.EnableScanning &&
			(this.ModelParameters.CollectFloatConst(
				RenderConfig_1.RenderConfig.E_Action_UseScanning,
				1,
			),
			this.ModelParameters.CollectFloatCurve(
				RenderConfig_1.RenderConfig.E_Action_ScanningOutlineMixNoiseStrength,
				this.Data.ScanningOutlineMixNoiseStrength,
			),
			this.ModelParameters.CollectFloatCurve(
				RenderConfig_1.RenderConfig.E_Action_ScanningOutlineStrength,
				this.Data.ScanningOutlineStrength,
			),
			this.ModelParameters.CollectLinearColorCurve(
				RenderConfig_1.RenderConfig.E_Action_ScanningOutlineColor,
				this.Data.ScanningOutlineColor,
			),
			this.ModelParameters.CollectLinearColorCurve(
				RenderConfig_1.RenderConfig.E_Action_ScanningTex_S_O,
				this.Data.ScanningOutlineTexScaleOffset,
			)),
			this.Data?.EnablePivotPainterWorldPositionOffset &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig
						.E_Action_UsePivotPainterWorldPositionOffset,
					1,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_PivotPainterTransform,
					this.Data.PivotPainterTransform,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_PivotPainter_FloatingThreshold,
					this.Data.FloatingThreshold,
				)),
			this.Data?.EnableWorldPositionOffset &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseWPO,
					1,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_VertexAnim_TimeDebug,
					this.Data.VertexAnimTimeDebug,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_VertexAnim_Frame,
					this.Data.VertexAnimFrame,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_SimpleWPO_Normal,
					this.Data.WorldPositionOffsetNormal,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_SimpleWPO_Offset,
					this.Data.WorldPositionOffsetOffset,
				)),
			this.Data?.DisableFoliageEffect &&
				this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_DisableFoliageEffect,
					0,
				),
			this.Data?.EnableFoliageEffect &&
				this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_DisableFoliageEffect,
					1,
				),
			this.Data?.UseRimlightColorSpecil &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseRimlightColorSpecil,
					1,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_RimLightColorSpecil,
					this.Data.RimLightColorSpecil,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_RimlightColorStrength,
					this.Data.RimlightColorStrength,
				)),
			this.Data?.UseEmissionTex &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseEmissionTex,
					1,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_EmissionTexStrength,
					this.Data.EmissionTexStrength,
				)),
			this.Data?.SimpleUseFlow &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_Simple_UseFlow,
					1,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_Simple_Uspeed,
					this.Data.SimpleUspeed,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_Simple_Vspeed,
					this.Data.SimpleVspeed,
				)),
			this.Data?.EnableQuanXiPinTu &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseQuanXiPinTu,
					1,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_TransparencyQuanXiPinTu,
					this.Data.TransparencyQuanXiPinTu,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_TransparentColorQuanXiPinTu,
					this.Data.TransparentColorQuanXiPinTu,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_OpaqueColorQuanXiPinTu,
					this.Data.OpaqueColorQuanXiPinTu,
				)),
			this.Data?.EnableQuanXiFengSuo &&
				(this.ModelParameters.CollectFloatConst(
					RenderConfig_1.RenderConfig.E_Action_UseQuanXiFengSuo,
					1,
				),
				this.ModelParameters.CollectFloatCurve(
					RenderConfig_1.RenderConfig.E_Action_TransparencyQuanXiFengSuo,
					this.Data.TransparencyQuanXiFengSuo,
				),
				this.ModelParameters.CollectLinearColorCurve(
					RenderConfig_1.RenderConfig.E_Action_TransparentColorQuanXiFengSuo,
					this.Data.TransparentColorQuanXiFengSuo,
				));
	}
	UpdateParameters(e) {
		if (this.LifeTimeController) {
			for (const t of this.CachedMaterials)
				if (t[2])
					for (const i of t[2])
						i?.IsValid() &&
							this.LifeTimeController &&
							this.ModelParameters.Apply(
								i,
								this.LifeTimeController.PassTime,
								e,
							);
			for (const t of this.CachedDecalMaterials)
				t[2] &&
					this.LifeTimeController &&
					this.ModelParameters.Apply(t[2], this.LifeTimeController.PassTime, e);
		}
	}
	Play() {
		this.LifeTimeController.Play(), this.UpdateParameters(!0);
	}
	Update(e) {
		this.IsValid() &&
			(this.LifeTimeController.Update(e), this.UpdateParameters(!1));
	}
	Destroy() {
		this.LifeTimeController = void 0;
	}
	Stop(e = !1) {
		this.LifeTimeController.Stop(e);
	}
	ForEachComponent(e, t) {
		if (e?.IsValid()) {
			var i = this.Actor.K2_GetComponentsByClass(
					UE.PrimitiveComponent.StaticClass(),
				),
				r = i.Num();
			for (let e = 0; e < r; e++) t(i.Get(e));
		}
	}
	ForEachDecalComponent(e, t) {
		if (e?.IsValid()) {
			var i = this.Actor.K2_GetComponentsByClass(
					UE.DecalComponent.StaticClass(),
				),
				r = i.Num();
			for (let e = 0; e < r; e++) t(i.Get(e));
		}
	}
	CheckMaterial(e) {
		if (!e?.IsValid()) return !1;
		var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
		if (2 === t || 4 === t) {
			var i = e.GetNumMaterials();
			for (let t = 0; t < i; t++) {
				var r = e.GetMaterial(t);
				if (
					r &&
					!UE.KuroRenderingRuntimeBPPluginBPLibrary.MaterialHasParameter_EditorOnly(
						r,
						RenderConfig_1.RenderConfig.E_Action_UseScanning.toString(),
					)
				)
					return !1;
			}
		}
		return !0;
	}
	CheckDecalMaterial(e) {
		if (!e?.IsValid()) return !1;
		var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
		return !(
			(2 === t || 4 === t) &&
			(t = e.GetDecalMaterial()) &&
			!UE.KuroRenderingRuntimeBPPluginBPLibrary.MaterialHasParameter_EditorOnly(
				t,
				RenderConfig_1.RenderConfig.E_Action_UseScanning.toString(),
			)
		);
	}
	CachedComponentMaterials(e) {
		if (e?.IsValid() && this.CachedMaterials.findIndex((t) => t[0] === e) < 0) {
			var t = this.CachedMaterials.push([e, [], []]) - 1,
				i = e.GetNumMaterials();
			for (let a = 0; a < i; a++) {
				var r = e.GetMaterial(a);
				let i;
				this.CachedMaterials[t][1].push(r),
					r
						? ((i =
								r instanceof UE.MaterialInstanceDynamic
									? r
									: e.CreateDynamicMaterialInstance(a, r)),
							this.CachedMaterials[t][2].push(i))
						: this.CachedMaterials[t][2].push(void 0),
					i ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error("Render", 33, "材质控制器 - 使用了空材质", [
								"Actor",
								e.GetOwner().GetName(),
							]));
			}
		}
	}
	CachedDecalComponentMaterials(e) {
		if (
			e?.IsValid() &&
			this.CachedDecalMaterials.findIndex((t) => t[0] === e) < 0
		) {
			var t = this.CachedDecalMaterials.push([e, void 0, void 0]) - 1,
				i = e.GetDecalMaterial();
			let r;
			(this.CachedDecalMaterials[t][1] = i)
				? ((r =
						i instanceof UE.MaterialInstanceDynamic
							? i
							: e.CreateDynamicMaterialInstance()),
					(this.CachedDecalMaterials[t][2] = r))
				: (this.CachedDecalMaterials[t][2] = void 0),
				r ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("Render", 33, "材质控制器 - 使用了空材质", [
							"Actor",
							e.GetOwner().GetName(),
						]));
		}
	}
	ResetComponentMaterials(e) {
		var t = this.CachedMaterials.findIndex((t) => t[0] === e);
		if (0 <= t) {
			var i = e.GetNumMaterials();
			for (let r = 0; r < i; r++)
				e.SetMaterial(r, this.CachedMaterials[t][1][r]);
		}
	}
}
exports.ItemMaterialActorController = ItemMaterialActorController;
class ItemMaterialGlobalController extends ItemMaterialControllerBase {
	constructor(e, t) {
		super(),
			(this.ParameterCollection = void 0),
			(this.LifeTimeController =
				new EffectLifeTimeController_1.EffectLifeTimeController(
					t.StartTime,
					t.LoopTime,
					t.EndTime,
					0,
					() => {
						this.Destroy();
					},
				)),
			(this.WorldContentObject = e),
			(this.Data = t),
			this.Play();
	}
	IsValid() {
		return (
			(this.ParameterCollection?.IsValid() &&
				this.WorldContentObject?.IsValid()) ??
			!1
		);
	}
	UpdateParameters(e) {
		var t;
		this.IsValid() &&
			(this.Data.EnableBaseColorScale &&
				(e || this.Data.BaseColorScale.bUseCurve) &&
				((t = UE.KuroCurveLibrary.GetValue_Float(
					this.Data.BaseColorScale,
					this.LifeTimeController.PassTime,
				)),
				UE.KismetMaterialLibrary.SetScalarParameterValue(
					this.WorldContentObject,
					this.ParameterCollection,
					RenderConfig_1.RenderConfig.E_Action_GlobalBaseColorScale,
					t,
				)),
			this.Data.EnableAddEmissionColor &&
				(e || this.Data.AddEmissionColor.bUseCurve) &&
				((t = UE.KuroCurveLibrary.GetValue_LinearColor(
					this.Data.AddEmissionColor,
					this.LifeTimeController.PassTime,
				)),
				UE.KismetMaterialLibrary.SetVectorParameterValue(
					this.WorldContentObject,
					this.ParameterCollection,
					RenderConfig_1.RenderConfig.E_Action_GlobalAddEmissionColor,
					t,
				)),
			this.Data.EnableScanningOutline &&
				((e || this.Data.ScanningOutlineColor.bUseCurve) &&
					((t = UE.KuroCurveLibrary.GetValue_LinearColor(
						this.Data.ScanningOutlineColor,
						this.LifeTimeController.PassTime,
					)),
					UE.KismetMaterialLibrary.SetVectorParameterValue(
						this.WorldContentObject,
						this.ParameterCollection,
						RenderConfig_1.RenderConfig.E_Action_ScanningOutline,
						t,
					)),
				(e || this.Data.ScanningOutlineWidth.bUseCurve) &&
					((t = UE.KuroCurveLibrary.GetValue_Float(
						this.Data.ScanningOutlineWidth,
						this.LifeTimeController.PassTime,
					)),
					UE.KismetMaterialLibrary.SetScalarParameterValue(
						this.WorldContentObject,
						this.ParameterCollection,
						RenderConfig_1.RenderConfig.OutlineWidth,
						t,
					)),
				(e || this.Data.ScanningBrokenTexScaleOffset.bUseCurve) &&
					((t = UE.KuroCurveLibrary.GetValue_LinearColor(
						this.Data.ScanningBrokenTexScaleOffset,
						this.LifeTimeController.PassTime,
					)),
					UE.KismetMaterialLibrary.SetVectorParameterValue(
						this.WorldContentObject,
						this.ParameterCollection,
						RenderConfig_1.RenderConfig.BrokenTex_S_O,
						t,
					)),
				e || this.Data.ScanningOutlineTexScaleOffset.bUseCurve) &&
				((t = UE.KuroCurveLibrary.GetValue_LinearColor(
					this.Data.ScanningOutlineTexScaleOffset,
					this.LifeTimeController.PassTime,
				)),
				UE.KismetMaterialLibrary.SetVectorParameterValue(
					this.WorldContentObject,
					this.ParameterCollection,
					RenderConfig_1.RenderConfig.OutlineTex_S_O,
					t,
				)),
			this.UpdateGlobalRim(e));
	}
	UpdateGlobalRim(e) {
		var t;
		this.IsValid() &&
			this.Data.EnableRimLight &&
			((e || this.Data.AddRimLightColor.bUseCurve) &&
				((t = UE.KuroCurveLibrary.GetValue_LinearColor(
					this.Data.AddRimLightColor,
					this.LifeTimeController.PassTime,
				)),
				UE.KismetMaterialLibrary.SetVectorParameterValue(
					this.WorldContentObject,
					this.ParameterCollection,
					RenderConfig_1.RenderConfig.E_Action_GlobalRimLight,
					t,
				)),
			(e || this.Data.RimPower.bUseCurve) &&
				((t = UE.KuroCurveLibrary.GetValue_Float(
					this.Data.RimPower,
					this.LifeTimeController.PassTime,
				)),
				UE.KismetMaterialLibrary.SetScalarParameterValue(
					this.WorldContentObject,
					this.ParameterCollection,
					RenderConfig_1.RenderConfig.E_Action_RimPower,
					t,
				)),
			(e || this.Data.RimMix.bUseCurve) &&
				((t = UE.KuroCurveLibrary.GetValue_Float(
					this.Data.RimMix,
					this.LifeTimeController.PassTime,
				)),
				UE.KismetMaterialLibrary.SetScalarParameterValue(
					this.WorldContentObject,
					this.ParameterCollection,
					RenderConfig_1.RenderConfig.E_Action_RimMix,
					t,
				)),
			e || this.Data.RimWidth.bUseCurve) &&
			((t = UE.KuroCurveLibrary.GetValue_Float(
				this.Data.RimWidth,
				this.LifeTimeController.PassTime,
			)),
			UE.KismetMaterialLibrary.SetScalarParameterValue(
				this.WorldContentObject,
				this.ParameterCollection,
				RenderConfig_1.RenderConfig.E_Action_RimWidth,
				t,
			));
	}
	ResetParameters() {
		this.IsValid() &&
			(this.Data.EnableBaseColorScale &&
				UE.KismetMaterialLibrary.SetScalarParameterValue(
					this.WorldContentObject,
					this.ParameterCollection,
					RenderConfig_1.RenderConfig.E_Action_GlobalBaseColorScale,
					1,
				),
			this.Data.EnableAddEmissionColor &&
				UE.KismetMaterialLibrary.SetVectorParameterValue(
					this.WorldContentObject,
					this.ParameterCollection,
					RenderConfig_1.RenderConfig.E_Action_GlobalAddEmissionColor,
					new UE.LinearColor(0, 0, 0, 1),
				),
			this.Data.EnableRimLight &&
				UE.KismetMaterialLibrary.SetVectorParameterValue(
					this.WorldContentObject,
					this.ParameterCollection,
					RenderConfig_1.RenderConfig.E_Action_GlobalRimLight,
					new UE.LinearColor(0, 0, 0, 1),
				),
			this.Data.EnableScanningOutline) &&
			UE.KismetMaterialLibrary.SetVectorParameterValue(
				this.WorldContentObject,
				this.ParameterCollection,
				RenderConfig_1.RenderConfig.E_Action_ScanningOutline,
				new UE.LinearColor(0, 0, 0, 1),
			);
	}
	Play() {
		this.LifeTimeController.Play(), this.UpdateParameters(!0);
	}
	Update(e) {
		this?.IsValid() &&
			(this.LifeTimeController.Update(e), this.UpdateParameters(!1));
	}
	Destroy() {
		this.ResetParameters(), (this.LifeTimeController = void 0);
	}
}
exports.ItemMaterialGlobalController = ItemMaterialGlobalController;
