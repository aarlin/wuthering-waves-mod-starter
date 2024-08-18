"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.AntiCheatController = void 0;
const UE = require("ue"),
    Log_1 = require("../../../Core/Common/Log"),
    EventDefine_1 = require("../../Common/Event/EventDefine"),
    EventSystem_1 = require("../../Common/Event/EventSystem"),
    TimeUtil_1 = require("../../Common/TimeUtil"),
    ModelManager_1 = require("../../Manager/ModelManager"),
    ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager"),
    UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
    Heartbeat_1 = require("../Login/Heartbeat"),
    LogReportController_1 = require("../LogReport/LogReportController"),
    AntiCheatModel_1 = require("./AntiCheatModel"),
    HEARTBEAT_EXCEPTION_FACTOR = .5,
    HEARTBEAT_REPORT_INTERVAL = TimeUtil_1.TimeUtil.Hour;
class AntiCheatController extends UiControllerBase_1.UiControllerBase {
    static OnAddEvents() {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangePlayerInfoId, AntiCheatController.Aje), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SendHeartbeat, AntiCheatController.Pje)
    }
    static OnRemoveEvents() {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangePlayerInfoId, AntiCheatController.Aje), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SendHeartbeat, AntiCheatController.Pje)
    }
    static xje() {
        // var e;
        // AntiCheatController.wje() && (e = AntiCheatModel_1.AntiCheatModel.GetBundleData(), LogReportController_1.LogReportController.LogReport(e))
    }
    static wje() {
        return "iOS" === UE.KuroLauncherLibrary.GetPlatform()
    }
}(exports.AntiCheatController = AntiCheatController).Bje = 0, AntiCheatController.bje = 0, AntiCheatController.Aje = () => {
    // var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    // ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfoForTpSafe(e.toString(), e), AntiCheatController.xje()
}, AntiCheatController.Pje = () => {
    var e = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
        t = (.001 * (e - AntiCheatController.bje) >= HEARTBEAT_REPORT_INTERVAL && (ModelManager_1.ModelManager.AntiCheatModel.HasHeartbeatException() &&
        (t = ModelManager_1.ModelManager.AntiCheatModel.GetHeartbeatData(),
        // LogReportController_1.LogReportController.LogReport(t),
        ModelManager_1.ModelManager.AntiCheatModel.ResetHeartbeatException()), AntiCheatController.bje = e), e - AntiCheatController.Bje),
        r = Heartbeat_1.Heartbeat.GetHeartbeatInterval(),
        r = HEARTBEAT_EXCEPTION_FACTOR * r;
    0 < AntiCheatController.Bje && t <= r && (ModelManager_1.ModelManager.AntiCheatModel.HitHeartbeatException(), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Net", 22, "心跳过快"), AntiCheatController.Bje = e
};
//# sourceMappingURL=AntiCheatController.js.map