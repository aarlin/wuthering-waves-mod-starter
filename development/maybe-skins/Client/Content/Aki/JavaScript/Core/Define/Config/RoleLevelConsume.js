"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleLevelConsume = void 0);
class RoleLevelConsume {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ConsumeGroupId() {
		return this.consumegroupid();
	}
	get Level() {
		return this.level();
	}
	get ExpCount() {
		return this.expcount();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsRoleLevelConsume(t, e) {
		return (e || new RoleLevelConsume()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	consumegroupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	expcount() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.RoleLevelConsume = RoleLevelConsume;
//# sourceMappingURL=RoleLevelConsume.js.map
