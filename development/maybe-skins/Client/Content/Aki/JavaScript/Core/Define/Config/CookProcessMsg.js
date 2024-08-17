"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CookProcessMsg = void 0);
class CookProcessMsg {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Description() {
		return this.description();
	}
	get Introduce() {
		return this.introduce();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsCookProcessMsg(t, s) {
		return (s || new CookProcessMsg()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	description(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	introduce(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.CookProcessMsg = CookProcessMsg;
//# sourceMappingURL=CookProcessMsg.js.map
