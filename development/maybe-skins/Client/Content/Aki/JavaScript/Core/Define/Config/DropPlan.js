"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DropPlan = void 0);
class DropPlan {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsDropPlan(t, s) {
		return (s || new DropPlan()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.DropPlan = DropPlan;
//# sourceMappingURL=DropPlan.js.map
