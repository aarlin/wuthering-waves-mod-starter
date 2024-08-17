"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlatformSdkIosGlobal = void 0);
const UE = require("ue"),
	ue_1 = require("ue"),
	Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	KuroSdkData_1 = require("../KuroSdkData"),
	PlatformSdkBase_1 = require("./PlatformSdkBase"),
	WEBVIEWCD = 5e3;
class IQueryProduct extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.products = void 0),
			(this.code = 0),
			(this.msg = "");
	}
}
class ISdkCustomerService extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.cuid = ""), (this.isredot = 0);
	}
}
class PlatformSdkIosGlobal extends PlatformSdkBase_1.PlatformSdkBase {
	constructor() {
		super(...arguments),
			(this.JEe = void 0),
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
			}),
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
			});
	}
	OnInit() {
		(this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId),
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
		var e = this.zEe();
		return e?.channelId
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("KuroSdk", 28, "channel_id", ["userInfo", e]),
				e?.channelId)
			: "";
	}
	YEe() {
		var e = this.zEe();
		return e?.idfv
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("KuroSdk", 28, "idfv", ["userInfo", e]),
				e?.idfv)
			: "";
	}
	GetJyDid() {
		var e = this.zEe();
		return e?.jyDeviceId
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("KuroSdk", 28, "jyDeviceId", ["userInfo", e]),
				e?.jyDeviceId)
			: "";
	}
	zEe() {
		var e;
		return (
			void 0 === this.JEe &&
				((e = ue_1.KuroSDKManager.GetSdkParams("")),
				(this.JEe = Json_1.Json.Parse(e))),
			this.JEe
		);
	}
	QueryProduct(e, r) {
		let o = "";
		var t = e.length;
		for (let r = 0; r < t; r++) (o += e[r]), r !== t - 1 && (o += ",");
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "QueryProduct", ["data", o]),
			ue_1.KuroSDKManager.QueryProductInfo(o);
	}
	OnQueryProduct(e) {
		e = e.split("|");
		const r = new Array();
		return (
			0 < e?.length &&
				((e = Json_1.Json.Parse(e[1]))?.products?.forEach((e) => {
					var o = new PlatformSdkBase_1.QueryProductSt();
					(o.Currency = e.currency),
						(o.GoodId = e.goodsId),
						(o.Name = e.name),
						(o.Desc = e.desc),
						(o.Price = e.price),
						r.push(o);
				}),
				Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug("KuroSdk", 28, "queryProduct", ["queryProduct", e]),
			r
		);
	}
	OnGetSharePlatform(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("KuroSdk", 28, "OnGetSharePlatform", [
				"OnGetSharePlatform",
				e,
			]);
		var r = Json_1.Json.Parse(e);
		if (0 === r.KROVERSEA_SDK_KEY_RESULT) {
			r = Json_1.Json.Parse(r.KROVERSEA_SDK_KEY_DATA);
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
	SdkPay(e) {
		var r = this.bEe();
		r = this.qEe(e, r);
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"KuroSdk",
				28,
				"AndroidPayment",
				["json", r],
				["paymentInfo", e],
			),
			ue_1.KuroSDKManager.KuroSDKEvent(8, r);
	}
	IEe() {
		return ModelManager_1.ModelManager.PlayerInfoModel.GetId()
			? ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()
			: ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()
				? ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString()
				: "";
	}
	bEe() {
		var e = ModelManager_1.ModelManager.FunctionModel,
			r = ModelManager_1.ModelManager.LoginModel;
		return {
			roleId: this.IEe(),
			roleName: e.GetPlayerName() ? e.GetPlayerName() : "",
			roleLevel: e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1",
			serverId: r.GetServerId() ? r.GetServerId() : "",
			serverName: r.GetServerName() ? r.GetServerName() : "",
			vipLevel: "0",
			partyName: " ",
			setBalanceLevelOne: 0,
			setBalanceLevelTwo: 0,
		};
	}
	qEe(e, r) {
		var o = new KuroSdkData_1.PayInfoIosGlobal();
		return (
			(o.RoleId = r.roleId.toString()),
			(o.RoleName = r.roleName.toString()),
			(o.ServerId = r.serverId.toString()),
			(o.ServerName = r.serverName.toString()),
			(o.CpOrder = e.cpOrderId.toString()),
			(o.CallbackUrl = e.callbackUrl.toString()),
			(o.GamePropID = e.product_id.toString()),
			(o.GoodsName = e.goodsName.toString()),
			(o.GoodsDesc = e.goodsDesc.toString()),
			(o.Price = e.price.toString()),
			(o.GoodsCurrency = "USD"),
			(o.ExtraParams = r.roleId.toString()),
			Json_1.Json.Stringify(o) ?? ""
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
	SetFont() {
		ue_1.KuroSDKManager.SetFont("ARFangXinShuH7GBK-HV.ttf");
	}
	OnShareResult(e, r, o) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"KuroSdk",
				28,
				"OnShareResult",
				["code", e],
				["platform", r],
				["msg", o],
			),
			1 === e
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnShareResult,
						!0,
					)
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnShareResult,
						!1,
					);
	}
	OpenWebView(e, r, o, t, a) {
		ue_1.KuroSDKManager.OpenWebView(r, e, o, t, a, "");
	}
	SdkOpenUrlWnd(e, r, o, t, a = !0) {
		if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
			if (0 !== this.LastOpenTime && Time_1.Time.Now - this.LastOpenTime <= 5e3)
				return void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"InDisplayCd",
				);
			(this.LastOpenTime = Time_1.Time.Now), this.OpenWebView(e, r, o, t, a);
		}
	}
}
exports.PlatformSdkIosGlobal = PlatformSdkIosGlobal;
