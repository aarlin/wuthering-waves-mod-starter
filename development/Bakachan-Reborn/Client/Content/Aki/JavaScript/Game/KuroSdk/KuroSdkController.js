"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KuroSdkController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../Core/Utils/StringUtils"),
	BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	PublicUtil_1 = require("../Common/PublicUtil"),
	GlobalData_1 = require("../GlobalData"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	ControllerHolder_1 = require("../Manager/ControllerHolder"),
	ModelManager_1 = require("../Manager/ModelManager"),
	ChannelController_1 = require("../Module/Channel/ChannelController"),
	ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
	UiLayer_1 = require("../Ui/UiLayer"),
	KuroSdkData_1 = require("./KuroSdkData"),
	KuroSdkDefine_1 = require("./KuroSdkDefine"),
	PlatformSdkAndroid_1 = require("./PlatformSdk/PlatformSdkAndroid"),
	PlatformSdkAndroidGlobal_1 = require("./PlatformSdk/PlatformSdkAndroidGlobal"),
	PlatformSdkIos_1 = require("./PlatformSdk/PlatformSdkIos"),
	PlatformSdkIosGlobal_1 = require("./PlatformSdk/PlatformSdkIosGlobal"),
	PlatformSdkWindows_1 = require("./PlatformSdk/PlatformSdkWindows"),
	PlatformSdkWindowsGlobal_1 = require("./PlatformSdk/PlatformSdkWindowsGlobal");
class KuroSdkController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			KuroSdkController.CanUseSdk() &&
				(KuroSdkController._Ee(),
				KuroSdkController.uEe(),
				KuroSdkController.cEe?.Init(),
				ControllerHolder_1.ControllerHolder.KuroSdkController.KuroSdkKickBindFunction(),
				ControllerHolder_1.ControllerHolder.KuroSdkController.KuroSdkLogoutBindFunction(
					ControllerHolder_1.ControllerHolder.LoginController.OnLogoutAccount,
				),
				ControllerHolder_1.ControllerHolder.KuroSdkController.KuroSdkLoginBindFunction(
					ControllerHolder_1.ControllerHolder.LoginController.OnSdkLogin,
				)),
			this.mEe(),
			(KuroSdkController.lFs = (0, puerts_1.toManualReleaseDelegate)(
				KuroSdkController._Fs,
			)),
			UE.KuroStaticAndroidLibrary.AddAndroidScreenChangeDelegate(
				KuroSdkController.lFs,
			),
			!0
		);
	}
	static OnClear() {
		return (
			this.dEe(),
			this.CancelCurrentWaitPayItemTimer(),
			KuroSdkController.lFs &&
				((0, puerts_1.releaseManualReleaseDelegate)(KuroSdkController._Fs),
				(KuroSdkController.lFs = void 0)),
			UE.KuroStaticAndroidLibrary.ClearAndroidScreenChangeDelegate(),
			!0
		);
	}
	static mEe() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnSetLoginServerId,
			this.CEe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.LoginSuccess,
				this.gEe,
			);
	}
	static dEe() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnSetLoginServerId,
			this.CEe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.LoginSuccess,
				this.gEe,
			);
	}
	static uEe() {
		var e;
		void 0 === KuroSdkController.cEe &&
			("Android" !== (e = UE.GameplayStatics.GetPlatformName()) ||
			this.GetIfGlobalSdk()
				? "Android" === e && this.GetIfGlobalSdk()
					? (KuroSdkController.cEe =
							new PlatformSdkAndroidGlobal_1.PlatformSdkAndroidGlobal())
					: "IOS" === e && this.GetIfGlobalSdk()
						? (KuroSdkController.cEe =
								new PlatformSdkIosGlobal_1.PlatformSdkIosGlobal())
						: "IOS" !== e || this.GetIfGlobalSdk()
							? "Windows" !== e || this.GetIfGlobalSdk()
								? "Windows" === e &&
									this.GetIfGlobalSdk() &&
									(KuroSdkController.cEe =
										new PlatformSdkWindowsGlobal_1.PlatformSdkWindowsGlobal())
								: (KuroSdkController.cEe =
										new PlatformSdkWindows_1.PlatformSdkWindows())
							: (KuroSdkController.cEe = new PlatformSdkIos_1.PlatformSdkIos())
				: (KuroSdkController.cEe =
						new PlatformSdkAndroid_1.PlatformSdkAndroid()));
	}
	static GetIfGlobalSdk() {
		return KuroSdkController.fEe;
	}
	static GetChannelId() {
		return KuroSdkController.cEe.GetChannelId();
	}
	static CheckIfSdkLogin() {
		return !!KuroSdkController.CanUseSdk() && "0" !== this.pEe().Uid;
	}
	static pEe() {
		return UE.KuroSDKManager.GetCurrentLoginInfo();
	}
	static _Ee() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"KuroSdk",
				28,
				"当前sdkarea!!!" +
					BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea"),
			),
			(KuroSdkController.fEe = PublicUtil_1.PublicUtil.GetIfGlobalSdk());
	}
	static GetAgreement() {
		return KuroSdkController.cEe?.GetAgreement();
	}
	static TestOpenWnd() {
		KuroSdkController.SdkOpenUrlWnd(
			"用户协议",
			"https://wutheringwaves.kurogame.com/p/agreement_public.html",
		);
	}
	static CanUseSdk() {
		return !(
			!UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") ||
			BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") !==
				KuroSdkDefine_1.USESDK
		);
	}
	static PostKuroSdkEvent(e) {
		if (KuroSdkController.cEe)
			switch (e) {
				case 0:
					KuroSdkController.cEe?.SdkLogin();
					break;
				case 1:
					KuroSdkController.cEe?.SdkKick();
					break;
				case 2:
					KuroSdkController.cEe?.SdkSelectRole();
					break;
				case 3:
					KuroSdkController.cEe?.SdkCreateRole();
					break;
				case 4:
					KuroSdkController.cEe?.SdkLevelUpRole();
					break;
				case 5:
					KuroSdkController.cEe?.SdkExit();
					break;
				case 6:
					KuroSdkController.cEe?.SdkLogout();
					break;
				case 7:
					KuroSdkController.cEe?.SdkOpenLoginWnd();
					break;
				case 8:
				case 9:
					break;
				case 10:
					KuroSdkController.cEe?.InitializePostWebView();
					break;
				case 11:
					KuroSdkController.cEe?.OpenPostWebView();
					break;
				case 13:
					KuroSdkController.cEe?.OpenUserCenter();
					break;
				case 14:
					KuroSdkController.cEe?.ReadProductInfo();
					break;
				case 16:
					KuroSdkController.cEe?.NotifyLanguage();
					break;
				case 12:
					KuroSdkController.cEe?.KuroOpenPrivacyClauseWnd();
					break;
				case 15:
					KuroSdkController.cEe?.ShowAgreement();
			}
		else 5 === e && this.vEe();
	}
	static vEe() {
		GlobalData_1.GlobalData.IsPlayInEditor
			? UE.KismetSystemLibrary.QuitGame(
					GlobalData_1.GlobalData.World,
					void 0,
					0,
					!1,
				)
			: KuroSdkController.CanUseSdk() || UE.KuroStaticLibrary.ExitGame(!1);
	}
	static SdkPay(...e) {
		if (KuroSdkController.CanUseSdk()) {
			let a;
			var r, o, t, n, l;
			(a =
				1 < e.length
					? ((r = e[0]),
						(o = e[1]),
						(t = e[2]),
						(n = e[3]),
						(l = e[4]),
						KuroSdkData_1.KuroSdkControllerTool.GetSdkPayProduct(r, o, t, n, l))
					: e[0]),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("KuroSdk", 28, "SdkPay", ["SdkPay", a]),
				this.cEe?.SdkPay(a),
				(ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName =
					a.goodsName),
				this.KuroSdkPaymentBindFunction(this.MEe);
		}
	}
	static OpenNotice() {
		KuroSdkController.cEe?.OpenPostWebView();
	}
	static OpenFeedback() {
		KuroSdkController.cEe?.OpenFeedback();
	}
	static SdkOpenUrlWnd(e, r, o = !0, t = !0, n = !0) {
		KuroSdkController.cEe?.SdkOpenUrlWnd(e, r, o, t, n);
	}
	static QueryProduct(e) {
		const r = new Array();
		e.forEach((e) => {
			(e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConfigById(
				Number(e),
			)) && r.push(e.ProductId);
		}),
			KuroSdkController.cEe?.QueryProduct(r, this.SEe());
	}
	static QueryProductByProductId(e) {
		KuroSdkController.cEe?.QueryProduct(e, this.SEe());
	}
	static ShareByteData(e, r) {
		KuroSdkController.cEe?.ShareByteData(e, r);
	}
	static Share(e, r) {
		KuroSdkController.cEe?.Share(e, r);
	}
	static ShareTexture(e, r) {
		KuroSdkController.cEe?.ShareTexture(e, r);
	}
	static SEe() {
		return "";
	}
	static OpenWebView(e, r, o, t, n = !0) {
		KuroSdkController.cEe?.OpenWebView(e, r, o, t, n);
	}
	static KuroSdkLoginBindFunction(e) {
		KuroSdkController.cEe?.KuroSdkLoginBindFunction(e);
	}
	static KuroSdkKickBindFunction() {
		KuroSdkController.cEe?.KuroSdkKickBindFunction();
	}
	static KuroSdkLogoutBindFunction(e) {
		KuroSdkController.cEe?.KuroSdkLogoutBindFunction(e);
	}
	KuroSdkExitBindFunction() {
		KuroSdkController.cEe?.KuroSdkExitBindFunction();
	}
	static KuroSdkPaymentBindFunction(e) {
		KuroSdkController.cEe?.KuroSdkPaymentBindFunction(e);
	}
	static SetPostWebViewRedPointState(e) {
		this.EEe = e;
	}
	static GetPostWebViewRedPointState() {
		return KuroSdkController.EEe;
	}
	static NeedShowCustomerService() {
		return ChannelController_1.ChannelController.CheckCustomerServiceOpen();
	}
	static GetCustomerServiceRedPointState() {
		return !!this.cEe && this.cEe.GetCustomerServiceShowState();
	}
	static OpenCustomerService(e) {
		this.cEe?.ResetCustomServerRedDot(), this.cEe?.OpenCustomerService(e);
	}
	static CheckPhotoPermission() {
		return (
			!KuroSdkController.CanUseSdk() ||
			!KuroSdkController.cEe ||
			KuroSdkController.cEe?.CheckPhotoPermission()
		);
	}
	static RequestPhotoPermission(e) {
		KuroSdkController.CanUseSdk() &&
			KuroSdkController.cEe?.RequestPhotoPermission(e);
	}
	static CancelCurrentWaitPayItemTimer(e = !0) {
		e &&
			((ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName = ""),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"KuroSdk",
				28,
				"CancelCurrentWaitPayItemTimer clearPayItem",
			),
			void 0 !== this.yEe &&
				(TimerSystem_1.TimerSystem.Remove(this.yEe), (this.yEe = void 0));
	}
	static StartWaitPayItemTimer() {
		this.CancelCurrentWaitPayItemTimer(!1),
			(this.yEe = TimerSystem_1.TimerSystem.Delay(() => {
				var e,
					r = ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName;
				StringUtils_1.StringUtils.IsBlank(r) ||
					((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(73)).SetTextArgs(r),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						e,
					)),
					(this.yEe = void 0);
			}, ConfigManager_1.ConfigManager.PayItemConfig.GetWaitPaySuccessTime()));
	}
}
(exports.KuroSdkController = KuroSdkController),
	((_a = KuroSdkController).cEe = void 0),
	(KuroSdkController.fEe = !1),
	(KuroSdkController.EEe = !1),
	(KuroSdkController.IsKick = !1),
	(KuroSdkController.lFs = void 0),
	(KuroSdkController.yEe = void 0),
	(KuroSdkController._Fs = () => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("KuroSdk", 28, "AndroidScreenChangeCallBack"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnAndroidConfigurationChange,
			);
		var e = UiLayer_1.UiLayer.UiRootItem?.GetRenderCanvas();
		e &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"KuroSdk",
				28,
				"旋转后LguiCanvasViewPort",
				["viewPortX", e.GetViewportSize().X],
				["viewPortY", e.GetViewportSize().Y],
			);
	}),
	(KuroSdkController.gEe = (e) => {
		var r =
			ConfigManager_1.ConfigManager.PayItemConfig.GetCurrentRegionPayConfigList();
		const o = new Array();
		r?.forEach((e) => {
			o.push(e.Id.toString());
		}),
			_a.QueryProduct(o);
	}),
	(KuroSdkController.CEe = () => {
		_a.CanUseSdk() && _a.fEe && _a.PostKuroSdkEvent(10);
	}),
	(KuroSdkController.MEe = (e, r) => {
		e &&
			"" !== ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName &&
			_a.StartWaitPayItemTimer();
	});
