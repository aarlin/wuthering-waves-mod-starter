"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GmAccount = void 0);
class GmAccount {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GmName() {
		return this.gmname();
	}
	get FirstName() {
		return this.firstname();
	}
	get GmOrderListId() {
		return this.gmorderlistid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsGmAccount(t, s) {
		return (s || new GmAccount()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	gmname(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	firstname(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	gmorderlistid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.GmAccount = GmAccount;
//# sourceMappingURL=GmAccount.js.map
