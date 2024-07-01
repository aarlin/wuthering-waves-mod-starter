"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTimePointRewardConfig = void 0);
const TimePointRewardActivityById_1 = require("../../../../../Core/Define/ConfigQuery/TimePointRewardActivityById"),
	TimePointRewardConfigByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/TimePointRewardConfigByActivityId"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityTimePointRewardConfig extends ConfigBase_1.ConfigBase {
	GetTimePointRewardById(i) {
		return TimePointRewardActivityById_1.configTimePointRewardActivityById.GetConfig(
			i,
		);
	}
	GetConfigByActivityId(i) {
		return TimePointRewardConfigByActivityId_1.configTimePointRewardConfigByActivityId.GetConfig(
			i,
		);
	}
}
exports.ActivityTimePointRewardConfig = ActivityTimePointRewardConfig;
