"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputCombinationAxisKey = void 0);
const UE = require("ue"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	InputSettings_1 = require("../InputSettings");
class InputCombinationAxisKey {
	constructor() {
		(this.AxisName = ""),
			(this.MainKeyName = ""),
			(this.SecondaryKeyName = ""),
			(this.Scale = -0);
	}
	static New(e, t, i, n) {
		var a = new InputCombinationAxisKey();
		return (
			(a.AxisName = e),
			(a.MainKeyName = t),
			(a.SecondaryKeyName = i),
			(a.Scale = n),
			a
		);
	}
	GetMainKey() {
		return InputSettings_1.InputSettings.GetKey(this.MainKeyName);
	}
	GetSecondaryKey() {
		return InputSettings_1.InputSettings.GetKey(this.SecondaryKeyName);
	}
	MainKeyToUeInputActionKeyMapping() {
		var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.AxisName),
			t = FNameUtil_1.FNameUtil.GetDynamicFName(this.MainKeyName);
		t = new UE.Key(t);
		return new UE.InputActionKeyMapping(e, !1, !1, !1, !1, t);
	}
	SecondaryKeyToUeInputActionKeyMapping() {
		var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.AxisName),
			t = FNameUtil_1.FNameUtil.GetDynamicFName(this.SecondaryKeyName);
		t = new UE.Key(t);
		return new UE.InputAxisKeyMapping(e, this.Scale, t);
	}
}
exports.InputCombinationAxisKey = InputCombinationAxisKey;
