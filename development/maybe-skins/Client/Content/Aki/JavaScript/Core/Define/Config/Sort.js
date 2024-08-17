"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Sort = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Sort {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FrontSortList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.frontsortlistLength(),
			(t) => this.frontsortlist(t),
		);
	}
	get BaseSortList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.basesortlistLength(),
			(t) => this.basesortlist(t),
		);
	}
	get AttributeSortList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.attributesortlistLength(),
			(t) => this.attributesortlist(t),
		);
	}
	get LastSortList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.lastsortlistLength(),
			(t) => this.lastsortlist(t),
		);
	}
	get LimitNum() {
		return this.limitnum();
	}
	get DataId() {
		return this.dataid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsSort(t, s) {
		return (s || new Sort()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetFrontsortlistAt(t) {
		return this.frontsortlist(t);
	}
	frontsortlist(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	frontsortlistLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	frontsortlistArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetBasesortlistAt(t) {
		return this.basesortlist(t);
	}
	basesortlist(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	basesortlistLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	basesortlistArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetAttributesortlistAt(t) {
		return this.attributesortlist(t);
	}
	attributesortlist(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	attributesortlistLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	attributesortlistArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetLastsortlistAt(t) {
		return this.lastsortlist(t);
	}
	lastsortlist(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	lastsortlistLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	lastsortlistArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	limitnum() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	dataid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.Sort = Sort;
//# sourceMappingURL=Sort.js.map
