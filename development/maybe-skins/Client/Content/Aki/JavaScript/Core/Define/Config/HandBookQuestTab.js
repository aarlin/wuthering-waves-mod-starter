"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookQuestTab = void 0);
class HandBookQuestTab {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Icon() {
		return this.icon();
	}
	get Type() {
		return this.type();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsHandBookQuestTab(t, s) {
		return (s || new HandBookQuestTab()).__init(
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
	icon(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	type() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.HandBookQuestTab = HandBookQuestTab;
//# sourceMappingURL=HandBookQuestTab.js.map
