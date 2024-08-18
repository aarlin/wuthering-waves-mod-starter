"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.AntiCheatModel = void 0;
const UE = require("ue"),
    ModelBase_1 = require("../../../Core/Framework/ModelBase"),
    LocalStorage_1 = require("../../Common/LocalStorage"),
    LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
    ModelManager_1 = require("../../Manager/ModelManager"),
    AntiCheatData_1 = require("./AntiCheatData"),
    ControllerHolder_1 = require("../../Manager/ControllerHolder"),
    BUNDLE_DATA_EVENT_ID = "8",
    HEARTBEAT_DATA_EVENT_ID = "9";
class AntiCheatModel extends ModelBase_1.ModelBase {
    constructor() {
        super(...arguments), this.Qre = "", this.qje = "", this.Gje = 0
    }
    GetVersion() {
        return this.Qre
    }
    GetBundleId() {
        return this.qje
    }
    OnInit() {
        var e = UE.KuroLauncherLibrary.GetAppVersion();
        return this.Qre = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion, e), this.qje = UE.KismetSystemLibrary.GetGameBundleId(), !0
    }
    static GetBundleData() {
        return {}
        // var e = new AntiCheatData_1.AntiCheatBundleData;
        // e.event_id = BUNDLE_DATA_EVENT_ID;
        // let t = ModelManager_1.ModelManager.LoginModel.GetAccount();
        // return ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && (t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid), e.unique_id = t, e.s_bundle_id = ModelManager_1.ModelManager.AntiCheatModel.GetBundleId(), e.s_version = ModelManager_1.ModelManager.AntiCheatModel.GetVersion(), e
    }
    ResetHeartbeatException() {
        this.Gje = 0
    }
    HitHeartbeatException() {
        this.Gje += 1
    }
    GetHeartbeatException() {
        return this.Gje
    }
    HasHeartbeatException() {
        return 0 < this.Gje
    }
    GetHeartbeatData() {
        return {}
        // var e = new AntiCheatData_1.AntiCheatHeartbeatData;
        // e.event_id = HEARTBEAT_DATA_EVENT_ID;
        // let t = ModelManager_1.ModelManager.LoginModel.GetAccount();
        // return ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && (t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig().Uid), e.unique_id = t, e.i_exception_count = this.Gje, e
    }
}
exports.AntiCheatModel = AntiCheatModel;
//# sourceMappingURL=AntiCheatModel.js.map