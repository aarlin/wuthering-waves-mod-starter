"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ElementLevel = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ElementLevel {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Level() {
		return this.level();
	}
	get BuffId() {
		return this.buffid();
	}
	get AddBuffs() {
		return GameUtils_1.GameUtils.ConvertToArray(this.addbuffsLength(), (t) =>
			this.addbuffs(t),
		);
	}
	get TextId() {
		return this.textid();
	}
	get TextIdArgs() {
		return GameUtils_1.GameUtils.ConvertToArray(this.textidargsLength(), (t) =>
			this.textidargs(t),
		);
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsElementLevel(t, e) {
		return (e || new ElementLevel()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	level() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	buffid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt64(this.z7 + t) : BigInt("0");
	}
	GetAddbuffsAt(t) {
		return this.addbuffs(t);
	}
	addbuffs(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e
			? this.J7.readInt64(this.J7.__vector(this.z7 + e) + 8 * t)
			: BigInt(0);
	}
	addbuffsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	textid(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	GetTextidargsAt(t) {
		return this.textidargs(t);
	}
	textidargs(t, e) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e)
			: null;
	}
	textidargsLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.ElementLevel = ElementLevel;
//# sourceMappingURL=ElementLevel.js.map
