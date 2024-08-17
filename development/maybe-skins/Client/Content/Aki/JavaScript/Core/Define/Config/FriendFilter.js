"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FriendFilter = void 0);
class FriendFilter {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Filter() {
		return this.filter();
	}
	get IconPath() {
		return this.iconpath();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsFriendFilter(t, i) {
		return (i || new FriendFilter()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	filter(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconpath(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.FriendFilter = FriendFilter;
//# sourceMappingURL=FriendFilter.js.map
