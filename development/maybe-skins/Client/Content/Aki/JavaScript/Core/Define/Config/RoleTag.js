"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleTag = void 0);
class RoleTag {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get SortId() {
		return this.sortid();
	}
	get TagName() {
		return this.tagname();
	}
	get TagIcon() {
		return this.tagicon();
	}
	get TagNameColor() {
		return this.tagnamecolor();
	}
	get TagDesc() {
		return this.tagdesc();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsRoleTag(t, s) {
		return (s || new RoleTag()).__init(
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
	tagname(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	tagicon(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	tagnamecolor(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	tagdesc(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.RoleTag = RoleTag;
//# sourceMappingURL=RoleTag.js.map
