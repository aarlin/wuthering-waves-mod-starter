"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlatformSdkIos = void 0);
const UE = require("ue"),
	ue_1 = require("ue"),
	Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	KuroSdkData_1 = require("../KuroSdkData"),
	PlatformSdkBase_1 = require("./PlatformSdkBase");
class ISdkCustomerService extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.cuid = ""), (this.isredot = 0);
	}
}
class PlatformSdkIos extends PlatformSdkBase_1.PlatformSdkBase {
	constructor() {
		super(...arguments),
			(this.wEe = new Map()),
			(this.CustomerServiceResultCallBack = (e) => {
				var r = Json_1.Json.Parse(e);
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", ["num", e]),
					r &&
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", [
								"num",
								r.isredot,
							]),
						(this.CurrentCustomerShowState = 0 < r.isredot)),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
					);
			}),
			(this.AnnounceRedPointCallBack = (e) => {
				e.includes("showRed") && (e.includes("1") || e.includes("YES"))
					? ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
							!0,
						)
					: ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
							!1,
						),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
					);
			});
	}
	OnInit() {
		(this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				UE.KuroLauncherLibrary.IsFirstIntoLauncher() &&
				ue_1.KuroSDKManager.PostSplashScreenEndSuccess(),
			UE.CrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid),
			UE.CrashSightProxy.SetCustomData("Sdkidfv", this.YEe()),
			UE.CrashSightProxy.SetCustomData("SdkJyId", this.GetJyDid()),
			UE.CrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
	}
	BindSpecialEvent() {
		ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Clear(),
			ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Add(
				this.AnnounceRedPointCallBack,
			),
			ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Clear(),
			ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Add(
				this.CustomerServiceResultCallBack,
			);
	}
	OpenCustomerService(e) {
		var r = ModelManager_1.ModelManager.LoginModel,
			o = ModelManager_1.ModelManager.PlayerInfoModel,
			t = new KuroSdkData_1.OpenCustomerServiceParamIos();
		(t.islogin = r.IsSdkLoggedIn() ? 1 : 0),
			(t.from = e),
			(t.RoleId = o.GetId()),
			(t.RoleName = o.GetAccountName()),
			(t.ServerId = r.GetServerId()),
			(t.ServerName = r.GetServerName()),
			(t.RoleLevel = o.GetPlayerLevel()),
			(e = Json_1.Json.Stringify(t));
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "IosCustomerService", ["json", e]),
			ue_1.KuroSDKManager.OpenCustomerService(e);
	}
	GetChannelId() {
		return this.BEe("channelId");
	}
	Share(e, r) {
		(e = Json_1.Json.Stringify(e)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "Share", ["json", e], ["imagePath", r]),
			UE.KuroSDKStaticLibrary.Share(r, e);
	}
	ShareTexture(e, r) {
		(e = Json_1.Json.Stringify(e)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "Share", ["json", e], ["imagePath", r]),
			UE.KuroSDKStaticLibrary.Share(r, e);
	}
	OnGetSharePlatform(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "OnGetSharePlatform", [
				"OnGetSharePlatform",
				e,
			]);
		var r = Json_1.Json.Parse(e);
		if (0 === r.KRMAINLAND_SDK_EVENT_KEY_RESULT) {
			r = Json_1.Json.Parse(r.KRMAINLAND_SDK_EVENT_KEY_DATA);
			const e = new Array();
			r?.forEach((r) => {
				var o = new PlatformSdkBase_1.SharePlatformSt();
				(o.IconUrl = r.iconUrl),
					(o.PlatformId = r.platform.toString()),
					e.push(o);
			}),
				this.GetSharePlatformCallBackList.forEach((r) => {
					r(e);
				}),
				(this.GetSharePlatformCallBackList = []);
		}
		super.OnGetSharePlatform(e);
	}
	SetFont() {
		ue_1.KuroSDKManager.SetFont("ARFangXinShuH7GBK-HV.ttf");
	}
	OnShareResult(e, r, o) {
		var t = r.replace(/[\n\s]/g, ""),
			n = Json_1.Json.Parse(t);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"KuroSdk",
				28,
				"OnShareResult",
				["code", e],
				["platform", r],
				["finalMsg", t],
				["shareResult", n],
			),
			n?.KRMAINLAND_SDK_EVENT_KEY_RESULT
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnShareResult,
						!0,
					)
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnShareResult,
						!1,
					);
	}
	YEe() {
		return this.BEe("idfv");
	}
	GetJyDid() {
		return this.BEe("jyDeviceId");
	}
	BEe(e) {
		if (0 === this.wEe.size) {
			var r = ue_1.KuroSDKManager.GetSdkParams("").split(","),
				o = r.length;
			for (let e = 0; e < o; e++) {
				var t = r[e].split("=");
				2 === t.length && this.wEe.set(t[0], t[1]);
			}
		}
		return (e = this.wEe.get(e)) && !StringUtils_1.StringUtils.IsEmpty(e)
			? e
			: "";
	}
	SdkLogout() {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "游戏注销"),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				ue_1.KuroSDKManager.KuroSDKEvent(5, "");
	}
}
exports.PlatformSdkIos = PlatformSdkIos;
