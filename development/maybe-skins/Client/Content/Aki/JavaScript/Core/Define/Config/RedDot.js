"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RedDot = void 0);
class RedDot {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Name() {
		return this.name();
	}
	get RelativeName() {
		return this.relativename();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsRedDot(t, e) {
		return (e || new RedDot()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 4);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	relativename(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.RedDot = RedDot;
//# sourceMappingURL=RedDot.js.map
