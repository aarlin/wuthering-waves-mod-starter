"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PerformanceModel = void 0);
const Log_1 = require("../Common/Log"),
	PerformanceData_1 = require("./PerformanceData");
class PerformanceModel {
	static GetPerformanceData(r) {
		if (r && 0 !== r.length) {
			PerformanceModel.MonitorMap || (PerformanceModel.MonitorMap = new Map());
			let e = PerformanceModel.MonitorMap.get(r);
			var o = !e;
			return (
				o &&
					((e = new PerformanceData_1.PerformanceData(r)),
					PerformanceModel.MonitorMap.set(r, e)),
				[e, o]
			);
		}
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn("Core", 10, "GetPerformanceData 传入的key不能为空！", [
				"key",
				r,
			]);
	}
	static Clear() {
		if (PerformanceModel.MonitorMap)
			for (const e of PerformanceModel.MonitorMap.values()) e.Clear();
	}
}
(exports.PerformanceModel = PerformanceModel).MonitorMap = void 0;
//# sourceMappingURL=PerformanceModel.js.map
