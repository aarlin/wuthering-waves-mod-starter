"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WeaponBreach = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class WeaponBreach {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BreachId() {
		return this.breachid();
	}
	get Level() {
		return this.level();
	}
	get ConditionId() {
		return this.conditionid();
	}
	get LevelLimit() {
		return this.levellimit();
	}
	get Consume() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.consumeLength(),
			(t) => this.consume(t)?.key(),
			(t) => this.consume(t)?.value(),
		);
	}
	get GoldConsume() {
		return this.goldconsume();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsWeaponBreach(t, i) {
		return (i || new WeaponBreach()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	breachid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	level() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	conditionid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levellimit() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetConsumeAt(t, i) {
		return this.consume(t);
	}
	consume(t, i) {
		var e = this.J7.__offset(this.z7, 14);
		return e
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	consumeLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	goldconsume() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.WeaponBreach = WeaponBreach;
//# sourceMappingURL=WeaponBreach.js.map
