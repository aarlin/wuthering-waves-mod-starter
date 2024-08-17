"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LipSyncData = void 0);
class LipSyncData {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get DataID() {
		return this.dataid();
	}
	get FunctionName() {
		return this.functionname();
	}
	get LipSyncData() {
		return this.lipsyncdata();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsLipSyncData(t, i) {
		return (i || new LipSyncData()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	dataid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	functionname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	lipsyncdata(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.LipSyncData = LipSyncData;
//# sourceMappingURL=LipSyncData.js.map
