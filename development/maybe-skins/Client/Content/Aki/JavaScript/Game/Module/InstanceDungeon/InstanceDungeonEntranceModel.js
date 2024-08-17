"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonEntranceModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	AdventureDefine_1 = require("../AdventureGuide/AdventureDefine"),
	InstanceDungeonData_1 = require("./Define/InstanceDungeonData");
class InstanceDungeonEntranceModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.qai = 0),
			(this.Gai = 0),
			(this.Nai = 0),
			(this.Oai = 0),
			(this.kai = void 0),
			(this.Fai = new Array()),
			(this.Vai = 0),
			(this.Hai = new Map()),
			(this.jai = new Map()),
			(this.Wai = new Array()),
			(this.Kai = 0),
			(this.Qai = 0),
			(this.Xai = void 0),
			(this.OnStopTimer = void 0),
			(this.OnStopHandle = void 0),
			(this.$ai = 0),
			(this.Yai = !1),
			(this.E0 = 0);
	}
	OnLeaveLevel() {
		return this.CancelMatchingTimer(), !0;
	}
	get EntranceId() {
		return this.qai;
	}
	set EntranceId(e) {
		this.qai = e;
	}
	get InstanceId() {
		return this.Gai;
	}
	set InstanceId(e) {
		this.Gai = e;
	}
	get SelectInstanceId() {
		return this.Nai;
	}
	set SelectInstanceId(e) {
		this.Nai = e;
	}
	get LastInstanceId() {
		return this.Oai;
	}
	set LastInstanceId(e) {
		this.Oai = e;
	}
	get TransitionOption() {
		return this.kai;
	}
	set TransitionOption(e) {
		this.kai = e;
	}
	get EntranceInstanceIdList() {
		return this.Fai;
	}
	set EntranceInstanceIdList(e) {
		this.Fai = e;
	}
	get EntranceEndTime() {
		return this.Vai;
	}
	set EntranceEndTime(e) {
		this.Vai = e;
	}
	GetInstanceResetTime(e) {
		return this.Hai.get(e);
	}
	SetInstanceResetTime(e, n) {
		this.Hai.set(e, n);
	}
	get SettleRewardItemList() {
		return this.Wai;
	}
	GetInstanceData(e) {
		var n;
		if (e)
			return (
				this.jai.get(e) ||
				((n = new InstanceDungeonData_1.InstanceDungeonData(e)),
				this.jai.set(e, n),
				n)
			);
	}
	SetInstanceData(e) {
		var n = e.Ekn;
		if (n) {
			let t = this.jai.get(n);
			t ||
				((t = new InstanceDungeonData_1.InstanceDungeonData(n)),
				this.jai.set(n, t)),
				(t.ChallengedTimes = e.WRs);
		}
	}
	get MatchingTime() {
		return this.Qai;
	}
	set MatchingTime(e) {
		this.Qai = e;
	}
	MatchingTimeIncrease() {
		this.Qai++;
	}
	get MatchingTimer() {
		return this.Xai;
	}
	set MatchingTimer(e) {
		this.Xai = e;
	}
	CancelMatchingTimer() {
		void 0 !== this.MatchingTimer &&
			TimerSystem_1.TimerSystem.Remove(this.MatchingTimer),
			this.OnStopHandle && this.OnStopHandle(),
			(this.OnStopTimer = void 0),
			(this.OnStopHandle = void 0),
			(this.MatchingTimer = void 0),
			this.SetMatchingState(0),
			this.SetMatchingId(0),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
	}
	GetMatchingState() {
		return this.Kai;
	}
	SetMatchingState(e) {
		this.Kai = e;
	}
	GetMatchingId() {
		return this.$ai;
	}
	SetMatchingId(e) {
		this.$ai = e;
	}
	InitInstanceDataList(e) {
		if (e) for (const n of e) this.SetInstanceData(n);
	}
	GetInstancePowerCost(e) {
		return e <= 0 ||
			(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					e,
				).RewardId) <= 0 ||
			!(e =
				ConfigManager_1.ConfigManager.LevelPlayConfig.GetExchangeRewardInfo(
					e,
				)) ||
			!e.Cost
			? 0
			: e.Cost.get(5);
	}
	get EditBattleTeamMatching() {
		return this.Yai;
	}
	SetEditBattleTeamMatching(e) {
		(this.Yai = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.MatchTeamFlagChange,
				e,
			);
	}
	SyncSettleRewardItemList(e) {
		this.Wai.length = 0;
		for (const n of Object.keys(e))
			this.Wai.push([{ IncId: 0, ItemId: Number.parseInt(n) }, e[n]]);
	}
	GetSortedEntranceInstanceIdList(e) {
		if (
			((e =
				ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
					e,
				)?.InstanceDungeonList),
			e)
		) {
			var n = [];
			for (const t of e) this.CheckInstanceCanChallenge(t) && n.push(t);
			return n;
		}
	}
	GetSortedByTitleEntranceInstanceIdList(e) {
		var n =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel
				.EntranceInstanceIdList;
		if (n) {
			var t,
				a = new Map();
			for (const e of n)
				(t =
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
						e,
					).Title),
					a.set(e, t);
			return a;
		}
	}
	CheckInstanceFinished(e) {
		var n;
		return (
			!!(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					e,
				).EnterControlId) &&
			((n = this.GetInstanceData(e).ChallengedTimes),
			ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetCountConfig(e)
				.EnterCount <= n)
		);
	}
	CheckInstanceCanChallenge(e) {
		return (
			!(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					e,
				).EnterControlId) ||
			!(e = this.GetInstanceData(e)) ||
			e.CanChallenge
		);
	}
	CheckInstanceLevelTooLow(e) {
		var n =
			ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				e,
			)?.DropVisionLimit;
		return (
			!!n &&
			!!(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(
					e,
				)) &&
			ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel > e[1] + n
		);
	}
	CheckInstanceCanReward(e) {
		return (
			!(e =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
					e,
				).EnterControlId) ||
			!(e = this.GetInstanceData(e)) ||
			e.CanReward
		);
	}
	CheckInstanceUnlock(e) {
		var n,
			t =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(
					e,
				);
		if (t)
			switch (t[0]) {
				case 1:
					return (
						ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(0) >=
						t[1]
					);
				case 2:
					return (
						ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel >= t[1]
					);
				case 3:
					return (
						3 ===
							ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t[1]) ||
						(!!(n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t[1]))
							?.IsProgressing &&
							(n.GetNode(t[2])?.IsSuccess ?? !1))
					);
				case 4:
					return (
						ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(
							t[1],
						) ?? !1
					);
				case 5:
					return ModelManager_1.ModelManager.ActivityModel.GetActivityLevelUnlockState(
						t[1],
						t[2],
					);
				default:
					return !0;
			}
		return !0;
	}
	get EntranceEntityId() {
		return this.E0;
	}
	set EntranceEntityId(e) {
		this.E0 = e;
	}
	GetInstanceDungeonReward(e) {
		var n =
				ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(
					e,
				),
			t =
				(i =
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceFirstRewardId(
						e,
					)) && 0 < i,
			a = n && 0 < n,
			i =
				((e =
					ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(e)),
				ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
					i,
				) ?? []);
		n =
			ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
				n,
			) ?? [];
		return t && a ? (e ? [n, !1] : [i.concat(n), !1]) : a ? [n, !1] : [i, e];
	}
	IsMowingInstanceDungeon() {
		let e = this.SelectInstanceId;
		return (
			!!(e =
				ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
					? ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
					: e) &&
			ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
				?.InstSubType === AdventureDefine_1.EDungeonSubType.Mowing
		);
	}
}
exports.InstanceDungeonEntranceModel = InstanceDungeonEntranceModel;
