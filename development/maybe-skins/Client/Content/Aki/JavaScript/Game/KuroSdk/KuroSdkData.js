"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KuroSdkControllerTool =
		exports.AndroidGlobalProductContentPriceData =
		exports.GlobalProductContentData =
		exports.GlobalProductData =
		exports.SdkAgreementLinkData =
		exports.AndroidSdkAgreementData =
		exports.ShareData =
		exports.SetFontParamWindows =
		exports.SetFontParamAndroid =
		exports.QueryProductInfoParamWindows =
		exports.QueryProductInfoParamAndroid =
		exports.RoleInfoWindows =
		exports.AndroidSdkPayRole =
		exports.RoleInfoSdk =
		exports.SdkPayObject =
		exports.PayInfoWindowsGlobal =
		exports.PayInfoWindows =
		exports.PayInfoIosGlobal =
		exports.PayInfoMacIos =
		exports.PayInfoAndroid =
		exports.OpenWebViewParamWindows =
		exports.OpenSdkUrlWndParamWindows =
		exports.OpenSdkUrlWndParam =
		exports.OpenPostWebViewParam =
		exports.OpenCustomerServiceParamWindows =
		exports.OpenCustomerServiceParamIos =
		exports.OpenCustomerServiceParamAndroid =
		exports.InitializePostWebViewParam =
			void 0);
const Json_1 = require("../../Core/Common/Json"),
	Log_1 = require("../../Core/Common/Log"),
	ModelManager_1 = require("../Manager/ModelManager");
