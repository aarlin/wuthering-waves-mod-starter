"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SortRule = void 0);
class SortRule {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DataId() {
		return this.dataid();
	}
	get Name() {
		return this.name();
	}
	get Icon() {
		return this.icon();
	}
	get AttributeId() {
		return this.attributeid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSortRule(t, i) {
		return (i || new SortRule()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	dataid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	attributeid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SortRule = SortRule;
//# sourceMappingURL=SortRule.js.map
