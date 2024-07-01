"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ShopItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../../Common/TimeUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	SECONDS_PER_DAY = 86400,
	red = new UE.Color(255, 0, 0, 255),
	soldOutColor = UE.Color.FromHex("FFFFFFFF"),
	coinNotEnoughColor = UE.Color.FromHex("9D2437FF");
class ShopItem extends UiPanelBase_1.UiPanelBase {
	constructor(t) {
		super(),
			(this.ItemInfo = void 0),
			(this.j7e = () => {
				(ModelManager_1.ModelManager.ShopModel.OpenItemInfo = this.ItemInfo),
					EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenItemInfo);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UISprite],
			[4, UE.UISprite],
			[5, UE.UIText],
			[6, UE.UITexture],
			[7, UE.UIText],
			[8, UE.UIText],
			[9, UE.UIText],
			[10, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[14, UE.UIText],
			[15, UE.UIText],
		]),
			(this.BtnBindInfo = [[0, this.j7e]]);
	}
	UpdateItem(t) {
		var e;
		t &&
			(this.RootItem.SetAsLastHierarchy(),
			(this.ItemInfo = t),
			this.SetItemIcon(this.GetTexture(2), this.ItemInfo.ItemId),
			this.SetItemQualityIcon(this.GetSprite(3), this.ItemInfo.ItemId),
			this.SetItemQualityIcon(this.GetSprite(4), this.ItemInfo.ItemId),
			LguiUtil_1.LguiUtil.SetLocalText(
				this.GetText(5),
				"ShowCount",
				t.StackSize,
			),
			(e = this.ItemInfo.ItemInfo),
			LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name),
			this.SetItemIcon(this.GetTexture(6), t.GetMoneyId()),
			t.IsAffordable() || this.GetText(7).SetColor(coinNotEnoughColor),
			this.GetText(7).SetText(t.GetDefaultPrice().toString()),
			this.GetText(8).SetText(`<s>${this.ItemInfo.GetOriginalPrice()}</s>`),
			this.GetText(8).SetUIActive(-1 !== this.ItemInfo.GetOriginalPrice()),
			this.UpdateLockState(),
			this.UpdateLimitTime());
	}
	UpdateLockState() {
		var t = this.ItemInfo.IsInteractive();
		this.GetItem(12).SetUIActive(!t),
			this.GetItem(11).SetAlpha(t ? 1 : 0.5),
			this.GetItem(13).SetUIActive(!this.ItemInfo.IsUnlocked()),
			this.GetText(9).SetUIActive(-1 !== this.ItemInfo.BuyLimit),
			-1 !== this.ItemInfo.BuyLimit &&
				(this.GetText(9).SetUIActive(!0),
				LguiUtil_1.LguiUtil.SetLocalText(
					this.GetText(9),
					"ShopItemLimitCount",
					this.ItemInfo.BuyLimit - this.ItemInfo.BoughtCount,
					this.ItemInfo.BuyLimit,
				)),
			this.ItemInfo.IsUnlocked()
				? this.ItemInfo.IsSoldOut()
					? (this.GetText(15).SetColor(soldOutColor),
						this.GetText(15).SetUIActive(!0),
						LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(15),
							"ShopItemSoldOut",
						))
					: this.ItemInfo.IsOutOfDate() &&
						(LguiUtil_1.LguiUtil.SetLocalText(
							this.GetText(15),
							"ShopItemTimeout",
						),
						this.GetText(15).SetColor(red),
						this.GetText(15).SetUIActive(!0))
				: (this.GetText(15).SetUIActive(!1),
					LguiUtil_1.LguiUtil.SetLocalTextNew(
						this.GetText(14),
						this.ItemInfo.LockInfo,
					));
	}
	UpdateLimitTime() {
		var t, e;
		0 !== this.ItemInfo.EndTime &&
			((e = this.ItemInfo.EndTime - TimeUtil_1.TimeUtil.GetServerTimeStamp()),
			0 < (t = Math.trunc(e / 86400))
				? LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(10),
						"ShopItemLimitTime1",
						t,
					)
				: 0 === t &&
					((t = Math.trunc(e / 3600)),
					(e = Math.trunc(e / 60) % 60),
					LguiUtil_1.LguiUtil.SetLocalText(
						this.GetText(10),
						"ShopItemLimitTime2",
						t,
						e,
					))),
			this.GetText(10).SetUIActive(this.ItemInfo.InSaleTime());
	}
	Tick() {
		this.UpdateLockState(), this.UpdateLimitTime();
	}
}
exports.ShopItem = ShopItem;
