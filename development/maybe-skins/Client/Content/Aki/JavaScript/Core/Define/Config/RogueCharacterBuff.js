"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueCharacterBuff = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueCharacterBuff {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BuffId() {
		return this.buffid();
	}
	get BuffIds() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buffidsLength(), (t) =>
			this.buffids(t),
		);
	}
	get AffixDesc() {
		return this.affixdesc();
	}
	get AffixDescParam() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.affixdescparamLength(),
			(t) => this.affixdescparam(t),
		);
	}
	get AffixDescSimple() {
		return this.affixdescsimple();
	}
	get AffixTitle() {
		return this.affixtitle();
	}
	get AffixIcon() {
		return this.affixicon();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRogueCharacterBuff(t, i) {
		return (i || new RogueCharacterBuff()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	buffid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
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
	affixdesc(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetAffixdescparamAt(t) {
		return this.affixdescparam(t);
	}
	affixdescparam(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	affixdescparamLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	affixdescsimple(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	affixtitle(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	affixicon(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.RogueCharacterBuff = RogueCharacterBuff;
//# sourceMappingURL=RogueCharacterBuff.js.map
