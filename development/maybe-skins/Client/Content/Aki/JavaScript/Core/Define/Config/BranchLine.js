"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BranchLine = void 0);
class BranchLine {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get TaskId() {
		return this.taskid();
	}
	get JumpBuildingId() {
		return this.jumpbuildingid();
	}
	get AssociateRole() {
		return this.associaterole();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsBranchLine(t, i) {
		return (i || new BranchLine()).__init(
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
	jumpbuildingid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	associaterole() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.BranchLine = BranchLine;
//# sourceMappingURL=BranchLine.js.map
