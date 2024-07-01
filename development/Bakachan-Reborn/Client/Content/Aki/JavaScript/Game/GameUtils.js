"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameUtils = void 0);
const Log_1 = require("../Core/Common/Log"),
	Stats_1 = require("../Core/Common/Stats"),
	TimerSystem_1 = require("../Core/Timer/TimerSystem");
class GameUtils {
	static async WaitFrame() {
		return new Promise((e) => {
			TimerSystem_1.TimerSystem.Next(() => {
				e();
			});
		});
	}
	static ConvertToArray(e, t) {
		var r = new Array();
		for (let o = 0; o < e; o++) r.push(t(o));
		return r;
	}
	static ConvertToMap(e, t, r) {
		var o = new Map();
		for (let s = 0; s < e; s++) o.set(t(s), r(s));
		return o;
	}
	static CreateStat(e) {
		Log_1.Log.CheckInfo() && Log_1.Log.Info("Game", 52, e);
	}
}
exports.GameUtils = GameUtils;
