"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomCustomizeItem = void 0);
class PhantomCustomizeItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get PhantomId() {
		return this.phantomid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPhantomCustomizeItem(t, s) {
		return (s || new PhantomCustomizeItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	phantomid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomCustomizeItem = PhantomCustomizeItem;
//# sourceMappingURL=PhantomCustomizeItem.js.map
