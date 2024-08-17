"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Mapping = void 0);
class Mapping {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ExcelName() {
		return this.excelname();
	}
	get SheetName() {
		return this.sheetname();
	}
	get FieldName() {
		return this.fieldname();
	}
	get Value() {
		return this.value();
	}
	get Comment() {
		return this.comment();
	}
	get Icon() {
		return this.icon();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMapping(t, i) {
		return (i || new Mapping()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	excelname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	sheetname(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	fieldname(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	value() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	comment(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.Mapping = Mapping;
//# sourceMappingURL=Mapping.js.map
