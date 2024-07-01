"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityUniversalData = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ActivityData_1 = require("../../ActivityData");
class ActivityUniversalData extends ActivityData_1.ActivityBaseData {
	PhraseEx(t) {}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
	GetExtraConfig() {
		return ConfigManager_1.ConfigManager.ActivityUniversalConfig.GetActivityUniversalConfig(
			this.Id,
		);
	}
}
exports.ActivityUniversalData = ActivityUniversalData;
