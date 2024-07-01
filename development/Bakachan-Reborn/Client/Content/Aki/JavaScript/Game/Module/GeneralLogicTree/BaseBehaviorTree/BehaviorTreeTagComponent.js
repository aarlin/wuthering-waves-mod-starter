"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BehaviorTreeTagContainer = void 0);
class BehaviorTreeTagContainer {
	constructor() {
		(this.mKt = void 0), (this.mKt = new Map());
	}
	AddTag(e) {
		this.mKt.set(e, !0);
	}
	RemoveTag(e) {
		this.mKt.delete(e);
	}
	ContainTag(e) {
		return this.mKt.get(e) ?? !1;
	}
}
exports.BehaviorTreeTagContainer = BehaviorTreeTagContainer;
