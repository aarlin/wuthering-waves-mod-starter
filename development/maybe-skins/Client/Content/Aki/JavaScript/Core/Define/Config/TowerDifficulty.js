"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerDifficulty = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntPair_1 = require("./SubType/IntPair");
class TowerDifficulty {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Difficulty() {
		return this.difficulty();
	}
	get Reward() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rewardLength(), (t) =>
			this.reward(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsTowerDifficulty(t, i) {
		return (i || new TowerDifficulty()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	difficulty() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRewardAt(t, i) {
		return this.reward(t);
	}
	reward(t, i) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? (i || new IntPair_1.IntPair()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	rewardLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.TowerDifficulty = TowerDifficulty;
//# sourceMappingURL=TowerDifficulty.js.map
