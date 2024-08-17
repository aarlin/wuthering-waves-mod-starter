"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeyType = void 0);
class KeyType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get TypeId() {
		return this.typeid();
	}
	get Name() {
		return this.name();
	}
	get IconSpritePath() {
		return this.iconspritepath();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsKeyType(t, e) {
		return (e || new KeyType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	typeid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	iconspritepath(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.KeyType = KeyType;
//# sourceMappingURL=KeyType.js.map
