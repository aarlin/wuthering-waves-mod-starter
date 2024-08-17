"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomFormation = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomFormation {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Roles() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rolesLength(), (t) =>
			this.roles(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsPhantomFormation(t, s) {
		return (s || new PhantomFormation()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRolesAt(t) {
		return this.roles(t);
	}
	roles(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	rolesLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	rolesArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.PhantomFormation = PhantomFormation;
//# sourceMappingURL=PhantomFormation.js.map
