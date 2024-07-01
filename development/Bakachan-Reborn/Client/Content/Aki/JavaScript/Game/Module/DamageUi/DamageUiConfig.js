"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageUiConfig = void 0);
const DamageTextAll_1 = require("../../../Core/Define/ConfigQuery/DamageTextAll"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class DamageUiConfig extends ConfigBase_1.ConfigBase {
	GetAllDamageTextConfig() {
		return DamageTextAll_1.configDamageTextAll.GetConfigList();
	}
}
exports.DamageUiConfig = DamageUiConfig;
