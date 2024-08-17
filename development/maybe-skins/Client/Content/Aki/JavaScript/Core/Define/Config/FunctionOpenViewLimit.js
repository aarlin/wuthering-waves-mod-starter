"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionOpenViewLimit = void 0);
class FunctionOpenViewLimit {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get ViewName() {
		return this.viewname();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsFunctionOpenViewLimit(t, i) {
		return (i || new FunctionOpenViewLimit()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	viewname(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.FunctionOpenViewLimit = FunctionOpenViewLimit;
//# sourceMappingURL=FunctionOpenViewLimit.js.map
