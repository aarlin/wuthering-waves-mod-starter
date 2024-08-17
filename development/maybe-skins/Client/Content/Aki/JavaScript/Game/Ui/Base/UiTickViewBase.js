"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTickViewBase = void 0);
const UiManager_1 = require("../UiManager"),
	UiViewBase_1 = require("./UiViewBase");
class UiTickViewBase extends UiViewBase_1.UiViewBase {
	OnBeforeShowImplementImplement() {
		UiManager_1.UiManager.AddTickView(this);
	}
	OnAfterHideImplementImplement() {
		UiManager_1.UiManager.RemoveTickView(this);
	}
	Tick(e) {
		this.OnTick(e);
	}
	AfterTick(e) {
		this.OnAfterTick(e);
	}
	OnTick(e) {}
	OnAfterTick(e) {}
}
exports.UiTickViewBase = UiTickViewBase;
