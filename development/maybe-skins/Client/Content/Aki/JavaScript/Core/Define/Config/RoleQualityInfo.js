"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleQualityInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicIntInt_1 = require("./SubType/DicIntInt");
class RoleQualityInfo {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get Icon() {
		return this.icon();
	}
	get QualityColor() {
		return this.qualitycolor();
	}
	get Image() {
		return this.image();
	}
	get GachaQualityImage() {
		return this.gachaqualityimage();
	}
	get SpiloverCompensate() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.spilovercompensateLength(),
			(t) => this.spilovercompensate(t)?.key(),
			(t) => this.spilovercompensate(t)?.value(),
		);
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsRoleQualityInfo(t, i) {
		return (i || new RoleQualityInfo()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	qualitycolor(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	image(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	gachaqualityimage(t) {
		var i = this.J7.__offset(this.z7, 14);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetSpilovercompensateAt(t, i) {
		return this.spilovercompensate(t);
	}
	spilovercompensate(t, i) {
		var s = this.J7.__offset(this.z7, 16);
		return s
			? (i || new DicIntInt_1.DicIntInt()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + s) + 4 * t),
					this.J7,
				)
			: null;
	}
	spilovercompensateLength() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
}
exports.RoleQualityInfo = RoleQualityInfo;
//# sourceMappingURL=RoleQualityInfo.js.map
