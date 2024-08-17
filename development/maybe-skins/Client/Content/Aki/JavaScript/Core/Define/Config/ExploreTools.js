"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExploreTools = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class ExploreTools {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get PhantomSkillId() {
		return this.phantomskillid();
	}
	get Name() {
		return this.name();
	}
	get SkillType() {
		return this.skilltype();
	}
	get CurrentSkillInfo() {
		return this.currentskillinfo();
	}
	get HelpId() {
		return this.helpid();
	}
	get Icon() {
		return this.icon();
	}
	get BackGround() {
		return this.background();
	}
	get BattleViewIcon() {
		return this.battleviewicon();
	}
	get SortId() {
		return this.sortid();
	}
	get AutoFill() {
		return this.autofill();
	}
	get ShowUnlock() {
		return this.showunlock();
	}
	get SkillGroupId() {
		return this.skillgroupid();
	}
	get IsUseInPhantomTeam() {
		return this.isuseinphantomteam();
	}
	get Cost() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.costLength(),
			(t) => this.cost(t)?.key(),
			(t) => this.cost(t)?.value(),
		);
	}
	get Authorization() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.authorizationLength(),
			(t) => this.authorization(t)?.key(),
			(t) => this.authorization(t)?.value(),
		);
	}
	get SummonConfigId() {
		return this.summonconfigid();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsExploreTools(t, i) {
		return (i || new ExploreTools()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	phantomskillid() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	skilltype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	currentskillinfo(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	helpid() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	background(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	battleviewicon(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	sortid() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	autofill() {
		var t = this.J7.__offset(this.z7, 22);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	showunlock() {
		var t = this.J7.__offset(this.z7, 24);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	skillgroupid() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	isuseinphantomteam() {
		var t = this.J7.__offset(this.z7, 28);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	GetCostAt(t, i) {
		return this.cost(t);
	}
	cost(t, i) {
		var s = this.J7.__offset(this.z7, 30);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	costLength() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetAuthorizationAt(t, i) {
		return this.authorization(t);
	}
	authorization(t, i) {
		var s = this.J7.__offset(this.z7, 32);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	authorizationLength() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	summonconfigid() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ExploreTools = ExploreTools;
//# sourceMappingURL=ExploreTools.js.map
