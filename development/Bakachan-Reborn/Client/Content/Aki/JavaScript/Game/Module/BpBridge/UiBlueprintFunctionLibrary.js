"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiBlueprintFunctionLibrary = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
	TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	GameProcedure_1 = require("../../GameProcedure"),
	GameUtils_1 = require("../../GameUtils"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ControllerManager_1 = require("../../Manager/ControllerManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	UiLayer_1 = require("../../Ui/UiLayer"),
	UiManager_1 = require("../../Ui/UiManager"),
	UiModel_1 = require("../../Ui/UiModel"),
	UiViewStorage_1 = require("../../Ui/UiViewStorage"),
	AreaController_1 = require("../Area/AreaController"),
	FullScreenEffectController_1 = require("../FullScreenEffect/FullScreenEffectController"),
	LoginDefine_1 = require("../Login/Data/LoginDefine"),
	LoginController_1 = require("../Login/LoginController"),
	LoginModel_1 = require("../Login/LoginModel"),
	MapController_1 = require("../Map/Controller/MapController"),
	MingSuController_1 = require("../MingSu/MingSuController"),
	PhotographController_1 = require("../Photograph/PhotographController"),
	ReconnectDefine_1 = require("../ReConnect/ReconnectDefine"),
	ShopController_1 = require("../Shop/ShopController"),
	UiSceneManager_1 = require("../UiComponent/UiSceneManager"),
	WorldMapController_1 = require("../WorldMap/WorldMapController");
class UiBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
	static IsGameInited() {
		return GameProcedure_1.GameProcedure.Inited;
	}
	static TempModuleStart() {
		ControllerManager_1.ControllerManager.Init();
	}
	static EndGachaScene() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EndGachaScene);
	}
	static GachaClick(e) {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GachaClick, e);
	}
	static GachaInteractFinish() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.GachaInteractFinish,
		);
	}
	static PlaySequenceEventByStringParam(e) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.PlaySequenceEventByStringParam,
			e,
		);
	}
	static ActivitySequenceEmitEvent(e) {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
			e,
		);
	}
	static AreaBeginOverlap(e) {
		AreaController_1.AreaController.BeginOverlap(e);
	}
	static AreaEndOverlap(e) {
		AreaController_1.AreaController.EndOverlap(e);
	}
	static GetAllFormationRole() {
		var e = UE.NewArray(TsBaseCharacter_1.default);
		for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
			!0,
		)) {
			var t = a.Entity.GetComponent(3)?.Actor;
			t && e.Add(t);
		}
		return e;
	}
	static ChangeRole(e, t) {}
	static InitializeOfflineFormationInstance(e, t, a) {
		ModelManager_1.ModelManager.SceneTeamModel.InitializeOfflineSceneTeam(
			e,
			t,
			a,
		);
	}
	static OpenBattleView() {
		var e = () => {
			UiManager_1.UiManager.OpenView("BattleView");
		};
		UiManager_1.UiManager.IsInited
			? e()
			: UiManager_1.UiManager.Initialize().finally(e);
	}
	static GetCurrentRoleConfigId() {
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
		return e ? e.GetConfigId : 0;
	}
	static CheckGuideStatus(e, t, a) {
		return ModelManager_1.ModelManager.GuideModel.CheckGroupStatus(e, t, a);
	}
	static CheckTeleport(e) {
		return ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(e);
	}
	static UnLockedTeleport(e) {
		MapController_1.MapController.RequestUnlockTeleport(e);
	}
	static GetItemCountByConfigId(e) {
		return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
	}
	static InitUiRoot() {
		UiManager_1.UiManager.Initialize();
	}
	static GetPlayerLevel() {
		return (
			ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(0) || 0
		);
	}
	static GetPlayerId() {
		return ModelManager_1.ModelManager.PlayerInfoModel.GetId() || 0;
	}
	static GetAccount() {
		return "";
	}
	static SetUiRootActive(e) {
		UiLayer_1.UiLayer.SetUiRootActive(e), UiLayer_1.UiLayer.SetWorldUiActive(e);
	}
	static OpenShop(e) {
		ShopController_1.ShopController.OpenShop(e);
	}
	static CloseShop() {
		UiManager_1.UiManager.IsViewShow("ShopView") &&
			UiManager_1.UiManager.CloseView("ShopView");
	}
	static OpenWorldMapView() {
		WorldMapController_1.WorldMapController.OpenView(2, !1);
	}
	static OpenDragonPoolView(e) {
		MingSuController_1.MingSuController.OpenView(e);
	}
	static ConnectServer(e) {}
	static ApplyUiCameraAnimationSettings(e) {}
	static ResetUiCameraAnimationHandle(e) {}
	static ClearAllUiCameraAnimationHandles() {}
	static PlayPlayUiCameraBlendAnimationFromCurrentHandle(e, t) {}
	static OpenUiScene(e) {
		UiSceneManager_1.UiSceneManager.OpenUiScene(e);
	}
	static CloseUiScene() {
		UiSceneManager_1.UiSceneManager.CloseUiScene();
	}
	static BeginScreenEffect(e, t) {
		FullScreenEffectController_1.FullScreenEffectController.BeginEffect(e, t);
	}
	static EndScreenEffect(e) {
		FullScreenEffectController_1.FullScreenEffectController.EndEffect(e);
	}
	static SetPartStateVisible(e, t, a) {
		(t = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSetPartStateVisible,
				e,
				t,
				a,
			);
	}
	static GetRoleMeshId(e) {
		return (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e))
			? e.MeshId
			: 0;
	}
	static GetRoleEntityId(e) {
		return (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e))
			? e.EntityProperty
			: 0;
	}
	static GetRoleBaseAttrList(e) {
		e =
			ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
				e,
			).GetAttributeData();
		const t = UE.NewMap(UE.BuiltinInt, UE.BuiltinFloat);
		return (
			e.GetBaseAttrList().forEach((e, a) => {
				t.Add(a, e);
			}),
			t
		);
	}
	static GetRoleAddAttrList(e) {
		e =
			ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
				e,
			).GetAttributeData();
		const t = UE.NewMap(UE.BuiltinInt, UE.BuiltinFloat);
		return (
			e.GetAddAttrList().forEach((e, a) => {
				t.Add(a, e);
			}),
			t
		);
	}
	static GetRoleCameraConfig(e) {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)
			.CameraConfig;
	}
	static GetRoleProperty(e) {
		return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).PropertyId;
	}
	static GetRoleDamageData(e) {
		var t = UE.NewArray(UE.BuiltinInt);
		return (
			(e = ConfigManager_1.ConfigManager.RoleConfig.GetDamageConfig(e)) &&
				(t.Add(e.Element), t.Add(e.Type)),
			t
		);
	}
	static OpenGmView() {
		ModelManager_1.ModelManager.SundryModel.CanOpenGmView &&
			(UiManager_1.UiManager.IsViewShow("GmView")
				? UiManager_1.UiManager.CloseView("GmView")
				: UiManager_1.UiManager.OpenView("GmView"));
	}
	static BackLoginView() {
		UiManager_1.UiManager.IsViewShow("LoginView") ||
			UiManager_1.UiManager.IsViewShow("CreateCharacterView") ||
			ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
				ReconnectDefine_1.ELogoutReason.GmBackLoginView,
			);
	}
	static SetDamageViewVisible(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Battle", 8, "蓝图设置伤害飘字可见性", ["bVisible", e]),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
				8,
				16,
				e,
			);
	}
	static SetHeadStateVisible(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Battle", 8, "蓝图设置头顶状态条可见性", ["bVisible", e]),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
				8,
				14,
				e,
			);
	}
	static SetBossStateVisible(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Battle", 8, "蓝图设置Boss状态条可见性", ["bVisible", e]),
			ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(
				8,
				13,
				e,
			);
	}
	static PlayBattleNormalTip(e, t) {
		ModelManager_1.ModelManager.BattleUiModel.FloatTipsData.PlayNormalFloatTip(
			e,
			t,
		);
	}
	static PlayBattleCountdownTip(e, t, a) {
		ModelManager_1.ModelManager.BattleUiModel.FloatTipsData.PlayCountdownFloatTip(
			e,
			t,
			a,
		);
	}
	static SetTempLocation(e) {
		var t, a, r, n;
		GlobalData_1.GlobalData.IsPlayInEditor
			? ((r = (void 0, puerts_1.$ref)(void 0)),
				(n = (0, puerts_1.$ref)(void 0)),
				UE.EditorLevelLibrary.GetLevelViewportCameraInfo(r, n),
				(t = (0, puerts_1.$unref)(r)),
				(a = (0, puerts_1.$unref)(n)),
				(UiBlueprintFunctionLibrary.TempLocation = Vector_1.Vector.Create(t)),
				(UiBlueprintFunctionLibrary.TempRotator = Rotator_1.Rotator.Create(a)))
			: (UiBlueprintFunctionLibrary.TempLocation = Vector_1.Vector.Create(e));
	}
	static SetIsSilentLogin(e) {
		PublicUtil_1.PublicUtil.SetIsSilentLogin(e);
	}
	static TestSceneLogin(e) {
		if (
			(GameUtils_1.GameUtils.CreateStat("Login-StartSilentLogin"),
			ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
				LoginDefine_1.ELoginStatus.Init,
			))
		) {
			let r = (0, PublicUtil_1.getConfigPath)(
				IGlobal_1.globalConfig.LevelsConfigPath,
			);
			if (
				(PublicUtil_1.PublicUtil.IsUseTempData() ||
					(r = (0, PublicUtil_1.getConfigPath)(
						IGlobal_1.globalConfigTemp.LevelsConfigPath,
					)),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Temp", 9, "levelConfig路径读取", [
						"levelsConfigPath",
						r,
					]),
				UE.BlueprintPathsLibrary.FileExists(r))
			) {
				var t = (0, puerts_1.$ref)("");
				if (UE.KuroStaticLibrary.LoadFileToString(t, r))
					if (
						((t = Json_1.Json.Parse((0, puerts_1.$unref)(t)).Levels.find(
							(t) => t.Name === e,
						)),
						t)
					) {
						ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo();
						let e = UiBlueprintFunctionLibrary.TestSceneLoadServerIp();
						StringUtils_1.StringUtils.IsEmpty(e) &&
							(e = LoginModel_1.DEFAULT_SERVER_IP),
							ModelManager_1.ModelManager.LoginModel.SetServerIp(e, 0),
							ModelManager_1.ModelManager.LoginModel.SetAccount(
								UiBlueprintFunctionLibrary.TestSceneLoadAccount(),
							),
							ModelManager_1.ModelManager.LoginModel.SetPlayerSex(
								UiBlueprintFunctionLibrary.TestSceneLoadGender()
									? LoginDefine_1.ELoginSex.Boy
									: LoginDefine_1.ELoginSex.Girl,
							),
							ModelManager_1.ModelManager.LoginModel.SetPlayerName("关卡测试");
						var a =
							UiBlueprintFunctionLibrary.TestLoadSceneData()?.DungeonId ?? 0;
						(a =
							(((a =
								(ModelManager_1.ModelManager.LoginModel.SetSingleMapId(
									0 < a ? a : t.Id,
								),
								ModelManager_1.ModelManager.LoginModel.SetMultiMapId(9),
								(ModelManager_1.ModelManager.LoginModel.BornMode =
									UiBlueprintFunctionLibrary.TestSceneLoadNetMode() ? 0 : 1),
								new Protocol_1.Aki.Protocol.VBs())).X =
								UiBlueprintFunctionLibrary.TempLocation.X),
							(a.Y = UiBlueprintFunctionLibrary.TempLocation.Y),
							(a.Z = UiBlueprintFunctionLibrary.TempLocation.Z),
							(ModelManager_1.ModelManager.LoginModel.BornLocation = a),
							GlobalData_1.GlobalData.IsRunWithEditorStartConfig() ||
								((t = Global_1.Global.CharacterController).ClearInputBinding(),
								t.InitInputHandle(),
								t.ReceiveSetupInputComponent()),
							(ModelManager_1.ModelManager.GameModeModel.IsSilentLogin = !0),
							ModelManager_1.ModelManager.LoginModel.GetSingleMapId())),
							(t =
								(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
									a,
								)?.InstType ===
									Protocol_1.Aki.Protocol.sOs.Proto_NormalInstance &&
									UiBlueprintFunctionLibrary.TestLoadSceneData()
										.IsDisableTeleportDungeon &&
									ModelManager_1.ModelManager.SundryModel.BlockTpDungeonCount++,
								() => {
									ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
										LoginDefine_1.ELoginStatus.Init,
									),
										LoginController_1.LoginController.GetHttp(!0),
										EventSystem_1.EventSystem.Add(
											EventDefine_1.EEventName.LoginStatusChange,
											UiBlueprintFunctionLibrary.CheckReLogin,
										),
										(UiBlueprintFunctionLibrary.TimerId =
											TimerSystem_1.TimerSystem.Forever(
												UiBlueprintFunctionLibrary.CheckWorldDone,
												TimeUtil_1.TimeUtil.InverseMillisecond,
											));
								}));
						UiManager_1.UiManager.IsInited
							? t()
							: UiManager_1.UiManager.Initialize().finally(t);
					} else
						Log_1.Log.CheckError() &&
							Log_1.Log.Error("Temp", 9, "没有地图对应的配置, 请检查配置文件", [
								"levelsConfigPath",
								r,
							]);
				else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("Temp", 9, "读取关卡配置失败", ["path", r]);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Temp", 9, "读取关卡配置失败", ["path", r]);
		}
	}
	static TestSceneLoadNetMode() {
		return UiBlueprintFunctionLibrary.TestLoadSceneData().IsNetMode;
	}
	static TestSceneSaveNetMode(e) {
		var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
		(t.IsNetMode = e), UiBlueprintFunctionLibrary.TestSaveSceneData(t);
	}
	static TestSceneLoadAccount() {
		return UiBlueprintFunctionLibrary.TestLoadSceneData().Account;
	}
	static TestSceneSaveAccount(e) {
		var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
		(t.Account = e), UiBlueprintFunctionLibrary.TestSaveSceneData(t);
	}
	static TestSceneLoadServerIp() {
		return UiBlueprintFunctionLibrary.TestLoadSceneData().ServerIp;
	}
	static TestSceneSaveServerIp(e) {
		var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
		(t.ServerIp = e), UiBlueprintFunctionLibrary.TestSaveSceneData(t);
	}
	static TestSceneLoadBornMode() {
		return UiBlueprintFunctionLibrary.TestLoadSceneData().IsBornAtCamera
			? 0
			: 1;
	}
	static TestSceneSaveBornMode1(e) {
		var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
		(t.IsBornAtCamera = e), UiBlueprintFunctionLibrary.TestSaveSceneData(t);
	}
	static TestSceneLoadBornLocation() {
		var e = UiBlueprintFunctionLibrary.TestLoadSceneData(),
			t = new UE.Vector();
		return (
			(t.X = e.Location.X ?? 0),
			(t.Y = e.Location.Y ?? 0),
			(t.Z = e.Location.Z ?? 0),
			t
		);
	}
	static TestSceneLoadGender() {
		return UiBlueprintFunctionLibrary.TestLoadSceneData().IsMale;
	}
	static TestSceneSaveGender(e) {
		var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
		(t.IsMale = e), UiBlueprintFunctionLibrary.TestSaveSceneData(t);
	}
	static IsUseTempData() {
		return UiBlueprintFunctionLibrary.TestLoadSceneData().UseTemp;
	}
	static GetLocalGameDataPath() {
		return (
			UE.BlueprintPathsLibrary.ProjectDir() +
			"../Config/Raw/Tables/k.可视化编辑/__Temp__/EditorStartConfig.json"
		);
	}
	static TestLoadSceneData() {
		var e,
			t,
			a = UiBlueprintFunctionLibrary.GetLocalGameDataPath();
		return UE.BlueprintPathsLibrary.FileExists(a)
			? ((t = ((e = ""), puerts_1.$ref)("")),
				UE.KuroStaticLibrary.LoadFileToString(t, a)
					? ((e = (0, puerts_1.$unref)(t)),
						void 0 === (t = Json_1.Json.Parse(e))
							? (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Temp",
										9,
										"读取本地文件配置失败, 反序列化失败",
									),
								this.TestSaveSceneData())
							: t)
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error("Temp", 9, "读取本地文件配置失败", ["path", a]),
						this.TestSaveSceneData()))
			: this.TestSaveSceneData();
	}
	static TestSaveSceneData(e = void 0) {
		let t;
		var a;
		return (
			e
				? (t = e)
				: (((t = new Object()).IsBornAtCamera = !1),
					(t.Account = `${PublicUtil_1.PublicUtil.GetLocalHost()}[${TimeUtil_1.TimeUtil.DateFormat(new Date())}]`),
					(t.IsNetMode = !1),
					(t.IsMale = !1),
					(t.UseTemp = !1)),
			void 0 === (e = Json_1.Json.Stringify(t))
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Temp", 9, "localGameData反序列化失败")
				: ((a = UiBlueprintFunctionLibrary.GetLocalGameDataPath()),
					UE.KuroStaticLibrary.SaveStringToFile(e, a)),
			t
		);
	}
	static RefreshInputTag() {
		InputDistributeController_1.InputDistributeController.RefreshInputTag();
	}
	static IsPlayerLookAtCameraInPhoto() {
		return PhotographController_1.PhotographController.IsPlayerLookAtCamera();
	}
	static IsOpenPhotograph() {
		return PhotographController_1.PhotographController.IsOpenPhotograph();
	}
	static GetTopViewName() {
		let e = "None Normal / Pop View";
		var t;
		return (
			void 0 !==
				UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal) &&
				((t = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal).Info
					.Name),
				(t = UiViewStorage_1.UiViewStorage.GetUiTsInfo(t).ResourceId),
				(e =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(
						t,
					).Path)),
			void 0 !== UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop) &&
				((t = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop).Info
					.Name),
				(t = UiViewStorage_1.UiViewStorage.GetUiTsInfo(t).ResourceId),
				(e =
					ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(
						t,
					).Path)),
			e
		);
	}
	static SetUiStartSequenceFrame(e) {
		UiSceneManager_1.UiSceneManager.SetUiStartSequenceFrame(e);
	}
	static SetUiEndSequenceFrame(e) {
		UiSceneManager_1.UiSceneManager.SetUiEndSequenceFrame(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame,
			);
	}
	static GetUiWeaponBreachLevel() {
		return ModelManager_1.ModelManager.WeaponModel.BlueprintWeaponBreachLevel;
	}
	static GetWeaponViewName() {
		return ModelManager_1.ModelManager.WeaponModel.GetCurSelectViewName();
	}
	static IsGamepadNow() {
		return ModelManager_1.ModelManager.PlatformModel.IsGamepad();
	}
	static IsMobileNow() {
		return ModelManager_1.ModelManager.PlatformModel.IsMobile();
	}
	static IsLongPressExploreButton() {
		return ModelManager_1.ModelManager.BattleUiModel.IsLongPressExploreButton;
	}
	static ShowGenericPrompt(e) {
		ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
			e,
		);
	}
}
((exports.UiBlueprintFunctionLibrary = UiBlueprintFunctionLibrary).TimerId =
	void 0),
	(UiBlueprintFunctionLibrary.CheckReLogin = () => {
		ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
			LoginDefine_1.ELoginStatus.Init,
		) &&
			TimerSystem_1.TimerSystem.Delay(() => {
				ModelManager_1.ModelManager.LoginModel.CleanLoginFailCount(
					LoginDefine_1.ECleanFailCountWay.TestLogin,
				),
					LoginController_1.LoginController.GetHttp(!0);
			}, TimeUtil_1.TimeUtil.InverseMillisecond);
	}),
	(UiBlueprintFunctionLibrary.CheckWorldDone = () => {
		ModelManager_1.ModelManager.GameModeModel.WorldDone &&
			(EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetGmIsOpen, !0),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.LoginStatusChange,
				UiBlueprintFunctionLibrary.CheckReLogin,
			),
			TimerSystem_1.TimerSystem.Remove(UiBlueprintFunctionLibrary.TimerId),
			(UiBlueprintFunctionLibrary.TimerId = void 0));
	}),
	(exports.default = UiBlueprintFunctionLibrary);
