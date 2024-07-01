"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonConfig = void 0);
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ElementInfoById_1 = require("../../../../Core/Define/ConfigQuery/ElementInfoById"),
	LongPressConfigById_1 = require("../../../../Core/Define/ConfigQuery/LongPressConfigById"),
	QualityInfoAll_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoAll"),
	QualityInfoById_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoById"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class CommonConfig extends ConfigBase_1.ConfigBase {
	GetSelectablePropItemTickMaxTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"additem_accumulate_initialtime",
		);
	}
	GetSelectablePropItemTickMinTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"additem_accumulate_mintime",
		);
	}
	GetSelectablePropItemTickIntervalTime() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"additem_accumulate_deltaspeed",
		);
	}
	GetAutoAttachVelocityTime() {
		return CommonParamById_1.configCommonParamById.GetFloatConfig(
			"AutoAttachVelocityTime",
		);
	}
	GetAutoAttachInertiaTime() {
		return CommonParamById_1.configCommonParamById.GetFloatConfig(
			"AutoAttachInertiaTime",
		);
	}
	GetNetGoodSprite() {
		return CommonParamById_1.configCommonParamById.GetStringConfig("NetGood");
	}
	GetNetMiddleSprite() {
		return CommonParamById_1.configCommonParamById.GetStringConfig("NetMiddle");
	}
	GetNetBadSprite() {
		return CommonParamById_1.configCommonParamById.GetStringConfig("NetBad");
	}
	GetNetGoodSpriteMobile() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"NetGoodMobile",
		);
	}
	GetNetMiddleSpriteMobile() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"NetMiddleMobile",
		);
	}
	GetNetBadSpriteMobile() {
		return CommonParamById_1.configCommonParamById.GetStringConfig(
			"NetBadMobile",
		);
	}
	GetItemQualityList() {
		var o = ConfigCommon_1.ConfigCommon.ToList(
			QualityInfoAll_1.configQualityInfoAll.GetConfigList(),
		);
		return o.sort((o, e) => o.Id - e.Id), o;
	}
	GetItemQualityById(o) {
		return QualityInfoById_1.configQualityInfoById.GetConfig(o);
	}
	GetElementConfig(o) {
		return ElementInfoById_1.configElementInfoById.GetConfig(o);
	}
	GetLongPressConfig(o) {
		return LongPressConfigById_1.configLongPressConfigById.GetConfig(o);
	}
	GetDebugGmViewPath(o) {
		return "GmView" === o
			? CommonParamById_1.configCommonParamById.GetStringConfig("GmViewPath")
			: "LoginDebugView" === o
				? CommonParamById_1.configCommonParamById.GetStringConfig(
						"GmLoginViewPath",
					)
				: void 0;
	}
	GetNewMailGap() {
		return CommonParamById_1.configCommonParamById.GetIntConfig("NewMailGap");
	}
	GetPingUnChangeValue() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"PingUnChangeValue",
		);
	}
	GetBetaBlockRecharge() {
		return CommonParamById_1.configCommonParamById.GetBoolConfig("BlockPay");
	}
	GetPioneerFlag() {
		return CommonParamById_1.configCommonParamById.GetBoolConfig("PioneerFlag");
	}
	GetShareGap() {
		return CommonParamById_1.configCommonParamById.GetIntConfig("ShareGap");
	}
	GetIosReviewShieldMenuArray() {
		return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"BlockOnIosCheckServer",
		);
	}
}
exports.CommonConfig = CommonConfig;
