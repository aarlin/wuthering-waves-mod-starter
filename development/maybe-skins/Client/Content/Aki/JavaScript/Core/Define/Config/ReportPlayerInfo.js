"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReportPlayerInfo = void 0);
class ReportPlayerInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Reason() {
		return this.reason();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsReportPlayerInfo(t, r) {
		return (r || new ReportPlayerInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	reason(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.ReportPlayerInfo = ReportPlayerInfo;
//# sourceMappingURL=ReportPlayerInfo.js.map
