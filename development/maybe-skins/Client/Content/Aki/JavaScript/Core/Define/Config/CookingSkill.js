"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookingSkill = void 0);
class CookingSkill {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ExtraItemId() {
		return this.extraitemid();
	}
	get EffectiveProbability() {
		return this.effectiveprobability();
	}
	get Typeld() {
		return this.typeld();
	}
	get SkillDescription() {
		return this.skilldescription();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCookingSkill(t, i) {
		return (i || new CookingSkill()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	extraitemid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	effectiveprobability() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	typeld() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skilldescription() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.CookingSkill = CookingSkill;
//# sourceMappingURL=CookingSkill.js.map
