"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookRewardPopData = exports.CookModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiPopViewData_1 = require("../../Ui/Define/UiPopViewData"),
	CookController_1 = require("./CookController");
class CookModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.Wbt = -1),
			(this.LastExp = 0),
			(this.CurrentInteractCreatureDataLongId = void 0),
			(this.Kbt = 0),
			(this.Qbt = 0),
			(this.Xbt = void 0),
			(this.$bt = new Map()),
			(this.Ybt = void 0),
			(this.Jbt = (t, e) => {
				var o = t.IsUnLock ? 1 : 0,
					i = e.IsUnLock ? 1 : 0;
				return 1 == o && o == i
					? t.IsMachining === e.IsMachining
						? t.Quality === e.Quality
							? t.ItemId - e.ItemId
							: t.Quality - e.Quality
						: e.IsMachining - t.IsMachining
					: 0 == o && o == i
						? t.Quality === e.Quality
							? t.ItemId - e.ItemId
							: t.Quality - e.Quality
						: i - o;
			}),
			(this.zbt = 0),
			(this.Zbt = void 0),
			(this.eqt = void 0),
			(this.tqt = void 0),
			(this.iqt = void 0),
			(this.oqt = void 0),
			(this.rqt = void 0),
			(this.nqt = void 0),
			(this.sqt = (t, e) =>
				t.IsBuff === e.IsBuff ? t.RoleId - e.RoleId : t.IsBuff ? -1 : 1),
			(this.aqt = 0),
			(this.E0 = void 0),
			(this.hqt = void 0);
	}
	OnInit() {
		return !0;
	}
	OnClear() {
		return this.ClearCookRoleItemDataList(), !0;
	}
	set CurrentCookViewType(t) {
		this.Kbt = t;
	}
	get CurrentCookViewType() {
		return this.Kbt;
	}
	set CurrentCookListType(t) {
		this.Qbt = t;
	}
	get CurrentCookListType() {
		return this.Qbt;
	}
	SaveLimitRefreshTime(t) {
		this.Wbt =
			MathUtils_1.MathUtils.LongToNumber(t) * TimeUtil_1.TimeUtil.Millisecond;
	}
	CheckCanCook(t) {
		return (
			this.CheckLimitCount(t) &&
			this.CheckCoinEnough(t) &&
			this.CheckMaterialEnough(t)
		);
	}
	CheckLimitCount(t) {
		return (
			(t = this.GetCookingDataById(t)).LimitTotalCount <= 0 ||
			t.CookCount < t.LimitTotalCount
		);
	}
	CheckCoinEnough(t) {
		return (
			(t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t)),
			ModelManager_1.ModelManager.InventoryModel.CheckIsCoinEnough(
				CookController_1.CookController.CookCoinId,
				t.ConsumeItems,
			)
		);
	}
	CheckMaterialEnough(t) {
		for (const o of ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
			t,
		).ConsumeItems) {
			var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				o.ItemId,
			);
			if (o.Count > e) return !1;
		}
		return !0;
	}
	CheckHasItemTimeoutStateChangedCore() {
		var t,
			e,
			o,
			i,
			n,
			a,
			r = this.Xbt,
			s = this.$bt;
		for ([t, e] of s) s.set(t, e - 1);
		let l = !1;
		for (const t of r)
			0 !== t.ExistStartTime &&
				0 !== t.ExistEndTime &&
				((o = t.ItemId),
				(i = TimeUtil_1.TimeUtil.IsInTimeSpan(t.ExistStartTime, t.ExistEndTime)
					? 1
					: 3),
				(s.has(o) && s.get(o) === i - 1) || (l = !0),
				s.set(o, i));
		for ([n, a] of s) (0 !== a && 2 !== a) || s.delete(n);
		return l;
	}
	CreateCookingDataList(t) {
		this.Xbt || (this.Xbt = new Array()), (this.Xbt.length = 0);
		var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormula() ?? [],
			o = new Map();
		for (const t of e) {
			var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.FoodItemId);
			const e = {
				MainType: 0,
				SubType: 6e4,
				UniqueId: 0,
				ItemId: t.Id,
				CookCount: 0,
				IsNew: !1,
				LastRoleId: void 0,
				IsCook: 0,
				Quality: i.QualityId,
				EffectType: t.TypeId,
				DataId: t.FoodItemId,
				LimitTotalCount: 0,
				LimitedCount: 0,
				ExistStartTime: 0,
				ExistEndTime: 0,
				IsUnLock: !1,
			};
			o.set(e.ItemId, e), this.Xbt.push(e);
		}
		let n;
		for (const e of t) {
			var a = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
					e.Ekn,
				),
				r = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a.FoodItemId);
			o.has(e.Ekn)
				? (((n = o.get(e.Ekn)).CookCount = e.O4n),
					(n.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
						LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
						e.Ekn,
					)),
					(n.LastRoleId = e.NTs),
					(n.IsCook = 0),
					(n.LimitTotalCount = e.FTs),
					(n.LimitedCount = e.VTs),
					(n.DataId = a.FoodItemId),
					(n.ExistStartTime =
						MathUtils_1.MathUtils.LongToNumber(e.$Ts) *
						TimeUtil_1.TimeUtil.Millisecond),
					(n.ExistEndTime =
						MathUtils_1.MathUtils.LongToNumber(e.HTs) *
						TimeUtil_1.TimeUtil.Millisecond),
					(n.IsUnLock = !0))
				: ((n = {
						MainType: 0,
						SubType: 0,
						UniqueId: 0,
						ItemId: e.Ekn,
						CookCount: e.O4n,
						IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
							LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
							e.Ekn,
						),
						LastRoleId: e.NTs,
						IsCook: 0,
						Quality: r.QualityId,
						EffectType: a.TypeId,
						DataId: a.FoodItemId,
						LimitTotalCount: e.FTs,
						LimitedCount: e.VTs,
						ExistStartTime:
							MathUtils_1.MathUtils.LongToNumber(e.$Ts) *
							TimeUtil_1.TimeUtil.Millisecond,
						ExistEndTime:
							MathUtils_1.MathUtils.LongToNumber(e.HTs) *
							TimeUtil_1.TimeUtil.Millisecond,
						IsUnLock: !0,
					}),
					this.Xbt.push(n)),
				(n.IsCook = this.CheckCanCook(e.Ekn) ? 1 : 0);
		}
	}
	UpdateCookingDataList(t) {
		this.Xbt || this.CreateCookingDataList(t);
		for (const o of t)
			for (const t of this.Xbt) {
				var e;
				o.Ekn === t.ItemId &&
					((t.CookCount = o.O4n),
					(t.LimitedCount = o.VTs),
					t.IsUnLock ||
						((e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
							o.Ekn,
						)),
						(t.IsNew = !0),
						(t.IsUnLock = !0),
						(t.DataId = e.FoodItemId),
						(t.ExistStartTime =
							MathUtils_1.MathUtils.LongToNumber(o.$Ts) *
							TimeUtil_1.TimeUtil.Millisecond),
						(t.ExistEndTime =
							MathUtils_1.MathUtils.LongToNumber(o.HTs) *
							TimeUtil_1.TimeUtil.Millisecond),
						ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
							LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
							o.Ekn,
						),
						ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
							"FormulaLearned",
						)),
					(t.IsCook = this.CheckCanCook(o.Ekn) ? 1 : 0));
			}
	}
	UpdateCookingDataByServerConfig(t) {
		for (const n of t) {
			var e =
					MathUtils_1.MathUtils.LongToNumber(n.$Ts) *
					TimeUtil_1.TimeUtil.Millisecond,
				o =
					MathUtils_1.MathUtils.LongToNumber(n.HTs) *
					TimeUtil_1.TimeUtil.Millisecond,
				i = this.Xbt.findIndex((t) => t.ItemId === n.Ekn);
			-1 !== i &&
				((this.Xbt[i].ExistStartTime = e), (this.Xbt[i].ExistEndTime = o));
		}
	}
	UnlockCookMenuData(t) {
		var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t);
		let o = 0;
		for (
			;
			o < this.Xbt.length &&
			(6e4 !== this.Xbt[o].SubType || this.Xbt[o].ItemId !== e.FormulaItemId);
			o++
		);
		this.Xbt.splice(o, 1);
	}
	GetCookingDataList() {
		return this.Xbt;
	}
	GetCookingDataById(t) {
		for (const e of this.Xbt) if (t === e.ItemId) return e;
	}
	GetCookRoleId(t) {
		return (
			(t = this.GetCookingDataById(t)),
			t?.LastRoleId
				? t.LastRoleId
				: ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId() ?? 1502
		);
	}
	CreateMachiningDataList() {
		this.Ybt || (this.Ybt = new Array());
		for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessed()) {
			var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.FinalItemId);
			t = {
				MainType: 1,
				ItemId: e.Id,
				IsUnLock: !1,
				InteractiveList: [],
				UnlockList: [],
				IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(
					LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
					e.Id,
				),
				IsMachining: CookController_1.CookController.CheckCanProcessed(e.Id)
					? 1
					: 0,
				Quality: t.QualityId,
			};
			this.Ybt.push(t);
		}
		this.Ybt.sort(this.Jbt);
	}
	UpdateMachiningDataList(t, e) {
		for (const a of t)
			for (const t of this.Ybt)
				if (a.Ekn === t.ItemId) {
					let r = [];
					var o = [],
						i = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
							a.Ekn,
						);
					if (a.jTs) {
						for (const t of i.ConsumeItemsId) o.push(t.ItemId);
						r = i.InterationId;
					} else
						for (const t of (r = a.WTs)) {
							var n = i.InterationId.indexOf(t);
							0 <= n && ((n = i.ConsumeItemsId[n].ItemId), o.push(n));
						}
					(t.IsUnLock = r.length === i.InterationId.length),
						(t.InteractiveList = r),
						(t.UnlockList = o),
						(t.IsMachining = CookController_1.CookController.CheckCanProcessed(
							a.Ekn,
						)
							? 1
							: 0),
						e &&
							((t.IsNew = e),
							ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(
								LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey,
								a.Ekn,
							),
							a.jTs) &&
							ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
								"FormulaLearned",
							);
					break;
				}
		this.Ybt.sort(this.Jbt);
	}
	GetMachiningDataList() {
		return this.Ybt;
	}
	GetMachiningDataById(t) {
		for (const e of this.Ybt) if (t === e.ItemId) return e;
	}
	set SelectedCookerLevel(t) {
		this.zbt = t;
	}
	get SelectedCookerLevel() {
		return this.zbt;
	}
	CreateCookerInfo(t) {
		this.UpdateCookerInfo(t), (this.Zbt = new Map());
		for (const t of ConfigManager_1.ConfigManager.CookConfig.GetCookLevel())
			this.Zbt.set(t.Id, t);
	}
	UpdateCookerInfo(t) {
		let e = 0;
		this.eqt &&
			((this.LastExp = this.eqt.TotalProficiencys),
			(e = t.kTs - this.eqt.TotalProficiencys)),
			(this.eqt = { CookingLevel: t.OTs, TotalProficiencys: t.kTs, AddExp: e });
	}
	GetCookerInfo() {
		return this.eqt;
	}
	CleanAddExp() {
		this.eqt.AddExp = 0;
	}
	GetCookLevelByLevel(t) {
		return this.Zbt.get(t);
	}
	GetCookerMaxLevel() {
		return this.Zbt.size;
	}
	GetSumExpByLevel(t) {
		var e = this.GetCookerMaxLevel();
		let o = t + 1;
		return o > e && (o = e), this.GetCookLevelByLevel(o).Completeness;
	}
	GetDropIdByLevel(t) {
		return (
			(t += 1),
			this.GetCookerMaxLevel() < t ? -1 : this.GetCookLevelByLevel(t).DropIds
		);
	}
	CreateTmpMachiningItemList(t) {
		this.tqt || (this.tqt = new Array()),
			(this.tqt.length = 0),
			this.iqt || (this.iqt = new Array()),
			(this.iqt.length = 0),
			this.oqt || (this.oqt = new Map()),
			this.oqt.clear(),
			(this.tqt.length = 0),
			(this.iqt.length = 0);
		for (const e of t) this.tqt.push(e), e.m3n || this.iqt.push(e);
	}
	UpdateTmpMachiningItemList(t, e) {
		this.tqt[t] = e;
	}
	SubOneTmpMachiningItemSelectNum(t) {
		if (this.tqt[t] && ((t = this.tqt[t]), this.oqt.has(t.G3n))) {
			var e = this.oqt.get(t.G3n) - 1;
			if ((this.oqt.set(t.G3n, e), !(0 < e))) {
				this.oqt.delete(t.G3n);
				var o = function (t, e) {
					(t.m3n = e.m3n), (t.G3n = e.G3n);
				};
				o((e = { m3n: (t.m3n = !1), G3n: 0, k4n: 0 }), t);
				let n = this.iqt.indexOf(t);
				for (; n < this.iqt.length - 1; n++) {
					var i = this.iqt[n + 1];
					o(this.iqt[n], i);
				}
				o(this.iqt[n], e);
			}
		}
	}
	ClearTmpMachiningItemList() {
		(this.tqt.length = 0), (this.iqt.length = 0), this.oqt.clear();
	}
	SetEmptyBySelectedItem(t, e, o, i) {
		(t = this.iqt[t]) &&
			(o && ((t.G3n = o), i) && this.oqt.set(o, i), (t.m3n = e));
	}
	IsSelectNumFromEmpty(t) {
		let e = !1,
			o = 0;
		return this.oqt.has(t) && ((e = !0), (o = this.oqt.get(t))), [e, o];
	}
	CheckCanProcessedNew(t) {
		if (0 === this.oqt.size)
			return CookController_1.CookController.CheckCanProcessed(t);
		let e = !0;
		for (const t of this.tqt)
			if (this.oqt.has(t.G3n)) {
				var o = this.oqt.get(t.G3n);
				if (t.k4n > o) {
					e = !1;
					break;
				}
			}
		return e;
	}
	GetTmpMachiningItemList() {
		return this.tqt;
	}
	GetEmptyMachiningItemListNum() {
		return this.iqt.length;
	}
	set CurrentCookRoleId(t) {
		this.rqt = t;
	}
	get CurrentCookRoleId() {
		return this.rqt;
	}
	UpdateCookRoleItemDataList() {
		this.nqt || (this.nqt = new Array()), (this.nqt.length = 0);
		for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList())
			this.nqt.push({
				RoleId: t.GetRoleId(),
				RoleName: t.GetRoleRealName(),
				RoleIcon: t.GetRoleConfig().RoleHeadIcon,
				IsBuff: !1,
				ItemId: 0,
			});
	}
	ClearCookRoleItemDataList() {
		this.nqt = void 0;
	}
	GetCookRoleItemDataList(t) {
		this.nqt || this.UpdateCookRoleItemDataList();
		for (const e of this.nqt)
			(e.ItemId = t),
				(e.IsBuff = CookController_1.CookController.CheckIsBuff(e.RoleId, t));
		return this.nqt.sort(this.sqt);
	}
	GetCookMaterialList(t, e) {
		var o = new Array();
		if (0 === e)
			for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(
				t,
			).ConsumeItems)
				o.push({ G3n: e.ItemId, k4n: e.Count, m3n: !0 });
		else {
			var i = this.GetMachiningDataById(t);
			for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
				t,
			).ConsumeItemsId)
				o.push({
					G3n: e.ItemId,
					k4n: e.Count,
					m3n: i.UnlockList.includes(e.ItemId),
				});
		}
		return o;
	}
	GetMachiningMaterialStudyList(t) {
		var e = new Array(),
			o = this.GetMachiningDataById(t);
		for (const n of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
			t,
		).ConsumeItemsId) {
			var i = o.UnlockList.includes(n.ItemId);
			e.push({ G3n: i ? n.ItemId : 0, k4n: n.Count, m3n: i });
		}
		return e;
	}
	GetRefreshLimitTime() {
		var t;
		if (0 !== this.Wbt)
			return (
				(t = TimeUtil_1.TimeUtil.GetServerTime()),
				TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Wbt - t).CountDownText
			);
	}
	GetRefreshLimitTimeValue() {
		var t;
		return this.Wbt <= 0
			? 1
			: ((t = TimeUtil_1.TimeUtil.GetServerTime()),
				TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Wbt - t)
					.RemainingTime);
	}
	set CurrentFixId(t) {
		this.aqt = t;
	}
	get CurrentFixId() {
		return this.aqt;
	}
	set CurrentEntityId(t) {
		this.E0 = t;
	}
	get CurrentEntityId() {
		return this.E0;
	}
	UpdateCookItemList(t) {
		this.hqt || (this.hqt = new Array()), (this.hqt.length = 0);
		for (const e of t) this.hqt.push({ ItemId: e.G3n, ItemNum: e.k4n });
	}
	GetCookItemList() {
		return this.hqt;
	}
}
exports.CookModel = CookModel;
class CookRewardPopData extends UiPopViewData_1.UiPopViewData {
	constructor() {
		super(...arguments), (this.CookRewardPopType = 0);
	}
}
exports.CookRewardPopData = CookRewardPopData;
