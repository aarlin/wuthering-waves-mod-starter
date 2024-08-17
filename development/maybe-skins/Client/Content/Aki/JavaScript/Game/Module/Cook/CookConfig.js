"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CookFixToolById_1 = require("../../../Core/Define/ConfigQuery/CookFixToolById"),
	CookFormulaAll_1 = require("../../../Core/Define/ConfigQuery/CookFormulaAll"),
	CookFormulaByFormulaItemId_1 = require("../../../Core/Define/ConfigQuery/CookFormulaByFormulaItemId"),
	CookFormulaById_1 = require("../../../Core/Define/ConfigQuery/CookFormulaById"),
	CookLevelAll_1 = require("../../../Core/Define/ConfigQuery/CookLevelAll"),
	CookLevelById_1 = require("../../../Core/Define/ConfigQuery/CookLevelById"),
	CookProcessedAll_1 = require("../../../Core/Define/ConfigQuery/CookProcessedAll"),
	CookProcessedById_1 = require("../../../Core/Define/ConfigQuery/CookProcessedById"),
	CookProcessMsgById_1 = require("../../../Core/Define/ConfigQuery/CookProcessMsgById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class CookConfig extends ConfigBase_1.ConfigBase {
	GetLocalText(o) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o) ?? "";
	}
	GetCookFormulaByFormulaItemId(o) {
		var e =
			CookFormulaByFormulaItemId_1.configCookFormulaByFormulaItemId.GetConfig(
				o,
			);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Cook",
						50,
						"烹饪配方获取失败，请检查烹饪配方配置表是否正确",
						["FormulaItemId=", o],
					)),
			e
		);
	}
	GetCookFormula() {
		return CookFormulaAll_1.configCookFormulaAll.GetConfigList();
	}
	GetCookFormulaById(o) {
		var e = CookFormulaById_1.configCookFormulaById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Cook",
						50,
						"烹饪配方获取失败，请检查烹饪配方配置表是否正确",
						["Id=", o],
					)),
			e
		);
	}
	GetCookProcessedById(o) {
		var e = CookProcessedById_1.configCookProcessedById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Cook",
						50,
						"食材加工获取失败，请检查食材加工配置表是否正确",
						["Id=", o],
					)),
			e
		);
	}
	GetCookProcessed() {
		var o = CookProcessedAll_1.configCookProcessedAll.GetConfigList();
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Cook",
						50,
						"食材加工列表获取失败，请检查食材加工配置表是否正确",
					)),
			o
		);
	}
	GetCookProcessMsgById(o) {
		var e = CookProcessMsgById_1.configCookProcessMsgById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Cook",
						50,
						"食材加工获取失败，请检查食材加工配置表是否正确",
						["Id=", o],
					)),
			e
		);
	}
	GetCookLevel() {
		var o = CookLevelAll_1.configCookLevelAll.GetConfigList();
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Cook", 50, "获取厨师证书相关配置失败")),
			o
		);
	}
	GetCookLevelByLevel(o) {
		var e = CookLevelById_1.configCookLevelById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Cook", 50, "获取目标等级厨师证书相关配置失败", [
						"Id=",
						o,
					])),
			e
		);
	}
	GetCookFixToolById(o) {
		var e = CookFixToolById_1.configCookFixToolById.GetConfig(o);
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Cook",
						50,
						"食材修理工具获取失败，请检查食材修理工具配置表是否正确",
						["Id=", o],
					)),
			e
		);
	}
}
exports.CookConfig = CookConfig;
