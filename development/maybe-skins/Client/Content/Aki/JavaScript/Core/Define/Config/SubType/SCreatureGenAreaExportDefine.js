"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SCreatureGenAreaExportDefine = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils"),
	IntVector_1 = require("./IntVector");
class SCreatureGenAreaExportDefine {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ShapeType() {
		return this.shapetype();
	}
	get Transforms() {
		return GameUtils_1.GameUtils.ConvertToArray(this.transformsLength(), (t) =>
			this.transforms(t),
		);
	}
	get Weight() {
		return this.weight();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsSCreatureGenAreaExportDefine(t, e) {
		return (e || new SCreatureGenAreaExportDefine()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	shapetype() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetTransformsAt(t, e) {
		return this.transforms(t);
	}
	transforms(t, e) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? (e || new IntVector_1.IntVector()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	transformsLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	weight() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.SCreatureGenAreaExportDefine = SCreatureGenAreaExportDefine;
//# sourceMappingURL=SCreatureGenAreaExportDefine.js.map
