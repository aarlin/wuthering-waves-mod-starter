"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ElementInfo = void 0);
class ElementInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Describe() {
		return this.describe();
	}
	get Name() {
		return this.name();
	}
	get Icon() {
		return this.icon();
	}
	get Icon2() {
		return this.icon2();
	}
	get Icon3() {
		return this.icon3();
	}
	get Icon4() {
		return this.icon4();
	}
	get Icon4Pure() {
		return this.icon4pure();
	}
	get Icon5() {
		return this.icon5();
	}
	get Icon6() {
		return this.icon6();
	}
	get Icon7() {
		return this.icon7();
	}
	get ElementChangeTexture() {
		return this.elementchangetexture();
	}
	get ElementEffectColor() {
		return this.elementeffectcolor();
	}
	get ElementColor() {
		return this.elementcolor();
	}
	get SkillTreeEffectColor() {
		return this.skilltreeeffectcolor();
	}
	get SkillTreeIconColor() {
		return this.skilltreeiconcolor();
	}
	get SkillTreeLineColor() {
		return this.skilltreelinecolor();
	}
	get Effect() {
		return this.effect();
	}
	get EffectTexturePath() {
		return this.effecttexturepath();
	}
	get GachaElementBgSpritePath() {
		return this.gachaelementbgspritepath();
	}
	get GachaSpritePath() {
		return this.gachaspritepath();
	}
	get UltimateSkillColor() {
		return this.ultimateskillcolor();
	}
	get SkillEffectColor() {
		return this.skilleffectcolor();
	}
	get SkillButtonEffectPath() {
		return this.skillbuttoneffectpath();
	}
	get ElementBallEffectPath() {
		return this.elementballeffectpath();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsElementInfo(t, e) {
		return (e || new ElementInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	describe(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon2(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon3(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon4(t) {
		var e = this.J7.__offset(this.z7, 16);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon4pure(t) {
		var e = this.J7.__offset(this.z7, 18);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon5(t) {
		var e = this.J7.__offset(this.z7, 20);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon6(t) {
		var e = this.J7.__offset(this.z7, 22);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon7(t) {
		var e = this.J7.__offset(this.z7, 24);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	elementchangetexture(t) {
		var e = this.J7.__offset(this.z7, 26);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	elementeffectcolor(t) {
		var e = this.J7.__offset(this.z7, 28);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	elementcolor(t) {
		var e = this.J7.__offset(this.z7, 30);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	skilltreeeffectcolor(t) {
		var e = this.J7.__offset(this.z7, 32);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	skilltreeiconcolor(t) {
		var e = this.J7.__offset(this.z7, 34);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	skilltreelinecolor(t) {
		var e = this.J7.__offset(this.z7, 36);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	effect(t) {
		var e = this.J7.__offset(this.z7, 38);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	effecttexturepath(t) {
		var e = this.J7.__offset(this.z7, 40);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	gachaelementbgspritepath(t) {
		var e = this.J7.__offset(this.z7, 42);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	gachaspritepath(t) {
		var e = this.J7.__offset(this.z7, 44);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	ultimateskillcolor(t) {
		var e = this.J7.__offset(this.z7, 46);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	skilleffectcolor(t) {
		var e = this.J7.__offset(this.z7, 48);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	skillbuttoneffectpath(t) {
		var e = this.J7.__offset(this.z7, 50);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	elementballeffectpath(t) {
		var e = this.J7.__offset(this.z7, 52);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.ElementInfo = ElementInfo;
//# sourceMappingURL=ElementInfo.js.map
