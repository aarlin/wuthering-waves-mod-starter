"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapMarkRelativeSubType = void 0);
const IntVector_1 = require("./SubType/IntVector");
class MapMarkRelativeSubType {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get FunctionId() {
		return this.functionid();
	}
	get Position() {
		return this.position();
	}
	get Scale() {
		return this.scale();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsMapMarkRelativeSubType(t, e) {
		return (e || new MapMarkRelativeSubType()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	functionid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	position(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e
			? (t || new IntVector_1.IntVector()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	scale() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 1;
	}
}
exports.MapMarkRelativeSubType = MapMarkRelativeSubType;
//# sourceMappingURL=MapMarkRelativeSubType.js.map
