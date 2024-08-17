"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiDynamicTab = void 0);
class UiDynamicTab {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ParentViewName() {
		return this.parentviewname();
	}
	get ChildViewName() {
		return this.childviewname();
	}
	get TabName() {
		return this.tabname();
	}
	get TabIndex() {
		return this.tabindex();
	}
	get FunctionId() {
		return this.functionid();
	}
	get UiCameraSettingsName() {
		return this.uicamerasettingsname();
	}
	get UiCameraBlendName() {
		return this.uicamerablendname();
	}
	get BackViewBlendName() {
		return this.backviewblendname();
	}
	get Icon() {
		return this.icon();
	}
	get LightSequence() {
		return this.lightsequence();
	}
	__init(t, i) {
		return (this.z7 = t), (this.J7 = i), this;
	}
	static getRootAsUiDynamicTab(t, i) {
		return (i || new UiDynamicTab()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	parentviewname(t) {
		var i = this.J7.__offset(this.z7, 6);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	childviewname(t) {
		var i = this.J7.__offset(this.z7, 8);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tabname(t) {
		var i = this.J7.__offset(this.z7, 10);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	tabindex() {
		var t = this.J7.__offset(this.z7, 12);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	functionid() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	uicamerasettingsname(t) {
		var i = this.J7.__offset(this.z7, 16);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	uicamerablendname(t) {
		var i = this.J7.__offset(this.z7, 18);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	backviewblendname(t) {
		var i = this.J7.__offset(this.z7, 20);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	icon(t) {
		var i = this.J7.__offset(this.z7, 22);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
	lightsequence(t) {
		var i = this.J7.__offset(this.z7, 24);
		return i ? this.J7.__string(this.z7 + i, t) : null;
	}
}
exports.UiDynamicTab = UiDynamicTab;
//# sourceMappingURL=UiDynamicTab.js.map
