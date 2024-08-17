"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComposeConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	SynthesisFormulaByFormulaItemId_1 = require("../../../../Core/Define/ConfigQuery/SynthesisFormulaByFormulaItemId"),
	SynthesisFormulaByFormulaType_1 = require("../../../../Core/Define/ConfigQuery/SynthesisFormulaByFormulaType"),
	SynthesisFormulaById_1 = require("../../../../Core/Define/ConfigQuery/SynthesisFormulaById"),
	SynthesisLevelAll_1 = require("../../../../Core/Define/ConfigQuery/SynthesisLevelAll"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ComposeConfig extends ConfigBase_1.ConfigBase {
	GetLocalText(e) {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
	}
	GetSynthesisFormulaByFormulaItemId(e) {
		var o =
			SynthesisFormulaByFormulaItemId_1.configSynthesisFormulaByFormulaItemId.GetConfig(
				e,
			);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Compose",
						50,
						"合成配方获取失败，请检查合成配方配置表是否正确",
						["FormulaItemId=", e],
					)),
			o
		);
	}
	GetSynthesisFormulaById(e) {
		var o = SynthesisFormulaById_1.configSynthesisFormulaById.GetConfig(e);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Compose",
						50,
						"合成配方获取失败，请检查合成配方配置表是否正确",
						["Id=", e],
					)),
			o
		);
	}
	GetComposeListByType(e) {
		var o =
			SynthesisFormulaByFormulaType_1.configSynthesisFormulaByFormulaType.GetConfigList(
				e,
			);
		return (
			o ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Compose",
						50,
						"获取对应类型合成数据失败，请检查合成配方配置表是否正确",
						["FormulaType=", e],
					)),
			o
		);
	}
	GetComposeLevel() {
		var e = SynthesisLevelAll_1.configSynthesisLevelAll.GetConfigList();
		return (
			e ||
				(Log_1.Log.CheckError() &&
					Log_1.Log.Error("Compose", 50, "获取制药证书相关配置失败")),
			e
		);
	}
	GetConditionInfo(e) {
		return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
	}
}
exports.ComposeConfig = ComposeConfig;
