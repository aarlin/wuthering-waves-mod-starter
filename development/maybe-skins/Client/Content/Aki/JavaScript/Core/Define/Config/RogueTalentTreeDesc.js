"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueTalentTreeDesc = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntArray_1 = require("./SubType/IntArray");
class RogueTalentTreeDesc {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BaseDesc() {
		return this.basedesc();
	}
	get Args() {
		return GameUtils_1.GameUtils.ConvertToArray(this.argsLength(), (t) =>
			this.args(t),
		);
	}
	get TalentIcon() {
		return this.talenticon();
	}
	get TalentName() {
		return this.talentname();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsRogueTalentTreeDesc(t, e) {
		return (e || new RogueTalentTreeDesc()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	basedesc(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	GetArgsAt(t, e) {
		return this.args(t);
	}
	args(t, e) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? (e || new IntArray_1.IntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	argsLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	talenticon(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	talentname(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.RogueTalentTreeDesc = RogueTalentTreeDesc;
//# sourceMappingURL=RogueTalentTreeDesc.js.map
