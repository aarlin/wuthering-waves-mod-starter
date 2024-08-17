"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputCombinationAxisBinding = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	InputSettings_1 = require("../InputSettings");
class InputCombinationAxisBinding {
	constructor() {
		(this.Mne = 0),
			(this.hSe = new Map()),
			(this.lSe = new Map()),
			(this.uSe = new Map()),
			(this.sSe = void 0),
			(this.Lo = void 0),
			(this.aSe = 0),
			(this.mSe = void 0);
	}
	Initialize(e) {
		for (var [t, i] of ((this.Mne = e.Id),
		(this.sSe = e.AxisName),
		(this.Lo = e),
		(this.aSe = this.Lo.AxisType),
		(this.mSe = this.Lo.SecondaryKeyScaleMap),
		e.PcKeyMap))
			this.uSe.set(t, i);
		for (var [s, a] of e.GamepadKeyMap) this.uSe.set(s, a);
		this.dSe();
	}
	Clear() {
		(this.hSe = void 0),
			(this.lSe = void 0),
			(this.uSe = void 0),
			(this.sSe = void 0),
			(this.aSe = 0),
			(this.Lo = void 0);
	}
	dSe() {
		for (var [e, t] of (this.hSe.clear(), this.lSe.clear(), this.uSe)) {
			var i = InputSettings_1.InputSettings.GetKey(t);
			i &&
				((i.IsKeyboardKey || i.IsMouseButton) && this.hSe.set(e, t),
				i.IsGamepadKey) &&
				this.lSe.set(e, t);
		}
	}
	GetAxisName() {
		return this.sSe;
	}
	GetCombinationAxisKeyMap() {
		return InputSettings_1.InputSettings.GetCombinationAxisKeyMap(this.sSe);
	}
	HasKeyboardCombinationAxis() {
		return !!this.hSe && 0 < this.hSe.size;
	}
	HasGamepadCombinationAxis() {
		return !!this.lSe && 0 < this.lSe.size;
	}
	GetAxisMappingType() {
		return this.aSe;
	}
	GetSourceAxisValue(e) {
		return this.mSe.get(e);
	}
	GetConfigId() {
		return this.Mne;
	}
	GetPcKeyNameMap(e) {
		for (var [t, i] of this.hSe) e.set(t, i);
	}
	GetGamepadKeyNameMap(e) {
		for (var [t, i] of this.lSe) e.set(t, i);
	}
	GetKeyMap(e) {
		for (var [t, i] of this.uSe) e.set(t, i);
	}
	GetCurrentPlatformKeyNameMap(e) {
		var t = ModelManager_1.ModelManager.PlatformModel;
		t.IsPc()
			? this.GetPcKeyNameMap(e)
			: t.IsGamepad() && this.GetGamepadKeyNameMap(e);
	}
	HasKey(e, t) {
		return this.uSe.get(e) === t;
	}
}
exports.InputCombinationAxisBinding = InputCombinationAxisBinding;
