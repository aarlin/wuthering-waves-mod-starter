"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BlackScreenLang = void 0);
class BlackScreenLang {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ShowAnimName() {
		return this.showanimname();
	}
	get HideAnimName() {
		return this.hideanimname();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsBlackScreenLang(t, e) {
		return (e || new BlackScreenLang()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	showanimname() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	hideanimname() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.BlackScreenLang = BlackScreenLang;
//# sourceMappingURL=BlackScreenLang.js.map
