"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SynthesisLevel = void 0);
class SynthesisLevel {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Completeness() {
		return this.completeness();
	}
	get Effect() {
		return this.effect();
	}
	get AttributesDescription() {
		return this.attributesdescription();
	}
	get DropIds() {
		return this.dropids();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsSynthesisLevel(t, s) {
		return (s || new SynthesisLevel()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	completeness() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	effect() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	attributesdescription(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	dropids() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SynthesisLevel = SynthesisLevel;
//# sourceMappingURL=SynthesisLevel.js.map
