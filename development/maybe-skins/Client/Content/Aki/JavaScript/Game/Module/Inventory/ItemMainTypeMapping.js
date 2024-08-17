"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ItemMainTypeMapping = void 0);
class ItemMainTypeMapping {
	constructor(e) {
		(this.yci = new Set()), (this.MainType = e);
	}
	Add(e) {
		this.yci.add(e);
	}
	Remove(e) {
		this.yci.delete(e);
	}
	GetSet() {
		return this.yci;
	}
	HasRedDot() {
		for (const e of this.yci) if (e.HasRedDot()) return !0;
		return !1;
	}
}
exports.ItemMainTypeMapping = ItemMainTypeMapping;
