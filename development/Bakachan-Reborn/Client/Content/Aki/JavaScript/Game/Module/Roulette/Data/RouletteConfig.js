"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RouletteConfig = void 0);
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	ExploreToolsAll_1 = require("../../../../Core/Define/ConfigQuery/ExploreToolsAll"),
	ExploreToolsByPhantomSkillId_1 = require("../../../../Core/Define/ConfigQuery/ExploreToolsByPhantomSkillId"),
	FuncMenuWheelAll_1 = require("../../../../Core/Define/ConfigQuery/FuncMenuWheelAll"),
	FuncMenuWheelByFuncId_1 = require("../../../../Core/Define/ConfigQuery/FuncMenuWheelByFuncId"),
	MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class RouletteConfig extends ConfigBase_1.ConfigBase {
	GetExploreConfigById(e) {
		return ExploreToolsByPhantomSkillId_1.configExploreToolsByPhantomSkillId.GetConfig(
			e,
		);
	}
	GetFuncConfigById(e) {
		return FuncMenuWheelByFuncId_1.configFuncMenuWheelByFuncId.GetConfig(e);
	}
	GetAllExploreConfig() {
		return ExploreToolsAll_1.configExploreToolsAll.GetConfigList();
	}
	GetAllFuncConfig() {
		return FuncMenuWheelAll_1.configFuncMenuWheelAll.GetConfigList();
	}
	GetNameByPhantomSkillId(e) {
		if (
			(e =
				ExploreToolsByPhantomSkillId_1.configExploreToolsByPhantomSkillId.GetConfig(
					e,
				))
		)
			return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
	}
	GetCostByPhantomSkillId(e) {
		if (
			(e =
				ExploreToolsByPhantomSkillId_1.configExploreToolsByPhantomSkillId.GetConfig(
					e,
				))
		)
			return e.Cost;
	}
	GetTreasureBoxDetectorPlaceLimit() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"TreasureBoxDetectionMaxNum",
			) ?? 0
		);
	}
	GetTempTeleporterPlaceLimit() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"TemporaryTeleportCountLimit",
			) ?? 0
		);
	}
}
exports.RouletteConfig = RouletteConfig;
