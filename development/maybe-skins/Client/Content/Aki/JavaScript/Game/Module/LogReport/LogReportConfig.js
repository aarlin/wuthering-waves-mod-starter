"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LogReportConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	BeginnerGuideById_1 = require("../../../Core/Define/ConfigQuery/BeginnerGuideById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LogReportConfig extends ConfigBase_1.ConfigBase {
	GetBeginnerGuideConfig(e) {
		return BeginnerGuideById_1.configBeginnerGuideById.GetConfig(e);
	}
}
exports.LogReportConfig = LogReportConfig;
