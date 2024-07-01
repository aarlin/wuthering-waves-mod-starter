"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputAxisKey = void 0);
const UE = require("ue"),
	InputSettings_1 = require("../InputSettings");
class InputAxisKey {
	constructor() {
		(this.AxisName = ""), (this.Scale = -0), (this.KeyName = "");
	}
	static New(e, t, i) {
		var s = new InputAxisKey();
		return (s.AxisName = e), (s.Scale = t), (s.KeyName = i), s;
	}
	static NewByInputAxisKeyMapping(e) {
		var t = new InputAxisKey();
		return (
			(t.AxisName = e.AxisName.toString()),
			(t.Scale = e.Scale),
			(t.KeyName = e.Key.KeyName.toString()),
			t
		);
	}
	ToUeInputAxisKeyMapping() {
		var e = new UE.FName(this.AxisName),
			t = new UE.FName(this.KeyName);
		t = new UE.Key(t);
		return new UE.InputAxisKeyMapping(e, this.Scale, t);
	}
	GetKey() {
		return InputSettings_1.InputSettings.GetKey(this.KeyName);
	}
	GetKeyIconPath() {
		return this.GetKey()?.GetKeyIconPath() ?? "";
	}
	IsEqual(e) {
		return (
			this.AxisName === e.AxisName.toString() &&
			this.KeyName === e.Key.KeyName.toString() &&
			this.Scale === e.Scale
		);
	}
}
exports.InputAxisKey = InputAxisKey;
