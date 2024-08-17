"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleInfluence = void 0);
const IntArray_1 = require("./SubType/IntArray");
class RoleInfluence {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Title() {
		return this.title();
	}
	get BackGround() {
		return this.background();
	}
	get InfluenceId() {
		return this.influenceid();
	}
	get CountryId() {
		return this.countryid();
	}
	get FilterIcon() {
		return this.filtericon();
	}
	get Role() {
		return this.role();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsRoleInfluence(t, r) {
		return (r || new RoleInfluence()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	background(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	influenceid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	countryid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	filtericon(t) {
		var r = this.J7.__offset(this.z7, 14);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	role(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r
			? (t || new IntArray_1.IntArray()).__init(
					this.J7.__indirect(this.z7 + r),
					this.J7,
				)
			: null;
	}
}
exports.RoleInfluence = RoleInfluence;
//# sourceMappingURL=RoleInfluence.js.map
