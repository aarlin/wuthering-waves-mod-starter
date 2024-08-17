"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoginModel =
		exports.LoginNotice =
		exports.LoginNoticeEx =
		exports.ServerInfo =
		exports.ServerData =
		exports.ReconnectInfo =
		exports.DEFAULT_SERVER_IP =
		exports.STREAM_MAINLINE =
		exports.STREAM =
			void 0);
const UE = require("ue"),
	CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Info_1 = require("../../../Core/Common/Info"),
	Json_1 = require("../../../Core/Common/Json"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
	StringUtils_1 = require("../../../Core/Utils/StringUtils"),
	BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager"),
	LoginDefine_1 = require("./Data/LoginDefine"),
	Heartbeat_1 = require("./Heartbeat"),
	HeartbeatDefine_1 = require("./HeartbeatDefine");
(exports.STREAM = "Stream"),
	(exports.STREAM_MAINLINE = "mainline"),
	(exports.DEFAULT_SERVER_IP = "127.0.0.1");
class ReconnectInfo {
	constructor(e, i, t) {
		(this.Token = ""),
			(this.Host = ""),
			(this.Port = 0),
			(this.Token = e),
			(this.Host = i),
			(this.Port = t);
	}
}
exports.ReconnectInfo = ReconnectInfo;
class MapConfig {
	constructor(e, i) {
		(this.MapId = 0), (this.MapName = ""), (this.MapId = e), (this.MapName = i);
	}
}
class ServerData {
	constructor(e) {
		(this.Config = new ServerConfig()), e && (this.Config = e);
	}
	SetIp(e) {
		return (this.Config.Ip = e), this;
	}
}
exports.ServerData = ServerData;
class ServerConfig extends Json_1.JsonObjBase {
	constructor(e = "", i = "", t = "", o = 0) {
		super(),
			(this.Ip = ""),
			(this.Port = ""),
			(this.Name = ""),
			(this.Order = 0),
			(this.Ip = e),
			(this.Port = i),
			(this.Name = t),
			(this.Order = o);
	}
}
class ServerInfo extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.server = ""),
			(this.address = ""),
			(this.description = ""),
			(this.stream = ""),
			(this.editor = void 0),
			(this.package = void 0),
			(this.order = void 0);
	}
}
exports.ServerInfo = ServerInfo;
class LoginNoticeEx extends Json_1.JsonObjBase {
	constructor() {
		super(...arguments),
			(this.title = ""),
			(this.content = ""),
			(this.whiteList = void 0),
			(this.startTimeMs = -0),
			(this.endTimeMs = -0);
	}
}
exports.LoginNoticeEx = LoginNoticeEx;
class LoginNotice {
	constructor() {
		(this.Id = ""),
			(this.WhiteLists = void 0),
			(this.ModifyTime = -0),
			(this.BeginTime = -0),
			(this.EndTime = -0),
			(this.Title = ""),
			(this.content = "");
	}
	Phrase(e) {
		(this.WhiteLists = e.whiteList),
			(this.BeginTime = e.startTimeMs / 1e3),
			(this.EndTime = e.endTimeMs / 1e3),
			(this.Title = e.title),
			(this.content = e.content);
	}
}
exports.LoginNotice = LoginNotice;
class SdkLoginConfig {
	constructor(e = "", i = "", t = "") {
		(this.Uid = ""),
			(this.UserName = ""),
			(this.Token = ""),
			(this.Uid = e),
			(this.UserName = i),
			(this.Token = t);
	}
}
class LoginModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.BornMode = 1),
			(this.BornLocation = void 0),
			(this.Platform = ""),
			(this.Qvi = void 0),
			(this.Xvi = void 0),
			(this.$vi = void 0),
			(this.Yvi = void 0),
			(this.RBn = void 0),
			(this.XK = LoginDefine_1.ELoginStatus.Init),
			(this.Jvi = void 0),
			(this.zvi = !1),
			(this.Zvi = void 0),
			(this.M8e = ""),
			(this.eMi = void 0),
			(this.tMi = !1),
			(this.SmokeTestReady = !1),
			(this.iMi = 0),
			(this.oMi = new Map()),
			(this.rMi = void 0),
			(this.nMi = !1),
			(this.sMi = -0),
			(this.aMi = 0),
			(this.hMi = 0),
			(this.LoginNotice = void 0),
			(this.lMi = 0),
			(this._Mi = 0),
			(this.uMi = 0),
			(this.g9s = void 0),
			(this.f9s = void 0),
			(this.p9s = void 0),
			(this.cMi = void 0),
			(this.mMi = 10),
			(this.dMi = void 0),
			(this.CMi = void 0),
			(this.gMi = void 0),
			(this.fMi = void 0),
			(this.AutoLoginTimerIdInternal = void 0);
	}
	get pMi() {
		return LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.LoginFailCount,
			0,
		);
	}
	set pMi(e) {
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.LoginFailCount,
			e,
		);
	}
	get vMi() {
		return LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.NextLoginTime,
			0,
		);
	}
	set vMi(e) {
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.NextLoginTime,
			e,
		);
	}
	get MMi() {
		return LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.ResetLoginFailCountTime,
			0,
		);
	}
	set MMi(e) {
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.ResetLoginFailCountTime,
			e,
		);
	}
	get PublicJsonVersion() {
		return this.lMi;
	}
	set PublicJsonVersion(e) {
		this.lMi = e;
	}
	get PublicMiscVersion() {
		return this._Mi;
	}
	set PublicMiscVersion(e) {
		this._Mi = e;
	}
	get PublicUniverseEditorVersion() {
		return this.uMi;
	}
	set PublicUniverseEditorVersion(e) {
		this.uMi = e;
	}
	get LauncherVersion() {
		return this.g9s;
	}
	set LauncherVersion(e) {
		this.g9s = e;
	}
	get ResourceVersion() {
		return this.f9s;
	}
	set ResourceVersion(e) {
		this.f9s = e;
	}
	get VerifyConfigVersionHandle() {
		return this.p9s;
	}
	set VerifyConfigVersionHandle(e) {
		this.p9s = e;
	}
	OnInit() {
		return (
			(this.BornMode = 1),
			(this.BornLocation = new Protocol_1.Aki.Protocol.VBs()),
			(this.XK = LoginDefine_1.ELoginStatus.Init),
			(this.hMi = 0),
			this.InitRecentlyAccountList(),
			!0
		);
	}
	OnClear() {
		return (
			(this.XK = LoginDefine_1.ELoginStatus.Init),
			(this.hMi = 0),
			(this.Qvi = []),
			(this.Xvi = []),
			(this.$vi = []),
			(this.Yvi = []),
			(this.XK = LoginDefine_1.ELoginStatus.Init),
			(this.zvi = !1),
			(this.M8e = ""),
			(this.eMi = void 0),
			(this.tMi = !1),
			(this.Jvi = void 0),
			(this.lMi = 0),
			(this._Mi = 0),
			(this.uMi = 0),
			(this.g9s = void 0),
			(this.f9s = void 0),
			(this.iMi = 0),
			this.oMi.clear(),
			!0
		);
	}
	InitConfig() {
		if (!this.Qvi || !this.Xvi || !this.$vi) {
			(this.Qvi = new Array()),
				(this.Xvi = new Array()),
				(this.$vi = new Array()),
				(this.Yvi = new Array());
			var e = ConfigManager_1.ConfigManager.LoginConfig.GetAllInstanceDungeon();
			if (e)
				for (const i of e) {
					let e =
						ConfigManager_1.ConfigManager.LoginConfig.GetInstanceDungeonNameById(
							i.MapName,
						);
					void 0 === e && (e = ""), this.Qvi.push(new MapConfig(i.Id, e));
				}
		}
	}
	AddServerInfoByCdn() {
		if (this.$vi) {
			var e = BaseConfigController_1.BaseConfigController.GetLoginServers();
			if (e) {
				e.length <= 0 &&
					Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Login", 11, "CDN的服务器数据列表为空");
				for (const t of e) {
					var i = new ServerConfig(t.ip, LoginDefine_1.DEFAULTPORT, t.name, 0);
					this.$vi.push(i), this.Yvi.push(new ServerData(i));
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Login", 11, "拿不到CDN返回的服务器数据");
		}
	}
	AddExtraServer() {
		var e = UE.BlueprintPathsLibrary.ProjectConfigDir() + "/ServerConfig.json",
			i = UE.KuroStaticLibrary.LoadFileToStringArray(e);
		if (!(i.Num() <= 0))
			for (let e = 0; e < i.Num(); ++e) {
				var t = Json_1.Json.Parse(i.Get(e));
				this.$vi.push(t);
			}
	}
	AddServerInfos(e) {
		if (this.$vi) {
			var i = Info_1.Info.IsPlayInEditor;
			for (const t of e)
				((i && t.editor) || (!i && t.package)) &&
					this.$vi.push(
						new ServerConfig(
							t.address,
							LoginDefine_1.DEFAULTPORT,
							t.description,
							t.order,
						),
					);
		}
	}
	AddDataTableServers() {
		if (this.$vi && GlobalData_1.GlobalData.World) {
			var e = DataTableUtil_1.DataTableUtil.GetAllDataTableRow(14);
			if (e)
				for (const i of e)
					this.$vi.push(new ServerConfig(i.IP, i.Port, i.Name, i.Order));
		}
	}
	CleanConfig() {
		(this.Qvi = void 0),
			(this.Xvi = void 0),
			(this.$vi = void 0),
			(this.rMi = void 0),
			(this.Yvi = void 0);
	}
	SetCreatePlayerTime(e) {
		this.sMi = e;
	}
	GetCreatePlayerTime() {
		return this.sMi;
	}
	SetCreatePlayerId(e) {
		this.aMi = e;
	}
	GetCreatePlayerId() {
		return this.aMi;
	}
	GetServerIp() {
		var e = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.ServerIp,
			"-1",
		);
		return "-1" === e ? void 0 : e;
	}
	SetServerIp(e, i) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Login",
				9,
				"保存服务器IP",
				["serverIp", e],
				["reason", i],
			),
			LocalStorage_1.LocalStorage.SetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.ServerIp,
				e,
			);
	}
	TrySetCustomServerPort(e, i) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Login",
				9,
				"自定义服务器Port",
				["port", e],
				["reason", i],
			),
			(this.RBn = e);
	}
	TryGetRealServerPort() {
		var e = this.GetCustomServerPort();
		return e ? ((this.RBn = void 0), e) : this.GetServerPort();
	}
	GetCustomServerPort() {
		return this.RBn;
	}
	GetServerPort() {
		var e = UE.KismetSystemLibrary.GetCommandLine().split(" "),
			i = e.indexOf("-LocalGameServerStartPort");
		return -1 === i ||
			i + 1 >= e.length ||
			((e = parseInt(e[i + 1], 10)), isNaN(e))
			? "5500"
			: (e + 1).toString();
	}
	GetServerName() {
		var e = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.ServerName,
			"-1",
		);
		return "-1" === e ? void 0 : e;
	}
	SetServerName(e) {
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.ServerName,
			e,
		),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 28, "当前选择服务器Name", ["serverId", e]);
	}
	GetServerId() {
		return LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.ServerId,
			"0",
		);
	}
	SetServerId(e) {
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.ServerId,
			e,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnSetLoginServerId,
			),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Login", 28, "当前选择服务器Id", ["serverId", e]);
	}
	GetSingleMapId() {
		var e = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.SingleMapId,
			-1,
		);
		return -1 === e ? void 0 : e;
	}
	SetSingleMapId(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Login", 9, "保存单人副本id", ["singleMapId", e]),
			LocalStorage_1.LocalStorage.SetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.SingleMapId,
				e,
			);
	}
	GetMultiMapId() {
		var e = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.MultiMapId,
			-1,
		);
		return -1 === e ? void 0 : e;
	}
	SetMultiMapId(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Login", 9, "保存多人副本id", ["multiMapId", e]),
			LocalStorage_1.LocalStorage.SetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.MultiMapId,
				e,
			);
	}
	GetAccount() {
		return LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.Account,
			"",
		);
	}
	SetAccount(e) {
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.Account,
			e,
		),
			this.AddRecentlyAccount(e),
			ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfo(e);
	}
	GetSelectBoxActive() {
		return (
			LocalStorage_1.LocalStorage.GetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.SelectBoxActive,
				!0,
			) ?? !1
		);
	}
	SetSelectBoxActive(e) {
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.SelectBoxActive,
			e,
		);
	}
	GetAutoOpenLoginView() {
		return this.zvi;
	}
	SetAutoOpenLoginView(e) {
		this.zvi = e;
	}
	GetLoginStatus() {
		return this.XK;
	}
	GetLastFailStatus() {
		return this.Jvi;
	}
	SetLoginStatus(e, i = 0) {
		e !== this.XK &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Login",
					9,
					"登录状态变化",
					["Before", LoginDefine_1.ELoginStatus[this.XK]],
					["After", LoginDefine_1.ELoginStatus[e]],
				),
			this.XK !== LoginDefine_1.ELoginStatus.Init &&
			e === LoginDefine_1.ELoginStatus.Init
				? (Log_1.Log.CheckError() && Log_1.Log.Error("Login", 22, "登录失败"),
					Heartbeat_1.Heartbeat.StopHeartBeat(
						HeartbeatDefine_1.EStopHeartbeat.LoginStatusInit,
					),
					(this.Jvi = this.XK))
				: (this.Jvi = void 0),
			(this.XK = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.LoginStatusChange,
			));
	}
	IsLoginStatus(e) {
		return this.XK === e;
	}
	SetSdkLoginState(e) {
		this.hMi = e;
	}
	GetSdkLoginState() {
		return this.hMi;
	}
	IsSdkLoggedIn() {
		return 1 === this.hMi;
	}
	GetSingleMapList() {
		return this.Qvi;
	}
	GetSingleMapIp(e) {
		if (e < this.Qvi.length) return this.Qvi[e].MapId;
	}
	GetServerInfoList() {
		return this.$vi?.sort((e, i) => e.Order - i.Order), this.$vi;
	}
	GetServerDataList() {
		return this.Yvi;
	}
	GetServerInfo(e) {
		if (e < this.$vi.length) return this.$vi[e];
	}
	HasReconnectInfo() {
		return void 0 !== this.Zvi;
	}
	SetReconnectInfo(e, i, t) {
		this.Zvi = new ReconnectInfo(e, i, t);
	}
	SetReconnectToken(e) {
		this.Zvi && (this.Zvi.Token = e);
	}
	GetReconnectToken() {
		if (void 0 !== this.Zvi) return this.Zvi.Token;
	}
	GetReconnectHost() {
		if (void 0 !== this.Zvi) return this.Zvi.Host;
	}
	GetReconnectPort() {
		if (void 0 !== this.Zvi) return this.Zvi.Port;
	}
	GetPlayerName() {
		return this.M8e;
	}
	SetPlayerName(e) {
		this.M8e = e;
	}
	GetPlayerSex() {
		return this.eMi;
	}
	SetPlayerSex(e) {
		this.eMi = e;
	}
	IsPlayerSexValid(e) {
		let i = e;
		return (
			(i = void 0 === e ? this.eMi : i) === LoginDefine_1.ELoginSex.Boy ||
			i === LoginDefine_1.ELoginSex.Girl
		);
	}
	GetHasCharacter() {
		return this.tMi;
	}
	SetHasCharacter(e) {
		this.tMi = e;
	}
	CleanCreateData() {
		(this.tMi = !1), (this.M8e = ""), (this.eMi = void 0);
	}
	SetRpcHttp(e, i) {
		const t = ++this.iMi;
		return (
			(i = TimerSystem_1.TimerSystem.Delay(() => {
				this.IsLoginStatus(LoginDefine_1.ELoginStatus.LoginHttp) &&
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Login", 9, "http请求超时", ["rpcId", t]),
					this.oMi.delete(t),
					e());
			}, i)),
			this.oMi.set(t, i),
			t
		);
	}
	CleanRpcHttp(e) {
		var i = this.oMi.get(e);
		return !!i && (TimerSystem_1.TimerSystem.Remove(i), this.oMi.delete(e), !0);
	}
	AddLoginFailCount() {
		0 === this.pMi &&
			((e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime()),
			this.SMi(e)),
			this.SetLoginFailCount(this.pMi + 1);
		var e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(
			this.pMi,
		);
		this.EMi(e);
	}
	IsThisTimeCanLogin() {
		var e = 0.001 * Date.now();
		if (0 < this.pMi) {
			var i = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime();
			if (e >= this.MMi + i)
				return (
					this.CleanLoginFailCount(
						LoginDefine_1.ECleanFailCountWay.RefreshTime,
					),
					!0
				);
		}
		return (
			(i =
				this.vMi +
				ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(
					this.pMi,
				)) <= e ||
			((e = new Date(1e3 * i)),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Login", 9, "下次可登录的时间戳", [
					"NextLoginTime",
					TimeUtil_1.TimeUtil.DateFormat(e),
				]),
			!1)
		);
	}
	CleanLoginFailCount(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Login", 9, "清空登录失败信息", [
				"way",
				LoginDefine_1.ECleanFailCountWay[e],
			]),
			this.SetLoginFailCount(0, !1),
			this.EMi(0, !1),
			this.SMi(0, !1);
	}
	SetLoginFailCount(e, i = !0) {
		(this.pMi = e),
			i &&
				Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Login", 9, "登录失败次数增加", [
					"LoginFailCount",
					this.pMi,
				]);
	}
	EMi(e, i = !0) {
		(this.vMi = 0.001 * Date.now()),
			i &&
				((i = new Date(1e3 * (this.vMi + e))), Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug("Login", 9, "设置下次可登录时间", [
					"NextLoginTime",
					TimeUtil_1.TimeUtil.DateFormat(i),
				]);
	}
	SMi(e, i = !0) {
		(this.MMi = 0.001 * Date.now()),
			i &&
				((i = new Date(1e3 * (this.MMi + e))), Log_1.Log.CheckDebug()) &&
				Log_1.Log.Debug("Login", 9, "设置下次重置登录失败时间", [
					"ResetLoginFailCountTime",
					TimeUtil_1.TimeUtil.DateFormat(i),
				]);
	}
	FixLoginFailInfo() {
		var e,
			i = 0.001 * Date.now();
		this.MMi > i &&
			((e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailResetTime()),
			this.SMi(e)),
			this.vMi > i &&
				((e = ConfigManager_1.ConfigManager.LoginConfig.GetLoginFailParam(
					this.pMi,
				)),
				this.EMi(e));
	}
	SetSdkLoginConfig(e, i, t) {
		this.rMi = new SdkLoginConfig(e, i, t);
	}
	GetSdkLoginConfig() {
		return this.rMi;
	}
	set LogoutNotify(e) {
		this.cMi = e;
	}
	get LogoutNotify() {
		return this.cMi;
	}
	SetTodayFirstTimeLogin(e) {
		this.nMi = e;
	}
	GetTodayFirstTimeLogin() {
		return this.nMi;
	}
	GetLastLoginTime() {
		return LocalStorage_1.LocalStorage.GetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.LoginTime,
			0,
		);
	}
	SetLastLoginTime(e) {
		LocalStorage_1.LocalStorage.SetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.LoginTime,
			e,
		);
	}
	AddRecentlyAccount(e) {
		if (!StringUtils_1.StringUtils.IsEmpty(e)) {
			for (this.dMi || (this.dMi = []); this.dMi.length >= this.mMi; )
				this.dMi.splice(0, 1);
			let i = -1;
			for (let t = 0; t < this.dMi.length; t++)
				if (this.dMi[t] === e) {
					i = t;
					break;
				}
			-1 !== i && this.dMi.splice(i, 1), this.dMi.push(e);
		}
	}
	InitRecentlyAccountList() {
		(this.dMi = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyAccountList,
		)),
			this.dMi || (this.dMi = []);
	}
	GetRecentlyAccountList() {
		return this.dMi;
	}
	SaveRecentlyAccountList() {
		this.dMi &&
			LocalStorage_1.LocalStorage.SetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyAccountList,
				this.dMi,
			);
	}
	get LoginTraceId() {
		return this.CMi;
	}
	set LoginTraceId(e) {
		this.CMi = e;
	}
	CreateLoginPromise() {
		this.gMi = new CustomPromise_1.CustomPromise();
	}
	FinishLoginPromise() {
		this.gMi?.SetResult(void 0);
	}
	async WaitLoginPromise() {
		await this.gMi?.Promise, (this.gMi = void 0);
	}
	HasLoginPromise() {
		return void 0 !== this.gMi;
	}
	CreateAutoLoginPromise() {
		this.fMi = new CustomPromise_1.CustomPromise();
	}
	ClearAutoLoginPromise() {
		this.fMi = void 0;
	}
	FinishAutoLoginPromise(e) {
		this.fMi.SetResult(e);
	}
	async WaitAutoLoginPromise() {
		var e = await this.fMi?.Promise;
		return (this.fMi = void 0), e;
	}
	HasAutoLoginPromise() {
		return void 0 !== this.fMi;
	}
	get AutoLoginTimerId() {
		return this.AutoLoginTimerIdInternal;
	}
	set AutoLoginTimerId(e) {
		this.AutoLoginTimerIdInternal = e;
	}
	ClearAutoLoginTimerId() {
		void 0 !== this.AutoLoginTimerId &&
			(TimerSystem_1.TimerSystem.Remove(this.AutoLoginTimerId),
			(this.AutoLoginTimerId = void 0));
	}
}
exports.LoginModel = LoginModel;
