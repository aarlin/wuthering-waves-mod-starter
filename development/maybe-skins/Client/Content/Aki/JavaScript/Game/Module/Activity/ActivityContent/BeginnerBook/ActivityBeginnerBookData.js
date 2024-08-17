"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityBeginnerBookData = void 0);
const ConfigCommon_1 = require("../../../../../Core/Config/ConfigCommon"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ActivityData_1 = require("../../ActivityData");
class ActivityBeginnerBookData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments),
			(this.AllBeginnerTargetList = []),
			(this.UnLockBeginnerMap = new Map()),
			(this.FinishBeginnerMap = new Map());
	}
	PhraseEx(i) {
		this.AllBeginnerTargetList = [];
		var e = ConfigCommon_1.ConfigCommon.ToList(
			ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetAllActivityBeginnerConfig(),
		);
		e?.sort((i, e) => i.Sort - e.Sort);
		for (const i of e) this.AllBeginnerTargetList.push(i.Id);
	}
	GetEnableJump(i) {
		return (
			0 ===
				ConfigManager_1.ConfigManager.ActivityBeginnerBookConfig?.GetActivityBeginnerConfig(
					i,
				).ConditionId ||
			(this.UnLockBeginnerMap.get(i) ?? !1)
		);
	}
	GetFinishState(i) {
		return this.FinishBeginnerMap.get(i) ?? !1;
	}
}
exports.ActivityBeginnerBookData = ActivityBeginnerBookData;
