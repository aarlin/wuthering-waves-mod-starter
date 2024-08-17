"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackScreenViewData = void 0);
class BlackScreenViewData {
	constructor() {
		(this.ac = 0), (this.Mgt = new Map());
	}
	Sgt(t) {
		this.Mgt.get(t)?.();
	}
	RegisterStateDelegate(t, e) {
		this.Mgt.set(t, e);
	}
	TriggerCurrentStateDelegate() {
		this.Sgt(this.ac);
	}
	SwitchState(t) {
		return this.ac !== t && ((this.ac = t), this.Sgt(t), !0);
	}
}
exports.BlackScreenViewData = BlackScreenViewData;
