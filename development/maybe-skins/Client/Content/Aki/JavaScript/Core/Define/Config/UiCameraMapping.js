"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiCameraMapping = void 0);
const GameUtils_1 = require("../../../Game/GameUtils"),
	DicStringString_1 = require("./SubType/DicStringString");
class UiCameraMapping {
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
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsUiCameraMapping(t, e) {
		return (e || new UiCameraMapping()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	viewname(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	defaultuicamerasettingsname(t) {
		var e = this.J7.__offset(this.z7, 8);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	ischeckspecialstate() {
		var t = this.J7.__offset(this.z7, 10);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	specialstatecamerasettingname(t) {
		var e = this.J7.__offset(this.z7, 12);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	bplayloadingcameraanimation() {
		var t = this.J7.__offset(this.z7, 14);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	bodytargettype() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	GetBodycamerasettingsnamemapAt(t, e) {
		return this.bodycamerasettingsnamemap(t);
	}
	bodycamerasettingsnamemap(t, e) {
		var i = this.J7.__offset(this.z7, 18);
		return i
			? (e || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
					this.J7,
				)
			: null;
	}
	bodycamerasettingsnamemapLength() {
		var t = this.J7.__offset(this.z7, 18);
		return t ? this.J7.__vector_len(this.z7 + t) : 0;
	}
	defaultcamerablendname(t) {
		var e = this.J7.__offset(this.z7, 20);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	GetUicamerablendnamemapAt(t, e) {
		return this.uicamerablendnamemap(t);
	}
	uicamerablendnamemap(t, e) {
		var i = this.J7.__offset(this.z7, 22);
		return i
			? (e || new DicStringString_1.DicStringString()).__init(
					this.J7.__indirect(this.J7.__vector(this.z7 + i) + 4 * t),
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
exports.UiCameraMapping = UiCameraMapping;
//# sourceMappingURL=UiCameraMapping.js.map
