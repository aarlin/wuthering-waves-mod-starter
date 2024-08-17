"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Text = void 0);
class Text {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Text() {
		return this.text();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsText(t, s) {
		return (s || new Text()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	text(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.Text = Text;
//# sourceMappingURL=Text.js.map
