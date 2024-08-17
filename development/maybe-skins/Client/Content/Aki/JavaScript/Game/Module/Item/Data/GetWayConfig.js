"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GetWayConfig = void 0);
const AccessPathById_1 = require("../../../../Core/Define/ConfigQuery/AccessPathById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class GetWayConfig extends ConfigBase_1.ConfigBase {
	GetWayName(e) {
		if ((e = AccessPathById_1.configAccessPathById.GetConfig(e)))
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Description);
	}
	GetConfigById(e) {
		return AccessPathById_1.configAccessPathById.GetConfig(e);
	}
}
exports.GetWayConfig = GetWayConfig;
