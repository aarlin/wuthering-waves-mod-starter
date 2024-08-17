"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiViewPending = void 0);
class UiViewPending {
	constructor(e, i) {
		(this.PendingType = 1), (this.View = e), (this.PendingType = i);
	}
	Equal(e) {
		return (
			this.View.Info.Name === e.View.Info.Name &&
			this.PendingType === e.PendingType
		);
	}
	IsPairWith(e) {
		return (
			this.View.Info.Name === e.View.Info.Name &&
			1 === this.PendingType &&
			(2 === e.PendingType || 3 === e.PendingType)
		);
	}
}
exports.UiViewPending = UiViewPending;
