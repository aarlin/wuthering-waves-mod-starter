"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComboTeachingConfig = void 0);
const ComboTeachingById_1 = require("../../../Core/Define/ConfigQuery/ComboTeachingById"),
	ComboTeachingConditionById_1 = require("../../../Core/Define/ConfigQuery/ComboTeachingConditionById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ComboTeachingConfig extends ConfigBase_1.ConfigBase {
	GetComboTeachingConfig(o) {
		return ComboTeachingById_1.configComboTeachingById.GetConfig(o);
	}
	GetComboTeachingConditionConfig(o) {
		return ComboTeachingConditionById_1.configComboTeachingConditionById.GetConfig(
			o,
		);
	}
}
exports.ComboTeachingConfig = ComboTeachingConfig;
