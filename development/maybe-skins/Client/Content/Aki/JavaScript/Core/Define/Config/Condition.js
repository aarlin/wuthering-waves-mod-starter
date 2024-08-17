"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Condition = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringString_1 = require("./SubType/DicStringString");
class Condition {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get NeedNum() {
		return this.neednum();
	}
	get LimitParams() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.limitparamsLength(),
			(t) => this.limitparams(t)?.key(),
			(t) => this.limitparams(t)?.value(),
		);
	}
	get LimitParamsOpe() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.limitparamsopeLength(),
			(t) => this.limitparamsope(t)?.key(),
			(t) => this.limitparamsope(t)?.value(),
		);
	}
	get IsClient() {
		return this.isclient();
	}
	get Description() {
		return this.description();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCondition(t, i) {
		return (i || new Condition()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	neednum() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	GetLimitparamsAt(t, i) {
		return this.limitparams(t);
	}
	limitparams(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	limitparamsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetLimitparamsopeAt(t, i) {
		return this.limitparamsope(t);
	}
	limitparamsope(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	limitparamsopeLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	isclient() {
		var t = this.J7.__offset(this.z7, 14);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	description(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.Condition = Condition;
//# sourceMappingURL=Condition.js.map
