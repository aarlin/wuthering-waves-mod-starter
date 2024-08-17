"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleDevelopType = void 0);
class RoleDevelopType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Icon() {
		return this.icon();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsRoleDevelopType(t, e) {
		return (e || new RoleDevelopType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icon(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.RoleDevelopType = RoleDevelopType;
//# sourceMappingURL=RoleDevelopType.js.map
