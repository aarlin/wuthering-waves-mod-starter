"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KuroPushController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Application_1 = require("../../Core/Application/Application"),
	Info_1 = require("../../Core/Common/Info"),
	LanguageSystem_1 = require("../../Core/Common/LanguageSystem"),
	Log_1 = require("../../Core/Common/Log"),
	ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
	HotPatchPushSdk_1 = require("../../Launcher/HotPatchPushSdk/HotPatchPushSdk"),
	LauncherStorageLib_1 = require("../../Launcher/Util/LauncherStorageLib"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../Manager/ControllerHolder"),
	ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine"),
	MenuController_1 = require("../Module/Menu/MenuController"),
	SELFDEFINESN = "push";
class KuroPushController extends ControllerBase_1.ControllerBase {
	static IfCanUsePush() {
		var e = Info_1.Info.IsMobile();
		return !(!UE.KuroStaticLibrary.IsModuleLoaded("KuroPushSdk") || !e);
	}
	static OnInit() {
		return (
			UE.KuroLauncherLibrary.IsFirstIntoLauncher() &&
				(this.oEe(), this.BindCurrentLanguageTag(), this._5s()),
			this.BindCurrentLanguageTag(),
			this.nEe(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Push", 28, "current push clientId", [
					"clientId",
					this.GetClientId(),
				]),
			!0
		);
	}
	static async _5s() {
		await this.u5s(), await this.rEe();
	}
	static async u5s() {
		var e;
		LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
			LauncherStorageLib_1.ELauncherStorageGlobalKey
				.AndroidNotFirstTimeOpenPush,
			!1,
		) ||
			(LauncherStorageLib_1.LauncherStorageLib.SetGlobal(
				LauncherStorageLib_1.ELauncherStorageGlobalKey
					.AndroidNotFirstTimeOpenPush,
				!0,
			),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Push", 28, "KuroPush:检查安卓初次权限"),
			UE.AndroidPermissionFunctionLibrary.CheckPermission(
				"android.permission.POST_NOTIFICATIONS",
			)) ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Push", 28, "KuroPush:安卓没有推送权限，尝试获取"),
			(e = UE.NewArray(UE.BuiltinString)).Add(
				"android.permission.POST_NOTIFICATIONS",
			),
			0 < (await this.KSr(e)).length
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Push", 28, "KuroPush:安卓推送权限获取失败"),
					this.TurnOffPush())
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Push", 28, "KuroPush:安卓推送权限获取成功"),
					await this.TurnOnPush(!1)));
	}
	static async KSr(e) {
		return new Promise((t) => {
			const o = UE.AndroidPermissionFunctionLibrary.AcquirePermissions(e),
				r = (e, n) => {
					o.OnPermissionsGrantedDynamicDelegate.Remove(r);
					var s = new Array(),
						a = e.Num();
					for (let t = 0; t < a; t++) {
						var u = e.Get(t);
						n.Get(t) || s.push(u);
					}
					t(s);
				};
			o.OnPermissionsGrantedDynamicDelegate.Add(r);
		});
	}
	static BindCurrentLanguageTag() {
		var e = LanguageSystem_1.LanguageSystem.PackageLanguage;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Push", 28, "current push Language Tag", ["Tag", e]),
			UE.KuroPushSdkStaticLibrary.SetTag(e, "push");
	}
	static nEe() {
		var e = this.GetPushState() ? 1 : 0;
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("KuroSdk", 8, "刷新推送状态", ["result", e]),
			MenuController_1.MenuController.SetTargetConfig(121, e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshMenuSetting,
				121,
			);
	}
	static async rEe() {
		this.IfCanUsePush() &&
			((await this.GetPushNotiPermissionEnableState())
				? this.TurnOnPush()
				: this.TurnOffPush());
	}
	static oEe() {
		this.sEe ||
			((KuroPushController.PushFunctionDelegate = (0,
			puerts_1.toManualReleaseDelegate)(KuroPushController.aEe)),
			UE.KuroPushSdkStaticLibrary.GetPushObject()?.PushSdkMessageBluePrintDelegate.Add(
				KuroPushController.aEe,
			),
			Application_1.Application.AddApplicationHandler(
				4,
				KuroPushController.hEe,
			)),
			(this.sEe = !0);
	}
	static RemovePushDelegate() {
		KuroPushController.PushFunctionDelegate &&
			(UE.KuroPushSdkStaticLibrary.GetPushObject()?.IsValid() &&
				UE.KuroPushSdkStaticLibrary.GetPushObject()?.PushSdkMessageBluePrintDelegate.Remove(
					KuroPushController.aEe,
				),
			(0, puerts_1.releaseManualReleaseDelegate)(KuroPushController.aEe),
			(KuroPushController.PushFunctionDelegate = void 0),
			(this.sEe = !1));
	}
	static SetPushNotifyCall(e) {
		this.lEe = e;
	}
	static SendLocalPush(e, t, o) {
		HotPatchPushSdk_1.HotPatchPushSdk.SendLocalPush(e, t, o);
	}
	static OpenNotification() {
		this.IfCanUsePush()
			? UE.KuroPushSdkStaticLibrary.OpenNotification()
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Push", 28, " Not OpenNotification");
	}
	static async GetPushNotiPermissionEnableState() {
		return (
			!!this.IfCanUsePush() &&
			new Promise((e) => {
				const t = (o) => {
					UE.KuroPushSdkStaticLibrary.GetPushObject()?.AllowedNotificationsDelegate.Remove(
						t,
					),
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Push", 28, "当前推送权限状态", ["state", o]),
						e(o);
				};
				UE.KuroPushSdkStaticLibrary.GetPushObject()?.AllowedNotificationsDelegate.Add(
					t,
				),
					UE.KuroPushSdkStaticLibrary.AreNotificationEnable();
			})
		);
	}
	static GetClientId() {
		return this.IfCanUsePush() ? UE.KuroPushSdkStaticLibrary.GetClientId() : "";
	}
	static async TurnOnPush(e = !0) {
		HotPatchPushSdk_1.HotPatchPushSdk.TurnOnPush(),
			this.nEe(),
			e &&
				!(await this.GetPushNotiPermissionEnableState()) &&
				((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(171)).FunctionMap.set(
					1,
					() => {
						this.OpenNotification();
					},
				),
				(e.IsEscViewTriggerCallBack = !1),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					e,
				));
	}
	static TurnOffPush() {
		HotPatchPushSdk_1.HotPatchPushSdk.TurnOffPush(), this.nEe();
	}
	static GetPushState() {
		var e = LauncherStorageLib_1.LauncherStorageLib.GetGlobal(
			LauncherStorageLib_1.ELauncherStorageGlobalKey.CachePushOpenState,
			!1,
		);
		return void 0 !== e && e;
	}
}
(exports.KuroPushController = KuroPushController),
	((_a = KuroPushController).sEe = !1),
	(KuroPushController.lEe = void 0),
	(KuroPushController.PushFunctionDelegate = void 0),
	(KuroPushController.hEe = () => {
		_a.RemovePushDelegate();
	}),
	(KuroPushController.aEe = (e, t) => {
		_a.lEe?.(e, t),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Push",
					28,
					"接收到push回调信息",
					["functionName", e],
					["result", t],
				);
	});
