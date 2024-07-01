"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemDeliverView = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
	ItemInteractionPanel_1 = require("../../Common/ItemInteractionPanel/View/ItemInteractionPanel"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
	ItemDeliverController_1 = require("../ItemDeliverController"),
	DeliverMediumItemGrid_1 = require("./DeliverMediumItemGrid"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class ItemDeliverView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.uCi = void 0),
			(this.cCi = void 0),
			(this.mCi = void 0),
			(this.nVt = void 0),
			(this.dCi = !1),
			(this.nNt = () => {
				if (!this.dCi)
					if (this.CCi()) {
						var e = this.uCi.Context;
						if (e) {
							this.dCi = !0;
							var t = this.uCi.GetSlotDataList();
							if (6 === e.Type) {
								var i = [];
								for (const e of t)
									if (e.HasItem()) {
										var r = {
											Z5n: [
												{
													Ykn: 0,
													G3n: e.GetCurrentItemConfigId(),
													O3n: e.GetCurrentCount(),
												},
											],
											I5n: e.GetNeedCount(),
											e6n: Protocol_1.Aki.Protocol.e6n.Proto_ItemIds,
										};
										switch (e.HandInType) {
											case "ItemIds":
												r.e6n = Protocol_1.Aki.Protocol.e6n.Proto_ItemIds;
												break;
											case "ItemType":
												r.e6n = Protocol_1.Aki.Protocol.e6n.t6n;
										}
										i.push(r);
									}
								ItemDeliverController_1.ItemDeliverController.HandInItemRequest(
									e,
									i,
									this.gCi,
								);
							} else
								1 === e.Type &&
									(t = t[0]).HasItem() &&
									ItemDeliverController_1.ItemDeliverController.ItemUseRequest(
										e,
										t.GetCurrentItemConfigId(),
										t.GetCurrentCount(),
										this.gCi,
									);
						}
					} else
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"DeliverNoMaterial",
						);
			}),
			(this.gCi = (e) => {
				(this.dCi = !1), e && this.CloseMe();
			}),
			(this.zAt = (e) => {
				var t;
				e.IsEnable()
					? this.fCi(e.ItemConfigId, 1) &&
						(this.pCi(),
						(t = Math.min(e.GetCurrentCount() + 1, e.GetItemCount())),
						e.SetCurrentCount(t),
						this.mCi.RefreshItemGrid(e))
					: ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
							e.ItemConfigId,
						);
			}),
			(this.vCi = (e) => {
				var t = Math.max(e.GetCurrentCount() - 1, 0);
				e.SetCurrentCount(t),
					this.mCi.RefreshItemGrid(e),
					this.fCi(e.ItemConfigId, -1),
					this.pCi(),
					t <= 0 && this.mCi.SetItemGridSelected(!1, e);
			}),
			(this.ACt = () => {
				ModelManager_1.ModelManager.ItemDeliverModel?.SetItemDeliverData(
					void 0,
				),
					this.CloseMe();
			}),
			(this.MCi = () => {
				var e = new DeliverMediumItemGrid_1.DeliverMediumItemGrid();
				return e.BindReduceButtonCallback(this.SCi), e;
			}),
			(this.SCi = (e) => {
				var t = (e = e.Data).GetCurrentCount() - 1,
					i =
						(e.SetCurrentCount(Math.max(t, 0)),
						this.mCi.GetItemData(e.GetCurrentItemConfigId()));
				i &&
					(i.SetCurrentCount(i.GetCurrentCount() - 1),
					this.mCi.RefreshItemGrid(i)),
					t <= 0 && e.ClearItem(),
					this.pCi();
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[3, UE.UIText],
			[2, UE.UIButtonComponent],
			[4, UE.UIScrollViewWithScrollbarComponent],
			[5, UE.UIHorizontalLayout],
			[6, UE.UIText],
		]),
			(this.BtnBindInfo = [[2, this.nNt]]);
	}
	CCi() {
		for (const e of this.uCi.GetSlotDataList())
			if (e.GetCurrentCount() < e.GetNeedCount()) return !1;
		return !0;
	}
	async OnBeforeStartAsync() {
		(this.cCi = new GenericLayout_1.GenericLayout(
			this.GetHorizontalLayout(5),
			this.MCi,
		)),
			(this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
			this.nVt.SetCloseCallBack(this.ACt),
			(this.mCi = new ItemInteractionPanel_1.ItemInteractionPanel()),
			this.mCi.BindOnItemExtendToggleStateChanged(this.zAt),
			this.mCi.BindOnReduceButtonTrigger(this.vCi),
			await this.mCi.CreateByActorAsync(this.GetItem(1).GetOwner());
	}
	OnStart() {
		(this.uCi = this.OpenParam),
			this.uCi &&
				(this.nVt.SetCloseBtnActive(!0),
				this.nVt.SetHelpBtnActive(!1),
				this.L0t(),
				this.ECi(),
				this.pCi(() => {
					var e = this.uCi.GetSlotDataList()[0];
					e &&
						(this.yCi(e, e.GetNeedCount()),
						(e = e.GetItemRangeList().length <= 1),
						this.nVt.SetTitleIconVisible(e),
						this.nVt.SetTitleTextActive(e),
						e) &&
						((e =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								"SP_IconDeliver",
							)),
						this.nVt.SetTitleIcon(e));
				}));
	}
	OnBeforeDestroy() {
		this.uCi?.Clear(),
			(this.uCi = void 0),
			(this.cCi = void 0),
			(this.mCi = void 0);
	}
	L0t() {
		var e = this.uCi.TitleTextId;
		e &&
			((e = void 0 === e ? "" : PublicUtil_1.PublicUtil.GetConfigTextByKey(e)),
			this.GetText(6)?.SetText(e));
	}
	ECi() {
		var e =
			void 0 === (e = this.uCi.DescriptionTextId)
				? ""
				: PublicUtil_1.PublicUtil.GetConfigTextByKey(e);
		this.GetText(3)?.SetText(e);
	}
	fCi(e, t) {
		var i = this.uCi.GetSlotDataList();
		if (0 < t) {
			if (this.uCi?.IsSlotEnough(e))
				return (
					ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
						"RepeatedDeliveryItem",
					),
					!1
				);
			for (const o of i) {
				var r = o.GetCurrentCount() + t;
				r = MathUtils_1.MathUtils.Clamp(r, 0, o.GetNeedCount());
				if (!o.IsEnough()) {
					if (r <= 0) return o.ClearItem(), !0;
					if (o.SetItem(e, r)) return !0;
				}
			}
		} else
			for (let r = i.length - 1; 0 <= r; r--) {
				var o = i[r],
					n = o.GetCurrentCount() + t;
				n = MathUtils_1.MathUtils.Clamp(n, 0, o.GetNeedCount());
				if (o.HasItem()) {
					if (n <= 0) return o.ClearItem(), !0;
					if (o.SetItem(e, n)) return !0;
				}
			}
		return !1;
	}
	pCi(e) {
		var t = this.uCi.GetSlotDataList();
		this.cCi?.RefreshByData(t, e);
	}
	yCi(e, t) {
		var i = [];
		if ((e = e.GetItemRangeList()).length <= 1) this.mCi.SetActive(!1);
		else {
			for (const o of e) {
				var r = { ItemConfigId: o, CurrentCount: 0, NeedCount: t };
				i.push(r);
			}
			this.mCi.Refresh({ ItemInfoList: i }).then(
				() => {
					var e,
						t,
						i = this.mCi.GetItemDataMainTypeMap(),
						r = this.uCi.GetSlotDataList()[0].GetNeedCount(),
						o = this.mCi.GetMainTypeIdList()[0];
					for ([e, t] of i)
						for (const i of t)
							if (i.GetItemCount() >= r && e !== o) {
								this.mCi?.SetMainTypeRedDotVisible(e, !0);
								break;
							}
				},
				() => {},
			),
				this.mCi.SetActive(!0);
		}
	}
}
exports.ItemDeliverView = ItemDeliverView;
