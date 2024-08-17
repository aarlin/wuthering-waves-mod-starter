"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomSkill = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	StringArray_1 = require("./SubType/StringArray");
class PhantomSkill {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PhantomSkillId() {
		return this.phantomskillid();
	}
	get BuffIds() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffidsLength(), (t) =>
			this.buffids(t),
		);
	}
	get SettleIds() {
		return GameUtils_1.GameUtils.ConvertToArray(this.settleidsLength(), (t) =>
			this.settleids(t),
		);
	}
	get BuffEffects() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffeffectsLength(), (t) =>
			this.buffeffects(t),
		);
	}
	get ChargeEfficiency() {
		return this.chargeefficiency();
	}
	get SkillGroupId() {
		return this.skillgroupid();
	}
	get SkillCD() {
		return this.skillcd();
	}
	get DescriptionEx() {
		return this.descriptionex();
	}
	get SimplyDescription() {
		return this.simplydescription();
	}
	get IfCounterSkill() {
		return this.ifcounterskill();
	}
	get CurLevelDescriptionEx() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.curleveldescriptionexLength(),
			(t) => this.curleveldescriptionex(t),
		);
	}
	get LevelDescStrArray() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.leveldescstrarrayLength(),
			(t) => this.leveldescstrarray(t),
		);
	}
	get BattleViewIcon() {
		return this.battleviewicon();
	}
	get SpecialBattleViewIcon() {
		return this.specialbattleviewicon();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhantomSkill(t, i) {
		return (i || new PhantomSkill()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	phantomskillid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBuffidsAt(t) {
		return this.buffids(t);
	}
	buffids(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	buffidsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetSettleidsAt(t) {
		return this.settleids(t);
	}
	settleids(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	settleidsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetBuffeffectsAt(t) {
		return this.buffeffects(t);
	}
	buffeffects(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	buffeffectsLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	chargeefficiency() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillgroupid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillcd() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	descriptionex(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	simplydescription(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	ifcounterskill() {
		var t = this.J7.__offset(this.z7, 24);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	GetCurleveldescriptionexAt(t) {
		return this.curleveldescriptionex(t);
	}
	curleveldescriptionex(t, i) {
		var s = this.J7.__offset(this.z7, 26);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	curleveldescriptionexLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetLeveldescstrarrayAt(t, i) {
		return this.leveldescstrarray(t);
	}
	leveldescstrarray(t, i) {
		var s = this.J7.__offset(this.z7, 28);
		return s
			? (i || new StringArray_1.StringArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	leveldescstrarrayLength() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	battleviewicon(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	specialbattleviewicon(t) {
		var i = this.J7.__offset(this.z7, 32);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.PhantomSkill = PhantomSkill;
//# sourceMappingURL=PhantomSkill.js.map
