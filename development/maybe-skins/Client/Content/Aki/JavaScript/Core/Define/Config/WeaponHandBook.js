"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponHandBook = void 0);
class WeaponHandBook {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Level() {
		return this.level();
	}
	get Breach() {
		return this.breach();
	}
	get Resonance() {
		return this.resonance();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsWeaponHandBook(t, e) {
		return (e || new WeaponHandBook()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	breach() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	resonance() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.WeaponHandBook = WeaponHandBook;
//# sourceMappingURL=WeaponHandBook.js.map
