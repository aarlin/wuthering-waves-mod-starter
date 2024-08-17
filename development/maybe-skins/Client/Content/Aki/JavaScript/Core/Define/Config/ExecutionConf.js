"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExecutionConf = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class ExecutionConf {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ExecutionRoleId() {
		return this.executionroleid();
	}
	get ExecutionSkillId() {
		return this.executionskillid();
	}
	get LimitExecutionTags() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.limitexecutiontagsLength(),
			(t) => this.limitexecutiontags(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsExecutionConf(t, i) {
		return (i || new ExecutionConf()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	executionroleid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	executionskillid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetLimitexecutiontagsAt(t) {
		return this.limitexecutiontags(t);
	}
	limitexecutiontags(t, i) {
		var e = this.J7.__offset(this.z7, 10);
		return e
			? this.J7.__string(this.J7.__vector(this.z7 + e) + 4 * t, i)
			: null;
	}
	limitexecutiontagsLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.ExecutionConf = ExecutionConf;
//# sourceMappingURL=ExecutionConf.js.map
