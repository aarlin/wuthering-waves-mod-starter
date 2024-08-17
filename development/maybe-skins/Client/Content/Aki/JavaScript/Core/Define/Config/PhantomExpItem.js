"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomExpItem = void 0);
class PhantomExpItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get Exp() {
		return this.exp();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPhantomExpItem(t, s) {
		return (s || new PhantomExpItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	exp() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomExpItem = PhantomExpItem;
//# sourceMappingURL=PhantomExpItem.js.map
