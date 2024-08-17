"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GameModePromise = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Net_1 = require("../../../Core/Net/Net"),
	GlobalData_1 = require("../../GlobalData");
class GameModePromise {
	constructor() {
		(this.g8 = void 0),
			(this.d8 = void 0),
			(this.Gpr = void 0),
			(this.g8 = new Promise((e, o) => {
				(this.d8 = e), (this.Gpr = o);
			}));
	}
	get Promise() {
		return this.g8;
	}
	SetResult(e) {
		var o;
		GlobalData_1.GlobalData.Networking() && !Net_1.Net.IsServerConnected()
			? ((o = "账号已经登出"),
				Log_1.Log.CheckError() && Log_1.Log.Error("World", 3, o),
				this.Gpr(new Error(o)))
			: this.d8(e);
	}
}
exports.GameModePromise = GameModePromise;
