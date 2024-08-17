"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MappingConfig = void 0);
const MappingBySheetNameAndFieldName_1 = require("../../../../Core/Define/ConfigQuery/MappingBySheetNameAndFieldName"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class MappingConfig extends ConfigBase_1.ConfigBase {
	GetWeaponConfComment(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
	}
	GetWeaponConfList() {
		return MappingBySheetNameAndFieldName_1.configMappingBySheetNameAndFieldName.GetConfigList(
			"WeaponConf",
			"WeaponType",
		);
	}
}
exports.MappingConfig = MappingConfig;
