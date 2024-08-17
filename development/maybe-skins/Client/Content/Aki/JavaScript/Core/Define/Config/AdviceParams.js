"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceParams = void 0);
class AdviceParams {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Title() {
		return this.title();
	}
	get Content() {
		return this.content();
	}
	get MotionImg() {
		return this.motionimg();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsAdviceParams(t, i) {
		return (i || new AdviceParams()).__init(
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
	content(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	motionimg(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.AdviceParams = AdviceParams;
//# sourceMappingURL=AdviceParams.js.map
