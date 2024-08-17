"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ElementIconTag = void 0);
class ElementIconTag {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ConfigParam() {
		return this.configparam();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsElementIconTag(t, e) {
		return (e || new ElementIconTag()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var e = this.J7.__offset(this.z7, 4);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	configparam(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.ElementIconTag = ElementIconTag;
//# sourceMappingURL=ElementIconTag.js.map
