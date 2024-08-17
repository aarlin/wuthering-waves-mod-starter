"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomFetterHandBook = void 0);
class PhantomFetterHandBook {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsPhantomFetterHandBook(t, e) {
		return (e || new PhantomFetterHandBook()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomFetterHandBook = PhantomFetterHandBook;
//# sourceMappingURL=PhantomFetterHandBook.js.map
