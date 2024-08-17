"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleScoreConf = void 0);
class BattleScoreConf {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Type() {
		return this.type();
	}
	get LevelGroupId() {
		return this.levelgroupid();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsBattleScoreConf(t, e) {
		return (e || new BattleScoreConf()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	type() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	levelgroupid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.BattleScoreConf = BattleScoreConf;
//# sourceMappingURL=BattleScoreConf.js.map
