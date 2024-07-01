"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhotographController = exports.ENTITYCAMERA = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
	QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
	IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
	UiManager_1 = require("../../Ui/UiManager"),
	FormationDataController_1 = require("../Abilities/FormationDataController"),
	FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
	EntityPhotoBehaviorNode_1 = require("../GeneralLogicTree/BehaviorNode/ChildQuestNode/EntityPhotoBehaviorNode"),
	LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
	LogReportController_1 = require("../LogReport/LogReportController"),
	LogReportDefine_1 = require("../LogReport/LogReportDefine"),
	UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
	RangeCheck_1 = require("../Util/RangeCheck"),
	PhotographDefine_1 = require("./PhotographDefine"),
	TsPhotographer_1 = require("./TsPhotographer");
exports.ENTITYCAMERA = 70140001;
class PhotoMission {
	constructor(e, t, o, r) {
		(this.ItsMissionType = void 0),
			(this.IsFinished = !1),
			(this.EntityId = void 0),
			(this.Description = ""),
			(this.ItsMissionType = e),
			(this.IsFinished = t),
			(this.EntityId = o),
			(this.Description = r);
	}
}
class PhotographController extends UiControllerBase_1.UiControllerBase {
	static Init() {
		var e = super.Init();
		return (
			(this.mji = this.GetNewRangeCheck()),
			(this.CameraCaptureType = 0),
			(this.Missions = new Array()),
			(this.IsLastChecked = !1),
			(this.AlreadyChanged = !1),
			(this.AIn = !1),
			(this.dji = !1),
			this.Cji ||
				((this.Cji = UE.NewObject(UE.TraceLineElement.StaticClass())),
				(this.Cji.bIsSingle = !1),
				(this.Cji.bIgnoreSelf = !0),
				(this.Cji.bIsProfile = !1),
				this.Cji.AddObjectTypeQuery(
					QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
				),
				this.Cji.AddObjectTypeQuery(
					QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
				),
				this.Cji.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
				this.Cji.AddObjectTypeQuery(
					QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
				),
				this.Cji.AddObjectTypeQuery(
					QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
				),
				this.Cji.AddObjectTypeQuery(
					QueryTypeDefine_1.KuroObjectTypeQuery.PhysicsBody,
				),
				this.Cji.SetDrawDebugTrace(0),
				this.Cji.SetTraceColor(1, 0, 0, 1),
				this.Cji.SetTraceHitColor(0, 1, 0, 1)),
			(this.MinFov =
				GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
					"Photo.EntityCameraFovRangeMin",
				)),
			(this.MaxFov =
				GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
					"Photo.EntityCameraFovRangeMax",
				)),
			e
		);
	}
	static Clear() {
		return (
			this.gji(),
			this.EndEntityPhotographMission(),
			(this.Missions = void 0),
			(this.IsLastChecked = !1),
			(this.AlreadyChanged = !1),
			(this.dji = !1),
			(this.AIn = !1),
			(this.Cji = void 0),
			super.Clear()
		);
	}
	static OnLeaveLevel() {
		return this.gji(), !0;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnChangeRole,
			this.xie,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.Gdt,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.Gre,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck,
				this.fji,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
				this.pji,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotNetworkStart,
				this.vji,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSpecialItemNotAllow,
				this.Mji,
			),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.UiMoveForward,
				this.Sji,
			),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.UiMoveRight,
				this.Eji,
			),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.UiLookUp,
				this.G6i,
			),
			InputDistributeController_1.InputDistributeController.BindAxis(
				InputMappingsDefine_1.axisMappings.UiTurn,
				this.N6i,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnChangeRole,
			this.xie,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.Gdt,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotNetworkStart,
				this.vji,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck,
				this.fji,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
				this.Gre,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
				this.pji,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSpecialItemNotAllow,
				this.Mji,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.UiMoveForward,
				this.Sji,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.UiMoveRight,
				this.Eji,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.UiLookUp,
				this.G6i,
			),
			InputDistributeController_1.InputDistributeController.UnBindAxis(
				InputMappingsDefine_1.axisMappings.UiTurn,
				this.N6i,
			),
			this.tXe();
	}
	static OnTick(e) {
		this.dji &&
			(this.CheckInRange() &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
					exports.ENTITYCAMERA,
					!0,
				),
			ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn &&
			ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() ===
				exports.ENTITYCAMERA &&
			this.fLr(661863530)
				? this.URe(-119194461)
				: this.ARe(-119194461));
		var t,
			o = ModelManager_1.ModelManager.PhotographModel,
			r = o.GetPhotographerStructure();
		r &&
			this.yji &&
			(0 !== (t = o.RightValue) && r.AddSourceYawInput(t),
			0 !== (t = o.UpValue) && r.AddSourcePitchInput(t),
			UiManager_1.UiManager.IsViewShow("PhotographView")) &&
			this.AIn &&
			1 === this.CameraCaptureType &&
			(this.TickSearchForEntityPoints()
				? this.IsLastChecked ||
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Photo", 46, "实体相机拍摄所有检查条件都符合"),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnEntityCameraSearchGreat,
					),
					(this.IsLastChecked = !0))
				: (this.IsLastChecked = !1));
	}
	static PhotographFastScreenShot(e = 0) {
		ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid &&
			((this.CameraCaptureType = e),
			this.ScreenShot({
				ScreenShot: !0,
				IsHiddenBattleView: !0,
				HandBookPhotoData: void 0,
				GachaData: void 0,
				FragmentMemory: void 0,
			}));
	}
	static CouldRequestPhotoPermission() {
		return (
			TimeUtil_1.TimeUtil.GetServerTime() >
			LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey
					.RequestPhotoPermissionMinTime,
				0,
			)
		);
	}
	static TryOpenPhotograph(e) {
		var t,
			o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		return !(
			!o?.Valid ||
			(ModelManager_1.ModelManager.PlotModel.IsInPlot
				? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"NotAllowOpenPhotograph",
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Photo", 46, "无法拍照:在剧情中"),
					1)
				: !(t = o.Entity.GetComponent(185)) ||
					(t.HasTag(40422668)
						? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"NotAllowOpenPhotograph",
							),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Photo", 46, "无法拍照:在空中"),
							1)
						: t.HasTag(855966206)
							? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
									"NotAllowOpenPhotograph",
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("Photo", 46, "无法拍照:在水中"),
								1)
							: t.HasTag(504239013)
								? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
										"NotAllowOpenPhotograph",
									),
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info("Photo", 46, "无法拍照:在攀爬"),
									1)
								: t.HasTag(1996802261)
									? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
											"NotAllowOpenPhotograph",
										),
										Log_1.Log.CheckInfo() &&
											Log_1.Log.Info("Photo", 46, "无法拍照:在战斗中"),
										1)
									: t.HasTag(-1371021686)
										? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
												"NotAllowOpenPhotograph",
											),
											Log_1.Log.CheckInfo() &&
												Log_1.Log.Info("Photo", 46, "无法拍照:在技能中"),
											1)
										: 1 !== e || UiManager_1.UiManager.IsViewOpen("BattleView")
											? UiManager_1.UiManager.IsViewOpen("PhotographView")
												? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
														"NotAllowOpenPhotograph",
													),
													Log_1.Log.CheckInfo() &&
														Log_1.Log.Info(
															"Photo",
															46,
															"无法拍照:已经在拍照界面",
														),
													1)
												: ModelManager_1.ModelManager.SceneTeamModel
															.IsPhantomTeam
													? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
															"NotAllowOpenPhotograph",
														),
														Log_1.Log.CheckInfo() &&
															Log_1.Log.Info(
																"Photo",
																46,
																"无法拍照:在声骸编队",
															),
														1)
													: o.Entity.GetComponent(160)?.MainAnimInstance
														? (this.c9t(e), 0)
														: (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
																"NotAllowOpenPhotograph",
															),
															Log_1.Log.CheckInfo() &&
																Log_1.Log.Info(
																	"Photo",
																	46,
																	"无法拍照:实体状态机找不到",
																),
															1)
											: (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
													"NotAllowOpenPhotograph",
												),
												Log_1.Log.CheckInfo() &&
													Log_1.Log.Info(
														"Photo",
														46,
														"无法拍照:不在BattleView中",
													),
												1)))
		);
	}
	static InitPhotoEntityThings() {
		this.mji?.OnClear(),
			(this.mji = void 0),
			this.Iji(),
			this.BehaviorNode?.TakePlace &&
				this.GetNewRangeCheck()?.GetOrAdd(
					this.BehaviorNode.TakePlace.RangeEntity,
				);
	}
	static InitPhotographRelativeContent() {
		var e, t, o;
		(this.yji = this.Tji()),
			this.yji &&
				((this.Lji = this.GetFightCameraActor()), this.Lji) &&
				((this.Dji = this.Rji()),
				this.Uji().SetIsDitherEffectEnable(!1),
				(e = Global_1.Global.BaseCharacter)?.SetDitherEffect(1, 1),
				(e = e?.Mesh.GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME)),
				(o = ModelManager_1.ModelManager.PhotographModel),
				(t = this.Lji.GetTransform()),
				(o = o.SpawnPhotographerStructure(e, t.GetRotation(), t.GetScale3D())),
				(this.Dji.FocusSettings.ManualFocusDistance =
					PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE),
				o?.SetPlayerSourceLocation(e),
				o?.SetCameraInitializeTransform(t),
				UiCameraManager_1.UiCameraManager.Get().Enter(0.5),
				this.InitializeDefaultPhotographOption());
	}
	static async c9t(e) {
		(this.CameraCaptureType = e),
			(this.yji = this.Tji()),
			this.yji &&
				((this.Lji = this.GetFightCameraActor()), this.Lji) &&
				(this.eXe(),
				(ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph = !0),
				await this.OpenBlackScreen(),
				UiManager_1.UiManager.OpenView("PhotographView"));
	}
	static async OpenBlackScreen() {
		(this.AIn = !1),
			await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
				12,
				3,
				0.5,
			);
	}
	static async CloseBlackScreen() {
		await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
			12,
			0.5,
		),
			(this.AIn = !0);
	}
	static CheckInRange() {
		if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid)
			if (
				this.GetNewRangeCheck()?.CheckReached(
					this.BehaviorNode?.TakePlace?.RangeEntity ?? 0,
				)
			) {
				if (!this.AlreadyChanged)
					return this.URe(661863530), (this.AlreadyChanged = !0);
			} else this.ARe(661863530), (this.AlreadyChanged = !1);
		return !1;
	}
	static UpdateMission() {
		if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
			this.BehaviorNode = void 0;
			for (let e = this.Missions.length; 0 < e; e--) this.Missions.pop();
		} else {
			let e,
				t = !1;
			if (
				(ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode() instanceof
					EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
					((t = !0),
					(this.IsMission = 0),
					(e =
						ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode())),
				ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode() instanceof
					EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
					((t = !0),
					(this.IsMission = 1),
					(e =
						ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode())),
				ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode() instanceof
					EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
					((t = !0),
					(this.IsMission = 2),
					(e =
						ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode())),
				!this.BehaviorNode && t)
			)
				return (this.BehaviorNode = e), this.InitPhotoEntityThings(), !0;
			if (t) return !0;
			this.BehaviorNode = void 0;
			for (let e = this.Missions.length; 0 < e; e--) this.Missions.pop();
		}
		return !1;
	}
	static CheckIfInMission() {
		switch (this.IsMission) {
			case 0:
				return (
					!(
						!ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode() ||
						!this.BehaviorNode
					) &&
					ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode() instanceof
						EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode
				);
			case 1:
				return (
					!(
						!ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode() ||
						!this.BehaviorNode
					) &&
					ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode() instanceof
						EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode
				);
			case 2:
				return (
					!(
						!ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode() ||
						!this.BehaviorNode
					) &&
					ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode() instanceof
						EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode
				);
		}
		return !1;
	}
	static async ReturnPhotograph() {
		await this.OpenBlackScreen(), this.gji(), await this.CloseBlackScreen();
	}
	static async ClosePhotograph() {
		await this.OpenBlackScreen(),
			this.gji(),
			(ModelManager_1.ModelManager.PhotographModel.MontageId = 0),
			UiManager_1.UiManager.NormalResetToView("BattleView", () => {
				this.CloseBlackScreen();
			});
	}
	static gji() {
		var e = ModelManager_1.ModelManager.PhotographModel;
		this.ResetPhotoMontage(),
			e.DestroyUiCamera(),
			e.ResetEntityEnable(),
			e.ClearPhotographOption(),
			this.tXe(),
			(this.IsLastChecked = !1),
			(this.Lji = void 0),
			(this.yji = void 0),
			(this.Dji = void 0),
			(e.IsOpenPhotograph = !1),
			this.Uji().SetIsDitherEffectEnable(!0),
			Global_1.Global.BaseCharacter?.SetDitherEffect(0, 1),
			(this.CameraCaptureType = 0);
	}
	static EndEntityPhotographMission() {
		if (this.Missions)
			for (let e = this.Missions.length; 0 < e; e--) this.Missions.pop();
		this.mji?.OnClear(), (this.mji = void 0);
	}
	static ScreenShot(e) {
		var t =
				Global_1.Global.BaseCharacter.CharacterActorComponent
					.ActorLocationProxy,
			o = ModelManager_1.ModelManager.PhotographModel,
			r = ModelManager_1.ModelManager.SceneTeamModel,
			a = ModelManager_1.ModelManager.AreaModel,
			i =
				((r = r.GetCurrentEntity.Entity.GetComponent(0).GetRoleId()),
				o.GetPhotographOption(0)),
			n = LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName,
				!0,
			),
			s = o.GetPhotographOption(3),
			l = new LogReportDefine_1.PhotographerLogData();
		(l.event_id = "1009"),
			(l.i_area_id = a.AreaInfo.AreaId),
			(l.i_father_area_id = a.AreaInfo.Father),
			(l.f_pos_x = t.X),
			(l.f_pos_y = t.Y),
			(l.f_pos_z = t.Z),
			(l.i_motion = o.MontageId),
			(l.i_expression = 0),
			(l.i_role_id = r),
			(l.i_shot_option = o.GetPhotographOption(2)),
			(l.i_self_option = i ? 0 : 1),
			(l.i_info_option = n ? 0 : 1),
			(l.i_dof_option = s ? 1 : 0),
			LogReportController_1.LogReportController.LogReport(l),
			UiManager_1.UiManager.OpenView("PhotoSaveView", e, () => {
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnScreenShotDone,
				),
					1 === this.CameraCaptureType &&
						(this.IsLastChecked
							? EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnEntityCameraFinished,
									!0,
								)
							: EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.OnEntityCameraFinished,
									!1,
								));
			});
	}
	static eXe() {
		this.Aji(1996802261, this.Pji),
			this.Aji(40422668, this.Pji),
			this.Aji(855966206, this.Pji);
	}
	static tXe() {
		for (const e of this.xji) e.EndTask();
		this.xji.length = 0;
	}
	static Aji(e, t) {
		var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		o?.Valid &&
			o.Entity?.Valid &&
			((o = o.Entity.GetComponent(185).ListenForTagAddOrRemove(e, t)),
			this.xji.push(o));
	}
	static fLr(e) {
		var t;
		return (
			!!e &&
			((t = FormationDataController_1.FormationDataController.GetPlayerEntity(
				ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			)?.GetComponent(185))
				? t.HasTag(e)
				: (Log_1.Log.CheckError() &&
						Log_1.Log.Error("Photo", 46, "无法获得PlayerEntity"),
					!1))
		);
	}
	static URe(e) {
		var t;
		e &&
			((t = FormationDataController_1.FormationDataController.GetPlayerEntity(
				ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			)?.GetComponent(185))
				? this.fLr(e) || t.AddTag(e)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Photo", 46, "无法获得PlayerEntity"));
	}
	static ARe(e) {
		var t;
		e &&
			((t = FormationDataController_1.FormationDataController.GetPlayerEntity(
				ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
			)?.GetComponent(185))
				? this.fLr(e) && t.RemoveTag(e)
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("Photo", 46, "无法获得PlayerEntity"));
	}
	static Tji() {
		var e = CameraController_1.CameraController.WidgetCamera;
		if (e && (e = e.GetComponent(12)).Valid) return e.CineCamera;
	}
	static Rji() {
		var e = this.yji;
		if (e?.IsValid()) return e.GetCineCameraComponent();
	}
	static GetFightCameraActor() {
		var e = CameraController_1.CameraController.FightCamera;
		if (e && (e = e.GetComponent(4)).Valid) return e.CameraActor;
	}
	static Uji() {
		var e = CameraController_1.CameraController.FightCamera;
		if (e) return e.GetComponent(5);
	}
	static SetFov(e) {
		var t =
			ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
		t && t.SetFov(e);
	}
	static GetFov() {
		var e =
			ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
		return e ? e.GetFov() : 0;
	}
	static ResetCamera() {
		var e = ModelManager_1.ModelManager.PhotographModel,
			t = e.GetPhotographerStructure();
		t &&
			(this.wji(e.PlayMontageEntity),
			t.ResetCamera(),
			ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid) &&
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnResetPhotographCamera,
			);
	}
	static PlayPhotoMontage(e, t) {
		var o =
			ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfig(t);
		if (o) {
			var r = o.MontagePath;
			const a = o.IsLoop;
			(o = ModelManager_1.ModelManager.PhotographModel),
				this.wji(o.PlayMontageEntity),
				(o.PlayMontageEntity = e),
				(o.MontageId = t),
				ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimMontage, (t) => {
					if (t?.IsValid() && e.Valid) {
						const r = e.Entity;
						var o = r.GetComponent(26);
						o.IsSitDown
							? (o.PreLeaveSitDownAction(),
								this.Aji(-2104691392, (e, o) => {
									o ||
										((o = r.GetComponent(160).MainAnimInstance),
										a && o.OnMontageEnded.Add(this.Kue),
										o.Montage_Play(t));
								}))
							: ((o = r.GetComponent(160).MainAnimInstance),
								a && o.OnMontageEnded.Add(this.Kue),
								o.Montage_Play(t));
					}
				});
		}
	}
	static wji(e) {
		ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure() &&
			e?.Valid &&
			(e.Entity.GetComponent(160).StopMontage(),
			(ModelManager_1.ModelManager.PhotographModel.MontageId = 0));
	}
	static ResetPhotoMontage() {
		var e = ModelManager_1.ModelManager.PhotographModel;
		(e =
			(this.wji(e.PlayMontageEntity),
			(e.PlayMontageEntity = void 0),
			ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id)) &&
			(e = EntitySystem_1.EntitySystem.Get(e))?.Valid &&
			e.GetComponent(160).MainAnimInstance.设置头部转向状态(1);
	}
	static InitializeDefaultPhotographOption() {
		for (const t of ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig()) {
			let o = -1;
			var e = t.Type;
			0 === e ? (o = t.DefaultOptionIndex) : 1 === e && (o = t.ValueRange[2]),
				this.SetPhotographOption(t.ValueType, o);
		}
	}
	static SetPhotographOption(e, t) {
		var o = ModelManager_1.ModelManager.PhotographModel;
		switch ((o.SetPhotographOption(e, t), e)) {
			case 3:
				1 === t
					? ((r = o.GetPhotographOption(4)),
						(a = o.GetPhotographOption(5)),
						(this.Dji.FocusSettings.ManualFocusDistance = r),
						(this.Dji.CurrentAperture = a))
					: ((this.Dji.FocusSettings.ManualFocusDistance =
							PhotographDefine_1.DEFAULT_FOCAL_LENTGH),
						(this.Dji.CurrentAperture = PhotographDefine_1.DEFAULT_APERTURE));
				break;
			case 4:
				1 === o.GetPhotographOption(3) &&
					(this.Dji.FocusSettings.ManualFocusDistance = t);
				break;
			case 5:
				1 === o.GetPhotographOption(3) && (this.Dji.CurrentAperture = t);
				break;
			case 0:
				var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
				1 === t ? o.SetEntityEnable(r, !0) : o.SetEntityEnable(r, !1);
				break;
			case 2:
				var a =
					ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id;
				if (!a) return;
				if (((r = EntitySystem_1.EntitySystem.Get(a)), !r?.Valid)) return;
				r.GetComponent(160).MainAnimInstance.设置头部转向状态(1);
		}
	}
	static IsPlayerLookAtCamera() {
		return (
			1 === ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(2)
		);
	}
	static IsOpenPhotograph() {
		return ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph;
	}
	static GetAllCheckPoints(e) {
		var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e);
		if (
			t &&
			(e = (0, IComponent_1.getComponent)(
				t.ComponentsData,
				"PhotoTargetComponent",
			))
		) {
			var o = new Array();
			for (const r of e.RequiredPoints)
				o.push(
					Vector_1.Vector.Create(
						(r.X ?? 0) + t.Transform.Pos.X ?? 0,
						(r.Y ?? 0) + t.Transform.Pos.Y ?? 0,
						(r.Z ?? 0) + t.Transform.Pos.Z ?? 0,
					),
				);
			return o;
		}
	}
	static GetCheckEntityPosition(e) {
		if (
			(e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e))
		)
			return Vector_1.Vector.Create(
				e.Transform?.Pos.X ?? 0,
				e.Transform?.Pos.Y ?? 0,
				e.Transform?.Pos.Z ?? 0,
			);
	}
	static Bji(e) {
		if (
			(e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e))
		) {
			var t = (0, IComponent_1.getComponent)(
				e.ComponentsData,
				"PhotoTargetComponent",
			);
			if (t && t.RayCastIgnoreEntities) {
				var o = new Array();
				for (let e = 0; e < t.RayCastIgnoreEntities.length; e++) {
					var r = t.RayCastIgnoreEntities[e];
					o.push(r);
				}
				return o;
			}
		}
	}
	static bji(e) {
		if (
			(e = ModelManager_1.ModelManager.CreatureModel.GetEntityIdByPbDataId(e))
		)
			return e;
	}
	static GetPointType(e) {
		if (
			(e =
				ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e)) &&
			(e = (0, IComponent_1.getComponent)(
				e.ComponentsData,
				"PhotoTargetComponent",
			)) &&
			e.TargetCapturePromptUi
		)
			return e.TargetCapturePromptUi;
	}
	static GetNewRangeCheck() {
		return this.mji || (this.mji = new RangeCheck_1.RangeCheck()), this.mji;
	}
	static CheckInUi(e) {
		var t = this.qji();
		return !(!t || !e || !this.CheckPositionInScreen(e, t));
	}
	static CheckInUi2D(e) {
		var t = this.qji();
		return !(!t || !e || !this.GetScreenPositionIsInRange(e, t));
	}
	static CheckPositionInScreen(e, t) {
		var o = Global_1.Global.CharacterController,
			r = (0, puerts_1.$ref)(void 0);
		return (
			!!UE.GameplayStatics.ProjectWorldToScreen(o, e.ToUeVector(), r, !1) &&
			((o = (0, puerts_1.$unref)(r)), this.GetScreenPositionIsInRange(o, t))
		);
	}
	static GetDistance(e, t) {
		return Math.pow(Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2), 0.5);
	}
	static GetScreenPositionIsInRange(e, t) {
		return this.GetDistance(e, this.GetPhotoViewportCenter()) <= t;
	}
	static TickSearchForEntityPoints() {
		let e = 0;
		var t,
			o = this.BehaviorNode?.TakeTime;
		if (
			(o =
				(o && o.TimeRange
					? void 0 !== (t = this.Gji()) &&
						this.Nji(
							Math.floor(
								ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour,
							),
							Math.floor(
								ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute -
									60 *
										Math.floor(
											ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour,
										),
							),
							o.TimeRange.Start.Hour,
							o.TimeRange.Start.Min,
							o.TimeRange.End.Hour,
							o.TimeRange.End.Min,
							t,
						)
						? this.Oji(0, void 0, !0)
						: (this.Oji(0, void 0, !1), e--)
					: this.Oji(0, void 0, !1),
				this.BehaviorNode?.TakeTargetArray))
		)
			for (const t of o) {
				var r = this.GetAllCheckPoints(t.EntityId);
				if (!r || 0 === r.length) {
					e--;
					break;
				}
				let o = !0;
				for (const a of r)
					if (!this.CheckInUi(a) || !this.CheckLineTrace(a.ToUeVector())) {
						this.Oji(1, t.EntityId, !1), e--, (o = !1);
						break;
					}
				o && this.Oji(1, t.EntityId, !0);
			}
		else e--;
		return 0 === e;
	}
	static GetPhotoViewportCenter() {
		var e = Global_1.Global.CharacterController,
			t = (0, puerts_1.$ref)(void 0),
			o = (0, puerts_1.$ref)(void 0);
		e.GetViewportSize(t, o),
			(e = (0, puerts_1.$unref)(t)),
			(t = (0, puerts_1.$unref)(o));
		return new UE.Vector2D(e / 2, t / 2);
	}
	static qji() {
		var e,
			t,
			o,
			r = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
				"Photo.TargetFinderFrameSize",
			);
		if (r)
			return (
				(e = Global_1.Global.CharacterController),
				(r = parseFloat(r.Value)),
				(t = (0, puerts_1.$ref)(void 0)),
				(o = (0, puerts_1.$ref)(void 0)),
				e.GetViewportSize(t, o),
				((0, puerts_1.$unref)(o) * r) / 2
			);
	}
	static Iji() {
		for (let e = this.Missions.length; 0 < e; e--) this.Missions.pop();
		var e,
			t = this.BehaviorNode;
		if (
			t &&
			(t.TakeTime &&
				((e = new PhotoMission(0, !1, void 0, t.TakeTime.TidDescription)),
				this.Missions.push(e)),
			t.TakeTargetArray)
		)
			for (let e = 0; e < t.TakeTargetArray.length; e++) {
				var o = new PhotoMission(
					1,
					!1,
					t.TakeTargetArray[e].EntityId,
					t.TakeTargetArray[e].TidDescription,
				);
				this.Missions.push(o);
			}
	}
	static Oji(e, t, o) {
		var r = this.Missions.length;
		for (let a = 0; a < r; a++)
			if (this.Missions[a].ItsMissionType === e) {
				if (1 !== e)
					return (
						(this.Missions[a].IsFinished = o),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
							this.Missions[a].Description,
							o,
						),
						this.Missions[a]
					);
				if (this.Missions[a].EntityId === t)
					return (
						(this.Missions[a].IsFinished = o),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
							this.Missions[a].Description,
							o,
						),
						this.Missions[a]
					);
			}
	}
	static Gji() {
		if (this.BehaviorNode?.TakeTime)
			switch (this.BehaviorNode?.TakeTime.Compare) {
				case "Eq":
					return !0;
				case "Ne":
					return !1;
			}
	}
	static Nji(e, t, o, r, a, i, n) {
		if (a < o)
			return o <= e
				? e !== o || r <= t
					? n
					: !n
				: e <= a && (e !== a || t <= i)
					? n
					: !n;
		if (o < a) {
			if (o <= e && e <= a)
				return e === o ? (r <= t ? n : !n) : e !== a || t <= i ? n : !n;
		} else if (e === o) return r <= t && t <= i ? n : !n;
		return !n;
	}
	static CheckLineTrace(e) {
		if (!e) return !1;
		let t = !0;
		var o;
		if (
			(this.Cji
				? ((this.Cji.WorldContextObject = GlobalData_1.GlobalData.World),
					(o = this.yji.K2_GetActorLocation()),
					(this.Cji.StartX = o.X),
					(this.Cji.StartY = o.Y),
					(this.Cji.StartZ = o.Z),
					(this.Cji.EndX = e.X),
					(this.Cji.EndY = e.Y),
					(this.Cji.EndZ = e.Z),
					(t = TraceElementCommon_1.TraceElementCommon.LineTrace(
						this.Cji,
						"PhotographCheck",
					)))
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Photo", 46, "射线检测失败："),
			t)
		)
			for (let e = 0; e < this.Cji.HitResult.Actors.Num(); e++) {
				var r = this.Cji.HitResult.Actors.Get(e);
				if (
					r &&
					!(
						r instanceof TsPhotographer_1.default ||
						r instanceof UE.AkReverbVolume
					)
				) {
					if (r instanceof UE.BP_BaseVision_C) {
						var a = this.Cji.HitResult.Components.Get(e);
						if (a && a.ComponentTags?.Contains(this.kji)) {
							Log_1.Log.CheckDebug() &&
								Log_1.Log.Debug("Photo", 46, "：", ["名称：", r.GetName()]);
							continue;
						}
					}
					if (
						UE.KuroStaticLibrary.IsImplementInterface(
							r.GetClass(),
							UE.BPI_CreatureInterface_C.StaticClass(),
						) &&
						((a = r.GetEntityId()), this.CheckInRayCastIgnoreArray(a))
					)
						continue;
					return (
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Photo", 46, "视野中有物品遮挡：", [
								"名称：",
								r.GetName(),
							]),
						!1
					);
				}
			}
		return !0;
	}
	static SubmitQuest() {
		(this.dji = !1),
			this.ARe(661863530),
			this.ARe(-119194461),
			(this.AlreadyChanged = !1),
			this.BehaviorNode.UseSubmitNode(),
			this.EndEntityPhotographMission();
	}
	static GetPosition2D(e) {
		var t = Global_1.Global.CharacterController,
			o = (0, puerts_1.$ref)(void 0);
		if (UE.GameplayStatics.ProjectWorldToScreen(t, e.ToUeVector(), o, !1))
			return (0, puerts_1.$unref)(o);
	}
	static CheckInRayCastIgnoreArray(e) {
		var t = this.BehaviorNode?.TakeTargetArray;
		if (t)
			for (const r of t) {
				var o = this.Bji(r.EntityId);
				if (!o) return !1;
				for (const t of o) {
					if (
						ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t) &&
						this.bji(t) === e
					)
						return !0;
				}
			}
		return !1;
	}
	static CheckHasSpecifiedFeatureForSave() {
		return FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check();
	}
	static GetEntityFinishSituation(e) {
		if (this.Missions)
			for (const t of this.Missions) if (t.EntityId === e) return t.IsFinished;
		return !1;
	}
	static GetPointToFinishTask() {
		var e = this.BehaviorNode?.TakeTargetArray;
		if (e) {
			let r = new UE.Vector(0, 0, 0);
			for (const a of e) {
				var t = this.GetAllCheckPoints(a.EntityId);
				if (t && 0 !== t.length)
					for (const e of t) {
						var o = e.ToUeVector();
						r = r.IsZero() ? o : r.op_Addition(o).op_Division(2);
					}
			}
			if (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Photo", 46, "GetPointToFinishTask", [
						"finalPoint:",
						r,
					]),
				!r.IsZero())
			)
				return r;
		}
	}
}
(exports.PhotographController = PhotographController),
	((_a = PhotographController).xji = []),
	(PhotographController.yji = void 0),
	(PhotographController.Dji = void 0),
	(PhotographController.Lji = void 0),
	(PhotographController.CameraCaptureType = 0),
	(PhotographController.mji = void 0),
	(PhotographController.BehaviorNode = void 0),
	(PhotographController.Missions = void 0),
	(PhotographController.IsLastChecked = !1),
	(PhotographController.AlreadyChanged = !1),
	(PhotographController.dji = !1),
	(PhotographController.AIn = !1),
	(PhotographController.Cji = void 0),
	(PhotographController.MaxFov = void 0),
	(PhotographController.MinFov = void 0),
	(PhotographController.IsMission = 0),
	(PhotographController.kji = new UE.FName("EntityPhotoIgnore")),
	(PhotographController.Gdt = () => {
		_a.UpdateMission()
			? ((_a.AlreadyChanged = !1), (_a.dji = !0))
			: ((_a.dji = !1), _a.ARe(661863530), _a.ARe(-119194461));
	}),
	(PhotographController.Gre = () => {
		_a.UpdateMission()
			? ((_a.AlreadyChanged = !1), (_a.dji = !0))
			: ((_a.dji = !1), _a.ARe(661863530), _a.ARe(-119194461));
	}),
	(PhotographController.fji = () => {
		_a.UpdateMission()
			? ((_a.AlreadyChanged = !1), (_a.dji = !0))
			: ((_a.dji = !1), _a.ARe(661863530), _a.ARe(-119194461));
	}),
	(PhotographController.pji = () => {
		_a.UpdateMission()
			? ((_a.AlreadyChanged = !1), (_a.dji = !0))
			: ((_a.dji = !1), _a.ARe(661863530), _a.ARe(-119194461));
	}),
	(PhotographController.Mji = () => {
		ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
			"NotAllowOpenPhotograph",
		),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Photo", 46, "无法拍照:不在使用范围内");
	}),
	(PhotographController.vji = (e) => {
		_a.yji && _a.ReturnPhotograph();
	}),
	(PhotographController.xie = (e, t) => {
		_a.wji(t);
	}),
	(PhotographController.Sji = (e, t) => {
		var o;
		0 === t ||
			!(o =
				ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
			(0 === _a.CameraCaptureType &&
				UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
			UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
			(1 === _a.CameraCaptureType &&
				UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
			(1 === _a.CameraCaptureType
				? o.AddSourcePitchInput(-t)
				: o.AddSourcePitchInput(t));
	}),
	(PhotographController.Eji = (e, t) => {
		var o;
		0 === t ||
			!(o =
				ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
			(0 === _a.CameraCaptureType &&
				UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
			UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
			(1 === _a.CameraCaptureType &&
				UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
			(1 === _a.CameraCaptureType
				? o.AddCameraArmYawInput(t)
				: o.AddSourceYawInput(t));
	}),
	(PhotographController.G6i = (e, t) => {
		var o;
		0 === t ||
			!(o =
				ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
			!ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
			(0 === _a.CameraCaptureType &&
				UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
			UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
			(1 === _a.CameraCaptureType &&
				UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
			o.AddCameraArmPitchInput(t);
	}),
	(PhotographController.N6i = (e, t) => {
		var o;
		0 === t ||
			!(o =
				ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
			!ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
			(0 === _a.CameraCaptureType &&
				UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
			UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
			(1 === _a.CameraCaptureType &&
				UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
			(o.AddPhotographerYawInput(t), o.AddCameraArmYawInput(t));
	}),
	(PhotographController.Pji = (e, t) => {
		t && _a.ClosePhotograph();
	}),
	(PhotographController.Kue = (e, t) => {
		t ||
			((t = ModelManager_1.ModelManager.PhotographModel.PlayMontageEntity)
				?.Valid &&
				t.Entity.GetComponent(160).MainAnimInstance.Montage_Play(e));
	});
