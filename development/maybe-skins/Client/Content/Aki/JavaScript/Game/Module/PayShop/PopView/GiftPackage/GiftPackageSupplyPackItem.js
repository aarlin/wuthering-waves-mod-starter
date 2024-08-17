"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GiftPackageSupplyPackItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView"),
	GiftPackageItem_1 = require("./GiftPackageItem"),
	COLOR = "FED12E";
class GiftPackageSupplyPackItem extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i) {
		super(),
			(this.m3i = !1),
			(this.d3i = !1),
			(this.C3i = void 0),
			(this.xqe = void 0),
			(this.ZNi = new Array()),
			(this.g3i = 0),
			(this.sGe = (e, t, i) => {
				var s = new GiftPackageItem_1.GiftPackageItem();
				return (
					s.Initialize(t),
					s.SetBelongViewName("GiftPackageDetailsView"),
					e && 2 <= e.length && s.UpdateItem(e[0], e[1]),
					{ Key: i, Value: s }
				);
			}),
			(this.SetEndTime = () => {
				var e,
					t = this.C3i.GetCountDownData();
				0 === t[2]
					? (this.GetItem(3).SetUIActive(!1), (this.d3i = !1))
					: ((e = this.C3i.GetCountDownData()[1]),
						3 === t[0]
							? (this.GetText(4).ShowTextNew("DownShopItem"),
								this.GetText(4).SetUIActive(!0))
							: 2 === t[0]
								? (this.GetText(4).ShowTextNew("ReUpShopItem"),
									this.GetText(4).SetUIActive(!0))
								: 1 === t[0]
									? (this.GetText(4).ShowTextNew("DiscountItem"),
										this.GetText(4).SetUIActive(!0))
									: this.GetText(4).SetUIActive(!1),
						(this.d3i = void 0 !== e),
						e
							? (this.GetItem(3).SetUIActive(!0),
								(t = this.GetText(5)),
								"string" == typeof e
									? t.SetText(e)
									: LguiUtil_1.LguiUtil.SetLocalText(t, e.TextId, e.TimeValue))
							: this.GetItem(3).SetUIActive(!1));
			}),
			(this.g3i = e),
			(this.C3i = i),
			this.CreateThenShowByResourceIdAsync("UiItem_GiftPackageSupplyPack", t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIScrollViewWithScrollbarComponent],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIItem],
			[4, UE.UIText],
			[5, UE.UIText],
			[6, UE.UIItem],
			[7, UE.UIText],
		];
	}
	OnStart() {
		(this.xqe = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(0),
			this.sGe,
		)),
			this.Refresh();
	}
	Update(e) {
		(this.g3i = e), this.Refresh();
	}
	Refresh() {
		if (!this.InAsyncLoading()) {
			var e, t;
			for ([
				e,
				t,
			] of ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(
				this.g3i,
			).Content)
				this.ZNi.push([e, t]);
			this.xqe.RefreshByData(this.ZNi),
				this.SetEndTime(),
				this.mGe(),
				this.KFi(),
				this.f3i();
		}
	}
	mGe() {}
	f3i() {
		this.GetItem(6).SetUIActive(this.m3i || this.d3i);
	}
	KFi() {
		this.GetText(2).SetUIActive(!1), this.GetText(7).SetUIActive(!1);
		var e = this.C3i.GetExchangeViewShopTipsText();
		let t;
		(t = this.d3i ? this.GetText(2) : this.GetText(7)).SetUIActive("" !== e),
			t.SetText(e),
			t.SetColor(UE.Color.FromHex(COLOR)),
			(this.m3i = "" !== e);
	}
	OnBeforeDestroy() {}
}
exports.GiftPackageSupplyPackItem = GiftPackageSupplyPackItem;
