"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SummonCfg = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class SummonCfg {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BlueprintType() {
		return this.blueprinttype();
	}
	get SurvivalTime() {
		return this.survivaltime();
	}
	get InheritLevelType() {
		return this.inheritleveltype();
	}
	get InheritLevelParam() {
		return this.inheritlevelparam();
	}
	get AttributeType() {
		return this.attributetype();
	}
	get InheritAttributeBaseType() {
		return this.inheritattributebasetype();
	}
	get InheritSummonerAttribute() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.inheritsummonerattributeLength(),
			(t) => this.inheritsummonerattribute(t)?.key(),
			(t) => this.inheritsummonerattribute(t)?.value(),
		);
	}
	get BornBuffId() {
		return GameUtils_1.GameUtils.ConvertToArray(this.bornbuffidLength(), (t) =>
			this.bornbuffid(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsSummonCfg(t, i) {
		return (i || new SummonCfg()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	blueprinttype(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	survivaltime() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 3;
	}
	inheritleveltype() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	inheritlevelparam() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	attributetype() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	inheritattributebasetype() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetInheritsummonerattributeAt(t, i) {
		return this.inheritsummonerattribute(t);
	}
	inheritsummonerattribute(t, i) {
		var r = this.J7.__offset(this.z7, 18);
		return r
			? (i || new DicIntIntArray_1.DicIntIntArray()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	inheritsummonerattributeLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetBornbuffidAt(t) {
		return this.bornbuffid(t);
	}
	bornbuffid(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i
			? this.J7.readInt64(this.J7.__vector(this.z7 + i) + 8 * t)
			: BigInt(0);
	}
	bornbuffidLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.SummonCfg = SummonCfg;
//# sourceMappingURL=SummonCfg.js.map
