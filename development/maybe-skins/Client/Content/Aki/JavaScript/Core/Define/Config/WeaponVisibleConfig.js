"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponVisibleConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class WeaponVisibleConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BaseType() {
		return GameUtils_1.GameUtils.ConvertToArray(this.basetypeLength(), (t) =>
			this.basetype(t),
		);
	}
	get VisibleTags() {
		return GameUtils_1.GameUtils.ConvertToArray(this.visibletagsLength(), (t) =>
			this.visibletags(t),
		);
	}
	get HiddenTags() {
		return GameUtils_1.GameUtils.ConvertToArray(this.hiddentagsLength(), (t) =>
			this.hiddentags(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsWeaponVisibleConfig(t, s) {
		return (s || new WeaponVisibleConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBasetypeAt(t) {
		return this.basetype(t);
	}
	basetype(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	basetypeLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	basetypeArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetVisibletagsAt(t) {
		return this.visibletags(t);
	}
	visibletags(t, s) {
		var i = this.J7.__offset(this.z7, 8);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	visibletagsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetHiddentagsAt(t) {
		return this.hiddentags(t);
	}
	hiddentags(t, s) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	hiddentagsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.WeaponVisibleConfig = WeaponVisibleConfig;
//# sourceMappingURL=WeaponVisibleConfig.js.map
