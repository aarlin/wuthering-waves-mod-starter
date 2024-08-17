"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDefenceReward = void 0);
class TowerDefenceReward {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActivityId() {
		return this.activityid();
	}
	get Score() {
		return this.score();
	}
	get RewardId() {
		return this.rewardid();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsTowerDefenceReward(t, e) {
		return (e || new TowerDefenceReward()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	activityid() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	score() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	rewardid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.TowerDefenceReward = TowerDefenceReward;
//# sourceMappingURL=TowerDefenceReward.js.map
