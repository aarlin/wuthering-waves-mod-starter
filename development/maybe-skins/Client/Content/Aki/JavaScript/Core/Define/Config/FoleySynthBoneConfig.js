"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FoleySynthBoneConfig = void 0);
class FoleySynthBoneConfig {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get Name() {
		return this.name();
	}
	get BoneName() {
		return this.bonename();
	}
	get Model1Ceil() {
		return this.model1ceil();
	}
	get Model1CeilEventPath() {
		return this.model1ceileventpath();
	}
	get Model1Floor() {
		return this.model1floor();
	}
	get Model1FloorEventPath() {
		return this.model1flooreventpath();
	}
	get Model1CeilInterpolation() {
		return this.model1ceilinterpolation();
	}
	get Model1FloorInterpolation() {
		return this.model1floorinterpolation();
	}
	get Model1RtpcPath() {
		return this.model1rtpcpath();
	}
	get Model2Ceil() {
		return this.model2ceil();
	}
	get Model2CeilEventPath() {
		return this.model2ceileventpath();
	}
	get Model2Floor() {
		return this.model2floor();
	}
	get Model2FloorPath() {
		return this.model2floorpath();
	}
	get Model2FloorPrecent() {
		return this.model2floorprecent();
	}
	get Model2RptcVelocityMax() {
		return this.model2rptcvelocitymax();
	}
	get Model2RptcAccelerationMax() {
		return this.model2rptcaccelerationmax();
	}
	get Model2RptcVelocityDuring() {
		return this.model2rptcvelocityduring();
	}
	get Model2CeilInterpolation() {
		return this.model2ceilinterpolation();
	}
	get Model2FloorInterpolation() {
		return this.model2floorinterpolation();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsFoleySynthBoneConfig(t, e) {
		return (e || new FoleySynthBoneConfig()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	name(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	bonename(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	model1ceil() {
		var t = this.J7.__offset(this.z7, 10);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	model1ceileventpath(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	model1floor() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	model1flooreventpath(t) {
		var e = this.J7.__offset(this.z7, 16);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	model1ceilinterpolation() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	model1floorinterpolation() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	model1rtpcpath(t) {
		var e = this.J7.__offset(this.z7, 22);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	model2ceil() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	model2ceileventpath(t) {
		var e = this.J7.__offset(this.z7, 26);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	model2floor() {
		var t = this.J7.__offset(this.z7, 28);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	model2floorpath(t) {
		var e = this.J7.__offset(this.z7, 30);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	model2floorprecent() {
		var t = this.J7.__offset(this.z7, 32);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	model2rptcvelocitymax(t) {
		var e = this.J7.__offset(this.z7, 34);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	model2rptcaccelerationmax(t) {
		var e = this.J7.__offset(this.z7, 36);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	model2rptcvelocityduring(t) {
		var e = this.J7.__offset(this.z7, 38);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	model2ceilinterpolation() {
		var t = this.J7.__offset(this.z7, 40);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
	model2floorinterpolation() {
		var t = this.J7.__offset(this.z7, 42);
		return t ? this.J7.readFloat32(this.z7 + t) : 0;
	}
}
exports.FoleySynthBoneConfig = FoleySynthBoneConfig;
//# sourceMappingURL=FoleySynthBoneConfig.js.map
