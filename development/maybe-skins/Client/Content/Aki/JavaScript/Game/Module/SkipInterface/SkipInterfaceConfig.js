"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkipInterfaceConfig = void 0);
const AccessPathById_1 = require("../../../Core/Define/ConfigQuery/AccessPathById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkipInterfaceConfig extends ConfigBase_1.ConfigBase {
	GetAccessPathConfig(e) {
		return AccessPathById_1.configAccessPathById.GetConfig(e);
	}
}
exports.SkipInterfaceConfig = SkipInterfaceConfig;
