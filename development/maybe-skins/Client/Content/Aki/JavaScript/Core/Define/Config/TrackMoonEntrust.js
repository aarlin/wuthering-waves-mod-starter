"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TrackMoonEntrust = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class TrackMoonEntrust {
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
	get UnlockCondition() {
		return this.unlockcondition();
	}
	get Guaranteed() {
		return this.guaranteed();
	}
	get JumpType() {
		return this.jumptype();
	}
	get JumpParam() {
		return this.jumpparam();
	}
	get CapacityMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.capacitymapLength(),
			(t) => this.capacitymap(t)?.key(),
			(t) => this.capacitymap(t)?.value(),
		);
	}
	get Consume() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.consumeLength(),
			(t) => this.consume(t)?.key(),
			(t) => this.consume(t)?.value(),
		);
	}
	get Star() {
		return this.star();
	}
	get EntrustType() {
		return this.entrusttype();
	}
	get IdeaSuccRatio() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.ideasuccratioLength(),
			(t) => this.ideasuccratio(t)?.key(),
			(t) => this.ideasuccratio(t)?.value(),
		);
	}
	get IdeaSuccMul() {
		return GameUtils_1.GameUtils.ConvertToArray(this.ideasuccmulLength(), (t) =>
			this.ideasuccmul(t),
		);
	}
	get AttributionSuccRatio() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.attributionsuccratioLength(),
			(t) => this.attributionsuccratio(t),
		);
	}
	get AttributeMaxValue() {
		return this.attributemaxvalue();
	}
	get InvestLimit() {
		return this.investlimit();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsTrackMoonEntrust(t, i) {
		return (i || new TrackMoonEntrust()).__init(
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
	unlockcondition() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	guaranteed() {
		var t = this.J7.__offset(this.z7, 12);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	jumptype() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	jumpparam() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetCapacitymapAt(t, i) {
		return this.capacitymap(t);
	}
	capacitymap(t, i) {
		var s = this.J7.__offset(this.z7, 18);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	capacitymapLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetConsumeAt(t, i) {
		return this.consume(t);
	}
	consume(t, i) {
		var s = this.J7.__offset(this.z7, 20);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	consumeLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	star() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	entrusttype() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetIdeasuccratioAt(t, i) {
		return this.ideasuccratio(t);
	}
	ideasuccratio(t, i) {
		var s = this.J7.__offset(this.z7, 26);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	ideasuccratioLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetIdeasuccmulAt(t) {
		return this.ideasuccmul(t);
	}
	ideasuccmul(t) {
		var i = this.J7.__offset(this.z7, 28);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	ideasuccmulLength() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	ideasuccmulArray() {
		var t = this.J7.__offset(this.z7, 28);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetAttributionsuccratioAt(t) {
		return this.attributionsuccratio(t);
	}
	attributionsuccratio(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	attributionsuccratioLength() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	attributionsuccratioArray() {
		var t = this.J7.__offset(this.z7, 30);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	attributemaxvalue() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	investlimit() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TrackMoonEntrust = TrackMoonEntrust;
//# sourceMappingURL=TrackMoonEntrust.js.map
