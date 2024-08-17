"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Flow = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Flow {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DungeonId() {
		return this.dungeonid();
	}
	get States() {
		return GameUtils_1.GameUtils.ConvertToArray(this.statesLength(), (t) =>
			this.states(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsFlow(t, s) {
		return (s || new Flow()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	dungeonid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetStatesAt(t) {
		return this.states(t);
	}
	states(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	statesLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	statesArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.Flow = Flow;
//# sourceMappingURL=Flow.js.map
