"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTurntableConfig = void 0);
const TurntableActivityByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/TurntableActivityByActivityId"),
	TurntableAwardsByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/TurntableAwardsByActivityId"),
	TurntableInfoById_1 = require("../../../../../Core/Define/ConfigQuery/TurntableInfoById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityTurntableConfig extends ConfigBase_1.ConfigBase {
	GetTurntableAwardsByActivityId(t) {
		return (
			TurntableAwardsByActivityId_1.configTurntableAwardsByActivityId.GetConfigList(
				t,
			) ?? []
		);
	}
	GetTurntableInfoByActivityId(t) {
		return TurntableInfoById_1.configTurntableInfoById.GetConfig(t);
	}
	GetTurntableActivityByActivityId(t) {
		return (
			TurntableActivityByActivityId_1.configTurntableActivityByActivityId.GetConfigList(
				t,
			) ?? []
		);
	}
}
exports.ActivityTurntableConfig = ActivityTurntableConfig;
