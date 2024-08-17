"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BoxType = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BoxType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Mark() {
		return this.mark();
	}
	get StartState() {
		return this.startstate();
	}
	get IdleState() {
		return GameUtils_1.GameUtils.ConvertToArray(this.idlestateLength(), (t) =>
			this.idlestate(t),
		);
	}
	get IdleStartState() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.idlestartstateLength(),
			(t) => this.idlestartstate(t),
		);
	}
	get DeathState() {
		return this.deathstate();
	}
	get OpenTime() {
		return this.opentime();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBoxType(t, s) {
		return (s || new BoxType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mark(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	startstate() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetIdlestateAt(t) {
		return this.idlestate(t);
	}
	idlestate(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	idlestateLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	idlestateArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetIdlestartstateAt(t) {
		return this.idlestartstate(t);
	}
	idlestartstate(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	idlestartstateLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	idlestartstateArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	deathstate() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	opentime() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.BoxType = BoxType;
//# sourceMappingURL=BoxType.js.map
