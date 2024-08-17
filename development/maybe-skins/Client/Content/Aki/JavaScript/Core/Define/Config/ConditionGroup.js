"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ConditionGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ConditionGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GroupId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.groupidLength(), (t) =>
			this.groupid(t),
		);
	}
	get Relation() {
		return this.relation();
	}
	get HintText() {
		return this.hinttext();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsConditionGroup(t, i) {
		return (i || new ConditionGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetGroupidAt(t) {
		return this.groupid(t);
	}
	groupid(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	groupidLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	groupidArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	relation() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	hinttext(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.ConditionGroup = ConditionGroup;
//# sourceMappingURL=ConditionGroup.js.map
