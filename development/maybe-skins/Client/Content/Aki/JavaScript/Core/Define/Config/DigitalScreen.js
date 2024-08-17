"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DigitalScreen = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class DigitalScreen {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BackgroundPicture() {
		return this.backgroundpicture();
	}
	get Prefab() {
		return this.prefab();
	}
	get ExistTime() {
		return this.existtime();
	}
	get TextId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.textidLength(), (t) =>
			this.textid(t),
		);
	}
	get TextFactor() {
		return this.textfactor();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsDigitalScreen(t, i) {
		return (i || new DigitalScreen()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	backgroundpicture(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	prefab() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	existtime() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetTextidAt(t) {
		return this.textid(t);
	}
	textid(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	textidLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	textidArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	textfactor() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.DigitalScreen = DigitalScreen;
//# sourceMappingURL=DigitalScreen.js.map
