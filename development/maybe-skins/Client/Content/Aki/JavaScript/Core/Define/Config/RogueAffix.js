"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueAffix = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueAffix {
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
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRogueAffix(t, i) {
		return (i || new RogueAffix()).__init(
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
		var i = this.J7.__offset(this.z7, 6);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	buffidLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	affixdesc(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetAffixdescparamAt(t) {
		return this.affixdescparam(t);
	}
	affixdescparam(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	affixdescparamLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	affixdescsimple(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.RogueAffix = RogueAffix;
//# sourceMappingURL=RogueAffix.js.map
