"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ForgingConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ForgeFormulaAll_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaAll"),
	ForgeFormulaByFormulaItemId_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaByFormulaItemId"),
	ForgeFormulaById_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaById"),
	ForgeFormulaByTypeId_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaByTypeId"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ForgingConfig extends ConfigBase_1.ConfigBase {
	GetLocalText(r) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r) ?? "";
	}
	GetForgeFormulaByFormulaItemId(r) {
		var o =
			ForgeFormulaByFormulaItemId_1.configForgeFormulaByFormulaItemId.GetConfig(
				r,
			);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Forging",
						50,
						"锻造配方获取失败，请检查锻造配方配置表是否正确",
						["FormulaItemId=", r],
					)),
			o
		);
	}
	GetForgeFormulaById(r) {
		var o = ForgeFormulaById_1.configForgeFormulaById.GetConfig(r);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Forging",
						50,
						"锻造配方获取失败，请检查锻造配方配置表是否正确",
						["Id=", r],
					)),
			o
		);
	}
	GetForgeList() {
		var r = ForgeFormulaAll_1.configForgeFormulaAll.GetConfigList();
		return (
			r ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Forging",
						50,
						"获取对应类型锻造数据列表失败，请检查锻造配方配置表是否正确",
					)),
			r
		);
	}
	GetForgeListByType(r) {
		var o = ForgeFormulaByTypeId_1.configForgeFormulaByTypeId.GetConfigList(r);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Forging",
						50,
						"获取对应类型锻造数据失败，请检查锻造配方配置表是否正确",
						["TypeId=", r],
					)),
			o
		);
	}
}
exports.ForgingConfig = ForgingConfig;
