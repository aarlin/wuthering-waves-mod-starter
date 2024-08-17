"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChipHandBook = void 0);
class ChipHandBook {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get VoiceDescrtption() {
		return this.voicedescrtption();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsChipHandBook(t, i) {
		return (i || new ChipHandBook()).__init(
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
	voicedescrtption(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.ChipHandBook = ChipHandBook;
//# sourceMappingURL=ChipHandBook.js.map
