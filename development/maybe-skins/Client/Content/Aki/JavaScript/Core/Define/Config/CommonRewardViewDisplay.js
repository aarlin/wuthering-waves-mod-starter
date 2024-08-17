"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CommonRewardViewDisplay = void 0);
class CommonRewardViewDisplay {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Title() {
		return this.title();
	}
	get ContinueText() {
		return this.continuetext();
	}
	get IsItemVisible() {
		return this.isitemvisible();
	}
	get IsSuccess() {
		return this.issuccess();
	}
	get AudioId() {
		return this.audioid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCommonRewardViewDisplay(t, i) {
		return (i || new CommonRewardViewDisplay()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	continuetext(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	isitemvisible() {
		var t = this.J7.__offset(this.z7, 10);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	issuccess() {
		var t = this.J7.__offset(this.z7, 12);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	audioid(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.CommonRewardViewDisplay = CommonRewardViewDisplay;
//# sourceMappingURL=CommonRewardViewDisplay.js.map
