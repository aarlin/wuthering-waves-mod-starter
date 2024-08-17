"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BossRushBuff = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class BossRushBuff {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BuffId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffidLength(), (t) =>
			this.buffid(t),
		);
	}
	get PassiveSkill() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.passiveskillLength(),
			(t) => this.passiveskill(t),
		);
	}
	get Texture() {
		return this.texture();
	}
	get Name() {
		return this.name();
	}
	get Description() {
		return this.description();
	}
	get DescriptionParam() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.descriptionparamLength(),
			(t) => this.descriptionparam(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBossRushBuff(t, s) {
		return (s || new BossRushBuff()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBuffidAt(t) {
		return this.buffid(t);
	}
	buffid(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s
			? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
			: BigInt(0);
	}
	buffidLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetPassiveskillAt(t) {
		return this.passiveskill(t);
	}
	passiveskill(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
			: BigInt(0);
	}
	passiveskillLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	texture(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	description(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetDescriptionparamAt(t) {
		return this.descriptionparam(t);
	}
	descriptionparam(t, s) {
		var i = this.J7.__offset(this.z7, 16);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	descriptionparamLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.BossRushBuff = BossRushBuff;
//# sourceMappingURL=BossRushBuff.js.map
