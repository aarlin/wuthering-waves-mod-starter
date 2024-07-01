"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InventoryGiftView = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiBlurLogic_1 = require("../../../Ui/Base/UiBlur/UiBlurLogic"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../Ui/UiManager"),
	NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
	InventoryGiftController_1 = require("../InventoryGiftController"),
	InventoryGiftItem_1 = require("./InventoryGiftItem");
class InventoryGiftView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.v5t = void 0),
			(this.g4e = []),
			(this.zci = []),
			(this.Zci = void 0),
			(this.emi = void 0),
			(this.$Ut = void 0),
			(this.tmi = void 0),
			(this.ts = void 0),
			(this.HGe = void 0),
			(this.WGe = void 0),
			(this.ClickClose = () => {
				UiManager_1.UiManager.CloseView("InventoryGiftView");
			}),
			(this.OnClickConfirm = () => {
				var e = [],
					t = this.zci.length;
				for (let o = 0; o < t; o++) {
					var i = this.zci[o][0];
					e.push(i.ItemId);
				}
				InventoryGiftController_1.InventoryGiftController.SendItemGiftUseRequest(
					this.Zci.ConfigId,
					this.WGe?.GetSelectNumber() ?? 1,
					e,
				);
			}),
			(this.OnClickErrorConfirm = () => {
				var e = this.Zci.GiftPackage.AvailableNum;
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"SelectGiftItem",
					e,
				);
			}),
			(this.KGe = (e) => {
				var t =
					ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
						"ItemUseCount",
					);
				return new LguiUtil_1.TableTextArgNew(t, e);
			}),
			(this.sGe = () => {
				var e = new InventoryGiftItem_1.InventoryGiftItem();
				return (
					e.Initialize(),
					e.SetOnToggleStateChangeFunction(this.OnToggleStateChangeFunction),
					e.SetOnReduceFunction(this.OnReduceFunction),
					e
				);
			}),
			(this.imi = (e) => this.g4e[e]),
			(this.OnToggleStateChangeFunction = (e, t, i, o) => {
				var n = this.Zci.GiftPackage.AvailableNum;
				if (i) {
					if (this.zci.length === n)
						return e.SetToggleState(0, !1), void t.RootUIComp.SetUIActive(!1);
					this.zci.push(o);
				} else (i = this.zci.indexOf(o)), this.zci.splice(i, 1);
				this.RefreshSelectCountInfo();
			}),
			(this.OnReduceFunction = (e) => {
				-1 !== (e = this.zci.indexOf(e)) &&
					(this.zci.splice(e, 1), this.RefreshSelectCountInfo());
			}),
			(this.RefreshSelectCountInfo = () => {
				var e = this.Zci.GiftPackage.AvailableNum,
					t = this.zci.length;
				LguiUtil_1.LguiUtil.SetLocalText(
					this.ts,
					"SelectRewardFromPool",
					e,
					t,
					e,
				),
					(t = t === e);
				this.omi(t);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIButtonComponent],
			[3, UE.UILoopScrollViewComponent],
			[4, UE.UIItem],
			[5, UE.UIText],
			[6, UE.UIButtonComponent],
			[7, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[1, this.OnClickConfirm],
				[2, this.OnClickErrorConfirm],
				[6, this.ClickClose],
			]);
	}
	OnStart() {
		(this.Zci = this.OpenParam),
			(this.g4e = this.Zci.ItemList),
			(this.v5t = new LoopScrollView_1.LoopScrollView(
				this.GetLoopScrollViewComponent(3),
				this.GetItem(4).GetOwner(),
				this.sGe,
			)),
			this.v5t.ReloadProxyData(this.imi, this.g4e.length, !1),
			(this.$Ut = this.GetButton(1)),
			(this.tmi = this.GetButton(2)),
			(this.emi = this.$Ut
				.GetOwner()
				.GetComponentByClass(UE.UIInteractionGroup.StaticClass())),
			(this.ts = this.GetText(5)),
			(this.HGe = this.GetText(0));
		var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
			this.Zci.ConfigId,
		);
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.HGe, e.Name),
			(this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
				this.GetItem(7),
			)),
			(e = {
				MaxNumber:
					ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
						this.Zci.ConfigId,
					),
				GetExchangeTableText: this.KGe,
				ValueChangeFunction: () => {},
			});
		this.WGe.Init(e);
	}
	OnAfterShow() {
		var e, t;
		this.Zci
			? ((e = this.Zci.GiftPackage.AvailableNum),
				(t = this.zci.length),
				this.omi(t === e),
				this.RefreshSelectCountInfo())
			: this.omi(!1);
	}
	OnAfterHide() {
		UiBlurLogic_1.UiBlurLogic.ResumeTopUiRenderAfterBlur();
	}
	OnBeforeDestroy() {
		(this.v5t = void 0),
			(this.g4e = []),
			(this.zci = []),
			(this.Zci = void 0),
			(this.emi = void 0),
			(this.$Ut = void 0),
			(this.tmi = void 0),
			(this.ts = void 0),
			(this.HGe = void 0),
			this.WGe?.Destroy(),
			(this.WGe = void 0);
	}
	omi(e) {
		this.emi.SetInteractable(e), this.tmi.RootUIComp.SetUIActive(!e);
	}
}
exports.InventoryGiftView = InventoryGiftView;
