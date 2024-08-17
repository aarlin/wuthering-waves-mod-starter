"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.OpenAndCloseViewHotKey = void 0);
class OpenAndCloseViewHotKey {
	constructor() {
		(this.J7 = null), (this.z7 = 0);
	}
	get Id() {
		return this.id();
	}
	get ActionName() {
		return this.actionname();
	}
	get InputControllerType() {
		return this.inputcontrollertype();
	}
	get ViewName() {
		return this.viewname();
	}
	get IsPressTrigger() {
		return this.ispresstrigger();
	}
	get PressStartTime() {
		return this.pressstarttime();
	}
	get PressTriggerTime() {
		return this.presstriggertime();
	}
	get IsReleaseTrigger() {
		return this.isreleasetrigger();
	}
	get ReleaseInvalidTime() {
		return this.releaseinvalidtime();
	}
	get IsPressClose() {
		return this.ispressclose();
	}
	get IsReleaseClose() {
		return this.isreleaseclose();
	}
	__init(t, e) {
		return (this.z7 = t), (this.J7 = e), this;
	}
	static getRootAsOpenAndCloseViewHotKey(t, e) {
		return (e || new OpenAndCloseViewHotKey()).__init(
			t.readInt32(t.position()) + t.position(),
			t,
		);
	}
	id() {
		var t = this.J7.__offset(this.z7, 4);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	actionname(t) {
		var e = this.J7.__offset(this.z7, 6);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	inputcontrollertype() {
		var t = this.J7.__offset(this.z7, 8);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	viewname(t) {
		var e = this.J7.__offset(this.z7, 10);
		return e ? this.J7.__string(this.z7 + e, t) : null;
	}
	ispresstrigger() {
		var t = this.J7.__offset(this.z7, 12);
		return !t || !!this.J7.readInt8(this.z7 + t);
	}
	pressstarttime() {
		var t = this.J7.__offset(this.z7, 14);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	presstriggertime() {
		var t = this.J7.__offset(this.z7, 16);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	isreleasetrigger() {
		var t = this.J7.__offset(this.z7, 18);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	releaseinvalidtime() {
		var t = this.J7.__offset(this.z7, 20);
		return t ? this.J7.readInt32(this.z7 + t) : 0;
	}
	ispressclose() {
		var t = this.J7.__offset(this.z7, 22);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
	isreleaseclose() {
		var t = this.J7.__offset(this.z7, 24);
		return !!t && !!this.J7.readInt8(this.z7 + t);
	}
}
exports.OpenAndCloseViewHotKey = OpenAndCloseViewHotKey;
//# sourceMappingURL=OpenAndCloseViewHotKey.js.map
