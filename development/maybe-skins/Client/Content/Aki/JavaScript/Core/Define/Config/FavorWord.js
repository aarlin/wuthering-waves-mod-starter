"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FavorWord = void 0);
class FavorWord {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get Type() {
		return this.type();
	}
	get Sort() {
		return this.sort();
	}
	get Title() {
		return this.title();
	}
	get Content() {
		return this.content();
	}
	get Voice() {
		return this.voice();
	}
	get CVCn() {
		return this.cvcn();
	}
	get CVJp() {
		return this.cvjp();
	}
	get CVEn() {
		return this.cven();
	}
	get CVKo() {
		return this.cvko();
	}
	get CondGroupId() {
		return this.condgroupid();
	}
	get MotionImg() {
		return this.motionimg();
	}
	get AniBlueprint() {
		return this.aniblueprint();
	}
	get AniMontage() {
		return this.animontage();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsFavorWord(t, i) {
		return (i || new FavorWord()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roleid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sort() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	content(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	voice(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	cvcn(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	cvjp(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	cven(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	cvko(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	condgroupid() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	motionimg(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	aniblueprint(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	animontage(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.FavorWord = FavorWord;
//# sourceMappingURL=FavorWord.js.map
