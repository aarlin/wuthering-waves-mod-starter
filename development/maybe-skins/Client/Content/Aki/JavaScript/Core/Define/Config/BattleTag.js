"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleTag = void 0);
class BattleTag {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Desc() {
		return this.desc();
	}
	get AddTag() {
		return this.addtag();
	}
	get FinishTag() {
		return this.finishtag();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBattleTag(t, s) {
		return (s || new BattleTag()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	desc(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	addtag(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	finishtag(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.BattleTag = BattleTag;
//# sourceMappingURL=BattleTag.js.map
