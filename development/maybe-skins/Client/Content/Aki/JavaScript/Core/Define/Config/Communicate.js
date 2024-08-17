"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Communicate = void 0);
class Communicate {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DescText() {
		return this.desctext();
	}
	get Talker() {
		return this.talker();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsCommunicate(t, s) {
		return (s || new Communicate()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	desctext(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	talker() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.Communicate = Communicate;
//# sourceMappingURL=Communicate.js.map
