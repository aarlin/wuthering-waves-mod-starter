"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputDistributeHandle = exports.InputIdentification = void 0);
const InputEnums_1 = require("../../../Game/Input/InputEnums");
class InputIdentification {
	constructor(t) {
		(this.Kcr = InputEnums_1.EInputAction.None),
			(this.Qcr = InputEnums_1.EInputAxis.None),
			(this.Fqi = t);
	}
	get Name() {
		return this.Fqi;
	}
	GetInputAction() {
		var t;
		return (
			this.Kcr ||
			((t = this.Fqi)
				? ((this.Kcr = InputEnums_1.EInputAction[t]), this.Kcr)
				: void 0)
		);
	}
	GetInputAxis() {
		var t;
		return (
			this.Qcr ||
			((t = this.Fqi)
				? ((this.Qcr = InputEnums_1.EInputAxis[t]), this.Qcr)
				: void 0)
		);
	}
}
exports.InputIdentification = InputIdentification;
class InputCallback {
	constructor(t) {
		(this.Myo = []),
			(this.Xcr = []),
			(this.$cr = !1),
			(this.Ycr = new InputIdentification(t));
	}
	Call(t) {
		this.$cr = !0;
		for (const i of this.Myo) i(this.Ycr.Name, t, this.Ycr);
		this.Jcr(), (this.$cr = !1);
	}
	Add(t) {
		(this.$cr ? this.Xcr : this.Myo).push(t);
	}
	Jcr() {
		if (!(this.Xcr.length <= 0)) {
			for (const t of this.Xcr) this.Myo.push(t);
			this.Xcr.length = 0;
		}
	}
	Remove(t) {
		(t = this.Myo.indexOf(t)) < 0 || this.Myo.splice(t, 1);
	}
	Clear() {
		(this.Ycr = void 0), (this.Myo.length = 0);
	}
	Length() {
		return this.Myo.length;
	}
}
class InputDistributeHandle {
	constructor(t, i) {
		(this.zcr = t), (this.B7 = new InputCallback(i));
	}
	Reset() {
		this.B7.Clear(), (this.B7 = void 0);
	}
	Bind(t) {
		this.B7.Add(t);
	}
	UnBind(t) {
		this.B7.Remove(t);
	}
	Call(t) {
		this.B7.Call(t);
	}
	GetCallbackLength() {
		return this.B7.Length();
	}
	GetInputDistributeTag() {
		return this.zcr;
	}
}
exports.InputDistributeHandle = InputDistributeHandle;
