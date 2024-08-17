"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonsterSizeId = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterSizeId {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MonsterSizeTag() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.monstersizetagLength(),
			(t) => this.monstersizetag(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsMonsterSizeId(t, s) {
		return (s || new MonsterSizeId()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetMonstersizetagAt(t) {
		return this.monstersizetag(t);
	}
	monstersizetag(t, s) {
		var e = this.J7.__offset(this.z7, 6);
		return e
			? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, s)
			: null;
	}
	monstersizetagLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.MonsterSizeId = MonsterSizeId;
//# sourceMappingURL=MonsterSizeId.js.map
