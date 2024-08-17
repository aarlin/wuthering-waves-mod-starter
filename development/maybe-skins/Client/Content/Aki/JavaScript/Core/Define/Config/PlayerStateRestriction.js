"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlayerStateRestriction = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PlayerStateRestriction {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get IncludedTags() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.includedtagsLength(),
			(t) => this.includedtags(t),
		);
	}
	get ExcludedTags() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.excludedtagsLength(),
			(t) => this.excludedtags(t),
		);
	}
	get CreatorId() {
		return this.creatorid();
	}
	get Remark() {
		return this.remark();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPlayerStateRestriction(t, s) {
		return (s || new PlayerStateRestriction()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetIncludedtagsAt(t) {
		return this.includedtags(t);
	}
	includedtags(t, s) {
		var e = this.J7.__offset(this.z7, 8);
		return e
			? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, s)
			: null;
	}
	includedtagsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetExcludedtagsAt(t) {
		return this.excludedtags(t);
	}
	excludedtags(t, s) {
		var e = this.J7.__offset(this.z7, 10);
		return e
			? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, s)
			: null;
	}
	excludedtagsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	creatorid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	remark(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.PlayerStateRestriction = PlayerStateRestriction;
//# sourceMappingURL=PlayerStateRestriction.js.map
