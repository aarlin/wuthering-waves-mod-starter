"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ComboTeachingCondition = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ComboTeachingCondition {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get CompleteCondition() {
		return this.completecondition();
	}
	get CompleteParam() {
		return this.completeparam();
	}
	get FailedCondition() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.failedconditionLength(),
			(t) => this.failedcondition(t),
		);
	}
	get FailedParam() {
		return GameUtils_1.GameUtils.ConvertToArray(this.failedparamLength(), (t) =>
			this.failedparam(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsComboTeachingCondition(t, i) {
		return (i || new ComboTeachingCondition()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	completecondition() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	completeparam(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetFailedconditionAt(t) {
		return this.failedcondition(t);
	}
	failedcondition(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	failedconditionLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	failedconditionArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetFailedparamAt(t) {
		return this.failedparam(t);
	}
	failedparam(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	failedparamLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.ComboTeachingCondition = ComboTeachingCondition;
//# sourceMappingURL=ComboTeachingCondition.js.map
