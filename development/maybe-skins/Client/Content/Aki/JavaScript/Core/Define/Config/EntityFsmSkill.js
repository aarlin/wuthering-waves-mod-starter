"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityFsmSkill = void 0);
class EntityFsmSkill {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ConfigId() {
		return this.configid();
	}
	get SkillName() {
		return this.skillname();
	}
	get SkillId() {
		return this.skillid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsEntityFsmSkill(t, i) {
		return (i || new EntityFsmSkill()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	configid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillname(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	skillid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.EntityFsmSkill = EntityFsmSkill;
//# sourceMappingURL=EntityFsmSkill.js.map
