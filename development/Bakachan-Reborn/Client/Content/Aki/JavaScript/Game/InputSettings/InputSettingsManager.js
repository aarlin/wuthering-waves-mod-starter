"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputSettingsManager = void 0);
const Log_1 = require("../../Core/Common/Log"),
	StringUtils_1 = require("../../Core/Utils/StringUtils"),
	LocalStorage_1 = require("../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	InputSettings_1 = require("./InputSettings"),
	InputActionMapping_1 = require("./Maping/InputActionMapping"),
	InputAxisMapping_1 = require("./Maping/InputAxisMapping"),
	InputCombinationActionMapping_1 = require("./Maping/InputCombinationActionMapping"),
	InputCombinationAxisMapping_1 = require("./Maping/InputCombinationAxisMapping"),
	InputMappingsDefine_1 = require("../Ui/InputDistribute/InputMappingsDefine");
class InputSettingsManager {
	static Initialize() {
		(this.qSe = new InputActionMapping_1.InputActionMapping()),
			this.qSe.Initialize(),
			(this.GSe = new InputAxisMapping_1.InputAxisMapping()),
			this.GSe.Initialize(),
			(this.NSe =
				new InputCombinationActionMapping_1.InputCombinationActionMapping()),
			(this.OSe =
				new InputCombinationAxisMapping_1.InputCombinationAxisMapping()),
			this.OSe.Initialize(),
			this.RefreshAllActionKeys(),
			this.RefreshAllAxisKeys(),
			this.RefreshCombinationActionKeys();
	}
	static Clear() {
		this.qSe.Clear(),
			(this.qSe = void 0),
			this.GSe.Clear(),
			(this.GSe = void 0),
			this.NSe.Clear(),
			(this.NSe = void 0),
			this.OSe.Clear(),
			(this.OSe = void 0);
	}
	static get CheckUseFrenchKeyboard() {
		return (
			"French" === InputSettings_1.InputSettings.GetKeyboardPrimaryLangId()
		);
	}
	static P9s(t) {
		return (
			t === InputMappingsDefine_1.actionMappings.地图 ||
			t === InputMappingsDefine_1.actionMappings.聊天
		);
	}
	static RefreshAllActionKeys(t = !1) {
		for (const o of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllActionMappingConfig()) {
			var e = o.ActionName;
			if (!t && !InputSettingsManager.P9s(e))
				if (
					0 < (i = InputSettings_1.InputSettings.GetActionMappings(e)).Num()
				) {
					InputSettingsManager.RefreshActionKeys(e, i);
					continue;
				}
			let a = [];
			a = InputSettingsManager.CheckUseFrenchKeyboard
				? o.FrancePcKeys
				: o.PcKeys;
			var i = o.GamepadKeys,
				n = a.concat(i);
			InputSettingsManager.SetActionKeys(e, n);
		}
	}
	static ClearAllKeys() {
		this.qSe?.ClearAllActionKeys(), this.GSe?.ClearAllAxisKeys();
	}
	static RefreshAllAxisKeys(t = !1) {
		for (const r of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllAxisMappingConfig()) {
			var e = r.AxisName;
			if (!t)
				if (0 < (s = InputSettings_1.InputSettings.GetAxisMappings(e)).Num()) {
					InputSettingsManager.RefreshAxisKeys(e, s);
					continue;
				}
			let c = new Map();
			c = InputSettingsManager.CheckUseFrenchKeyboard
				? r.FrancePcKeys
				: r.PcKeys;
			var i,
				n,
				o,
				a,
				s = r.GamepadKeys,
				g = new Map();
			for ([i, n] of c) g.set(i, n);
			for ([o, a] of s) g.set(o, a);
			InputSettingsManager.SetAxisKeys(e, g);
		}
	}
	static GetActionBinding(t) {
		return this.qSe.GetActionBinding(t);
	}
	static GetActionBindingByConfigId(t) {
		return this.qSe.GetActionBindingByConfigId(t);
	}
	static CheckGetActionKeyIconPath(t) {
		var e = t.GetCurrentPlatformKey();
		if (e) {
			var i = e.GetKeyIconPath();
			if (!StringUtils_1.StringUtils.IsEmpty(i)) return i;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("InputSettings", 8, "此按键配置了空的图标路径", [
					"KeyName",
					e.GetKeyName(),
				]);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"Action找不到对应按键",
					["ActionName", t.GetActionName()],
					["KeyName", void 0],
				);
	}
	static GetActionBindingByActionMappingType(t) {
		return this.qSe.GetActionBindingByActionMappingType(t);
	}
	static SetActionKeys(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "设置Action按键", ["actionName", t]),
			this.qSe.SetKeys(t, e);
	}
	static RefreshActionKeys(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "刷新Action按键", ["actionName", t]),
			this.qSe.RefreshKeysByActionMappings(t, e);
	}
	static AddActionKeys(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "添加Action按键", ["actionName", t]),
			this.qSe.AddKeys(t, e);
	}
	static RemoveActionKeys(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "删除按键", ["actionName", t]),
			this.qSe.RemoveKeys(t, e);
	}
	static RemoveActionKeysByCondition(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "删除Action中符合条件的按键映射", [
				"actionName",
				t,
			]),
			this.qSe.RemoveKeysByCondition(t, e);
	}
	static GetAxisBinding(t) {
		return this.GSe.GetAxisBinding(t);
	}
	static GetAxisBindingByAxisMappingType(t) {
		return this.GSe.GetAxisBindingByAxisMappingType(t);
	}
	static CheckGetAxisKeyIconPath(t) {
		var e = t.GetCurrentPlatformKey();
		if (e) {
			var i = e.GetKeyIconPath();
			if (!StringUtils_1.StringUtils.IsEmpty(i)) return i;
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("InputSettings", 8, "此按键配置了空的图标路径", [
					"KeyName",
					e.KeyName,
				]);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"Axis找不到对应按键",
					["AxisName", t.GetAxisName()],
					["KeyName", void 0],
				);
	}
	static ContainAxisKeyByType(t, e) {
		for (const i of this.GSe.GetAxisBindingByAxisMappingType(t))
			if (i.HasKey(e)) return { IsContain: !0, ContainAxisBinding: i };
		return { IsContain: !1, ContainAxisBinding: void 0 };
	}
	static SetAxisKeys(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "设置Axis按键", ["axisName", t]),
			this.GSe.SetKeys(t, e);
	}
	static RefreshAxisKeys(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "刷新Axis按键", ["axisName", t]),
			this.GSe.RefreshKeys(t, e);
	}
	static AddAxisKeys(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "添加Action按键", ["actionName", t]),
			this.GSe.AddKeys(t, e);
	}
	static RemoveAxisKeys(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "删除按键", ["actionName", t]),
			this.GSe.RemoveKeys(t, e);
	}
	static RemoveAxisKeysByCondition(t, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "删除Action中符合条件的按键映射", [
				"actionName",
				t,
			]),
			this.GSe.RemoveKeysByCondition(t, e);
	}
	static RefreshCombinationActionKeys(t = !1) {
		this.ClearCombinationActionKeyMap();
		var e = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
			void 0,
		);
		if ((e && (this.kSe = e), this.kSe && 0 < this.kSe.size && !t))
			for (var [i, n] of this.kSe) for (const t of n) this.FSe(i, t[0], t[1]);
		else if (
			(this.kSe.clear(),
			LocalStorage_1.LocalStorage.SetGlobal(
				LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
				this.kSe,
			),
			(e =
				ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationActionConfig()))
		)
			for (const t of e) {
				var o,
					a,
					s,
					g,
					r = t.ActionName;
				for ([o, a] of t.PcKeys) this.AddCombinationActionKeyMap(r, o, a);
				for ([s, g] of t.GamepadKeys) this.AddCombinationActionKeyMap(r, s, g);
			}
	}
	static ClearCombinationActionKeyMap() {
		this.NSe?.Clear(), this.kSe.clear();
	}
	static AddCombinationActionKeyMap(t, e, i) {
		this.FSe(t, e, i);
		var n = this.kSe.get(t),
			o = [e, i];
		if (n) {
			for (var [a, s] of n) if (a === e && s === i) return;
			n.push(o);
		} else this.kSe.set(t, [o]);
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
			this.kSe,
		);
	}
	static FSe(t, e, i) {
		let n = this.GetCombinationActionBindingByActionName(t);
		(n = n || this.NSe?.NewCombinationActionBinding(t, 0)) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InputSettings",
					8,
					"添加组合键按键",
					["ActionName", n.GetActionName()],
					["mainKeyName", e],
					["secondaryKeyName", i],
				),
			this.NSe?.AddKey(n, e, i),
			InputSettings_1.InputSettings.NewInputCombinationActionKey(
				n.GetActionName(),
				e,
				i,
			),
			this.PrintCurrentCombinationActionBinding(t));
	}
	static RemoveCombinationActionKeyMap(t, e, i) {
		this.VSe(t, e, i);
		var n = this.kSe.get(t);
		if (n) {
			var o = [];
			for (let t = 0; t < n.length; t++) {
				var a = n[t];
				a[0] === e && a[1] === i && o.push(t);
			}
			for (const t of o) n.splice(t, 1);
			n.length <= 0 && this.kSe.delete(t);
		} else this.kSe.delete(t);
		LocalStorage_1.LocalStorage.SetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.CombineAction,
			this.kSe,
		),
			this.PrintCurrentCombinationActionBinding(t);
	}
	static VSe(t, e, i) {
		(t = this.GetCombinationActionBindingByActionName(t)) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InputSettings",
					8,
					"删除组合键按键",
					["ActionName", t.GetActionName()],
					["RemoveMainKey", e],
					["RemoveSecondaryKeyName", i],
				),
			this.NSe?.RemoveKey(t, e, i),
			InputSettings_1.InputSettings.RemoveCombinationActionMapping(
				t.GetActionName(),
				e,
				i,
			));
	}
	static PrintCurrentCombinationActionBinding(t, e = "0") {
		var i = new Map(),
			n = new Map(),
			o = new Map();
		t = this.NSe?.GetCombinationActionBindingByActionName(t);
		t?.GetKeyMap(i),
			t?.GetPcKeyNameMap(n),
			t?.GetGamepadKeyNameMap(o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InputSettings",
					8,
					"当前组合键按键",
					["Id", e],
					["ActionName", t?.GetActionName()],
					["KeyMap", i],
					["PcKeyMap", n],
					["GamepadKeyMap", o],
				);
	}
	static GetCombinationActionBindingByKeyName(t, e) {
		return this.NSe.GetCombinationActionBindingByKeyName(t, e);
	}
	static GetCombinationActionBindingByActionName(t) {
		return this.NSe.GetCombinationActionBindingByActionName(t);
	}
	static IsCombinationActionMainKey(t) {
		return this.NSe.IsMainKey(t);
	}
	static IsCombinationAction(t, e) {
		return !(
			!(t = this.GetCombinationActionBindingByKeyName(t, e)) || t.size <= 0
		);
	}
	static GetCombinationAxisBindingByKeyName(t, e) {
		return this.OSe.GetCombinationAxisBindingByKeyName(t, e);
	}
	static GetCombinationAxisBindingMapByMainKeyName(t) {
		return this.OSe.GetCombinationAxisBindingMapByMainKeyName(t);
	}
	static GetCombinationAxisBindingByActionName(t) {
		return this.OSe.GetCombinationAxisBindingByActionName(t);
	}
	static IsCombinationAxisMainKey(t) {
		return this.OSe.IsMainKey(t);
	}
	static IsCombinationAxis(t, e) {
		return !(
			!(t = this.GetCombinationAxisBindingByKeyName(t, e)) || t.length <= 0
		);
	}
	static GetActionKeyDisplayData(t, e) {
		var i = InputSettingsManager.GetCombinationActionBindingByActionName(e);
		if (i) {
			var n = new Map();
			if ((i.GetCurrentPlatformKeyNameMap(n), n && 0 < n.size))
				return t.RefreshCombinationInput(e, n), !0;
		}
		return (
			!!(
				(i = InputSettingsManager.GetActionBinding(e)) &&
				((n = []), i.GetCurrentPlatformKeyNameList(n), 0 < n.length)
			) && (t.RefreshInput(e, n), !0)
		);
	}
	static GetAxisKeyDisplayData(t, e) {
		var i = InputSettingsManager.GetCombinationAxisBindingByActionName(e);
		if (i) {
			var n = new Map();
			if ((i.GetCurrentPlatformKeyNameMap(n), n && 0 < n.size))
				return t.RefreshCombinationInput(e, n), !0;
		}
		return (
			!!(
				(i = InputSettingsManager.GetAxisBinding(e)) &&
				((n = []), i.GetCurrentPlatformKeyNameList(n), 0 < n.length)
			) && (t.RefreshInput(e, n), !0)
		);
	}
}
((exports.InputSettingsManager = InputSettingsManager).qSe = void 0),
	(InputSettingsManager.GSe = void 0),
	(InputSettingsManager.NSe = void 0),
	(InputSettingsManager.OSe = void 0),
	(InputSettingsManager.kSe = new Map()),
	(InputSettingsManager.SkipGlobalSdkCheck = !1);
