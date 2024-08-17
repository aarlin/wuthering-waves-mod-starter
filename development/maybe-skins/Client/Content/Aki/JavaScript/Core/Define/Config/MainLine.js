"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MainLine = void 0);
class MainLine {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TaskId() {
		return this.taskid();
	}
	get PrevTaskId() {
		return this.prevtaskid();
	}
	get Icon() {
		return this.icon();
	}
	get UnlockTip() {
		return this.unlocktip();
	}
	get TaskName() {
		return this.taskname();
	}
	get TaskType() {
		return this.tasktype();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMainLine(t, i) {
		return (i || new MainLine()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	taskid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	prevtaskid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	unlocktip(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	taskname(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tasktype() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.MainLine = MainLine;
//# sourceMappingURL=MainLine.js.map
