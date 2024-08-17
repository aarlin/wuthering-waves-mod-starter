"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeographyType = void 0);
class GeographyType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TypeDescription() {
		return this.typedescription();
	}
	get Icon() {
		return this.icon();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsGeographyType(t, e) {
		return (e || new GeographyType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	typedescription(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.GeographyType = GeographyType;
//# sourceMappingURL=GeographyType.js.map
