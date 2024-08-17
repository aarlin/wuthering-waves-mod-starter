"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Filter = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class Filter {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DataType() {
		return this.datatype();
	}
	get RuleList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rulelistLength(), (t) =>
			this.rulelist(t),
		);
	}
	get IsSupportSelectAll() {
		return this.issupportselectall();
	}
	get IsShowIcon() {
		return this.isshowicon();
	}
	get GridType() {
		return this.gridtype();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsFilter(t, s) {
		return (s || new Filter()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	datatype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRulelistAt(t) {
		return this.rulelist(t);
	}
	rulelist(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	rulelistLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rulelistArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	issupportselectall() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	isshowicon() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	gridtype(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map
