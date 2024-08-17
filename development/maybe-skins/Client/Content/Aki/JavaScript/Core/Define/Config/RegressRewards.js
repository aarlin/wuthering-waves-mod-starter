"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RegressRewards = void 0);
class RegressRewards {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get RewardGroup() {
		return this.rewardgroup();
	}
	__init(s, t) {
		return (this.z7 = s), (this.J7 = t), this;
	}
	static getRootAsRegressRewards(s, t) {
		return (t || new RegressRewards()).__init(
			s.readInt32(s.position()) + s.position(),
			s,
		);
	}
	id() {
		var s = this.J7.__offset(this.z7, 4);
		return s ? this.J7.readInt32(this.z7 + s) : 0;
	}
	rewardgroup() {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readInt32(this.z7 + s) : 0;
	}
}
exports.RegressRewards = RegressRewards;
//# sourceMappingURL=RegressRewards.js.map
