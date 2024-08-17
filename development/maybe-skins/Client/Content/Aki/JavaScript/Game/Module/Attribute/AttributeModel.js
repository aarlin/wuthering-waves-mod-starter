"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TipsDataTool = exports.AttributeModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	CommonComponentDefine_1 = require("../Common/CommonComponentDefine"),
	AttributeDefine_1 = require("./AttributeDefine");
class AttributeModel extends ModelBase_1.ModelBase {
	GetFormatAttributeValueString(t, e, o = !1) {
		var r = e;
		return ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
			t,
		).IsPercent
			? MathUtils_1.MathUtils.GetFloatPointFloorString(r / 100, 1) + "%"
			: o
				? MathUtils_1.MathUtils.GetFloatPointFloorString(100 * r, 1) + "%"
				: Math.floor(e).toString();
	}
}
exports.AttributeModel = AttributeModel;
class TipsDataTool {
	static GetCommonTipsAttributeData(t, e, o, r) {
		return (
			(t = TipsDataTool.GetAttributeValue(t, e, o)),
			new CommonComponentDefine_1.TipsAttributeData(r, t, o)
		);
	}
	static GetAttributeValue(t, e, o) {
		return o
			? (t / AttributeDefine_1.TEN_THOUSANDTH_RATIO) *
					(e / AttributeDefine_1.TEN_THOUSANDTH_RATIO)
			: t * (e / AttributeDefine_1.TEN_THOUSANDTH_RATIO);
	}
	static GetPropRatioValue(t, e) {
		return e ? t / AttributeDefine_1.TEN_THOUSANDTH_RATIO : t;
	}
}
exports.TipsDataTool = TipsDataTool;
