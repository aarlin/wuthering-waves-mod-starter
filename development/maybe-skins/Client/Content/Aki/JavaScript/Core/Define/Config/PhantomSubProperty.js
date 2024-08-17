"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PhantomSubProperty = void 0);
class PhantomSubProperty {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PropId() {
		return this.propid();
	}
	get AddType() {
		return this.addtype();
	}
	get SubStandardProperty() {
		return this.substandardproperty();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsPhantomSubProperty(t, r) {
		return (r || new PhantomSubProperty()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	propid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	addtype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	substandardproperty() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.PhantomSubProperty = PhantomSubProperty;
//# sourceMappingURL=PhantomSubProperty.js.map
