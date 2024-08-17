"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GlobalData = void 0);
const UE = require("ue");
class GlobalData {
	constructor() {}
	static Init(t) {
		(this.f8 = t),
			(this.IMe = UE.KuroStaticLibrary.IsEditor(t.GetWorld())),
			(this.TMe = UE.NewObject(UE.BP_EventManager_C.StaticClass())),
			(this.LMe = UE.NewObject(UE.BP_FightManager_C.StaticClass()));
	}
	static SetUiState(t) {
		this.DMe = t;
	}
	static get IsUiSceneLoading() {
		return 1 === this.DMe;
	}
	static get IsUiSceneOpen() {
		return 2 === this.DMe;
	}
	static get IsPlayInEditor() {
		return this.IMe;
	}
	static get GameInstance() {
		return this.f8;
	}
	static get World() {
		return this.f8?.GetWorld();
	}
	static get BpEventManager() {
		return this.TMe;
	}
	static get BpFightManager() {
		return this.LMe;
	}
	static get IsEs3() {
		return (
			0 ===
			UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(this.World)
		);
	}
	static get IsSm5() {
		return (
			1 ===
			UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(this.World)
		);
	}
	static Networking() {
		return (
			void 0 === this.RMe && (this.RMe = 1 === UE.Actor.GetKuroNetMode()),
			this.RMe
		);
	}
	static IsRunWithEditorStartConfig() {
		var t;
		return (
			void 0 === this.UMe &&
				(this.IsPlayInEditor ||
				UE.KuroStaticLibrary.IsBuildShipping() ||
				"Windows" !== UE.GameplayStatics.GetPlatformName()
					? (this.UMe = !1)
					: ((t =
							UE.BlueprintPathsLibrary.ProjectDir() +
							"../Config/Raw/Tables/k.可视化编辑/__Temp__/EditorStartConfig.json"),
						(this.UMe =
							0 <=
								UE.KismetSystemLibrary.GetCommandLine().search(
									"-StartWithEditorConfig",
								) && UE.BlueprintPathsLibrary.FileExists(t)))),
			this.UMe
		);
	}
	static get IsSceneClearing() {
		return void 0 !== GlobalData.ClearSceneDone;
	}
}
((exports.GlobalData = GlobalData).RMe = void 0),
	(GlobalData.UMe = void 0),
	(GlobalData.ClearSceneDone = void 0);
