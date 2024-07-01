"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RenderModuleConfig = exports.RenderStats = void 0);
const Stats_1 = require("../../../Core/Common/Stats"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RenderStats {
	static Init() {
		this.gU ||
			((this.gU = !0),
			(this.StatRenderModuleModelAddTickable = void 0),
			(this.StatRenderModuleModelTickTickable = void 0),
			(this.StatRenderModuleModelTickRenderShell = void 0),
			(this.StatBadSignalUpdate = void 0),
			(this.StatComplexBrokenUpdate = void 0),
			(this.StatCharRenderingComponentAddData = void 0),
			(this.StatCharRenderingComponentDataCache = void 0),
			(this.StatCharRenderingComponentInit = void 0),
			(this.StatCharRenderingComponentUpdate = void 0),
			(this.StatCharRenderingComponentDataGroupBeforeUpdate = void 0),
			(this.StatCharRenderingComponentDataGroupAfterUpdate = void 0),
			(this.StatCharRenderingComponentUpdateInner = void 0),
			(this.StatCharRenderingComponentLateUpdate = void 0),
			(this.StatCharRenderingComponentRuntimeDataUpdateState = void 0),
			(this.StatCharRenderingComponentRuntimeDataUpdateEffect = void 0),
			(this.StatCharRenderingComponentRuntimeDataSetSpecified = void 0),
			(this.StatCharRenderShellTick = void 0),
			(this.StatRenderBillboardTick = void 0),
			(this.StatEffectBaseActorTick = void 0),
			(this.StatEffectBaseActorInit = void 0),
			(this.StatEffectBaseActorComplete = void 0),
			(this.StatEffectBaseActorUpdateTime = void 0),
			(this.StatEffectBaseActorUpdateNiagara = void 0),
			(this.StatEffectBaseActorUpdateTsUpdate = void 0),
			(this.StatSceneCharLimbTick = void 0),
			(this.StatSceneInteractionManagerTick = void 0),
			(this.StatSceneInteractionGrass = void 0),
			(this.StatSceneInteractionPc = void 0),
			(this.StatSceneInteractionWater = void 0),
			(this.StatSceneInteractionOthers = void 0),
			(this.StatRenderDataManagerTick = void 0),
			(this.StatItemMaterialManagerTick = void 0),
			(this.StatItemMaterialControllerCollectParameter = void 0),
			(this.StatEffectTick = void 0),
			(this.StatFoliageClusteredEffectTick = void 0),
			(this.StatAudioVisualizationManagerTick = void 0),
			(this.StatCharMaterialControllerUpdateRim = void 0),
			(this.StatCharMaterialControllerUpdateDissolve = void 0),
			(this.StatCharMaterialControllerUpdateOutline = void 0),
			(this.StatCharMaterialControllerUpdateModifyOtherParameters = void 0),
			(this.StatCharMaterialControllerUpdateSampleTexture = void 0),
			(this.StatCharMaterialControllerUpdateTransfer = void 0),
			(this.StatCharMaterialControllerUpdateMotionOffset = void 0),
			(this.StatCharMaterialControllerUpdateAbsorbed = void 0),
			(this.StatCharMaterialControllerUpdateStripMask = void 0),
			(this.StatCharMaterialControllerUpdateDither = void 0),
			(this.StatCharMaterialControllerUpdateCustomMaterialEffect = void 0),
			(this.StatCharMaterialControllerUpdateHairReplace = void 0),
			(this.StatCharMaterialControllerUpdateMaterialReplace = void 0));
	}
}
(exports.RenderStats = RenderStats).gU = !1;
class RenderModuleConfig extends ConfigBase_1.ConfigBase {}
exports.RenderModuleConfig = RenderModuleConfig;
