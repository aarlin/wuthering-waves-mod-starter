"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomMainProperty = void 0);
class PhantomMainProperty {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsPhantomMainProperty(t, r) {
		return (r || new PhantomMainProperty()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomMainProperty = PhantomMainProperty;
//# sourceMappingURL=PhantomMainProperty.js.map
