"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterPerch = void 0);
class MonsterPerch {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PerchDes() {
		return this.perchdes();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsMonsterPerch(t, s) {
		return (s || new MonsterPerch()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	perchdes(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.MonsterPerch = MonsterPerch;
//# sourceMappingURL=MonsterPerch.js.map
