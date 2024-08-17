"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HelpText = void 0);
class HelpText {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GroupId() {
		return this.groupid();
	}
	get Title() {
		return this.title();
	}
	get Picture() {
		return this.picture();
	}
	get Content() {
		return this.content();
	}
	get Type() {
		return this.type();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsHelpText(t, e) {
		return (e || new HelpText()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	groupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	picture(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	content(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	type() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.HelpText = HelpText;
//# sourceMappingURL=HelpText.js.map
