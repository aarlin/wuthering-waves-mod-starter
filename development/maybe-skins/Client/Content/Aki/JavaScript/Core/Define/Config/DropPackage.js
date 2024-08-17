"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DropPackage = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class DropPackage {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ShowBg() {
		return this.showbg();
	}
	get Title() {
		return this.title();
	}
	get DropPlan() {
		return this.dropplan();
	}
	get DropPreview() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.droppreviewLength(),
			(t) => this.droppreview(t)?.key(),
			(t) => this.droppreview(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsDropPackage(t, i) {
		return (i || new DropPackage()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showbg() {
		var t = this.J7.__offset(this.z7, 6);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	dropplan() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetDroppreviewAt(t, i) {
		return this.droppreview(t);
	}
	droppreview(t, i) {
		var r = this.J7.__offset(this.z7, 12);
		return r
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	droppreviewLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.DropPackage = DropPackage;
//# sourceMappingURL=DropPackage.js.map
