"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ChildUiCameraMapping = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringString_1 = require("./SubType/DicStringString");
class ChildUiCameraMapping {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ViewName() {
		return this.viewname();
	}
	get DefaultUiCameraSettingsName() {
		return this.defaultuicamerasettingsname();
	}
	get IsCheckSpecialState() {
		return this.ischeckspecialstate();
	}
	get SpecialStateCameraSettingName() {
		return this.specialstatecamerasettingname();
	}
	get bPlayLoadingCameraAnimation() {
		return this.bplayloadingcameraanimation();
	}
	get BodyTargetType() {
		return this.bodytargettype();
	}
	get BodyCameraSettingsNameMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.bodycamerasettingsnamemapLength(),
			(t) => this.bodycamerasettingsnamemap(t)?.key(),
			(t) => this.bodycamerasettingsnamemap(t)?.value(),
		);
	}
	get DefaultCameraBlendName() {
		return this.defaultcamerablendname();
	}
	get UiCameraBlendNameMap() {
		return GameUtils_1.GameUtils.ConvertToMap(
			this.uicamerablendnamemapLength(),
			(t) => this.uicamerablendnamemap(t)?.key(),
			(t) => this.uicamerablendnamemap(t)?.value(),
		);
	}
	get UiCameraDelayTime() {
		return this.uicameradelaytime();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsChildUiCameraMapping(t, i) {
		return (i || new ChildUiCameraMapping()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	viewname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	defaultuicamerasettingsname(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	ischeckspecialstate() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	specialstatecamerasettingname(t) {
		var i = this.J7.__offset(this.z7, 12);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	bplayloadingcameraanimation() {
		var t = this.J7.__offset(this.z7, 14);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	bodytargettype() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBodycamerasettingsnamemapAt(t, i) {
		return this.bodycamerasettingsnamemap(t);
	}
	bodycamerasettingsnamemap(t, i) {
		var e = this.J7.__offset(this.z7, 18);
		return e
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	bodycamerasettingsnamemapLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultcamerablendname(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	GetUicamerablendnamemapAt(t, i) {
		return this.uicamerablendnamemap(t);
	}
	uicamerablendnamemap(t, i) {
		var e = this.J7.__offset(this.z7, 22);
		return e
			? (i || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + e) + 4 * t),
					this.J7,
				)
			: null;
	}
	uicamerablendnamemapLength() {
		var t = this.J7.__offset(this.z7, 22);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	uicameradelaytime() {
		var t = this.J7.__offset(this.z7, 24);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
}
exports.ChildUiCameraMapping = ChildUiCameraMapping;
//# sourceMappingURL=ChildUiCameraMapping.js.map
