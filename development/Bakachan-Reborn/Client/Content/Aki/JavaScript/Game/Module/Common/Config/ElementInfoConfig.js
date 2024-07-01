"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ElementInfoConfig = void 0);
const ElementInfoById_1 = require("../../../../Core/Define/ConfigQuery/ElementInfoById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ElementInfoConfig extends ConfigBase_1.ConfigBase {
	GetConfigList(e) {
		var n = new Array();
		for (const o of e) {
			var t = ElementInfoById_1.configElementInfoById.GetConfig(o);
			n.push(t);
		}
		return n.sort((e, n) => e.Id - n.Id), n;
	}
	GetElementInfo(e) {
		return ElementInfoById_1.configElementInfoById.GetConfig(e);
	}
	GetElementInfoLocalName(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetElementInfoNameByElementId(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
			this.GetElementInfo(e).Name,
		);
	}
}
exports.ElementInfoConfig = ElementInfoConfig;
