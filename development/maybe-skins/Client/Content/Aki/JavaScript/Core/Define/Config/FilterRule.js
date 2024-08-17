"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterRule = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class FilterRule {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FilterType() {
		return this.filtertype();
	}
	get Title() {
		return this.title();
	}
	get IdList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.idlistLength(), (t) =>
			this.idlist(t),
		);
	}
	get NeedChangeColor() {
		return this.needchangecolor();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsFilterRule(t, i) {
		return (i || new FilterRule()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	filtertype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetIdlistAt(t) {
		return this.idlist(t);
	}
	idlist(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	idlistLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	idlistArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	needchangecolor() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.FilterRule = FilterRule;
//# sourceMappingURL=FilterRule.js.map
