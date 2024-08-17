"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MonitorAction = void 0);
class MonitorAction {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ConditionGroupId() {
		return this.conditiongroupid();
	}
	get ActionGroupId() {
		return this.actiongroupid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsMonitorAction(t, i) {
		return (i || new MonitorAction()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	conditiongroupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	actiongroupid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.MonitorAction = MonitorAction;
//# sourceMappingURL=MonitorAction.js.map
