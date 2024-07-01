"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputActionMapping = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	InputActionBinding_1 = require("../Binding/InputActionBinding");
class InputActionMapping {
	constructor() {
		(this.WSe = new Map()), (this.KSe = new Map()), (this.QSe = new Map());
	}
	Initialize() {
		var e =
			ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig();
		if (e) for (const t of e) this.NewActionBinding(t);
	}
	Clear() {
		for (const e of this.WSe.values()) e.Clear();
		this.WSe.clear(), this.KSe.clear(), this.QSe.clear();
	}
	NewActionBinding(e) {
		var t = e.ActionName,
			n = new InputActionBinding_1.InputActionBinding();
		n.Initialize(e),
			(e = n.GetConfigId()),
			this.WSe.set(t, n),
			this.KSe.set(e, n),
			(t = n.GetActionMappingType());
		let i = this.QSe.get(t);
		i || ((i = new Set()), this.QSe.set(t, i)), i.add(n);
	}
	RemoveActionBinding(e) {
		var t,
			n,
			i = this.WSe.get(e);
		i &&
			((t = i.GetConfigId()),
			(n = i.GetActionMappingType()),
			this.QSe.get(n)?.delete(i),
			this.WSe.delete(e),
			this.KSe.delete(t),
			i.Clear());
	}
	ClearAllActionKeys() {
		for (const e of this.WSe.values()) e.ClearAllKeys();
	}
	GetActionBinding(e) {
		return this.WSe.get(e);
	}
	GetActionBindingByConfigId(e) {
		return this.KSe.get(e);
	}
	GetActionBindingByActionMappingType(e) {
		return this.QSe.get(e);
	}
	SetKeys(e, t) {
		var n = this.WSe.get(e);
		n
			? (n.SetKeys(t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedActionKeys,
					e,
					n,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"InputSettings",
					8,
					"设置Action按键时，找不到对应Action",
					["ActionName", e],
				);
	}
	RefreshKeysByActionMappings(e, t) {
		var n = this.WSe.get(e);
		n
			? (n.RefreshKeysByActionMappings(t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedActionKeys,
					e,
					n,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"InputSettings",
					8,
					"设置Action按键时，找不到对应Action",
					["ActionName", e],
				);
	}
	AddKeys(e, t) {
		var n = this.WSe.get(e);
		n
			? (n.AddKeys(t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedActionKeys,
					e,
					n,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("InputSettings", 8, "添加Action按键，找不到对应Action", [
					"ActionName",
					e,
				]);
	}
	RemoveKeys(e, t) {
		var n = this.WSe.get(e);
		n
			? (n.RemoveKeys(t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedActionKeys,
					e,
					n,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn("InputSettings", 8, "删除Action按键，找不到对应Action", [
					"ActionName",
					e,
				]);
	}
	RemoveKeysByCondition(e, t) {
		var n = this.WSe.get(e);
		n
			? (n.RemoveKeysByCondition(t),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnChangedActionKeys,
					e,
					n,
				))
			: Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"InputSettings",
					8,
					"删除Action中符合条件的按键映射，找不到对应Action",
					["ActionName", e],
				);
	}
}
exports.InputActionMapping = InputActionMapping;
