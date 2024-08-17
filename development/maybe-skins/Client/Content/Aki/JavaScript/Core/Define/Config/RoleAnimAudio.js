"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleAnimAudio = void 0);
class RoleAnimAudio {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get ActionName() {
		return this.actionname();
	}
	get AudioPath() {
		return this.audiopath();
	}
	get CanInterrupt() {
		return this.caninterrupt();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRoleAnimAudio(t, i) {
		return (i || new RoleAnimAudio()).__init(
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
	actionname(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	audiopath(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	caninterrupt() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.RoleAnimAudio = RoleAnimAudio;
//# sourceMappingURL=RoleAnimAudio.js.map
