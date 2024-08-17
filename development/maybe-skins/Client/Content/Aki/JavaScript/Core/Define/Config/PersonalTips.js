"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalTips = void 0);
class PersonalTips {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FunctionId() {
		return this.functionid();
	}
	get Sort() {
		return this.sort();
	}
	get RedDotName() {
		return this.reddotname();
	}
	get Description() {
		return this.description();
	}
	get IconPath() {
		return this.iconpath();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPersonalTips(t, s) {
		return (s || new PersonalTips()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	functionid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sort() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	reddotname(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	description(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	iconpath(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.PersonalTips = PersonalTips;
//# sourceMappingURL=PersonalTips.js.map
