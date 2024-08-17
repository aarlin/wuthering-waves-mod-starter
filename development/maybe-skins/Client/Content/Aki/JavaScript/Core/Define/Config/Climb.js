"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.Climb = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	FloatRange_1 = require("./SubType/FloatRange"),
	Vector_1 = require("./SubType/Vector");
class Climb {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ClimbDetectPoints() {
		return GameUtils_1.GameUtils.ConvertToArray(
			this.climbdetectpointsLength(),
			(t) => this.climbdetectpoints(t),
		);
	}
	get DetectRadius() {
		return this.detectradius();
	}
	get ClimbRadius() {
		return this.climbradius();
	}
	get ClimbFromTop() {
		return this.climbfromtop();
	}
	get ClimbVault() {
		return this.climbvault();
	}
	get ClimbOnTop() {
		return this.climbontop();
	}
	get VaultRange() {
		return this.vaultrange();
	}
	get UpArriveRange() {
		return this.uparriverange();
	}
	get ClimbSprintVault() {
		return this.climbsprintvault();
	}
	get SprintVaultRange() {
		return this.sprintvaultrange();
	}
	get ForwardBlockHeight() {
		return this.forwardblockheight();
	}
	get ForwardBlockRadius() {
		return this.forwardblockradius();
	}
	get ForwardBlockDistance() {
		return this.forwardblockdistance();
	}
	get SprintVaultLongNeedDistance() {
		return this.sprintvaultlongneeddistance();
	}
	get SprintVaultLongHeight() {
		return this.sprintvaultlongheight();
	}
	get SprintVaultLongRange() {
		return this.sprintvaultlongrange();
	}
	get BlockUpOffset() {
		return this.blockupoffset();
	}
	get BlockUpDetectRadius() {
		return this.blockupdetectradius();
	}
	get BlockUpDetectDistance() {
		return this.blockupdetectdistance();
	}
	get BlockUpBackDistance() {
		return this.blockupbackdistance();
	}
	get BlockUpBackMinDist() {
		return this.blockupbackmindist();
	}
	get BlockUpFinalMove() {
		return this.blockupfinalmove();
	}
	get BlockUpVerticalRange() {
		return this.blockupverticalrange();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsClimb(t, i) {
		return (i || new Climb()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id(t) {
		var i = this.J7.__offset(this.z7, 4);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetClimbdetectpointsAt(t, i) {
		return this.climbdetectpoints(t);
	}
	climbdetectpoints(t, i) {
		var r = this.J7.__offset(this.z7, 6);
		return r
			? (i || new Vector_1.Vector()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + r) + 4 * t),
					this.J7,
				)
			: null;
	}
	climbdetectpointsLength() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	detectradius() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 20;
	}
	climbradius() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 40;
	}
	climbfromtop(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i
			? (t || new Vector_1.Vector()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	climbvault(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i
			? (t || new Vector_1.Vector()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	climbontop(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i
			? (t || new Vector_1.Vector()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	vaultrange(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	uparriverange(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	climbsprintvault(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i
			? (t || new Vector_1.Vector()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	sprintvaultrange(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	forwardblockheight() {
		var t = this.J7.__offset(this.z7, 26);
		return t ? this.J7.readFloat32(this.z7 + t) : 50;
	}
	forwardblockradius() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readFloat32(this.z7 + t) : 30;
	}
	forwardblockdistance(t) {
		var i = this.J7.__offset(this.z7, 30);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	sprintvaultlongneeddistance() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.readFloat32(this.z7 + t) : 48;
	}
	sprintvaultlongheight() {
		var t = this.J7.__offset(this.z7, 34);
		return t ? this.J7.readFloat32(this.z7 + t) : 75;
	}
	sprintvaultlongrange(t) {
		var i = this.J7.__offset(this.z7, 36);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	blockupoffset(t) {
		var i = this.J7.__offset(this.z7, 38);
		return i
			? (t || new Vector_1.Vector()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	blockupdetectradius() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.readFloat32(this.z7 + t) : 20;
	}
	blockupdetectdistance() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.readFloat32(this.z7 + t) : 250;
	}
	blockupbackdistance() {
		var t = this.J7.__offset(this.z7, 44);
		return t ? this.J7.readFloat32(this.z7 + t) : 100;
	}
	blockupbackmindist() {
		var t = this.J7.__offset(this.z7, 46);
		return t ? this.J7.readFloat32(this.z7 + t) : 50;
	}
	blockupfinalmove(t) {
		var i = this.J7.__offset(this.z7, 48);
		return i
			? (t || new Vector_1.Vector()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
	blockupverticalrange(t) {
		var i = this.J7.__offset(this.z7, 50);
		return i
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + i),
					this.J7,
				)
			: null;
	}
}
exports.Climb = Climb;
//# sourceMappingURL=Climb.js.map
