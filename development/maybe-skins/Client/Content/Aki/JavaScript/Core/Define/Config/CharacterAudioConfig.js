"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CharacterAudioConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntString_1 = require("./SubType/DicIntString");
class CharacterAudioConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get HpLost() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.hplostLength(),
			(t) => this.hplost(t)?.key(),
			(t) => this.hplost(t)?.value(),
		);
	}
	get Chest() {
		return this.chest();
	}
	get Effort() {
		return this.effort();
	}
	get EffortLow() {
		return this.effortlow();
	}
	get EffortCd() {
		return this.effortcd();
	}
	get Rankup() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.rankupLength(),
			(t) => this.rankup(t)?.key(),
			(t) => this.rankup(t)?.value(),
		);
	}
	get JoinTeam() {
		return this.jointeam();
	}
	get FirstGet() {
		return this.firstget();
	}
	get MutantTransform() {
		return this.mutanttransform();
	}
	get MutantSummon() {
		return this.mutantsummon();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCharacterAudioConfig(t, i) {
		return (i || new CharacterAudioConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetHplostAt(t, i) {
		return this.hplost(t);
	}
	hplost(t, i) {
		var r = this.J7.__offset(this.z7, 8);
		return r
			? (i || new DicIntString_1.DicIntString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	hplostLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	chest(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	effort(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	effortlow(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	effortcd() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	GetRankupAt(t, i) {
		return this.rankup(t);
	}
	rankup(t, i) {
		var r = this.J7.__offset(this.z7, 18);
		return r
			? (i || new DicIntString_1.DicIntString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	rankupLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	jointeam(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	firstget(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	mutanttransform(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	mutantsummon(t) {
		var i = this.J7.__offset(this.z7, 26);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.CharacterAudioConfig = CharacterAudioConfig;
//# sourceMappingURL=CharacterAudioConfig.js.map
