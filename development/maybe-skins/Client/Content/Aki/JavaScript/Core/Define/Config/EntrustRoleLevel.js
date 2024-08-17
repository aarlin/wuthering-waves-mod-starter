"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntrustRoleLevel = void 0);
class EntrustRoleLevel {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get NeedLike() {
		return this.needlike();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsEntrustRoleLevel(t, e) {
		return (e || new EntrustRoleLevel()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roleid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	needlike() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.EntrustRoleLevel = EntrustRoleLevel;
//# sourceMappingURL=EntrustRoleLevel.js.map
