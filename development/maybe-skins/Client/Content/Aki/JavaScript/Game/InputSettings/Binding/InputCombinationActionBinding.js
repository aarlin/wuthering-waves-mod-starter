"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputCombinationActionBinding = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
	InputSettings_1 = require("../InputSettings");
class InputCombinationActionBinding {
	constructor() {
		(this.hSe = new Map()),
			(this.lSe = new Map()),
			(this.uSe = new Map()),
			(this.cSe = -0),
			(this.ZMe = void 0);
	}
	Initialize(e, t) {
		(this.ZMe = e), (this.cSe = t);
	}
	Clear() {
		(this.hSe = void 0),
			(this.lSe = void 0),
			(this.uSe = void 0),
			(this.ZMe = void 0);
	}
	AddKey(e, t) {
		this.uSe.set(e, t);
		var i = InputSettings_1.InputSettings.GetKey(e);
		i &&
			((i.IsKeyboardKey || i.IsMouseButton) && this.hSe.set(e, t),
			i.IsGamepadKey) &&
			this.lSe.set(e, t);
	}
	RemoveKey(e) {
		this.uSe.delete(e), this.hSe.delete(e), this.lSe.delete(e);
	}
	GetKeyMap(e) {
		for (var [t, i] of this.uSe) e.set(t, i);
	}
	IsValid() {
		return !!this.uSe && 0 < this.uSe.size;
	}
	GetActionName() {
		return this.ZMe;
	}
	GetCombinationActionKeyMap() {
		return InputSettings_1.InputSettings.GetCombinationActionKeyMap(this.ZMe);
	}
	HasKeyboardCombinationAction() {
		return !!this.hSe && 0 < this.hSe.size;
	}
	HasGamepadCombinationAction() {
		return !!this.lSe && 0 < this.lSe.size;
	}
	GetSecondaryKeyValidTime() {
		return this.cSe;
	}
	GetPcKeyNameMap(e) {
		for (var [t, i] of this.hSe) e.set(t, i);
	}
	GetGamepadKeyNameMap(e) {
		for (var [t, i] of this.lSe) e.set(t, i);
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
exports.InputCombinationActionBinding = InputCombinationActionBinding;
