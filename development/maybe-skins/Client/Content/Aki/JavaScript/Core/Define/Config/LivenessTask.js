"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LivenessTask = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class LivenessTask {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get TaskId() {
		return this.taskid();
	}
	get TaskName() {
		return this.taskname();
	}
	get UpdateType() {
		return this.updatetype();
	}
	get TaskReward() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.taskrewardLength(),
			(t) => this.taskreward(t)?.key(),
			(t) => this.taskreward(t)?.value(),
		);
	}
	get TaskFunc() {
		return GameUtils_1.GameUtils.ConvertToArray(this.taskfuncLength(), (t) =>
			this.taskfunc(t),
		);
	}
	get UnlockCondition() {
		return this.unlockcondition();
	}
	get SortRank() {
		return this.sortrank();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsLivenessTask(t, s) {
		return (s || new LivenessTask()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	taskid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	taskname(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	updatetype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetTaskrewardAt(t, s) {
		return this.taskreward(t);
	}
	taskreward(t, s) {
		var i = this.J7.__offset(this.z7, 10);
		return i
			? (s || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	taskrewardLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetTaskfuncAt(t) {
		return this.taskfunc(t);
	}
	taskfunc(t, s) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
			: null;
	}
	taskfuncLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	unlockcondition() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	sortrank() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.LivenessTask = LivenessTask;
//# sourceMappingURL=LivenessTask.js.map
