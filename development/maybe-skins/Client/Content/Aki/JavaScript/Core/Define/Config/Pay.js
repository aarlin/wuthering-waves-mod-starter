"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Pay = void 0);
class Pay {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PayId() {
		return this.payid();
	}
	get Region() {
		return this.region();
	}
	get Amount() {
		return this.amount();
	}
	get GlobalAmount() {
		return this.globalamount();
	}
	get ProductId() {
		return this.productid();
	}
	get CurrencyType() {
		return this.currencytype();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsPay(t, r) {
		return (r || new Pay()).__init(t.readInt32(t.position()) + t.position(), t);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	payid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	region(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	amount() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	globalamount() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	productid(t) {
		var r = this.J7.__offset(this.z7, 14);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	currencytype(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.Pay = Pay;
//# sourceMappingURL=Pay.js.map
