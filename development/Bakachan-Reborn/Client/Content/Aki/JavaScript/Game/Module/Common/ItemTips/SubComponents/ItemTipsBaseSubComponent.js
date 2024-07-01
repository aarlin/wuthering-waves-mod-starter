"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TipsBaseSubComponent = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TipsBaseSubComponent extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(), (this.OperationMap = new Map());
	}
	OnBeforeShowImplement() {
		for (const e of this.OperationMap.values()) e();
		this.OperationMap.clear();
	}
	OnBeforeDestroy() {
		this.OperationMap.clear();
	}
	Refresh(e) {}
	SetVisible(e) {
		var s = () => {
			this.SetActive(e);
		};
		this.InAsyncLoading() ? this.OperationMap.set("SetVisible", s) : s();
	}
	SetLockButtonShow(e) {}
	SetPanelNumVisible(e) {}
}
exports.TipsBaseSubComponent = TipsBaseSubComponent;
