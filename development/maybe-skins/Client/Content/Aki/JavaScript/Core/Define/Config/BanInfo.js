"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BanInfo = void 0);
class BanInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BanType() {
		return this.bantype();
	}
	get BanReason() {
		return this.banreason();
	}
	get BanDescribe() {
		return this.bandescribe();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBanInfo(t, s) {
		return (s || new BanInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	bantype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	banreason() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	bandescribe(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.BanInfo = BanInfo;
//# sourceMappingURL=BanInfo.js.map
