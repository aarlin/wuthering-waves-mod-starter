"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ClueEntrance = void 0);
class ClueEntrance {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ContentGroupId() {
		return this.contentgroupid();
	}
	get Title() {
		return this.title();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsClueEntrance(t, e) {
		return (e || new ClueEntrance()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	contentgroupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.ClueEntrance = ClueEntrance;
//# sourceMappingURL=ClueEntrance.js.map
