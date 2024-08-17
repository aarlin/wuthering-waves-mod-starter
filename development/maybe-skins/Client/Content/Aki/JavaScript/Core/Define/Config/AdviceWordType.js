"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceWordType = void 0);
class AdviceWordType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsAdviceWordType(t, e) {
		return (e || new AdviceWordType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.AdviceWordType = AdviceWordType;
//# sourceMappingURL=AdviceWordType.js.map
