"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.GuideTips = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class GuideTips {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get GuideId() {
		return this.guideid();
	}
	get Content() {
		return this.content();
	}
	get Button() {
		return GameUtils_1.GameUtils.ConvertToArray(this.buttonLength(), (t) =>
			this.button(t),
		);
	}
	get InputEnums() {
		return GameUtils_1.GameUtils.ConvertToArray(this.inputenumsLength(), (t) =>
			this.inputenums(t),
		);
	}
	get LimitInputEnums() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.limitinputenumsLength(),
			(t) => this.limitinputenums(t),
		);
	}
	get UseLoopAnim() {
		return this.useloopanim();
	}
	get UseMask() {
		return this.usemask();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsGuideTips(t, i) {
		return (i || new GuideTips()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	guideid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	content(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetButtonAt(t) {
		return this.button(t);
	}
	button(t, i) {
		var s = this.J7.__offset(this.z7, 8);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	buttonLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetInputenumsAt(t) {
		return this.inputenums(t);
	}
	inputenums(t, i) {
		var s = this.J7.__offset(this.z7, 10);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	inputenumsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetLimitinputenumsAt(t) {
		return this.limitinputenums(t);
	}
	limitinputenums(t, i) {
		var s = this.J7.__offset(this.z7, 12);
		return s
			? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i)
			: null;
	}
	limitinputenumsLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	useloopanim() {
		var t = this.J7.__offset(this.z7, 14);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	usemask() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.GuideTips = GuideTips;
//# sourceMappingURL=GuideTips.js.map
