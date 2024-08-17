"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdventureTaskChapter = void 0);
class AdventureTaskChapter {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get DropIds() {
		return this.dropids();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsAdventureTaskChapter(t, s) {
		return (s || new AdventureTaskChapter()).__init(
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
	dropids() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.AdventureTaskChapter = AdventureTaskChapter;
//# sourceMappingURL=AdventureTaskChapter.js.map
