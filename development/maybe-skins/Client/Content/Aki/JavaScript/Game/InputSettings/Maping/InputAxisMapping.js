"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputAxisMapping = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	InputAxisBinding_1 = require("../Binding/InputAxisBinding");
class InputAxisMapping {
	constructor() {
		(this.XSe = new Map()), (this.$Se = new Map());
	}
	Initialize() {
		var e =
			ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig();
		if (e) for (const n of e) this.NewAxisBinding(n);
	}
	Clear() {
		for (const e of this.XSe.values()) e.Clear();
		this.XSe.clear(), this.$Se.clear();
	}
	NewAxisBinding(e) {
		var n = e.AxisName,
			t = new InputAxisBinding_1.InputAxisBinding();
		t.Initialize(e), this.XSe.set(n, t), (e = t.GetAxisMappingType());
		let i = this.$Se.get(e);
		i || ((i = new Set()), this.$Se.set(e, i)), i.add(t);
	}
	RemoveAxisBinding(e) {
		var n,
			t = this.XSe.get(e);
		t &&
			((n = t.GetAxisMappingType()),
			this.$Se.get(n)?.delete(t),
			this.XSe.delete(e),
			t.Clear());
	}
	ClearAllAxisKeys() {
		for (const e of this.XSe.values()) e.ClearAllKeys();
	}
	GetAxisBinding(e) {
		return this.XSe.get(e);
	}
	GetAxisBindingByAxisMappingType(e) {
		return this.$Se.get(e);
	}
	SetKeys(e, n) {
		var t = this.XSe.get(e);
		t
			? (t.SetKeys(n),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedAxisKeys,
					e,
					t,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("InputSettings", 8, "设置Axis按键时，找不到对应Axis", [
					"AxisName",
					e,
				]);
	}
	RefreshKeys(e, n) {
		var t = this.XSe.get(e);
		t
			? (t.RefreshKeys(n),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedAxisKeys,
					e,
					t,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("InputSettings", 8, "设置Axis按键时，找不到对应Axis", [
					"AxisName",
					e,
				]);
	}
	AddKeys(e, n) {
		var t = this.XSe.get(e);
		t
			? (t.AddKeys(n),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedAxisKeys,
					e,
					t,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("InputSettings", 8, "添加Axis按键时，找不到对应Axis", [
					"AxisName",
					e,
				]);
	}
	RemoveKeys(e, n) {
		var t = this.XSe.get(e);
		t
			? (t.RemoveKeys(n),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedAxisKeys,
					e,
					t,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("InputSettings", 8, "删除Axis按键时，找不到对应Axis", [
					"AxisName",
					e,
				]);
	}
	RemoveKeysByCondition(e, n) {
		var t = this.XSe.get(e);
		t
			? (t.RemoveKeysByCondition(n),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedAxisKeys,
					e,
					t,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"InputSettings",
					8,
					"删除Axis中符合条件的按键映射，找不到对应Axis",
					["AxisName", e],
				);
	}
}
exports.InputAxisMapping = InputAxisMapping;
