"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerTarget = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TowerTarget {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TargetType() {
		return this.targettype();
	}
	get Params() {
		return GameUtils_1.GameUtils.ConvertToArray(this.paramsLength(), (t) =>
			this.params(t),
		);
	}
	get DesText() {
		return this.destext();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsTowerTarget(t, s) {
		return (s || new TowerTarget()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	targettype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetParamsAt(t) {
		return this.params(t);
	}
	params(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	paramsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	paramsArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	destext(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.TowerTarget = TowerTarget;
//# sourceMappingURL=TowerTarget.js.map
