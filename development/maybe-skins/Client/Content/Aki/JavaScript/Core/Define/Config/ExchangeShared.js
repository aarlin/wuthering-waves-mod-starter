"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExchangeShared = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class ExchangeShared {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get MaxCount() {
		return this.maxcount();
	}
	get Cost() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.costLength(),
			(t) => this.cost(t)?.key(),
			(t) => this.cost(t)?.value(),
		);
	}
	get ResetTimeId() {
		return this.resettimeid();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsExchangeShared(t, s) {
		return (s || new ExchangeShared()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	maxcount() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetCostAt(t, s) {
		return this.cost(t);
	}
	cost(t, s) {
		var e = this.J7.__offset(this.z7, 8);
		return e
			? (s || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	costLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	resettimeid() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ExchangeShared = ExchangeShared;
//# sourceMappingURL=ExchangeShared.js.map
