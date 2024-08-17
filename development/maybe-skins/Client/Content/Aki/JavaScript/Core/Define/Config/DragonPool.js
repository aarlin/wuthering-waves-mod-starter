"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DragonPool = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DragonPool {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get CoreId() {
		return this.coreid();
	}
	get Goal() {
		return GameUtils_1.GameUtils.ConvertToArray(this.goalLength(), (t) =>
			this.goal(t),
		);
	}
	get DropIds() {
		return GameUtils_1.GameUtils.ConvertToArray(this.dropidsLength(), (t) =>
			this.dropids(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsDragonPool(t, s) {
		return (s || new DragonPool()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	coreid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetGoalAt(t) {
		return this.goal(t);
	}
	goal(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	goalLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	goalArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetDropidsAt(t) {
		return this.dropids(t);
	}
	dropids(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	dropidsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	dropidsArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.DragonPool = DragonPool;
//# sourceMappingURL=DragonPool.js.map
