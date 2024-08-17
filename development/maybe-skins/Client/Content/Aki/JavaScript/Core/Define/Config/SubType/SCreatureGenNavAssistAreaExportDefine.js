"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SCreatureGenNavAssistAreaExportDefine = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils"),
	IntVector_1 = require("./IntVector");
class SCreatureGenNavAssistAreaExportDefine {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Points() {
		return GameUtils_1.GameUtils.ConvertToArray(this.pointsLength(), (t) =>
			this.points(t),
		);
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsSCreatureGenNavAssistAreaExportDefine(t, e) {
		return (e || new SCreatureGenNavAssistAreaExportDefine()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetPointsAt(t, e) {
		return this.points(t);
	}
	points(t, e) {
		var s = this.J7.__offset(this.z7, 4);
		return s
			? (e || new IntVector_1.IntVector()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	pointsLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.SCreatureGenNavAssistAreaExportDefine =
	SCreatureGenNavAssistAreaExportDefine;
//# sourceMappingURL=SCreatureGenNavAssistAreaExportDefine.js.map
