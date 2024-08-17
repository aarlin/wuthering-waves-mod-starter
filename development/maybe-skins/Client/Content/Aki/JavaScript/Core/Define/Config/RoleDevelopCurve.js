"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleDevelopCurve = void 0);
class RoleDevelopCurve {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get GroupId() {
		return this.groupid();
	}
	get TrainType() {
		return this.traintype();
	}
	get TrainContent() {
		return this.traincontent();
	}
	get WishConsume() {
		return this.wishconsume();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsRoleDevelopCurve(t, e) {
		return (e || new RoleDevelopCurve()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	groupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	traintype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	traincontent(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	wishconsume() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.RoleDevelopCurve = RoleDevelopCurve;
//# sourceMappingURL=RoleDevelopCurve.js.map
