"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LoadingConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	BroadcastImageById_1 = require("../../../Core/Define/ConfigQuery/BroadcastImageById"),
	LoadingLevelAreaAll_1 = require("../../../Core/Define/ConfigQuery/LoadingLevelAreaAll"),
	LoadingTipsTextByLevelAreaId_1 = require("../../../Core/Define/ConfigQuery/LoadingTipsTextByLevelAreaId"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LoadingConfig extends ConfigBase_1.ConfigBase {
	GetLoadingTipsTextList(e) {
		return LoadingTipsTextByLevelAreaId_1.configLoadingTipsTextByLevelAreaId.GetConfigList(
			e,
		);
	}
	GetBroadcastImageConfig(e) {
		return BroadcastImageById_1.configBroadcastImageById.GetConfig(e);
	}
	GetLevelArea() {
		return LoadingLevelAreaAll_1.configLoadingLevelAreaAll.GetConfigList();
	}
	GetLoadingTipsTime() {
		return (
			CommonParamById_1.configCommonParamById.GetIntConfig(
				"loadingtips_time",
			) ?? 1
		);
	}
}
exports.LoadingConfig = LoadingConfig;
