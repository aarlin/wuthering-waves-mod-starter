"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
	RenderDataManager_1 = require("../Data/RenderDataManager"),
	DebugDrawManager_1 = require("../DebugDraw/DebugDrawManager"),
	SceneCharacterInteraction_1 = require("../Scene/Interaction/SceneCharacterInteraction"),
	FoliageClusteredEffectManager_1 = require("./ClusteredStuff/FoliageClusteredEffectManager"),
	EffectGlobal_1 = require("./EffectGlobal"),
	LensFlareManager_1 = require("./LensFlare/LensFlareManager"),
	ScreenEffectSystem_1 = require("./ScreenEffectSystem/ScreenEffectSystem");
class EffectBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static SetMaterialControllerDataSync(e, t, a) {
		if (!(t.length <= 0 || "None" === t)) {
			e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
			const c = e?.Entity?.GetComponent(3)?.Actor?.CharRenderingComponent;
			a
				? ResourceSystem_1.ResourceSystem.LoadAsync(
						t,
						UE.PD_CharacterControllerDataGroup_C,
						(e) => {
							e
								? c?.AddMaterialControllerDataGroup(e)
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error("Battle", 4, "无法找到材质效果组", [
										"materialDataPath",
										t,
									]);
						},
					)
				: ResourceSystem_1.ResourceSystem.LoadAsync(
						t,
						UE.PD_CharacterControllerData_C,
						(e) => {
							e
								? c?.AddMaterialControllerData(e)
								: Log_1.Log.CheckError() &&
									Log_1.Log.Error("Battle", 4, "无法找到材质效果", [
										"materialDataPath",
										t,
									]);
						},
					);
			var r = Protocol_1.Aki.Protocol.eNn.create();
			(r.f4n = new Protocol_1.Aki.Protocol.f4n()),
				(r.f4n.g4n = t),
				(r.f4n.p4n = a),
				CombatMessage_1.CombatNet.Call(23488, e.Entity, r, () => {});
		}
	}
	static RecycleEffect(e) {}
	static RefreshEffectStatisticsData(e) {}
	static GetEffectStatisticsCurrentCount() {
		return 0;
	}
	static GetEffectStatisticsTickCount() {
		return 0;
	}
	static GetEffectStatisticsRegisteredInterval() {
		return 0;
	}
	static GetEffectStatisticsReleasedInterval() {
		return 0;
	}
	static GetEffectStatisticsEntryCount() {
		return 0;
	}
	static GetEffectStatisticsEntry(e) {}
	static GetNumEffectAll() {
		return 0;
	}
	static GetNumEffectTickThisFrame() {
		return 0;
	}
	static GetNumEffectUpdateNonRearrange() {
		return 0;
	}
	static GetNumEffectUpdateArbitrary() {
		return 0;
	}
	static GetNumEffectUpdateHigh() {
		return 0;
	}
	static GetNumEffectUpdateLow() {
		return 0;
	}
	static GetNumEffectUpdateNearlyPaused() {
		return 0;
	}
	static AddDebugLineFromPlayer(e, t, a) {
		return DebugDrawManager_1.DebugDrawManager.AddDebugLineFromPlayer(
			Vector_1.Vector.Create(e),
			t,
			a,
		);
	}
	static ClearDebugDraw() {
		DebugDrawManager_1.DebugDrawManager.ClearDebugDraw();
	}
	static TickClusteredStuff(e, t) {}
	static EditorManualTickClusteredStuffEffects(e, t) {}
	static SetClusteredStuffDensities(e, t, a, r) {}
	static EnableGlobalInteractionEffect(e) {}
	static DisableGlobalInteractionEffect() {}
	static ValidateKuroAnimNotify(e) {
		return e.K2_ValidateAssets();
	}
	static ValidateKuroAnimNotifyState(e) {
		return e.K2_ValidateAssets();
	}
	static AudioVisualizationInstanceStart(e) {
		e.Start();
	}
	static AudioVisualizationInstanceEnd(e) {
		e.End();
	}
	static AudioVisualizationInstanceCallback(e, t, a, r) {
		e.CallBack(t, a, r);
	}
	static SetVisualizeCharacterWaterEffectTrace(e) {
		SceneCharacterInteraction_1.default.SetTraceDebug(e);
	}
	static SetEffectSpawnLogEnabled(e) {
		EffectGlobal_1.EffectGlobal.EnableSpawnLog = e;
	}
	static BeginDebugDrawFoliageDetect(e, t) {
		FoliageClusteredEffectManager_1.FoliageClusteredEffectManager.Get().BeginDebugDraw(
			e,
			t,
		);
	}
	static EndDebugDrawFoliageDetect() {
		FoliageClusteredEffectManager_1.FoliageClusteredEffectManager.Get().EndDebugDraw();
	}
	static RefreshFoliageDetectConfig() {
		FoliageClusteredEffectManager_1.FoliageClusteredEffectManager.Get().CacheFromConfig();
	}
	static SetEffectInPoolEnabled(e) {
		EffectGlobal_1.EffectGlobal.AllowEffectInPool = e;
	}
	static SetEffectOutPoolEnabled(e) {
		EffectGlobal_1.EffectGlobal.AllowEffectOutPool = e;
	}
	static EnableSceneObjectWaterEffectShowDebugTrace(e) {
		EffectGlobal_1.EffectGlobal.SceneObjectWaterEffectShowDebugTrace = e;
	}
	static SetTsWriteTimeToCollectionEnabled(e) {
		Info_1.Info.IsGameRunning() &&
			RenderDataManager_1.RenderDataManager.Get().SetWriteTime(e);
	}
	static EffectCgMode(e) {
		EffectGlobal_1.EffectGlobal.CgMode = e;
	}
	static GetScreenEffectSystem() {
		return ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
	}
	static GiTickLensFlare(e, t, a, r, c) {
		LensFlareManager_1.LensFlareManager.Get().Tick(e, t, a, r, c);
	}
}
exports.default = EffectBlueprintFunctionLibrary;
