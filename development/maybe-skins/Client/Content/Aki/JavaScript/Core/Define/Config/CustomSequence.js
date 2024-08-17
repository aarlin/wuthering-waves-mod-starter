"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CustomSequence = void 0);
class CustomSequence {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get SeqDataPath() {
		return this.seqdatapath();
	}
	get BinderType() {
		return this.bindertype();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsCustomSequence(t, e) {
		return (e || new CustomSequence()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	seqdatapath(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	bindertype(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.CustomSequence = CustomSequence;
//# sourceMappingURL=CustomSequence.js.map