class InitializePostWebViewParam extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.language = ""),
			(this.cdn = []),
			(this.serverId = "");
	}
}
exports.InitializePostWebViewParam = InitializePostWebViewParam;
class OpenCustomerServiceParamAndroid extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.IsLogin = ""),
			(this.FromLogin = ""),
			(this.RoleId = ""),
			(this.ServerId = ""),
			(this.IsLandscape = "");
	}
}
exports.OpenCustomerServiceParamAndroid = OpenCustomerServiceParamAndroid;
class OpenCustomerServiceParamIos extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.islogin = 0),
			(this.from = 0),
			(this.RoleId = 0),
			(this.RoleName = ""),
			(this.ServerId = ""),
			(this.ServerName = ""),
			(this.RoleLevel = 0),
			(this.VipLevel = 0),
			(this.PartyName = ""),
			(this.RoleCreateTime = 0),
			(this.BalanceLevelOne = 0),
			(this.BalanceLevelTwo = 0),
			(this.SumPay = 0);
	}
}
exports.OpenCustomerServiceParamIos = OpenCustomerServiceParamIos;
class OpenCustomerServiceParamWindows extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.islogin = !1), (this.from = 0);
	}
}
exports.OpenCustomerServiceParamWindows = OpenCustomerServiceParamWindows;
class OpenPostWebViewParam extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.playerId = ""),
			(this.playerLevel = ""),
			(this.language = ""),
			(this.extend = ""),
			(this.gameOrientation = ""),
			(this.type = "");
	}
}
exports.OpenPostWebViewParam = OpenPostWebViewParam;
class OpenSdkUrlWndParam extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.title = ""), (this.wndUrl = "");
	}
}
exports.OpenSdkUrlWndParam = OpenSdkUrlWndParam;
class OpenSdkUrlWndParamWindows extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.title = ""), (this.url = "");
	}
}
exports.OpenSdkUrlWndParamWindows = OpenSdkUrlWndParamWindows;
class OpenWebViewParamWindows extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.title = ""),
			(this.url = ""),
			(this.transparent = !1),
			(this.titlebar = !1),
			(this.innerbrowser = !1),
			(this.webAccelerated = !1);
	}
}
exports.OpenWebViewParamWindows = OpenWebViewParamWindows;
class PayInfoAndroid extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.cpOrderId = ""),
			(this.callbackUrl = ""),
			(this.product_id = ""),
			(this.goodsName = ""),
			(this.goodsDesc = ""),
			(this.currency = ""),
			(this.extraParams = "");
	}
}
exports.PayInfoAndroid = PayInfoAndroid;
class PayInfoMacIos extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.RoleId = ""),
			(this.RoleName = ""),
			(this.ServerId = ""),
			(this.ServerName = ""),
			(this.CpOrder = ""),
			(this.CallbackUrl = ""),
			(this.GamePropID = ""),
			(this.GoodsName = ""),
			(this.GoodsDesc = ""),
			(this.Price = ""),
			(this.GoodsCurrency = "");
	}
}
class PayInfoIosGlobal extends (exports.PayInfoMacIos = PayInfoMacIos) {
	constructor() {
		super(...arguments), (this.ExtraParams = "");
	}
}
exports.PayInfoIosGlobal = PayInfoIosGlobal;
class PayInfoWindowsBase extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.roleId = ""),
			(this.roleName = ""),
			(this.serverId = ""),
			(this.serverName = ""),
			(this.callbackUrl = ""),
			(this.goodsDesc = "");
	}
}
class PayInfoWindows extends PayInfoWindowsBase {
	constructor() {
		super(...arguments),
			(this.cpOrderId = ""),
			(this.product_id = ""),
			(this.goodsName = ""),
			(this.currency = ""),
			(this.extraParams = "");
	}
}
exports.PayInfoWindows = PayInfoWindows;
class PayInfoWindowsGlobal extends PayInfoWindowsBase {
	constructor() {
		super(...arguments),
			(this.cpOrder = ""),
			(this.goodsId = ""),
			(this.productName = ""),
			(this.currencyType = ""),
			(this.customMsg = ""),
			(this.price = "");
	}
}
exports.PayInfoWindowsGlobal = PayInfoWindowsGlobal;
class SdkPayObject extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.OrderInfo = void 0), (this.RoleInfo = void 0);
	}
}
exports.SdkPayObject = SdkPayObject;
class RoleInfoSdk extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.RoleId = ""),
			(this.RoleName = ""),
			(this.ServerId = ""),
			(this.ServerName = ""),
			(this.RoleLevel = ""),
			(this.VipLevel = ""),
			(this.PartyName = ""),
			(this.RoleCreateTime = ""),
			(this.BalanceLevelOne = ""),
			(this.BalanceLevelTwo = ""),
			(this.SumPay = ""),
			(this.gameName = ""),
			(this.gameVersion = ""),
			(this.RoleAvatar = ""),
			(this.ChannelUserId = ""),
			(this.GameUserId = "");
	}
}
exports.RoleInfoSdk = RoleInfoSdk;
class AndroidSdkPayRole extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.serverId = ""),
			(this.serverName = ""),
			(this.roleId = ""),
			(this.roleName = ""),
			(this.roleLevel = ""),
			(this.vipLevel = ""),
			(this.setBalanceLevelOne = ""),
			(this.setBalanceLevelTwo = ""),
			(this.partyName = "");
	}
}
exports.AndroidSdkPayRole = AndroidSdkPayRole;
class RoleInfoWindows extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.roleId = ""),
			(this.roleName = ""),
			(this.serverId = ""),
			(this.serverName = ""),
			(this.roleLevel = ""),
			(this.vipLevel = ""),
			(this.partyName = ""),
			(this.roleCreateTime = ""),
			(this.setBalanceLevelOne = ""),
			(this.setBalanceLevelTwo = ""),
			(this.setSumPay = "");
	}
}
exports.RoleInfoWindows = RoleInfoWindows;
class QueryProductInfoParamAndroid extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.GoodIdList = ""), (this.ChannelId = "");
	}
}
exports.QueryProductInfoParamAndroid = QueryProductInfoParamAndroid;
class QueryProductInfoParamWindows extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.goodsIds = ""), (this.payChannel = "");
	}
}
exports.QueryProductInfoParamWindows = QueryProductInfoParamWindows;
class SetFontParamAndroid extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.fontType = ""), (this.fontPath = "");
	}
}
exports.SetFontParamAndroid = SetFontParamAndroid;
class SetFontParamWindows extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.name = ""), (this.path = "");
	}
}
exports.SetFontParamWindows = SetFontParamWindows;
class ShareData extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.platform = ""),
			(this.title = ""),
			(this.text = ""),
			(this.topicId = ""),
			(this.topicName = "");
	}
}
exports.ShareData = ShareData;
class AndroidSdkAgreementData extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.init = void 0),
			(this.gameInit = void 0),
			(this.privacy = void 0),
			(this.certGuarIdcard = void 0),
			(this.login = void 0),
			(this.version = 0),
			(this.content = ""),
			(this.certIdcard = void 0);
	}
}
exports.AndroidSdkAgreementData = AndroidSdkAgreementData;
class SdkAgreementLinkData extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments), (this.link = ""), (this.title = "");
	}
}
exports.SdkAgreementLinkData = SdkAgreementLinkData;
class GlobalProductData {
	constructor() {
		(this.code = 0), (this.message = ""), (this.data = void 0);
	}
}
exports.GlobalProductData = GlobalProductData;
class GlobalProductContentData {
	constructor() {
		(this.local = ""),
			(this.coin = ""),
			(this.price = void 0),
			(this.PriceItem = void 0);
	}
}
exports.GlobalProductContentData = GlobalProductContentData;
class AndroidGlobalProductContentPriceData {
	constructor() {
		(this.key = 0), (this.value = 0);
	}
}
exports.AndroidGlobalProductContentPriceData =
	AndroidGlobalProductContentPriceData;
