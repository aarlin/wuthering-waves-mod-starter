"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityDailyAdventureConfig = void 0);
const DailyAdventureActivityByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/DailyAdventureActivityByActivityId"),
	DailyAdventurePointById_1 = require("../../../../../Core/Define/ConfigQuery/DailyAdventurePointById"),
	DailyAdventureTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/DailyAdventureTaskByTaskId"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityDailyAdventureConfig extends ConfigBase_1.ConfigBase {
	GetActivityDailyAdventureConfig(e) {
		return DailyAdventureActivityByActivityId_1.configDailyAdventureActivityByActivityId.GetConfig(
			e,
		);
	}
	GetDailyAdventureTaskConfig(e) {
		return DailyAdventureTaskByTaskId_1.configDailyAdventureTaskByTaskId.GetConfig(
			e,
		);
	}
	GetDailyAdventurePointConfig(e) {
		return DailyAdventurePointById_1.configDailyAdventurePointById.GetConfig(e);
	}
}
exports.ActivityDailyAdventureConfig = ActivityDailyAdventureConfig;
