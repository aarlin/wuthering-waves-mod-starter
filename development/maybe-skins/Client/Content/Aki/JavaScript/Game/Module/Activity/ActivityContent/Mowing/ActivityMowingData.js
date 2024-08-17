"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActivityMowingData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
	CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
	KillMonstersScoresByInstanceID_1 = require("../../../../../Core/Define/ConfigQuery/KillMonstersScoresByInstanceID"),
	MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	ScoreRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ScoreRewardById"),
	TakeWeedsDifficultyById_1 = require("../../../../../Core/Define/ConfigQuery/TakeWeedsDifficultyById"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityData_1 = require("../../ActivityData"),
	ActivityManager_1 = require("../../ActivityManager");
class ActivityMowingData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments),
			(this.eke = void 0),
			(this.tke = void 0),
			(this.ike = void 0),
			(this.oke = void 0),
			(this.MowingLevelInfoDict = void 0),
			(this.ENe = (e, t) => {
				var [, i] = this.rke(e.RewardState),
					[, n] = this.rke(t.RewardState);
				return i === n ? e.Id - t.Id : i - n;
			});
	}
	rke(e) {
		let [t, i] = ["", 0];
		switch (e) {
			case Protocol_1.Aki.Protocol.D0s.h3n:
				(t = "PrefabTextItem_1443074454_Text"), (i = 2);
				break;
			case Protocol_1.Aki.Protocol.D0s.j0s:
				(t = "CollectActivity_state_CanRecive"), (i = 1);
				break;
			case Protocol_1.Aki.Protocol.D0s.qms:
				(t = "CollectActivity_state_recived"), (i = 3);
		}
		let n = "";
		return [
			(n =
				"" !== t
					? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? ""
					: n),
			i,
		];
	}
	PhraseEx(e) {
		if (e.f0s) {
			(this.eke = []),
				(this.tke = []),
				(this.oke = new Map()),
				(this.ike = new Map()),
				(this.MowingLevelInfoDict = new Map());
			for (const i of e.f0s.t0s) {
				var t =
					KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(
						i.Ekn,
					);
				if (t) {
					this.MowingLevelInfoDict.set(i.Ekn, i);
					const e = this.nke(i, t);
					this.oke.set(i.Ekn, e), this.tke.push(e);
				}
			}
			for (const t of e.f0s.e0s) {
				var i = ScoreRewardById_1.configScoreRewardById.GetConfig(t.Ekn);
				const e = this.ske(t, i);
				this.eke.push(e), this.ike.set(t.Ekn, e);
			}
		} else (this.eke = []), (this.tke = []);
	}
	ske(e, t) {
		const i = ActivityManager_1.ActivityManager.GetActivityController(
			this.Type,
		);
		var [n] = this.rke(e.ckn);
		return {
			Id: e.Ekn,
			NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Desc),
			RewardList: this.ake(t.Reward),
			RewardButtonText: n,
			RewardState: e.ckn,
			ClickFunction: () => {
				i.RequestGetPointReward(this.Id, e.Ekn);
			},
		};
	}
	nke(e, t) {
		const i = ActivityManager_1.ActivityManager.GetActivityController(
			this.Type,
		);
		var [n] = this.rke(e.ckn);
		return {
			Id: e.Ekn,
			NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Desc),
			RewardList: this.ake(t.Reward),
			RewardState: e.ckn,
			RewardButtonText: n,
			ClickFunction: () => {
				i.RequestGetLevelReward(this.Id, t.InstanceID, e.Ekn);
			},
		};
	}
	hke(e, t) {
		var [i] = this.rke(e.RewardState);
		(e.NameText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
			(e.RewardButtonText = i);
	}
	GetExDataRedPointShowState() {
		return this.IsHaveRewardToGet() || this.IsNewInstanceOpen();
	}
	IsHaveRewardToGet() {
		for (const e of this.eke) if (1 === e.RewardState) return !0;
		for (const e of this.tke) if (1 === e.RewardState) return !0;
		return !1;
	}
	IsNewInstanceOpen() {
		if (this.IsUnLock() && this.GetPreGuideQuestFinishState())
			for (var [, e] of this.MowingLevelInfoDict.entries()) {
				var t = e.JCs <= TimeUtil_1.TimeUtil.GetServerTime();
				if (
					!ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
						this.Id,
						0,
						e.Ekn,
						0,
						0,
					) &&
					t
				)
					return !0;
			}
		return !1;
	}
	ReadNewInstance() {
		for (var [, e] of this.MowingLevelInfoDict.entries())
			e.JCs <= TimeUtil_1.TimeUtil.GetServerTime() &&
				ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
					this.Id,
					e.Ekn,
					0,
					0,
					1,
				);
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RefreshCommonActivityRedDot,
			this.Id,
		);
	}
	ake(e) {
		var t,
			i,
			n = [];
		for ([
			t,
			i,
		] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(e))
			n.push([{ ItemId: t, IncId: 0 }, i]);
		return n;
	}
	GetDesc() {
		return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
			this.LocalConfig.Desc,
		);
	}
	GetPointRewards() {
		for (const t of this.eke) {
			var e = ScoreRewardById_1.configScoreRewardById.GetConfig(t.Id);
			e && this.hke(t, e.Desc);
		}
		return this.eke.sort(this.ENe);
	}
	GetLevelRewards() {
		for (const t of this.tke) {
			var e =
				KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(
					t.Id,
				);
			e && this.hke(t, e.Desc);
		}
		return this.tke.sort(this.ENe);
	}
	GetRewardViewData() {
		var e = StringUtils_1.StringUtils.Format(
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MowingTotalPoint"),
			this.GetTotalPoint().toString(),
		);
		return {
			DataPageList: [
				{
					DataList: this.GetLevelRewards(),
					TabName:
						MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							"MowingLevelRewards",
						),
					TabTips: e,
				},
				{
					DataList: this.GetPointRewards(),
					TabName:
						MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
							"MowingPointRewards",
						),
					TabTips: e,
				},
			],
		};
	}
	SetLevelRewardStateToGot(e) {
		var t;
		(e = this.oke.get(e)) &&
			((e.RewardState = 2),
			([t] = this.rke(Protocol_1.Aki.Protocol.D0s.qms)),
			(e.RewardState = 2),
			(e.RewardButtonText = t));
	}
	SetPointRewardState(e) {
		var t;
		(e = this.ike.get(e)) &&
			(([t] = this.rke(Protocol_1.Aki.Protocol.D0s.qms)),
			(e.RewardState = 2),
			(e.RewardButtonText = t));
	}
	GetInstanceCurrentPoint(e) {
		return this.MowingLevelInfoDict.get(e)?.ZCs ?? 0;
	}
	SetInstanceCurrentSelectedDiff(e, t) {
		(e = this.MowingLevelInfoDict.get(e)) && (e.a3n = t);
	}
	UpdatePointRewards(e) {
		for (const n of e.P0s) {
			var t = ScoreRewardById_1.configScoreRewardById.GetConfig(n.Ekn),
				i = ((t = this.ske(n, t)), this.ike.get(n.Ekn));
			(i.RewardButtonText = t.RewardButtonText),
				(i.RewardState = t.RewardState);
		}
	}
	UpdateLevelRewards(e) {
		for (const n of e.t0s) {
			var t, i;
			this.MowingLevelInfoDict.get(n.Ekn)
				? (this.MowingLevelInfoDict?.set(n.Ekn, n),
					(t = n),
					(i =
						KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID.GetConfig(
							t.Ekn,
						)),
					(t = this.nke(t, i)),
					((i = this.oke.get(n.Ekn)).RewardState = t.RewardState),
					(i.RewardButtonText = t.RewardButtonText))
				: Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Activity", 50, "后端推了一个不存在的割草副本数据", [
						"id",
						n.Ekn.toString(),
					]);
		}
	}
	GetLevelDiffIndex(e) {
		var t = this.MowingLevelInfoDict.get(e);
		return t
			? KillMonstersScoresByInstanceID_1.configKillMonstersScoresByInstanceID
					.GetConfig(e)
					.DifficultyOptions.indexOf(t.a3n)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Activity",
						50,
						"当前[击杀积分|KillMonstersScores]没有割草活动副本数据",
					),
				0);
	}
	GetLevelDiffRecommendLevel(e) {
		return (e = this.MowingLevelInfoDict.get(e))
			? TakeWeedsDifficultyById_1.configTakeWeedsDifficultyById.GetConfig(e.a3n)
					?.RecommendedLevel ?? 0
			: 0;
	}
	GetTotalPoint() {
		let e = 0;
		for (var [, t] of this.MowingLevelInfoDict) e += t.ZCs;
		return e;
	}
	GetLevelMaxPoint(e) {
		return (e = this.MowingLevelInfoDict.get(e)) ? e.ZCs : 0;
	}
	GetActivityLevelUnlockState(e) {
		return (
			(e = this.MowingLevelInfoDict?.get(e)),
			!!e && e.JCs <= TimeUtil_1.TimeUtil.GetServerTime()
		);
	}
	GetActivityLevelCountdownText(e) {
		return (e =
			(this.MowingLevelInfoDict?.get(e)).JCs -
			TimeUtil_1.TimeUtil.GetServerTime()) <= 0
			? ""
			: this.lke(e);
	}
	lke(e) {
		e = Math.max(e, TimeUtil_1.TimeUtil.Minute);
		var t = this.jNe(e);
		e =
			TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t[0], t[1])
				.CountDownText ?? "";
		return StringUtils_1.StringUtils.Format(
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				"ActivityMowing_UnlockCondition",
			),
			e,
		);
	}
	jNe(e) {
		return e > CommonDefine_1.SECOND_PER_DAY
			? [3, 3]
			: e > CommonDefine_1.SECOND_PER_HOUR
				? [2, 2]
				: [1, 1];
	}
}
exports.ActivityMowingData = ActivityMowingData;
