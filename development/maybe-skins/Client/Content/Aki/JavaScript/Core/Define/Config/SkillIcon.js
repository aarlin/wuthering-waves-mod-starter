"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillIcon = void 0);
class SkillIcon {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Tag() {
		return this.tag();
	}
	get IconPath() {
		return this.iconpath();
	}
	get Name() {
		return this.name();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSkillIcon(t, i) {
		return (i || new SkillIcon()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	tag(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconpath(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.SkillIcon = SkillIcon;
//# sourceMappingURL=SkillIcon.js.map
