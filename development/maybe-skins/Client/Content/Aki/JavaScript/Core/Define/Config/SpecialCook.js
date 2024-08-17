"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SpecialCook = void 0);
class SpecialCook {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get FormulaId() {
		return this.formulaid();
	}
	get CookProbability() {
		return this.cookprobability();
	}
	get ItemId() {
		return this.itemid();
	}
	get AttributesDescription() {
		return this.attributesdescription();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSpecialCook(t, i) {
		return (i || new SpecialCook()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roleid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	formulaid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	cookprobability() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	itemid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	attributesdescription(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.SpecialCook = SpecialCook;
//# sourceMappingURL=SpecialCook.js.map
