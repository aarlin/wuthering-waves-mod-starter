"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TowerConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	IntPair_1 = require("./SubType/IntPair");
class TowerConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Season() {
		return this.season();
	}
	get Difficulty() {
		return this.difficulty();
	}
	get AreaNum() {
		return this.areanum();
	}
	get Floor() {
		return this.floor();
	}
	get InstanceId() {
		return this.instanceid();
	}
	get AreaName() {
		return this.areaname();
	}
	get Cost() {
		return this.cost();
	}
	get RecommendElement() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.recommendelementLength(),
			(t) => this.recommendelement(t),
		);
	}
	get ShowMonsters() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.showmonstersLength(),
			(t) => this.showmonsters(t),
		);
	}
	get ShowMonstersAndLevel() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.showmonstersandlevelLength(),
			(t) => this.showmonstersandlevel(t),
		);
	}
	get ShowBuffs() {
		return GameUtils_1.GameUtils.ConvertToArray(this.showbuffsLength(), (t) =>
			this.showbuffs(t),
		);
	}
	get RoleBuff() {
		return GameUtils_1.GameUtils.ConvertToArray(this.rolebuffLength(), (t) =>
			this.rolebuff(t),
		);
	}
	get MonsterBuff() {
		return GameUtils_1.GameUtils.ConvertToArray(this.monsterbuffLength(), (t) =>
			this.monsterbuff(t),
		);
	}
	get Target() {
		return GameUtils_1.GameUtils.ConvertToArray(this.targetLength(), (t) =>
			this.target(t),
		);
	}
	get TargetConfig() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.targetconfigLength(),
			(t) => this.targetconfig(t),
		);
	}
	get BgPath() {
		return this.bgpath();
	}
	get ItemBgPath() {
		return this.itembgpath();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsTowerConfig(t, s) {
		return (s || new TowerConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	season() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	difficulty() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	areanum() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	floor() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	instanceid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	areaname(t) {
		var s = this.J7.__offset(this.z7, 16);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	cost() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetRecommendelementAt(t) {
		return this.recommendelement(t);
	}
	recommendelement(t) {
		var s = this.J7.__offset(this.z7, 20);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	recommendelementLength() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	recommendelementArray() {
		var t = this.J7.__offset(this.z7, 20);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetShowmonstersAt(t) {
		return this.showmonsters(t);
	}
	showmonsters(t) {
		var s = this.J7.__offset(this.z7, 22);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	showmonstersLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	showmonstersArray() {
		var t = this.J7.__offset(this.z7, 22);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetShowmonstersandlevelAt(t, s) {
		return this.showmonstersandlevel(t);
	}
	showmonstersandlevel(t, s) {
		var i = this.J7.__offset(this.z7, 24);
		return i
			? (s || new IntPair_1.IntPair()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	showmonstersandlevelLength() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetShowbuffsAt(t) {
		return this.showbuffs(t);
	}
	showbuffs(t) {
		var s = this.J7.__offset(this.z7, 26);
		return s
			? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
			: BigInt(0);
	}
	showbuffsLength() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetRolebuffAt(t) {
		return this.rolebuff(t);
	}
	rolebuff(t) {
		var s = this.J7.__offset(this.z7, 28);
		return s
			? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
			: BigInt(0);
	}
	rolebuffLength() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetMonsterbuffAt(t) {
		return this.monsterbuff(t);
	}
	monsterbuff(t) {
		var s = this.J7.__offset(this.z7, 30);
		return s
			? this.J7.readInt64(this.J7.__vector(this.z7 + s) + 8 * t)
			: BigInt(0);
	}
	monsterbuffLength() {
		var t = this.J7.__offset(this.z7, 30);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	GetTargetAt(t) {
		return this.target(t);
	}
	target(t) {
		var s = this.J7.__offset(this.z7, 32);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	targetLength() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	targetArray() {
		var t = this.J7.__offset(this.z7, 32);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetTargetconfigAt(t) {
		return this.targetconfig(t);
	}
	targetconfig(t) {
		var s = this.J7.__offset(this.z7, 34);
		return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	targetconfigLength() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	targetconfigArray() {
		var t = this.J7.__offset(this.z7, 34);
		return t
			? new Int32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	bgpath(t) {
		var s = this.J7.__offset(this.z7, 36);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
	itembgpath(t) {
		var s = this.J7.__offset(this.z7, 38);
		return s ? this.J7.__string(this.z7 + s, t) : null;
	}
}
exports.TowerConfig = TowerConfig;
//# sourceMappingURL=TowerConfig.js.map
