"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CalabashLevel = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class CalabashLevel {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Level() {
		return this.level();
	}
	get LevelUpExp() {
		return this.levelupexp();
	}
	get LevelUpCondition() {
		return this.levelupcondition();
	}
	get TempCatchGain() {
		return this.tempcatchgain();
	}
	get BuffIds() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffidsLength(), (t) =>
			this.buffids(t),
		);
	}
	get BuffDescription() {
		return this.buffdescription();
	}
	get LevelUpDescription() {
		return this.levelupdescription();
	}
	get QualityDescription() {
		return this.qualitydescription();
	}
	get BuffDescriptionMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.buffdescriptionmapLength(),
			(t) => this.buffdescriptionmap(t)?.key(),
			(t) => this.buffdescriptionmap(t)?.value(),
		);
	}
	get Cost() {
		return this.cost();
	}
	get RewardId() {
		return this.rewardid();
	}
	get QualityDropWeight() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.qualitydropweightLength(),
			(t) => this.qualitydropweight(t)?.key(),
			(t) => this.qualitydropweight(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCalabashLevel(t, i) {
		return (i || new CalabashLevel()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	level() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelupexp() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelupcondition() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	tempcatchgain() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBuffidsAt(t) {
		return this.buffids(t);
	}
	buffids(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	buffidsLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	buffidsArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	buffdescription(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	levelupdescription(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	qualitydescription(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetBuffdescriptionmapAt(t, i) {
		return this.buffdescriptionmap(t);
	}
	buffdescriptionmap(t, i) {
		var s = this.J7.__offset(this.z7, 20);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	buffdescriptionmapLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	cost() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rewardid() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 4301;
	}
	GetQualitydropweightAt(t, i) {
		return this.qualitydropweight(t);
	}
	qualitydropweight(t, i) {
		var s = this.J7.__offset(this.z7, 26);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	qualitydropweightLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.CalabashLevel = CalabashLevel;
//# sourceMappingURL=CalabashLevel.js.map
