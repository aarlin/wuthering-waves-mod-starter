"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityDailyAdventureData = exports.rewardStateResolver = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityData_1 = require("../../ActivityData"),
	ActivityDailyAdventureDefine_1 = require("./ActivityDailyAdventureDefine");
exports.rewardStateResolver = {
	[Protocol_1.Aki.Protocol.IBs.Proto_DailyAdventureTaskRunning]: 1,
	[Protocol_1.Aki.Protocol.IBs.Proto_DailyAdventureTaskFinish]: 0,
	[Protocol_1.Aki.Protocol.IBs.Proto_DailyAdventureTaskTaken]: 2,
};
class ActivityDailyAdventureData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments),
			(this.ProgressPoint = 0),
			(this.QNe = new Map()),
			(this.XNe = new Map());
	}
	SetProgressPoint(e) {
		this.ProgressPoint = e;
		for (const e of this.QNe.values())
			e.RefreshState(2 === e.RewardState, this.ProgressPoint);
	}
	PhraseEx(e) {
		var t =
			ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetActivityDailyAdventureConfig(
				this.Id,
			);
		if (t) {
			this.$Ne(t.RewardList);
			var r = e.S0s;
			if (r) {
				(this.ProgressPoint =
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
						ActivityDailyAdventureDefine_1.DAILY_ADVENTURE_PT_CONFIGID,
					)),
					this.XNe.clear();
				for (const e of r.N0s) {
					var a = new ActivityDailyAdventureDefine_1.DailyAdventureTaskData();
					(a.TaskId = e.Ekn),
						(a.CurrentProgress = e.k0s),
						(a.TargetProgress = e.s3n),
						(a.TaskState = exports.rewardStateResolver[e.n3n]),
						this.XNe.set(e.Ekn, a),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Activity",
								38,
								"[日常探险活动] 任务信息打印",
								["TaskId", e.Ekn],
								["State", a.TaskState],
							);
				}
				for (const e of this.QNe.values()) {
					var i = r.F0s.includes(e.RewardId);
					e.RefreshState(i, this.ProgressPoint);
				}
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ActivityViewRefreshCurrent,
					this.Id,
				);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Activity", 38, "[日常探险活动] 活动数据未找到", [
					"ActivityId",
					this.Id,
				]);
	}
	$Ne(e) {
		this.QNe.clear();
		for (const a of e) {
			var t =
					ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetDailyAdventurePointConfig(
						a,
					),
				r =
					(t ||
						(Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"Activity",
								38,
								"[日常探险活动] 积分奖励数据不存在",
								["Id", a],
							)),
					new ActivityDailyAdventureDefine_1.DailyAdventureRewardData());
			(r.RewardId = a), (r.Point = t.NeedPt), this.QNe.set(a, r);
		}
	}
	GetAllPointReward() {
		return Array.from(this.QNe.values()).sort(
			(e, t) => e.RewardId - t.RewardId,
		);
	}
	GetAllTaskInfo() {
		return Array.from(this.XNe.values()).sort((e, t) =>
			e.TaskState === t.TaskState
				? e.TaskId - t.TaskId
				: e.TaskState - t.TaskState,
		);
	}
	SetPointReward(e, t) {
		(e = this.QNe.get(e)) && e.RefreshState(t, this.ProgressPoint);
	}
	SetTaskInfo(e, t, r) {
		(e = this.XNe.get(e)) &&
			(void 0 !== t && (e.TaskState = t), void 0 !== r) &&
			(e.CurrentProgress = r);
	}
	GetDefaultMapMarkId() {
		var e =
			ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetActivityDailyAdventureConfig(
				this.Id,
			);
		return e ? e.AreaDefaultMarkId : 0;
	}
	GetExDataRedPointShowState() {
		return !this.YNe() && (this.IsTaskHasReward() || this.IsPointHasReward());
	}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
	IsTaskHasReward() {
		for (const e of this.XNe.values()) if (0 === e.TaskState) return !0;
		return !1;
	}
	IsPointHasReward() {
		for (const e of this.QNe.values()) if (0 === e.RewardState) return !0;
		return !1;
	}
	YNe() {
		let e = !0;
		for (const t of this.QNe.values()) 2 !== t.RewardState && (e = !1);
		return e;
	}
}
exports.ActivityDailyAdventureData = ActivityDailyAdventureData;
