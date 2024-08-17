"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HotKeyIcon = void 0);
class HotKeyIcon {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get KeyName() {
		return this.keyname();
	}
	get Icon() {
		return this.icon();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsHotKeyIcon(t, e) {
		return (e || new HotKeyIcon()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	keyname(t) {
		var e = this.J7.__offset(this.z7, 4);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	icon(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.HotKeyIcon = HotKeyIcon;
//# sourceMappingURL=HotKeyIcon.js.map
