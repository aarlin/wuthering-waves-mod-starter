"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ProtocolMonitorController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Net_1 = require("../../../Core/Net/Net"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder");
class ProtocolMonitorController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return Net_1.Net.SetProtocolMonitorHandle(ProtocolMonitorController.eX), !0;
	}
	static Wio(o) {
		return !0;
	}
}
(exports.ProtocolMonitorController = ProtocolMonitorController).eX = (o, r) => {
	var e = ConfigManager_1.ConfigManager.ProtocolMonitorConfig.GetActionId(o);
	e &&
		ProtocolMonitorController.Wio(r) &&
		(Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"ProtocolMonitor",
				9,
				"协议监听触发",
				["messageId", o],
				["actionId", e],
			),
		ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActions(
			e,
			void 0,
		));
};
