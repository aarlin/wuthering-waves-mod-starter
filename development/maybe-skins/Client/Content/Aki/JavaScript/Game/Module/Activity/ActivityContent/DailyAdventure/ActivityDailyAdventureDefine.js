"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DAILY_ADVENTURE_PT_CONFIGID =
		exports.DailyAdventureRewardData =
		exports.DailyAdventureTaskData =
			void 0);
class DailyAdventureTaskData {
	constructor() {
		(this.TaskId = 0),
			(this.TaskState = 1),
			(this.CurrentProgress = 0),
			(this.TargetProgress = 0);
	}
}
exports.DailyAdventureTaskData = DailyAdventureTaskData;
class DailyAdventureRewardData {
	constructor() {
		(this.RewardId = 0), (this.Point = 0), (this.RewardState = 1);
	}
	RefreshState(t, e) {
		t
			? (this.RewardState = 2)
			: void 0 !== e && (this.RewardState = e >= this.Point ? 0 : 1);
	}
}
(exports.DailyAdventureRewardData = DailyAdventureRewardData),
	(exports.DAILY_ADVENTURE_PT_CONFIGID = 13);
