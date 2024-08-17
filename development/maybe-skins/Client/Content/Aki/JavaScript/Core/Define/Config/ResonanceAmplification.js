"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ResonanceAmplification = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ResonanceAmplification {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Attr() {
		return this.attr();
	}
	get LifeSeatBoostFactor() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.lifeseatboostfactorLength(),
			(t) => this.lifeseatboostfactor(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsResonanceAmplification(t, s) {
		return (s || new ResonanceAmplification()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	attr() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 7;
	}
	GetLifeseatboostfactorAt(t) {
		return this.lifeseatboostfactor(t);
	}
	lifeseatboostfactor(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	lifeseatboostfactorLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	lifeseatboostfactorArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.ResonanceAmplification = ResonanceAmplification;
//# sourceMappingURL=ResonanceAmplification.js.map
