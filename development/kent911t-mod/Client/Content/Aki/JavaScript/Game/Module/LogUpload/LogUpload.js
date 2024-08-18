"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.LogUpload = void 0;
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
        var e = BaseConfigController_1.BaseConfigController.GetCdnReturnConfigInfo()?.LogReport;
        e?UE.KuroTencentCOSLibrary.SetSendLogConfig("", "", e.name, e.region) : Log_1.Log.CheckError() && Log_1.Log.Error("LogUpload", 10, "CDN下发数据未配置腾讯云对象存储相关配置！"), UE.KuroTencentCOSLibrary.SetAdmissibleValue(this.$vi), UE.KuroTencentCOSLibrary.SetHandleFunc((0, puerts_1.toManualReleaseDelegate)(this.PreSendFiles), (0, puerts_1.toManualReleaseDelegate)(this.PostSended)), this.Yvi && (Info_1.Info.IsPcOrGamepadPlatform() && UE.KuroTencentCOSLibrary.EnableAutoSendWhenExit(), Info_1.Info.IsMobilePlatform()) && UE.KuroLauncherLibrary.GetNetworkConnectionType() === NetworkDefine_1.ENetworkType.WiFi && UE.KuroTencentCOSLibrary.SendLogToTencentCOS((0, puerts_1.toManualReleaseDelegate)(this.Jvi))
    }
    static zvi(e) {
        return UE.KuroStaticLibrary.DirectoryExists(e)
    }
    static Zvi() {
        this.eMi();
        let e = "";
        "" !== this.ae && (e = this.ae + "-");
        var o = new Date,
            o = `${o.getFullYear()}.${o.getMonth()+1}.${o.getDate()}-${o.getHours()}.${o.getMinutes()}.` + o.getSeconds();
        return "" === this.tMi?e + o + ".zip" : `${this.tMi}-${e}${o}.zip`
    }
    static SendLog(e) {
        // WARNING!
        // UE.KuroTencentCOSLibrary.SendLogToTencentCOS(e)
    }
    static eMi() {
        let e = "";
        var o;
        Net_1.Net.IsServerConnected()?e = ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString() : void 0 !== (o = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.RecentlyLoginUID)) && (e = o.toString());
        let r = "0";
        ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && (r = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid?ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid.toString() : "0"), this.tMi = r + "-" + e, Log_1.Log.CheckInfo() && Log_1.Log.Info("Log", 38, "获取日志上传UID", ["UID", this.tMi])
    }
}
exports.LogUpload = LogUpload, (_a = LogUpload).Yvi = !1, LogUpload.$vi = 5, LogUpload.ae = "", LogUpload.iMi = 20, LogUpload.tMi = "", LogUpload.oMi = "Logs/Sendedlogs.json", LogUpload.rMi = void 0, LogUpload.Jvi = (e, o) => {
    5 !== e && 4 !== e || UE.KuroTencentCOSLibrary.SetIsAutoSend(!1)
}, LogUpload.PostSended = o => {
    _a.rMi || (_a.rMi = {
        Paths: []
    });
    var r = cpp_1.KuroLoggingLibrary.GetLogFilename(),
        a = o.Num();
    for (let e = 0; e < a; e++) {
        var t = o.Get(e);
        t.endsWith(r) || _a.rMi.Paths.includes(t) || _a.rMi.Paths.push(t)
    }
    UE.KuroStaticLibrary.SaveStringToFile(JSON.stringify(_a.rMi), UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.oMi)
}, LogUpload.PreSendFiles = o => {
    var r = UE.NewArray(UE.BuiltinString);
    let a = [];
    var t = o.Num();
    for (let e = 0; e < t; e++) {
        var _ = o.Get(e);
        if (!_a.zvi(_)) {
            var i = _.split("/"),
                i = i[i.length - 1],
                l = i.split(".");
            let e = void 0;
            1 < l.length && (e = l[l.length - 1]), !i.startsWith("Client") || i.startsWith("Client_") || !e && "log" !== e || (i.startsWith("Client-")?a.push(_) : r.Add(_))
        }
    }
    var e, n, s = UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.oMi;
    UE.KuroStaticLibrary.FileExists(UE.BlueprintPathsLibrary.ProjectSavedDir() + _a.oMi) && (n = (e = "", puerts_1.$ref)(""), UE.KuroStaticLibrary.LoadFileToString(n, s), e = (0, puerts_1.$unref)(n), _a.rMi = JSON.parse(e), _a.rMi.Paths = _a.rMi.Paths.filter(e => a.includes(e))), a.length > _a.iMi && (a.sort(), a.splice(0, a.length - _a.iMi)), 0 < (a = _a.rMi?a.filter(e => !_a.rMi.Paths.includes(e)) : a).length && (s = /\d{4}.\d{1,2}.\d{1,2}-\d{1,2}.\d{1,2}.\d{1,2}/.exec(a[0])) && 0 < s?.length && (_a.ae = s[0]);
    for (const g of a) r.Add(g);
    UE.KuroTencentCOSLibrary.SetFilesToSend(r), UE.KuroTencentCOSLibrary.SetSendLogZipName(_a.Zvi())
};
//# sourceMappingURL=LogUpload.js.map