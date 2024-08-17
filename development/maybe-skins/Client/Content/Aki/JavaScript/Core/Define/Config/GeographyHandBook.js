"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeographyHandBook = void 0);
class GeographyHandBook {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get Name() {
		return this.name();
	}
	get Texture() {
		return this.texture();
	}
	get TypeDescrtption() {
		return this.typedescrtption();
	}
	get Descrtption() {
		return this.descrtption();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsGeographyHandBook(t, r) {
		return (r || new GeographyHandBook()).__init(
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
	name(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	texture(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	typedescrtption(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	descrtption(t) {
		var r = this.J7.__offset(this.z7, 14);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.GeographyHandBook = GeographyHandBook;
//# sourceMappingURL=GeographyHandBook.js.map
