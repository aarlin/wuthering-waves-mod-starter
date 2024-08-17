"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomWildItem = void 0);
class PhantomWildItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsPhantomWildItem(t, e) {
		return (e || new PhantomWildItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomWildItem = PhantomWildItem;
//# sourceMappingURL=PhantomWildItem.js.map
