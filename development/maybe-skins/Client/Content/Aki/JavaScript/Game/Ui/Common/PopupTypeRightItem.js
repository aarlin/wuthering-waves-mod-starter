"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PopupTypeRightItem = void 0);
const UE = require("ue"),
	CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase");
class PopupTypeRightItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
	constructor() {
		super();
	}
	GetAttachParent() {
		return this.GetItem(1);
	}
	GetCostParent() {}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[1, UE.UIItem],
			[0, UE.UIButtonComponent],
		]),
			(this.BtnBindInfo = [[0, this.OnClickCloseBtn]]);
	}
	OnSetBackBtnShowState(e) {
		this.GetButton(0).RootUIComp.SetUIActive(e);
	}
	OnSetCloseBtnInteractive(e) {}
	OnSetHelpButtonActive(e) {}
	OnSetTitleByTextIdAndArg(e) {}
	OnRefreshCost(e) {}
}
exports.PopupTypeRightItem = PopupTypeRightItem;
