"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameModeController =
		exports.BASE_SPEED =
		exports.LOADED_SPEED_RATE =
		exports.LOAD_FINISHED_PROGRESS =
		exports.OPENLOADING_END_PROGRESS =
			void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
	Application_1 = require("../../../Core/Application/Application"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
	Stats_1 = require("../../../Core/Common/Stats"),
	Time_1 = require("../../../Core/Common/Time"),
	Queue_1 = require("../../../Core/Container/Queue"),
	AreaMpcById_1 = require("../../../Core/Define/ConfigQuery/AreaMpcById"),
	DataLayerById_1 = require("../../../Core/Define/ConfigQuery/DataLayerById"),
	InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../Camera/CameraController"),
	CameraUtility_1 = require("../../Camera/CameraUtility"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	InputController_1 = require("../../Input/InputController"),
	LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	FormationDataController_1 = require("../../Module/Abilities/FormationDataController"),
	BattleUiControl_1 = require("../../Module/BattleUi/BattleUiControl"),
	BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController"),
	LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
	LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
	LoadingController_1 = require("../../Module/Loading/LoadingController"),
	Heartbeat_1 = require("../../Module/Login/Heartbeat"),
	LogReportController_1 = require("../../Module/LogReport/LogReportController"),
	LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine"),
	SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController"),
	TeleportController_1 = require("../../Module/Teleport/TeleportController"),
	TimeOfDayController_1 = require("../../Module/TimeOfDay/TimeOfDayController"),
	VideoLauncher_1 = require("../../Module/Video/VideoLauncher"),
	BulletController_1 = require("../../NewWorld/Bullet/BulletController"),
	CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
	PreloadDefine_1 = require("../../Preload/PreloadDefine"),
	RenderModuleController_1 = require("../../Render/Manager/RenderModuleController"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager"),
	UiManager_1 = require("../../Ui/UiManager"),
	GameModePromise_1 = require("../Define/GameModePromise"),
	WorldDefine_1 = require("../Define/WorldDefine"),
	AsyncTask_1 = require("../Task/AsyncTask"),
	TaskSystem_1 = require("../Task/TaskSystem"),
	WorldGlobal_1 = require("../WorldGlobal"),
	ComponentForceTickController_1 = require("./ComponentForceTickController"),
	PreloadController_1 = require("./PreloadController"),
	PreloadControllerNew_1 = require("./PreloadControllerNew"),
	TOP_CONSUMING_COUNT = 20,
	ONE_SECOND = 1e3,
	OPENLEVEL_END_PROGRESS = ((exports.OPENLOADING_END_PROGRESS = 10), 30),
	PRELOAD_END_PROGRESS = 35,
	SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS = 40,
	CHECK_VOXEL_STREAMING_END_PROGRESS = 50,
	CHECK_STREAMING_END_PROGRESS = 75,
	CREATE_ENTITY_END_PROGRESS = 80,
	WORLD_DONE_END_PROGRESS = 90,
	cellNum =
		((exports.LOAD_FINISHED_PROGRESS = 100),
		(exports.LOADED_SPEED_RATE = 2),
		(exports.BASE_SPEED = 25),
		(0, puerts_1.$ref)(0)),
	matchCellNum = (0, puerts_1.$ref)(0);
class SubLevelInfo {
	constructor(e, o, a, r, t, n) {
		(this.UnloadLevels = void 0),
			(this.Levels = void 0),
			(this.ScreenEffect = 0),
			(this.Location = void 0),
			(this.Rotator = void 0),
			(this.Callback = void 0),
			(this.UnloadLevels = e),
			(this.Levels = o),
			(this.ScreenEffect = a),
			(this.Location = r ?? void 0),
			(this.Rotator = t ?? void 0),
			(this.Callback = n ?? void 0);
	}
	Clear() {
		(this.UnloadLevels = void 0),
			(this.Levels = void 0),
			(this.ScreenEffect = 0),
			(this.Location = void 0),
			(this.Rotator = void 0),
			(this.Callback = void 0);
	}
}
class GameModeController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			(Info_1.Info.IsMobile() || Info_1.Info.IsGamepad()) &&
				(Application_1.Application.AddApplicationHandler(
					0,
					GameModeController.JVs,
				),
				Application_1.Application.AddApplicationHandler(
					1,
					GameModeController.DHe,
				)),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			(this.g5s = new Queue_1.Queue()),
			!0
		);
	}
	static OnClear() {
		return (
			(Info_1.Info.IsMobile() || Info_1.Info.IsGamepad()) &&
				(Application_1.Application.RemoveApplicationHandler(
					0,
					GameModeController.JVs,
				),
				Application_1.Application.RemoveApplicationHandler(
					1,
					GameModeController.DHe,
				)),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ClearWorld,
				this.uMe,
			),
			this.NVs(),
			this.g5s?.Clear(),
			!(this.g5s = void 0)
		);
	}
	static SetGameModeData(e, o) {
		var a,
			r = ModelManager_1.ModelManager.GameModeModel,
			t = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
		return t
			? (a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapSourceConfig(
					t.MapConfigId,
				))
				? ((r.HasGameModeData = !0),
					(r.MapPath = a.MapPath.toString()),
					(r.IsMulti = o === Protocol_1.Aki.Protocol.oOs.Proto_Multi),
					(r.Mode = o),
					(r.InstanceType = t.InstType),
					(r.MapConfig = a),
					(r.MapId = t.MapConfigId ?? 0),
					r.SetInstanceDungeon(e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnSetGameModeDataDone,
					),
					!0)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"World",
							3,
							"[WorldGlobal.LoadMapFromInstanceDungeon] 不存在Id",
							["MapConfigId", t.MapConfigId],
						),
					!1)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"[GameModeController.InitGameModeData] 不存在副本表id:",
						["id", e],
					),
				!1);
	}
	static async Load(e) {
		const o = ModelManager_1.ModelManager.GameModeModel;
		var a = o.Mode;
		const r = o.InstanceDungeon;
		var t = o.MapConfig;
		if (
			((o.RenderAssetDone = !1),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"GameMode",
					3,
					"加载场景:开始",
					["SceneMode", a],
					["副本Id", r.Id],
					["地图", t.MapId],
					["MapPath", t.MapPath],
					["出生点位置", o.BornLocation],
					["出生点旋转", o.BornRotator],
					["LoadingPhase", o.LoadingPhase],
				),
			o.BornLocation)
		)
			if (o.BornRotator) {
				this.m6("GameModeController.Load: Start"),
					o.LoadWorldProfiler.Restart(),
					o.CreatePromise();
				const t =
					ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel;
				(a = new AsyncTask_1.AsyncTask("GameModeController.Load", async () => {
					(o.LoadingPhase = 3),
						LoadingController_1.LoadingController.SetProgress(0, void 0, 1, !0),
						this.m6("GameModeController.Load:OpenLoading Start"),
						await GameModeController.S0r(),
						this.m6("GameModeController.Load:OpenLoading End"),
						(o.LoadingPhase = 4),
						(o.LoadingPhase = 5),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.BeforeLoadMap,
						),
						this.m6("GameModeController.Load:SetLoadModeInLoading Start"),
						ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
							GlobalData_1.GlobalData.World,
							"GameModeController.Load",
						),
						this.m6("GameModeController.Load:SetLoadModeInLoading End"),
						UE.Actor.SetKuroNetMode(1),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 11, "加载场景:暂停网络消息处理并缓存"),
						(Net_1.Net.IsConsumeNotifyPaused = !0),
						UiManager_1.UiManager.LockOpen(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:加载地图(开始)"),
						ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
							"GameModeController.Load",
						),
						this.m6("GameModeController.Load:OpenLevel Start"),
						o.OpenLevelProfiler.Restart(),
						ModelManager_1.ModelManager.GameModeModel.IsSilentLogin
							? GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
								? WorldGlobal_1.WorldGlobal.OpenLevel(
										ModelManager_1.ModelManager.GameModeModel.MapConfig.MapPath,
									)
								: ((o.IsSilentLogin = !1),
									GameModeController.InitAllPlayerStarts(),
									o.OpenLevelPromise.SetResult(!0),
									o.BeginLoadMapPromise.SetResult(!0))
							: (t &&
									(await SeamlessTravelController_1.SeamlessTravelController.PreOpenLevel()),
								WorldGlobal_1.WorldGlobal.OpenLevel(
									ModelManager_1.ModelManager.GameModeModel.MapConfig.MapPath,
								),
								t &&
									SeamlessTravelController_1.SeamlessTravelController.PostOpenLevel()),
						ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(
							3,
						),
						await o.BeginLoadMapPromise.Promise,
						(ActorSystem_1.ActorSystem.State = 1),
						EffectSystem_1.EffectSystem.ClearPool(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"加载场景:加载地图，BeginLoadMap完成",
							),
						await o.OpenLevelPromise.Promise,
						t &&
							SeamlessTravelController_1.SeamlessTravelController.PostLoadedLevel(),
						o.OpenLevelProfiler.Stop(),
						this.m6("GameModeController.Load:OpenLevel End"),
						UiManager_1.UiManager.UnLockOpen(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 11, "加载场景:恢复网络消息处理"),
						(Net_1.Net.IsConsumeNotifyPaused = !1),
						LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(!1),
						LguiEventSystemManager_1.LguiEventSystemManager.RefreshCurrentInputModule(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:加载地图(完成)"),
						LoadingController_1.LoadingController.SetProgress(
							OPENLEVEL_END_PROGRESS,
						),
						(o.LoadingPhase = 6),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"加载场景:等待AfterJoinSceneNotify(开始)",
							),
						await o.AfterJoinSceneNotifyPromise.Promise,
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"加载场景:等待AfterJoinSceneNotify(完成)",
							);
					{
						(o.LoadingPhase = 7),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("GameMode", 3, "加载场景:预加载(开始)"),
							this.m6("GameModeController.Load:Preload Start"),
							o.PreloadProfiler.Restart();
						var a = new LoadGroup("Preload阶段");
						const r = 35 - OPENLEVEL_END_PROGRESS;
						a.Add(
							"应用MPC",
							() => (
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("GameMode", 3, "加载场景:应用MPC(开始)"),
								this.m6(
									"GameModeController.Load:ApplyMaterialParameterCollection Start",
								),
								o.PreloadApplyMaterialParameterCollectionProfiler.Restart(),
								this.E0r(e),
								!0
							),
							async () => o.ApplyMaterialParameterCollectionPromise.Promise,
							(e) => (
								e &&
									LoadingController_1.LoadingController.AddProgress(
										0.2 * r,
										35,
									),
								o.PreloadApplyMaterialParameterCollectionProfiler.Stop(),
								this.m6(
									"GameModeController.Load:ApplyMaterialParameterCollection End",
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("GameMode", 3, "加载场景:应用MPC(完成)"),
								!0
							),
						),
							a.Add(
								"预加载Common、Entity资源",
								() => (
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"GameMode",
											3,
											"加载场景:预加载公共资源、实体资源(开始)",
										),
									this.m6("GameModeController.Load:CommonAndEntityAsset Start"),
									o.PreloadCommonAndEntityProfiler.Restart(),
									this.y0r(() => {
										ModelManager_1.ModelManager.WorldModel.SetMapDone(!0),
											ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
												"GameModeController.Load",
											),
											EventSystem_1.EventSystem.Emit(
												EventDefine_1.EEventName.AfterLoadMap,
											);
									}),
									!0
								),
								async () => o.PreloadPromise.Promise,
								(e) => (
									e &&
										LoadingController_1.LoadingController.AddProgress(
											0.6 * r,
											35,
										),
									o.PreloadCommonAndEntityProfiler.Stop(),
									this.m6("GameModeController.Load:CommonAndEntityAsset End"),
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"GameMode",
											3,
											"加载场景:预加载公共资源、实体资源(完成)",
											["结果", e],
										),
									!0
								),
							),
							a.Add(
								"LoadBattleView",
								() => (
									this.m6(
										"GameModeController.Load:PreloadBattleViewFromLoading Start",
									),
									!0
								),
								async () =>
									BattleUiControl_1.BattleUiControl.PreloadBattleViewFromLoading(),
								(e) => (
									e &&
										LoadingController_1.LoadingController.AddProgress(
											0.1 * r,
											35,
										),
									this.m6(
										"GameModeController.Load:PreloadBattleViewFromLoading End",
									),
									!0
								),
							),
							a.Add(
								"Controller Preload",
								() => (
									this.m6("GameModeController.Load:Controller Preload Start"),
									o.PreloadControllerProfiler.Restart(),
									!0
								),
								async () => {
									var e = this.Manager.Preload();
									if (e.length) {
										var o = new Array();
										for (const r of e) {
											const e = r[0];
											var a = r[1];
											a.Promise.then((o) => {
												o ||
													(Log_1.Log.CheckError() &&
														Log_1.Log.Error(
															"GameMode",
															3,
															"加载场景:执行Controller预加载失败",
															["Name", e],
														));
											}),
												o.push(a.Promise);
										}
										await Promise.all(o);
									}
									return !0;
								},
								(e) => (
									e &&
										LoadingController_1.LoadingController.AddProgress(
											0.1 * r,
											35,
										),
									o.PreloadControllerProfiler.Stop(),
									this.m6("GameModeController.Load:Controller Preload End"),
									!0
								),
							),
							await a.Run(),
							o.PreloadProfiler.Stop(),
							this.m6("GameModeController.Load:Preload End"),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("GameMode", 3, "加载场景:预加载(完成)"),
							LoadingController_1.LoadingController.SetProgress(35),
							(o.LoadingPhase = 8);
					}
					(o.LoadingPhase = 9),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:检测加载DataLayer(开始)"),
						this.m6("GameModeController.Load:LoadDataLayer Start"),
						o.LoadDataLayerProfiler.Restart(),
						this.I0r(e),
						o.LoadDataLayerProfiler.Stop(),
						this.m6("GameModeController.Load:LoadDataLayer End"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:检测加载DataLayer(结束)"),
						this.UpdateFoliageDataLayer(),
						this.UpdateStreamingQualityLevel(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:检测加载子关卡(开始)"),
						this.m6("GameModeController.Load:LoadSubLevel Start"),
						o.LoadSubLevelProfiler.Start(),
						await this.T0r(e),
						o.LoadSubLevelProfiler.Stop(),
						this.m6("GameModeController.Load:LoadSubLevel End"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:检测加载子关卡(结束)"),
						LoadingController_1.LoadingController.SetProgress(40),
						(o.LoadingPhase = 10),
						(o.LoadingPhase = 11),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:检测体素流送(开始)"),
						ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool(),
						this.AddOrRemoveRenderAssetsQueryViewInfo(
							o.BornLocation,
							ResourceSystem_1.WAIT_RENDER_ASSET_DURATION,
						),
						this.m6(
							"GameModeController.Load:CheckVoxelStreamingCompleted Start",
						),
						o.CheckVoxelStreamingSourceProfiler.Restart(),
						await this.V6s(10, 50),
						o.CheckVoxelStreamingSourceProfiler.Stop(),
						this.m6("GameModeController.Load:CheckVoxelStreamingCompleted End"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:检测体素流送(完成)"),
						ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool(),
						LoadingController_1.LoadingController.SetProgress(50),
						(o.LoadingPhase = 12),
						(o.LoadingPhase = 13),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 7, "加载场景:检测场景流送(开始)"),
						this.m6("GameModeController.Load:CheckStreamingCompleted Start"),
						o.CheckStreamingSourceProfiler.Restart(),
						await this.Kyo(25, 75),
						o.CheckStreamingSourceProfiler.Stop(),
						this.m6("GameModeController.Load:CheckStreamingCompleted End"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 7, "加载场景:检测场景流送(完成)"),
						LoadingController_1.LoadingController.SetProgress(75),
						(o.LoadingPhase = 14),
						(o.LoadingPhase = 15),
						CameraController_1.CameraController.ReturnLockOnCameraMode(),
						ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
							GlobalData_1.GlobalData.World,
							"GameModeController.Load",
						),
						this.m6("GameModeController.Load:CreateEntities Start"),
						o.CreateEntitiesProfiler.Restart(),
						ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
							Protocol_1.Aki.Protocol.jBs.Proto_SceneInit,
						),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:加载编队(开始)"),
						this.m6("GameModeController.Load:LoadFormation Start"),
						await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise
							?.Promise,
						this.m6("GameModeController.Load:LoadFormation End"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:加载编队(完成)"),
						o.CreateEntitiesProfiler.Stop(),
						this.m6("GameModeController.Load:CreateEntities End"),
						LoadingController_1.LoadingController.SetProgress(80),
						o.WaitRenderAssetsProfiler.Restart(),
						await this.CheckRenderAssetsStreamingCompleted(
							o.BornLocation,
							"加载场景:",
						),
						o.WaitRenderAssetsProfiler.Stop(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.FixBornLocation,
						),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"加载场景:修正主控玩家地面位置(开始)",
							),
						t
							? SeamlessTravelController_1.SeamlessTravelController.FixBornLocation(
									r,
								)
							: this.D0r(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"加载场景:修正主控玩家地面位置(完成)",
							),
						(o.LoadingPhase = 16),
						(o.LoadingPhase = 17),
						(o.WorldDone = !0),
						ModelManager_1.ModelManager.CreatureModel.SetIsLoadingScene(!1),
						InputController_1.InputController.SetMoveControlEnabled(
							!0,
							!0,
							!0,
							!0,
						),
						LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
						InputDistributeController_1.InputDistributeController.RefreshInputTag(),
						GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Broadcast(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:派发WorldDone事件通知"),
						EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldDone),
						o.PlayTravelMp4 ||
							(this.m6(
								"GameModeController.Load:OpenBattleViewFromLoading Start",
							),
							o.OpenBattleViewProfiler.Restart(),
							await BattleUiControl_1.BattleUiControl.OpenBattleViewFromLoading(),
							o.OpenBattleViewProfiler.Stop(),
							this.m6("GameModeController.Load:OpenBattleViewFromLoading End")),
						t ||
							(CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
								Rotator_1.Rotator.ZeroRotator,
							),
							CameraController_1.CameraController.FightCamera.LogicComponent.ResetInitialCameraRotation()),
						LoadingController_1.LoadingController.SetProgress(90),
						(o.LoadingPhase = 18);
					{
						(o.LoadingPhase = 19),
							ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
								? (SeamlessTravelController_1.SeamlessTravelController.FinishSeamlessTravel(),
									ModelManager_1.ModelManager.LoadingModel.SetIsLoading(!1))
								: ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4
									? (Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"GameMode",
												3,
												"加载场景:等待CG结束(开始)",
											),
										await ModelManager_1.ModelManager.GameModeModel
											.VideoStartPromise.Promise,
										this.m6(
											"GameModeController.Load:OpenBattleViewFromLoading Start",
										),
										o.OpenBattleViewProfiler.Restart(),
										await BattleUiControl_1.BattleUiControl.OpenBattleViewFromLoading(),
										o.OpenBattleViewProfiler.Stop(),
										this.m6(
											"GameModeController.Load:OpenBattleViewFromLoading End",
										),
										await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
											8,
										),
										GameModeController.SetTravelMp4(!1, void 0),
										Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"GameMode",
												3,
												"加载场景:等待CG结束(完成)",
											))
									: ModelManager_1.ModelManager.GameModeModel.UseShowCenterText
										? (Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"GameMode",
													46,
													"加载场景:关闭黑幕白字界面(开始)",
												),
											ModelManager_1.ModelManager.GameModeModel.CloseLoadingProfiler.Restart(),
											await LoadingController_1.LoadingController.GameModeCloseLoading(),
											ModelManager_1.ModelManager.GameModeModel.CloseLoadingProfiler.Stop(),
											await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
												8,
											),
											(ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow =
												void 0),
											(ModelManager_1.ModelManager.GameModeModel.UseShowCenterText =
												!1),
											Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"GameMode",
													46,
													"加载场景:关闭黑幕白字界面(完成)",
												))
										: (Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"GameMode",
													3,
													"加载场景:关闭Loading界面(开始)",
												),
											this.m6("GameModeController.Load:CloseLoading Start"),
											ModelManager_1.ModelManager.GameModeModel.CloseLoadingProfiler.Restart(),
											await LoadingController_1.LoadingController.GameModeCloseLoading(),
											ModelManager_1.ModelManager.GameModeModel.CloseLoadingProfiler.Stop(),
											this.m6("GameModeController.Load:CloseLoading End"),
											Log_1.Log.CheckInfo() &&
												Log_1.Log.Info(
													"GameMode",
													3,
													"加载场景:关闭Loading界面(完成)",
												)),
							(o.LoadingPhase = 20),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"GameMode",
									3,
									"加载场景:通知服务端加载完成（开始）",
								),
							this.m6(
								"GameModeController.Load:SceneLoadingFinishRequest Start",
							),
							await ControllerHolder_1.ControllerHolder.CreatureController.SceneLoadingFinishRequest(
								e.W7n,
							),
							this.m6("GameModeController.Load:SceneLoadingFinishRequest End"),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"GameMode",
									3,
									"加载场景:通知服务端加载完成（完成）",
								),
							(o.WorldDoneAndLoadingClosed = !0),
							(o.LoadingPhase = 1),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.WorldDoneAndCloseLoading,
							),
							o.ResetPromise(),
							ModelManager_1.ModelManager.GameModeModel.LoadWorldProfiler.Stop(),
							this.m6("GameModeController.Load: End"),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("GameMode", 3, "加载场景:加载完成"),
							this.PrintLoadDetail();
						let r = "Unknown";
						(a = ModelManager_1.ModelManager.KuroSdkModel.GetBasicInfo()) &&
							(r = a.ModelName),
							(a = {
								...new LogReportDefine_1.PlayerCommonLogData(),
								event_id: "3",
								i_inst_id:
									ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id.toString(),
								i_cost_time:
									ModelManager_1.ModelManager.GameModeModel.LoadWorldProfiler.Time.toString(),
								s_device_type: r,
							}),
							LogReportController_1.LogReportController.LogReport(a);
					}
					return !0;
				})),
					TaskSystem_1.TaskSystem.AddTask(a),
					await TaskSystem_1.TaskSystem.Run();
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("GameMode", 3, "加载场景:出生点旋转无效");
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("GameMode", 3, "加载场景:出生点坐标无效");
	}
	static m6(e) {}
	static async Change(e) {
		var o = e.w6n;
		const a = ModelManager_1.ModelManager.GameModeModel;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"GameMode",
				3,
				"改变场景模式:开始",
				["SceneMode", o],
				["副本Id", a.InstanceDungeon.Id],
				["地图", a.MapConfig.MapId],
				["MapPath", a.MapConfig.MapPath],
			),
			(a.ChangeModeState = !0),
			(a.IsMulti = o === Protocol_1.Aki.Protocol.oOs.Proto_Multi),
			ModelManager_1.ModelManager.CreatureModel.SetSceneId(e.W7n),
			this.ChangeGameMode(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeMode),
			a.CreateChangeModePromise(),
			(o = new AsyncTask_1.AsyncTask("GameModeController.Change", async () => {
				var e = new LogProfiler_1.LogProfiler("改变场景模式"),
					o = e.CreateChild("打开Loading界面"),
					r = e.CreateChild("关闭Loading界面");
				e.Start(),
					LoadingController_1.LoadingController.SetProgress(0, void 0, 1, !0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("GameMode", 3, "改变场景模式:打开Loading界面(开始)"),
					o.Restart(),
					await LoadingController_1.LoadingController.GameModeOpenLoading(),
					o.Stop(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("GameMode", 3, "改变场景模式:打开Loading界面(完成)"),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"GameMode",
							3,
							"改变场景模式:打开ChangeSceneModeEndNotify协议(开始)",
						),
					await a.ChangeSceneModeEndNotifyPromise.Promise,
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"GameMode",
							3,
							"改变场景模式:打开ChangeSceneModeEndNotify协议(完成)",
						),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"GameMode",
							3,
							"改变场景模式:请求服务器SceneModeChangeFinishRequest(开始)",
						),
					(o = Protocol_1.Aki.Protocol.nms.create());
				return (o = await Net_1.Net.CallAsync(8583, o)) &&
					o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							o.lkn,
							22338,
						),
						!1)
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"改变场景模式:请求服务器SceneModeChangeFinishRequest(完成)",
							),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"改变场景模式:关闭Loading界面(开始)",
							),
						r.Start(),
						await LoadingController_1.LoadingController.GameModeCloseLoading(),
						r.Stop(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"改变场景模式:关闭Loading界面(完成)",
							),
						a.ResetChangeModePromise(),
						(a.ChangeModeState = !1),
						e.Stop(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ChangeModeFinish,
						),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "改变场景模式:完成"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"World",
								3,
								"改变场景模式",
								["MapPath", ModelManager_1.ModelManager.GameModeModel.MapPath],
								["耗时", e.ToString()],
							),
						!0);
			})),
			TaskSystem_1.TaskSystem.AddTask(o),
			await TaskSystem_1.TaskSystem.Run();
	}
	static async PreloadSubLevel(e) {
		var o = ModelManager_1.ModelManager.GameModeModel;
		if (!o.WorldDone)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GameMode",
						30,
						"预加载子关卡:WorldDone为false,预加载子关卡失败",
					),
				!1
			);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("GameMode", 30, "预加载子关卡:(开始)", [
				"加载的子关卡",
				e?.join(),
			]);
		var a = new Array();
		for (const r of e)
			o.SubLevelMap.has(r) || o.PreloadLevelMap.has(r) || a.push(r);
		return (
			a?.length && (await GameModeController.Hxn(a, !1)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("GameMode", 30, "预加载子关卡:(完成)"),
			!0
		);
	}
	static ChangeSubLevel(e, o, a, r, t, n) {
		this.U0r(e, o, a, r, t, n);
	}
	static f5s(e) {
		e && this.g5s?.Push(e);
	}
	static p5s() {
		if (this.g5s && !(this.g5s.Size <= 0))
			for (; 0 < this.g5s.Size; ) {
				var e = this.g5s.Front;
				e
					? (this.g5s.Pop(),
						this.ChangeSubLevel(
							e.UnloadLevels,
							e.Levels,
							e.ScreenEffect,
							e.Location,
							e.Rotator,
							e.Callback,
						))
					: this.g5s.Pop();
			}
	}
	static async U0r(e, o, a, r, t, n) {
		var l = ModelManager_1.ModelManager.GameModeModel,
			d = ModelManager_1.ModelManager.SubLevelLoadingModel;
		if (l.WorldDone)
			if (d.LoadSubLeveling)
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GameMode",
						3,
						"当前正在加载子关卡，等所有子关卡加载完成才能继续加载新的子关卡。",
					),
					this.f5s(new SubLevelInfo(e, o, a, r, t, n));
			else {
				if (
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"GameMode",
							3,
							"切换子关卡:(开始)",
							["卸载的子关卡", e?.join()],
							["加载的子关卡", o?.join()],
							["位置", r],
							["旋转", t],
						),
					(d.LoadSubLeveling = !0),
					0 !==
						(ModelManager_1.ModelManager.SubLevelLoadingModel.ScreenEffect =
							a) &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"切换子关卡:打开黑幕Loading界面(开始)",
							),
						await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
							15,
							3,
						),
						Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info(
							"GameMode",
							3,
							"切换子关卡:打开黑幕Loading界面(完成)",
						),
					ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
						GlobalData_1.GlobalData.World,
						"GameModeController.ChangeSubLevelInternal",
					),
					r &&
						Global_1.Global.BaseCharacter.CharacterMovement.SetMovementMode(0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"GameMode",
							30,
							"切换子关卡:等待之前的子关卡列表卸载(开始)",
						),
					await this.jxn(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"GameMode",
							30,
							"切换子关卡:等待之前的子关卡列表卸载(结束)",
						),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"GameMode",
							30,
							"切换子关卡:等待之前的子关卡列表加载(开始)",
						),
					await this.Wxn(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"GameMode",
							30,
							"切换子关卡:等待之前的子关卡列表加载(结束)",
						),
					e?.length)
				) {
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("GameMode", 3, "切换子关卡:卸载子关卡列表(开始)");
					for (const o of e) l.RemoveSubLevel(o);
					await this.jxn(),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "切换子关卡:卸载子关卡列表(完成)");
				}
				o?.length &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("GameMode", 3, "切换子关卡:加载子关卡列表(开始)"),
					await this.R0r(o),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info("GameMode", 3, "切换子关卡:加载子关卡列表(完成)"),
					GameModeController.A0r(r, t),
					ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
						GlobalData_1.GlobalData.World,
						"GameModeController.ChangeSubLevelInternal",
					),
					0 !== a &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								3,
								"切换子关卡:关闭黑幕Loading界面(开始)",
							),
						await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
							15,
							1,
						),
						Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info(
							"GameMode",
							3,
							"切换子关卡:关闭黑幕Loading界面(完成)",
						),
					(d.LoadSubLeveling = !1),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("GameMode", 3, "切换子关卡:(完成)"),
					n?.(!0),
					this.p5s();
			}
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"GameMode",
					3,
					"切换子关卡:WorldDone为false,切换子关卡失败。",
				),
				n?.(!1);
	}
	static async Wxn() {
		var e = ModelManager_1.ModelManager.GameModeModel;
		if (e.SubLevelMap.size) {
			var o,
				a,
				r = new Array();
			for ([, o] of e.PreloadLevelMap)
				1 === o.LoadType && r.push(o.LoadPromise.Promise);
			for ([, a] of e.SubLevelMap)
				1 === a.LoadType && r.push(a.LoadPromise.Promise);
			r.length && (await Promise.all(r));
		}
		return !0;
	}
	static async jxn() {
		var e = ModelManager_1.ModelManager.GameModeModel;
		if (e.UnloadLevelMap.size) {
			var o,
				a = new Array();
			for ([, o] of e.UnloadLevelMap) a.push(o.UnLoadPromise.Promise);
			a.length && (await Promise.all(a));
		}
		return !0;
	}
	static A0r(e, o) {
		e &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"GameMode",
					3,
					"切换子关卡:设置玩家位置、地面修正(开始)",
					["Location", e],
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.TeleportStart,
				!0,
			),
			EventSystem_1.EventSystem.EmitWithTarget(
				Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
				EventDefine_1.EEventName.TeleportStartEntity,
			),
			this.D0r(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.TeleportComplete,
				0,
			),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("GameMode", 3, "切换子关卡:设置玩家位置、地面修正(结束)", [
				"修正后的Location",
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.ActorLocationProxy,
			]),
			o &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("GameMode", 3, "切换子关卡:设置玩家旋转(开始)", [
						"Rotator",
						o,
					]),
				Global_1.Global.BaseCharacter.CharacterActorComponent.SetInputRotator(
					o,
				),
				Global_1.Global.BaseCharacter.CharacterActorComponent.SetActorRotation(
					WorldGlobal_1.WorldGlobal.ToUeRotator(o),
					"切换子关卡:设置玩家旋转",
					!1,
				),
				CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
					CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
				),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("GameMode", 3, "切换子关卡:设置玩家旋转(结束)", [
					"Rotator",
					Global_1.Global.BaseCharacter.CharacterActorComponent
						.ActorRotationProxy,
				]);
	}
	static SwitchDataLayer(e, o, a, r, t) {
		this.P0r(e, o, a, r, t);
	}
	static async P0r(e, o, a, r, t) {
		var n = ModelManager_1.ModelManager.GameModeModel;
		if (n.DataLayerSwitching)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("GameMode", 30, "当前正在切换DataLayer"),
				t?.(!1);
		else {
			if (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"GameMode",
						30,
						"切换DataLayer:(开始)",
						["卸载的DataLayer", e?.join()],
						["加载的DataLayer", o?.join()],
						["位置", a],
						["旋转", r],
					),
				(n.DataLayerSwitching = !0),
				ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
					"SwitchDataLayerInternal",
				),
				ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
					GlobalData_1.GlobalData.World,
					"SwitchDataLayerInternal",
				),
				e?.length)
			) {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("GameMode", 30, "切换DataLayer:卸载DataLayer(开始)");
				for (const o of e) GameModeController.x0r(o);
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("GameMode", 30, "切换DataLayer:卸载DataLayer(完成)");
			}
			if (o?.length) {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("GameMode", 30, "切换DataLayer:加载DataLayer(开始)");
				for (const e of o) GameModeController.w0r(e);
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("GameMode", 30, "切换DataLayer:加载DataLayer(完成)");
			}
			let l = a;
			l ||
				ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode() ||
				((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity),
				(l = e?.Entity?.GetComponent(3)?.ActorLocationProxy.ToUeVector())),
				l &&
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("GameMode", 30, "切换DataLayer:检测场景流送(开始)"),
					n.CheckStreamingSourceProfiler.Restart(),
					this.m6("GameModeController.SwitchDataLayer:CheckStreaming Start"),
					await this.B0r(l),
					this.m6("GameModeController.SwitchDataLayer:CheckStreaming End"),
					n.CheckStreamingSourceProfiler.Stop(),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info("GameMode", 30, "切换DataLayer:检测场景流送(完成)"),
				ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
					GlobalData_1.GlobalData.World,
					"SwitchDataLayerInternal",
				),
				ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
					"SwitchDataLayerInternal",
				),
				ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
					Protocol_1.Aki.Protocol.jBs.Proto_Normal,
				),
				GameModeController.b0r(a ? Vector_1.Vector.Create(a) : void 0, r),
				a &&
					(this.AddOrRemoveRenderAssetsQueryViewInfo(
						a,
						ResourceSystem_1.WAIT_RENDER_ASSET_DURATION,
					),
					await this.CheckRenderAssetsStreamingCompleted(a, "切换DataLayer:")),
				(n.DataLayerSwitching = !1),
				GameModeController.q0r(),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("GameMode", 30, "切换DataLayer:(完成)"),
				t?.(!0);
		}
	}
	static b0r(e, o) {
		e &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"GameMode",
					30,
					"切换DataLayer:设置玩家位置、地面修正(开始)",
					["Location", e],
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.TeleportStart,
				!0,
			),
			this.D0r(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.TeleportComplete,
				0,
			),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"GameMode",
				30,
				"切换DataLayer:设置玩家位置、地面修正(结束)",
				[
					"修正后的Location",
					Global_1.Global.BaseCharacter.CharacterActorComponent
						.ActorLocationProxy,
				],
			),
			o &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("GameMode", 30, "切换DataLayer:设置玩家旋转(开始)", [
						"Rotator",
						o,
					]),
				Global_1.Global.BaseCharacter.CharacterActorComponent.SetInputRotator(
					o,
				),
				Global_1.Global.BaseCharacter.CharacterActorComponent.SetActorRotation(
					WorldGlobal_1.WorldGlobal.ToUeRotator(o),
					"切换DataLayer:设置玩家旋转",
					!1,
				),
				CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
					CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
				),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info("GameMode", 30, "切换DataLayer:设置玩家旋转(结束)", [
					"Rotator",
					Global_1.Global.BaseCharacter.CharacterActorComponent
						.ActorRotationProxy,
				]);
	}
	static IsInInstance() {
		return (
			ModelManager_1.ModelManager.GameModeModel.InstanceType >=
			Protocol_1.Aki.Protocol.sOs.Proto_NormalInstance
		);
	}
	static CanLoadEntity() {
		var e = ModelManager_1.ModelManager.GameModeModel;
		return e.WorldDone && !e.IsTeleport && !e.ChangeModeState;
	}
	static BeforeLoadMap() {
		ModelManager_1.ModelManager.GameModeModel.BeginLoadMapPromise.SetResult(!0);
	}
	static InitAllPlayerStarts() {
		var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
			o =
				(UE.GameplayStatics.GetAllActorsOfClass(
					GlobalData_1.GlobalData.World,
					UE.PlayerStart.StaticClass(),
					e,
				),
				ModelManager_1.ModelManager.GameModeModel.ClearPlayerStart(),
				(0, puerts_1.$unref)(e));
		if (0 < o.Num())
			for (let e = 0; e < o.Num(); ++e)
				ModelManager_1.ModelManager.GameModeModel.AddPlayerStart(o.Get(e));
	}
	static AfterLoadMap() {
		GameModeController.InitAllPlayerStarts(),
			ModelManager_1.ModelManager.GameModeModel.OpenLevelPromise.SetResult(!0);
	}
	static OnLoadSubLevel(e, o, a) {
		var r,
			t = ModelManager_1.ModelManager.GameModeModel;
		let n;
		for ([, r] of t.PreloadLevelMap)
			if (r.LinkId === e) {
				n = r;
				break;
			}
		if (!n)
			for (var [, l] of t.SubLevelMap)
				if (l.LinkId === e) {
					n = l;
					break;
				}
		n
			? ((n.LoadType = 2),
				(n.Level = a),
				n.LoadPromise.SetResult(!0),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"GameMode",
						30,
						"切换子关卡:子关卡加载完成",
						["Level", o],
						["IsPreload", n.IsPreload],
						["LevelStreaming", a?.IsValid()],
					))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"GameMode",
					3,
					"切换子关卡:加载的子关卡不存在",
					["LinkId", e],
					["Level", o],
					["LevelStreaming", a?.IsValid()],
				);
	}
	static OnUnLoadSubLevel(e, o) {
		var a,
			r,
			t = ModelManager_1.ModelManager.GameModeModel;
		let n;
		for ([a, r] of t.UnloadLevelMap)
			if (a === e) {
				n = r;
				break;
			}
		n
			? (t.UnloadLevelMap.delete(e),
				n.UnLoadPromise.SetResult(!0),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"GameMode",
						3,
						"切换子关卡:子关卡卸载完成",
						["Level", o],
						["LinkId", e],
						["LoadLinkId", n.LinkId],
					))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"GameMode",
					3,
					"切换子关卡:卸载的子关卡不存在",
					["LinkId", e],
					["Level", o],
				);
	}
	static OnTick(e) {
		var o, a;
		ModelManager_1.ModelManager.GameModeModel.IsMulti ||
		ModelManager_1.ModelManager.CombatMessageModel.AnyEntityInFight
			? Heartbeat_1.Heartbeat.SetHeartBeatMode(1)
			: Heartbeat_1.Heartbeat.SetHeartBeatMode(0),
			ModelManager_1.ModelManager.GameModeModel.UseWorldPartition &&
				ModelManager_1.ModelManager.GameModeModel.WorldDone &&
				!ModelManager_1.ModelManager.GameModeModel.IsTeleport &&
				Global_1.Global.BaseCharacter?.IsValid() &&
				(a =
					ModelManager_1.ModelManager.GameModeModel
						.StreamingSource)?.IsValid() &&
				((o = Global_1.Global.BaseCharacter.GetTransform()),
				a.K2_SetActorTransform(o, !0, void 0, !1),
				ModelManager_1.ModelManager.GameModeModel.UpdateBornLocation(
					o.GetLocation(),
				),
				(a =
					ModelManager_1.ModelManager.GameModeModel
						.VoxelStreamingSource)?.IsValid()) &&
				a.K2_SetActorTransform(o, !0, void 0, !1);
	}
	static PrintLoadDetail() {
		var e = ModelManager_1.ModelManager.GameModeModel.LoadWorldProfiler,
			o =
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"加载详情",
						["MapPath", ModelManager_1.ModelManager.GameModeModel.MapPath],
						["耗时", e.ToString()],
					),
				ModelManager_1.ModelManager.PreloadModel.ResourcesLoadTime);
		if (
			(o.sort((e, o) => o[1] - e[1]),
			ModelManager_1.ModelManager.PreloadModel.LoadAssetOneByOneState)
		) {
			for (let e = 0; e < 20 && !(e >= o.length); ++e) {
				var a = o[e];
				let t = "";
				var r = a[1];
				(t = r < 1e3 ? r + " ms" : r / 1e3 + " s"),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"World",
							3,
							"资源耗时Top20",
							["耗时", t],
							["资源路径", a[0]],
						);
			}
			ModelManager_1.ModelManager.PreloadModel.ClearResourcesLoadTime();
		}
	}
	static SetGamePaused(e, o, a = Time_1.Time.OriginTimeDilation) {
		Time_1.Time.OriginTimeDilation = a;
		var r = ModelManager_1.ModelManager.GameModeModel.GamePausedReasons;
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"GameMode",
					55,
					"时停:调用真时停",
					["bPaused", e],
					["reason", o],
					["unPausedTimeDilation", a],
				),
			ModelManager_1.ModelManager.GameModeModel.ForceDisableGamePaused)
		) {
			if (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("GameMode", 55, "时停:缓存真时停:由于强制设置时停"),
				!e)
			)
				return r.has(o) && r.delete(o), !1;
			r.has(o) || r.add(o);
		}
		return e
			? r.has(o)
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("GameMode", 55, "时停:已存在该时停"),
					!0)
				: (r.add(o),
					(TickSystem_1.TickSystem.IsPaused = !0),
					GameModeController.SetTimeDilation(0, !0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("GameMode", 55, "时停:执行真时停"),
					UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, !0))
			: (r.has(o) && r.delete(o),
				0 !== r.size ||
					((TickSystem_1.TickSystem.IsPaused = !1),
					GameModeController.SetTimeDilation(a, !0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("GameMode", 55, "时停:解除真时停"),
					UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, !1)));
	}
	static ForceDisableGamePaused(e) {
		return e
			? ((ModelManager_1.ModelManager.GameModeModel.ForceDisableGamePaused =
					!0),
				(TickSystem_1.TickSystem.IsPaused = !1),
				GameModeController.SetTimeDilation(Time_1.Time.OriginTimeDilation, !0),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("GameMode", 55, "时停:强制解除真时停"),
				UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, !1))
			: ((ModelManager_1.ModelManager.GameModeModel.ForceDisableGamePaused =
					!1),
				0 < ModelManager_1.ModelManager.GameModeModel.GamePausedReasons.size
					? ((TickSystem_1.TickSystem.IsPaused = !0),
						GameModeController.SetTimeDilation(0, !0),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								55,
								"时停:恢复强制解除, Set中存在reason, 执行真时停",
							),
						UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, !0))
					: (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"GameMode",
								55,
								"时停:恢复强制解除, Set中不存在reason, 不执行真时停",
							),
						!0));
	}
	static SetTimeDilation(e, o = !1) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"GameMode",
				55,
				"时停:调用假时停",
				["timeDilation", e],
				["bCallByGamePaused", o],
			);
		var a = e < MathUtils_1.MathUtils.KindaSmallNumber ? 0 : e;
		((o =
			(o || (Time_1.Time.OriginTimeDilation = a),
			Time_1.Time.SetTimeDilation(a),
			TimeOfDayController_1.TimeOfDayController.ChangeTimeScale(a),
			CharacterController_1.CharacterController.SetTimeDilation(a),
			FormationDataController_1.FormationDataController.SetTimeDilation(a),
			BulletController_1.BulletController.SetTimeDilation(a),
			CameraController_1.CameraController.SetTimeDilation(a),
			ComponentForceTickController_1.ComponentForceTickController.SetTimeDilation(
				a,
			),
			(EffectEnvironment_1.EffectEnvironment.GlobalTimeScale = a),
			Protocol_1.Aki.Protocol.Bus.create())).L7n = e),
			Net_1.Net.Send(4768, o),
			0 === e &&
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PauseGame, 1),
			1 === e &&
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PauseGame, 0),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.TriggerUiTimeDilation,
			);
	}
	static D0r(e = void 0) {
		var o;
		Global_1.Global.BaseCharacter &&
			(e
				? Global_1.Global.BaseCharacter.CharacterActorComponent.TeleportAndFindStandLocation(
						e,
					)
				: Global_1.Global.BaseCharacter.CharacterActorComponent.FixBornLocation(
						"主控玩家.修正地面",
						!0,
					),
			Global_1.Global.BaseCharacter.CharacterMovement.SetMovementMode(1),
			(o = (e =
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.Entity).GetComponent(160)) &&
				o.MainAnimInstance?.SyncAnimStates(void 0),
			e.GetComponent(161)?.StopAllAddMove(),
			e.GetComponent(158)?.ResetCharState());
	}
	static async T0r(e) {
		var o = ModelManager_1.ModelManager.GameModeModel;
		let a;
		return (
			!(a = e.nys?.length ? e.nys : o.InstanceDungeon.SubLevels) ||
			!a.length ||
			this.R0r(a)
		);
	}
	static async Hxn(e, o = !0) {
		var a = ModelManager_1.ModelManager.GameModeModel;
		if ("string" == typeof e) {
			var r = a.AddPreloadSubLevel(e);
			if (!r) return !1;
			(r.IsPreload = !0), (r.LoadType = 1);
			var t = FNameUtil_1.FNameUtil.GetDynamicFName(r.Path);
			t = GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(
				t,
				o,
				!1,
			);
			return (
				(r.LinkId = t),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"切换子关卡:加载子关卡(预加载)",
						["Path", r.Path],
						["LinkId", t],
					),
				r.LoadPromise.Promise
			);
		}
		var n = new Array();
		for (const r of e) {
			var l,
				d = a.AddPreloadSubLevel(r);
			d &&
				((d.IsPreload = !0),
				(d.LoadType = 1),
				n.push(d.LoadPromise.Promise),
				(l =
					GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(
						FNameUtil_1.FNameUtil.GetDynamicFName(r),
						o,
						!1,
					)),
				(d.LinkId = l),
				Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"World",
					3,
					"切换子关卡:加载子关卡(预加载)",
					["Path", d.Path],
					["LinkId", l],
				);
		}
		return await Promise.all(n), !0;
	}
	static async R0r(e, o = !0) {
		var a = ModelManager_1.ModelManager.GameModeModel;
		if ("string" == typeof e) {
			var r,
				t = e;
			let n = a.GetPreloadSubLevel(t);
			return (
				n
					? (a.RemovePreloadSubLevel(t),
						a.AddSubLevelInstance(n),
						2 === n.LoadType && n.Level.SetShouldBeVisible(o))
					: (n = a.AddSubLevel(t)),
				!!n &&
					(0 === n.LoadType &&
						((r = FNameUtil_1.FNameUtil.GetDynamicFName(n.Path)),
						(r =
							GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(
								r,
								o,
								!1,
							)),
						Log_1.Log.CheckInfo()) &&
						Log_1.Log.Info(
							"World",
							3,
							"切换子关卡:加载子关卡",
							["Path", t],
							["LinkId", r],
						),
					n.LoadPromise.Promise)
			);
		}
		let n = !1;
		var l,
			d = new Array();
		for (const r of e) {
			let e = a.GetPreloadSubLevel(r);
			e
				? (a.RemovePreloadSubLevel(r),
					a.AddSubLevelInstance(e),
					2 === e.LoadType && (e.Level.SetShouldBeVisible(o), (n = !0)))
				: (e = a.AddSubLevel(r)),
				e &&
					(d.push(e.LoadPromise.Promise), 0 === e.LoadType) &&
					((l =
						GlobalData_1.GlobalData.GameInstance.场景加载通知器.LoadStreamLevel(
							FNameUtil_1.FNameUtil.GetDynamicFName(r),
							o,
							!1,
						)),
					(e.LinkId = l),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info(
						"World",
						3,
						"切换子关卡:加载子关卡",
						["Path", r],
						["LinkId", l],
					);
		}
		if ((await Promise.all(d), n)) {
			const e = new GameModePromise_1.GameModePromise();
			TimerSystem_1.TimerSystem.Next(() => {
				e.SetResult(!0);
			}),
				await e.Promise;
		}
		return !0;
	}
	static I0r(e) {
		if (e?.hys)
			for (const a of e.hys) {
				var o = DataLayerById_1.configDataLayerById.GetConfig(a);
				o
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("GameMode", 3, "加载场景:加载DataLayer", [
								"DataLayer",
								o.DataLayer,
							]),
						GameModeController.w0r(o.DataLayer))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GameMode",
							3,
							"加载场景:加载DataLayer失败,不存在的配置Id",
							["DataLayerId:", a],
						);
			}
	}
	static w0r(e) {
		ModelManager_1.ModelManager.GameModeModel.AddDataLayer(e),
			RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(
				e,
				!0,
			);
	}
	static x0r(e) {
		ModelManager_1.ModelManager.GameModeModel.RemoveDataLayer(e),
			RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(
				e,
				!1,
			);
	}
	static q0r() {
		var e = Protocol_1.Aki.Protocol.a_s.create();
		(e.vFn = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id),
			Net_1.Net.Call(28313, e, (e) => {
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
					ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						11481,
					);
			});
	}
	static E0r(e) {
		ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.clear();
		for (const a of Object.keys(e.lys)) {
			var o = e.lys[a];
			(o = AreaMpcById_1.configAreaMpcById.GetConfig(o).MpcData) &&
			"None" !== o &&
			"Empty" !== o
				? ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.set(
						o,
						!1,
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GameMode",
						30,
						"加载场景: 未配置对应区域的MPCData",
						["AreaId", a],
						["MpcData", o],
					);
		}
		if (
			0 ===
			ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap
				.size
		)
			ModelManager_1.ModelManager.GameModeModel.ApplyMaterialParameterCollectionPromise.SetResult(
				!0,
			);
		else
			for (const e of ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.keys())
				ResourceSystem_1.ResourceSystem.LoadAsync(
					e,
					UE.ItemMaterialControllerMPCData_C,
					(o) => {
						o?.IsValid()
							? ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(
									o,
								)
							: Log_1.Log.CheckError() &&
								Log_1.Log.Error("GameMode", 30, "加载场景: MPCData无效"),
							ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.set(
								e,
								!0,
							),
							GameModeController.G0r();
					},
				);
	}
	static G0r() {
		let e = !0;
		for (const o of ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.values())
			e = o && e;
		e &&
			ModelManager_1.ModelManager.GameModeModel.ApplyMaterialParameterCollectionPromise.SetResult(
				!0,
			);
	}
	static async B0r(e) {
		var o, a;
		e &&
			((o = ModelManager_1.ModelManager.GameModeModel),
			TimerSystem_1.TimerSystem.Has(o.CheckStreamingCompletedTimerId)
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GameMode",
						30,
						"[CheckWorldPartitionStreamingCompleted] 重复检查场景流送",
						["地图Id", o.MapConfig.MapId],
						["副本Id", o.InstanceDungeon.Id],
					)
				: o.UseWorldPartition &&
					(ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource.K2_SetActorLocation(
						e,
						!1,
						void 0,
						!1,
					),
					ModelManager_1.ModelManager.GameModeModel.StreamingSource.K2_SetActorLocation(
						e,
						!1,
						void 0,
						!1,
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"World",
							30,
							"[CheckWorldPartitionStreamingCompleted] 检查场景流送",
							["Location", e],
						),
					(a = new CustomPromise_1.CustomPromise()),
					(o.CheckStreamingCompletedTimerId = this.N6s(e, a)),
					await a.Promise,
					(o.CheckStreamingCompletedTimerId = void 0)));
	}
	static N6s(e, o, a, r, t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"World",
				61,
				"[CheckTargetStreamingCompleted] 检测参数",
				["dataLayers", null != a && 0 < a.Num() ? a.Get(0).toString() : void 0],
				[
					"targetGrids",
					null != r && 0 < r.Num() ? r.Get(0).toString() : void 0,
				],
			),
			(e = new UE.WorldPartitionStreamingQuerySource(
				e,
				ResourceSystem_1.STREAMING_SOURCE_RADIUS,
				!1,
				null != a && 0 < a.Num(),
				a,
				!1,
				!0,
				r,
			));
		const n = UE.NewArray(UE.WorldPartitionStreamingQuerySource),
			l =
				(n.Add(e),
				UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
					GlobalData_1.GlobalData.World,
					UE.WorldPartitionSubsystem.StaticClass(),
				)),
			d = TimerSystem_1.TimerSystem.Forever(() => {
				var e,
					a = l.IsStreamingCompleted(2, n, !0, cellNum, matchCellNum, !0);
				t &&
					((e =
						(0, puerts_1.$unref)(matchCellNum) /
						Math.max((0, puerts_1.$unref)(cellNum), 1)),
					t(e)),
					a && (TimerSystem_1.TimerSystem.Remove(d), o.SetResult(!0));
			}, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
		return d;
	}
	static async V6s(e, o) {
		var a,
			r,
			t,
			n = ModelManager_1.ModelManager.GameModeModel;
		GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
			.bEnableWorldPartition
			? ((n.UseWorldPartition = !0),
				(a = n.BornLocation)
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"World",
								3,
								"[SoloGameMode.CheckVoxelStreamingCompleted] 玩家出生点。",
								["Location", a],
							),
						n.InitStreamingSources(),
						ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource.GetComponentByClass(
							UE.WorldPartitionStreamingSourceComponent.StaticClass(),
						).EnableStreamingSource(),
						(r = UE.NewSet(UE.BuiltinName)).Add(WorldDefine_1.VOXEL_GRID_NAME),
						(t = n.VoxelStreamingCompleted),
						(n.CheckStreamingCompletedTimerId = this.N6s(
							a,
							t,
							void 0,
							r,
							(a) => {
								LoadingController_1.LoadingController.AddProgress(
									Math.min(a * e, e),
									o,
								);
							},
						)),
						await t.Promise,
						(n.CheckStreamingCompletedTimerId = void 0))
					: Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GameMode",
							3,
							"[SoloGameMode.CheckVoxelStreamingCompleted] 无法找到出生点。",
							["地图Id", n.MapConfig.MapId],
							["副本Id", n.InstanceDungeon.Id],
						))
			: ((n.UseWorldPartition = !1),
				n.VoxelStreamingCompleted.SetResult(!0),
				LoadingController_1.LoadingController.AddProgress(e, o));
	}
	static async Kyo(e, o) {
		cpp_1.FKuroGameBudgetAllocatorInterface.SetGlobalCavernMode(1);
		var a = ModelManager_1.ModelManager.GameModeModel,
			r = ModelManager_1.ModelManager.WorldModel;
		if ((r && r.CurEnvironmentInfo?.ResetInfo(), a.UseWorldPartition))
			if ((r = a.BornLocation)) {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						7,
						"[SoloGameMode.CheckStreamingCompleted] 玩家出生点。",
						["Location", r],
					),
					ModelManager_1.ModelManager.GameModeModel.StreamingSource.GetComponentByClass(
						UE.WorldPartitionStreamingSourceComponent.StaticClass(),
					).EnableStreamingSource();
				var t = UE.NewArray(UE.BuiltinName);
				let d =
					ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
						r,
						!0,
						!0,
					);
				if (d) {
					var n = (0, puerts_1.$ref)(void 0);
					UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
						GlobalData_1.GlobalData.World,
						d,
						n,
					),
						t.Add((0, puerts_1.$unref)(n));
				} else {
					let e = !0;
					if (
						(Info_1.Info.IsPlayInEditor &&
							(e = UE.KuroEditorUtilityLibrary.GetGConfigEditorSettings(
								"/Script/KuroEditorUtility.KuroEditorUtilitySetting",
								"WaitHLODResInLoading",
							)),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("World", 42, "Wait HLOD data layers in loaidng", [
								"DoWaitHLODDataLayers",
								e,
							]),
						e)
					)
						for (const e of WorldDefine_1.dataLayerRuntimeHLOD) {
							var l = (0, puerts_1.$ref)(void 0);
							(d = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
								UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
									GlobalData_1.GlobalData.World,
									d,
									l,
								),
								t.Add((0, puerts_1.$unref)(l));
						}
				}
				(n = a.StreamingCompleted),
					(a.CheckStreamingCompletedTimerId = this.N6s(r, n, t, void 0, (a) => {
						LoadingController_1.LoadingController.AddProgress(
							Math.min(a * e, e),
							o,
						);
					})),
					await n.Promise,
					(a.CheckStreamingCompletedTimerId = void 0);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GameMode",
						3,
						"[SoloGameMode.CheckStreamingCompleted] 无法找到出生点。",
						["地图Id", a.MapConfig.MapId],
						["副本Id", a.InstanceDungeon.Id],
					);
		else
			LoadingController_1.LoadingController.AddProgress(e, o),
				a.StreamingCompleted.SetResult(!0);
	}
	static AddOrRemoveRenderAssetsQueryViewInfo(e, o) {
		var a;
		GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
			.bEnableWorldPartition &&
			(e
				? (a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
						GlobalData_1.GlobalData.World,
						UE.WorldPartitionSubsystem.StaticClass(),
					))?.IsValid() && a.AddOrRemoveRenderAssetsQueryViewInfo(e, o)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("World", 3, "viewOrigin参数无效", ["坐标", e]));
	}
	static NVs(e, o, a) {
		var r = ModelManager_1.ModelManager.GameModeModel;
		r.CheckRenderAssetsStreamingCompletedTimerId?.Valid() &&
			(TimerSystem_1.TimerSystem.Remove(
				r.CheckRenderAssetsStreamingCompletedTimerId,
			),
			(r.CheckRenderAssetsStreamingCompletedTimerId = void 0),
			(e =
				e ||
				UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
					GlobalData_1.GlobalData.World,
					UE.WorldPartitionSubsystem.StaticClass(),
				)),
			(o = o || new UE.WorldPartitionStreamingQuerySource()),
			e.IsRenderAssetsStreamingCompleted(o, !1, !1, !0),
			a) &&
			Log_1.Log.CheckError() &&
			Log_1.Log.Error("World", 61, "检查渲染资源(异常结束)", ["是否超时:", !1]);
	}
	static async CheckRenderAssetsStreamingCompleted(e, o) {
		const a = ModelManager_1.ModelManager.GameModeModel;
		if (
			!GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
				.bEnableWorldPartition
		)
			return (a.RenderAssetDone = !0);
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"World",
						3,
						"viewOrigin参数无效",
						["Reason", o],
						["坐标", e],
					),
				!1
			);
		const r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
				GlobalData_1.GlobalData.World,
				UE.WorldPartitionSubsystem.StaticClass(),
			),
			t =
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"检查渲染资源(开始)",
						["Reason", o],
						["坐标", e],
					),
				new UE.WorldPartitionStreamingQuerySource(
					e,
					ResourceSystem_1.RENDER_ASSETS_RADIUS,
					!1,
					!1,
					void 0,
					!1,
					!0,
					void 0,
				)),
			n =
				(this.NVs(r, t, !0),
				a.CheckRenderAssetsTimeoutId?.Valid() &&
					(TimerSystem_1.TimerSystem.Remove(a.CheckRenderAssetsTimeoutId),
					(a.CheckRenderAssetsTimeoutId = void 0)),
				new GameModePromise_1.GameModePromise());
		let l = !1;
		return (
			!GlobalData_1.GlobalData.IsPlayInEditor &&
				Info_1.Info.IsPc() &&
				(a.CheckRenderAssetsTimeoutId = TimerSystem_1.TimerSystem.Delay(() => {
					a.RenderAssetDone ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"World",
								3,
								"检查渲染资源(完成)",
								["Reason", o],
								["是否超时:", !0],
								["坐标", e],
								[
									"画质",
									GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
										.GetCurrentQualityInfo()
										.GetGameQualitySettingLevel(),
								],
								[
									"相机位置",
									CameraController_1.CameraController.CameraLocation.ToString(),
								],
								[
									"相机旋转",
									CameraController_1.CameraController.CameraRotator.ToString(),
								],
							),
						this.NVs(r, t),
						(a.RenderAssetDone = !0),
						n.SetResult(!0),
						this.AddOrRemoveRenderAssetsQueryViewInfo(e, 0));
				}, ResourceSystem_1.RENDER_ASSETS_TIMEOUT)),
			(a.CheckRenderAssetsStreamingCompletedTimerId =
				TimerSystem_1.TimerSystem.Forever(() => {
					var d;
					a.RenderAssetDone ||
						((d = r.IsRenderAssetsStreamingCompleted(t, l, !1, !1)),
						(l = !0),
						d &&
							(Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"World",
									3,
									"检查渲染资源(完成)",
									["Reason", o],
									["是否超时:", !1],
								),
							a.CheckRenderAssetsTimeoutId?.Valid() &&
								(TimerSystem_1.TimerSystem.Remove(a.CheckRenderAssetsTimeoutId),
								(a.CheckRenderAssetsTimeoutId = void 0)),
							TimerSystem_1.TimerSystem.Remove(
								a.CheckRenderAssetsStreamingCompletedTimerId,
							),
							(a.CheckRenderAssetsStreamingCompletedTimerId = void 0),
							(a.RenderAssetDone = !0),
							n.SetResult(!0),
							this.AddOrRemoveRenderAssetsQueryViewInfo(e, 0)));
				}, ResourceSystem_1.CHECK_RENDERASSETS_INTERVAL)),
			n.Promise
		);
	}
	static y0r(e, o) {
		PreloadDefine_1.PreloadSetting.UseNewPreload
			? PreloadControllerNew_1.PreloadControllerNew.DoPreload((o) => {
					e?.(o);
				}).then((e) => {
					ModelManager_1.ModelManager.GameModeModel.PreloadPromise.SetResult(e),
						o?.(e);
				})
			: PreloadController_1.PreloadController.DoPreload(
					(o) => {
						e?.(o);
					},
					(e) => {
						ModelManager_1.ModelManager.GameModeModel.PreloadPromise.SetResult(
							e,
						),
							o?.(e);
					},
				);
	}
	static async S0r() {
		var e = new GameModePromise_1.GameModePromise();
		return (
			ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
				? (ModelManager_1.ModelManager.LoadingModel.SetIsLoading(!0),
					e.SetResult(!0))
				: (ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("GameMode", 46, "加载场景:播放CG(开始)"),
							VideoLauncher_1.VideoLauncher.ShowVideoCg(
								ModelManager_1.ModelManager.GameModeModel.TravelMp4Path,
								() => {
									ModelManager_1.ModelManager.GameModeModel.VideoStartPromise.SetResult(
										!0,
									);
								},
							),
							await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
								8,
								2,
							),
							BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
								"None",
								"LeaveScene",
							),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("GameMode", 46, "加载场景:播放CG(完成)"))
						: ModelManager_1.ModelManager.GameModeModel.UseShowCenterText
							? (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"GameMode",
										46,
										"加载场景:打开黑幕白字界面(开始)",
									),
								await TeleportController_1.TeleportController.TeleportWithCenterTextStart(
									ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"GameMode",
										46,
										"加载场景:打开黑幕白字界面(完成)",
									))
							: (Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"GameMode",
										3,
										"加载场景:打开Loading界面(开始)",
									),
								ModelManager_1.ModelManager.GameModeModel.OpenLoadingProfiler.Restart(),
								await LoadingController_1.LoadingController.GameModeOpenLoading(),
								ModelManager_1.ModelManager.GameModeModel.OpenLoadingProfiler.Stop(),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"GameMode",
										3,
										"加载场景:打开Loading界面(完成)",
									)),
					e.SetResult(!0)),
			e.Promise
		);
	}
	static SetTravelMp4(e, o) {
		(e && !o) ||
			((ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = e),
			(ModelManager_1.ModelManager.GameModeModel.TravelMp4Path = o));
	}
	static ChangeGameMode() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("World", 3, "[Game.ChangeMode] ChangeMode");
		try {
			this.Manager.ChangeMode();
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Game",
						3,
						"[Game.ChangeMode] 调用ControllerManager.ChangeMode异常。",
						e,
						["error", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						3,
						"[Game.ChangeMode] 调用ControllerManager.ChangeMode异常。",
						["error", e],
					);
		}
		try {
			ModelManager_1.ModelManager.ChangeMode();
		} catch (e) {
			e instanceof Error
				? Log_1.Log.CheckError() &&
					Log_1.Log.ErrorWithStack(
						"Game",
						3,
						"[Game.ChangeMode] 调用ModelManager.ChangeMode异常。",
						e,
						["error", e.message],
					)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Game",
						3,
						"[Game.ChangeMode] 调用ModelManager.ChangeMode异常。",
						["error", e],
					);
		}
	}
	static UpdateFoliageDataLayer() {
		var e;
		GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
			?.bEnableWorldPartition &&
			((e = GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
				.GetCurrentQualityInfo()
				.GetGameQualitySettingLevel()),
			UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateFoliageDataLayer(
				GlobalData_1.GlobalData.World,
				e.valueOf() < 0 ? 1 : e,
			));
	}
	static UpdateStreamingQualityLevel() {
		var e, o;
		GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
			?.bEnableWorldPartition
			? ((e =
					"wp.Runtime.ModifyQualityLevelStreamingValue " +
					(0 ===
					(o =
						GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo()
							.StreamLevel)
						? 0.8
						: 1)),
				(o = "wp.Runtime.CurStreamingQualityLevel " + o),
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					e,
				),
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					o,
				),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"UpdateStreamingQualityLevel",
						["bEnableWorldPartition", !0],
						["modifyQualityLevelStreamingValue", e],
						["curStreamingQualityLevel", o],
						[
							"streamLevel",
							GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo()
								.StreamLevel,
						],
					))
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"World",
					3,
					"UpdateStreamingQualityLevel",
					["bEnableWorldPartition", !1],
					[
						"streamLevel",
						GameQualitySettingsManager_1.GameQualitySettingsManager.Get()?.GetCurrentQualityInfo()
							?.StreamLevel,
					],
				);
	}
}
((exports.GameModeController = GameModeController).g5s = void 0),
	(GameModeController.JVs = () => {
		var e;
		Net_1.Net.IsServerConnected() &&
			(((e = Protocol_1.Aki.Protocol.Bus.create()).L7n = 0),
			Net_1.Net.Send(4768, e),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("GameMode", 55, "ApplicationHasDeactivated 发生时停协议", [
				"TimeDilation",
				Time_1.Time.TimeDilation,
			]);
	}),
	(GameModeController.DHe = () => {
		var e;
		Net_1.Net.IsServerConnected() &&
			(((e = Protocol_1.Aki.Protocol.Bus.create()).L7n =
				Time_1.Time.TimeDilation),
			Net_1.Net.Send(4768, e),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info("GameMode", 55, "ApplicationHasReactivated 发生时停协议", [
				"TimeDilation",
				Time_1.Time.TimeDilation,
			]);
	}),
	(GameModeController.uMe = () => {
		ModelManager_1.ModelManager.GameModeModel.RenderAssetDone = !1;
	});
class LoadGroup {
	constructor(e) {
		(this.Name = e), (this.N0r = new Array()), (this.nK = new Array());
	}
	async Run() {
		for (const a of this.nK) {
			var e = a[1],
				o = a[2];
			const r = a[3];
			if (e && !e()) return !0;
			(e = o()).then((e) => {
				r?.(e);
			}),
				this.N0r.push(e);
		}
		var a = await Promise.all(this.N0r);
		for (let e = 0; e < a.length; ++e) {
			var r = this.nK[e][0];
			if (!a[e])
				return (
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GameMode",
							3,
							"执行函数Handle失败",
							["name", r],
							["index", e],
						),
					!1
				);
		}
		return !0;
	}
	Add(e, o, a, r) {
		return this.nK.push([e, o, a, r]), !0;
	}
}
