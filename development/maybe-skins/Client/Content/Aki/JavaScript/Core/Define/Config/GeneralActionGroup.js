"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GeneralActionGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GeneralActionGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActionIdGroup() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.actionidgroupLength(),
			(t) => this.actionidgroup(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGeneralActionGroup(t, i) {
		return (i || new GeneralActionGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetActionidgroupAt(t) {
		return this.actionidgroup(t);
	}
	actionidgroup(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	actionidgroupLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	actionidgroupArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.GeneralActionGroup = GeneralActionGroup;
//# sourceMappingURL=GeneralActionGroup.js.map
