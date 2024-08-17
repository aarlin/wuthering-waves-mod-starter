"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityTurntableData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityData_1 = require("../../ActivityData");
class ActivityTurntableData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments),
			(this.QuestStateMap = new Map()),
			(this.QuestList = []),
			(this.AllRewardInfo = new Map()),
			(this.RoundRewardIdMap = new Map()),
			(this.RoundIdList = []),
			(this.TurntableCostConfigId = 0),
			(this.TurntableCostCount = 0),
			(this.WIn = []),
			(this.OnCommonItemCountAnyChange = (t, e) => {
				t === this.TurntableCostConfigId &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshCommonActivityRedDot,
						this.Id,
					);
			}),
			(this.ENe = (t, e) => {
				var i = t.IsSpecial ? 1 : 0,
					s = e.IsSpecial ? 1 : 0;
				return i == s ? t.Id - e.Id : s - i;
			});
	}
	PhraseEx(t) {
		(this.QuestList.length = 0), this.QuestStateMap.clear();
		var e =
			ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableActivityByActivityId(
				this.Id,
			);
		for (let t = 0; t < e.length; t++) {
			this.QuestList.push(e[t].CoinQuestId);
			var i = {
				QuestState: ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
					e[t].CoinQuestId,
				),
				QuestUnlockStamp: this.TNe(this.BeginOpenTime, t),
			};
			this.QuestStateMap.set(e[t].CoinQuestId, i);
		}
		var s =
			ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableInfoByActivityId(
				this.Id,
			);
		if (s) {
			if (
				((this.TurntableCostConfigId = s.CostItemId),
				(this.TurntableCostCount = s.CostItemCount),
				this.AllRewardInfo.clear(),
				this.RoundRewardIdMap.clear(),
				(this.RoundIdList.length = 0),
				(s =
					ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableAwardsByActivityId(
						this.Id,
					)),
				(t = t.I0s))
			) {
				var n,
					a,
					r = t.q0s,
					o = t.G0s,
					d = t.O0s,
					u = new Map();
				for (const t of s) {
					var l,
						h,
						I = [];
					for ([l, h] of t.RewardItem) {
						var v = [{ IncId: 0, ItemId: l }, h];
						I.push(v);
					}
					if (1 !== I.length)
						Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"Activity",
								38,
								"[转盘活动] 转盘奖项配置物品数量错误",
								["Id", t.Id],
							);
					else {
						let e = !1;
						(r || t.GroupId < o || d.includes(t.Id)) && (e = !0);
						var c = {
							Id: t.Id,
							RoundId: t.GroupId,
							IsClaimed: e,
							RewardItem: I[0],
							IsSpecial: t.IsSpecial,
						};
						this.AllRewardInfo.set(t.Id, c);
						let i = u.get(c.RoundId);
						(i = i || []).push(c), u.set(c.RoundId, i);
					}
				}
				for ([n, a] of u.entries()) {
					a.sort(this.ENe);
					var g = [];
					for (const t of a) g.push(t.Id);
					this.RoundRewardIdMap.set(n, g), this.RoundIdList.push(n);
				}
				this.RoundIdList.sort((t, e) => t - e);
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("Activity", 38, "[转盘活动] 未找到对应TurntableInfo", [
					"ActivityId",
					this.Id,
				]);
	}
	GetExDataRedPointShowState() {
		return (
			this.IsHasPreQuestRedDot() ||
			this.IsHasNewQuestRedDot() ||
			this.IsHasRewardRedDot()
		);
	}
	GetActivityCurrencyCount() {
		return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
			this.TurntableCostConfigId,
		);
	}
	OnQuestStateChange(t, e) {
		let i = !1;
		this.LocalConfig.PreShowGuideQuest.includes(t) && (i = !0);
		var s,
			n = this.QuestStateMap.get(t);
		n &&
			((s = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t)),
			(n.QuestState = s),
			this.QuestStateMap.set(t, n),
			ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
				this.Id,
				t,
				0,
				0,
				2 === s ? 1 : 0,
			),
			(i = !0)),
			i &&
				(EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RefreshCommonActivityRedDot,
					this.Id,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ActivityViewRefreshCurrent,
					this.Id,
				));
	}
	ReadCurrentUnlockQuest() {
		var t;
		this.IsActivityUnFinished() &&
			((t = this.GetCurrentQuestIndex()),
			(t = this.QuestList[t]),
			2 === this.QuestStateMap.get(t).QuestState &&
				ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
					this.Id,
					t,
					0,
					0,
					0,
				),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.Id,
			));
	}
	GetCurrentQuestIndex() {
		for (let t = 0; t < this.QuestList.length; t++)
			switch (this.QuestStateMap.get(this.QuestList[t]).QuestState) {
				case 0:
				case 1:
					return 0 < t ? t - 1 : t;
				case 2:
					return t;
			}
		return this.QuestList.length - 1;
	}
	IsHasNewQuestRedDot() {
		if (this.IsActivityUnFinished() && this.GetPreGuideQuestFinishState())
			for (const t of this.QuestList)
				if (
					ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
						this.Id,
						0,
						t,
						0,
						0,
					)
				)
					return !0;
		return !1;
	}
	GetCurrentQuestProgress() {
		let t = 0;
		return (
			this.QuestStateMap.forEach((e, i) => {
				3 === e.QuestState && t++;
			}),
			t
		);
	}
	TNe(t, e) {
		return (
			(t = new Date(t * TimeUtil_1.TimeUtil.InverseMillisecond)).setHours(
				TimeUtil_1.TimeUtil.CrossDayHour,
			),
			(t = t.getTime() * TimeUtil_1.TimeUtil.Millisecond) +
				e * TimeUtil_1.TimeUtil.OneDaySeconds
		);
	}
	SavePreQuestRedDot(t) {
		ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
			this.Id,
			t,
			0,
			0,
			1,
		),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.Id,
			);
	}
	IsHasPreQuestRedDot() {
		return (
			!this.GetPreGuideQuestFinishState() &&
			0 ===
				ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
					this.Id,
					0,
					this.GetUnFinishPreGuideQuestId(),
					0,
					0,
				)
		);
	}
	IsActivityUnFinished() {
		for (const t of this.AllRewardInfo.values()) if (!t.IsClaimed) return !0;
		return !1;
	}
	IsRoundUnFinished(t) {
		if ((t = this.RoundRewardIdMap.get(t)))
			for (const e of t) if (!this.AllRewardInfo.get(e).IsClaimed) return !0;
		return !1;
	}
	IsHasRewardRedDot() {
		return !!(
			this.GetActivityCurrencyCount() >= this.TurntableCostCount &&
			this.IsActivityUnFinished()
		);
	}
	GetCurrentRoundId() {
		for (const t of this.RoundIdList) if (this.IsRoundUnFinished(t)) return t;
		return this.RoundIdList.at(-1) ?? 0;
	}
	IsRewardSpecial(t) {
		return this.AllRewardInfo.get(t)?.IsSpecial ?? !1;
	}
	SetRunResult(t, e) {
		const i = this.AllRewardInfo.get(t);
		if (((i.IsClaimed = !0), i.IsSpecial))
			for (const t of this.RoundRewardIdMap.get(i.RoundId)) {
				this.AllRewardInfo.get(t).IsClaimed = !0;
			}
		this.WIn = e;
	}
	GetRunResult() {
		return this.WIn;
	}
}
exports.ActivityTurntableData = ActivityTurntableData;
