"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogUpload = void 0);
const cpp_1 = require("cpp"),
	puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../../Core/Common/Info"),
	Log_1 = require("../../../Core/Common/Log"),
	Net_1 = require("../../../Core/Net/Net"),
	BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
	NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager");
class LogUpload {
	static Init() {
		UE.KuroTencentCOSLibrary.EnableAuthorization(!1);
		var e =
			BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()
				?.LogReport;
		e
			? UE.KuroTencentCOSLibrary.SetSendLogConfig("", "", e.name, e.region)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LogUpload",
					10,
					"CDN下发数据未配置腾讯云对象存储相关配置！",
				),
			UE.KuroTencentCOSLibrary.SetAdmissibleValue(this.$pi),
			UE.KuroTencentCOSLibrary.SetHandleFunc(
				(0, puerts_1.toManualReleaseDelegate)(this.PreSendFiles),
				(0, puerts_1.toManualReleaseDelegate)(this.PostSended),
			),
			this.Ypi &&
				(Info_1.Info.IsPc() &&
					UE.KuroTencentCOSLibrary.EnableAutoSendWhenExit(),
				Info_1.Info.IsMobile()) &&
				UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
					NetworkDefine_1.ENetworkType.WiFi &&
				UE.KuroTencentCOSLibrary.SendLogToTencentCOS(
					(0, puerts_1.toManualReleaseDelegate)(this.Jpi),
				);
	}
	static zpi(e) {
		return UE.KuroStaticLibrary.DirectoryExists(e);
	}
	static Zpi() {
		this.evi();
		let e = "";
		"" !== this.ae && (e = this.ae + "-");
		var r =
			`${(r = new Date()).getFullYear()}.${r.getMonth() + 1}.${r.getDate()}-${r.getHours()}.${r.getMinutes()}.` +
			r.getSeconds();
		return "" === this.tvi ? e + r + ".zip" : `${this.tvi}-${e}${r}.zip`;
	}
	static SendLog(e) {}
	static evi() {
		let e = "";
		var r;
		Net_1.Net.IsServerConnected()
			? (e = ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString())
			: void 0 !==
					(r = LocalStorage_1.LocalStorage.GetGlobal(
						LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyLoginUID,
					)) && (e = r.toString());
		let o = "0";
		ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
			(o = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid),
			(this.tvi = o + "-" + e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Log", 38, "获取日志上传UID", ["UID", this.tvi]);
	}
}
(exports.LogUpload = LogUpload),
	((_a = LogUpload).Ypi = !1),
	(LogUpload.$pi = 5),
	(LogUpload.ae = ""),
	(LogUpload.ivi = 20),
	(LogUpload.tvi = ""),
	(LogUpload.ovi = "Logs/Sendedlogs.json"),
	(LogUpload.rvi = void 0),
	(LogUpload.Jpi = (e, r) => {
		(5 !== e && 4 !== e) || UE.KuroTencentCOSLibrary.SetIsAutoSend(!1);
	}),
	(LogUpload.PostSended = (e) => {
		_a.rvi || (_a.rvi = { Paths: [] });
		var r = cpp_1.KuroLoggingLibrary.GetLogFilename(),
			o = e.Num();
		for (let i = 0; i < o; i++) {
			var t = e.Get(i);
			t.endsWith(r) || _a.rvi.Paths.includes(t) || _a.rvi.Paths.push(t);
		}
		UE.KuroStaticLibrary.SaveStringToFile(
			JSON.stringify(_a.rvi),
			UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.ovi,
		);
	}),
	(LogUpload.PreSendFiles = (e) => {
		var r = UE.NewArray(UE.BuiltinString);
		let o = [];
		var t = e.Num();
		for (let l = 0; l < t; l++) {
			var i = e.Get(l);
			if (!_a.zpi(i)) {
				var a,
					n = (a = (a = i.split("/"))[a.length - 1]).split(".");
				let e;
				1 < n.length && (e = n[n.length - 1]),
					!a.startsWith("Client") ||
						a.startsWith("Client_") ||
						(!e && "log" !== e) ||
						(a.startsWith("Client-") ? o.push(i) : r.Add(i));
			}
		}
		var l,
			s,
			g = UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.ovi;
		UE.KuroStaticLibrary.FileExists(
			UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.ovi,
		) &&
			((s = ("", puerts_1.$ref)("")),
			UE.KuroStaticLibrary.LoadFileToString(s, g),
			(l = (0, puerts_1.$unref)(s)),
			(_a.rvi = JSON.parse(l)),
			(_a.rvi.Paths = _a.rvi.Paths.filter((e) => o.includes(e)))),
			o.length > _a.ivi && (o.sort(), o.splice(0, o.length - _a.ivi)),
			0 <
				(o = _a.rvi ? o.filter((e) => !_a.rvi.Paths.includes(e)) : o).length &&
				(g = /\d{4}.\d{1,2}.\d{1,2}-\d{1,2}.\d{1,2}.\d{1,2}/.exec(o[0])) &&
				0 < g?.length &&
				(_a.ae = g[0]);
		for (const e of o) r.Add(e);
		UE.KuroTencentCOSLibrary.SetFilesToSend(r),
			UE.KuroTencentCOSLibrary.SetSendLogZipName(_a.Zpi());
	});
