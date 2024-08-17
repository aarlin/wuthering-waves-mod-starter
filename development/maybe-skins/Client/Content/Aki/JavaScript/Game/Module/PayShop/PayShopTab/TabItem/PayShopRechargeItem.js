"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopRechargeItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	PayItemController_1 = require("../../../PayItem/PayItemController"),
	GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	PayShopGoods_1 = require("../../PayShopData/PayShopGoods"),
	PayShopItemBase_1 = require("./PayShopItemBase");
class PayShopRechargeItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.gFi = void 0),
			(this.YFi = !1),
			(this.JFi = 0),
			(this.zFi = !1),
			(this.ZFi = 0),
			(this.jbe = () => {
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Shop", 11, "PayShop:ShopItem 点击充值", [
						"Id",
						this.Pe.PayItemId,
					]),
					PayItemController_1.PayItemController.SendBuyPayItemRequest(
						this.Pe.PayItemId,
					);
			}),
			(this.YOi = () => {
				this.Refresh(this.Pe, !1, 0);
			}),
			(this.UEe = (e) => {
				e.PayItemId === this.Pe.PayItemId &&
					((this.Pe.CanSpecialBonus = !1),
					this.Refresh(this.Pe, !1, 0),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info(
						"Shop",
						11,
						"PayShop:ShopItem 充值成功,道具到账",
						["订单号", e.OrderId],
						["道具id", e.ItemId],
						["道具数量", e.ItemCount],
					);
			}),
			(this.RFi = () => {
				this.Pe && (this.e3i(), this.t3i());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[5, this.jbe]]);
	}
	SetRaycastState(e) {
		this.RootItem.SetRaycastTarget(e),
			this.gFi.GetRootItem().SetRaycastTarget(e);
	}
	SetDownPriceShowState(e) {
		this.gFi.SetDownPriceShowState(e);
	}
	OnStart() {
		(this.gFi = new PayShopItemBase_1.PayShopItemBase(this.GetItem(0))),
			this.gFi.Init(),
			(this.YFi = this.GetItem(1).bIsUIActive),
			(this.zFi = this.GetItem(3).bIsUIActive),
			this.dde();
	}
	dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.DiscountShopTimerRefresh,
			this.RFi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPayItemSuccess,
				this.UEe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnQueryProductInfo,
				this.YOi,
			);
	}
	Cde() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.DiscountShopTimerRefresh,
			this.RFi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPayItemSuccess,
				this.UEe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnQueryProductInfo,
				this.YOi,
			);
	}
	OnBeforeDestroy() {
		this.Cde();
	}
	Refresh(e, t, i) {
		e instanceof PayShopGoods_1.PayShopGoods ||
			((this.Pe = e),
			this.gFi.Refresh(
				ModelManager_1.ModelManager.PayItemModel.ConvertPayItemDataToPayShopItemBaseSt(
					e,
				),
				t,
				i,
			),
			this.e3i(),
			this.t3i());
	}
	e3i() {
		let e = !1,
			t = 0;
		0 < this.Pe.BonusItemCount &&
			!this.Pe.CanSpecialBonus &&
			((e = !0), (t = this.Pe.BonusItemCount)),
			this.YFi !== e && ((this.YFi = e), this.GetItem(1).SetUIActive(e)),
			this.JFi !== t &&
				((this.JFi = t),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(2),
					"DefaultBonus",
					this.Pe.BonusItemCount,
				));
	}
	t3i() {
		let e = !1,
			t = 0;
		this.Pe.CanSpecialBonus && ((e = !0), (t = this.Pe.SpecialBonusItemCount)),
			this.zFi !== e && ((this.zFi = e), this.GetItem(3).SetUIActive(e)),
			this.ZFi !== t &&
				((this.ZFi = t),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(4),
					"FirstBonus2",
					this.Pe.SpecialBonusItemCount,
				));
	}
}
exports.PayShopRechargeItem = PayShopRechargeItem;
