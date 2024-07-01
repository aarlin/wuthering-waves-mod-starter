"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreProgressConfig = void 0);
const AreaTaskExploreByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaTaskExploreByAreaId"),
	ExploreProgressAll_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressAll"),
	ExploreProgressByArea_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressByArea"),
	ExploreProgressById_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressById"),
	ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ExploreProgressConfig extends ConfigBase_1.ConfigBase {
	GetExploreProgressConfigById(e) {
		return ExploreProgressById_1.configExploreProgressById.GetConfig(e);
	}
	GetExploreProgressConfigListByArea(e) {
		return ExploreProgressByArea_1.configExploreProgressByArea.GetConfigList(e);
	}
	GetAllExploreProgressConfig() {
		return ExploreProgressAll_1.configExploreProgressAll.GetConfigList();
	}
	GetAreaMissionConfigByAreaId(e) {
		return AreaTaskExploreByAreaId_1.configAreaTaskExploreByAreaId.GetConfigList(
			e,
		);
	}
}
exports.ExploreProgressConfig = ExploreProgressConfig;
