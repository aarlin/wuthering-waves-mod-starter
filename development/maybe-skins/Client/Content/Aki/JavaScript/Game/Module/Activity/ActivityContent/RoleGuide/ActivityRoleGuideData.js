"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityRoleGuideData = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ActivityData_1 = require("../../ActivityData");
class ActivityRoleGuideData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments),
			(this.RoleGuideConfig = void 0),
			(this.RoleId = 0),
			(this.RoleQuestId = 0),
			(this.RoleTrialId = 0),
			(this.ShowQuestId = 0);
	}
	PhraseEx(e) {
		(this.RoleGuideConfig =
			ConfigManager_1.ConfigManager.ActivityRoleGuideConfig.GetRoleTrialActivityConfig(
				this.Id,
			)),
			this.RoleGuideConfig &&
				((this.RoleId = this.RoleGuideConfig.RoleId),
				(this.RoleQuestId = this.RoleGuideConfig.RoleQuestId),
				(this.RoleTrialId = this.RoleGuideConfig.RoleTrialId),
				(this.ShowQuestId = this.RoleGuideConfig.ShowQuestId));
	}
	GetRoleResourcePath() {
		var e = this.RoleGuideConfig.RoleUi;
		return (
			ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e) ?? ""
		);
	}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
	GetExDataRedPointShowState() {
		return !1;
	}
}
exports.ActivityRoleGuideData = ActivityRoleGuideData;
