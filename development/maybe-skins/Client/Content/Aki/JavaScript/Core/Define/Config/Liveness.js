"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Liveness = void 0);
class Liveness {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Goal() {
		return this.goal();
	}
	get DropId() {
		return this.dropid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsLiveness(t, s) {
		return (s || new Liveness()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	goal() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	dropid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.Liveness = Liveness;
//# sourceMappingURL=Liveness.js.map
