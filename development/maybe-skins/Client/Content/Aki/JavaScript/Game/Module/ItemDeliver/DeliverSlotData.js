"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DeliverSlotData = void 0);
class DeliverSlotData {
	constructor() {
		(this.sCi = []),
			(this.aCi = new Set()),
			(this.hCi = 0),
			(this.HandInType = "ItemIds"),
			(this.lCi = 0),
			(this.kAt = 0);
	}
	Initialize(t, e, i) {
		(this.sCi = t),
			(this.aCi = new Set(t)),
			(this.hCi = e),
			(this.HandInType = i),
			(this.lCi = 0),
			(this.kAt = 0);
	}
	SetItem(t, e) {
		return !!this.CanSet(t) && ((this.lCi = t), (this.kAt = e), !0);
	}
	ClearItem() {
		(this.lCi = 0), (this.kAt = 0);
	}
	CanSet(t) {
		return !((0 < this.lCi && this.lCi !== t) || !this.aCi.has(t));
	}
	IsEnough() {
		return this.kAt >= this.hCi;
	}
	HasItem() {
		return 0 < this.lCi;
	}
	GetItemRangeSet() {
		return this.aCi;
	}
	GetItemRangeList() {
		return this.sCi;
	}
	GetNeedCount() {
		return this.hCi;
	}
	GetCurrentItemConfigId() {
		return this.lCi;
	}
	GetCurrentCount() {
		return this.kAt;
	}
	SetCurrentCount(t) {
		this.kAt = t;
	}
}
exports.DeliverSlotData = DeliverSlotData;
