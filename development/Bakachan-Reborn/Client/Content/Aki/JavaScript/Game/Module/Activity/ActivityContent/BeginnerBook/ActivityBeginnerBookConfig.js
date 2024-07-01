"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityBeginnerBookConfig = void 0);
const WorldNewJourneyAll_1 = require("../../../../../Core/Define/ConfigQuery/WorldNewJourneyAll"),
	WorldNewJourneyById_1 = require("../../../../../Core/Define/ConfigQuery/WorldNewJourneyById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityBeginnerBookConfig extends ConfigBase_1.ConfigBase {
	GetActivityBeginnerConfig(e) {
		return WorldNewJourneyById_1.configWorldNewJourneyById.GetConfig(e);
	}
	GetAllActivityBeginnerConfig() {
		return WorldNewJourneyAll_1.configWorldNewJourneyAll.GetConfigList();
	}
}
exports.ActivityBeginnerBookConfig = ActivityBeginnerBookConfig;
