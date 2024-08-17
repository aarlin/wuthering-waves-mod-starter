"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterRarity = void 0);
class MonsterRarity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RarityDesc() {
		return this.raritydesc();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsMonsterRarity(t, s) {
		return (s || new MonsterRarity()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	raritydesc(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.MonsterRarity = MonsterRarity;
//# sourceMappingURL=MonsterRarity.js.map
