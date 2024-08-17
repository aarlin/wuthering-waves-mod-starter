"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DevicePlatform = void 0);
class DevicePlatform {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PidAndVid() {
		return this.pidandvid();
	}
	get PlatformType() {
		return this.platformtype();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsDevicePlatform(t, i) {
		return (i || new DevicePlatform()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	pidandvid(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	platformtype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DevicePlatform = DevicePlatform;
//# sourceMappingURL=DevicePlatform.js.map
