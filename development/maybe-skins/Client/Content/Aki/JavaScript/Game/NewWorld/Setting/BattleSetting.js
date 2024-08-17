"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleSetting = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	moduleNetworkState = [];
class BattleSetting {
	static RequestSetModuleNetworkState(e, t) {
		var o = Protocol_1.Aki.Protocol.vzn.create();
		(o.c9n = e),
			(o.u9n = t),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Battle",
					20,
					"[BattleModule] Request module network mode",
					["ModuleName", Protocol_1.Aki.Protocol.kOs[e]],
					["ClientControl", t],
				),
			Net_1.Net.Call(17453, o, (t) => {
				BattleSetting.ReceiveSetModuleNetworkState(e, t.u9n);
			});
	}
	static IsModuleClientControl(e) {
		return moduleNetworkState[e] ?? !0;
	}
	static ReceiveSetModuleNetworkState(e, t) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"Battle",
				20,
				"[BattleModule] Receive module network mode notify",
				["ModuleName", Protocol_1.Aki.Protocol.kOs[e]],
				["ClientControl", t],
			),
			(moduleNetworkState[e] = t);
	}
}
exports.BattleSetting = BattleSetting;
