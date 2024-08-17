"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillButtonEffect = void 0);
class SkillButtonEffect {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get NiagaraPath() {
		return this.niagarapath();
	}
	get ElementId() {
		return this.elementid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSkillButtonEffect(t, i) {
		return (i || new SkillButtonEffect()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	niagarapath(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	elementid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SkillButtonEffect = SkillButtonEffect;
//# sourceMappingURL=SkillButtonEffect.js.map
