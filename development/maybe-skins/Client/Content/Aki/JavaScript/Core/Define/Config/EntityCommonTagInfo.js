"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityCommonTagInfo = void 0);
class EntityCommonTagInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TagName() {
		return this.tagname();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsEntityCommonTagInfo(t, s) {
		return (s || new EntityCommonTagInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	tagname(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.EntityCommonTagInfo = EntityCommonTagInfo;
//# sourceMappingURL=EntityCommonTagInfo.js.map
