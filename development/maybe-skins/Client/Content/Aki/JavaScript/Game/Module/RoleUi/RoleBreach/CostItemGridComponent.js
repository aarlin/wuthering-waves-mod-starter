"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CostItemGridComponent = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
	CostMediumItemGrid_1 = require("./CostMediumItemGrid"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class CostItemGridComponent extends UiPanelBase_1.UiPanelBase {
	constructor(t, e, i, o = void 0) {
		super(),
			(this.Blo = e),
			(this.blo = i),
			(this.BelongView = o),
			(this.ScrollView = void 0),
			(this.uft = void 0),
			(this.qlo = 0),
			(this.Glo = 0),
			(this.i3e = void 0),
			(this.Nlo = !1),
			(this.sGe = (t, e, i) => {
				var o = new CostMediumItemGrid_1.CostMediumItemGrid();
				return (
					o.Initialize(e.GetOwner()),
					o.Refresh(t, !1, i),
					o.BindOnCanExecuteChange(() => !1),
					o.BindOnExtendToggleRelease(this.OCt),
					{ Key: i, Value: o }
				);
			}),
			(this.OCt = (t) => {
				(t = t.Data),
					ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
						t.ItemId,
					);
			}),
			this.CreateThenShowByActor(t.GetOwner());
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[7, UE.UITexture],
			[8, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIScrollViewWithScrollbarComponent],
			[3, UE.UIButtonComponent],
			[9, UE.UIText],
			[11, UE.UIItem],
			[12, UE.UIItem],
			[13, UE.UIItem],
			[15, UE.UIText],
			[16, UE.UIText],
			[17, UE.UIButtonComponent],
		]),
			void 0 !== this.blo && this.BtnBindInfo.push([17, this.blo]);
	}
	OnStart() {
		(this.i3e = new ButtonItem_1.ButtonItem(this.GetItem(11))),
			this.i3e.SetFunction(this.Blo);
		var t = this.GetScrollViewWithScrollbar(5);
		(this.ScrollView = new GenericScrollView_1.GenericScrollView(t, this.sGe)),
			this.GetButton(17)?.RootUIComp?.SetUIActive(void 0 !== this.blo);
	}
	Update(t, e, i) {
		this.UpdateByDataList(t), this.UpdateMoney(e, i);
	}
	UpdateByDataList(t) {
		(this.uft = t), this.ScrollView.RefreshByData(this.uft);
	}
	UpdateMoney(t, e) {
		(this.qlo = t),
			(this.Glo = e),
			this.SetItemIcon(this.GetTexture(7), this.qlo),
			(t = this.GetText(8)).SetText(this.Glo.toString()),
			(e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
				this.qlo,
			)),
			(this.Nlo = e >= this.Glo),
			(t.useChangeColor = !this.Nlo);
	}
	GetIsMoneyEnough() {
		return this.Nlo;
	}
	GetDataList() {
		return this.uft;
	}
	SetMaxItemActive(t) {
		this.GetItem(12).SetUIActive(t);
	}
	SetLockItemActive(t) {
		this.GetItem(13).SetUIActive(t);
	}
	SetButtonItemActive(t) {
		this.i3e.SetActive(t);
	}
	SetLockLocalText(t, ...e) {
		LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), t, e);
	}
	SetButtonItemLocalText(t) {
		this.i3e.SetLocalText(t);
	}
}
exports.CostItemGridComponent = CostItemGridComponent;
