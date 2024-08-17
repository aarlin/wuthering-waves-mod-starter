"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponReson = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class WeaponReson {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ResonId() {
		return this.resonid();
	}
	get Level() {
		return this.level();
	}
	get Name() {
		return this.name();
	}
	get Effect() {
		return GameUtils_1.GameUtils.ConvertToArray(this.effectLength(), (t) =>
			this.effect(t),
		);
	}
	get Consume() {
		return this.consume();
	}
	get GoldConsume() {
		return this.goldconsume();
	}
	get AlternativeConsume() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.alternativeconsumeLength(),
			(t) => this.alternativeconsume(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsWeaponReson(t, s) {
		return (s || new WeaponReson()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	resonid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetEffectAt(t) {
		return this.effect(t);
	}
	effect(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
			: BigInt(0);
	}
	effectLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	consume() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	goldconsume() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetAlternativeconsumeAt(t) {
		return this.alternativeconsume(t);
	}
	alternativeconsume(t) {
		var s = this.J7.__offset(this.z7, 18);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	alternativeconsumeLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	alternativeconsumeArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.WeaponReson = WeaponReson;
//# sourceMappingURL=WeaponReson.js.map
