"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaTextureInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GachaTextureInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GachaMainViewTexture() {
		return this.gachamainviewtexture();
	}
	get GachaResultViewTexture() {
		return this.gacharesultviewtexture();
	}
	get ShowSequence() {
		return this.showsequence();
	}
	get BindPoint() {
		return this.bindpoint();
	}
	get IdArray() {
		return GameUtils_1.GameUtils.ConvertToArray(this.idarrayLength(), (t) =>
			this.idarray(t),
		);
	}
	get TrialId() {
		return this.trialid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGachaTextureInfo(t, i) {
		return (i || new GachaTextureInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	gachamainviewtexture(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	gacharesultviewtexture(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	showsequence() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	bindpoint(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetIdarrayAt(t) {
		return this.idarray(t);
	}
	idarray(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	idarrayLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	idarrayArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	trialid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.GachaTextureInfo = GachaTextureInfo;
//# sourceMappingURL=GachaTextureInfo.js.map
