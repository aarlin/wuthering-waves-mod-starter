"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExternalSourceSetting = void 0);
class ExternalSourceSetting {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get AudioEventPath() {
		return this.audioeventpath();
	}
	get ExternalSrcName() {
		return this.externalsrcname();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsExternalSourceSetting(t, e) {
		return (e || new ExternalSourceSetting()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var e = this.J7.__offset(this.z7, 4);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	audioeventpath(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	externalsrcname(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.ExternalSourceSetting = ExternalSourceSetting;
//# sourceMappingURL=ExternalSourceSetting.js.map
