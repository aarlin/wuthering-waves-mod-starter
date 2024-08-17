"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiBattleWanderGroup = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	FloatRange_1 = require("./SubType/FloatRange");
class AiBattleWanderGroup {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DistanceRange() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.distancerangeLength(),
			(t) => this.distancerange(t),
		);
	}
	get NearActionRates() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.nearactionratesLength(),
			(t) => this.nearactionrates(t),
		);
	}
	get MiddleActionRates() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.middleactionratesLength(),
			(t) => this.middleactionrates(t),
		);
	}
	get FarActionRates() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.faractionratesLength(),
			(t) => this.faractionrates(t),
		);
	}
	get TurnSpeeds() {
		return GameUtils_1.GameUtils.ConvertToArray(this.turnspeedsLength(), (t) =>
			this.turnspeeds(t),
		);
	}
	get RunTurnSpeed() {
		return this.runturnspeed();
	}
	get WanderTime() {
		return this.wandertime();
	}
	get SumWanderTime() {
		return this.sumwandertime();
	}
	get OnlyForward() {
		return this.onlyforward();
	}
	__init(t, s) {
		return (this.z7 = t), (this.J7 = s), this;
	}
	static getRootAsAiBattleWanderGroup(t, s) {
		return (s || new AiBattleWanderGroup()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetDistancerangeAt(t) {
		return this.distancerange(t);
	}
	distancerange(t) {
		var s = this.J7.__offset(this.z7, 6);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	distancerangeLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	distancerangeArray() {
		var t = this.J7.__offset(this.z7, 6);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetNearactionratesAt(t) {
		return this.nearactionrates(t);
	}
	nearactionrates(t) {
		var s = this.J7.__offset(this.z7, 8);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	nearactionratesLength() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	nearactionratesArray() {
		var t = this.J7.__offset(this.z7, 8);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetMiddleactionratesAt(t) {
		return this.middleactionrates(t);
	}
	middleactionrates(t) {
		var s = this.J7.__offset(this.z7, 10);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	middleactionratesLength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	middleactionratesArray() {
		var t = this.J7.__offset(this.z7, 10);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetFaractionratesAt(t) {
		return this.faractionrates(t);
	}
	faractionrates(t) {
		var s = this.J7.__offset(this.z7, 12);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	faractionratesLength() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	faractionratesArray() {
		var t = this.J7.__offset(this.z7, 12);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	GetTurnspeedsAt(t) {
		return this.turnspeeds(t);
	}
	turnspeeds(t) {
		var s = this.J7.__offset(this.z7, 14);
		return s ? this.J7.readFloat32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
	}
	turnspeedsLength() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	turnspeedsArray() {
		var t = this.J7.__offset(this.z7, 14);
		return t
			? new Float32Array(
					this.J7.bytes().buffer,
					this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
					this.J7.__vector_len(this.z7 + t),
				)
			: null;
	}
	runturnspeed() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readFloat32(this.z7 + t) : 360;
	}
	wandertime(t) {
		var s = this.J7.__offset(this.z7, 18);
		return s
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + s),
					this.J7,
				)
			: null;
	}
	sumwandertime(t) {
		var s = this.J7.__offset(this.z7, 20);
		return s
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + s),
					this.J7,
				)
			: null;
	}
	onlyforward() {
		var t = this.J7.__offset(this.z7, 22);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.AiBattleWanderGroup = AiBattleWanderGroup;
//# sourceMappingURL=AiBattleWanderGroup.js.map
