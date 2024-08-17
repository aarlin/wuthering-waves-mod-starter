"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerBuff = void 0);
class TowerBuff {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Desc() {
		return this.desc();
	}
	get Icon() {
		return this.icon();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsTowerBuff(t, s) {
		return (s || new TowerBuff()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	desc(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	icon(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.TowerBuff = TowerBuff;
//# sourceMappingURL=TowerBuff.js.map
