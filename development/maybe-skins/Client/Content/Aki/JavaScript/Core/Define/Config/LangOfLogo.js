"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LangOfLogo = void 0);
class LangOfLogo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Name() {
		return this.name();
	}
	get ZhHansLogo() {
		return this.zhhanslogo();
	}
	get EnLogo() {
		return this.enlogo();
	}
	get JpLogo() {
		return this.jplogo();
	}
	get ZhHantLogo() {
		return this.zhhantlogo();
	}
	get KrLogo() {
		return this.krlogo();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsLangOfLogo(t, s) {
		return (s || new LangOfLogo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	zhhanslogo(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	enlogo(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	jplogo(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	zhhantlogo(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	krlogo(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.LangOfLogo = LangOfLogo;
//# sourceMappingURL=LangOfLogo.js.map
