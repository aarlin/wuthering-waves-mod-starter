"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldLevel = void 0);
class WorldLevel {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get PlayerLevelMax() {
		return this.playerlevelmax();
	}
	get ConditionGroupId() {
		return this.conditiongroupid();
	}
	get AiTeamLevelId() {
		return this.aiteamlevelid();
	}
	get TrainingLevel() {
		return this.traininglevel();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsWorldLevel(t, e) {
		return (e || new WorldLevel()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	playerlevelmax() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	conditiongroupid() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	aiteamlevelid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	traininglevel() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.WorldLevel = WorldLevel;
//# sourceMappingURL=WorldLevel.js.map
