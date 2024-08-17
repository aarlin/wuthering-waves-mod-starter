"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DamageText = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DamageText {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get CommonIcon() {
		return this.commonicon();
	}
	get CritIcon() {
		return this.criticon();
	}
	get CritNiagaraPath() {
		return this.critniagarapath();
	}
	get TextColor() {
		return this.textcolor();
	}
	get StrokeColor() {
		return this.strokecolor();
	}
	get CritTextColor() {
		return this.crittextcolor();
	}
	get CritStrokeColor() {
		return this.critstrokecolor();
	}
	get MinDeviationX() {
		return this.mindeviationx();
	}
	get MinDeviationY() {
		return this.mindeviationy();
	}
	get MaxDeviationX() {
		return this.maxdeviationx();
	}
	get MaxDeviationY() {
		return this.maxdeviationy();
	}
	get OwnDamageSequence() {
		return this.owndamagesequence();
	}
	get OwnCriticalDamageSequence() {
		return this.owncriticaldamagesequence();
	}
	get MonsterDamageSequence() {
		return this.monsterdamagesequence();
	}
	get MonsterCriticalDamageSequence() {
		return this.monstercriticaldamagesequence();
	}
	get DamageTextSequence() {
		return this.damagetextsequence();
	}
	get IsPreload() {
		return this.ispreload();
	}
	get OwnCommonDamageCurvePath() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.owncommondamagecurvepathLength(),
			(t) => this.owncommondamagecurvepath(t),
		);
	}
	get OwnCriticalDamageCurvePath() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.owncriticaldamagecurvepathLength(),
			(t) => this.owncriticaldamagecurvepath(t),
		);
	}
	get MonsterCommonDamageCurvePath() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.monstercommondamagecurvepathLength(),
			(t) => this.monstercommondamagecurvepath(t),
		);
	}
	get MonsterCriticalDamageCurvePath() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.monstercriticaldamagecurvepathLength(),
			(t) => this.monstercriticaldamagecurvepath(t),
		);
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsDamageText(t, e) {
		return (e || new DamageText()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	commonicon(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	criticon(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	critniagarapath(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	textcolor(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	strokecolor(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	crittextcolor(t) {
		var e = this.J7.__offset(this.z7, 16);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	critstrokecolor(t) {
		var e = this.J7.__offset(this.z7, 18);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	mindeviationx() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mindeviationy() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxdeviationx() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxdeviationy() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	owndamagesequence(t) {
		var e = this.J7.__offset(this.z7, 28);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	owncriticaldamagesequence(t) {
		var e = this.J7.__offset(this.z7, 30);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	monsterdamagesequence(t) {
		var e = this.J7.__offset(this.z7, 32);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	monstercriticaldamagesequence(t) {
		var e = this.J7.__offset(this.z7, 34);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	damagetextsequence(t) {
		var e = this.J7.__offset(this.z7, 36);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	ispreload() {
		var t = this.J7.__offset(this.z7, 38);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	GetOwncommondamagecurvepathAt(t) {
		return this.owncommondamagecurvepath(t);
	}
	owncommondamagecurvepath(t, e) {
		var i = this.J7.__offset(this.z7, 40);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, e)
			: null;
	}
	owncommondamagecurvepathLength() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetOwncriticaldamagecurvepathAt(t) {
		return this.owncriticaldamagecurvepath(t);
	}
	owncriticaldamagecurvepath(t, e) {
		var i = this.J7.__offset(this.z7, 42);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, e)
			: null;
	}
	owncriticaldamagecurvepathLength() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetMonstercommondamagecurvepathAt(t) {
		return this.monstercommondamagecurvepath(t);
	}
	monstercommondamagecurvepath(t, e) {
		var i = this.J7.__offset(this.z7, 44);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, e)
			: null;
	}
	monstercommondamagecurvepathLength() {
		var t = this.J7.__offset(this.z7, 44);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetMonstercriticaldamagecurvepathAt(t) {
		return this.monstercriticaldamagecurvepath(t);
	}
	monstercriticaldamagecurvepath(t, e) {
		var i = this.J7.__offset(this.z7, 46);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, e)
			: null;
	}
	monstercriticaldamagecurvepathLength() {
		var t = this.J7.__offset(this.z7, 46);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.DamageText = DamageText;
//# sourceMappingURL=DamageText.js.map
