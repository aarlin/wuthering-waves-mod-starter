"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RogueAffixLibrary = void 0);
class RogueAffixLibrary {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get AffixId() {
		return this.affixid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRogueAffixLibrary(t, i) {
		return (i || new RogueAffixLibrary()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	affixid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.RogueAffixLibrary = RogueAffixLibrary;
//# sourceMappingURL=RogueAffixLibrary.js.map
