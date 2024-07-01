"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginController = void 0);
const cpp_1 = require("cpp"),
	UE = require("ue"),
	AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
	Json_1 = require("../../../Core/Common/Json"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Http_1 = require("../../../Core/Http/Http"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
	HotPatchLogReport_1 = require("../../../Launcher/HotPatchLogReport"),
	HotFixSceneManager_1 = require("../../../Launcher/Ui/HotFix/HotFixSceneManager"),
	LanguageUpdateManager_1 = require("../../../Launcher/Update/LanguageUpdateManager"),
	LauncherStorageLib_1 = require("../../../Launcher/Util/LauncherStorageLib"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	PackageConfigUtil_1 = require("../../Common/PackageConfigUtil"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	CrashCollectionController_1 = require("../../CrashCollection/CrashCollectionController"),
	GameUtils_1 = require("../../GameUtils"),
	GlobalData_1 = require("../../GlobalData"),
	KuroPushController_1 = require("../../KuroPushSdk/KuroPushController"),
	KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
	UiBlueprintFunctionLibrary_1 = require("../BpBridge/UiBlueprintFunctionLibrary"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	CursorController_1 = require("../Cursor/CursorController"),
	LogReportController_1 = require("../LogReport/LogReportController"),
	LogReportDefine_1 = require("../LogReport/LogReportDefine"),
	PlatformController_1 = require("../Platform/PlatformController"),
	ReconnectDefine_1 = require("../ReConnect/ReconnectDefine"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	UiLoginSceneManager_1 = require("../UiComponent/UiLoginSceneManager"),
	LoginDefine_1 = require("./Data/LoginDefine"),
	Heartbeat_1 = require("./Heartbeat"),
	HeartbeatDefine_1 = require("./HeartbeatDefine"),
	LoginModel_1 = require("./LoginModel"),
	VERIFY_CONFIG_VERSION_INTERVAL = 9e4;
class HttpResult extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.code = 0),
			(this.token = ""),
			(this.host = ""),
			(this.port = 0),
			(this.userData = 0),
			(this.errMessage = ""),
			(this.sex = 0);
	}
}
class LoginController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		var e = new Array();
		return (
			e.push(111),
			e.push(103),
			e.push(21988),
			e.push(101),
			e.push(105),
			e.push(107),
			Net_1.Net.InitCanTimerOutMessage(e),
			AudioSystem_1.AudioSystem.SetRtpcValue(
				"time_local",
				new Date().getHours(),
			),
			this.vvi(),
			LogAnalyzer_1.LogAnalyzer.SetP4Version(
				LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
					LauncherStorageLib_1.ELauncherStorageGlobalKey.PatchP4Version,
				),
			),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					3,
					"ConfigVersion",
					[
						"PublicJsonVersion",
						ModelManager_1.ModelManager.LoginModel.PublicJsonVersion,
					],
					[
						"PublicMiscVersion",
						ModelManager_1.ModelManager.LoginModel.PublicMiscVersion,
					],
					[
						"PublicUniverseEditorVersion",
						ModelManager_1.ModelManager.LoginModel.PublicUniverseEditorVersion,
					],
				),
			!0
		);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.UiManagerInit,
			LoginController.Mvi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ExitGamePush,
				LoginController.Svi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnGetPlayerBasicInfo,
				LoginController.Wpi,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.TimeValidError,
				LoginController.i9s,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.UiManagerInit,
			LoginController.Mvi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ExitGamePush,
				LoginController.Svi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnGetPlayerBasicInfo,
				LoginController.Wpi,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.TimeValidError,
				LoginController.i9s,
			),
			this.m9s();
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(110, LoginController.Evi);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(110);
	}
	static yvi(e) {
		if (
			(Heartbeat_1.Heartbeat.StopHeartBeat(
				HeartbeatDefine_1.EStopHeartbeat.LogoutNotify,
			),
			Net_1.Net.Disconnect(0),
			ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
				LoginDefine_1.ELoginStatus.Init,
			),
			e.Kms === Protocol_1.Aki.Protocol.lkn.Proto_AccountIsBlocked)
		) {
			var o;
			1 === e.gAs &&
				((n =
					ConfigManager_1.ConfigManager.ReportConfig?.GetBanInfoByTypeAndReason(
						2,
						e.fAs.V5n,
					)),
				(r =
					MathUtils_1.MathUtils.LongToNumber(e.fAs.lfs) -
					TimeUtil_1.TimeUtil.GetServerTime()),
				(o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(161)),
				(r = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(r)) &&
					((n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						n.BanDescribe,
					)),
					o.SetTextArgs(n, r.CountDownText ?? "")),
				o.FunctionMap.set(1, () => {
					ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
						ReconnectDefine_1.ELogoutReason.LogoutNotify,
					);
				}),
				o.FunctionMap.set(2, () => {
					ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(
						0,
					);
				}),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					o,
				));
		} else {
			var n = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
				e.Kms,
			);
			let o = 10;
			e.Kms ===
				Protocol_1.Aki.Protocol.lkn.Proto_ErrCheckClientVersionNeedUpdate &&
				(o = 185);
			var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o);
			r.SetTextArgs(n),
				r.FunctionMap.set(1, () => {
					ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
						ReconnectDefine_1.ELogoutReason.LogoutNotify,
					);
				}),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
					r,
				);
		}
		ModelManager_1.ModelManager.LoginModel.LogoutNotify = void 0;
	}
	static OpenLoginView() {
		ModelManager_1.ModelManager.KuroSdkModel.ReportedInitState ||
			(KuroSdkReport_1.KuroSdkReport.Report(
				new KuroSdkReport_1.SdkReportGameInitFinish(void 0),
			),
			(ModelManager_1.ModelManager.KuroSdkModel.ReportedInitState = !0)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					17,
					"LoginProcedure-OpenLoginView-更换PlayerController，初始化登录场景",
				),
			ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
				LoginDefine_1.ELoginStatus.Init,
			);
		var e = UE.GameplayStatics.GetPlayerController(
				GlobalData_1.GlobalData.World,
				0,
			).GetViewTarget(),
			o = e.K2_GetActorLocation(),
			n = e.K2_GetActorRotation(),
			r = e.CameraComponent.FieldOfView;
		void 0 !== e &&
			void 0 !== r &&
			void 0 !==
				(e =
					CameraController_1.CameraController.WidgetCamera.DisplayComponent
						.CineCamera) &&
			(e.CameraComponent.SetFieldOfView(r),
			e.K2_SetActorLocationAndRotation(o, n, !1, void 0, !0),
			e.GetCineCameraComponent().SetFilmbackPresetByName("16:9 DSLR")),
			UE.GameplayStatics.GetGameMode(
				GlobalData_1.GlobalData.World,
			).ChangePlayerController(UE.BP_StartupPlayerController_C.StaticClass()),
			CursorController_1.CursorController.InitMouseByMousePos(),
			HotFixSceneManager_1.HotFixSceneManager.SetViewTarget(
				GlobalData_1.GlobalData.World,
			),
			UiLoginSceneManager_1.UiLoginSceneManager.InitCinematicTick(),
			UiLoginSceneManager_1.UiLoginSceneManager.InitRoleObservers(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					17,
					"LoginProcedure-OpenLoginView-加载进入登录的镜头",
				),
			UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(
				"LevelSequence_Back",
				() => {
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Login",
							17,
							"LoginProcedure-OpenLoginView-播放镜头结束，显示登录UI",
						),
						LoginController.Ivi(),
						UiLoginSceneManager_1.UiLoginSceneManager.PlayLoginLoopSequence();
				},
				!1,
				() => {
					CameraController_1.CameraController.EnterCameraMode(2, 0.1),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Login",
								17,
								"LoginProcedure-OpenLoginView-播放进入登录的镜头(拉远)",
							);
				},
			);
	}
	static CreateCharacterViewToLoginView() {
		UiManager_1.UiManager.IsViewOpen("CreateCharacterView") &&
			UiManager_1.UiManager.CloseView("CreateCharacterView"),
			BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(
				"Start",
				"CreateCharacterViewToLoginView",
			).then(() => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Login",
						17,
						"CreateCharacterViewToLoginView - 播放镜头结束，显示登录UI",
					),
					LoginController.Ivi(),
					UiLoginSceneManager_1.UiLoginSceneManager.PlayLoginLoopSequence(),
					BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
						"Close",
						"CreateCharacterViewToLoginView",
					);
			});
	}
	static Tvi() {
		var e = ModelManager_1.ModelManager.LoginModel.GetAccount(),
			o = ModelManager_1.ModelManager.LoginModel.GetServerIp(),
			n = ModelManager_1.ModelManager.LoginModel.TryGetRealServerPort(),
			r = ModelManager_1.ModelManager.LoginModel.SetRpcHttp(
				LoginController.Lvi,
				13e3,
			);
		e = encodeURIComponent(e);
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 11, "尝试登陆目标IP", ["IP", o], ["Port", n]),
			!ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk())
		) {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 17, "LoginProcedure-Http-非SDK环境");
			return (
				(o.startsWith("http") ? o : `http://${o}:` + n) +
				`/api/login?loginType=0&userId=${e}&userName=${e}&token=1&userData=${r}&loginTraceId=` +
				ModelManager_1.ModelManager.LoginModel.LoginTraceId
			);
		}
		if (
			!(o = BaseConfigController_1.BaseConfigController.GetLoginServers()) ||
			0 === o.length
		)
			return (
				(e = PackageConfigUtil_1.PackageConfigUtil.GetPackageConfigOrDefault(
					LoginModel_1.STREAM,
				)),
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Login",
						11,
						"LoginServers获取失败, 检查CDN是否正常",
						["stream", e],
					),
				""
			);
		if (
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
			ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
		)
			return this.Dvi();
		e = Number(
			"" !==
				BaseConfigController_1.BaseConfigController.GetPublicValue(
					"DefaultIpIndex",
				)
				? BaseConfigController_1.BaseConfigController.GetPublicValue(
						"DefaultIpIndex",
					)
				: 0,
		);
		let t = 0;
		if (
			((e = o[(t = o.length > e ? e : t)].ip),
			StringUtils_1.StringUtils.IsEmpty(e))
		)
			return (
				(a = PackageConfigUtil_1.PackageConfigUtil.GetPackageConfigOrDefault(
					LoginModel_1.STREAM,
				)),
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Login", 11, "sdkIp获取失败, 检查CDN是否正常", [
						"stream",
						a,
					]),
				""
			);
		ModelManager_1.ModelManager.LoginModel.SetServerName(o[t].name),
			ModelManager_1.ModelManager.LoginModel.SetServerId(
				void 0 === o[t].id ? "0" : o[t].id,
			);
		o = (a = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()).Uid;
		var i = a.UserName,
			a = a.Token,
			g = UE.KuroStaticLibrary.HashStringWithSHA1(a),
			l = UE.KuroSDKManager.GetBasicInfo()?.DeviceId ?? "0";
		const L = e.startsWith("http") ? e : `http://${e}:` + n;
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					17,
					"LoginProcedure-Http-SDK环境",
					["uId", o],
					["userName", i],
					["token", g],
					["userData", r],
					["deviceId", l],
				),
			L +
				`/api/login?loginType=1&userId=${o}&userName=${i}&token=${a}&userData=${r}&deviceId=${l}&loginTraceId=` +
				ModelManager_1.ModelManager.LoginModel.LoginTraceId
		);
	}
	static Dvi() {
		var e =
				ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData.ip,
			o = ModelManager_1.ModelManager.LoginModel.SetRpcHttp(
				LoginController.Lvi,
				13e3,
			),
			n = (t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()).Uid,
			r = t.UserName,
			t = t.Token,
			i = UE.KuroStaticLibrary.HashStringWithSHA1(t),
			a = UE.KuroSDKManager.GetBasicInfo()?.DeviceId ?? "0";
		e = e.startsWith("http") ? e : `http://${e}:5500`;
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					17,
					"LoginProcedure-Http-GlobalSDK环境",
					["uId", n],
					["userName", r],
					["token", i],
					["userData", o],
					["deviceId", a],
				),
			e +
				`/api/login?loginType=1&userId=${n}&userName=${r}&token=${t}&userData=${o}&deviceId=` +
				a
		);
	}
	static ConnectServer(e, o, n) {
		var r,
			t = Json_1.Json.Parse(o);
		void 0 === t
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Login",
						9,
						"服务器返回http结果反序列化失败!",
						["result", o],
						["httpCode", e],
					),
				LoginController.LogLoginProcessLink(
					LoginDefine_1.ELoginStatus.LoginHttpRet,
					Protocol_1.Aki.Protocol.lkn.Proto_HttpResultUndefine,
				))
			: (GameUtils_1.GameUtils.CreateStat("Login-CleanRpcHttp"),
				(o = ModelManager_1.ModelManager.LoginModel.CleanRpcHttp(t.userData)),
				(r = UE.KuroStaticLibrary.HashStringWithSHA1(t.token)),
				o
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Login",
								17,
								"LoginProcedure-Http-登录http请求返回",
								["Token", r],
								["Host", t.host],
								["Port", t.port],
								["Code", t.code],
								["rpcId", t.userData],
								["errMessage", t.errMessage],
								["hasRpc", o],
								["httpCode", e],
							),
						LoginController.Rvi(t.code, t.errMessage)
							? (void 0 !== t.sex &&
									ModelManager_1.ModelManager.LoginModel.SetPlayerSex(t.sex),
								ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
									LoginDefine_1.ELoginStatus.LoginHttpRet,
								),
								LoginController.LogLoginProcessLink(
									LoginDefine_1.ELoginStatus.LoginHttpRet,
								),
								LoginController.Uvi(t.token, t.host, t.port, n).then((e) => {
									LoginController.DisConnect(e), e && LoginController.d9s();
								}, LoginController.Avi))
							: (Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Login",
										17,
										"http请求返回状态错误",
										["Token", r],
										["Host", t.host],
										["Port", t.port],
										["Code", t.code],
										["rpcId", t.userData],
										["errMessage", t.errMessage],
										["hasRpc", o],
										["httpCode", e],
									),
								Log_1.Log.CheckError() &&
									Log_1.Log.Error(
										"Login",
										17,
										"http请求返回状态错误",
										["Token", r],
										["Host", t.host],
										["Port", t.port],
										["Code", t.code],
										["rpcId", t.userData],
										["errMessage", t.errMessage],
										["hasRpc", o],
										["httpCode", e],
									),
								ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
									LoginDefine_1.ELoginStatus.Init,
								),
								LoginController.LogLoginProcessLink(
									LoginDefine_1.ELoginStatus.LoginHttpRet,
									t.code,
								)))
					: (Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Login",
								9,
								"http请求返回超时",
								["Token", r],
								["Host", t.host],
								["Port", t.port],
								["Code", t.code],
								["rpcId", t.userData],
								["errMessage", t.errMessage],
								["hasRpc", o],
								["httpCode", e],
							),
						LoginController.LogLoginProcessLink(
							LoginDefine_1.ELoginStatus.LoginHttpRet,
							Protocol_1.Aki.Protocol.lkn.Proto_HttpTimeout,
						)));
	}
	static Rvi(e, o) {
		return (
			e === Protocol_1.Aki.Protocol.lkn.Sys ||
			(ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
			(e !== Protocol_1.Aki.Protocol.lkn.Proto_ServerMaintenance &&
				!Protocol_1.Aki.Protocol.lkn.Proto_ServerNotOpen) ||
				(e === Protocol_1.Aki.Protocol.lkn.Proto_ServerMaintenance
					? this.GetAndShowStopServerNotice()
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenLoginStatusCodeTipView(
							e,
						)),
			!1)
		);
	}
	static async Uvi(e, o, n, r) {
		GameUtils_1.GameUtils.CreateStat("Login-ConnectGateWay"),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					17,
					"LoginProcedure-连接网关",
					["token", e],
					["host", o],
					["port", n],
					["isSmokeTest", r],
				);
		let t = await LoginController.Pvi(e, o, n);
		if (!t) return t;
		if (
			(GameUtils_1.GameUtils.CreateStat("Login-AskProtoKey"),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 17, "LoginProcedure-请求密钥"),
			!(t = await LoginController.xvi()))
		)
			return t;
		if (
			(GameUtils_1.GameUtils.CreateStat("Login-LoginRequest"),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 17, "LoginProcedure-LoginRequest"),
			!(t = await LoginController.wvi(e)))
		)
			return t;
		if (ModelManager_1.ModelManager.LoginModel.GetHasCharacter()) {
			if (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Login", 17, "LoginProcedure-已有角色, 跳过创角"),
				ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
					LoginDefine_1.ELoginStatus.EnterGameReq,
				),
				!(t = await LoginController.HandleLoginGame(r, !0)))
			)
				return t;
		} else if (
			(GameUtils_1.GameUtils.CreateStat("Login-CreateCharacterRequest"),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 17, "LoginProcedure-请求创角"),
			r)
		) {
			if (
				((o = await LoginController.CreateCharacterRequest()),
				!(t = await LoginController.HandleLoginGame(
					r,
					o === Protocol_1.Aki.Protocol.lkn.Sys,
				)))
			)
				return t;
		} else
			LoginController.IsLoginViewOpen() && LoginController.ExitLoginView(),
				UiManager_1.UiManager.OpenView("CreateCharacterView");
		return !0;
	}
	static DisConnect(e) {
		e
			? HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
					HotPatchLogReport_1.LoginLogEventDefine.EnterGame,
					"enter_game_success",
				)
			: (Net_1.Net.Disconnect(2),
				ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
					LoginDefine_1.ELoginStatus.Init,
				),
				HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
					HotPatchLogReport_1.LoginLogEventDefine.EnterGame,
					"enter_game_failed",
				));
	}
	static async HandleLoginGame(e, o) {
		var n = await LoginController.EnterGameAsync();
		return (
			e
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Login",
							11,
							"冒烟测试登录流程",
							["登录结果", o],
							["EnterGame结果", n],
						),
					n || LoginController.IsLoginViewOpen() || LoginController.Ivi())
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Login",
							11,
							"正常登录流程",
							["登录结果", o],
							["EnterGame结果", n],
						),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.LoginRequestResult,
						n,
					)),
			n
		);
	}
	static async Pvi(e, o, n) {
		ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
			LoginDefine_1.ELoginStatus.ConvGate,
		),
			LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ConvGate),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 9, "登录网关", ["host", o], ["port", n]);
		var r = await Net_1.Net.ConnectAsync(o, n, 3e3, 3);
		return 0 !== r
			? (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByTextId(
					"ConnectGateWayFail",
				),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Login", 31, "登录网关失败！", ["result", r]),
				LoginController.LogLoginProcessLink(
					LoginDefine_1.ELoginStatus.ConvRet,
					Protocol_1.Aki.Protocol.lkn.Proto_ConvGateTimeout,
				),
				!1)
			: (ModelManager_1.ModelManager.LoginModel.SetReconnectInfo(e, o, n),
				ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
					LoginDefine_1.ELoginStatus.ConvRet,
				),
				LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ConvRet),
				!0);
	}
	static Bvi() {
		var e;
		return UE.KuroStaticLibrary.IsModuleLoaded("KuroTDM")
			? "CN" !==
				BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Login", 28, "海外sdk不使用tdm"),
					"")
				: (e = UE.TDMStaticLibrary.GetDeviceInfo()).includes("Error")
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Login", 28, "TDMStaticLibrary获取设备信息失败", [
								"tdm",
								e,
							]),
						"")
					: e
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Login", 28, "TDMStaticLibrary模块未加载"),
				"");
	}
	static async wvi(e) {
		ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
			LoginDefine_1.ELoginStatus.LoginReq,
		);
		var o = new Protocol_1.Aki.Protocol.mis(),
			n =
				(ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
					? (o.s6n =
							ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid)
					: (o.s6n = ModelManager_1.ModelManager.LoginModel.GetAccount()),
				(o.a6n = e),
				this.vvi(),
				(o.h6n = UE.KuroLauncherLibrary.GetAppVersion()),
				(o.l6n = ModelManager_1.ModelManager.LoginModel.LauncherVersion),
				(o._6n = ModelManager_1.ModelManager.LoginModel.ResourceVersion),
				(o.u6n =
					PlatformController_1.PlatformController.PackageClientBasicInfo()),
				(o.c6n = new Protocol_1.Aki.Protocol.c6n()),
				(o.c6n.m6n = NetDefine_1.CONFIG_MD5_VALUE),
				(o.c6n.d6n = NetDefine_1.CONFIG_VERSION),
				(o.c6n.C6n = NetDefine_1.PROTO_MD5_VALUE),
				(o.c6n.g6n = NetDefine_1.PROTO_SEED_MD5_VALUE),
				(o.c6n.f6n = NetDefine_1.PROTO_VERSION),
				BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
					"Stream",
				));
		(o.c6n.p6n = n),
			(o.J4s =
				await KuroPushController_1.KuroPushController.GetPushNotiPermissionEnableState()),
			(o.b6s = KuroPushController_1.KuroPushController.GetClientId()),
			(o.v6n = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? ""),
			(o.M6n = new Protocol_1.Aki.Protocol.M6n());
		let r = !1,
			t = !1;
		return (
			2 === ModelManager_1.ModelManager.PlatformModel.PlatformType
				? ((r = UE.KuroStaticAndroidLibrary.GetDeviceIsRooted()),
					(t = UE.KuroStaticAndroidLibrary.GetDeviceIsEmulator()))
				: 1 === ModelManager_1.ModelManager.PlatformModel.PlatformType &&
					(r = UE.KuroStaticiOSLibrary.GetDeviceJailbroken()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					28,
					"获取ACE信息",
					["ifRoot", r],
					["ifSimulator", t],
				),
			(o.M6n.S6n = r),
			(o.M6n.E6n = t),
			(n = this.Bvi()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 28, "设备信息", ["tdm", n]),
			(o.M6n.y6n = n),
			LoginController.bvi() &&
				((o.I6n = Protocol_1.Aki.Protocol.I6n.create()),
				(o.I6n.T6n = ModelManager_1.ModelManager.LoginModel.PublicJsonVersion),
				(o.I6n.L6n = ModelManager_1.ModelManager.LoginModel.PublicMiscVersion),
				(o.I6n.D6n =
					ModelManager_1.ModelManager.LoginModel.PublicUniverseEditorVersion)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					17,
					"LoginProcedure-LoginRequest-请求登录",
					["account", o.s6n],
					["token", o.a6n],
					["AppVersion", o.h6n],
					["LauncherVersion", o.l6n],
					["ResourceVersion", o._6n],
					["ClientBasicInfo", o.u6n],
					["ConfigMd5", NetDefine_1.CONFIG_MD5_VALUE],
					["ConfigVersion", NetDefine_1.CONFIG_VERSION],
					["ProtoMd5", NetDefine_1.PROTO_MD5_VALUE],
					["ProtoSeedMd5", NetDefine_1.PROTO_SEED_MD5_VALUE],
					["ProtoVersion", NetDefine_1.PROTO_VERSION],
				),
			(n = await LoginController.qvi(o)),
			n?.Kms === Protocol_1.Aki.Protocol.lkn.Proto_ServerFullLoadGate
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Login",
							17,
							"LoginProcedure-LoginRequest-ServerFullLoadGate",
						),
					(await LoginController.Gvi(n.o6n, n.n6n, n.cAs))
						? LoginController.wvi(e)
						: (ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
								LoginDefine_1.ELoginStatus.Init,
							),
							!1))
				: ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
							LoginDefine_1.ELoginStatus.LoginRet,
						)
					? (UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView") &&
							(await UiManager_1.UiManager.CloseViewAsync(
								"LoginQueueTipsView",
							)),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.LoginSuccess,
							o.s6n,
						),
						Heartbeat_1.Heartbeat.BeginHeartBeat(
							HeartbeatDefine_1.EBeginHeartbeat.GetLoginResponse,
						),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Login",
								17,
								"LoginProcedure-LoginRequest-登录成功",
							),
						!0)
					: (Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Login",
								9,
								"请求登录失败",
								["account", o.s6n],
								["token", o.a6n],
							),
						!1)
		);
	}
	static async xvi() {
		var e;
		return (
			ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
				LoginDefine_1.ELoginStatus.ProtoKeyReq,
			),
			LoginController.LogLoginProcessLink(
				LoginDefine_1.ELoginStatus.ProtoKeyReq,
			),
			(e =
				(((e = new Protocol_1.Aki.Protocol.Eis()).W4n = !0),
				(e.A6n = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? ""),
				Net_1.Net.ChangeState1(),
				await Net_1.Net.CallAsync(111, e, 3e3)))
				? (Net_1.Net.SetDynamicProtoKey(e.Ikn, e.Ckn),
					ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
						LoginDefine_1.ELoginStatus.ProtoKeyRet,
					),
					LoginController.LogLoginProcessLink(
						LoginDefine_1.ELoginStatus.ProtoKeyRet,
					),
					!0)
				: (LoginController.LogLoginProcessLink(
						LoginDefine_1.ELoginStatus.ProtoKeyRet,
						Protocol_1.Aki.Protocol.lkn.Proto_ProtoKeyTimeout,
					),
					!1)
		);
	}
	static async qvi(e, o = 0) {
		var n = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
		if (
			n !== LoginDefine_1.ELoginStatus.Init &&
			n !== LoginDefine_1.ELoginStatus.LoginRet
		) {
			if (
				(LoginController.LogLoginProcessLink(
					LoginDefine_1.ELoginStatus.LoginReq,
				),
				(n = await Net_1.Net.CallAsync(103, e, 13e3)))
			)
				return (
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"Login",
							17,
							"LoginProcedure-LoginRequest-Response",
							["Code", n.Kms],
						),
					(ModelManager_1.ModelManager.LoginModel.Platform = n.U6n),
					Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Login", 10, "当前登录的游戏服务器节点：", [
							"response.Platform",
							n.U6n,
						]),
					n.Kms === Protocol_1.Aki.Protocol.lkn.Proto_LoginRetry
						? (LoginController.LogLoginProcessLink(
								LoginDefine_1.ELoginStatus.LoginRet,
								n.Kms,
							),
							5 <= o ? n : await LoginController.qvi(e, o + 1))
						: (n.Kms === Protocol_1.Aki.Protocol.lkn.Proto_AppVersionNotMatch ||
							n.Kms ===
								Protocol_1.Aki.Protocol.lkn.Proto_LauncherVersionIsTooLow ||
							n.Kms ===
								Protocol_1.Aki.Protocol.lkn.Proto_ResourceVersionIsTooLow
								? (ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
										LoginDefine_1.ELoginStatus.Init,
									),
									(e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
										54,
									)).FunctionMap.set(1, LoginController.Nvi),
									ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
										e,
									),
									LoginController.LogLoginProcessLink(
										LoginDefine_1.ELoginStatus.LoginRet,
										n.Kms,
									))
								: ((o =
										n.Kms ===
										Protocol_1.Aki.Protocol.lkn.Proto_HaveNoCharacter),
									ModelManager_1.ModelManager.LoginModel.SetHasCharacter(!o),
									o || n.Kms === Protocol_1.Aki.Protocol.lkn.Sys
										? (TimeUtil_1.TimeUtil.SetServerTimeStamp(n.tDs),
											(e = Number(MathUtils_1.MathUtils.LongToBigInt(n.tDs))),
											cpp_1.FuncOpenLibrary.SetFirstTimestamp(e / 1e3),
											ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
												LoginDefine_1.ELoginStatus.LoginRet,
											),
											LoginController.LogLoginProcessLink(
												LoginDefine_1.ELoginStatus.LoginRet,
											),
											ModelManager_1.ModelManager.LoginModel.SetReconnectToken(
												n.R6n,
											))
										: (LoginController.LogLoginProcessLink(
												LoginDefine_1.ELoginStatus.LoginRet,
												n.Kms,
											),
											n.Kms !==
												Protocol_1.Aki.Protocol.lkn.Proto_ServerFullLoadGate &&
												(ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
												ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
													LoginDefine_1.ELoginStatus.Init,
												),
												ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
													n.Kms,
													104,
												)))),
							n)
				);
			LoginController.LogLoginProcessLink(
				LoginDefine_1.ELoginStatus.LoginRet,
				Protocol_1.Aki.Protocol.lkn.Proto_LoginReqTimeout,
			);
		}
	}
	static async CreateCharacterRequest() {
		ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
			LoginDefine_1.ELoginStatus.CreateReq,
		);
		var e = ModelManager_1.ModelManager.LoginModel.GetPlayerSex(),
			o = ModelManager_1.ModelManager.LoginModel.GetPlayerName(),
			n = new Protocol_1.Aki.Protocol.cis();
		return (e =
			((n.x6n = e),
			(n.e4n = o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 9, "请求创角", ["Sex", n.x6n], ["Name", n.e4n]),
			LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.CreateReq),
			await Net_1.Net.CallAsync(101, n, 13e3)))
			? ((o = e?.Kms) === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord ||
				o === Protocol_1.Aki.Protocol.lkn.Proto_ErrRoleInvalidNameLength
					? LoginController.LogLoginProcessLink(
							LoginDefine_1.ELoginStatus.CreateRet,
							o,
						)
					: o !== Protocol_1.Aki.Protocol.lkn.Sys
						? (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
							ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.Kms,
								102,
							),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info(
									"Login",
									9,
									"请求创角失败",
									["Sex", n.x6n],
									["Name", n.e4n],
								),
							LoginController.LogLoginProcessLink(
								LoginDefine_1.ELoginStatus.CreateRet,
								o,
							))
						: (ModelManager_1.ModelManager.LoginModel.SetCreatePlayerTime(
								e.BRs,
							),
							ModelManager_1.ModelManager.LoginModel.SetCreatePlayerId(e.aFn),
							ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
								3,
							),
							(n = new Map()).set("101104", ""),
							KuroSdkReport_1.KuroSdkReport.Report(
								new KuroSdkReport_1.SdkReportCreateRole(n),
							),
							ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
								LoginDefine_1.ELoginStatus.CreateRet,
							),
							LoginController.LogLoginProcessLink(
								LoginDefine_1.ELoginStatus.CreateRet,
							),
							ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
								LoginDefine_1.ELoginStatus.EnterGameReq,
							)),
				o)
			: ((e = Protocol_1.Aki.Protocol.lkn.Proto_CreateCharacterReqTimeout),
				ModelManager_1.ModelManager.LoginModel?.IsLoginStatus(
					LoginDefine_1.ELoginStatus.Init,
				) ||
					(ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"CreateCharacterTimeoutTip",
					),
					LoginController.LogLoginProcessLink(
						LoginDefine_1.ELoginStatus.CreateRet,
						e,
					),
					LoginController.DisConnect(!1),
					LoginController.Ovi()),
				e);
	}
	static SetIfFirstTimeLogin() {
		ModelManager_1.ModelManager.LoginModel.SetTodayFirstTimeLogin(
			LoginController.kvi(),
		),
			ModelManager_1.ModelManager.LoginModel.SetLastLoginTime(
				TimeUtil_1.TimeUtil.GetServerTime(),
			);
	}
	static kvi() {
		var e,
			o,
			n = ModelManager_1.ModelManager.LoginModel.GetLastLoginTime();
		return (
			TimeUtil_1.TimeUtil.GetServerTime() - n >=
				TimeUtil_1.TimeUtil.OneDaySeconds ||
			!n ||
			((e = TimeUtil_1.TimeUtil.GetServerTime()),
			(o = new Date().setHours(4, 0, 0, 0) / 1e3),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 28, "当前时间", ["time", e]),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 28, "之前时间", ["time", n]),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 28, "当天4点时间戳", ["time", o]),
			o <= e && n < o)
		);
	}
	static async Fvi() {
		var e, o;
		return (
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				((o =
					ConfigManager_1.ConfigManager.LoginConfig.GetDefaultSingleMapId()) &&
					ModelManager_1.ModelManager.LoginModel.SetSingleMapId(o),
				(o =
					ConfigManager_1.ConfigManager.LoginConfig.GetDefaultMultiMapId())) &&
				ModelManager_1.ModelManager.LoginModel.SetMultiMapId(o),
			(o =
				(((o = new Protocol_1.Aki.Protocol.gis()).P6n =
					ModelManager_1.ModelManager.LoginModel.GetSingleMapId()),
				(o.B6n = ModelManager_1.ModelManager.LoginModel.GetMultiMapId()),
				(o.w6n = ModelManager_1.ModelManager.LoginModel.BornMode),
				(o.M3n = ModelManager_1.ModelManager.LoginModel.BornLocation),
				ModelManager_1.ModelManager.LoadingModel.SetIsLoginToWorld(!0),
				LoginController.LogLoginProcessLink(
					LoginDefine_1.ELoginStatus.EnterGameReq,
				),
				Net_1.Net.ChangeStateEnterGame(),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Login", 17, "LoginProcedure-EnterGame-Call", [
						"enterGameRequest",
						o,
					]),
				await Net_1.Net.CallAsync(105, o, 13e3)))
				? o.Kms === Protocol_1.Aki.Protocol.lkn.Sys
					? (Net_1.Net.ChangeStateFinishLogin(), !0)
					: (LoginController.LogLoginProcessLink(
							LoginDefine_1.ELoginStatus.EnterGameRet,
							o.Kms,
						),
						o.Kms !== Protocol_1.Aki.Protocol.lkn.Proto_ServerFullLoadGame
							? (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
								ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									o.Kms,
									106,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info("Login", 9, "请求进入游戏失败"),
								ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
									LoginDefine_1.ELoginStatus.Init,
								),
								!1)
							: (await LoginController.Gvi(o.o6n, o.n6n, o.cAs))
								? LoginController.Fvi()
								: (ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
										LoginDefine_1.ELoginStatus.Init,
									),
									!1))
				: (Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Login", 9, "请求进入游戏失败, 超时"),
					LoginController.LogLoginProcessLink(
						LoginDefine_1.ELoginStatus.EnterGameRet,
						Protocol_1.Aki.Protocol.lkn.Proto_EnterGameTimeout,
					),
					ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
						LoginDefine_1.ELoginStatus.Init,
					),
					(o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33)),
					(e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
						Protocol_1.Aki.Protocol.lkn.Proto_LoginTimeout,
					)),
					o.SetTextArgs(e),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						o,
					),
					UiManager_1.UiManager.CloseView("NetWorkMaskView"),
					!1)
		);
	}
	static async Gvi(e, o, n) {
		var r;
		return (
			UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView") ||
				(((r = new LoginDefine_1.LoginQueueConfig()).o6n = e),
				(r.n6n = o),
				await UiManager_1.UiManager.OpenViewAsync("LoginQueueTipsView", r)),
			ModelManager_1.ModelManager.LoginModel.CreateAutoLoginPromise(),
			(ModelManager_1.ModelManager.LoginModel.AutoLoginTimerId =
				TimerSystem_1.TimerSystem.Delay(
					() => {
						ModelManager_1.ModelManager.LoginModel.FinishAutoLoginPromise(!0),
							(ModelManager_1.ModelManager.LoginModel.AutoLoginTimerId =
								void 0);
					},
					Math.max(n, TimeUtil_1.TimeUtil.InverseMillisecond),
				)),
			(e =
				await ModelManager_1.ModelManager.LoginModel.WaitAutoLoginPromise()) ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Login", 9, "玩家取消了登录排队, 不再排队")),
			ModelManager_1.ModelManager.LoginModel.ClearAutoLoginTimerId(),
			ModelManager_1.ModelManager.LoginModel.ClearAutoLoginPromise(),
			e
		);
	}
	static async EnterGameAsync() {
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 17, "LoginProcedure-EnterGame-进入游戏"),
			!!ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
				LoginDefine_1.ELoginStatus.EnterGameReq,
			) &&
				(GameUtils_1.GameUtils.CreateStat("Login-EnterGameAsync"),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Login", 17, "LoginProcedure-EnterGame-请求进入游戏"),
				(await this.Fvi())
					? (UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView") &&
							(await UiManager_1.UiManager.CloseViewAsync(
								"LoginQueueTipsView",
							)),
						ModelManager_1.ModelManager.LoginModel.CleanLoginFailCount(
							LoginDefine_1.ECleanFailCountWay.LoginSuccess,
						),
						ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
							LoginDefine_1.ELoginStatus.EnterGameRet,
						),
						LoginController.LogLoginProcessLink(
							LoginDefine_1.ELoginStatus.EnterGameRet,
						),
						(ModelManager_1.ModelManager.LoginModel.LoginTraceId = void 0),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.EnterGameSuccess,
						),
						GameUtils_1.GameUtils.CreateStat("Login-EnterGameSuccess"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Login",
								17,
								"LoginProcedure-EnterGame-进入游戏成功",
							),
						ModelManager_1.ModelManager.CreatureModel.SetGameplayTagHash(
							UE.GASBPLibrary.GetNetworkGameplayTagNodeIndexHash(),
						),
						!0)
					: (Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Login",
								17,
								"LoginProcedure-EnterGame-进入游戏失败",
							),
						!1))
		);
	}
	static CheckCanReConnect() {
		return LoginController.IsLoginViewOpen()
			? (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Login", 31, "不能重连 LoginViewOpen"),
				ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
					LoginDefine_1.ELoginStatus.Init,
				),
				!1)
			: !LoginController.Ovi() ||
					(Log_1.Log.CheckError() &&
						Log_1.Log.Error("Login", 31, "不能重连 CreateCharacterViewOpen"),
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"ConnectGateWayFail",
					),
					ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
						LoginDefine_1.ELoginStatus.Init,
					),
					!1);
	}
	static Ovi() {
		return (
			!!UiManager_1.UiManager.IsViewShow("CreateCharacterView") &&
			(UiManager_1.UiManager.CloseView("NetWorkMaskView"),
			LoginController.CreateCharacterViewToLoginView(),
			!0)
		);
	}
	static OpenSdkLoginView() {
		LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.SdkViewOpen),
			ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(0);
	}
	static ReOpenSdkLoginView() {
		ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(7);
	}
	static Vvi(e) {
		ModelManager_1.ModelManager.LoginModel.SetSdkLoginConfig(
			e.Uid,
			e.UserName,
			e.Token,
		),
			ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfo(e.Uid);
	}
	static GetAndShowStopServerNotice() {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "获得公告");
		var e = BaseConfigController_1.BaseConfigController.GetLoginServers();
		if (e && 0 !== e.length) {
			let o = e[0].id;
			ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData &&
				(o =
					ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData
						.id),
				(e =
					PublicUtil_1.PublicUtil.GetLoginNoticeUrl2(
						PublicUtil_1.PublicUtil.GetGameId(),
						LanguageSystem_1.LanguageSystem.PackageLanguage,
						o,
					) ?? ""),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Login", 9, "获取登录公告", ["http", e]),
				Http_1.Http.Get(e, void 0, this.Hvi);
		} else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("KuroSdk", 28, "没有登录服务器信息");
	}
	static jvi() {
		var e = new LoginModel_1.LoginNotice();
		(e.Title =
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"DefaultLoginTitle",
			) ?? ""),
			(e.content =
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"DefaultLoginNotice",
				) ?? ""),
			this.Wvi(e);
	}
	static Wvi(e) {
		e &&
			((ModelManager_1.ModelManager.LoginModel.LoginNotice = e),
			(e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42)).SetTitle(
				ModelManager_1.ModelManager.LoginModel.LoginNotice.Title,
			),
			e.SetTextArgs(ModelManager_1.ModelManager.LoginModel.LoginNotice.content),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
				e,
			));
	}
	static Ivi() {
		ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
			? UiManager_1.UiManager.OpenView("LoginView")
			: this.Kvi() || UiManager_1.UiManager.OpenView("LoginDebugView");
	}
	static Kvi() {
		var e, o, n;
		return (
			!!GlobalData_1.GlobalData.IsPlayInEditor &&
			!!(e = PublicUtil_1.PublicUtil.TestLoadEditorConfigData())
				?.EditorStartConfig?.IsReLoadArchive &&
			((o = e.EditorStartConfig.ArchiveAccount),
			(n = e.EditorStartConfig.DungeonId),
			(e.EditorStartConfig.IsReLoadArchive = !1),
			PublicUtil_1.PublicUtil.TestSaveEditorConfigData(e),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Login",
					43,
					"GM读取存档快速登录",
					["账号:", o],
					["副本ID:", n],
				),
			ModelManager_1.ModelManager.LoginModel.SetSingleMapId(n),
			ModelManager_1.ModelManager.LoginModel.SetAccount(o),
			LoginController.GetHttp(!0),
			!0)
		);
	}
	static IsLoginViewOpen() {
		return (
			UiManager_1.UiManager.IsViewShow("LoginView") ||
			UiManager_1.UiManager.IsViewShow("LoginDebugView")
		);
	}
	static ExitLoginView() {
		UiManager_1.UiManager.IsViewShow("LoginDebugView") &&
			UiManager_1.UiManager.CloseView("LoginDebugView"),
			UiManager_1.UiManager.IsViewShow("LoginView") &&
				UiManager_1.UiManager.CloseView("LoginView");
	}
	static LogLoginProcessLink(e, o = Protocol_1.Aki.Protocol.lkn.Sys) {
		var n = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig(),
			r = new LogReportDefine_1.LoginProcessLink();
		(r.s_trace_id = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? ""),
			(r.s_user_id = n?.Uid ?? ""),
			(r.s_user_name =
				n?.UserName ?? ModelManager_1.ModelManager.LoginModel.GetAccount()),
			(r.s_login_step = LoginDefine_1.ELoginStatus[e]),
			(r.s_app_version = UE.KuroLauncherLibrary.GetAppVersion()),
			(r.s_launcher_version = LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.LauncherPatchVersion,
				r.s_app_version,
			)),
			(r.s_resource_version = LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
				r.s_app_version,
			)),
			(r.s_client_version =
				BaseConfigController_1.BaseConfigController.GetVersionString()),
			(r.i_error_code = o),
			LogReportController_1.LogReportController.LogReport(r),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Login",
					9,
					"上报登录埋点",
					["loginStep", LoginDefine_1.ELoginStatus[e]],
					["code", o],
				);
	}
	static DevLoginWithEditorConfig() {
		PublicUtil_1.PublicUtil.SetIsSilentLogin(!0),
			UiBlueprintFunctionLibrary_1.default.SetTempLocation(
				UiBlueprintFunctionLibrary_1.default.TestSceneLoadBornLocation(),
			),
			UiBlueprintFunctionLibrary_1.default.TestSceneLogin("AkiWorld_WP");
	}
	static vvi() {
		var e = ModelManager_1.ModelManager.LoginModel,
			o =
				((e.PublicJsonVersion = Number(
					BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
						"ChangelistConfigServerDataPublicjson",
						"0",
					),
				)),
				(e.PublicMiscVersion = Number(
					BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
						"ChangelistConfigServerMisc",
						"0",
					),
				)),
				(e.PublicUniverseEditorVersion = Number(
					BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
						"ChangelistConfigServerUniverseEditorConfig",
						"0",
					),
				)),
				UE.KuroLauncherLibrary.GetAppVersion());
		(e.LauncherVersion = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.LauncherPatchVersion,
			o,
		)),
			(e.LauncherVersion = e.LauncherVersion?.length ? e.LauncherVersion : o),
			(e.ResourceVersion = LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
				o,
			)),
			(e.ResourceVersion = e.ResourceVersion?.length ? e.ResourceVersion : o);
	}
	static bvi() {
		return !GlobalData_1.GlobalData.IsPlayInEditor;
	}
	static d9s() {
		var e;
		this.bvi() &&
			((e = ModelManager_1.ModelManager.LoginModel).VerifyConfigVersionHandle &&
				(TimerSystem_1.TimerSystem.Remove(e.VerifyConfigVersionHandle),
				(e.VerifyConfigVersionHandle = void 0)),
			(e.VerifyConfigVersionHandle = TimerSystem_1.TimerSystem.Forever(
				LoginController.C9s,
				9e4,
			)));
	}
	static m9s() {
		var e;
		this.bvi() &&
			(e = ModelManager_1.ModelManager.LoginModel).VerifyConfigVersionHandle &&
			(TimerSystem_1.TimerSystem.Remove(e.VerifyConfigVersionHandle),
			(e.VerifyConfigVersionHandle = void 0));
	}
}
(exports.LoginController = LoginController),
	((_a = LoginController).Evi = (e) => {
		cpp_1.FuncOpenLibrary.SetFirstTimestamp(0),
			e.Kms === Protocol_1.Aki.Protocol.lkn.Sys
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error("Login", 9, "收到登出通知, 但没有登出原因!")
				: UiManager_1.UiManager.IsInited
					? LoginController.yvi(e)
					: (ModelManager_1.ModelManager.LoginModel.LogoutNotify = e);
	}),
	(LoginController.Wpi = () => {
		ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(2);
	}),
	(LoginController.Mvi = () => {
		ModelManager_1.ModelManager.LoginModel.GetAutoOpenLoginView() &&
			(ModelManager_1.ModelManager.LoginModel.SetAutoOpenLoginView(!1),
			LoginController.OpenLoginView()),
			ModelManager_1.ModelManager.LoginModel.LogoutNotify &&
				LoginController.yvi(
					ModelManager_1.ModelManager.LoginModel.LogoutNotify,
				),
			ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction &&
				(ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction(),
				(ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction =
					void 0));
	}),
	(LoginController.Svi = () => {
		Net_1.Net.Send(114, Protocol_1.Aki.Protocol.Tis.create()),
			LanguageUpdateManager_1.LanguageUpdateManager.StopAllDownload();
	}),
	(LoginController.GetHttp = (e = !1, o = !0) => {
		var n, r;
		ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo(),
			ModelManager_1.ModelManager.LoginModel.IsThisTimeCanLogin()
				? ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
						LoginDefine_1.ELoginStatus.Init,
					)
					? (GameUtils_1.GameUtils.CreateStat("Login-GetAccount"),
						(r = ModelManager_1.ModelManager.LoginModel.GetAccount()),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Login", 17, "获取本地保存账号", ["account", r]),
						(n = encodeURIComponent(r)),
						(n = decodeURIComponent(n)) !== r
							? Log_1.Log.CheckError() &&
								Log_1.Log.Error(
									"Login",
									9,
									"玩家账号http编码后再解码与原先不一致, 无法登录",
									["account", r],
									["accountAfterUrlDecode", n],
								)
							: (Heartbeat_1.Heartbeat.StopHeartBeat(
									HeartbeatDefine_1.EStopHeartbeat.BeforeGetToken,
								),
								ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
									LoginDefine_1.ELoginStatus.LoginHttp,
								),
								o &&
									(ModelManager_1.ModelManager.LoginModel.LoginTraceId =
										UE.KismetGuidLibrary.NewGuid().ToString()),
								GameUtils_1.GameUtils.CreateStat("Login-BuildHttp"),
								(r = LoginController.Tvi()),
								LoginController.LogLoginProcessLink(
									LoginDefine_1.ELoginStatus.LoginHttp,
								),
								CrashCollectionController_1.CrashCollectionController.RecordHttpInfo(
									r,
								),
								Log_1.Log.CheckInfo() &&
									Log_1.Log.Info(
										"Login",
										17,
										"LoginProcedure-Http-登录Http请求",
									),
								Http_1.Http.Get(r, void 0, (o, n, r) => {
									LoginController.ConnectServer(n, r, e);
								})))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("Login", 9, "正在登录中, 请勿重复操作！")
				: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"LoginFailTooManyTimes",
					);
	}),
	(LoginController.Lvi = () => {
		ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByTextId(
			"HttpTimeout",
		),
			ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(),
			ModelManager_1.ModelManager.LoginModel.SetLoginStatus(
				LoginDefine_1.ELoginStatus.Init,
			),
			LoginController.LogLoginProcessLink(
				LoginDefine_1.ELoginStatus.LoginHttpRet,
				Protocol_1.Aki.Protocol.lkn.Proto_HttpTimeout,
			);
	}),
	(LoginController.Avi = (e) => {
		e instanceof Error
			? Log_1.Log.CheckError() &&
				Log_1.Log.ErrorWithStack("Login", 9, "登录异常发生异常", e, [
					"error",
					e.message,
				])
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Login", 9, "登录异常发生异常", ["error", e ?? void 0]);
	}),
	(LoginController.OnSdkLogin = (e) => {
		1 === e.LoginCode
			? (LoginController.LogLoginProcessLink(
					LoginDefine_1.ELoginStatus.SdkLoginSuccecc,
				),
				ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(1),
				HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
					HotPatchLogReport_1.LoginLogEventDefine.SdkLogin,
					"sdk_login_success",
				),
				LoginController.Vvi(e))
			: (LoginController.LogLoginProcessLink(
					LoginDefine_1.ELoginStatus.SdkLoginFail,
				),
				ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0),
				HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
					HotPatchLogReport_1.LoginLogEventDefine.SdkLogin,
					"sdk_login_failed",
				),
				Log_1.Log.CheckWarn() && Log_1.Log.Warn("Login", 28, "Sdk登录失败!!!")),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkLoginResult);
	}),
	(LoginController.OnLogoutAccount = () => {
		var e = ModelManager_1.ModelManager.LoginModel.GetSdkLoginState();
		ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0),
			ModelManager_1.ModelManager.LoginModel.GetLoginStatus() >=
				LoginDefine_1.ELoginStatus.EnterGameRet && 0 !== e
				? ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
						ReconnectDefine_1.ELogoutReason.SdkLogoutAccount,
					)
				: (EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SdkLoginResult,
					),
					HotPatchLogReport_1.HotPatchLogReport.ReportLogin(
						HotPatchLogReport_1.LoginLogEventDefine.SdkLogin,
						"sdk_login_logout",
					));
	}),
	(LoginController.Nvi = () => {
		ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(5);
	}),
	(LoginController.Hvi = (e, o, n) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Login", 9, "获取登录公告返回", ["data", n]),
			200 === o && (o = Json_1.Json.Parse(n))
				? ((n = new LoginModel_1.LoginNotice()).Phrase(o),
					!PublicUtil_1.PublicUtil.IsInIpWhiteList(n.WhiteLists) ||
						(o = new Date().getTime() * TimeUtil_1.TimeUtil.Millisecond) <
							n.BeginTime ||
						o > n.EndTime ||
						LoginController.Wvi(n))
				: _a.jvi();
	}),
	(LoginController.C9s = () => {
		var e = ModelManager_1.ModelManager.LoginModel,
			o = Protocol_1.Aki.Protocol.s7s.create();
		(o.h6n = UE.KuroLauncherLibrary.GetAppVersion()),
			(o.l6n = e.LauncherVersion),
			(o._6n = e.ResourceVersion),
			Net_1.Net.Send(115, o);
	}),
	(LoginController.i9s = () => {
		var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"ErrorCode_100017_Text",
			),
			o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(10);
		o.SetTextArgs(e),
			o.FunctionMap.set(1, () => {
				ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
					ReconnectDefine_1.ELogoutReason.LogoutNotify,
				);
			}),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
				o,
			);
	});
