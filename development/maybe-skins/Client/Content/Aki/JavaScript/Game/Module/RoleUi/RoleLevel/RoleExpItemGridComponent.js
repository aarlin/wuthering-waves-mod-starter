"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleExpItemGridComponent = void 0);
const UE = require("ue"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	ButtonItem_1 = require("../../Common/Button/ButtonItem"),
	GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
	RoleLevelUpCostMediumItemGrid_1 = require("./RoleLevelUpCostMediumItemGrid");
class RoleExpItemGridComponent extends UiPanelBase_1.UiPanelBase {
	constructor(t, e, i, o, s, n, r = void 0) {
		super(),
			(this.Blo = t),
			(this.U_o = e),
			(this.A_o = i),
			(this.P_o = o),
			(this.x_o = s),
			(this.w_o = n),
			(this.BelongView = r),
			(this.ScrollView = void 0),
			(this.uft = void 0),
			(this.qlo = 0),
			(this.Glo = 0),
			(this.i3e = void 0),
			(this.B_o = 0),
			(this.Nlo = !1),
			(this.sGe = () => {
				var t =
					new RoleLevelUpCostMediumItemGrid_1.RoleLevelUpCostMediumItemGrid();
				return (
					t.BindLongPress(1, this.OCt),
					t.BindOnCanExecuteChange(() => !1),
					t.BindReduceLongPress(this.b_o),
					t
				);
			}),
			(this.OCt = (t, e, i) => {
				(i = i.ItemId), (t || this.x_o(i)) && this.A_o(i);
			}),
			(this.b_o = (t, e, i) => {
				(i = i.ItemId), this.w_o(i) && this.P_o(i);
			});
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
			[15, UE.UIText],
		]),
			(this.BtnBindInfo = [[3, this.U_o]]);
	}
	OnStart() {
		(this.i3e = new ButtonItem_1.ButtonItem(this.GetItem(11))),
			this.i3e.SetFunction(this.Blo);
		var t = this.GetScrollViewWithScrollbar(5);
		this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(
			t,
			this.sGe,
		);
	}
	Update(t, e, i) {
		this.UpdateByDataList(t), this.UpdateMoney(e, i);
	}
	UpdateByDataList(t) {
		(this.uft = t),
			this.ScrollView.RefreshByData(this.uft),
			this.UpdateAutoButtonState();
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
	UpdateAutoButtonState() {
		for (const t of this.uft)
			if (0 < t.SelectedCount) return void (this.B_o = 1);
		this.B_o = 0;
	}
	GetAutoButtonState() {
		return this.B_o;
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
	SetMaxText(t) {}
	SetLockText(t) {}
	SetButtonItemText(t) {
		this.i3e.SetLocalText(t);
	}
	SetAutoButtonText(t) {
		this.GetText(15).ShowTextNew(t);
	}
	GetGenericScrollView() {
		return this.ScrollView;
	}
}
exports.RoleExpItemGridComponent = RoleExpItemGridComponent;
