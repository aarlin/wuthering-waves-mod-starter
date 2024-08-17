"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushData =
		exports.BossRushLevelRewardData =
		exports.BossRushLevelDetailInfo =
			void 0);
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	ActivityData_1 = require("../../ActivityData"),
	BossRushController_1 = require("./BossRushController"),
	BossRushModel_1 = require("./BossRushModel"),
	UNLOCKLOCALKEY = 100;
class BossRushLevelDetailInfo {
	constructor() {
		(this.LOe = 0),
			(this.xe = 0),
			(this.AAe = 0),
			(this.HUr = 0),
			(this.jUr = []),
			(this.WUr = []),
			(this.mRn = []),
			(this.KUr = []),
			(this.R2e = !1);
	}
	Phrase(e, t, s) {
		(this.LOe = e),
			this.SetId(t.vFn),
			this.SetScore(t.J0s),
			this.SetUnLockTime(t.JCs),
			(this.R2e = t.zCs),
			(this.jUr = []),
			(this.WUr = []),
			(this.mRn = []);
		for (const e of t.Z0s) {
			var i = new BossRushModel_1.BossRushBuffInfo();
			(i.BuffId = e.JFn),
				(i.Slot = e.zFn),
				(i.ChangeAble =
					e.ZFn !== Protocol_1.Aki.Protocol.ABs.KPs &&
					e.ZFn !== Protocol_1.Aki.Protocol.ABs.Proto_Inactive),
				(i.State = e.ZFn),
				this.jUr.push(i);
		}
		for (const e of this.GetConfig().OptionalBuff) {
			var r = new BossRushModel_1.BossRushBuffInfo();
			(r.BuffId = e), (r.Slot = -1), (r.ChangeAble = !0), this.mRn.push(r);
		}
		for (const e of s) {
			var o = new BossRushModel_1.BossRushBuffInfo();
			(o.BuffId = e), (o.Slot = -1), (o.ChangeAble = !0), this.WUr.push(o);
		}
		this.KUr = [];
		let n = 0;
		for (const e of t.z0s) {
			var a = new BossRushModel_1.BossRushRoleInfo();
			(a.RoleId = e), (a.Slot = n), n++, this.KUr.push(a);
		}
	}
	SetId(e) {
		this.xe = e;
	}
	SetScore(e) {
		this.AAe = e;
	}
	SetUnLockTime(e) {
		this.HUr = e;
	}
	GetId() {
		return this.xe;
	}
	GetMonsterTexturePath() {
		return this.GetConfig().PreviewTexture;
	}
	GetBigMonsterTexturePath() {
		return this.GetConfig().StageTexture;
	}
	GetMonsterName() {
		var e = this.GetConfig().BossInfo;
		return (e =
			ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(e))
			? e.Name
			: "";
	}
	GetRecommendElementIdArray() {
		return this.GetInstanceDungeonConfig().RecommendElement;
	}
	GetUnLockState() {
		return this.R2e;
	}
	GetScore() {
		return this.AAe;
	}
	GetUnlockTimeText() {
		var e, t, s;
		return TimeUtil_1.TimeUtil.GetServerTime() < this.HUr
			? ((e = TimeUtil_1.TimeUtil.CalculateRemainingTime(
					this.GetUnLockTime() - TimeUtil_1.TimeUtil.GetServerTime(),
				)),
				(s = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
					e.TextId,
				)),
				(s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s)),
				(t =
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"BossRushUnLockTime",
					)),
				(s = StringUtils_1.StringUtils.Format(s, e.TimeValue.toString())),
				StringUtils_1.StringUtils.Format(t, s))
			: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"BossRushUnlockCondition",
				);
	}
	GetUnLockTime() {
		return this.HUr;
	}
	GetConfig() {
		return ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(
			this.LOe,
			this.xe,
		);
	}
	GetMaxBuffCount() {
		return this.GetConfig().BuffCount;
	}
	GetInstanceDungeonId() {
		return this.GetConfig().InstId;
	}
	GetInstanceDungeonFormationId() {
		return this.GetInstanceDungeonConfig().FightFormationId;
	}
	GetInstanceDungeonFormationNumb() {
		return ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
			this.GetInstanceDungeonFormationId(),
		).LimitCount.length;
	}
	GetInstanceDungeonConfig() {
		var e = this.GetConfig().InstId;
		return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
	}
	ConvertToTeamInfo() {
		var e = new BossRushModel_1.BossRushTeamInfo(),
			t = (e.SetCurrentSelectLevel(this), []);
		for (const e of this.KUr) t.push(e.RoleId);
		return (
			e.SetCurrentTeamMembers(t),
			(e.LevelInfo = this),
			e.InitLevelBuff(this.jUr, this.WUr, this.mRn),
			e.InitPrepareSelectBuff(),
			(e.ActivityId = this.LOe),
			e
		);
	}
}
exports.BossRushLevelDetailInfo = BossRushLevelDetailInfo;
class BossRushLevelRewardData {
	constructor() {
		(this.LevelInfo = void 0), (this.RewardInfo = []);
	}
}
exports.BossRushLevelRewardData = BossRushLevelRewardData;
class BossRushData extends ActivityData_1.ActivityBaseData {
	constructor() {
		super(...arguments),
			(this.QUr = []),
			(this.XUr = []),
			(this.$Ur = !1),
			(this.YUr = !1),
			(this.JUr = []),
			(this.zUr = []),
			(this.Y6i = void 0),
			(this.ZUr = (e, t) => {
				var s = this.UAr(e),
					i = this.UAr(t);
				return s === i ? e.Id - t.Id : i - s;
			}),
			(this.ENe = (e, t) => {
				var s = this.UAr(t),
					i = this.UAr(e);
				return s === i ? e.Id - t.Id : s - i;
			});
	}
	PhraseEx(e) {
		(this.zUr = e.T0s.Y0s),
			this.PhraseLevelInfo(this.zUr, e.T0s.Q0s),
			this.CheckIfNewBossRushOpen(),
			this.PhraseRewardInfo(e.T0s.X0s),
			(this.Y6i = e);
	}
	RebuildData() {
		this.Y6i && this.PhraseEx(this.Y6i);
	}
	PhraseRewardInfo(e) {
		this.XUr = [];
		for (const s of e) {
			var t = this.PAr(s);
			this.XUr.push(t);
		}
		this.Y6i && (this.Y6i.T0s.X0s = e);
	}
	PhraseLevelInfo(e, t) {
		(this.JUr = []), (this.QUr = []);
		for (const i of t) {
			var s = new BossRushLevelDetailInfo();
			s.Phrase(this.Id, i, e), this.JUr.push(s);
			const t = this.xAr(s, i);
			this.QUr.push(t);
		}
		(this.QUr = this.QUr.reverse()),
			this.Y6i && ((this.Y6i.T0s.Q0s = t), (this.Y6i.T0s.Y0s = e));
	}
	GetBossRushLevelDetailInfoById(e) {
		for (const t of this.JUr) if (t.GetId() === e) return t;
	}
	GetBossRushLevelDetailInfo() {
		return this.JUr;
	}
	GetExDataRedPointShowState() {
		return this.GetPreGuideQuestFinishState() && (this.$Ur || this.wAr());
	}
	GetNewUnlockState() {
		return this.YUr;
	}
	wAr() {
		for (const e of this.XUr) if (1 === e.RewardState) return !0;
		for (const e of this.QUr) if (1 === e.RewardState) return !0;
		return !1;
	}
	GetUnlockedBuffIndices() {
		return this.zUr;
	}
	CheckIfNewBossRushOpen() {
		var e = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
				this.Id,
				0,
				this.Id,
				0,
				0,
			),
			t = this.BAr();
		(this.$Ur = e < t),
			(e = ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
				this.Id,
				0,
				this.Id,
				100,
				0,
			));
		(this.YUr = e < t),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshCommonActivityRedDot,
				this.Id,
			);
	}
	BAr() {
		let e = 0;
		for (const t of this.GetBossRushLevelDetailInfo())
			t.GetUnLockState() && e++;
		return e;
	}
	CacheNewUnlock() {
		this.YUr = !1;
		var e = this.BAr();
		ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
			this.Id,
			this.Id,
			100,
			0,
			e,
		),
			this.CheckIfNewBossRushOpen();
	}
	CacheCurrentOpenBossNum() {
		var e = this.BAr();
		ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
			this.Id,
			this.Id,
			0,
			0,
			e,
		),
			this.CheckIfNewBossRushOpen();
	}
	EntranceRedDot() {
		return this.GetExDataRedPointShowState();
	}
	HaveRewardCanTake() {
		return this.wAr();
	}
	GetRewardViewData() {
		var e = StringUtils_1.StringUtils.Format(
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew("BossRushFullPoint"),
			this.GetFullScore().toString(),
		);
		return {
			DataPageList: [
				{
					DataList: this.QUr.sort(this.ZUr),
					TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"BossRushLevelRewardText",
					),
					TabTips: " ",
				},
				{
					DataList: this.XUr.sort(this.ENe),
					TabName: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						"BossRushScoreRewardText",
					),
					TabTips: e,
				},
			],
		};
	}
	UAr(e) {
		let t = 0;
		switch (e.RewardState) {
			case 0:
				t = 2;
				break;
			case 1:
				t = 3;
				break;
			case 2:
				t = 1;
				break;
			default:
				t = 4;
		}
		return t;
	}
	GetFullScore() {
		let e = 0;
		for (const t of this.JUr) e += t.GetScore();
		return e;
	}
	PAr(e) {
		var t =
				ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushScoreConfigById(
					e.t3n,
				),
			s = StringUtils_1.StringUtils.Format(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					"BossRushFullScoreTips",
				),
				t.Score.toString(),
			);
		return {
			Id: e.t3n,
			NameText: s,
			RewardState: Number(e.tgs),
			ClickFunction: () => {
				BossRushController_1.BossRushController.RequestGetBossRushReward(
					this.Id,
					e.t3n,
					Protocol_1.Aki.Protocol.PBs.J0s,
				);
			},
			RewardList: this.ake(t.RewardId),
			RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				this.dwn(Number(e.tgs)),
			),
		};
	}
	dwn(e) {
		let t = "";
		switch (e) {
			case 0:
				t = "PrefabTextItem_1443074454_Text";
				break;
			case 1:
				t = "CollectActivity_state_CanRecive";
				break;
			case 2:
				t = "CollectActivity_state_recived";
		}
		return t;
	}
	ake(e) {
		var t,
			s,
			i = [];
		for ([
			t,
			s,
		] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(e))
			i.push([{ ItemId: t, IncId: 0 }, s]);
		return i;
	}
	xAr(e, t) {
		const s =
			ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushByActivityIdAndInstanceId(
				this.Id,
				t.vFn,
			);
		return {
			Id: e.GetId(),
			NameText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				s.LevelRewardDesc,
			),
			RewardState: Number(t.egs),
			ClickFunction: () => {
				BossRushController_1.BossRushController.RequestGetBossRushReward(
					this.Id,
					s.Id,
					Protocol_1.Aki.Protocol.PBs.r3n,
				);
			},
			RewardList: this.ake(s.RewardId),
			RewardButtonText: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
				this.dwn(Number(t.egs)),
			),
		};
	}
}
exports.BossRushData = BossRushData;
