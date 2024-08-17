"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CircumBase = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class CircumBase {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get EntryType() {
		return this.entrytype();
	}
	get ArgId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.argidLength(), (t) =>
			this.argid(t),
		);
	}
	get Title() {
		return this.title();
	}
	get GachaId() {
		return this.gachaid();
	}
	get SubTitle() {
		return this.subtitle();
	}
	get BgPathF() {
		return this.bgpathf();
	}
	get BgPath() {
		return this.bgpath();
	}
	get Description() {
		return this.description();
	}
	get RewardPreview() {
		return this.rewardpreview();
	}
	get ShowCondition() {
		return this.showcondition();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsCircumBase(t, i) {
		return (i || new CircumBase()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entrytype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetArgidAt(t) {
		return this.argid(t);
	}
	argid(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	argidLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	argidArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	gachaid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	subtitle(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	bgpathf(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	bgpath(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	description(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	rewardpreview() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showcondition() {
		var t = this.J7.__offset(this.z7, 24);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
}
exports.CircumBase = CircumBase;
//# sourceMappingURL=CircumBase.js.map
