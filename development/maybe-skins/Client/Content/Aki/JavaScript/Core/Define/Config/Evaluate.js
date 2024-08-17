"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Evaluate = void 0);
class Evaluate {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Content() {
		return this.content();
	}
	get Color() {
		return this.color();
	}
	get SpriteColor() {
		return this.spritecolor();
	}
	get Icon() {
		return this.icon();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsEvaluate(t, s) {
		return (s || new Evaluate()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	content(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	color(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	spritecolor(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	icon(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.Evaluate = Evaluate;
//# sourceMappingURL=Evaluate.js.map
