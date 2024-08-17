"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RewardConfig = void 0);
class RewardConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Reward() {
		return this.reward();
	}
	__init(t, r) {
		return (this.z7 = t), (this.J7 = r), this;
	}
	static getRootAsRewardConfig(t, r) {
		return (r || new RewardConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	reward() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.RewardConfig = RewardConfig;
//# sourceMappingURL=RewardConfig.js.map
