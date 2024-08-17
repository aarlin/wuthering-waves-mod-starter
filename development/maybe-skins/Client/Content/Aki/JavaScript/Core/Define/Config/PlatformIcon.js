"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlatformIcon = void 0);
class PlatformIcon {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get IconName() {
		return this.iconname();
	}
	get IconPath() {
		return this.iconpath();
	}
	get MobileIconPath() {
		return this.mobileiconpath();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsPlatformIcon(t, i) {
		return (i || new PlatformIcon()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	iconname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconpath(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	mobileiconpath(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.PlatformIcon = PlatformIcon;
//# sourceMappingURL=PlatformIcon.js.map
