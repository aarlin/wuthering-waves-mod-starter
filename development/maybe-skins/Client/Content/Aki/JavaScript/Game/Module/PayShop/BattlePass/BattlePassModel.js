"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
	WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData"),
	BattlePassController_1 = require("./BattlePassController"),
	BattlePassRewardGridItem_1 = require("./BattlePassTabView/BattlePassRewardGridItem"),
	BattlePassTaskLoopItem_1 = require("./BattlePassTabView/BattlePassTaskLoopItem"),
	GIFT_ID = 301;
class BattlePassModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.IsRequiringViewData = !1),
			(this.IOi = !1),
			(this.IncreasedLevelToShow = 0),
			(this.TOi = void 0),
			(this.LOi = 0),
			(this.DOi = !0),
			(this.TVs = void 0),
			(this.ROi = 0),
			(this.UOi = 0),
			(this.AOi = 301),
			(this.POi = 0),
			(this.xOi = 0),
			(this.RewardDataList = []),
			(this.BattlePassId = 0),
			(this.UQ = 0),
			(this.StageLevelList = []),
			(this.wOi = 0),
			(this.BOi = 0),
			(this.bOi = 0),
			(this.qOi = Protocol_1.Aki.Protocol.B2s.Proto_NoPaid),
			(this.GOi = 0),
			(this.NOi = 0),
			(this.OOi = 0),
			(this.kOi = 0),
			(this.BattlePassTaskMap = new Map());
	}
	GetInTimeRange() {
		return this.IOi;
	}
	SetInTimeRange(e) {
		this.IOi = e;
	}
	GetDayEndTime() {
		return this.POi;
	}
	GetWeekEndTime() {
		return this.xOi;
	}
	GetGiftId() {
		return this.AOi;
	}
	get PrimaryItemId() {
		return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"PrimaryGiftItem",
		)[0];
	}
	get AdvanceItemId() {
		return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
			"AdvancedGiftItem",
		)[0];
	}
	get HadEnter() {
		return this.DOi;
	}
	set HadEnter(e) {
		this.DOi !== e &&
			((this.DOi = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.BattlePassHadEnterUpdate,
			));
	}
	GetWeaponDataList() {
		if (!this.TOi) {
			this.TOi = [];
			for (const t of CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"BattlePassUnlockWeapons",
			)) {
				var e = new WeaponTrialData_1.WeaponTrialData();
				e.SetTrialId(t), this.TOi.push(e);
			}
		}
		return this.TOi;
	}
	GetRewardData(e) {
		var t = this.RewardDataList[e - 1];
		if (t) return t;
		Log_1.Log.CheckWarn() &&
			Log_1.Log.Warn("Temp", 11, "战令奖励数据 没有这个等级的", ["level", e]);
	}
	set PayButtonRedDotState(e) {
		this.TVs !== e &&
			((this.TVs = e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.BattlePassHadEnterUpdate,
			),
			LocalStorage_1.LocalStorage.SetPlayer(
				LocalStorageDefine_1.ELocalStoragePlayerKey.BattlePassPayButton,
				this.TVs,
			));
	}
	get PayButtonRedDotState() {
		return (
			void 0 === this.TVs &&
				(this.TVs =
					LocalStorage_1.LocalStorage.GetPlayer(
						LocalStorageDefine_1.ELocalStoragePlayerKey.BattlePassPayButton,
						!0,
					) ?? !0),
			this.TVs
		);
	}
	GetMaxLevel() {
		return this.UQ;
	}
	IsLevelMax() {
		return this.wOi >= this.UQ;
	}
	IsWeekMax() {
		return this.WeekExp >= this.OOi;
	}
	GetNextStageLevel(e) {
		if (void 0 === e) return 0;
		let t = 0;
		for (const a of this.StageLevelList)
			if (!(a <= e)) {
				t = a;
				break;
			}
		return t;
	}
	InitBattlePassConfigData() {
		var e = this.BattlePassId,
			t =
				((this.RewardDataList.length = 0),
				ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(e));
		(this.UQ = t.LevelLimit),
			(e = ConfigManager_1.ConfigManager.BattlePassConfig.GetAllRewardData(e));
		for (const t of e)
			if (!(t.Level > this.UQ)) {
				var a,
					s,
					i,
					r,
					o = new BattlePassRewardGridItem_1.BattlePassRewardData(t.Level);
				for ([a, s] of t.FreeReward) {
					var n = new BattlePassRewardGridItem_1.BattlePassRewardItem(a, s);
					this.BattlePassLevel >= t.Level && (n.ItemType = 1),
						o.FreeRewardItem.push(n);
				}
				for ([i, r] of t.PayReward) {
					var l = new BattlePassRewardGridItem_1.BattlePassRewardItem(i, r);
					this.BattlePassLevel >= t.Level &&
						this.qOi !== Protocol_1.Aki.Protocol.B2s.Proto_NoPaid &&
						(l.ItemType = 1),
						o.PayRewardItem.push(l);
				}
				t.IsMilestone && this.StageLevelList.push(t.Level),
					this.RewardDataList.push(o);
			}
		(this.OOi = t.WeekExpLimit), (this.kOi = t.LevelUpExp), this.FOi();
	}
	FOi() {
		(this.UOi = this.kOi * (this.UQ - this.wOi) - this.LevelExp),
			(this.ROi = this.OOi - this.WeekExp);
	}
	VOi(e) {
		let t = 0,
			a = 0;
		for (const i of e) {
			var s = this.GetTaskData(i);
			(t += s.Exp), (a += 0 === s.UpdateType ? 0 : s.Exp);
		}
		return [t, a];
	}
	TryRequestTaskList(e) {
		var [t, a] = this.VOi(e),
			t = t - Math.max(0, a - this.ROi);
		this.IsLevelMax() || t > this.UOi
			? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"BattlePassExpMax",
				),
				BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(
					e,
				))
			: a > this.ROi
				? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
						this.IsWeekMax() ? 91 : 178,
					)).FunctionMap.set(2, () => {
						ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"BattlePassWeeklyExpMax",
						),
							BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(
								e,
							);
					}),
					ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
						t,
					))
				: BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(
						e,
					);
	}
	UpdateBattlePassRewardDataFromResponse(e) {
		if (void 0 !== e && 0 !== e.length)
			for (const t of e) this.TakeReward(t.Ikn, t.r3n, t.G3n);
	}
	UpdateRewardDataWithTargetLevel(e) {
		for (let t = 1; t <= e; t++) this.HOi(t);
	}
	HOi(e, t = !1) {
		if ((e = this.RewardDataList[e - 1])) {
			for (const a of e.FreeRewardItem)
				(0 !== a.ItemType && !t) || (a.ItemType = 1);
			if (this.PayType !== Protocol_1.Aki.Protocol.B2s.Proto_NoPaid)
				for (const a of e.PayRewardItem)
					(0 !== a.ItemType && !t) || (a.ItemType = 1);
		}
	}
	TakeReward(e, t, a) {
		let s;
		(t = this.GetRewardData(t)),
			((s =
				e === Protocol_1.Aki.Protocol.b2s.Proto_Free
					? t.GetFreeRewardItem(a)
					: t.GetPayRewardItem(a)).ItemType = 2);
	}
	OnResponseTakeReward(e, t, a, s) {
		this.TakeReward(e, t, a),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.GetBattlePassRewardEvent,
				s,
			);
	}
	set BattlePassLevel(e) {
		this.wOi = e;
	}
	get BattlePassLevel() {
		return this.wOi;
	}
	set WeekExp(e) {
		this.BOi = e;
	}
	get WeekExp() {
		return this.BOi;
	}
	set LevelExp(e) {
		this.bOi = e;
	}
	get LevelExp() {
		return this.bOi;
	}
	set PayType(e) {
		this.qOi = e;
	}
	get PayType() {
		return this.qOi;
	}
	GetBattlePassStartTime() {
		return this.GOi;
	}
	GetBattlePassEndTime() {
		return this.NOi;
	}
	InBattlePassInWarningTime() {
		return TimeUtil_1.TimeUtil.GetServerTime() > this.LOi;
	}
	jOi(e) {
		this.GOi = Number(MathUtils_1.MathUtils.LongToBigInt(e));
	}
	WOi(e) {
		(this.NOi = Number(MathUtils_1.MathUtils.LongToBigInt(e))),
			(this.LOi =
				this.NOi -
				3600 *
					CommonParamById_1.configCommonParamById.GetIntConfig(
						"BattlePassSettleBugTime",
					));
	}
	SetDayEndTime(e) {
		this.POi = Number(MathUtils_1.MathUtils.LongToBigInt(e));
	}
	SetWeekEndTime(e) {
		this.xOi = Number(MathUtils_1.MathUtils.LongToBigInt(e));
	}
	GetMaxWeekExp() {
		return this.OOi;
	}
	GetMaxLevelExp() {
		return this.kOi;
	}
	GetPassPayBtnKey() {
		switch (this.qOi) {
			case Protocol_1.Aki.Protocol.B2s.Proto_NoPaid:
				return "Text_BattlePassBuyButton1_Text";
			case Protocol_1.Aki.Protocol.B2s.Proto_Paid:
				return "Text_BattlePassBuyButton2_Text";
			case Protocol_1.Aki.Protocol.B2s.Proto_Advanced:
				return "Text_BattlePassBuyButton3_Text";
			default:
				return "";
		}
	}
	OnInit() {
		return (this.DOi = !0);
	}
	GetBattlePassRemainTime() {
		return TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(this.NOi, !0);
	}
	GetBattlePassRemainTimeSecond() {
		var e =
			TimeUtil_1.TimeUtil.GetServerTimeStamp() /
			TimeUtil_1.TimeUtil.InverseMillisecond;
		return this.NOi - e;
	}
	GetTargetLevelRewardList(e, t) {
		t.length = 0;
		var a,
			s = this.wOi,
			i = new Map();
		for (let t = s + 1; t <= e; t++) {
			var r = this.GetRewardData(t);
			if (r)
				for (const e of this.qOi === Protocol_1.Aki.Protocol.B2s.Proto_NoPaid
					? r.FreeRewardItem
					: r.FreeRewardItem.concat(r.PayRewardItem)) {
					var o = e.Item[0].ItemId,
						n = e.Item[1];
					i.has(o)
						? (i.get(o)[1] += n)
						: i.set(o, [{ IncId: 0, ItemId: o }, n]);
				}
		}
		for ([, a] of i) t.push(a);
		t.sort((e, t) => {
			var a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
					e[0].ItemId,
				).QualityId,
				s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
					t[0].ItemId,
				).QualityId;
			return a === s ? e[1] - t[1] : s - a;
		});
	}
	GetTaskData(e) {
		return this.BattlePassTaskMap.get(e);
	}
	GetTaskList(e, t) {
		for (var [, a] of ((t.length = 0), this.BattlePassTaskMap))
			a.UpdateType === e && t.push(a);
		t.sort((e, t) =>
			3 === e.TaskState || 2 === t.TaskState
				? -1
				: 2 === e.TaskState || 3 === t.TaskState
					? 1
					: 0,
		);
	}
	GetTaskTypeList() {
		return [1, 2, 0];
	}
	GetPrimaryBattlePassGoodsId() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"PrimaryBattlePassShopId",
		);
	}
	GetHighBattlePassGoodsId() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"AdvancedWithActive",
		);
	}
	GetSupplyBattlePassGoodsId() {
		return CommonParamById_1.configCommonParamById.GetIntConfig(
			"AdvancedWithoutActive",
		);
	}
	GetAllFinishedTask() {
		var e,
			t,
			a = [];
		for ([e, t] of this.BattlePassTaskMap) 3 === t.TaskState && a.push(e);
		return a;
	}
	CheckHasRewardWaitTake() {
		for (const e of this.RewardDataList) {
			for (const t of e.FreeRewardItem) if (1 === t.ItemType) return !0;
			for (const t of e.PayRewardItem) if (1 === t.ItemType) return !0;
		}
		return !1;
	}
	CheckHasTaskWaitTake() {
		if (this.UQ !== this.BattlePassLevel)
			for (var [, e] of this.BattlePassTaskMap)
				if (3 === e.TaskState) return !0;
		return !1;
	}
	CheckHasTaskWaitTakeWithType(e) {
		if (this.wOi !== this.UQ)
			for (var [, t] of this.BattlePassTaskMap)
				if (e === t.UpdateType && 3 === t.TaskState) return !0;
		return !1;
	}
	AddTaskDataFromProtocol(e) {
		var t,
			a,
			s = CommonParamById_1.configCommonParamById.GetIntConfig("BattlePassExp"),
			i = this.BattlePassTaskMap,
			r = new BattlePassTaskLoopItem_1.BattlePassTaskData(),
			o =
				((r.TaskId = e.Ekn),
				ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassTask(
					e.Ekn,
				));
		for ([t, a] of o.TaskReward) {
			var n = [{ IncId: 0, ItemId: t }, a];
			t === s && (r.Exp += a), r.RewardItemList.push(n);
		}
		(r.CurrentProgress = e.k0s ?? 0),
			(r.TargetProgress = e.s3n ?? 0),
			(r.UpdateType = o.UpdateType),
			e.$0s
				? e.H0s
					? (r.TaskState = 2)
					: (r.TaskState = 3)
				: (r.TaskState = 1),
			i.set(e.Ekn, r);
	}
	SetDataFromBattlePassResponse(e) {
		var t = e.wfs;
		(this.IOi = t.Lfs ?? !1),
			this.IOi &&
				((this.HadEnter = t.Ufs),
				(this.BattlePassId = t.Ekn),
				(this.PayType = t.Dfs),
				(this.BattlePassLevel = t.r3n),
				(this.LevelExp = t.k3n),
				(this.WeekExp = t.Rfs),
				this.WOi(t.jCs),
				this.jOi(t.HCs),
				this.InitBattlePassConfigData(),
				this.UpdateBattlePassRewardDataFromResponse(e.wfs.Afs ?? void 0),
				t.Ufs || (this.PayButtonRedDotState = !0),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
				));
	}
	UpdateTaskDataFromBattlePassTaskTakeResponse(e) {
		var t = this.BattlePassTaskMap;
		for (const s of e) {
			var a = t.get(s);
			a && (a.TaskState = 2);
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
		);
	}
	UpdateExpDataFromBattlePassExpUpdateNotify(e, t, a) {
		this.UpdateRewardDataWithTargetLevel(e),
			e > this.BattlePassLevel &&
				((this.IncreasedLevelToShow = e - this.BattlePassLevel),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnBattlePassLevelUpEvent,
				)),
			(this.BattlePassLevel = e),
			(this.LevelExp = t),
			(this.WeekExp = a),
			this.FOi(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
			);
	}
	UpdateRewardDataFromBattlePassTakeAllRewardResponse(e) {
		for (const t of e.Afs) this.TakeReward(t.Ikn, t.r3n, t.G3n);
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
		);
	}
	UpdateRewardDataFormFreeToPay() {
		for (let t = 1; t <= this.wOi; t++) {
			var e = this.GetRewardData(t);
			if (e) for (const t of e.PayRewardItem) t.ItemType = 1;
		}
	}
	GetBattlePassIconPath() {
		var e = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(
			this.BattlePassId,
		);
		if (e) return e.ExclusiveRewardPath;
	}
	GetCurrentShowLevel() {
		let e = 0;
		for (const t of this.RewardDataList)
			if (t.IsThisType(1)) {
				e = t.Level;
				break;
			}
		if (0 === e)
			for (const t of this.RewardDataList) t.IsThisType(2) && (e = t.Level);
		return 0 === e ? 1 : e;
	}
	GetHighBattlePassOriginalPrice() {
		var e = this.GetPrimaryBattlePassGoodsId(),
			t = CommonParamById_1.configCommonParamById.GetIntConfig(
				"AdvancedWithoutActive",
			),
			a =
				((e =
					ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopDirectGoods(
						e,
					).PayId),
				(e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(e).Amount),
				(t =
					ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopDirectGoods(
						t,
					).PayId),
				ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(t).Amount),
			s = new StringBuilder_1.StringBuilder();
		t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(t);
		return (
			s.Append(
				ConfigManager_1.ConfigManager.PayItemConfig.GetPayShowCurrency(),
			),
			s.Append(e + a),
			t
		);
	}
	GetBattlePassItemConfirmId(e) {
		return ModelManager_1.ModelManager.FunctionModel.IsOpen(10040)
			? this.GetInTimeRange()
				? e === this.PrimaryItemId
					? ModelManager_1.ModelManager.BattlePassModel.PayType !==
						Protocol_1.Aki.Protocol.B2s.Proto_NoPaid
						? 151
						: ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime()
							? 152
							: 153
					: ModelManager_1.ModelManager.BattlePassModel.PayType ===
							Protocol_1.Aki.Protocol.B2s.Proto_Advanced
						? 155
						: ModelManager_1.ModelManager.BattlePassModel.PayType ===
								Protocol_1.Aki.Protocol.B2s.Proto_Paid
							? 154
							: ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime()
								? 159
								: 156
				: 150
			: 149;
	}
}
exports.BattlePassModel = BattlePassModel;
