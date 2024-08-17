"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NetInfo = void 0);
const PerfSight_1 = require("../PerfSight/PerfSight");
class NetInfo {
	static get RttMs() {
		return NetInfo.iY;
	}
	static SetRttMs(t) {
		t < NetInfo.iY
			? (NetInfo.iY = t)
			: (NetInfo.iY = 0.9 * NetInfo.iY + 0.1 * t),
			PerfSight_1.PerfSight.IsEnable &&
				PerfSight_1.PerfSight.PostNetworkLatency(t);
	}
}
(exports.NetInfo = NetInfo).iY = 0;
//# sourceMappingURL=NetInfo.js.map
