"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRogueConfig = void 0);
const RogueActivityById_1 = require("../../../../../Core/Define/ConfigQuery/RogueActivityById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRogueConfig extends ConfigBase_1.ConfigBase {
	GetActivityUniversalConfig(e) {
		if ((e = RogueActivityById_1.configRogueActivityById.GetConfig(e)))
			return e;
	}
}
exports.ActivityRogueConfig = ActivityRogueConfig;
