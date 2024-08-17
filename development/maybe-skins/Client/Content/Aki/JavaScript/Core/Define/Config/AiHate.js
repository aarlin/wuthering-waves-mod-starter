"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiHate = void 0);
const FloatRange_1 = require("./SubType/FloatRange");
class AiHate {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get BaseHatred() {
		return this.basehatred();
	}
	get DecreaseRate() {
		return this.decreaserate();
	}
	get DecreaseTimeLength() {
		return this.decreasetimelength();
	}
	get DecreaseTimeCd() {
		return this.decreasetimecd();
	}
	get IncreaseRateWhenDecreasing() {
		return this.increaseratewhendecreasing();
	}
	get MinClearTime() {
		return this.mincleartime();
	}
	get DisengageDistanceRange() {
		return this.disengagedistancerange();
	}
	get DisengageTimeRange() {
		return this.disengagetimerange();
	}
	get DisengageHeightRange() {
		return this.disengageheightrange();
	}
	get DisengageHeightRangeMax() {
		return this.disengageheightrangemax();
	}
	get DisengageBornDistance() {
		return this.disengageborndistance();
	}
	get MaxMoveFromBorn() {
		return this.maxmovefromborn();
	}
	get ExcludeTag() {
		return this.excludetag();
	}
	get SwornHatredTag() {
		return this.swornhatredtag();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsAiHate(t, e) {
		return (e || new AiHate()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	basehatred() {
		var t = this.J7.__offset(this.z7, 6);
		return t ? this.J7.readFloat32(this.z7 + t) : 1;
	}
	decreaserate() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readFloat32(this.z7 + t) : 0.8;
	}
	decreasetimelength() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 5e3;
	}
	decreasetimecd() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readFloat32(this.z7 + t) : 1e4;
	}
	increaseratewhendecreasing() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readFloat32(this.z7 + t) : 1;
	}
	mincleartime() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readFloat32(this.z7 + t) : 1e3;
	}
	disengagedistancerange(t) {
		var e = this.J7.__offset(this.z7, 18);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	disengagetimerange(t) {
		var e = this.J7.__offset(this.z7, 20);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	disengageheightrange(t) {
		var e = this.J7.__offset(this.z7, 22);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	disengageheightrangemax(t) {
		var e = this.J7.__offset(this.z7, 24);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	disengageborndistance(t) {
		var e = this.J7.__offset(this.z7, 26);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	maxmovefromborn() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readFloat32(this.z7 + t) : -1;
	}
	excludetag(t) {
		var e = this.J7.__offset(this.z7, 30);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	swornhatredtag(t) {
		var e = this.J7.__offset(this.z7, 32);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
}
exports.AiHate = AiHate;
//# sourceMappingURL=AiHate.js.map
