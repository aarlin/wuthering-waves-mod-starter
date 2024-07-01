"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReviveItemView = exports.ReviveItemData = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
	BuffItemControl_1 = require("../../BuffItem/BuffItemControl"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	ReviveSmallItemGrid_1 = require("./ReviveSmallItemGrid");
class ReviveItemData {
	constructor(e, t, i) {
		(this.PlayerId = 0),
			(this.ChoseId = 0),
			(this.ItemIdList = []),
			(this.PlayerId = e),
			(this.ItemIdList = t),
			(this.ChoseId = i);
	}
}
exports.ReviveItemData = ReviveItemData;
class ReviveItemView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.PropScrollView = void 0),
			(this.ItemIdMap = void 0),
			(this.SelectedItemId = -1),
			(this.zke = -1),
			(this.N2t = void 0),
			(this.mIt = () => {
				this.ConfirmBoxButtonClick();
			}),
			(this.JGe = (e, t, i) => {
				var r = new ReviveSmallItemGrid_1.ReviveSmallItemGrid();
				return (
					r.Initialize(t.GetOwner()),
					r.BindOnExtendToggleStateChanged(this.zAt),
					r.Refresh(e[0], e[1]),
					{ Key: i, Value: r }
				);
			}),
			(this.zAt = (e) => {
				(e = e.MediumItemGrid), this.O2t(e);
			}),
			(this.k2t = () => {
				-1 === this.SelectedItemId
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"ReviveItemNotClick",
						)
					: (BuffItemControl_1.BuffItemControl.RequestUseBuffItem(
							this.SelectedItemId,
							1,
							this.zke,
						),
						this.CloseMe());
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UIButtonComponent],
			[2, UE.UIScrollViewWithScrollbarComponent],
		]),
			(this.BtnBindInfo = [[1, this.k2t]]);
	}
	OnStart() {
		this.ChildPopView?.PopItem.OverrideBackBtnCallBack(this.mIt);
		var e = this.OpenParam;
		(this.zke = e.PlayerId),
			(this.SelectedItemId = e.ChoseId),
			(this.ItemIdMap = new Map());
		for (const i of e.ItemIdList) {
			var t =
				ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i);
			0 < t && this.ItemIdMap.set(i, t);
		}
		(this.PropScrollView = new GenericScrollView_1.GenericScrollView(
			this.GetScrollViewWithScrollbar(2),
			this.JGe,
		)),
			this.InitPropItem();
	}
	InitPropItem() {
		var e = this.GetScrollViewWithScrollbar(2),
			t = this.ItemIdMap.size;
		if ((e.RootUIComp.SetUIActive(0 < t), 0 !== t)) {
			const t = [];
			let i = 0;
			this.ItemIdMap.forEach((e, r) => {
				t.push([r, e]), this.SelectedItemId === r && (i = t.length - 1);
			}),
				this.PropScrollView.RefreshByData(t),
				(e = this.PropScrollView.GetScrollItemList()[i]).SetSelected(!0),
				this.O2t(e);
		}
	}
	OnBeforeDestroy() {
		this.ItemIdMap && this.ItemIdMap.clear(),
			(this.SelectedItemId = -1),
			(this.zke = -1),
			this.PropScrollView.ClearChildren();
	}
	ConfirmBoxButtonClick() {
		this.CloseMe();
	}
	O2t(e) {
		e &&
			(this.N2t?.SetSelected(!1),
			(this.N2t = e),
			(this.SelectedItemId = e.ItemId),
			(e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
				this.SelectedItemId,
			)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(0),
				e.AttributesDescription,
			));
	}
}
exports.ReviveItemView = ReviveItemView;
