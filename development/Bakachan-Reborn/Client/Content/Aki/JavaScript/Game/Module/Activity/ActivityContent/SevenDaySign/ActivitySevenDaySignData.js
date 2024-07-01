"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivitySevenDaySignData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ActivityData_1 = require("../../ActivityData");
class ActivitySevenDaySignData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments), (this.pFe = void 0);
	}
	PhraseEx(t) {
		(this.pFe = t.m0s.YCs),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Activity",
					38,
					"[ActivitySevenDaySign][Phrase]签到活动签到状态打印",
					["ActivityId", this.Id],
					["SignStateList", this.pFe],
				);
	}
	GetExDataRedPointShowState() {
		for (const t of this.pFe)
			if (t === Protocol_1.Aki.Protocol.D0s.j0s) return !0;
		return !1;
	}
	UpdateActivityData(t) {
		(this.pFe[t.Akn] = t.D0s),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Activity",
					38,
					"[ActivitySevenDaySign][UpdateData]签到活动签到状态改变",
					["ActivityId", this.Id],
					["SignIndex", t.Akn],
					["SignState", t.D0s],
					["SignStateList", this.pFe],
				);
	}
	SetRewardToGotState(t) {
		this.pFe[t] = Protocol_1.Aki.Protocol.D0s.qms;
	}
	GetRewardByDay(t) {
		if (
			(t =
				ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivityRewardByDay(
					this.Id,
					t,
				))
		)
			return [t];
	}
	GetBigRewardIcon(t) {
		return ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivitySignById(
			t,
		)?.ImportantRewardIcon;
	}
	GetRewardStateByDay(t) {
		return this.pFe[t];
	}
	GetImportantItemIndex() {
		var t =
			ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig?.GetActivitySignById(
				this.Id,
			);
		return t ? t.ImportantRewardIndex : 0;
	}
	GetImportantRewardType() {
		var t =
			ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig?.GetActivitySignById(
				this.Id,
			);
		return t ? t.ImportantRewardType : 0;
	}
}
exports.ActivitySevenDaySignData = ActivitySevenDaySignData;
