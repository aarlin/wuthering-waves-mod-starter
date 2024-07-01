"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiBehaviorBaseProxy = void 0);
const ComponentAction_1 = require("./ComponentAction");
class UiBehaviorBaseProxy extends ComponentAction_1.ComponentAction {
	constructor(e) {
		super(), (this.x1r = e);
	}
	async OnCreateAsyncImplement() {
		return await this.x1r.OnUiCreateAsync?.(), !0;
	}
	async OnStartAsyncImplement() {
		return this.x1r.OnAfterUiStart?.(), Promise.resolve();
	}
	async OnShowAsyncImplement() {
		return this.x1r.OnAfterUiShow?.(), Promise.resolve();
	}
	async OnHideAsyncImplement() {
		return this.x1r.OnBeforeUiHide?.(), Promise.resolve();
	}
	async OnDestroyAsyncImplement() {
		return this.x1r.OnBeforeDestroy?.(), (this.x1r = void 0), Promise.resolve();
	}
	OnDestroyImplementCompatible() {
		this.x1r.OnBeforeDestroy?.(), (this.x1r = void 0);
	}
}
exports.UiBehaviorBaseProxy = UiBehaviorBaseProxy;
