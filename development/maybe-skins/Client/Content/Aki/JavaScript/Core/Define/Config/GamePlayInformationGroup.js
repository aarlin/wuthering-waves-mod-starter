"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GamePlayInformationGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GamePlayInformationGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get InfoGroup() {
		return GameUtils_1.GameUtils.ConvertToArray(this.infogroupLength(), (t) =>
			this.infogroup(t),
		);
	}
	get IconString() {
		return this.iconstring();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGamePlayInformationGroup(t, i) {
		return (i || new GamePlayInformationGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetInfogroupAt(t) {
		return this.infogroup(t);
	}
	infogroup(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	infogroupLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	infogroupArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	iconstring(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.GamePlayInformationGroup = GamePlayInformationGroup;
//# sourceMappingURL=GamePlayInformationGroup.js.map
