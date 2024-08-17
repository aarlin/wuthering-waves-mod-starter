"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiSkillPrecondition = void 0);
const FloatRange_1 = require("./SubType/FloatRange");
class AiSkillPrecondition {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get DistanceRange() {
		return this.distancerange();
	}
	get AngleRange() {
		return this.anglerange();
	}
	get TargetAngleRange() {
		return this.targetanglerange();
	}
	get HeightRange() {
		return this.heightrange();
	}
	get NeedTag() {
		return this.needtag();
	}
	get NeedTarget() {
		return this.needtarget();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsAiSkillPrecondition(t, e) {
		return (e || new AiSkillPrecondition()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	distancerange(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	anglerange(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	targetanglerange(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	heightrange(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e
			? (t || new FloatRange_1.FloatRange()).__init(
					this.J7.__indirect(this.z7 + e),
					this.J7,
				)
			: null;
	}
	needtag(t) {
		var e = this.J7.__offset(this.z7, 14);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	needtarget() {
		var t = this.J7.__offset(this.z7, 16);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
}
exports.AiSkillPrecondition = AiSkillPrecondition;
//# sourceMappingURL=AiSkillPrecondition.js.map
