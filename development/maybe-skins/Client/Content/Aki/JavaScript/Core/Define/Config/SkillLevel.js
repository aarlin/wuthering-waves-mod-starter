"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SkillLevel = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class SkillLevel {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get SkillLevelGroupId() {
		return this.skilllevelgroupid();
	}
	get SkillId() {
		return this.skillid();
	}
	get LevelNewDescribe() {
		return this.levelnewdescribe();
	}
	get Consume() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.consumeLength(),
			(t) => this.consume(t)?.key(),
			(t) => this.consume(t)?.value(),
		);
	}
	get Condition() {
		return this.condition();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSkillLevel(t, i) {
		return (i || new SkillLevel()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skilllevelgroupid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	skillid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelnewdescribe(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetConsumeAt(t, i) {
		return this.consume(t);
	}
	consume(t, i) {
		var e = this.J7.__offset(this.z7, 12);
		return e
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	consumeLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	condition() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.SkillLevel = SkillLevel;
//# sourceMappingURL=SkillLevel.js.map
