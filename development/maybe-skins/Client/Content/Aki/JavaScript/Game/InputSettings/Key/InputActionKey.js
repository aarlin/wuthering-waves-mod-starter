"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputActionKey = void 0);
const UE = require("ue"),
	InputSettings_1 = require("../InputSettings");
class InputActionKey {
	constructor() {
		(this.ActionName = ""),
			(this.IsAlt = !1),
			(this.IsCmd = !1),
			(this.IsCtrl = !1),
			(this.IsShift = !1),
			(this.KeyName = "");
	}
	static New(t, e, i, n, s, r) {
		var I = new InputActionKey();
		return (
			(I.ActionName = t),
			(I.IsShift = e),
			(I.IsCtrl = i),
			(I.IsAlt = n),
			(I.IsCmd = s),
			(I.KeyName = r),
			I
		);
	}
	static NewByInputActionKeyMapping(t) {
		var e = new InputActionKey();
		return (
			(e.ActionName = t.ActionName.toString()),
			(e.IsShift = t.bShift),
			(e.IsCtrl = t.bCtrl),
			(e.IsAlt = t.bAlt),
			(e.IsCmd = t.bCmd),
			(e.KeyName = t.Key.KeyName.toString()),
			e
		);
	}
	ToUeInputActionKeyMapping() {
		var t = new UE.FName(this.ActionName),
			e = new UE.FName(this.KeyName);
		e = new UE.Key(e);
		return new UE.InputActionKeyMapping(
			t,
			this.IsShift,
			this.IsCtrl,
			this.IsAlt,
			this.IsCmd,
			e,
		);
	}
	GetKey() {
		return InputSettings_1.InputSettings.GetKey(this.KeyName);
	}
	GetKeyIconPath() {
		return this.GetKey()?.GetKeyIconPath() ?? "";
	}
	IsEqual(t) {
		return (
			this.ActionName === t.ActionName.toString() &&
			this.KeyName === t.Key.KeyName.toString() &&
			this.IsAlt === t.bAlt &&
			this.IsCmd === t.bCmd &&
			this.IsCtrl === t.bCtrl &&
			this.IsShift === t.bShift
		);
	}
}
exports.InputActionKey = InputActionKey;
