"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OverlayMap = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class OverlayMap {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get OverlayMapId() {
		return this.overlaymapid();
	}
	get MapId() {
		return this.mapid();
	}
	get MapAddress() {
		return this.mapaddress();
	}
	get MapPos() {
		return GameUtils_1.GameUtils.ConvertToArray(this.mapposLength(), (t) =>
			this.mappos(t),
		);
	}
	get Rotation() {
		return this.rotation();
	}
	get WidthHeight() {
		return GameUtils_1.GameUtils.ConvertToArray(this.widthheightLength(), (t) =>
			this.widthheight(t),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsOverlayMap(t, s) {
		return (s || new OverlayMap()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	overlaymapid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	mapaddress(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetMapposAt(t) {
		return this.mappos(t);
	}
	mappos(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	mapposLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	mapposArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	rotation() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetWidthheightAt(t) {
		return this.widthheight(t);
	}
	widthheight(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	widthheightLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	widthheightArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.OverlayMap = OverlayMap;
//# sourceMappingURL=OverlayMap.js.map
