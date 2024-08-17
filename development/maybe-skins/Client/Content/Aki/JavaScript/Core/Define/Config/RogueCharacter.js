"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueCharacter = void 0);
class RogueCharacter {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get Quality() {
		return this.quality();
	}
	get RoleIcon() {
		return this.roleicon();
	}
	get RoleName() {
		return this.rolename();
	}
	get RoleBigIcon() {
		return this.rolebigicon();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsRogueCharacter(t, r) {
		return (r || new RogueCharacter()).__init(
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
	quality() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	roleicon(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	rolename(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	rolebigicon(t) {
		var r = this.J7.__offset(this.z7, 14);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.RogueCharacter = RogueCharacter;
//# sourceMappingURL=RogueCharacter.js.map
