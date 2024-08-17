"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SCreatureGenNavAssistFileExportDefine = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils"),
	SCreatureGenNavAssistAreaExportDefine_1 = require("./SCreatureGenNavAssistAreaExportDefine");
class SCreatureGenNavAssistFileExportDefine {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Areas() {
		return GameUtils_1.GameUtils.ConvertToArray(this.areasLength(), (e) =>
			this.areas(e),
		);
	}
	__init(e, t) {
		return (this.z7 = e), (this.J7 = t), this;
	}
	static getRootAsSCreatureGenNavAssistFileExportDefine(e, t) {
		return (t || new SCreatureGenNavAssistFileExportDefine()).__init(
			e.readInt32(e.position()) + e.position(),
			e,
		);
	}
	GetAreasAt(e, t) {
		return this.areas(e);
	}
	areas(e, t) {
		var s = this.J7.__offset(this.z7, 4);
		return s
			? (
					t ||
					new SCreatureGenNavAssistAreaExportDefine_1.SCreatureGenNavAssistAreaExportDefine()
				).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * e),
					this.J7,
				)
			: null;
	}
	areasLength() {
		var e = this.J7.__offset(this.z7, 4);
		return e ? this.J7.__vector_len(this.z7 + e) : 0;
	}
}
exports.SCreatureGenNavAssistFileExportDefine =
	SCreatureGenNavAssistFileExportDefine;
//# sourceMappingURL=SCreatureGenNavAssistFileExportDefine.js.map
