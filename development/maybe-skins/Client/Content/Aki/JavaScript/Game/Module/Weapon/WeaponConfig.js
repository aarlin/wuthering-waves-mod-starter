"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	MappingBySheetNameAndFieldName_1 = require("../../../Core/Define/ConfigQuery/MappingBySheetNameAndFieldName"),
	MappingBySheetNameFieldNameAndValue_1 = require("../../../Core/Define/ConfigQuery/MappingBySheetNameFieldNameAndValue"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	QualityInfoById_1 = require("../../../Core/Define/ConfigQuery/QualityInfoById"),
	TrialWeaponInfoById_1 = require("../../../Core/Define/ConfigQuery/TrialWeaponInfoById"),
	WeaponBreachByBreachId_1 = require("../../../Core/Define/ConfigQuery/WeaponBreachByBreachId"),
	WeaponBreachByBreachIdAndLevel_1 = require("../../../Core/Define/ConfigQuery/WeaponBreachByBreachIdAndLevel"),
	WeaponConfByItemId_1 = require("../../../Core/Define/ConfigQuery/WeaponConfByItemId"),
	WeaponExpItemById_1 = require("../../../Core/Define/ConfigQuery/WeaponExpItemById"),
	WeaponLevelByLevelId_1 = require("../../../Core/Define/ConfigQuery/WeaponLevelByLevelId"),
	WeaponLevelByLevelIdAndLevel_1 = require("../../../Core/Define/ConfigQuery/WeaponLevelByLevelIdAndLevel"),
	WeaponModelTransformById_1 = require("../../../Core/Define/ConfigQuery/WeaponModelTransformById"),
	WeaponPropertyGrowthByCurveIdLevelAndBreachLevel_1 = require("../../../Core/Define/ConfigQuery/WeaponPropertyGrowthByCurveIdLevelAndBreachLevel"),
	WeaponQualityInfoById_1 = require("../../../Core/Define/ConfigQuery/WeaponQualityInfoById"),
	WeaponResonByResonIdAndLevel_1 = require("../../../Core/Define/ConfigQuery/WeaponResonByResonIdAndLevel"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WeaponConfig extends ConfigBase_1.ConfigBase {
	constructor() {
		super(...arguments),
			(this.pOo = new Map()),
			(this.vOo = new Map()),
			(this.MOo = new Map()),
			(this.SOo = new Map());
	}
	GetWeaponConfigByItemId(e) {
		return WeaponConfByItemId_1.configWeaponConfByItemId.GetConfig(e);
	}
	GetWeaponName(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetWeaponPropertyGrowthConfig(e, n, o) {
		var a =
			WeaponPropertyGrowthByCurveIdLevelAndBreachLevel_1.configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.GetConfig(
				e,
				n,
				o,
			);
		return (
			a ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						11,
						"武器基础配置表格查找武器成长数值失败 WeaponPropertyGrowth",
						["曲线id", e],
						["等级", n],
						["突破等级", o],
					)),
			a
		);
	}
	GetWeaponResonanceConfig(e, n) {
		var o =
			WeaponResonByResonIdAndLevel_1.configWeaponResonByResonIdAndLevel.GetConfig(
				e,
				n,
			);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Config",
						38,
						"武器基础配置表格查找武器共鸣配置[WeaponReson]失败,请查看对应表格",
						["共鸣组id", e],
						["共鸣等级", n],
					)),
			o
		);
	}
	GetWeaponResonanceDesc(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetWeaponResonanceName(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
	}
	GetWeaponTypeName(e) {
		if (
			(e =
				MappingBySheetNameFieldNameAndValue_1.configMappingBySheetNameFieldNameAndValue.GetConfig(
					"WeaponConf",
					"WeaponType",
					e,
				))
		)
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Comment);
	}
	GetWeaponIconPath(e) {
		for (const n of MappingBySheetNameAndFieldName_1.configMappingBySheetNameAndFieldName.GetConfigList(
			"WeaponConf",
			"WeaponType",
		))
			if (e === n.Value) return n.Icon;
	}
	GetWeaponBreachList(e) {
		return WeaponBreachByBreachId_1.configWeaponBreachByBreachId.GetConfigList(
			e,
		);
	}
	GetWeaponLevelList(e) {
		return WeaponLevelByLevelId_1.configWeaponLevelByLevelId.GetConfigList(e);
	}
	GetWeaponLevelConfig(e, n) {
		return WeaponLevelByLevelIdAndLevel_1.configWeaponLevelByLevelIdAndLevel.GetConfig(
			e,
			n,
		);
	}
	GetWeaponBreach(e, n) {
		return WeaponBreachByBreachIdAndLevel_1.configWeaponBreachByBreachIdAndLevel.GetConfig(
			e,
			n,
		);
	}
	GetWeaponLevelLimit(e) {
		return WeaponQualityInfoById_1.configWeaponQualityInfoById.GetConfig(e)
			.LevelLimit;
	}
	GetWeaponExpItemConfig(e) {
		return WeaponExpItemById_1.configWeaponExpItemById.GetConfig(e);
	}
	GetWeaponQualityInfo(e) {
		return WeaponQualityInfoById_1.configWeaponQualityInfoById.GetConfig(e);
	}
	GetWeaponLevelUpCostRatio() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"WeaponLevelUpCoinCost",
			) / 1e3
		);
	}
	GetWeaponExpCoefficient() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"WeaponStrengthenExpCost",
			) / 1e3
		);
	}
	GetWeaponQualityCheck() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"weapon_strengthen_panel_restrain1",
		);
	}
	GetWeaponLevelCheck() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"weapon_strengthen_panel_restrain2",
		);
	}
	GetWeaponResonanceCheck() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"weapon_quick_strengthen_restrain_num",
		);
	}
	GetMaterialItemMaxCount() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"weapon_strengthen_num_limit",
		);
	}
	GetItemQuality(e) {
		return QualityInfoById_1.configQualityInfoById.GetConfig(e);
	}
	GetWeaponModelTransformData(e) {
		return WeaponModelTransformById_1.configWeaponModelTransformById.GetConfig(
			e,
		);
	}
	GetTrialWeaponConfig(e) {
		return TrialWeaponInfoById_1.configTrialWeaponInfoById.GetConfig(e);
	}
	OnClear() {
		return (
			this.pOo.clear(), this.vOo.clear(), this.MOo.clear(), this.SOo.clear(), !0
		);
	}
}
exports.WeaponConfig = WeaponConfig;
