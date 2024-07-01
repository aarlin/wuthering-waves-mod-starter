"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionInstance = void 0);
class FunctionInstance {
	constructor(t, e) {
		(this.ige = t), (this.w9t = e);
	}
	GetFunctionId() {
		return this.w9t;
	}
	GetIsShow() {
		return 0 < (1 & this.ige);
	}
	GetIsOpen() {
		return 0 < (2 & this.ige);
	}
	GetHasManualShowUi() {
		return 0 < (4 & this.ige);
	}
	SetFlag(t) {
		this.ige = t;
	}
}
exports.FunctionInstance = FunctionInstance;
