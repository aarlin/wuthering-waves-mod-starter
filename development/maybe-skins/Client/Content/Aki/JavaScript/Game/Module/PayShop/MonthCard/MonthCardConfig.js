"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonthCardConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	MonthCardContentById_1 = require("../../../../Core/Define/ConfigQuery/MonthCardContentById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class MonthCardConfig extends ConfigBase_1.ConfigBase {
	GetConfig(o) {
		var e = MonthCardContentById_1.configMonthCardContentById.GetConfig(o);
		if (e) return e;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Temp", 11, "获取物品配置错误", ["MonthCardConfig", o]);
	}
}
exports.MonthCardConfig = MonthCardConfig;
