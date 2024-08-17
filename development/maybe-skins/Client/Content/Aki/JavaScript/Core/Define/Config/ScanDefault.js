"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ScanDefault = void 0);
class ScanDefault {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get UId() {
		return this.uid();
	}
	get EntityType() {
		return this.entitytype();
	}
	get ScanId() {
		return this.scanid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsScanDefault(t, s) {
		return (s || new ScanDefault()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	uid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entitytype(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	scanid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ScanDefault = ScanDefault;
//# sourceMappingURL=ScanDefault.js.map
