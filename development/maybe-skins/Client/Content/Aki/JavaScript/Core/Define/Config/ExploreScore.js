"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreScore = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class ExploreScore {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Area() {
		return this.area();
	}
	get ExploreScore() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.explorescoreLength(),
			(t) => this.explorescore(t)?.key(),
			(t) => this.explorescore(t)?.value(),
		);
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsExploreScore(t, e) {
		return (e || new ExploreScore()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	area() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetExplorescoreAt(t, e) {
		return this.explorescore(t);
	}
	explorescore(t, e) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? (e || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	explorescoreLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.ExploreScore = ExploreScore;
//# sourceMappingURL=ExploreScore.js.map
