"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapNote = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class MapNote {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get Icon() {
		return this.icon();
	}
	get Desc() {
		return this.desc();
	}
	get Priority() {
		return this.priority();
	}
	get Rank() {
		return this.rank();
	}
	get MarkIdMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.markidmapLength(),
			(t) => this.markidmap(t)?.key(),
			(t) => this.markidmap(t)?.value(),
		);
	}
	get MarkId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.markidLength(), (t) =>
			this.markid(t),
		);
	}
	get ConditionId() {
		return this.conditionid();
	}
	get QuestIdList() {
		return GameUtils_1.GameUtils.ConvertToArray(this.questidlistLength(), (t) =>
			this.questidlist(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMapNote(t, i) {
		return (i || new MapNote()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	desc(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	priority() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rank() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetMarkidmapAt(t, i) {
		return this.markidmap(t);
	}
	markidmap(t, i) {
		var s = this.J7.__offset(this.z7, 16);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	markidmapLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetMarkidAt(t) {
		return this.markid(t);
	}
	markid(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	markidLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	markidArray() {
		var t = this.J7.__offset(this.z7, 18);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	conditionid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetQuestidlistAt(t) {
		return this.questidlist(t);
	}
	questidlist(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
	}
	questidlistLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	questidlistArray() {
		var t = this.J7.__offset(this.z7, 22);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
}
exports.MapNote = MapNote;
//# sourceMappingURL=MapNote.js.map
