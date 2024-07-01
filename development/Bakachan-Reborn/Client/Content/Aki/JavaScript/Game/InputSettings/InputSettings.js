"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputSettings = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	ModelManager_1 = require("../Manager/ModelManager"),
	InputActionKey_1 = require("./Key/InputActionKey"),
	InputAxisKey_1 = require("./Key/InputAxisKey"),
	InputCombinationActionKey_1 = require("./Key/InputCombinationActionKey"),
	InputCombinationAxisKey_1 = require("./Key/InputCombinationAxisKey"),
	InputKey_1 = require("./Key/InputKey");
class InputSettings {
	static Initialize() {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "初始化InputSettings"),
			(this.CSe = UE.InputSettings.GetInputSettings()),
			this.Refresh();
	}
	static Clear() {
		(this.CSe = void 0),
			(this.vSe = void 0),
			(this.MSe = void 0),
			(this.SSe = void 0),
			this.ESe.clear(),
			this.ySe.clear(),
			this.ISe();
	}
	static Refresh() {
		this.q9s(), this.G9s(), this.O9s();
	}
	static q9s() {
		var t = this.GetActionNames();
		for (let o = 0; o < t.Num(); o++) {
			var e = t.Get(o),
				i =
					((this.MSe = (0, puerts_1.$ref)(void 0)),
					this.CSe.GetActionMappingByName(e, this.MSe),
					(0, puerts_1.$unref)(this.MSe));
			let a = this.ESe.get(e.toString());
			a || ((a = new Map()), this.ESe.set(e.toString(), a));
			for (let t = 0; t < i.Num(); t++) {
				var n = i.Get(t),
					s = n.Key.KeyName.toString();
				this.TSe(s),
					a.get(s)?.IsEqual(n) ||
						((n =
							InputActionKey_1.InputActionKey.NewByInputActionKeyMapping(n)),
						a.set(s, n));
			}
			i.Empty();
		}
	}
	static G9s() {
		var t = this.GetAxisNames();
		for (let o = 0; o < t.Num(); o++) {
			var e = t.Get(o),
				i =
					(this.CSe.GetAxisMappingByName(e, this.SSe),
					(0, puerts_1.$unref)(this.SSe));
			let a = this.ySe.get(e.toString());
			a || ((a = new Map()), this.ySe.set(e.toString(), a));
			for (let t = 0; t < i.Num(); t++) {
				var n = i.Get(t),
					s = n.Key.KeyName.toString();
				this.TSe(s),
					a.get(s)?.IsEqual(n) ||
						((n = InputAxisKey_1.InputAxisKey.NewByInputAxisKeyMapping(n)),
						a.set(s, n));
			}
			i.Empty();
		}
	}
	static RemoveCombinationActionMapping(t, e, i) {
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InputSettings",
					8,
					"删除组合Action按键映射",
					["actionName", t],
					["mainKeyName", e],
					["secondaryKeyName", i],
				),
			(t = this.LSe.get(t)))
		) {
			var n = t.get(e);
			if (n) {
				let s = -1;
				for (let t = 0; t < n.length; t++)
					if (n[t].GetSecondaryKey()?.GetKeyName() === i) {
						s = t;
						break;
					}
				0 <= s && n?.splice(s, 1), n.length <= 0 && t.delete(e);
			}
		}
	}
	static NewInputCombinationActionKey(t, e, i) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"InputSettings",
				8,
				"添加组合Action按键映射",
				["actionName", t],
				["mainKeyName", e],
				["secondaryKeyName", i],
			),
			this.TSe(e),
			this.TSe(i),
			(i = InputCombinationActionKey_1.InputCombinationActionKey.New(t, e, i));
		let n = this.LSe.get(t);
		if (n) {
			let t = n.get(e);
			t ? t.push(i) : ((t = [i]), n.set(e, t));
		} else (n = new Map()).set(e, [i]), this.LSe.set(t, n);
	}
	static O9s() {
		this.RSe.clear();
		for (const g of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationAxisConfig()) {
			var t,
				e,
				i,
				n,
				s = g.AxisName,
				o = g.SecondaryKeyScaleMap;
			for ([t, e] of g.PcKeyMap) {
				var a = o.get(t);
				this.DSe(s, e, t, a);
			}
			for ([i, n] of g.GamepadKeyMap) {
				var r = o.get(i);
				this.DSe(s, n, i, r);
			}
		}
	}
	static DSe(t, e, i, n) {
		this.TSe(e), this.TSe(i);
		let s = this.RSe.get(t),
			o = (s || ((s = new Map()), this.RSe.set(t, s)), s.get(e));
		o || ((o = []), s.set(e, o)),
			(t = InputCombinationAxisKey_1.InputCombinationAxisKey.New(t, e, i, n)),
			o.push(t);
	}
	static SaveKeyMappings() {
		this.CSe?.SaveKeyMappings();
	}
	static TSe(t) {
		this.USe.has(t) || this.ASe(t);
	}
	static ASe(t) {
		var e = new InputKey_1.InputKey(t);
		this.USe.set(t, e);
	}
	static ISe() {
		this.USe.clear();
	}
	static GetKey(t) {
		return this.USe.get(t);
	}
	static GetUeKey(t) {
		return this.GetKey(t)?.ToUeKey();
	}
	static GetInputAnalogKeyState(t) {
		return this.GetKey(t)?.GetInputAnalogKeyState();
	}
	static IsInputKeyDown(t) {
		return !!(t = this.GetKey(t)) && t.IsInputKeyDown();
	}
	static IsKeyboardKey(t) {
		var e = this.GetKey(t);
		return e
			? e.IsKeyboardKey
			: ((e = new UE.Key(new UE.FName(t))),
				UE.KismetInputLibrary.Key_IsKeyboardKey(e));
	}
	static IsGamepadKey(t) {
		var e = this.GetKey(t);
		return e
			? e.IsGamepadKey
			: ((e = new UE.Key(new UE.FName(t))),
				UE.KismetInputLibrary.Key_IsGamepadKey(e));
	}
	static IsMouseButton(t) {
		var e = this.GetKey(t);
		return e
			? e.IsMouseButton
			: ((e = new UE.Key(new UE.FName(t))),
				UE.KismetInputLibrary.Key_IsMouseButton(e));
	}
	static IsValidKey(t) {
		return (
			"Keyboard_Invalid" !== t &&
			"Gamepad_Invalid" !== t &&
			"GenericUSBController_ButtonInvalid" !== t
		);
	}
	static GetKeyIconPath(t) {
		var e = this.GetKey(t);
		if (e) {
			var i,
				n = ConfigManager_1.ConfigManager.InputSettingsConfig;
			if (e.IsKeyboardKey || e.IsMouseButton)
				return (i = n?.GetPcKeyConfig(t)) ? i.KeyIconPath : void 0;
			if (e.IsGamepadKey) {
				var s = n?.GetGamepadKeyConfig(t);
				if (!s) return;
				switch (ModelManager_1.ModelManager.PlatformModel.PlatformType) {
					case 6:
					default:
						return s.KeyIconPath;
					case 7:
						return s.PsKeyIconPath;
				}
			}
		}
	}
	static SetActionMapping(t, e) {
		if (this.CSe?.IsValid()) {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InputSettings",
					8,
					"设置Action按键映射",
					["actionName", t],
					["keys", e],
				),
				this.PSe(t);
			for (const i of e) this.xSe(t, i);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"设置Action按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static AddActionMapping(t, e) {
		this.CSe?.IsValid()
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"InputSettings",
						8,
						"添加Action按键映射",
						["actionName", t],
						["key", e],
					),
				this.xSe(t, e))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"添加Action按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static xSe(t, e) {
		this.TSe(e);
		let i = this.GetInputActionKeyMap(t);
		i || ((i = new Map()), this.ESe.set(t, i)),
			(t = InputActionKey_1.InputActionKey.New(t, !1, !1, !1, !1, e)),
			this.CSe.AddActionMapping(t.ToUeInputActionKeyMapping()),
			i.set(e, t);
	}
	static RemoveActionMappingByCondition(t, e) {
		if (e)
			if (this.CSe?.IsValid()) {
				var i = this.GetInputActionKeyMap(t);
				if (i) {
					var n = [];
					for (const t of i.values()) e(t.KeyName) && n.push(t);
					for (const t of n) this.wSe(t, i);
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"InputSettings",
						8,
						"删除Action按键映射时，InputSetting不可用",
						["actionName", t],
					);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("InputSettings", 8, "请使用RemoveActionMapping");
	}
	static RemoveActionMapping(t, e) {
		var i, n;
		this.CSe?.IsValid()
			? (i = this.GetInputActionKeyMap(t)) &&
				((n = i.get(e))
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"InputSettings",
								8,
								"删除Action按键映射",
								["actionName", t],
								["key", e],
							),
						this.wSe(n, i))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"InputSettings",
							8,
							"删除Action按键映射时,找不到对应按键",
							["actionName", t],
							["key", e],
						))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"删除Action按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static wSe(t, e) {
		var i = t.KeyName;
		this.CSe.RemoveActionMapping(t.ToUeInputActionKeyMapping()), e.delete(i);
	}
	static ClearActionMapping(t) {
		this.CSe?.IsValid()
			? this.PSe(t)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"删除Action所有按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static PSe(t) {
		if ((t = this.GetInputActionKeyMap(t))) {
			for (const e of t.values())
				this.CSe.RemoveActionMapping(e.ToUeInputActionKeyMapping());
			t.clear();
		}
	}
	static GetInputActionKeyMap(t) {
		return this.ESe.get(t);
	}
	static GetInputActionKey(t, e) {
		if ((t = this.ESe.get(t))) return t.get(e);
	}
	static GetActionNames() {
		return this.CSe.GetActionNames(this.vSe), (0, puerts_1.$unref)(this.vSe);
	}
	static GetActionMappings(t) {
		return (
			(this.MSe = (0, puerts_1.$ref)(void 0)),
			this.CSe.GetActionMappingByName(
				FNameUtil_1.FNameUtil.GetDynamicFName(t),
				this.MSe,
			),
			(0, puerts_1.$unref)(this.MSe)
		);
	}
	static SetAxisMapping(t, e) {
		if (this.CSe?.IsValid()) {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InputSettings",
					8,
					"设置Axis按键映射",
					["actionName", t],
					["keys", e],
				);
			var i,
				n,
				s = this.GetInputAxisKeyMap(t);
			if (s) {
				var o = [];
				for (const t of s.values()) {
					var a = t.KeyName;
					(e.has(a) && t.Scale === e.get(a)) || o.push(t);
				}
				for (const e of o)
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"InputSettings",
							8,
							"删除不在新数据里的数据",
							["AxisName", t],
							["key", e.KeyName],
						),
						this.BSe(e, s);
			}
			for ([i, n] of e) {
				var r = this.GetInputAxisKey(t, i);
				(r && r.Scale === e.get(i)) ||
					(Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"InputSettings",
							8,
							"新增不在当前的数据",
							["axisName", t],
							["key", i],
						),
					this.bSe(t, n, i));
			}
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"设置Axis按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static AddAxisMapping(t, e, i) {
		this.CSe?.IsValid()
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"InputSettings",
						8,
						"添加Axis按键映射",
						["axisName", t],
						["key", e],
						["scale", i],
					),
				this.bSe(t, i, e))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"添加Axis按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static bSe(t, e, i) {
		this.TSe(i);
		let n = this.GetInputAxisKeyMap(t);
		n || ((n = new Map()), this.ySe.set(t, n)),
			(t = InputAxisKey_1.InputAxisKey.New(t, e, i)),
			this.CSe.AddAxisMapping(t.ToUeInputAxisKeyMapping()),
			n.set(i, t);
	}
	static RemoveAxisMappingByCondition(t, e) {
		if (e)
			if (this.CSe?.IsValid()) {
				var i = this.GetInputAxisKeyMap(t);
				if (i) {
					var n = [];
					for (const t of i.values()) e(t.KeyName) && n.push(t);
					for (const t of n) this.BSe(t, i);
				}
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"InputSettings",
						8,
						"删除Action按键映射时，InputSetting不可用",
						["actionName", t],
					);
		else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("InputSettings", 8, "请使用RemoveActionMapping");
	}
	static RemoveAxisMapping(t, e) {
		var i, n;
		this.CSe?.IsValid()
			? (i = this.GetInputAxisKeyMap(t)) &&
				((n = i.get(e))
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"InputSettings",
								8,
								"删除Axis按键映射",
								["axisName", t],
								["key", e],
							),
						this.BSe(n, i))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"InputSettings",
							8,
							"删除Axis按键映射,找不到对应按键",
							["actionName", t],
							["key", e],
						))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"添加Axis按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static BSe(t, e) {
		var i = t.KeyName;
		this.CSe.RemoveAxisMapping(t.ToUeInputAxisKeyMapping()), e.delete(i);
	}
	static ClearAxisMapping(t) {
		var e = this.GetInputAxisKeyMap(t);
		if (e) {
			for (const t of e.values())
				this.CSe.RemoveAxisMapping(t.ToUeInputAxisKeyMapping());
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("InputSettings", 8, "删除Axis所有按键映射", [
					"axisName",
					t,
				]),
				e.clear();
		}
	}
	static GetInputAxisKeyMap(t) {
		return this.ySe.get(t);
	}
	static GetInputAxisKey(t, e) {
		if ((t = this.ySe.get(t))) return t.get(e);
	}
	static GetAxisNames() {
		return this.CSe.GetAxisNames(this.vSe), (0, puerts_1.$unref)(this.vSe);
	}
	static GetAxisMappings(t) {
		return (
			(this.SSe = (0, puerts_1.$ref)(void 0)),
			this.CSe.GetAxisMappingByName(
				FNameUtil_1.FNameUtil.GetDynamicFName(t),
				this.SSe,
			),
			(0, puerts_1.$unref)(this.SSe)
		);
	}
	static GetCombinationActionKeyMap(t) {
		return this.LSe.get(t);
	}
	static GetCombinationActionKey(t, e) {
		if ((t = this.LSe.get(t))) return t.get(e);
	}
	static GetCombinationAxisKeyMap(t) {
		return this.RSe.get(t);
	}
	static GetCombinationAxisKey(t, e) {
		if ((t = this.RSe.get(t))) return t.get(e);
	}
	static SetUseMouseForTouch(t) {
		this.CSe && (this.CSe.bUseMouseForTouch = t);
	}
	static GetKeyboardPrimaryLangId() {
		return this.CSe
			? this.CSe.GetKeyboardPrimaryLangId().toString()
			: "Default";
	}
}
((exports.InputSettings = InputSettings).CSe = void 0),
	(InputSettings.USe = new Map()),
	(InputSettings.ESe = new Map()),
	(InputSettings.ySe = new Map()),
	(InputSettings.LSe = new Map()),
	(InputSettings.RSe = new Map()),
	(InputSettings.vSe = (0, puerts_1.$ref)(void 0)),
	(InputSettings.MSe = (0, puerts_1.$ref)(void 0)),
	(InputSettings.SSe = (0, puerts_1.$ref)(void 0));
