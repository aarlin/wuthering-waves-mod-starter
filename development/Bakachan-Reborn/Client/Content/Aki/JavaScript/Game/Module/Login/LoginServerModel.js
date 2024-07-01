"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginServerModel =
		exports.RegionAndIpSt =
		exports.LocalPlayerIpLevelData =
		exports.CurrentRecommendInfo =
		exports.LoginPlayerInfo =
		exports.DEFAULTPING =
			void 0);
const UE = require("ue"),
	Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	DEFAULTSERVERREGION = "America",
	CNSERVERNAME = "Default";
exports.DEFAULTPING = 9999;
class LoginPlayerInfo extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.Code = 0),
			(this.SdkLoginCode = 0),
			(this.UserId = ""),
			(this.UserInfos = void 0),
			(this.RecommendRegion = "");
	}
}
exports.LoginPlayerInfo = LoginPlayerInfo;
class UserRegionInfo {
	constructor() {
		(this.Region = ""), (this.Level = 0), (this.LastOnlineTime = -0);
	}
}
class CurrentRecommendInfo {
	constructor() {
		(this.Index = 0), (this.Ip = "");
	}
}
exports.CurrentRecommendInfo = CurrentRecommendInfo;
class LocalPlayerIpLevelData {
	constructor() {
		(this.Region = ""), (this.Level = 0);
	}
}
exports.LocalPlayerIpLevelData = LocalPlayerIpLevelData;
class RegionAndIpSt {
	constructor() {
		(this.Region = ""), (this.Ip = "");
	}
	Phrase(e, o) {
		(this.Region = e), (this.Ip = o);
	}
}
exports.RegionAndIpSt = RegionAndIpSt;
class LoginServerModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.DMi = new Map()),
			(this.RMi = new Map()),
			(this.OnBeginSuggestServerData = void 0),
			(this.CurrentSelectServerData = void 0),
			(this.CurrentUiSelectSeverData = void 0);
	}
	GetCurrentSelectServerName() {
		let e =
			BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea");
		return (
			"CN" !== e && this.CurrentSelectServerData
				? ((e = this.CurrentSelectServerData.Region),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Pay", 28, "海外支付区域", ["area", e]))
				: (e = "Default"),
			StringUtils_1.StringUtils.IsEmpty(e) ? "Default" : e
		);
	}
	GetCurrentLoginServerId() {
		var e;
		return ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
			ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
			? this.CurrentSelectServerData
				? this.CurrentSelectServerData.id
				: ""
			: (e = BaseConfigController_1.BaseConfigController.GetLoginServers()) &&
					0 < e.length
				? e[0].id
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Login", 28, "当前没有服务器，请检查CDN配置"),
					"");
	}
	IsFirstLogin(e) {
		var o = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData,
		);
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Login",
					28,
					"IsFirstLogin",
					["IsFirstLogin", o?.get(e)],
					["sdkId", e],
				),
			!o?.has(e)
		);
	}
	LastTimeLoginData(e) {
		var o = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData,
		);
		if (o?.has(e))
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Login",
						28,
						"LastTimeLoginData",
						["result?.get(sdkUid).Ip", o?.get(e).Ip],
						["sdkId", e],
						["result?.get(sdkUid).Region", o?.get(e).Region],
					),
				o.get(e)
			);
	}
	SaveFirstLogin(e, o) {
		var r = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData,
		);
		const t = new Map();
		r?.forEach((e, o) => {
			t.set(o, e);
		}),
			(r = new RegionAndIpSt()).Phrase(o.Region, o.ip),
			t.set(e, r),
			LocalStorage_1.LocalStorage.SetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLastTimeLoginData,
				t,
			);
	}
	AddRegionPingValue(e, o) {
		this.RMi.set(e, o);
	}
	RefreshIpPing(e, o) {
		var r = Array.from(this.RMi.keys()),
			t = r.length;
		for (let i = 0; i < t; i++)
			r[i].PingUrl === e &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Login", 28, "RefreshIpPing", [r[i].Region, 1e3 * o]),
				this.RMi.set(r[i], 1e3 * o));
	}
	GetPlayerLoginInfo(e) {
		return this.DMi.get(e);
	}
	SetPlayerLoginInfo(e, o) {
		this.DMi.set(e, o);
	}
	FindIpServerData(e) {
		var o = Array.from(this.RMi.keys()),
			r = o.length;
		for (let t = 0; t < r; t++)
			if (o[t].ip === e.Ip && o[t].Region === e.Region) return o[t];
	}
	InitSuggestData(e, o) {
		this.CurrentSelectServerData = void 0;
		e = this.UMi(e);
		(this.CurrentSelectServerData = this.FindIpServerData(e)),
			(this.OnBeginSuggestServerData = this.CurrentSelectServerData),
			this.OnBeginSuggestServerData ||
				((e = BaseConfigController_1.BaseConfigController.GetLoginServers()) &&
					0 < e.length &&
					((this.OnBeginSuggestServerData = e[0]),
					(this.CurrentSelectServerData = e[0]))),
			o?.(this.CurrentSelectServerData);
	}
	UMi(e) {
		var o = Array.from(this.RMi.keys()),
			r = o.length,
			t =
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Login", 28, "GetSuggestServerData"),
				this.GetPlayerLoginInfo(e));
		if (!t)
			return (e = this.LastTimeLoginData(e))
				? (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Login", 28, "没有服务器信息拿本地登录信息", [
							"data",
							e.Region,
						]),
					e)
				: (Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Login", 28, "没有拿到服务器推荐返回低Ping"),
					this.AMi("America"));
		let i = "";
		if (0 < t.UserInfos.length) {
			var g = t.UserInfos[0].LastOnlineTime,
				n = ((i = t.UserInfos[0].Region), t.UserInfos.length);
			for (let e = 0; e < n; e++)
				t.UserInfos[e].LastOnlineTime > g && (i = t.UserInfos[e].Region);
		}
		var a;
		if ("" !== i && (e = this.PMi(i)))
			return (
				(a = new RegionAndIpSt()).Phrase(e.Region, e.ip),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Login", 28, "recommendRegion", [
						"recommendRegion",
						i,
					]),
				a
			);
		var l = t.RecommendRegion;
		for (let e = 0; e < r; e++)
			if (o[e].Region === l) {
				if (this.xMi())
					return (
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Login", 28, "PingHigh", [o[e].Region, o[e].ip]),
						(s = new RegionAndIpSt()).Phrase(o[e].Region, o[e].ip),
						s
					);
				var s = this.RMi.get(o[e]);
				if (s && 100 < s)
					return (
						Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"Login",
								28,
								"this.RegionPingMap.get(keys[i]) > 100",
							),
						this.AMi("America")
					);
				Log_1.Log.CheckDebug() && Log_1.Log.Debug("Login", 28, "返回推荐");
				var L = new RegionAndIpSt();
				return L.Phrase(o[e].Region, o[e].ip), L;
			}
		return this.AMi("America");
	}
	PMi(e) {
		var o = Array.from(this.RMi.keys()),
			r = o.length;
		for (let t = 0; t < r; t++) if (o[t].Region === e) return o[t];
	}
	xMi() {
		var e = Array.from(this.RMi.keys()),
			o = e.length;
		for (let t = 0; t < o; t++) {
			var r = this.RMi.get(e[t]);
			if (r && r < 100) return !1;
		}
		return !0;
	}
	AMi(e) {
		var o = Array.from(this.RMi.keys()),
			r = o.length;
		let t = exports.DEFAULTPING,
			i = "";
		var g = new RegionAndIpSt();
		for (let n = 0; n < r; n++)
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Login", 28, "区域ping", [
					"ping",
					this.RMi.get(o[n]).toString(),
				]),
				t > this.RMi.get(o[n]) &&
					((t = this.RMi.get(o[n])),
					g.Phrase(o[n].Region, o[n].ip),
					Log_1.Log.CheckDebug()) &&
					Log_1.Log.Debug("Login", 28, "尝试选择低Ping", [o[n].Region, t]),
				o[n].Region === e && (i = o[n].ip);
		return (
			StringUtils_1.StringUtils.IsEmpty(g.Ip) &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Login", 28, "找不到低ping，用默认服务器"),
				g.Phrase(e, i)),
			g
		);
	}
	GetLoginLevel(e, o) {
		var r = this.GetPlayerLoginInfo(e);
		if (r) {
			var t = r.UserInfos?.length ?? 0;
			for (let e = 0; e < t; e++)
				if (r.UserInfos[e]?.Region === o) return r.UserInfos[e].Level;
			return 0;
		}
		return (
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Login", 28, "找不到ServerLevel", ["region", o]),
			this.wMi(e, o)
		);
	}
	wMi(e, o) {
		var r = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData,
		);
		if (r?.has(e)) {
			var t = r.get(e),
				i = t.length;
			for (let e = 0; e < i; e++) if (t[e].Region === o) return t[e].Level;
		}
		return 0;
	}
	GetCurrentArea() {
		var e = UE.KuroStaticLibrary.GetCultureRegion().split("-"),
			o = e.length;
		return 1 < o ? e[o - 1] : "US";
	}
	SaveLocalRegionLevel(e, o, r) {
		var t = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData,
		);
		const i = new Map();
		t?.forEach((e, o) => {
			i.set(o, e);
		});
		let g = i.get(e);
		var n = (g = g || new Array()).length;
		let a = !1;
		for (let e = 0; e < n; e++)
			if (g[e].Region === o) {
				(g[e].Level = r), (a = !0);
				break;
			}
		a ||
			(((t = new LocalPlayerIpLevelData()).Region = o),
			(t.Level = r),
			g.push(t)),
			i.set(e, g),
			LocalStorage_1.LocalStorage.SetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.SdkLevelData,
				i,
			);
	}
}
exports.LoginServerModel = LoginServerModel;
