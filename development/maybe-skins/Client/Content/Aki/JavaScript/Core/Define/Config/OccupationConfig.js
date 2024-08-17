"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OccupationConfig = void 0);
class OccupationConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get OccupationType() {
		return this.occupationtype();
	}
	get NameStringKey() {
		return this.namestringkey();
	}
	get Name() {
		return this.name();
	}
	get OccupationData() {
		return this.occupationdata();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsOccupationConfig(t, i) {
		return (i || new OccupationConfig()).__init(
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
	namestringkey() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	occupationdata(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.OccupationConfig = OccupationConfig;
//# sourceMappingURL=OccupationConfig.js.map
