"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDotConfig = void 0);
const RedDotByRelativeName_1 = require("../../Core/Define/ConfigQuery/RedDotByRelativeName"),
	ConfigBase_1 = require("../../Core/Framework/ConfigBase");
class RedDotConfig extends ConfigBase_1.ConfigBase {
	OnInit() {
		return !0;
	}
	GetRelativeNameMap() {
		var e = new Map();
		for (const o of RedDotByRelativeName_1.configRedDotByRelativeName.GetConfigList())
			e.set(o.Name, o.RelativeName);
		return e;
	}
}
exports.RedDotConfig = RedDotConfig;
