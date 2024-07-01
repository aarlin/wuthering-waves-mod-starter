"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTimePointRewardData = exports.TimePointRewardData = void 0);
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ActivityData_1 = require("../../ActivityData");
class TimePointRewardData {
	constructor() {
		(this.Id = 0),
			(this.RewardTime = 0),
			(this.HasClaimed = !1),
			(this.HasUnlock = !1);
	}
	get RewardState() {
		return this.HasClaimed ? 2 : this.HasUnlock ? 1 : 0;
	}
}
exports.TimePointRewardData = TimePointRewardData;
class ActivityTimePointRewardData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments), (this.A8s = new Map());
	}
	PhraseEx(t) {
		this.A8s.clear();
		const e = t.p6s;
		if (e) {
			for (const t of e.wPs) {
				const e = new TimePointRewardData();
				(e.Id = t.Ekn),
					(e.RewardTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.M6s))),
					(e.HasClaimed = t.VSs),
					(e.HasUnlock = t.ZDs),
					this.A8s.set(t.Ekn, e);
			}
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.Id,
			);
		}
	}
	GetExDataRedPointShowState() {
		for (const t of this.A8s.values()) if (1 === t.RewardState) return !0;
		return !1;
	}
	SetRewardToGotState(t) {
		const e = this.A8s.get(t);
		if (e) {
			(e.HasClaimed = !0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RefreshCommonActivityRedDot,
					this.Id,
				);
			for (const t of this.A8s.values()) if (2 !== t.RewardState) return;
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshActivityTab,
				this.Id,
			);
		}
	}
	GetRewardDataList() {
		return Array.from(this.A8s.values()).sort((t, e) => t.Id - e.Id);
	}
}
exports.ActivityTimePointRewardData = ActivityTimePointRewardData;
