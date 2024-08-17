"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AreaTaskExplore = void 0);
class AreaTaskExplore {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Area() {
		return this.area();
	}
	get SortIndex() {
		return this.sortindex();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsAreaTaskExplore(t, r) {
		return (r || new AreaTaskExplore()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	area() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sortindex() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.AreaTaskExplore = AreaTaskExplore;
//# sourceMappingURL=AreaTaskExplore.js.map
