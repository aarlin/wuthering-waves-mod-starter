"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GaChaShare = void 0);
class GaChaShare {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get Desc() {
		return this.desc();
	}
	get SharePic() {
		return this.sharepic();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsGaChaShare(t, s) {
		return (s || new GaChaShare()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	desc(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	sharepic(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.GaChaShare = GaChaShare;
//# sourceMappingURL=GaChaShare.js.map
