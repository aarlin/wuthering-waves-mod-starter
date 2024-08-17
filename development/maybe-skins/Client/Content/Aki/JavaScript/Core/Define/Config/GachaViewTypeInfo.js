"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GachaViewTypeInfo = void 0);
class GachaViewTypeInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Type() {
		return this.type();
	}
	get TagText() {
		return this.tagtext();
	}
	get TagColor() {
		return this.tagcolor();
	}
	get TypeText() {
		return this.typetext();
	}
	get OptionalTitle() {
		return this.optionaltitle();
	}
	get OptionalDesc() {
		return this.optionaldesc();
	}
	get GachaButtonTip() {
		return this.gachabuttontip();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGachaViewTypeInfo(t, i) {
		return (i || new GachaViewTypeInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	type() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	tagtext(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tagcolor(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	typetext(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	optionaltitle(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	optionaldesc(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	gachabuttontip(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.GachaViewTypeInfo = GachaViewTypeInfo;
//# sourceMappingURL=GachaViewTypeInfo.js.map
