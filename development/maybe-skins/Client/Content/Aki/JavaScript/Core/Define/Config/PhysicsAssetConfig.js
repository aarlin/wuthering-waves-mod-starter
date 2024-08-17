"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhysicsAssetConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class PhysicsAssetConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PhysicsAssetPath() {
		return this.physicsassetpath();
	}
	get BoneNames() {
		return GameUtils_1.GameUtils.ConvertToArray(this.bonenamesLength(), (s) =>
			this.bonenames(s),
		);
	}
	__init(s, t) {
		return (this.z7 = s), (this.J7 = t), this;
	}
	static getRootAsPhysicsAssetConfig(s, t) {
		return (t || new PhysicsAssetConfig()).__init(
			s.readInt32(s.position()) + s.position(),
			s,
		);
	}
	id(s) {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__string(this.z7 + t, s) : null;
	}
	physicsassetpath(s) {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__string(this.z7 + t, s) : null;
	}
	GetBonenamesAt(s) {
		return this.bonenames(s);
	}
	bonenames(s, t) {
		var i = this.J7.__offset(this.z7, 8);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * s, t)
			: null;
	}
	bonenamesLength() {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__vector_len(this.z7 + s) : 0;
	}
}
exports.PhysicsAssetConfig = PhysicsAssetConfig;
//# sourceMappingURL=PhysicsAssetConfig.js.map
