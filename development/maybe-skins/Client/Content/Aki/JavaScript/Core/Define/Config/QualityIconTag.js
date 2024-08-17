"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.QualityIconTag = void 0);
class QualityIconTag {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ConfigParam() {
		return this.configparam();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsQualityIconTag(t, i) {
		return (i || new QualityIconTag()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	configparam(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.QualityIconTag = QualityIconTag;
//# sourceMappingURL=QualityIconTag.js.map
