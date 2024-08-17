"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FilterSortGroup = void 0);
class FilterSortGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get SortId() {
		return this.sortid();
	}
	get FilterId() {
		return this.filterid();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsFilterSortGroup(t, r) {
		return (r || new FilterSortGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sortid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	filterid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.FilterSortGroup = FilterSortGroup;
//# sourceMappingURL=FilterSortGroup.js.map
