"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleGuideActivity = void 0);
class RoleGuideActivity {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RoleId() {
		return this.roleid();
	}
	get RoleQuestId() {
		return this.rolequestid();
	}
	get RoleTrialId() {
		return this.roletrialid();
	}
	get ShowQuestId() {
		return this.showquestid();
	}
	get ShowQuestTips() {
		return this.showquesttips();
	}
	get ShowQuestGetWay() {
		return this.showquestgetway();
	}
	get RoleUi() {
		return this.roleui();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRoleGuideActivity(t, i) {
		return (i || new RoleGuideActivity()).__init(
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
	rolequestid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	roletrialid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showquestid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	showquesttips(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	showquestgetway(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	roleui(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.RoleGuideActivity = RoleGuideActivity;
//# sourceMappingURL=RoleGuideActivity.js.map
