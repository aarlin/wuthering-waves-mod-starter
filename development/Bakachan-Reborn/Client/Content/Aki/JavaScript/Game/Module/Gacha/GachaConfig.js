"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	ElementInfoById_1 = require("../../../Core/Define/ConfigQuery/ElementInfoById"),
	GachaAll_1 = require("../../../Core/Define/ConfigQuery/GachaAll"),
	GachaById_1 = require("../../../Core/Define/ConfigQuery/GachaById"),
	GachaEffectConfigByTimesAndQuality_1 = require("../../../Core/Define/ConfigQuery/GachaEffectConfigByTimesAndQuality"),
	GachaPoolById_1 = require("../../../Core/Define/ConfigQuery/GachaPoolById"),
	GachaSequenceConfigById_1 = require("../../../Core/Define/ConfigQuery/GachaSequenceConfigById"),
	GachaTextureInfoById_1 = require("../../../Core/Define/ConfigQuery/GachaTextureInfoById"),
	GachaViewInfoById_1 = require("../../../Core/Define/ConfigQuery/GachaViewInfoById"),
	GachaViewTypeInfoByType_1 = require("../../../Core/Define/ConfigQuery/GachaViewTypeInfoByType"),
	GachaWeaponTransformById_1 = require("../../../Core/Define/ConfigQuery/GachaWeaponTransformById"),
	RoleQualityInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleQualityInfoById"),
	TextById_1 = require("../../../Core/Define/ConfigQuery/TextById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	GachaDefine_1 = require("./GachaDefine");
class GachaConfig extends ConfigBase_1.ConfigBase {
	PrimaryCurrency() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"PrimaryCurrency",
		);
	}
	SecondCurrency() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"SecondCurrency",
		);
	}
	GachaRecordActiveAlpha() {
		return CommonParamById_1.configCommonParamById.GetFloatConfig(
			"GachaRecordActiveAlpha",
		);
	}
	GachaRecordNoActiveAlpha() {
		return CommonParamById_1.configCommonParamById.GetFloatConfig(
			"GachaRecordNoActiveAlpha",
		);
	}
	GetGachaResultDelay() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"GachaResultDelay",
		);
	}
	GetGachaConfig(e) {
		return GachaById_1.configGachaById.GetConfig(e);
	}
	GetGachaList() {
		return GachaAll_1.configGachaAll.GetConfigList();
	}
	GetGachaPoolConfig(e) {
		return GachaPoolById_1.configGachaPoolById.GetConfig(e);
	}
	GetItemIdType(e) {
		return ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
			e,
		);
	}
	GetGachaEffectConfigByTimesAndQuality(e, a) {
		return GachaEffectConfigByTimesAndQuality_1.configGachaEffectConfigByTimesAndQuality.GetConfig(
			e,
			a,
		);
	}
	GetTextIdByType(e) {
		var a = GachaDefine_1.textKeyMap[e];
		return (
			a ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Gacha", 9, "无法找到此奖品的文本Id", [
						"awardType",
						e,
					])),
			TextById_1.configTextById.GetConfig(a).Text
		);
	}
	GetRoleQualityConfig(e) {
		return RoleQualityInfoById_1.configRoleQualityInfoById.GetConfig(e);
	}
	GetRoleInfoById(e) {
		var a = ConfigManager_1.ConfigManager.InventoryConfig;
		return 1 === a.GetItemDataTypeByConfigId(e) ||
			((a = a.GetItemConfigData(e)) &&
				((e = a.Parameters?.get(GachaDefine_1.ROLE_FUNCTION_ITEM)), e))
			? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)
			: void 0;
	}
	GetGachaPoolNameId(e) {
		return this.GetGachaViewInfo(e)?.SummaryTitle;
	}
	GetGachaViewType(e) {
		var a = this.GetGachaViewInfo(e);
		if (a) return a.Type;
		Log_1.Log.CheckError() &&
			Log_1.Log.Error("Gacha", 44, "奖池界面信息配置为空", ["gachaPoolId", e]);
	}
	GetGachaViewInfo(e) {
		var a = GachaViewInfoById_1.configGachaViewInfoById.GetConfig(e);
		return (
			a ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Gacha", 44, "奖池界面信息配置为空", [
						"gachaPoolId",
						e,
					])),
			a
		);
	}
	GetGachaTextureInfo(e) {
		var a = GachaTextureInfoById_1.configGachaTextureInfoById.GetConfig(e);
		return (
			a ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Gacha", 44, "抽卡贴图信息表没有配置", [
						"itemId",
						e,
					])),
			a
		);
	}
	GetGachaElementTexturePath(e) {
		return ElementInfoById_1.configElementInfoById.GetConfig(e).Icon2;
	}
	GetGachaElementSpritePath(e) {
		return ElementInfoById_1.configElementInfoById.GetConfig(e).GachaSpritePath;
	}
	GetGachaSequenceConfigById(e) {
		return GachaSequenceConfigById_1.configGachaSequenceConfigById.GetConfig(e);
	}
	GetGachaWeaponTransformConfig(e) {
		return GachaWeaponTransformById_1.configGachaWeaponTransformById.GetConfig(
			e,
		);
	}
	GetGachaViewTypeConfig(e) {
		return GachaViewTypeInfoByType_1.configGachaViewTypeInfoByType.GetConfig(e);
	}
}
exports.GachaConfig = GachaConfig;
