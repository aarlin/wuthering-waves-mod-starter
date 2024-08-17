"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRoleGuideConfig = void 0);
const RoleGuideActivityById_1 = require("../../../../../Core/Define/ConfigQuery/RoleGuideActivityById"),
	ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRoleGuideConfig extends ConfigBase_1.ConfigBase {
	GetRoleTrialActivityConfig(e) {
		return RoleGuideActivityById_1.configRoleGuideActivityById.GetConfig(e);
	}
}
exports.ActivityRoleGuideConfig = ActivityRoleGuideConfig;
