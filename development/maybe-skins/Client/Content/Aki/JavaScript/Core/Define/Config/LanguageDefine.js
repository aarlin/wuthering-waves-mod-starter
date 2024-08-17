"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LanguageDefine = void 0);
class LanguageDefine {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get LanguageType() {
		return this.languagetype();
	}
	get LanguageCode() {
		return this.languagecode();
	}
	get IsShow() {
		return this.isshow();
	}
	get QuestionnaireId() {
		return this.questionnaireid();
	}
	get AudioCode() {
		return this.audiocode();
	}
	get SortId() {
		return this.sortid();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsLanguageDefine(t, e) {
		return (e || new LanguageDefine()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	languagetype() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	languagecode(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	isshow() {
		var t = this.J7.__offset(this.z7, 8);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	questionnaireid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	audiocode(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	sortid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.LanguageDefine = LanguageDefine;
//# sourceMappingURL=LanguageDefine.js.map
