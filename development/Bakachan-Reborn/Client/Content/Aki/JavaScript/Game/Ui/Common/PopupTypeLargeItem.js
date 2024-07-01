"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PopupTypeLargeItem = void 0);
const UE = require("ue"),
	CommonPopViewBehaviourBase_1 = require("./CommonPopViewBehaviourBase"),
	PopupCaptionItem_1 = require("./PopupCaptionItem");
class PopupTypeLargeItem extends CommonPopViewBehaviourBase_1.CommonPopViewBase {
	constructor() {
		super(...arguments), (this.nVt = void 0);
	}
	GetAttachParent() {
		return this.GetItem(1);
	}
	GetCostParent() {
		return this.GetItem(2);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.OnClickCloseBtn]]);
	}
	OnStart() {
		(this.nVt = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(3))),
			this.nVt.SetCloseCallBack(() => {
				this.TryHideSelf();
			});
	}
	OnSetHelpButtonActive(e) {
		this.nVt.SetHelpBtnActive(e);
	}
	OnSetTitleByTextIdAndArg(e, ...t) {
		this.nVt.SetTitleByTextIdAndArg(e, t);
	}
	OnSetBackBtnShowState(e) {
		this.nVt.SetCloseBtnActive(e);
	}
	OnSetCloseBtnInteractive(e) {}
	OnRefreshCost(e) {
		e.forEach((e) => {
			e.GetRootItem().SetUIParent(this.GetItem(2));
		});
	}
}
exports.PopupTypeLargeItem = PopupTypeLargeItem;
