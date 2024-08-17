"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FunctionCondition = void 0);
class FunctionCondition {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get FunctionId() {
		return this.functionid();
	}
	get Name() {
		return this.name();
	}
	get IsOn() {
		return this.ison();
	}
	get OpenConditionId() {
		return this.openconditionid();
	}
	get ShowUIType() {
		return this.showuitype();
	}
	get Delay() {
		return this.delay();
	}
	get Title() {
		return this.title();
	}
	get Desc() {
		return this.desc();
	}
	get Icon() {
		return this.icon();
	}
	get IconSprite() {
		return this.iconsprite();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsFunctionCondition(t, i) {
		return (i || new FunctionCondition()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	functionid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	ison() {
		var t = this.J7.__offset(this.z7, 8);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	openconditionid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showuitype() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	delay() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 101;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	desc(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	iconsprite(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.FunctionCondition = FunctionCondition;
//# sourceMappingURL=FunctionCondition.js.map
