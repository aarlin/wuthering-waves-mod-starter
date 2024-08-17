"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SListenEventExportDefine = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils");
class SListenEventExportDefine {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ListenConfigIds() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.listenconfigidsLength(),
			(t) => this.listenconfigids(t),
		);
	}
	get ListenRange() {
		return this.listenrange();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSListenEventExportDefine(t, i) {
		return (i || new SListenEventExportDefine()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetListenconfigidsAt(t) {
		return this.listenconfigids(t);
	}
	listenconfigids(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	listenconfigidsLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	listenconfigidsArray() {
		var t = this.J7.__offset(this.z7, 4);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	listenrange() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.SListenEventExportDefine = SListenEventExportDefine;
//# sourceMappingURL=SListenEventExportDefine.js.map
