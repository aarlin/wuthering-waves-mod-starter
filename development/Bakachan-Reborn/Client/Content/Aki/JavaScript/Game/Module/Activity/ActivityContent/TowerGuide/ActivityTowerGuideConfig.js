"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTowerGuideConfig = void 0);
const TowerGuideById_1 = require("../../../../../Core/Define/ConfigQuery/TowerGuideById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityTowerGuideConfig extends ConfigBase_1.ConfigBase {
	GetTowerGuideById(e) {
		return TowerGuideById_1.configTowerGuideById.GetConfig(e);
	}
}
exports.ActivityTowerGuideConfig = ActivityTowerGuideConfig;
