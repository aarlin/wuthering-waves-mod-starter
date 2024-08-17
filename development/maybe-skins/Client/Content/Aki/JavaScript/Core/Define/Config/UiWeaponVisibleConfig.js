"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiWeaponVisibleConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class UiWeaponVisibleConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get VisibleList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.visiblelistLength(), (i) =>
			this.visiblelist(i),
		);
	}
	__init(i, t) {
		return (this.z7 = i), (this.J7 = t), this;
	}
	static getRootAsUiWeaponVisibleConfig(i, t) {
		return (t || new UiWeaponVisibleConfig()).__init(
			i.readInt32(i.position()) + i.position(),
			i,
		);
	}
	id() {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.readInt32(this.z7 + i) : 0;
	}
	GetVisiblelistAt(i) {
		return this.visiblelist(i);
	}
	visiblelist(i) {
		var t = this.J7.__offset(this.z7, 6);
		return !!t && !!this.J7.readInt8(this.J7.__vector(this.z7 + t) + i);
	}
	visiblelistLength() {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__vector_len(this.z7 + i) : 0;
	}
	visiblelistArray() {
		var i = this.J7.__offset(this.z7, 6);
		return i
			? new Int8Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + i),
					this.J7.__vector_len(this.z7 + i),
				)
			: null;
	}
}
exports.UiWeaponVisibleConfig = UiWeaponVisibleConfig;
//# sourceMappingURL=UiWeaponVisibleConfig.js.map
