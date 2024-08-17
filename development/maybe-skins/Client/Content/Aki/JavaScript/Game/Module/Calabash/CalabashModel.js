"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashModel = exports.CalabashDevelopRewardData = void 0);
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon"),
	PhantomFetterGroupById_1 = require("../../../Core/Define/ConfigQuery/PhantomFetterGroupById"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CalabashInstance_1 = require("./CalabashInstance");
class CalabashDevelopRewardData {
	constructor(e, a) {
		(this.DevelopReward = e),
			(this.SkillName = a),
			(this.O0t = !1),
			(this.k0t = 0),
			(this.F0t = new Map());
	}
	set UnlockData(e) {
		this.O0t = e;
	}
	get UnlockData() {
		return this.O0t;
	}
	set RewardNumData(e) {
		this.k0t = e;
	}
	get RewardNumData() {
		return this.k0t;
	}
	get DevelopRewardData() {
		return this.DevelopReward;
	}
	get RewardSumNumData() {
		return this.DevelopRewardData.DevelopCondition.length;
	}
	SetUnlockConditionMap(e) {
		for (const a of e) this.F0t.set(a.FSs, a.VSs);
	}
	GetUnlockConditionMap() {
		return this.F0t;
	}
	get UnlockSize() {
		return this.F0t.size;
	}
	CheckCanGetReward() {
		for (const e of this.F0t.values()) if (!e) return !0;
		return !1;
	}
}
exports.CalabashDevelopRewardData = CalabashDevelopRewardData;
class CalabashModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.OnlyShowBattleFettersTab = !1),
			(this.OnlyShowPhantomFetterGroupIdList = void 0),
			(this.Me = void 0),
			(this.V0t = void 0),
			(this.H0t = void 0),
			(this.j0t = void 0),
			(this.HideVisionRecoveryConfirmBox = !1),
			(this.W0t = new Array());
	}
	K0t() {
		(this.CalabashInstance = new CalabashInstance_1.CalabashInstance()),
			this.Q0t(),
			this.InitMonsterIdRecord();
	}
	Q0t() {
		var e =
			ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopList();
		this.V0t || (this.V0t = new Map());
		for (const t of e) {
			var a =
				ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
					t.MonsterInfoId,
				);
			a = new CalabashDevelopRewardData(t, a.Name);
			t.IsShow && this.V0t.set(t.MonsterId, a);
		}
	}
	UpdateCalabashDevelopRewardData() {
		for (const a of this.GetUnlockCalabashDevelopRewards()) {
			var e = this.V0t.get(a[0]);
			(e.UnlockData = !0),
				e.SetUnlockConditionMap(a[1]),
				(e.RewardNumData = a[1].length);
		}
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HasCalabashExp);
	}
	GetCalabashDevelopRewardSortData() {
		var e = new Array();
		for (const a of this.V0t.values()) e.push(a);
		return e.sort((e, a) => e.DevelopReward.SortId - a.DevelopReward.SortId), e;
	}
	SetCalabashInstanceBaseInfo(e) {
		this.CalabashInstance || this.K0t(), this.CalabashInstance.SetBaseInfo(e);
	}
	SetCalabashInstanceConfigInfo(e) {
		this.CalabashInstance || this.K0t(), this.CalabashInstance.SetConfigInfo(e);
	}
	InitMonsterIdRecord() {
		(this.j0t =
			LocalStorage_1.LocalStorage.GetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollect,
			) ?? []),
			(this.H0t = new Set());
		for (const e of this.j0t) this.H0t.add(e);
	}
	SetCalabashLevel(e) {
		(this.CalabashInstance.CalabashCurrentLevel = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.CalabashLevelUpdate,
			);
	}
	GetCalabashLevel() {
		return this.CalabashInstance.CalabashCurrentLevel;
	}
	GetCalabashMaxLevel() {
		return this.CalabashInstance.CalabashMaxLevel;
	}
	GetIdentifyGuaranteeCount() {
		return this.CalabashInstance.IdentifyGuaranteeCount;
	}
	SetCurrentExp(e) {
		this.CalabashInstance.CalabashCurrentExp = e;
	}
	GetCurrentExp() {
		return this.CalabashInstance.CalabashCurrentExp;
	}
	SetUnlockCalabashDevelopReward(e) {
		this.CalabashInstance.SetUnlockCalabashDevelopReward(e);
	}
	GetUnlockCalabashDevelopRewards() {
		return this.CalabashInstance.GetUnlockCalabashDevelopRewards();
	}
	GetMonsterName(e) {
		return "CalabashCatchGain_" + e;
	}
	GetCalabashDevelopRewardInfoData(e) {
		var a = this.V0t.get(e);
		if (a) {
			var t = new Array();
			for (const e of a.DevelopReward.DevelopCondition) {
				var n =
					ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionById(
						e,
					);
				n = {
					IsUnlock: void 0 !== a.GetUnlockConditionMap().get(n.Id),
					Info: n.Description,
					Num: ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionRewardExp(
						n,
					),
				};
				t.push(n);
			}
			return t;
		}
	}
	GetCalabashDevelopRewardExpByMonsterId(e) {
		let a = 0;
		var t = this.V0t.get(e);
		if (t)
			for (const e of t.DevelopReward.DevelopCondition) {
				var n =
					ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionById(
						e,
					);
				t.GetUnlockConditionMap().get(n.Id) &&
					(a +=
						ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConditionRewardExp(
							n,
						));
			}
		return a;
	}
	GetCalabashAllSchedule() {
		let e = 0;
		for (const a of this.V0t.values()) e += a.RewardSumNumData;
		return e;
	}
	GetCalabashOwnSchedule() {
		let e = 0;
		for (const a of this.V0t.values()) e += a.UnlockSize;
		return e;
	}
	set CalabashInstance(e) {
		this.Me = e;
	}
	get CalabashInstance() {
		return this.Me;
	}
	get CalabashUnlockTipsList() {
		return this.W0t;
	}
	SetCalabashLevelsReward(e) {
		this.CalabashInstance.SetRewardedLevelsSet(e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.GetCalabashReward,
			);
	}
	GetCurrentExpByLevel(e) {
		return e < this.CalabashInstance.CalabashCurrentLevel
			? ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(e)
					.LevelUpExp
			: e === this.CalabashInstance.CalabashCurrentLevel
				? this.CalabashInstance.CalabashCurrentExp
				: 0;
	}
	GetMaxExpByLevel(e) {
		return ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
			e,
		).LevelUpExp;
	}
	GetReceiveRewardStateByLevel(e) {
		return 0 === e
			? 0
			: this.CalabashInstance.IsRewardedByLevel(e)
				? 3
				: e > this.CalabashInstance.CalabashCurrentLevel
					? 1
					: 2;
	}
	IsLimitToLevelUp(e) {
		return (
			e === this.CalabashInstance.CalabashCurrentLevel &&
			((e =
				ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
					e,
				)),
			this.CalabashInstance.CalabashCurrentExp >= e.LevelUpExp)
		);
	}
	GetCatchGainByLevel(e) {
		return this.CalabashInstance.GetCatchGainByLevel(e) ?? 0;
	}
	CheckCanReceiveReward() {
		if (void 0 !== this.CalabashInstance)
			for (let e = 1; e <= this.CalabashInstance.CalabashCurrentLevel; ++e)
				if (2 === this.GetReceiveRewardStateByLevel(e)) return !0;
		return !1;
	}
	RecordMonsterId(e) {
		return (
			!this.H0t?.has(e) &&
			(this.H0t?.add(e),
			this.j0t?.push(e),
			LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollect,
				this.j0t,
			),
			!0)
		);
	}
	CheckMonsterIdInRecord(e) {
		return this.H0t.has(e);
	}
	CheckSimpleStateSave() {
		void 0 ===
			LocalStorage_1.LocalStorage.GetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey
					.CalabashCollectIsSimpleDetail,
			) && this.SaveIfSimpleState(!0);
	}
	GetIfSimpleState() {
		return LocalStorage_1.LocalStorage.GetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollectIsSimpleDetail,
		);
	}
	SaveIfSimpleState(e) {
		var a = LocalStorage_1.LocalStorage.GetPlayer(
			LocalStorageDefine_1.ELocalStoragePlayerKey.CalabashCollectIsSimpleDetail,
		);
		(void 0 !== a && a === e) ||
			(LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey
					.CalabashCollectIsSimpleDetail,
				e,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.ChangeCalabashCollectSimplyState,
			));
	}
	GetViewTabList() {
		var e =
			ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
				"CalabashRootView",
			);
		if (this.OnlyShowBattleFettersTab)
			return e.filter((e) => "PhantomBattleFettersTabView" === e.ChildViewName);
		const a = [];
		return (
			e.forEach((e) => {
				ModelManager_1.ModelManager.FunctionModel.IsOpen(e.FunctionId) &&
					a.push(e);
			}),
			a
		);
	}
	GetPhantomFetterGroupList() {
		if (!this.OnlyShowBattleFettersTab)
			return ConfigCommon_1.ConfigCommon.ToList(
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterGroupList(),
			);
		var e = [];
		for (const t of this.OnlyShowPhantomFetterGroupIdList ?? []) {
			var a =
				PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(t);
			a && e.push(a);
		}
		return e;
	}
}
exports.CalabashModel = CalabashModel;
