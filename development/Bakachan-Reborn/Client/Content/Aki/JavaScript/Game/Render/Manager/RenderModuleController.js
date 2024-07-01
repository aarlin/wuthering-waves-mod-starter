"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RenderModuleController = void 0);
const UE = require("ue"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../GlobalData"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	RoleTriggerController_1 = require("../../NewWorld/Character/Role/RoleTriggerController"),
	RenderModuleConfig_1 = require("./RenderModuleConfig");
class RenderModuleController extends ControllerBase_1.ControllerBase {
	static GetKuroCurrentUiSceneTransform() {
		return this.UiSceneOffsetTransform;
	}
	static GetKuroUiSceneLoadOffset() {
		var e = RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger();
		return e
			? (((e = e.K2_GetActorLocation()).Z += 3e5), e)
			: new UE.Vector(3e5, 3e5, 0);
	}
	static SetWorldPartitionDataLayerState(e, t) {
		UE.KuroRenderingRuntimeBPPluginBPLibrary.SetWorldPartitionDataLayerState(
			GlobalData_1.GlobalData.World,
			FNameUtil_1.FNameUtil.GetDynamicFName(e),
			t,
		);
	}
	static IsWorldPartitionDataLayerEnable(e) {
		return UE.KuroRenderingRuntimeBPPluginBPLibrary.IsWorldPartitionDataLayerEnable(
			GlobalData_1.GlobalData.World,
			FNameUtil_1.FNameUtil.GetDynamicFName(e),
		);
	}
	static AddBattleReference(e) {
		ModelManager_1.ModelManager.RenderModuleModel.AddBattleReference(e);
	}
	static DecBattleReference() {
		ModelManager_1.ModelManager.RenderModuleModel.DecBattleReference();
	}
	static GetCurrentKeyState(e) {
		return ModelManager_1.ModelManager.RenderModuleModel.GetCurrentKeyState(e);
	}
	static GetIdleClearAtmosphere(e) {
		return ModelManager_1.ModelManager.RenderModuleModel.GetIdleClearAtmosphere(
			e,
		);
	}
	static SetBattleState(e, t, r = !1) {
		ModelManager_1.ModelManager.RenderModuleModel &&
			ModelManager_1.ModelManager.RenderModuleModel.SetBattleState(e, t, r);
	}
	static GetWuYinQuBattleDebugInfo() {
		return ModelManager_1.ModelManager.RenderModuleModel.GetWuYinQuBattleDebugInfo();
	}
	static GetBattleState(e) {
		return ModelManager_1.ModelManager.RenderModuleModel.GetBattleState(e);
	}
	static GetCurrentBattleKey() {
		return ModelManager_1.ModelManager.RenderModuleModel.GetCurrentBattleKey();
	}
	static AddWuYinQuBattleActorWaiting(e) {
		void 0 === this.WaitingForAddWuYinQuBattleActors &&
			(this.WaitingForAddWuYinQuBattleActors = []),
			this.WaitingForAddWuYinQuBattleActors.push(e);
	}
	static AddWuYinQuBattleActor(e) {
		return (
			!!ModelManager_1.ModelManager.RenderModuleModel &&
			ModelManager_1.ModelManager.RenderModuleModel.AddWuYinQuBattleActor(e)
		);
	}
	static RemoveWuYinQuBattleActor(e) {
		return (
			!!ModelManager_1.ModelManager.RenderModuleModel &&
			ModelManager_1.ModelManager.RenderModuleModel.RemoveWuYinQuBattleActor(e)
		);
	}
	static AddTickableObject(e) {
		ModelManager_1.ModelManager.RenderModuleModel.AddTickableObject(e);
	}
	static RemoveTickableObject(e) {
		ModelManager_1.ModelManager.RenderModuleModel?.RemoveTickableObject(e);
	}
	static AddCharRenderShell(e) {
		ModelManager_1.ModelManager.RenderModuleModel.AddCharRenderShell(e);
	}
	static RemoveCharRenderShell(e) {
		return (
			ModelManager_1.ModelManager.RenderModuleModel?.RemoveCharRenderShell(e) ??
			!1
		);
	}
	static GetRainIntensity() {
		return ModelManager_1.ModelManager.RenderModuleModel
			? ModelManager_1.ModelManager.RenderModuleModel.GetRainIntensity()
			: 0;
	}
	static GetSnowIntensity() {
		return ModelManager_1.ModelManager.RenderModuleModel
			? ModelManager_1.ModelManager.RenderModuleModel.GetSnowIntensity()
			: 0;
	}
	static IsRuntime() {
		return this.tZ;
	}
	static OnInit() {
		return (
			RenderModuleConfig_1.RenderStats.Init(),
			(this.DebugUiSceneLoadOffset = new UE.Vector()),
			(this.UiSceneOffsetTransform = new UE.Transform()),
			(this.tZ = !0),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBossFight,
				this.Flr,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.yK,
			),
			this.Vlr ||
				TickSystem_1.TickSystem.Add(
					this.Hlr.bind(this),
					"RenderModuleController",
					3,
					!0,
				),
			!0
		);
	}
	static OnClear() {
		return (
			(this.tZ = !1),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBossFight,
				this.Flr,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.yK,
			),
			!0
		);
	}
	static OnTick(e) {
		this.Vlr && this.Hlr(e);
	}
	static Hlr(e) {
		this.tZ &&
			((this.GlobalTimeDilation = 1),
			(this.IsGamePaused = MathUtils_1.MathUtils.IsNearlyEqual(
				this.GlobalTimeDilation,
				0,
			)),
			void 0 !== this.WaitingForAddWuYinQuBattleActors &&
				0 !== this.WaitingForAddWuYinQuBattleActors.length &&
				(this.WaitingForAddWuYinQuBattleActors.forEach((e) => {
					this.AddWuYinQuBattleActor(e);
				}),
				(this.WaitingForAddWuYinQuBattleActors = [])),
			ModelManager_1.ModelManager.RenderModuleModel.Tick(e));
	}
}
((exports.RenderModuleController =
	RenderModuleController).IsTickEvenPausedInternal = !0),
	(RenderModuleController.tZ = !1),
	(RenderModuleController.Vlr = !1),
	(RenderModuleController.WaitingForAddWuYinQuBattleActors = void 0),
	(RenderModuleController.IsGamePaused = !1),
	(RenderModuleController.GlobalTimeDilation = 1),
	(RenderModuleController.DebugNewUiSceneWorkflow = !0),
	(RenderModuleController.DebugUiSceneLoadOffset = void 0),
	(RenderModuleController.UiSceneOffsetTransform = void 0),
	(RenderModuleController.DebugStartShowingUiSceneRendering = !1),
	(RenderModuleController.DebugInUiSceneRendering = !1),
	(RenderModuleController.Flr = (e) => {
		UE.KismetSystemLibrary.ExecuteConsoleCommand(
			GlobalData_1.GlobalData.World,
			"r.Kuro.GlobalGIRenderQuality 1",
		);
	}),
	(RenderModuleController.yK = (e) => {
		e ||
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"r.Kuro.GlobalGIRenderQuality 0",
			);
	});
