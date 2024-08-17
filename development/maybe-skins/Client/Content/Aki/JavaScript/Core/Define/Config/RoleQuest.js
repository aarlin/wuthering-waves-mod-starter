"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleQuest = void 0);
class RoleQuest {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get Region() {
		return this.region();
	}
	get IsShow() {
		return this.isshow();
	}
	get QuestId() {
		return this.questid();
	}
	get QuestName() {
		return this.questname();
	}
	get Chapter() {
		return this.chapter();
	}
	get Consume() {
		return this.consume();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsRoleQuest(t, s) {
		return (s || new RoleQuest()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roleid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	region(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	isshow() {
		var t = this.J7.__offset(this.z7, 10);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	questid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	questname(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	chapter(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	consume() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
}
exports.RoleQuest = RoleQuest;
//# sourceMappingURL=RoleQuest.js.map
