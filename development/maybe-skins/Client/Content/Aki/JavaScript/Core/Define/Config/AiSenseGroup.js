"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiSenseGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	FloatRange_1 = require("./SubType/FloatRange");
class AiSenseGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get LoseDelay() {
		return this.losedelay();
	}
	get AiSenseIds() {
		return GameUtils_1.GameUtils.ConvertToArray(this.aisenseidsLength(), (t) =>
			this.aisenseids(t),
		);
	}
	get ShareDis() {
		return this.sharedis();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsAiSenseGroup(t, s) {
		return (s || new AiSenseGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	losedelay(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + s),
					this.J7,
				)
			: null;
	}
	GetAisenseidsAt(t) {
		return this.aisenseids(t);
	}
	aisenseids(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	aisenseidsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	aisenseidsArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	sharedis() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.AiSenseGroup = AiSenseGroup;
//# sourceMappingURL=AiSenseGroup.js.map
