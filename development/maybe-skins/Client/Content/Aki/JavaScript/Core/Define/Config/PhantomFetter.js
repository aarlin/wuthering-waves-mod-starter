"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomFetter = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	ConfigPropValue_1 = require("./SubType/ConfigPropValue");
class PhantomFetter {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get BuffIds() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffidsLength(), (t) =>
			this.buffids(t),
		);
	}
	get AddProp() {
		return GameUtils_1.GameUtils.ConvertToArray(this.addpropLength(), (t) =>
			this.addprop(t),
		);
	}
	get EffectDescription() {
		return this.effectdescription();
	}
	get FetterIcon() {
		return this.fettericon();
	}
	get SimplyEffectDesc() {
		return this.simplyeffectdesc();
	}
	get EffectDescriptionParam() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.effectdescriptionparamLength(),
			(t) => this.effectdescriptionparam(t),
		);
	}
	get EffectDefineDescription() {
		return this.effectdefinedescription();
	}
	get Priority() {
		return this.priority();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPhantomFetter(t, i) {
		return (i || new PhantomFetter()).__init(
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
	GetAddpropAt(t, i) {
		return this.addprop(t);
	}
	addprop(t, i) {
		var e = this.J7.__offset(this.z7, 10);
		return e
			? (i || new ConfigPropValue_1.ConfigPropValue()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	addpropLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	effectdescription(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	fettericon(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	simplyeffectdesc(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetEffectdescriptionparamAt(t) {
		return this.effectdescriptionparam(t);
	}
	effectdescriptionparam(t, i) {
		var e = this.J7.__offset(this.z7, 18);
		return e
			? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, i)
			: null;
	}
	effectdescriptionparamLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	effectdefinedescription(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	priority() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomFetter = PhantomFetter;
//# sourceMappingURL=PhantomFetter.js.map
