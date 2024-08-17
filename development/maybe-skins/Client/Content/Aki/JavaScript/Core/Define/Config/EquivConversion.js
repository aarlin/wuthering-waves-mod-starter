"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EquivConversion = void 0);
class EquivConversion {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DamageRatio() {
		return this.damageratio();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsEquivConversion(t, i) {
		return (i || new EquivConversion()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	damageratio() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.EquivConversion = EquivConversion;
//# sourceMappingURL=EquivConversion.js.map
