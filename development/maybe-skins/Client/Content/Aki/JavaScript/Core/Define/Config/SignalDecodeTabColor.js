"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SignalDecodeTabColor = void 0);
class SignalDecodeTabColor {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActiveColor() {
		return this.activecolor();
	}
	get DefaultColor() {
		return this.defaultcolor();
	}
	get VacancyColor() {
		return this.vacancycolor();
	}
	get HighlightColor() {
		return this.highlightcolor();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsSignalDecodeTabColor(t, r) {
		return (r || new SignalDecodeTabColor()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	activecolor(t) {
		var r = this.J7.__offset(this.z7, 6);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	defaultcolor(t) {
		var r = this.J7.__offset(this.z7, 8);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	vacancycolor(t) {
		var r = this.J7.__offset(this.z7, 10);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
	highlightcolor(t) {
		var r = this.J7.__offset(this.z7, 12);
		return r ? this.J7.__string(this.z7 + r, t) : null;
	}
}
exports.SignalDecodeTabColor = SignalDecodeTabColor;
//# sourceMappingURL=SignalDecodeTabColor.js.map
