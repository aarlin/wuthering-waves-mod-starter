"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FormationProperty = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	FloatRange_1 = require("./SubType/FloatRange");
class FormationProperty {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get InitValue() {
		return this.initvalue();
	}
	get InitRecoveryRate() {
		return this.initrecoveryrate();
	}
	get InitMax() {
		return this.initmax();
	}
	get MarkTag() {
		return GameUtils_1.GameUtils.ConvertToArray(this.marktagLength(), (t) =>
			this.marktag(t),
		);
	}
	get ResistTag() {
		return GameUtils_1.GameUtils.ConvertToArray(this.resisttagLength(), (t) =>
			this.resisttag(t),
		);
	}
	get TriggerRange1() {
		return this.triggerrange1();
	}
	get TriggerType1() {
		return this.triggertype1();
	}
	get TriggerEffect1() {
		return this.triggereffect1();
	}
	get TriggerEffectParams1() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.triggereffectparams1Length(),
			(t) => this.triggereffectparams1(t),
		);
	}
	get TriggerRange2() {
		return this.triggerrange2();
	}
	get TriggerType2() {
		return this.triggertype2();
	}
	get TriggerEffect2() {
		return this.triggereffect2();
	}
	get TriggerEffectParams2() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.triggereffectparams2Length(),
			(t) => this.triggereffectparams2(t),
		);
	}
	get TriggerRange3() {
		return this.triggerrange3();
	}
	get TriggerType3() {
		return this.triggertype3();
	}
	get TriggerEffect3() {
		return this.triggereffect3();
	}
	get TriggerEffectParams3() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.triggereffectparams3Length(),
			(t) => this.triggereffectparams3(t),
		);
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsFormationProperty(t, r) {
		return (r || new FormationProperty()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	initvalue() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	initrecoveryrate() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : -500;
	}
	initmax() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 1e4;
	}
	GetMarktagAt(t) {
		return this.marktag(t);
	}
	marktag(t, r) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, r)
			: null;
	}
	marktagLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetResisttagAt(t) {
		return this.resisttag(t);
	}
	resisttag(t, r) {
		var i = this.J7.__offset(this.z7, 14);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, r)
			: null;
	}
	resisttagLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	triggerrange1(t) {
		var r = this.J7.__offset(this.z7, 16);
		return r
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + r),
					this.J7,
				)
			: null;
	}
	triggertype1() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	triggereffect1() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetTriggereffectparams1At(t) {
		return this.triggereffectparams1(t);
	}
	triggereffectparams1(t) {
		var r = this.J7.__offset(this.z7, 22);
		return r
			? this.J7.readInt64(this.J7.__vector(this.z7 + r) + 8 * t)
			: BigInt(0);
	}
	triggereffectparams1Length() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	triggerrange2(t) {
		var r = this.J7.__offset(this.z7, 24);
		return r
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + r),
					this.J7,
				)
			: null;
	}
	triggertype2() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	triggereffect2() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetTriggereffectparams2At(t) {
		return this.triggereffectparams2(t);
	}
	triggereffectparams2(t) {
		var r = this.J7.__offset(this.z7, 30);
		return r
			? this.J7.readInt64(this.J7.__vector(this.z7 + r) + 8 * t)
			: BigInt(0);
	}
	triggereffectparams2Length() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	triggerrange3(t) {
		var r = this.J7.__offset(this.z7, 32);
		return r
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + r),
					this.J7,
				)
			: null;
	}
	triggertype3() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	triggereffect3() {
		var t = this.J7.__offset(this.z7, 36);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetTriggereffectparams3At(t) {
		return this.triggereffectparams3(t);
	}
	triggereffectparams3(t) {
		var r = this.J7.__offset(this.z7, 38);
		return r
			? this.J7.readInt64(this.J7.__vector(this.z7 + r) + 8 * t)
			: BigInt(0);
	}
	triggereffectparams3Length() {
		var t = this.J7.__offset(this.z7, 38);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.FormationProperty = FormationProperty;
//# sourceMappingURL=FormationProperty.js.map
