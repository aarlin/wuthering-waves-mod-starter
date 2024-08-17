"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CircumFluenceTask = void 0);
class CircumFluenceTask {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TaskType() {
		return this.tasktype();
	}
	get TargetName() {
		return this.targetname();
	}
	get TaskSubType() {
		return this.tasksubtype();
	}
	get TargetReward() {
		return this.targetreward();
	}
	get TargetFunc() {
		return this.targetfunc();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsCircumFluenceTask(t, s) {
		return (s || new CircumFluenceTask()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	tasktype() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 2;
	}
	targetname(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	tasksubtype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	targetreward() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	targetfunc() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.CircumFluenceTask = CircumFluenceTask;
//# sourceMappingURL=CircumFluenceTask.js.map
