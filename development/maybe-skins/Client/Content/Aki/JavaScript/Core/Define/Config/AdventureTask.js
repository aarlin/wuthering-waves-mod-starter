"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdventureTask = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntString_1 = require("./SubType/DicIntString");
class AdventureTask {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ChapterId() {
		return this.chapterid();
	}
	get TaskText() {
		return this.tasktext();
	}
	get RecordId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.recordidLength(), (t) =>
			this.recordid(t),
		);
	}
	get NeedProgress() {
		return this.needprogress();
	}
	get DropIds() {
		return this.dropids();
	}
	get PathId() {
		return this.pathid();
	}
	get JumpTo() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.jumptoLength(),
			(t) => this.jumpto(t)?.key(),
			(t) => this.jumpto(t)?.value(),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsAdventureTask(t, s) {
		return (s || new AdventureTask()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	chapterid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	tasktext(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	GetRecordidAt(t) {
		return this.recordid(t);
	}
	recordid(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	recordidLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	recordidArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	needprogress() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	dropids() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	pathid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetJumptoAt(t, s) {
		return this.jumpto(t);
	}
	jumpto(t, s) {
		var i = this.J7.__offset(this.z7, 18);
		return i
			? (s || new DicIntString_1.DicIntString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	jumptoLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.AdventureTask = AdventureTask;
//# sourceMappingURL=AdventureTask.js.map
