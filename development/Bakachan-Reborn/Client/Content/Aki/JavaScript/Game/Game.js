"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Game = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../Core/Actor/ActorSystem"),
	Application_1 = require("../Core/Application/Application"),
	AudioController_1 = require("../Core/Audio/AudioController"),
	AudioSystem_1 = require("../Core/Audio/AudioSystem"),
	CustomPromise_1 = require("../Core/Common/CustomPromise"),
	Log_1 = require("../Core/Common/Log"),
	LogAnalyzer_1 = require("../Core/Common/LogAnalyzer"),
	Stats_1 = require("../Core/Common/Stats"),
	Http_1 = require("../Core/Http/Http"),
	ResourceSystem_1 = require("../Core/Resource/ResourceSystem"),
	TickSystem_1 = require("../Core/Tick/TickSystem"),
	MathUtils_1 = require("../Core/Utils/MathUtils"),
	UiTextTranslationUtils_1 = require("../Core/Utils/UiTextTranslationUtils"),
	TestModuleBridge_1 = require("./Bridge/TestModuleBridge"),
	EventDefine_1 = require("./Common/Event/EventDefine"),
	EventSystem_1 = require("./Common/Event/EventSystem"),
	LocalStorage_1 = require("./Common/LocalStorage"),
	TimeUtil_1 = require("./Common/TimeUtil"),
	EffectSystem_1 = require("./Effect/EffectSystem"),
	GameQualitySettingsManager_1 = require("./GameQualitySettings/GameQualitySettingsManager"),
	Global_1 = require("./Global"),
	GlobalData_1 = require("./GlobalData"),
	InputSettings_1 = require("./InputSettings/InputSettings"),
	InputSettingsManager_1 = require("./InputSettings/InputSettingsManager"),
	ConfigManager_1 = require("./Manager/ConfigManager"),
	ConfigManagerCreator_1 = require("./Manager/ConfigManagerCreator"),
	ControllerManager_1 = require("./Manager/ControllerManager"),
	ControllerRegisterManager_1 = require("./Manager/ControllerRegisterManager"),
	ModelManager_1 = require("./Manager/ModelManager"),
	ModelManagerCreator_1 = require("./Manager/ModelManagerCreator"),
	PakKeyManager_1 = require("./Manager/PakKeyManager"),
	SwitcherManager_1 = require("./Manager/SwitcherManager"),
	ThirdPartySdkManager_1 = require("./Manager/ThirdPartySdkManager"),
	UiPopFrameViewRegisterCenter_1 = require("./Manager/UiPopFrameViewRegisterCenter"),
	UiTabViewManager_1 = require("./Manager/UiTabViewManager"),
	UiViewManager_1 = require("./Manager/UiViewManager"),
	CombatMessageController_1 = require("./Module/CombatMessage/CombatMessageController"),
	HudUnitController_1 = require("./Module/HudUnit/HudUnitController"),
	HudUnitHandleManager_1 = require("./Module/HudUnit/HudUnitHandleManager"),
	Heartbeat_1 = require("./Module/Login/Heartbeat"),
	ThinkingAnalyticsReporter_1 = require("./Module/LogReport/ThinkingAnalyticsReporter"),
	LogUpload_1 = require("./Module/LogUpload/LogUpload"),
	OperationsPerformance_1 = require("./Module/PerformanceCollection/OperationsPerformance"),
	PerformanceManager_1 = require("./Module/PerformanceCollection/PerformanceManager"),
	UiCameraAnimationManager_1 = require("./Module/UiCameraAnimation/UiCameraAnimationManager"),
	UiSceneManager_1 = require("./Module/UiComponent/UiSceneManager"),
	BulletController_1 = require("./NewWorld/Bullet/BulletController"),
	FightLibrary_1 = require("./NewWorld/Character/Common/Blueprint/Utils/FightLibrary"),
	UeSkeletalTickManageComponent_1 = require("./NewWorld/Common/Component/UeSkeletalTickManageComponent"),
	RedDotSystem_1 = require("./RedDot/RedDotSystem"),
	TickScoreController_1 = require("./TickScore/TickScoreController"),
	UiTimeDilation_1 = require("./Ui/Base/UiTimeDilation"),
	InputManager_1 = require("./Ui/Input/InputManager"),
	TouchFingerManager_1 = require("./Ui/TouchFinger/TouchFingerManager"),
	UiManager_1 = require("./Ui/UiManager"),
	ComponentForceTickController_1 = require("./World/Controller/ComponentForceTickController"),
	GameBudgetAllocatorConfigCreator_1 = require("./World/Define/GameBudgetAllocatorConfigCreator"),
	TaskSystem_1 = require("./World/Task/TaskSystem");
