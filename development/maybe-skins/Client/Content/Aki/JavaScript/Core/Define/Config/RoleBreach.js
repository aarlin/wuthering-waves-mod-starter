"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleBreach = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class RoleBreach {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BreachGroupId() {
		return this.breachgroupid();
	}
	get BreachLevel() {
		return this.breachlevel();
	}
	get MaxLevel() {
		return this.maxlevel();
	}
	get BreachConsume() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.breachconsumeLength(),
			(t) => this.breachconsume(t)?.key(),
			(t) => this.breachconsume(t)?.value(),
		);
	}
	get BreachReward() {
		return this.breachreward();
	}
	get ConditionId() {
		return this.conditionid();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsRoleBreach(t, e) {
		return (e || new RoleBreach()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	breachgroupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	breachlevel() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxlevel() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBreachconsumeAt(t, e) {
		return this.breachconsume(t);
	}
	breachconsume(t, e) {
		var r = this.J7.__offset(this.z7, 12);
		return r
			? (e || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	breachconsumeLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	breachreward() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	conditionid() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.RoleBreach = RoleBreach;
//# sourceMappingURL=RoleBreach.js.map
