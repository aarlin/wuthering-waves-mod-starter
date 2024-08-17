"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MailFilter = void 0);
class MailFilter {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get IconPath() {
		return this.iconpath();
	}
	get Name() {
		return this.name();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMailFilter(t, i) {
		return (i || new MailFilter()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	iconpath(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.MailFilter = MailFilter;
//# sourceMappingURL=MailFilter.js.map
