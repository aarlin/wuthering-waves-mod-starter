"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HotKeyText = void 0);
class HotKeyText {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get TextId() {
		return this.textid();
	}
	get Name() {
		return this.name();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsHotKeyText(t, e) {
		return (e || new HotKeyText()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	textid(t) {
		var e = this.J7.__offset(this.z7, 4);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.HotKeyText = HotKeyText;
//# sourceMappingURL=HotKeyText.js.map
