"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NewOccupationConfig = void 0);
class NewOccupationConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get OccupationType() {
		return this.occupationtype();
	}
	get OccupationData() {
		return this.occupationdata();
	}
	get OccupationNameStringKey() {
		return this.occupationnamestringkey();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsNewOccupationConfig(t, i) {
		return (i || new NewOccupationConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	occupationtype(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	occupationdata(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	occupationnamestringkey(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.NewOccupationConfig = NewOccupationConfig;
//# sourceMappingURL=NewOccupationConfig.js.map
