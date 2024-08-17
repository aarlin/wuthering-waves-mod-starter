"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityCollectionData = void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../../Common/PublicUtil"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	ActivityData_1 = require("../../ActivityData"),
	ActivityCollectionController_1 = require("./ActivityCollectionController");
class ActivityCollectionData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments),
			(this.TaskIdToQuestIdMap = new Map()),
			(this.QuestStateMap = new Map()),
			(this.MNe = new Map()),
			(this.SNe = -1),
			(this.ENe = (e, t) => {
				var i = this.QuestStateMap.get(e.Id),
					a = this.QuestStateMap.get(t.Id),
					[, , i] = this.yNe(i.QuestState, i.ClaimedReward),
					[, , a] = this.yNe(a.QuestState, a.ClaimedReward);
				return i === a ? e.Id - t.Id : i - a;
			});
	}
	PhraseEx(e) {
		if (
			(this.RefreshRewardData(), this.GetTotalProgress(), (e = e.M0s?.XCs), e)
		)
			for (const s of e) {
				var t,
					i = this.MNe.get(s.QCs),
					a = this.TaskIdToQuestIdMap.get(s.QCs),
					r = this.QuestStateMap.get(a);
				r &&
					i &&
					((t = s.ckn === Protocol_1.Aki.Protocol.vBs.Proto_GatherTakeReward),
					([t, a] =
						((r.ClaimedReward = t),
						this.QuestStateMap.set(a, r),
						this.yNe(r.QuestState, r.ClaimedReward))),
					(i.RewardState = t),
					(i.RewardButtonText = a),
					this.MNe.set(s.QCs, i));
			}
		(ActivityCollectionController_1.ActivityCollectionController.CurrentActivityId =
			this.Id),
			UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView") &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
					this.GetAllRewardQuestDataList(),
				);
	}
	GetExDataRedPointShowState() {
		return this.IsHasRewardRedPoint() || this.IsHasNewQuestRedDot();
	}
	IsHasRewardRedPoint() {
		for (const e of this.QuestStateMap.entries())
			if (3 === e[1].QuestState && !e[1].ClaimedReward) return !0;
		return !1;
	}
	IsHasNewQuestRedDot() {
		for (var [e] of this.QuestStateMap.entries())
			if (
				ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
					this.Id,
					0,
					e,
					0,
					0,
				)
			)
				return !0;
		return !1;
	}
	NeedSelfControlFirstRedPoint() {
		return !1;
	}
	GetAllRewardQuestDataList() {
		return (
			this.RefreshRewardData(),
			{
				DataPageList: [
					{ DataList: Array.from(this.MNe.values()).sort(this.ENe) },
				],
			}
		);
	}
	GetProgressState() {
		var [e, t] = this.GetCurrentProgress();
		return e === this.GetTotalProgress() ? 2 : t ? 0 : 1;
	}
	GetCurrentProgress() {
		let e = 0,
			t = !0;
		return (
			this.QuestStateMap.forEach((i, a) => {
				2 <= i.QuestState && (t = !1), 3 === i.QuestState && e++;
			}),
			[e, t]
		);
	}
	GetCurrentProgressQuestId() {
		for (const e of this.QuestStateMap.entries())
			if (e[1].QuestState <= 2) return e[0];
		return 0;
	}
	GetTotalProgress() {
		var e;
		return (
			-1 === this.SNe &&
				((e =
					ConfigManager_1.ConfigManager.ActivityCollectionConfig.GetAllActivityCollectionConfig()),
				(this.SNe = e.length)),
			this.SNe
		);
	}
	RefreshRewardData() {
		let e = 0;
		for (const o of ConfigManager_1.ConfigManager.ActivityCollectionConfig.GetAllActivityCollectionConfig()) {
			var t,
				i,
				a,
				r,
				s = this.MNe.get(o.Id);
			s
				? ((t = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(
						o.PlayTask,
					)),
					(i = this.QuestStateMap.get(o.PlayTask)),
					([i, a] = this.yNe(i.QuestState, i.ClaimedReward)),
					(s.NameText = t?.TidName
						? PublicUtil_1.PublicUtil.GetConfigTextByKey(t.TidName)
						: ""),
					(s.RewardState = i),
					(s.RewardButtonText = a),
					this.MNe.set(o.Id, s))
				: ((t = this.INe(o.Reward)),
					(i = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(
						o.PlayTask,
					)),
					(a = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
						o.PlayTask,
					)),
					([s, r] = this.yNe(a, !1)),
					(r = {
						QuestState: a,
						ClaimedReward: !(s = {
							NameText: i?.TidName
								? PublicUtil_1.PublicUtil.GetConfigTextByKey(i.TidName)
								: "",
							RewardState: s,
							RewardList: t,
							RewardButtonText: r,
							Id: o.PlayTask,
							ClickFunction: () => {
								ActivityCollectionController_1.ActivityCollectionController.RequestCollectionQuestReward(
									o.Id,
								);
							},
						}),
						QuestUnlockStamp: this.TNe(this.BeginOpenTime, e),
					}),
					this.TaskIdToQuestIdMap.set(o.Id, o.PlayTask),
					this.QuestStateMap.set(o.PlayTask, r),
					this.MNe.set(o.Id, s),
					e++);
		}
	}
	TNe(e, t) {
		return (
			(e = new Date(e * TimeUtil_1.TimeUtil.InverseMillisecond)).setHours(
				TimeUtil_1.TimeUtil.CrossDayHour,
			),
			(e = e.getTime() * TimeUtil_1.TimeUtil.Millisecond) +
				t * TimeUtil_1.TimeUtil.OneDaySeconds
		);
	}
	yNe(e, t) {
		let i = 0,
			a = "",
			r = 0;
		switch (e) {
			case 0:
			case 1:
				(i = 0), (a = "CollectActivity_state_unopen"), (r = 2);
				break;
			case 2:
				(i = 0), (a = "CollectActivity_state_open"), (r = 1);
				break;
			case 3:
				(i = t ? 2 : 1),
					(a = "CollectActivity_state_CanRecive"),
					(r = t ? 3 : 0);
		}
		return (
			(a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a)), [i, a, r]
		);
	}
	INe(e) {
		e =
			ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview;
		var t = [];
		if (e) for (var [i, a] of e) (i = [{ IncId: 0, ItemId: i }, a]), t.push(i);
		return t;
	}
}
exports.ActivityCollectionData = ActivityCollectionData;
