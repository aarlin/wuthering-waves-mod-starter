"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputCombinationActionKey = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	InputSettings_1 = require("../InputSettings");
class InputCombinationActionKey {
	constructor() {
		(this.ActionName = ""),
			(this.MainKeyName = ""),
			(this.SecondaryKeyName = "");
	}
	static New(e, t, n) {
		var i = new InputCombinationActionKey();
		return (i.ActionName = e), (i.MainKeyName = t), (i.SecondaryKeyName = n), i;
	}
	GetMainKey() {
		return InputSettings_1.InputSettings.GetKey(this.MainKeyName);
	}
	GetSecondaryKey() {
		return InputSettings_1.InputSettings.GetKey(this.SecondaryKeyName);
	}
	MainKeyToUeInputActionKeyMapping() {
		var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActionName),
			t = FNameUtil_1.FNameUtil.GetDynamicFName(this.MainKeyName);
		t = new UE.Key(t);
		return new UE.InputActionKeyMapping(e, !1, !1, !1, !1, t);
	}
	SecondaryKeyToUeInputActionKeyMapping() {
		var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.ActionName),
			t = FNameUtil_1.FNameUtil.GetDynamicFName(this.SecondaryKeyName);
		t = new UE.Key(t);
		return new UE.InputActionKeyMapping(e, !1, !1, !1, !1, t);
	}
}
exports.InputCombinationActionKey = InputCombinationActionKey;
