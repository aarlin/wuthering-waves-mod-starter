"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
	ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
	GlobalData_1 = require("../GlobalData"),
	ModelManager_1 = require("../Manager/ModelManager");
class GmDebugBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static TsRunGm(e) {
		ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.RunGm(
			e,
		);
	}
	static TsGetGmIsOpen() {
		return ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.GetGmIsOpen();
	}
	static TsGmGetEntityActorByChildActor(e) {
		return ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmGetEntityActorByChildActor(
			e,
		);
	}
	static TsGmGetEntityPbDataIdByChildActor(e) {
		return ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmGetEntityPbDataIdByChildActor(
			e,
		);
	}
	static TsGmShowEntityViewByPbDataId(e) {
		ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmShowEntityViewByPbDataId(
			e,
		);
	}
	static TsGmGetIsGameCommandServiceRunning() {
		return ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmGetIsGameCommandServiceRunning();
	}
	static TsGmStartGameCommandService(e) {
		ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmStartGameCommandService(
			e,
		);
	}
	static TsGmStopGameCommandService() {
		ModelManager_1.ModelManager.SundryModel.GetGmUniverseEditorFunctionLib()?.GmStopGameCommandService();
	}
	static OpenWbpDebugWin() {
		var e = ResourceSystem_1.ResourceSystem.Load(
			"/Game/NotInFinalPackage/DebugWin/WBP_DebugWin.WBP_DebugWin_C",
			UE.Class,
		);
		UE.UMGManager.CreateWidget(
			GlobalData_1.GlobalData.World.GetWorld(),
			e,
		).AddToViewport();
	}
	static TsCheatInputRequest(e) {
		ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.CheatInputRequest(
			e,
		);
	}
	static TsGetAoeDestroyEnemyActivated() {
		return ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.GetAoeDestroyEnemyActivated();
	}
	static TsSetAoeDestroyEnemyActivated(e) {
		ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.SetAoeDestroyEnemyActivated(
			e,
		);
	}
	static TsGetAoeDestroyEnemyRange() {
		return ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.GetAoeDestroyEnemyRange();
	}
	static TsSetAoeDestroyEnemyRange(e) {
		ModelManager_1.ModelManager.SundryModel.GetGmBlueprintFunctionLib()?.SetAoeDestroyEnemyRange(
			e,
		);
	}
}
exports.default = GmDebugBlueprintFunctionLibrary;
