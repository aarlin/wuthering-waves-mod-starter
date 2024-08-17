"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattlePassTask = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class BattlePassTask {
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
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsBattlePassTask(t, s) {
		return (s || new BattlePassTask()).__init(
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
		var e = this.J7.__offset(this.z7, 10);
		return e
			? (s || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	taskrewardLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.BattlePassTask = BattlePassTask;
//# sourceMappingURL=BattlePassTask.js.map
