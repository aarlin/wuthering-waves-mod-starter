"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HeadIcon = void 0);
class HeadIcon {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get IconPath() {
		return this.iconpath();
	}
	get BigIconPath() {
		return this.bigiconpath();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsHeadIcon(t, s) {
		return (s || new HeadIcon()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	iconpath(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	bigiconpath(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.HeadIcon = HeadIcon;
//# sourceMappingURL=HeadIcon.js.map
