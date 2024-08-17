"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LanguageConfig = void 0);
const LanguageDefineByLanguageCode_1 = require("../../../Core/Define/ConfigQuery/LanguageDefineByLanguageCode"),
	LanguageDefineByLanguageType_1 = require("../../../Core/Define/ConfigQuery/LanguageDefineByLanguageType"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LanguageConfig extends ConfigBase_1.ConfigBase {
	GetLanguageDefineByLanguageCode(e) {
		return LanguageDefineByLanguageCode_1.configLanguageDefineByLanguageCode.GetConfig(
			e,
		);
	}
	GetLanguageDefineById(e) {
		return LanguageDefineByLanguageType_1.configLanguageDefineByLanguageType.GetConfig(
			e,
		);
	}
}
exports.LanguageConfig = LanguageConfig;
