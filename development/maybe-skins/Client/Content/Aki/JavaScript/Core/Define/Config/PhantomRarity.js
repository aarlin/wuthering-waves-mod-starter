"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomRarity = void 0);
class PhantomRarity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Rare() {
		return this.rare();
	}
	get Cost() {
		return this.cost();
	}
	get Desc() {
		return this.desc();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPhantomRarity(t, s) {
		return (s || new PhantomRarity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	rare() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	cost() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	desc(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.PhantomRarity = PhantomRarity;
//# sourceMappingURL=PhantomRarity.js.map
