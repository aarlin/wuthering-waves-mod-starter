"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlatformSdkBase =
		exports.QueryProductSt =
		exports.SharePlatformSt =
			void 0);
const UE = require("ue"),
	ue_1 = require("ue"),
	Json_1 = require("../../../Core/Common/Json"),
	LanguageSystem_1 = require("../../../Core/Common/LanguageSystem"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../Common/PublicUtil"),
	GlobalData_1 = require("../../GlobalData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	KuroSdkData_1 = require("../KuroSdkData"),
	KuroSdkReport_1 = require("../KuroSdkReport"),
	TIMEGAP = 1e3,
	WEBVIEWCD = 5e3;
class SharePlatformSt {
	constructor() {
		(this.PlatformId = void 0), (this.IconUrl = void 0);
	}
}
exports.SharePlatformSt = SharePlatformSt;
class QueryProductSt {
	constructor() {
		(this.ChannelGoodId = void 0),
			(this.Currency = void 0),
			(this.CurrencyCode = void 0),
			(this.GoodId = void 0),
			(this.Name = void 0),
			(this.Desc = void 0),
			(this.Price = void 0);
	}
}
exports.QueryProductSt = QueryProductSt;
class PlatformSdkBase {
	constructor() {
		(this.GEe = void 0),
			(this.NEe = void 0),
			(this.LastOpenTime = 0),
			(this.OEe = 0),
			(this.FeedBackSt =
				"{0}?token={1}&svr_id={2}&uid={3}&user_name={4}&role_name={5}&role_id={6}&lang={7}"),
			(this.CurrentDid = ""),
			(this.GetSharePlatformCallBackList = new Array()),
			(this.kEe = !1),
			(this.FEe = !1),
			(this.CurrentCustomerShowState = !1),
			(this.VEe = (e) => {
				(e = 1 === e),
					ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
						e,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
					);
			});
	}
	Init() {
		this.HEe(),
			this.BindProtocolListener(),
			this.BindShareResultListener(),
			this.KuroSdkExitBindFunction(),
			this.KuroSdkBindRedPointFunction(this.VEe),
			this.jEe(),
			this.WEe(),
			this.BindSpecialEvent(),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				(UE.KuroLauncherLibrary.IsFirstIntoLauncher()
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("KuroSdk", 28, "可以使用KuroSdk!!!"),
						ue_1.KuroSDKManager.SetIfGlobalSdk(
							ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(),
						),
						this.KEe())
					: ("Android" !== UE.GameplayStatics.GetPlatformName() &&
							"IOS" !== UE.GameplayStatics.GetPlatformName()) ||
						(ue_1.KuroSDKManager.Get().LogoutDelegate.Clear(),
						this.SdkLogout())),
			(this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId);
	}
	KEe() {
		this.NEe = TimerSystem_1.TimerSystem.Forever(() => {
			this.QEe();
		}, 1e3);
	}
	QEe() {
		ue_1.KuroSDKManager.GetSdkInitState() &&
			(ue_1.KuroSDKManager.SetWindowsMode(!1),
			this.XEe(),
			ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
				16,
			),
			ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
				10,
			),
			"Windows" === UE.GameplayStatics.GetPlatformName() &&
				ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() &&
				(this.GEe = TimerSystem_1.TimerSystem.Forever(() => {
					this.$Ee();
				}, 1e3)),
			void 0 !== this.NEe &&
				(TimerSystem_1.TimerSystem.Remove(this.NEe), (this.NEe = void 0)),
			this.SetFont(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkInitDone));
	}
	OnInit() {}
	XEe() {
		ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
			ue_1.KuroSDKManager.PostSplashScreenEndSuccess();
	}
	SdkDoInit() {
		ue_1.KuroSDKManager.KuroSDKEvent(17, "");
	}
	$Ee() {
		ue_1.KuroSDKManager.GetPostWebViewInitState()
			? void 0 !== this.GEe &&
				(TimerSystem_1.TimerSystem.Remove(this.GEe), (this.GEe = void 0))
			: ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(
					10,
				);
	}
	SdkLogout() {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "游戏注销"),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				ue_1.KuroSDKManager.KuroSDKEvent(6, "");
	}
	SdkLogin() {
		this.GetProtocolState()
			? ue_1.KuroSDKManager.GetSdkInitState()
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("KuroSdk", 28, "开始进行Sdk登录!!!"),
					ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
						("Windows" !== UE.GameplayStatics.GetPlatformName() ||
						UE.KuroLauncherLibrary.IsFirstIntoLauncher()
							? ue_1.KuroSDKManager.KuroSDKEvent(0, "")
							: ue_1.KuroSDKManager.KuroSDKEvent(7, "")))
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("KuroSdk", 28, "SDK初始化未结束")
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "协议尚未初始化");
	}
	SdkKick() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("KuroSdk", 28, "响应Sdk踢人完成!!!，返回sdk"),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				(ue_1.KuroSDKManager.KuroSDKEvent(1, ""),
				(ControllerHolder_1.ControllerHolder.KuroSdkController.IsKick = !0),
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkKick));
	}
	SdkSelectRole() {
		var e;
		Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报选择角色"),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				((e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo()),
				ue_1.KuroSDKManager.KuroSDKEvent(2, e));
	}
	SdkCreateRole() {
		var e;
		Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报创建新角色"),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				((e = KuroSdkData_1.KuroSdkControllerTool.GetCreateRoleInfo()),
				ue_1.KuroSDKManager.KuroSDKEvent(3, e));
	}
	SdkLevelUpRole() {
		var e;
		Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报角色升级"),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				((e = KuroSdkData_1.KuroSdkControllerTool.GetRoleInfo()),
				ue_1.KuroSDKManager.KuroSDKEvent(4, e));
	}
	SdkExit() {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "游戏退出"),
			GlobalData_1.GlobalData.IsPlayInEditor
				? UE.KismetSystemLibrary.QuitGame(
						GlobalData_1.GlobalData.World,
						void 0,
						0,
						!1,
					)
				: ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
						(EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ExitGamePush,
						),
						3 !== ModelManager_1.ModelManager.PlatformModel.PlatformType)
					? 1 === ModelManager_1.ModelManager.PlatformModel.PlatformType ||
						(2 === ModelManager_1.ModelManager.PlatformModel.PlatformType &&
							ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk())
						? (Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("KuroSdk", 28, "直接退出"),
							UE.KuroStaticLibrary.ExitGame(!1))
						: ue_1.KuroSDKManager.KuroSDKEvent(5, "")
					: UE.KuroStaticLibrary.ExitGame(!1);
	}
	SdkOpenLoginWnd() {
		this.GetProtocolState()
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("KuroSdk", 28, "主动打开sdk登录界面"),
				ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
					(1 === ModelManager_1.ModelManager.PlatformModel.PlatformType &&
					ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
						? ue_1.KuroSDKManager.KuroSDKEvent(0, "")
						: ue_1.KuroSDKManager.KuroSDKEvent(7, "")))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "协议尚未初始化");
	}
	GetAgreement() {
		let e = new Array();
		var o,
			r = ue_1.KuroSDKManager.GetAgreementUrl();
		return (
			ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ||
				("Android" === UE.GameplayStatics.GetPlatformName()
					? Json_1.Json.Parse(r).gameInit?.forEach((o) => {
							e.push(o);
						})
					: "Windows" === UE.GameplayStatics.GetPlatformName()
						? ((o = Json_1.Json.Parse(r)), (e = o))
						: "IOS" === UE.GameplayStatics.GetPlatformName() &&
							r.split(",").forEach((o) => {
								let r = o;
								var t, n;
								2 <=
									(o = (r = (r = o.replace("{", "")).replace("}", "")).split(
										";",
									)).length &&
									((n = o[0].split("=")),
									((t = new KuroSdkData_1.SdkAgreementLinkData()).link = n[1]),
									(t.link = t.link.trimStart()),
									(t.link = t.link.trimEnd()),
									(t.link = t.link.replace(/"/g, "")),
									(n = o[1].split("=")),
									(t.title = n[1]),
									(t.title = t.title.trimStart()),
									(t.title = t.title.trimEnd()),
									(t.title = t.title.replace(/"/g, "")),
									(t.title = t.title.toLowerCase()),
									(t.title = unescape(t.title)),
									e.push(t));
							})),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "AgreementData", ["AgreementData", r]),
			e
		);
	}
	QueryProduct(e, o) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "需要模块内重写QueryProduct");
	}
	ShareByteData(e, o) {
		(e = Json_1.Json.Stringify(e)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "Share", ["json", e]),
			ue_1.KuroSDKManager.Share(o, e);
	}
	Share(e, o) {}
	ShareTexture(e, o) {}
	SdkPay(e) {
		var o;
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "SdkPay", ["SdkPay", e]),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				((o = KuroSdkData_1.KuroSdkControllerTool.GetSdkPayRoleInfo()),
				(e = KuroSdkData_1.KuroSdkControllerTool.GetPaymentInfo(e, o)),
				ue_1.KuroSDKManager.KuroSDKEvent(8, e));
	}
	GetCurrentSelectServerId() {
		var e = BaseConfigController_1.BaseConfigController.GetLoginServers();
		if (!e)
			return (
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("KuroSdk", 28, "没有登录服务器信息"),
				"0"
			);
		let o = "";
		return (
			"0" ===
				(o =
					ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
						? void 0 ===
							ModelManager_1.ModelManager.LoginServerModel
								.CurrentSelectServerData
							? "0"
							: ModelManager_1.ModelManager.LoginServerModel
									.CurrentSelectServerData.id
						: e[0].id) &&
				Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("KuroSdk", 28, "海外选服没有服务器"),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("KuroSdk", 28, "当前服务器Id", ["serverId", o]),
			o
		);
	}
	InitializePostWebView() {
		var e = this.GetCurrentSelectServerId(),
			o =
				(Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "serverId"),
				new KuroSdkData_1.InitializePostWebViewParam());
		(o.language = LanguageSystem_1.LanguageSystem.PackageLanguage),
			(o.serverId = e),
			"Windows" === UE.GameplayStatics.GetPlatformName() ||
			"Android" === UE.GameplayStatics.GetPlatformName()
				? (o.cdn = [
						PublicUtil_1.PublicUtil.GetNoticeBaseUrl() +
							"/gamenotice/" +
							PublicUtil_1.PublicUtil.GetGameId(),
					])
				: (o.cdn = [
						`${PublicUtil_1.PublicUtil.GetNoticeBaseUrl()}/gamenotice/${PublicUtil_1.PublicUtil.GetGameId()}/`,
					]),
			(e = Json_1.Json.Stringify(o));
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("KuroSdk", 28, "初始化公告", ["json", e]),
			ue_1.KuroSDKManager.KuroSDKEvent(10, e);
	}
	GetSdkOpenUrlWndInfo(e, o) {
		var r = new KuroSdkData_1.OpenSdkUrlWndParam();
		(r.title = e), (r.wndUrl = o), (e = Json_1.Json.Stringify(r));
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("KuroSdk", 28, "SdkJson", ["sdkJson", e ?? ""]),
			e
		);
	}
	OpenUserCenter() {
		ue_1.KuroSDKManager.KuroSDKEvent(13, "");
	}
	ShowAgreement() {
		ue_1.KuroSDKManager.KuroSDKEvent(15, ""),
			KuroSdkReport_1.KuroSdkReport.Report(
				new KuroSdkReport_1.SdkReportOpenPrivacy(void 0),
			);
	}
	KuroOpenPrivacyClauseWnd() {
		ue_1.KuroSDKManager.KuroSDKEvent(12, ""),
			KuroSdkReport_1.KuroSdkReport.Report(
				new KuroSdkReport_1.SdkReportOpenPrivacy(void 0),
			);
	}
	ReadProductInfo() {
		ue_1.KuroSDKManager.KuroSDKEvent(14, "");
	}
	NotifyLanguage() {
		var e = LanguageSystem_1.LanguageSystem.PackageLanguage;
		ue_1.KuroSDKManager.KuroSDKEvent(16, e);
	}
	OpenPostWebView() {
		if (0 !== this.OEe && Time_1.Time.Now - this.OEe <= 5e3)
			ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
				"InDisplayCd",
			);
		else {
			(this.OEe = Time_1.Time.Now),
				Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "打开公告");
			var e = ModelManager_1.ModelManager.FunctionModel,
				o = ModelManager_1.ModelManager.PlayerInfoModel,
				r =
					ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
						? "global"
						: "cn",
				t = new KuroSdkData_1.OpenPostWebViewParam();
			o =
				((t.playerId = void 0 === o.GetId() ? "0" : o.GetId().toString()),
				(t.playerLevel = e.GetPlayerLevel()
					? e.GetPlayerLevel().toString()
					: "1"),
				(t.language = LanguageSystem_1.LanguageSystem.PackageLanguage),
				(t.extend = "extend"),
				(t.gameOrientation = "2"),
				(t.type = r),
				Json_1.Json.Stringify(t));
			ue_1.KuroSDKManager.KuroSDKEvent(11, o);
		}
	}
	GetChannelId() {
		return "";
	}
	GetGameId() {
		return "";
	}
	GetChannelName() {
		return "";
	}
	GetAppChannelId() {
		return "";
	}
	GetDid() {
		return "";
	}
	GetOaid() {
		return "";
	}
	GetJyDid() {
		return "";
	}
	GetAccessToken() {
		return "";
	}
	GetIsQRCodeLogin() {
		return ue_1.KuroSDKManager.GetSdkIsQRScan();
	}
	QRCodeLogin() {
		ue_1.KuroSDKManager.OpenSdkQRScan();
	}
	GetIsUserCenterEnable() {
		return !0;
	}
	SetFont() {}
	IsCustomerServiceEnable() {
		return !0;
	}
	OpenCustomerService(e) {}
	OpenFeedback() {
		var e,
			o = BaseConfigController_1.BaseConfigController.GetFeedBackUrl();
		o
			? ((e = this.GetFeedBackOpenUrl()),
				ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
					? ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
							o.title,
							e,
						)
					: UE.KismetSystemLibrary.LaunchURL(e))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "CDN没有反馈配置");
	}
	GetFeedBackOpenUrl() {
		var e = BaseConfigController_1.BaseConfigController.GetFeedBackUrl().url,
			o = ModelManager_1.ModelManager.LoginModel,
			r = ModelManager_1.ModelManager.FunctionModel,
			t = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
				? o.GetSdkLoginConfig()?.Token ?? "0"
				: "0",
			n = ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
				? o.GetSdkLoginConfig()?.Uid ?? "0"
				: "0",
			l = o.GetSdkLoginConfig()?.UserName
				? o.GetSdkLoginConfig()?.UserName ?? ""
				: "";
		return StringUtils_1.StringUtils.Format(
			this.FeedBackSt,
			e,
			t,
			o.GetServerId()?.toString() ?? "",
			n,
			l,
			r.GetPlayerName()?.toString() ?? "",
			ModelManager_1.ModelManager.FunctionModel.PlayerId.toString(),
			LanguageSystem_1.LanguageSystem.PackageAudio,
		);
	}
	SdkOpenUrlWnd(e, o, r, t, n = 0) {
		if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
			if (0 !== this.LastOpenTime && Time_1.Time.Now - this.LastOpenTime <= 5e3)
				return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"InDisplayCd",
				);
			(this.LastOpenTime = Time_1.Time.Now),
				(e = this.GetSdkOpenUrlWndInfo(e, o)),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("KuroSdk", 28, "OpenUrl", ["info", e]),
				ue_1.KuroSDKManager.KuroSDKEvent(9, e ?? "");
		}
	}
	OpenWebView(e, o, r, t, n) {
		var l = ModelManager_1.ModelManager.PlatformModel.PlatformType;
		1 === l
			? ue_1.KuroSDKManager.OpenWebView(o, e, r, t, n, "")
			: 2 === l &&
					ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
				? ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
						e,
						o,
					)
				: ue_1.KuroSDKManager.OpenWebView(e, o, r, t, n, "");
	}
	KuroSdkLoginBindFunction(e) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "绑定登录回调"),
			ue_1.KuroSDKManager.Get().LoginDelegate.Clear(),
			ue_1.KuroSDKManager.Get().LoginDelegate.Add((o) => {
				Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "登录成功"),
					o && e(o);
			});
	}
	KuroSdkKickBindFunction() {
		ue_1.KuroSDKManager.Get().KickDelegate.Clear(),
			ue_1.KuroSDKManager.Get().KickDelegate.Add(() => {
				this.SdkLogout();
			});
	}
	KuroSdkLogoutBindFunction(e) {
		ue_1.KuroSDKManager.Get().LogoutDelegate.Clear(),
			ue_1.KuroSDKManager.Get().LogoutDelegate.Add(() => {
				e();
			});
	}
	BindSpecialEvent() {}
	WEe() {
		ue_1.KuroSDKManager.Get().DeepLinkDelegate.Clear(),
			ue_1.KuroSDKManager.Get().DeepLinkDelegate.Add((e) => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"KuroSdk",
						28,
						" KuroSDKManager.Get()!.DeepLinkDelegate",
						["deepLink", e],
					);
			});
	}
	HEe() {
		Log_1.Log.CheckDebug() && Log_1.Log.Debug("KuroSdk", 28, "BindLogListener"),
			ue_1.KuroSDKManager.Get().LogDelegate.Clear(),
			ue_1.KuroSDKManager.Get().LogDelegate.Add((e) => {
				var o = e.split(","),
					r = o.length;
				if (0 < r)
					for (let n = 0; n < r; n++) {
						var t = o[n].split("=");
						2 === t.length &&
							"level" === t[0] &&
							(0 === (t = Number(t[1]))
								? Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug("KuroSdk", 28, "sdklog", ["Debug", e])
								: 1 === t
									? Log_1.Log.CheckInfo() &&
										Log_1.Log.Info("KuroSdk", 28, "sdklog", ["Info", e])
									: 2 === t
										? Log_1.Log.CheckWarn() &&
											Log_1.Log.Warn("KuroSdk", 28, "sdklog", ["Warn", e])
										: Log_1.Log.CheckError() &&
											Log_1.Log.Error("KuroSdk", 28, "sdklog", ["Error", e]));
					}
			});
	}
	KuroSdkExitBindFunction() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "KuroSdkExitBindFunction"),
			ue_1.KuroSDKManager.Get().ExitDelegate.Clear(),
			ue_1.KuroSDKManager.Get().ExitDelegate.Add(() => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("KuroSdk", 28, " KuroSDKManager.Get()!.ExitDelegate"),
					GlobalData_1.GlobalData.World &&
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"KuroSdk",
								28,
								"GlobalData.World KuroSDKManager.Get()!.ExitDelegate",
							),
						UE.KuroStaticLibrary.ExitGame(!1));
			});
	}
	BindProtocolListener() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "BindProtocolListener"),
			ue_1.KuroSDKManager.Get().ProtocolCallBack.Clear(),
			ue_1.KuroSDKManager.Get().ProtocolCallBack.Add(() => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"KuroSdk",
						28,
						" BindProtocolListener.Get()!.ProtocolCallBack",
					),
					(this.FEe = !0);
			});
	}
	BindShareResultListener() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "BindShareResultListener"),
			ue_1.KuroSDKManager.Get().ShareResultDelegate.Clear(),
			ue_1.KuroSDKManager.Get().ShareResultDelegate.Add((e, o, r) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"KuroSdk",
						28,
						" BindProtocolListener.Get()!.ShareResultDelegate",
					),
					this.OnShareResult(e, o, r);
			});
	}
	OnShareResult(e, o, r) {}
	jEe() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "KuroSdkQueryProductBindFunction"),
			ue_1.KuroSDKManager.Get().PostProductDelegate.Clear(),
			ue_1.KuroSDKManager.Get().PostProductDelegate.Add((e) => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("KuroSdk", 28, "sdk:查询商品 queryProduct", [
						"result",
						e,
					]),
					(e = this.OnQueryProduct(e)),
					ModelManager_1.ModelManager.KuroSdkModel?.OnQueryProductInfo(e);
			});
	}
	OnQueryProduct(e) {}
	GetSharePlatform(e) {
		this.GetSharePlatformCallBackList.push(e),
			this.kEe || ((this.kEe = !0), ue_1.KuroSDKManager.GetSharePlatform());
	}
	OnGetSharePlatform(e) {
		this.kEe = !1;
	}
	KuroSdkPaymentBindFunction(e) {
		ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
			(ue_1.KuroSDKManager.Get().PaymentDelegate.Clear(),
			ue_1.KuroSDKManager.Get().PaymentDelegate.Add((o, r) => {
				this.OnPaymentCallBack(o, r, e),
					KuroSdkReport_1.KuroSdkReport.OnSdkPay();
			}));
	}
	OnPaymentCallBack(e, o, r) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "OnPaymentCallBack", ["payment", e]),
			r(1 === e.PaymentType, o);
	}
	KuroSdkBindRedPointFunction(e) {
		ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
			(ue_1.KuroSDKManager.Get().PostRedPointDelegate.Clear(),
			ue_1.KuroSDKManager.Get().PostRedPointDelegate.Add((o) => {
				e(o);
			}));
	}
	GetDeviceDid() {
		return this.CurrentDid;
	}
	ResetCustomServerRedDot() {
		(this.CurrentCustomerShowState = !1),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
			);
	}
	GetProtocolState() {
		return !!this.FEe || !!UE.KuroSDKManager.GetIsAgreeProtocol();
	}
	GetCustomerServiceShowState() {
		return this.CurrentCustomerShowState;
	}
	CheckPhotoPermission() {
		return ue_1.KuroSDKManager.CheckPhotoPermission();
	}
	RequestPhotoPermission(e) {
		ue_1.KuroSDKManager.Get().RequestPhotoPermissionDelegate.Clear(),
			ue_1.KuroSDKManager.Get().RequestPhotoPermissionDelegate.Add(e),
			ue_1.KuroSDKManager.RequestPhotoPermission();
	}
	OnClear() {}
}
exports.PlatformSdkBase = PlatformSdkBase;
