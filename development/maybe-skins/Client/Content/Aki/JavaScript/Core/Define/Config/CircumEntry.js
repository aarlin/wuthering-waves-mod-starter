"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CircumEntry = void 0);
class CircumEntry {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get EntryType() {
		return this.entrytype();
	}
	get Title() {
		return this.title();
	}
	get IconPathF() {
		return this.iconpathf();
	}
	get IconPath() {
		return this.iconpath();
	}
	get GachaId() {
		return this.gachaid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCircumEntry(t, i) {
		return (i || new CircumEntry()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entrytype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconpathf(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconpath(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	gachaid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.CircumEntry = CircumEntry;
//# sourceMappingURL=CircumEntry.js.map
