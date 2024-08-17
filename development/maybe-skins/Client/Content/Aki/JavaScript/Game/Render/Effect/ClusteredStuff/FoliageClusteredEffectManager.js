"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FoliageClusteredEffectManager = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	GlobalData_1 = require("../../../GlobalData"),
	RenderDataManager_1 = require("../../Data/RenderDataManager"),
	DebugDrawManager_1 = require("../../DebugDraw/DebugDrawManager"),
	RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig");
class FoliageClusteredEffectManager {
	constructor() {
		(this.Config = void 0),
			(this.ConfigPath =
				"/Game/Aki/Effect/Setting/DA_FoliageClusteredEffectConfig.DA_FoliageClusteredEffectConfig"),
			(this.FoliageTypes = void 0),
			(this.ClusteredEffects = void 0),
			(this.NumMin = void 0),
			(this.NumMax = void 0),
			(this.BoxExtend = void 0),
			(this.Ready = !1),
			(this.Densities = void 0),
			(this.UpdateInterval = 5),
			(this.UpdateCounter = 0),
			(this.UpdateIndex = 0),
			(this.DetectBox = void 0),
			(this.TempVector = void 0),
			(this.DebugDrawHandle = -1);
	}
	static Get() {
		return (
			this.tlr ||
				((this.tlr = new FoliageClusteredEffectManager()), this.tlr.AU()),
			this.tlr
		);
	}
	AU() {
		(this.Ready = !1),
			(this.UpdateCounter = 0),
			(this.UpdateIndex = 0),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				this.ConfigPath,
				UE.PDA_FoliageClusteredEffectConfig_C,
				(e, t) => {
					e
						? ((this.Config = e), this.CacheFromConfig(), (this.Ready = !0))
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("RenderEffect", 26, "植被特效找不到配置", [
								"配置路径",
								this.ConfigPath,
							]);
				},
			);
	}
	CacheFromConfig() {
		(this.FoliageTypes = new Array()),
			(this.ClusteredEffects = new Array()),
			(this.NumMin = new Array()),
			(this.NumMax = new Array()),
			(this.Densities = new Array()),
			(this.BoxExtend = Vector_1.Vector.Create(this.Config.BoxExtend));
		for (let t = 0; t < this.Config.SettingsData.Num(); t++) {
			var e = this.Config.SettingsData.Get(t);
			this.FoliageTypes.push(e.FoliageType),
				this.ClusteredEffects.push(e.EffectSetting),
				this.NumMin.push(e.NumMin),
				this.NumMax.push(e.NumMax),
				this.Densities.push(0);
		}
		(this.DetectBox = new UE.Box()),
			(this.TempVector = Vector_1.Vector.Create());
	}
	Tick(e) {
		var t;
		this.Ready &&
			0 !== this.FoliageTypes.length &&
			(this.UpdateCounter--,
			0 < this.UpdateCounter ||
				((this.UpdateCounter = this.UpdateInterval),
				RenderDataManager_1.RenderDataManager.Get()
					.GetCurrentCharacterPosition()
					.Subtraction(this.BoxExtend, this.TempVector),
				(this.DetectBox.Min = this.TempVector.ToUeVector()),
				RenderDataManager_1.RenderDataManager.Get()
					.GetCurrentCharacterPosition()
					.Addition(this.BoxExtend, this.TempVector),
				(this.DetectBox.Max = this.TempVector.ToUeVector()),
				(t =
					UE.KuroRenderingRuntimeBPPluginBPLibrary.GetOverlappingBoxCountForAllFoliageActors(
						GlobalData_1.GlobalData.World,
						this.FoliageTypes[this.UpdateIndex],
						this.DetectBox,
						this.NumMax[this.UpdateIndex],
					)),
				(this.Densities[this.UpdateIndex] = MathUtils_1.MathUtils.Clamp(
					(t - this.NumMin[this.UpdateIndex]) /
						(this.NumMax[this.UpdateIndex] - this.NumMin[this.UpdateIndex]),
					0,
					1,
				)),
				(this.UpdateIndex =
					(this.UpdateIndex + 1) % this.FoliageTypes.length)));
	}
	BeginDebugDraw(e, t) {
		this.DebugDrawHandle = DebugDrawManager_1.DebugDrawManager.AddDebugBox(
			this.DetectBox,
			e,
			t,
		);
	}
	EndDebugDraw() {
		DebugDrawManager_1.DebugDrawManager.RemoveDebugDraw(this.DebugDrawHandle);
	}
}
exports.FoliageClusteredEffectManager = FoliageClusteredEffectManager;
