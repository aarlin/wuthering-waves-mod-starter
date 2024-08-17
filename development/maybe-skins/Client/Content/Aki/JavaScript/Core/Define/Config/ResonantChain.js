"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ResonantChain = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	ConfigPropValue_1 = require("./SubType/ConfigPropValue"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class ResonantChain {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GroupId() {
		return this.groupid();
	}
	get GroupIndex() {
		return this.groupindex();
	}
	get NodeType() {
		return this.nodetype();
	}
	get NodeIndex() {
		return this.nodeindex();
	}
	get NodeName() {
		return this.nodename();
	}
	get AttributesDescription() {
		return this.attributesdescription();
	}
	get BgDescription() {
		return this.bgdescription();
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
	get ActivateConsume() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.activateconsumeLength(),
			(t) => this.activateconsume(t)?.key(),
			(t) => this.activateconsume(t)?.value(),
		);
	}
	get AttributesDescriptionParams() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.attributesdescriptionparamsLength(),
			(t) => this.attributesdescriptionparams(t),
		);
	}
	get NodeIcon() {
		return this.nodeicon();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsResonantChain(t, i) {
		return (i || new ResonantChain()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	groupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	groupindex() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	nodetype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	nodeindex(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	nodename(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	attributesdescription(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	bgdescription(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetBuffidsAt(t) {
		return this.buffids(t);
	}
	buffids(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	buffidsLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAddpropAt(t, i) {
		return this.addprop(t);
	}
	addprop(t, i) {
		var s = this.J7.__offset(this.z7, 22);
		return s
			? (i || new ConfigPropValue_1.ConfigPropValue()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	addpropLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetActivateconsumeAt(t, i) {
		return this.activateconsume(t);
	}
	activateconsume(t, i) {
		var s = this.J7.__offset(this.z7, 24);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	activateconsumeLength() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAttributesdescriptionparamsAt(t) {
		return this.attributesdescriptionparams(t);
	}
	attributesdescriptionparams(t, i) {
		var s = this.J7.__offset(this.z7, 26);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	attributesdescriptionparamsLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	nodeicon(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.ResonantChain = ResonantChain;
//# sourceMappingURL=ResonantChain.js.map