class KuroSdkControllerTool {
	static GetCreateRoleInfo() {
		var e = ModelManager_1.ModelManager.LoginModel,
			o = new RoleInfoSdk();
		(o.RoleId = this.IEe()),
			(o.RoleName = e.GetPlayerName() ? e.GetPlayerName() : ""),
			(o.ServerId = e.GetServerId() ? e.GetServerId() : ""),
			(o.ServerName = e.GetServerName() ? e.GetServerName() : ""),
			(o.RoleLevel = "1"),
			(o.VipLevel = "0"),
			(o.PartyName = " "),
			(o.RoleCreateTime = e.GetCreatePlayerTime()
				? e.GetCreatePlayerTime()
				: ""),
			(o.BalanceLevelOne = "0"),
			(o.BalanceLevelTwo = "0"),
			(o.SumPay = "0"),
			(o.gameName = "AKI"),
			(o.gameVersion = "0.0.0"),
			(o.RoleAvatar = ""),
			(o.ChannelUserId = e.GetSdkLoginConfig()?.Uid
				? e.GetSdkLoginConfig().Uid.toString()
				: "0"),
			(o.GameUserId = e.GetSdkLoginConfig()?.UserName
				? e.GetSdkLoginConfig().UserName.toString()
				: "0"),
			(e = Json_1.Json.Stringify(o) ?? "");
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "SdkGetRoleInfo", ["data", e]),
			e
		);
	}
	static IEe() {
		return ModelManager_1.ModelManager.PlayerInfoModel.GetId()
			? ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString()
			: ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId()
				? ModelManager_1.ModelManager.LoginModel.GetCreatePlayerId().toString()
				: "";
	}
	static GetRoleInfo() {
		var e = ModelManager_1.ModelManager.FunctionModel,
			o = ModelManager_1.ModelManager.LoginModel,
			r = new RoleInfoSdk();
		(r.RoleId = this.IEe()),
			(r.RoleName = e.GetPlayerName() ? e.GetPlayerName() : ""),
			(r.ServerId = o.GetServerId() ? o.GetServerId() : ""),
			(r.ServerName = o.GetServerName() ? o.GetServerName() : ""),
			(r.RoleLevel = e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1"),
			(r.VipLevel = "0"),
			(r.PartyName = " "),
			(r.RoleCreateTime = ""),
			(r.BalanceLevelOne = e.GetPlayerCashCoin()),
			(r.BalanceLevelTwo = "0"),
			(r.SumPay = "0"),
			(r.gameName = "AKI"),
			(r.gameVersion = "0.0.0"),
			(r.RoleAvatar = ""),
			(r.ChannelUserId = o.GetSdkLoginConfig()?.Uid
				? o.GetSdkLoginConfig().Uid.toString()
				: "0"),
			(r.GameUserId = o.GetSdkLoginConfig()?.UserName
				? o.GetSdkLoginConfig().UserName.toString()
				: "0"),
			(e = Json_1.Json.Stringify(r) ?? "");
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("KuroSdk", 28, "SdkGetRoleInfo", ["data", e]),
			e
		);
	}
	static GetPaymentInfo(e, o) {
		var r = ModelManager_1.ModelManager.PlatformModel.PlatformType;
		return 4 === r || 1 === r
			? (((r = new PayInfoMacIos()).RoleId = o.roleId.toString()),
				(r.RoleName = o.roleName.toString()),
				(r.ServerId = o.serverId.toString()),
				(r.ServerName = o.serverName.toString()),
				(r.CpOrder = e.cpOrderId.toString()),
				(r.CallbackUrl = e.callbackUrl.toString()),
				(r.GamePropID = e.product_id.toString()),
				(r.GoodsName = e.goodsName.toString()),
				(r.GoodsDesc = e.goodsDesc.toString()),
				(r.Price = e.price.toString()),
				(r.GoodsCurrency = ""),
				Json_1.Json.Stringify(r) ?? "")
			: (((r = new SdkPayObject()).RoleInfo = o),
				(r.OrderInfo = e),
				(o = Json_1.Json.Stringify(r)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("KuroSdk", 28, "SdkJson", ["sdkJson", o]),
				o ?? "");
	}
	static GetSdkPayProduct(e, o, r, t, s) {
		var a = ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString(),
			n = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(e);
		return {
			product_id:
				ModelManager_1.ModelManager.RechargeModel.GetPayIdProductId(e),
			cpOrderId: o,
			price: n,
			goodsName: r,
			goodsDesc: t,
			extraParams: a,
			callbackUrl: s,
			currency: "",
		};
	}
	static GetSdkPayRoleInfo() {
		var e = ModelManager_1.ModelManager.FunctionModel,
			o = ModelManager_1.ModelManager.LoginModel;
		return {
			roleId: this.IEe(),
			roleName: e.GetPlayerName() ? e.GetPlayerName() : "",
			roleLevel: e.GetPlayerLevel() ? e.GetPlayerLevel().toString() : "1",
			serverId: o.GetServerId() ? o.GetServerId() : "",
			serverName: o.GetServerName() ? o.GetServerName() : "",
			vipLevel: "0",
			partyName: " ",
			setBalanceLevelOne: 0,
			setBalanceLevelTwo: 0,
		};
	}
	static GetSdkOpenUrlWndInfo(e, o) {
		var r = new OpenSdkUrlWndParam();
		(r.title = e), (r.wndUrl = o), (e = Json_1.Json.Stringify(r));
		return (
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("KuroSdk", 28, "SdkJson", ["sdkJson", e ?? ""]),
			e
		);
	}
}
exports.KuroSdkControllerTool = KuroSdkControllerTool;
