"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceEnterControl = void 0);
class InstanceEnterControl {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get EnterCount() {
		return this.entercount();
	}
	get EnterCountConsumeType() {
		return this.entercountconsumetype();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsInstanceEnterControl(t, e) {
		return (e || new InstanceEnterControl()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entercount() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entercountconsumetype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.InstanceEnterControl = InstanceEnterControl;
//# sourceMappingURL=InstanceEnterControl.js.map
