"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PropertyIndexConfig = void 0);
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	PropertyIndexAll_1 = require("../../../../Core/Define/ConfigQuery/PropertyIndexAll"),
	PropertyIndexById_1 = require("../../../../Core/Define/ConfigQuery/PropertyIndexById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class PropertyIndexConfig extends ConfigBase_1.ConfigBase {
	GetPropertyIndexInfo(e) {
		return PropertyIndexById_1.configPropertyIndexById.GetConfig(e);
	}
	GetPropertyIndexIcon(e) {
		return this.GetPropertyIndexInfo(e).Icon;
	}
	GetPropertyIndexLocalName(e) {
		return (
			(e = this.GetPropertyIndexInfo(e)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? ""
		);
	}
	GetPropertyIndexName(e) {
		return this.GetPropertyIndexInfo(e).Name;
	}
	GetPropertyIndexList() {
		return PropertyIndexAll_1.configPropertyIndexAll.GetConfigList();
	}
}
exports.PropertyIndexConfig = PropertyIndexConfig;
