"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationView = void 0);
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class UiNavigationView extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments), (this.ViewName = "");
	}
	OnBeforeShowImplement() {
		this.Fq();
	}
	OnAfterShowImplement() {
		this.AfterActive();
	}
	FindDefault() {
		return !0;
	}
	AfterActive() {}
	OnBeforeDestroyImplement() {
		this.RootItem?.IsValid() && this.SetActive(!1);
	}
	Fq() {
		this.ViewName = this.GetRootItem().GetDisplayName();
	}
}
exports.UiNavigationView = UiNavigationView;
