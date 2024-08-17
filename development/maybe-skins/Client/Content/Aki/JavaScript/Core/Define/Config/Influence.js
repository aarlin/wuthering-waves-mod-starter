"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Influence = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntPair_1 = require("./SubType/IntPair");
class Influence {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Title() {
		return this.title();
	}
	get Introduction() {
		return this.introduction();
	}
	get ExtraDesc() {
		return this.extradesc();
	}
	get ShowIcon() {
		return this.showicon();
	}
	get Logo() {
		return this.logo();
	}
	get DailyTaskShow() {
		return this.dailytaskshow();
	}
	get RawRelation() {
		return this.rawrelation();
	}
	get RelationCondition() {
		return this.relationcondition();
	}
	get LastRelation() {
		return this.lastrelation();
	}
	get ReputationMax() {
		return this.reputationmax();
	}
	get ReputationItem() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.reputationitemLength(),
			(t) => this.reputationitem(t),
		);
	}
	get ReputationReward() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.reputationrewardLength(),
			(t) => this.reputationreward(t),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsInfluence(t, i) {
		return (i || new Influence()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	title(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	introduction(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	extradesc(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	showicon() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	logo(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	dailytaskshow() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 1;
	}
	rawrelation() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	relationcondition() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	lastrelation() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	reputationmax() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 1e4;
	}
	GetReputationitemAt(t, i) {
		return this.reputationitem(t);
	}
	reputationitem(t, i) {
		var r = this.J7.__offset(this.z7, 26);
		return r
			? (i || new IntPair_1.IntPair()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	reputationitemLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetReputationrewardAt(t, i) {
		return this.reputationreward(t);
	}
	reputationreward(t, i) {
		var r = this.J7.__offset(this.z7, 28);
		return r
			? (i || new IntPair_1.IntPair()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	reputationrewardLength() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.Influence = Influence;
//# sourceMappingURL=Influence.js.map
