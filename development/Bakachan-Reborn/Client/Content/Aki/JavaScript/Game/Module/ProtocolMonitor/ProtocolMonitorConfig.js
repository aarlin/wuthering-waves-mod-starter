"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ProtocolMonitorConfig = void 0);
const ProtocolMonitoringByAll_1 = require("../../../Core/Define/ConfigQuery/ProtocolMonitoringByAll"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ProtocolMonitorConfig extends ConfigBase_1.ConfigBase {
	GetActionId(o) {
		if (ProtocolMonitorConfig.jio.has(o))
			return ProtocolMonitorConfig.jio.get(o);
	}
	OnInit() {
		for (const o of ProtocolMonitoringByAll_1.configProtocolMonitoringByAll.GetConfigList())
			ProtocolMonitorConfig.jio.set(o.ProtocolId, o.ActionId);
		return !0;
	}
}
(exports.ProtocolMonitorConfig = ProtocolMonitorConfig).jio = new Map();
