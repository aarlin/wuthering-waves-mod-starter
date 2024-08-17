"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PayShopSwitchItem = void 0);
const UE = require("ue"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	RedDotController_1 = require("../../../../RedDot/RedDotController"),
	CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase"),
	UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class PayShopSwitchItem extends CommonTabItemBase_1.CommonTabItemBase {
	constructor() {
		super(...arguments),
			(this.QFe = void 0),
			(this.bD = 0),
			(this.X9e = (e) => {
				1 === e && this.SelectedCallBack(this.GridIndex);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, UE.UIExtendToggle],
			[0, UE.UIText],
			[2, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.X9e]]);
	}
	Refresh(e, t, o) {
		(this.CurrentData = e),
			this.OnRefresh(e, t, o),
			this.GetTabToggle().RootUIComp.SetUIActive(!1),
			this.GetTabToggle().RootUIComp.SetUIActive(!0);
	}
	OnStart() {
		super.OnStart(), this.GetExtendToggle(1).SetToggleState(0);
	}
	OnBeforeHide() {
		this.UnBindRedDot();
	}
	RegisterViewModule(e) {
		e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
	}
	OnSetToggleState(e, t) {
		this.GetExtendToggle(1).SetToggleStateForce(e, t);
	}
	OnRefresh(e, t, o) {
		e.Data && this.UpdateTabIcon(e.Data.GetIcon());
	}
	OnUpdateTabIcon(e) {}
	GetTabToggle() {
		return this.GetExtendToggle(1);
	}
	UpdateView(e, t) {
		(e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTabConfig(e, t)),
			this.GetText(0).ShowTextNew(e.Name),
			this.RootItem.SetUIActive(e.Enable);
	}
	BindRedDot(e, t = 0) {
		this.UnBindRedDot();
		var o = this.GetItem(2);
		(this.QFe = e),
			(this.bD = t),
			RedDotController_1.RedDotController.BindRedDot(e, o, void 0, t);
	}
	UnBindRedDot() {
		this.QFe &&
			(RedDotController_1.RedDotController.UnBindGivenUi(
				this.QFe,
				this.GetItem(2),
				this.bD,
			),
			(this.QFe = void 0),
			(this.bD = 0));
	}
}
exports.PayShopSwitchItem = PayShopSwitchItem;
