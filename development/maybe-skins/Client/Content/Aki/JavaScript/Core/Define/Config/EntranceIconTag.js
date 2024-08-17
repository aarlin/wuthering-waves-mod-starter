"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntranceIconTag = void 0);
class EntranceIconTag {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ConfigParam() {
		return this.configparam();
	}
	__init(t, n) {
		return (this.z7 = t), (this.J7 = n), this;
	}
	static getRootAsEntranceIconTag(t, n) {
		return (n || new EntranceIconTag()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var n = this.J7.__offset(this.z7, 4);
		return n ? this.J7.__string(this.z7 + n, t) : null;
	}
	configparam(t) {
		var n = this.J7.__offset(this.z7, 6);
		return n ? this.J7.__string(this.z7 + n, t) : null;
	}
}
exports.EntranceIconTag = EntranceIconTag;
//# sourceMappingURL=EntranceIconTag.js.map
