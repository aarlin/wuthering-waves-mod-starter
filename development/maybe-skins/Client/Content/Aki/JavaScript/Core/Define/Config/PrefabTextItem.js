"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PrefabTextItem = void 0);
class PrefabTextItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ItemId() {
		return this.itemid();
	}
	get PrefabPathHash() {
		return this.prefabpathhash();
	}
	get ItemPath() {
		return this.itempath();
	}
	get Text() {
		return this.text();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsPrefabTextItem(t, e) {
		return (e || new PrefabTextItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
	}
	prefabpathhash() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
	}
	itempath(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	text(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.PrefabTextItem = PrefabTextItem;
//# sourceMappingURL=PrefabTextItem.js.map
