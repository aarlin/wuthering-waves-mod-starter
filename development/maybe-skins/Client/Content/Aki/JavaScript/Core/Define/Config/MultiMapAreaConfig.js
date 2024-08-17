"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MultiMapAreaConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntArray_1 = require("./SubType/IntArray");
class MultiMapAreaConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Block() {
		return this.block();
	}
	get MultiMapList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.multimaplistLength(),
			(t) => this.multimaplist(t),
		);
	}
	get MultiMapRangeList() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.multimaprangelistLength(),
			(t) => this.multimaprangelist(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMultiMapAreaConfig(t, i) {
		return (i || new MultiMapAreaConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	block(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetMultimaplistAt(t) {
		return this.multimaplist(t);
	}
	multimaplist(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	multimaplistLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	multimaplistArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetMultimaprangelistAt(t, i) {
		return this.multimaprangelist(t);
	}
	multimaprangelist(t, i) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? (i || new IntArray_1.IntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	multimaprangelistLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.MultiMapAreaConfig = MultiMapAreaConfig;
//# sourceMappingURL=MultiMapAreaConfig.js.map