class Game {
	static Start(e) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("Game", 1, "启动 Game"),
			GlobalData_1.GlobalData.Init(e),
			TimeUtil_1.TimeUtil.SetServerTimeStamp(Date.parse(new Date().toString())),
			Http_1.Http.SetHttpThreadActiveMinimumSleepTimeInSeconds(0.005),
			Http_1.Http.SetHttpThreadIdleMinimumSleepTimeInSeconds(0.033),
			ThinkingAnalyticsReporter_1.ThinkingAnalyticsReporter.Init(),
			LocalStorage_1.LocalStorage.Initialize(),
			LogUpload_1.LogUpload.Init(),
			ConfigManagerCreator_1.ConfigManagerCreator.Init(),
			InputSettings_1.InputSettings.Initialize(),
			InputSettingsManager_1.InputSettingsManager.Initialize(),
			InputManager_1.InputManager.Init(),
			UiSceneManager_1.UiSceneManager.Initialize(),
			Global_1.Global.InitEvent(),
			UiTextTranslationUtils_1.UiTextTranslationUtils.Initialize(),
			SwitcherManager_1.SwitcherManager.Initialize(),
			TouchFingerManager_1.TouchFingerManager.Initialize(),
			EffectSystem_1.EffectSystem.Initialize(),
			TaskSystem_1.TaskSystem.Initialize(),
			GameQualitySettingsManager_1.GameQualitySettingsManager.Initialize(),
			TickScoreController_1.TickScoreController.Init(),
			TimeUtil_1.TimeUtil.Init(ConfigManager_1.ConfigManager.TextConfig),
			TickSystem_1.TickSystem.Add(this.r6, "Game", 0, !0),
			TickSystem_1.TickSystem.Add(this.AfterTick, "Game", 4, !0),
			TickSystem_1.TickSystem.Add(this.AfterCameraTick, "Game", 5, !0),
			Heartbeat_1.Heartbeat.RegisterTick(),
			UE.KuroStaticLibrary.IsBuildShipping() ||
				(this.rve(),
				GlobalData_1.GlobalData.IsPlayInEditor && this.nve(),
				(this.sve = (0, puerts_1.toManualReleaseDelegate)(this.ave)),
				UE.KuroStaticLibrary.RegisterCustomCommandProcessor("aki", this.sve)),
			UE.GASBPLibrary.EnsureGameplayTagDataTableLoaded(),
			GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.CreateConfigs(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.DoLeaveLevel,
				Game.hve,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearSceneBegin,
				Game.KVs,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ReconnectClearData,
				Game.lve,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.BeforeTravelMap,
				Game.uve,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.EndTravelMap,
				Game.cve,
			),
			Application_1.Application.AddEditorPreEndPIEHandler(Game._ve);
	}
	static ModuleStart() {
		ThirdPartySdkManager_1.ThirdPartySdkManager.Init(),
			ModelManagerCreator_1.ModelManagerCreator.Init(),
			ControllerRegisterManager_1.ControllerRegisterManager.Init(),
			ControllerManager_1.ControllerManager.Init(),
			UiViewManager_1.UiViewManager.Init(),
			UiPopFrameViewRegisterCenter_1.UiPopFrameViewRegisterCenter.Init(),
			UiTabViewManager_1.UiTabViewManager.Init(),
			HudUnitHandleManager_1.HudUnitHandleManager.Init(),
			FightLibrary_1.FightLibrary.Init(),
			PerformanceManager_1.PerformanceManager.Init(),
			OperationsPerformance_1.OperationsPerformance.Init(),
			PakKeyManager_1.PakKeyManager.Init(),
			UiTimeDilation_1.UiTimeDilation.Init();
	}
	static Shutdown() {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("Game", 25, "Game.Shutdown Start"),
			Http_1.Http.SetHttpThreadActiveMinimumSleepTimeInSeconds(0),
			Http_1.Http.SetHttpThreadIdleMinimumSleepTimeInSeconds(0),
			LogAnalyzer_1.LogAnalyzer.Clear(),
			PerformanceManager_1.PerformanceManager.Destroy(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Game",
					25,
					"Game.Shutdown PerformanceManager.Destroy Finished",
				),
			TickSystem_1.TickSystem.Destroy(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Game", 25, "Game.Shutdown TickSystem.Destroy Finished"),
			UiTimeDilation_1.UiTimeDilation.Destroy(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Game",
					25,
					"Game.Shutdown UiTimeDilation.Destroy Finished",
				),
			ControllerManager_1.ControllerManager.Clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Game",
					25,
					"Game.Shutdown ControllerManager.Clear Finished",
				),
			ModelManagerCreator_1.ModelManagerCreator.Clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Game",
					25,
					"Game.Shutdown ModelManagerCreator.Clear Finished",
				),
			GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.CancelAllPerformanceLimit(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Game",
					11,
					"Game.Shutdown GameQualityInfo.CancelAllPerformanceLimit Finished",
				),
			TaskSystem_1.TaskSystem.Clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Game", 25, "Game.Shutdown TaskSystem.Clear Finished"),
			EffectSystem_1.EffectSystem.Clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Game", 25, "Game.Shutdown EffectSystem.Clear Finished"),
			UiTextTranslationUtils_1.UiTextTranslationUtils.Destroy(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Game",
					25,
					"Game.Shutdown UiTextTranslationUtils.Destroy Finished",
				),
			Application_1.Application.RemoveEditorPreEndPIEHandler(Game._ve),
			Application_1.Application.Destroy(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Game",
					25,
					"Game.Shutdown Application.Destroy Finished",
				);
	}
	static LockLoad() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Game",
				17,
				"[Game.EndTravelMap] SetActorPermanentExtraStatic true",
			);
	}
	static UnlockLoad() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Game",
				17,
				"[Game.EndTravelMap] SetActorPermanentExtraStatic false",
			);
	}
	static mve() {
		var e = ModelManager_1.ModelManager.GameModeModel;
		if (e && 0 < e.MapId) {
			try {
				ControllerManager_1.ControllerManager.LeaveLevel();
			} catch (e) {
				e instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Game",
							3,
							"[Game.LeaveLevel] 调用ControllerManager.LeaveLevel异常。",
							e,
							["error", e.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Game",
							3,
							"[Game.LeaveLevel] 调用ControllerManager.LeaveLevel异常。",
							["error", e],
						);
			}
			try {
				ModelManager_1.ModelManager.LeaveLevel();
			} catch (e) {
				e instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Game",
							3,
							"[Game.LeaveLevel] 调用ModelManager.LeaveLevel异常。",
							e,
							["error", e.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Game",
							3,
							"[Game.LeaveLevel] 调用ModelManager.LeaveLevel异常。",
							["error", e],
						);
			}
		}
	}
	static dve() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("World", 3, "[Game.LeaveLevel] LeaveLevel");
		try {
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClearWorld);
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Game",
						3,
						"[Game.LeaveLevel] 调用EventSystem.Emit(EEventName.ClearWorld)异常。",
						e,
						["error", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						3,
						"[Game.LeaveLevel] 调用EventSystem.Emit(EEventName.ClearWorld)异常。",
						["error", e],
					);
		}
	}
	static Cve(e, ...r) {
		try {
			e.Tick(...r);
		} catch (r) {
			r instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Game",
						20,
						"Error when execute",
						r,
						["this type", e.constructor.name],
						["error", r.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						20,
						"Error when execute",
						["this type", e.constructor.name],
						["error", r],
					);
		}
	}
	static async rve() {
		var e = await TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports();
		e && e.TsTestEntrance.Init();
	}
	static async nve() {
		var e = await TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports();
		e && e.EditorMetrics.Init();
	}
}
(exports.Game = Game),
	((_a = Game).gve = void 0),
	(Game.fve = void 0),
	(Game.pve = void 0),
	(Game.vve = void 0),
	(Game.sve = void 0),
	(Game.hve = () => {
		Game.dve();
	}),
	(Game.lve = () => {
		Game.Shutdown();
	}),
	(Game._ve = () => {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPreEndPIE),
			Game.Shutdown();
	}),
	(Game.uve = () => {}),
	(Game.cve = () => {
		Game.UnlockLoad();
	}),
	(Game.KVs = async () => {
		if (GlobalData_1.GlobalData.IsSceneClearing)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						17,
						"[Game.ClearSceneAsync]: Duplicate ClearSceneAsync",
					),
				!1
			);
		(GlobalData_1.GlobalData.ClearSceneDone =
			new CustomPromise_1.CustomPromise()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Game", 17, "[Game.ClearSceneAsync] 场景清理操作开始"),
			await UiManager_1.UiManager.ClearAsync().catch((e) => {
				e instanceof Error
					? Log_1.Log.CheckError() &&
						Log_1.Log.ErrorWithStack(
							"Game",
							17,
							"[Game.LeaveLevel] 调用 UiManager.ClearAsync 异常。",
							e,
							["error", e.message],
						)
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Game",
							17,
							"[Game.LeaveLevel] 调用 UiManager.ClearAsync 异常。",
							["error", e],
						);
			}),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Game",
					17,
					"[Game.ClearSceneAsync] UiManager.ClearAsync清理操作完成",
				);
		try {
			AudioController_1.AudioController.Clear();
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Game",
						22,
						"[Game.LeaveLevel] 调用AudioController.Clear异常。",
						e,
						["error", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						22,
						"[Game.LeaveLevel] 调用AudioController.Clear异常。",
						["error", e],
					);
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Game",
				17,
				"[Game.ClearSceneAsync] AudioController.Clear清理操作完成",
			);
		try {
			Game.mve();
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Game",
						3,
						"[Game.LeaveLevel] 调用Game.ClearControllerAndModel异常。",
						e,
						["error", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						3,
						"[Game.LeaveLevel] 调用Game.ClearControllerAndModel异常。",
						["error", e],
					);
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Game",
				17,
				"[Game.ClearSceneAsync] Game.ClearControllerAndModel清理操作完成",
			);
		try {
			ActorSystem_1.ActorSystem.Clear(), (ActorSystem_1.ActorSystem.State = 0);
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Game",
						22,
						"[Game.LeaveLevel] 调用ActorSystem.Clear异常。",
						e,
						["error", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						22,
						"[Game.LeaveLevel] 调用ActorSystem.Clear异常。",
						["error", e],
					);
		}
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Game", 17, "[Game.ClearSceneAsync] 场景清理操作完成"),
			Game.LockLoad(),
			GlobalData_1.GlobalData.ClearSceneDone.SetResult(),
			!(GlobalData_1.GlobalData.ClearSceneDone = void 0)
		);
	}),
	(Game.r6 = (e) => {
		CombatMessageController_1.CombatMessageController.PreTick(e),
			TickSystem_1.TickSystem.IsPaused ||
				UeSkeletalTickManageComponent_1.UeSkeletalTickController.TickManagers(
					e * MathUtils_1.MathUtils.MillisecondToSecond,
				),
			Game.Cve(UiManager_1.UiManager, e),
			Game.Cve(UiSceneManager_1.UiSceneManager),
			Game.Cve(UiCameraAnimationManager_1.UiCameraAnimationManager, e),
			Game.Cve(RedDotSystem_1.RedDotSystem, e),
			ControllerManager_1.ControllerManager.Tick(e),
			Game.Cve(EffectSystem_1.EffectSystem, e),
			Game.Cve(TimeUtil_1.TimeUtil, e),
			Game.Cve(AudioController_1.AudioController, e),
			Game.Cve(AudioSystem_1.AudioSystem, e),
			TickSystem_1.TickSystem.IsPaused ||
				Game.Cve(TickScoreController_1.TickScoreController, e),
			ResourceSystem_1.ResourceSystem.UpdateDelayCallback();
	}),
	(Game.AfterTick = (e) => {
		TickSystem_1.TickSystem.IsPaused ||
			(UeSkeletalTickManageComponent_1.UeSkeletalTickController.AfterTickManagers(
				e * MathUtils_1.MathUtils.MillisecondToSecond,
			),
			BulletController_1.BulletController.AfterTick(e),
			ComponentForceTickController_1.ComponentForceTickController.AfterTick(e)),
			EffectSystem_1.EffectSystem.AfterTick(e);
	}),
	(Game.AfterCameraTick = (e) => {
		CombatMessageController_1.CombatMessageController.AfterTick(e),
			UiManager_1.UiManager.AfterTick(e),
			TickSystem_1.TickSystem.IsPaused ||
				HudUnitController_1.HudUnitController.AfterTick(e);
	}),
	(Game.ave = (e) => {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RunGm, e);
	});
