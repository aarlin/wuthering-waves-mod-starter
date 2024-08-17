"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CostConfig = void 0);
const GameUtils_1 = require("../../../../Game/GameUtils"),
	DicIntInt_1 = require("./DicIntInt");
class CostConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Cost() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.costLength(),
			(t) => this.cost(t)?.key(),
			(t) => this.cost(t)?.value(),
		);
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsCostConfig(t, s) {
		return (s || new CostConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	GetCostAt(t, s) {
		return this.cost(t);
	}
	cost(t, s) {
		var i = this.J7.__offset(this.z7, 4);
		return i
			? (s || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	costLength() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.CostConfig = CostConfig;
//# sourceMappingURL=CostConfig.js.map
