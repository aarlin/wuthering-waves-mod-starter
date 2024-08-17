"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ModelBase_1 = require("../../../Core/Framework/ModelBase"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	PayShopGoods_1 = require("./PayShopData/PayShopGoods"),
	PayShopGoodsData_1 = require("./PayShopData/PayShopGoodsData");
class PayShopModel extends ModelBase_1.ModelBase {
	constructor() {
		super(...arguments),
			(this.D2i = new Map()),
			(this.R2i = new Map()),
			(this.u2i = new Map()),
			(this.U2i = ""),
			(this.A2i = 0),
			(this.P2i = !1),
			(this.x2i = new Array()),
			(this.w2i = (e, t) => {
				var o, a;
				return e.IsSoldOut() !== t.IsSoldOut()
					? e.IsSoldOut()
						? 1
						: -1
					: e.IsLocked() !== t.IsLocked()
						? e.IsLocked()
							? 1
							: -1
						: e.GetGoodsData().GetSortValue() !==
								t.GetGoodsData().GetSortValue()
							? e.GetGoodsData().GetSortValue() -
								t.GetGoodsData().GetSortValue()
							: ((o = e.GetItemData()),
								(a = t.GetItemData()),
								o.Quality !== a.Quality
									? a.Quality - o.Quality
									: e.GetGoodsId() - t.GetGoodsId());
			});
	}
	set Version(e) {
		this.U2i = e;
	}
	get Version() {
		return this.U2i;
	}
	GetCurrentPayShopId() {
		return this.A2i;
	}
	GetTabInfoByPayShopIdId(e) {
		var t;
		for (const o of this.GetPayShopIdList())
			if (o === e)
				return (
					(t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(o)),
					ConfigManager_1.ConfigManager.DynamicTabConfig.GetTabViewConfById(
						t.DynamicTabId,
					)
				);
	}
	SetPayShopInfoList(e) {
		for (const t of e) this.B2i(t);
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RefreshAllPayShop,
			Array.from(this.D2i.keys()),
		);
	}
	SetPayShopInfo(e, t) {
		var o = this.b2i(e);
		this.B2i(e),
			(this.A2i = e.Ekn),
			t
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.SwitchPayShopView,
						e.Ekn,
					)
				: EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RefreshPayShop,
						e.Ekn,
						o,
					);
	}
	SetPayShopGoodsList(e) {
		var t,
			o,
			a = new Set();
		for (const i of e) {
			let e = this.u2i.get(i.Ekn);
			e
				? this.RefreshPayShopGoods(i)
				: ((t =
						ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(
							i.Ekn,
						).ShopId),
					(o = this.D2i.get(t) ?? new Set()).add(i.Ekn),
					this.D2i.set(t, o),
					(e = this.q2i(i, t))),
				a.add(e.GetTabId());
		}
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.RefreshGoodsList,
			a,
		);
	}
	B2i(e) {
		var t = e.Ekn,
			o = e._gs,
			a = new Set();
		for (const e of o)
			a.add(e.Ekn),
				0 < this.q2i(e, t).GetTabId() &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Pay", 28, "有标签");
		this.D2i.set(t, a),
			this.R2i.set(t, MathUtils_1.MathUtils.LongToBigInt(e.eAs)),
			(this.P2i = !0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Shop",
					11,
					"PayShop:Root 刷新商城数据",
					["ShopId", t],
					["goodsLength", a.size],
				);
	}
	b2i(e) {
		return !0;
	}
	RefreshPayShopGoods(e) {
		var t = new PayShopGoodsData_1.PayShopGoodsData();
		t.Phrase(e), this.u2i.get(e.Ekn).SetGoodsData(t);
	}
	q2i(e, t) {
		var o = new PayShopGoodsData_1.PayShopGoodsData();
		return (
			(e = (o.Phrase(e), new PayShopGoods_1.PayShopGoods(t))).SetGoodsData(o),
			this.u2i.set(o.Id, e),
			e
		);
	}
	UnLockPayShopGoods(e) {
		var t = new Map();
		for (const a of e) {
			var o = this.u2i.get(a);
			o.SetUnLock();
			let e = t.get(o.PayShopId);
			(e = e || new Set()).add(o.GetTabId()), t.set(o.PayShopId, e);
		}
		(this.P2i = !0),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UnLockGoods, t);
	}
	GetPayShopIdList() {
		return this.P2i
			? ((this.P2i = !1),
				(this.x2i = []),
				this.D2i.forEach((e, t) => {
					ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t)
						.Enable && this.x2i.push(t);
				}),
				this.x2i.sort((e, t) => {
					var o =
							ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(e),
						a = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(t);
					return o.Sort !== a.Sort ? o.Sort - a.Sort : e - t;
				}))
			: this.x2i;
	}
	GetPayShopTabIdList(e) {
		var t = new Set();
		for (const a of this.D2i.get(e)) {
			var o = this.u2i.get(a);
			t.has(o.GetTabId()) || t.add(o.GetTabId());
		}
		return Array.from(t).sort((t, o) => {
			var a = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
					e,
					t,
				),
				i = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(
					e,
					o,
				);
			return a.Sort !== i.Sort ? a.Sort - i.Sort : t - o;
		});
	}
	G2i(e, t = 1) {
		return 3 === e && 1 === t;
	}
	N2i(e, t = 1) {
		var o = [];
		if (this.G2i(e, t))
			for (const e of ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList())
				e.GetGetPayGiftData().ShowInShop() && o.push(e);
		for (const t of this.D2i.get(e)) {
			var a = this.u2i.get(t);
			o.push(a);
		}
		return o;
	}
	CheckGoodIfShowInTab(e, t) {
		var o = [];
		for (const t of this.D2i.get(e)) {
			var a = this.u2i.get(t);
			o.push(a);
		}
		for (const e of o) if (e.GetGoodsId() === t && this.kVs(e)) return !0;
		return !1;
	}
	GetPayShopTabData(e, t = 1) {
		var o = [];
		for (const a of this.N2i(e, t))
			a.GetTabId() === t && this.kVs(a) && o.push(a);
		return o.sort(this.w2i);
	}
	kVs(e) {
		return !(
			!e.IsShowInShop() ||
			!e.InSellTime() ||
			!e.GetGoodsData().Show ||
			(e.GetGoodsData().HasBuyLimit() &&
				0 === e.GetGoodsData().GetRemainingCount() &&
				!e.GetGoodsData().IsWeeklyRefresh()) ||
			(e.GetGoodsData().HasBuyLimit() &&
				0 === e.GetGoodsData().GetRemainingCount() &&
				e.GetGoodsData().IsWeeklyRefresh() &&
				e.GetGoodsData().UpdateTime >= e.GetGoodsData().EndTime &&
				!e.IsPermanentSell())
		);
	}
	GetPayShopGoods(e) {
		return this.u2i.get(e);
	}
	GetPayShopCountDownData(e) {
		var t;
		if (!(void 0 === (e = this.R2i.get(e)) || e <= 0))
			return (
				(e = Number(e)),
				(t = PayShopGoods_1.PayShopGoods.GetTimeTypeData(e)),
				(e -= Math.ceil(TimeUtil_1.TimeUtil.GetServerTime())),
				0 === t[0]
					? {
							CountDownText:
								ConfigManager_1.ConfigManager.TextConfig.GetTextById(
									"NotEnoughOneHour",
								),
							RemainingTime: e,
						}
					: TimeUtil_1.TimeUtil.GetCountDownData(e)
			);
	}
	GetPayShopUpdateTime(e) {
		return (e = this.R2i.get(e)) ? Number(e) : 0;
	}
	UpdatePayShopGoodsCount(e, t) {
		var o = this.u2i.get(e);
		o.IsLimitGoods() &&
			(o.AddBoughtCount(t), o.IsSoldOut()) &&
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GoodsSoldOut, e),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.RefreshGoods,
				e,
				o.PayShopId,
				o.GetTabId(),
			);
	}
	GetNeedCheckGoods(e) {
		var t = [];
		for (const o of this.N2i(e))
			o.IsShowInShop() &&
				(o.InUpdateTime() || o.InUnPermanentSellTime()) &&
				t.push(o);
		return t;
	}
	CheckPayShopEntranceHasRedDot() {
		if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10010))
			for (const e of this.GetPayShopIdList())
				if (this.CheckPayShopHasRedDot(e)) return !0;
		return !1;
	}
	CheckPayShopHasRedDot(e) {
		if (1 === e)
			return ModelManager_1.ModelManager.MonthCardModel.GetPayButtonRedDotState();
		for (const t of this.GetPayShopTabIdList(e))
			if (this.CheckPayShopTabHasRedDot(e, t)) return !0;
		return !1;
	}
	CheckPayShopTabHasRedDot(e, t = 1) {
		let o = [];
		for (const a of (o = this.G2i(e, t)
			? ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsList()
			: this.GetPayShopTabData(e, t)))
			if (this.O2i(a)) return !0;
		return !1;
	}
	O2i(e) {
		return (
			!(e.IsLocked() || !e.IfCanBuy() || e.IsSoldOut() || e.IsDirect()) &&
			0 === e.GetPriceData().NowPrice
		);
	}
	ClearData() {
		this.D2i.clear(), this.u2i.clear(), this.R2i.clear();
	}
}
exports.PayShopModel = PayShopModel;
