"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TurntableInfo = void 0);
class TurntableInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get CostItemId() {
		return this.costitemid();
	}
	get CostItemCount() {
		return this.costitemcount();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsTurntableInfo(t, s) {
		return (s || new TurntableInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	costitemid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	costitemcount() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TurntableInfo = TurntableInfo;
//# sourceMappingURL=TurntableInfo.js.map
