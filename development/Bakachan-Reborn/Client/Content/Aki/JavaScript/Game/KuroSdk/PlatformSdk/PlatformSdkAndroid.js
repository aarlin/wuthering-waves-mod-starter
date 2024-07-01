"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlatformSdkAndroid = void 0);
const UE = require("ue"),
	ue_1 = require("ue"),
	Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	KuroSdkData_1 = require("../KuroSdkData"),
	PlatformSdkBase_1 = require("./PlatformSdkBase"),
	WEBVIEWCD = 5e3,
	GETINFODELAY = 1e4;
class AndroidSdkRePointSt extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.showRed = !1);
	}
}
class PlatformSdkAndroid extends PlatformSdkBase_1.PlatformSdkBase {
	constructor() {
		super(...arguments),
			(this.wEe = new Map()),
			(this.AnnounceRedPointCallBack = (e) => {
				(e = Json_1.Json.Parse(e)),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("KuroSdk", 28, "公告红点", ["data", e]),
					ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(
						e.showRed,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh,
					);
			}),
			(this.CustomerServiceResultCallBack = (e) => {
				var r = e.split(",");
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", ["result", e]),
					1 < r?.length &&
						(Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("KuroSdk", 28, "当前客服红点数量", ["num", r[1]]),
						(this.CurrentCustomerShowState = 0 < Number(r[1]))),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SdkCustomerRedPointRefresh,
					);
			});
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
	OnInit() {
		(ue_1.KuroSDKManager.GetBasicInfo().bIsValid = !1),
			TimerSystem_1.TimerSystem.Delay(() => {
				(this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId),
					UE.CrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid),
					UE.CrashSightProxy.SetCustomData("SdkOaid", this.GetOaid()),
					UE.CrashSightProxy.SetCustomData("SdkJyId", this.GetJyDid()),
					UE.CrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
			}, 1e4);
	}
	SdkOpenUrlWnd(e, r, o, t, n = !0) {
		0 !== this.LastOpenTime && Time_1.Time.Now - this.LastOpenTime <= 5e3
			? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"InDisplayCd",
				)
			: ((this.LastOpenTime = Time_1.Time.Now),
				ue_1.KuroSDKManager.OpenWebView(e, r, o, t, n, ""));
	}
	OpenFeedback() {
		var e,
			r = BaseConfigController_1.BaseConfigController.GetFeedBackUrl();
		r
			? ((e = this.GetFeedBackOpenUrl()),
				ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()
					? this.OpenWebView(r.title, e, !0, !1, !0)
					: UE.KismetSystemLibrary.LaunchURL(e))
			: Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "CDN没有反馈配置");
	}
	OpenWebView(e, r, o, t, n) {
		0 !== this.LastOpenTime && Time_1.Time.Now - this.LastOpenTime <= 5e3
			? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"InDisplayCd",
				)
			: ((this.LastOpenTime = Time_1.Time.Now),
				ue_1.KuroSDKManager.OpenWebView(e, r, o, t, n, ""));
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
	GetChannelId() {
		return this.BEe("channelId");
	}
	GetGameId() {
		return this.BEe("gameId");
	}
	GetChannelName() {
		return this.BEe("channelName");
	}
	GetDid() {
		return this.BEe("did");
	}
	GetAppChannelId() {
		return this.BEe("appChannelId");
	}
	GetOaid() {
		return this.BEe("oaid");
	}
	GetJyDid() {
		return this.BEe("jyDid");
	}
	GetAccessToken() {
		return this.BEe("accessToken");
	}
	SetFont() {
		var e =
			(((e = new KuroSdkData_1.SetFontParamAndroid()).fontType = "1"),
			(e.fontPath = "H7GBKHeavy.TTF"),
			Json_1.Json.Stringify(e));
		ue_1.KuroSDKManager.SetFont(e);
	}
	IEe() {
		return ModelManager_1.ModelManager.PlayerInfoModel.GetId()
			? ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()
			: ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()
				? ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString()
				: "";
	}
	OpenCustomerService(e) {
		var r = ModelManager_1.ModelManager.LoginModel,
			o = new KuroSdkData_1.OpenCustomerServiceParamAndroid();
		(o.IsLogin = r.IsSdkLoggedIn() ? "1" : "0"),
			(o.FromLogin = e.toString()),
			(o.RoleId = this.IEe()),
			(o.ServerId = r.GetServerId() ?? ""),
			(o.IsLandscape = "0"),
			(e = Json_1.Json.Stringify(o));
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "AndroidCustomerService", ["json", e]),
			ue_1.KuroSDKManager.OpenCustomerService(e);
	}
	SdkPay(e) {
		var r;
		ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
			((r = this.bEe()),
			(r = this.qEe(e, r)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"KuroSdk",
					28,
					"AndroidPayment",
					["json", r],
					["paymentInfo", e],
				),
			ue_1.KuroSDKManager.KuroSDKEvent(8, r));
	}
	SdkCreateRole() {
		var e;
		Log_1.Log.CheckInfo() && Log_1.Log.Info("KuroSdk", 28, "上报创建新角色"),
			ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
				((e = this.GetCreateRoleInfo()),
				ue_1.KuroSDKManager.KuroSDKEvent(3, e));
	}
	GetCreateRoleInfo() {
		var e = ModelManager_1.ModelManager.LoginModel,
			r = new KuroSdkData_1.RoleInfoSdk();
		return (
			(r.RoleId = this.IEe()),
			(r.RoleName = e.GetPlayerName() ? e.GetPlayerName() : ""),
			(r.ServerId = e.GetServerId() ? e.GetServerId() : ""),
			(r.ServerName = e.GetServerName() ? e.GetServerName() : ""),
			(r.RoleLevel = "1"),
			(r.VipLevel = "0"),
			(r.PartyName = " "),
			(r.RoleCreateTime = e.GetCreatePlayerTime().toString()
				? e.GetCreatePlayerTime().toString()
				: ""),
			(r.BalanceLevelOne = "0"),
			(r.BalanceLevelTwo = "0"),
			(r.SumPay = "0"),
			(r.gameName = "AKI"),
			(r.gameVersion = "0.0.0"),
			(r.RoleAvatar = ""),
			(r.ChannelUserId = e.GetSdkLoginConfig()?.Uid
				? e.GetSdkLoginConfig().Uid.toString()
				: "0"),
			(r.GameUserId = e.GetSdkLoginConfig()?.UserName
				? e.GetSdkLoginConfig().UserName.toString()
				: "0"),
			Json_1.Json.Stringify(r) ?? ""
		);
	}
	bEe() {
		var e = ModelManager_1.ModelManager.FunctionModel,
			r = ModelManager_1.ModelManager.LoginModel,
			o = new KuroSdkData_1.AndroidSdkPayRole();
		return (
			(o.roleId = this.IEe()),
			(o.roleName = e.GetPlayerName() ? e.GetPlayerName() : ""),
			(o.roleLevel = e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1"),
			(o.serverId = r.GetServerId() ? r.GetServerId() : ""),
			(o.serverName = r.GetServerName() ? r.GetServerName() : ""),
			(o.vipLevel = "0"),
			(o.partyName = " "),
			(o.setBalanceLevelOne = "0"),
			(o.setBalanceLevelTwo = "0"),
			o
		);
	}
	qEe(e, r) {
		var o = new KuroSdkData_1.PayInfoAndroid();
		(o.cpOrderId = e.cpOrderId.toString()),
			(o.callbackUrl = e.callbackUrl.toString()),
			(o.product_id = e.product_id.toString()),
			(o.goodsName = e.goodsName.toString()),
			(o.goodsDesc = e.goodsDesc.toString()),
			(o.currency = e.currency.toString()),
			(o.extraParams = e.extraParams?.toString());
		let t = Json_1.Json.Stringify(o);
		return (
			(t =
				(t = t.replace("}", ",")) +
				StringUtils_1.StringUtils.Format('"price":{0}', e.price.toString()) +
				"}"),
			(o = Json_1.Json.Stringify(r)),
			(e = StringUtils_1.StringUtils.Format(
				'{"RoleInfo":{0},"OrderInfo":{1}}',
				o,
				t,
			)),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("KuroSdk", 28, "SdkJson", ["sdkJson", e]),
			e ?? ""
		);
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
	OnShareResult(e, r, o) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"KuroSdk",
				28,
				"OnShareResult",
				["code", e],
				["platform", r],
				["msg", o],
			),
			0 === e
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnShareResult,
						!0,
					)
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnShareResult,
						!1,
					);
	}
}
exports.PlatformSdkAndroid = PlatformSdkAndroid;
