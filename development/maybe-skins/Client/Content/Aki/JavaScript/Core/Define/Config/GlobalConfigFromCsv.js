"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GlobalConfigFromCsv = void 0);
class GlobalConfigFromCsv {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Desc() {
		return this.desc();
	}
	get Type() {
		return this.type();
	}
	get Value() {
		return this.value();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsGlobalConfigFromCsv(t, s) {
		return (s || new GlobalConfigFromCsv()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	desc(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	type(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	value(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.GlobalConfigFromCsv = GlobalConfigFromCsv;
//# sourceMappingURL=GlobalConfigFromCsv.js.map
