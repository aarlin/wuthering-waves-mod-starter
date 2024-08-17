"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RougePopularEntrie = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RougePopularEntrie {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Category() {
		return this.category();
	}
	get Rate() {
		return this.rate();
	}
	get Insts() {
		return GameUtils_1.GameUtils.ConvertToArray(this.instsLength(), (t) =>
			this.insts(t),
		);
	}
	get Icon() {
		return this.icon();
	}
	get Title() {
		return this.title();
	}
	get Describe() {
		return this.describe();
	}
	get DescriptionParam() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.descriptionparamLength(),
			(t) => this.descriptionparam(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsRougePopularEntrie(t, s) {
		return (s || new RougePopularEntrie()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	category() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rate() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetInstsAt(t) {
		return this.insts(t);
	}
	insts(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	instsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	instsArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	icon(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	title(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	describe(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetDescriptionparamAt(t) {
		return this.descriptionparam(t);
	}
	descriptionparam(t, s) {
		var i = this.J7.__offset(this.z7, 18);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	descriptionparamLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.RougePopularEntrie = RougePopularEntrie;
//# sourceMappingURL=RougePopularEntrie.js.map
