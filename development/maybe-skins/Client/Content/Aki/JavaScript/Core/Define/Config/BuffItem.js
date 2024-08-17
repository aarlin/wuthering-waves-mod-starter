"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BuffItem = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BuffItem {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PublicCdGroup() {
		return this.publiccdgroup();
	}
	get Buffs() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffsLength(), (t) =>
			this.buffs(t),
		);
	}
	get Cd() {
		return this.cd();
	}
	get Share() {
		return this.share();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBuffItem(t, s) {
		return (s || new BuffItem()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	publiccdgroup() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBuffsAt(t) {
		return this.buffs(t);
	}
	buffs(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
			: BigInt(0);
	}
	buffsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	cd() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	share() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.BuffItem = BuffItem;
//# sourceMappingURL=BuffItem.js.map
