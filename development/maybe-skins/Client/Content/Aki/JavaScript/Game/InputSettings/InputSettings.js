"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputSettings = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Info_1 = require("../../Core/Common/Info"),
	Log_1 = require("../../Core/Common/Log"),
	FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	InputActionKey_1 = require("./Key/InputActionKey"),
	InputAxisKey_1 = require("./Key/InputAxisKey"),
	InputCombinationActionKey_1 = require("./Key/InputCombinationActionKey"),
	InputCombinationAxisKey_1 = require("./Key/InputCombinationAxisKey"),
	InputKey_1 = require("./Key/InputKey");
class InputSettings {
	static Initialize() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InputSettings", 8, "初始化InputSettings"),
			(this.CEe = UE.InputSettings.GetInputSettings()),
			this.Refresh();
	}
	static Clear() {
		(this.CEe = void 0),
			(this.vEe = void 0),
			(this.MEe = void 0),
			(this.EEe = void 0),
			this.SEe.clear(),
			this.yEe.clear(),
			this.IEe();
	}
	static Refresh() {
		this.dea(), this.Cea(), this.gea();
	}
	static dea() {
		var e = this.GetActionNames();
		for (let t = 0; t < e.Num(); t++) {
			var n = e.Get(t),
				s =
					((this.MEe = (0, puerts_1.$ref)(void 0)),
					this.CEe.GetActionMappingByName(n, this.MEe),
					(0, puerts_1.$unref)(this.MEe));
			let i = this.SEe.get(n.toString());
			i || ((i = new Map()), this.SEe.set(n.toString(), i));
			for (let t = 0; t < s.Num(); t++) {
				var a = s.Get(t),
					o = a.Key.KeyName.toString();
				this.TEe(o),
					i.get(o)?.IsEqual(a) ||
						((a =
							InputActionKey_1.InputActionKey.NewByInputActionKeyMapping(a)),
						i.set(o, a));
			}
			s.Empty();
		}
	}
	static Cea() {
		var e = this.GetAxisNames();
		for (let t = 0; t < e.Num(); t++) {
			var n = e.Get(t),
				s =
					(this.CEe.GetAxisMappingByName(n, this.EEe),
					(0, puerts_1.$unref)(this.EEe));
			let i = this.yEe.get(n.toString());
			i || ((i = new Map()), this.yEe.set(n.toString(), i));
			for (let t = 0; t < s.Num(); t++) {
				var a = s.Get(t),
					o = a.Key.KeyName.toString();
				this.TEe(o),
					i.get(o)?.IsEqual(a) ||
						((a = InputAxisKey_1.InputAxisKey.NewByInputAxisKeyMapping(a)),
						i.set(o, a));
			}
			s.Empty();
		}
	}
	static RemoveCombinationActionMapping(t, e, n) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"InputSettings",
				8,
				"删除组合Action按键映射",
				["actionName", t],
				["mainKeyName", e],
				["secondaryKeyName", n],
			);
		t = this.LEe.get(t);
		if (t) {
			var s = t.get(e);
			if (s) {
				let i = -1;
				for (let t = 0; t < s.length; t++)
					if (s[t].GetSecondaryKey()?.GetKeyName() === n) {
						i = t;
						break;
					}
				0 <= i && s?.splice(i, 1), s.length <= 0 && t.delete(e);
			}
		}
	}
	static NewInputCombinationActionKey(t, i, e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug(
				"InputSettings",
				8,
				"添加组合Action按键映射",
				["actionName", t],
				["mainKeyName", i],
				["secondaryKeyName", e],
			),
			this.TEe(i),
			this.TEe(e);
		e = InputCombinationActionKey_1.InputCombinationActionKey.New(t, i, e);
		let n = this.LEe.get(t);
		if (n) {
			let t = n.get(i);
			t ? t.push(e) : ((t = [e]), n.set(i, t));
		} else (n = new Map()).set(i, [e]), this.LEe.set(t, n);
	}
	static gea() {
		this.REe.clear();
		for (const p of ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationAxisConfig()) {
			var t,
				i,
				e,
				n,
				s = p.AxisName,
				a = p.SecondaryKeyScaleMap;
			for ([t, i] of p.PcKeyMap) {
				var o = a.get(t);
				this.DEe(s, i, t, o);
			}
			for ([e, n] of p.GamepadKeyMap) {
				var r = a.get(e);
				this.DEe(s, n, e, r);
			}
		}
	}
	static DEe(t, i, e, n) {
		this.TEe(i), this.TEe(e);
		let s = this.REe.get(t),
			a = (s || ((s = new Map()), this.REe.set(t, s)), s.get(i));
		a || ((a = []), s.set(i, a));
		t = InputCombinationAxisKey_1.InputCombinationAxisKey.New(t, i, e, n);
		a.push(t);
	}
	static SaveKeyMappings() {
		this.CEe?.SaveKeyMappings();
	}
	static TEe(t) {
		this.UEe.has(t) || this.AEe(t);
	}
	static AEe(t) {
		var i = new InputKey_1.InputKey(t);
		this.UEe.set(t, i);
	}
	static IEe() {
		this.UEe.clear();
	}
	static GetKey(t) {
		return this.UEe.get(t);
	}
	static GetUeKey(t) {
		return this.GetKey(t)?.ToUeKey();
	}
	static GetInputAnalogKeyState(t) {
		return this.GetKey(t)?.GetInputAnalogKeyState();
	}
	static IsInputKeyDown(t) {
		t = this.GetKey(t);
		return !!t && t.IsInputKeyDown();
	}
	static IsKeyboardKey(t) {
		var i = this.GetKey(t);
		return i
			? i.IsKeyboardKey
			: ((i = new UE.Key(new UE.FName(t))),
				UE.KismetInputLibrary.Key_IsKeyboardKey(i));
	}
	static IsGamepadKey(t) {
		var i = this.GetKey(t);
		return i
			? i.IsGamepadKey
			: ((i = new UE.Key(new UE.FName(t))),
				UE.KismetInputLibrary.Key_IsGamepadKey(i));
	}
	static IsMouseButton(t) {
		var i = this.GetKey(t);
		return i
			? i.IsMouseButton
			: ((i = new UE.Key(new UE.FName(t))),
				UE.KismetInputLibrary.Key_IsMouseButton(i));
	}
	static IsValidKey(t) {
		return (
			"Keyboard_Invalid" !== t &&
			"Gamepad_Invalid" !== t &&
			"GenericUSBController_ButtonInvalid" !== t
		);
	}
	static GetKeyIconPath(t) {
		var i,
			e,
			n = this.GetKey(t);
		if (n)
			return (
				(i = ConfigManager_1.ConfigManager.InputSettingsConfig),
				n.IsKeyboardKey || n.IsMouseButton
					? (e = i?.GetPcKeyConfig(t))
						? e.KeyIconPath
						: void 0
					: n.IsGamepadKey && (e = i?.GetGamepadKeyConfig(t))
						? !Info_1.Info.IsXboxGamepad() && Info_1.Info.IsPsGamepad()
							? e.PsKeyIconPath
							: e.KeyIconPath
						: void 0
			);
	}
	static SetActionMapping(t, i) {
		if (this.CEe?.IsValid()) {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"InputSettings",
					8,
					"设置Action按键映射",
					["actionName", t],
					["keys", i],
				),
				this.PEe(t);
			for (const e of i) this.xEe(t, e);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"设置Action按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static AddActionMapping(t, i) {
		this.CEe?.IsValid()
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"InputSettings",
						8,
						"添加Action按键映射",
						["actionName", t],
						["key", i],
					),
				this.xEe(t, i))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"添加Action按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static xEe(t, i) {
		this.TEe(i);
		let e = this.GetInputActionKeyMap(t);
		e || ((e = new Map()), this.SEe.set(t, e));
		t = InputActionKey_1.InputActionKey.New(t, !1, !1, !1, !1, i);
		this.CEe.AddActionMapping(t.ToUeInputActionKeyMapping()), e.set(i, t);
	}
	static RemoveActionMappingByCondition(t, i) {
		if (i)
			if (this.CEe?.IsValid()) {
				var e = this.GetInputActionKeyMap(t);
				if (e) {
					var n = [];
					for (const s of e.values()) i(s.KeyName) && n.push(s);
					for (const a of n) this.wEe(a, e);
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
	static RemoveActionMapping(t, i) {
		var e, n;
		this.CEe?.IsValid()
			? (e = this.GetInputActionKeyMap(t)) &&
				((n = e.get(i))
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"InputSettings",
								8,
								"删除Action按键映射",
								["actionName", t],
								["key", i],
							),
						this.wEe(n, e))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"InputSettings",
							8,
							"删除Action按键映射时,找不到对应按键",
							["actionName", t],
							["key", i],
						))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"删除Action按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static wEe(t, i) {
		var e = t.KeyName;
		this.CEe.RemoveActionMapping(t.ToUeInputActionKeyMapping()), i.delete(e);
	}
	static ClearActionMapping(t) {
		this.CEe?.IsValid()
			? this.PEe(t)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"删除Action所有按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static PEe(t) {
		t = this.GetInputActionKeyMap(t);
		if (t) {
			for (const i of t.values())
				this.CEe.RemoveActionMapping(i.ToUeInputActionKeyMapping());
			t.clear();
		}
	}
	static GetInputActionKeyMap(t) {
		return this.SEe.get(t);
	}
	static GetInputActionKey(t, i) {
		t = this.SEe.get(t);
		if (t) return t.get(i);
	}
	static GetActionNames() {
		return this.CEe.GetActionNames(this.vEe), (0, puerts_1.$unref)(this.vEe);
	}
	static GetActionMappings(t) {
		return (
			(this.MEe = (0, puerts_1.$ref)(void 0)),
			this.CEe.GetActionMappingByName(
				FNameUtil_1.FNameUtil.GetDynamicFName(t),
				this.MEe,
			),
			(0, puerts_1.$unref)(this.MEe)
		);
	}
	static SetAxisMapping(t, i) {
		if (this.CEe?.IsValid()) {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"InputSettings",
					8,
					"设置Axis按键映射",
					["actionName", t],
					["keys", i],
				);
			var e,
				n,
				s = this.GetInputAxisKeyMap(t);
			if (s) {
				var a = [];
				for (const p of s.values()) {
					var o = p.KeyName;
					(i.has(o) && p.Scale === i.get(o)) || a.push(p);
				}
				for (const g of a)
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"InputSettings",
							8,
							"删除不在新数据里的数据",
							["AxisName", t],
							["key", g.KeyName],
						),
						this.BEe(g, s);
			}
			for ([e, n] of i) {
				var r = this.GetInputAxisKey(t, e);
				(r && r.Scale === i.get(e)) ||
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug(
							"InputSettings",
							8,
							"新增不在当前的数据",
							["axisName", t],
							["key", e],
						),
					this.bEe(t, n, e));
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
	static AddAxisMapping(t, i, e) {
		this.CEe?.IsValid()
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"InputSettings",
						8,
						"添加Axis按键映射",
						["axisName", t],
						["key", i],
						["scale", e],
					),
				this.bEe(t, e, i))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"添加Axis按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static bEe(t, i, e) {
		this.TEe(e);
		let n = this.GetInputAxisKeyMap(t);
		n || ((n = new Map()), this.yEe.set(t, n));
		t = InputAxisKey_1.InputAxisKey.New(t, i, e);
		this.CEe.AddAxisMapping(t.ToUeInputAxisKeyMapping()), n.set(e, t);
	}
	static RemoveAxisMappingByCondition(t, i) {
		if (i)
			if (this.CEe?.IsValid()) {
				var e = this.GetInputAxisKeyMap(t);
				if (e) {
					var n = [];
					for (const s of e.values()) i(s.KeyName) && n.push(s);
					for (const a of n) this.BEe(a, e);
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
	static RemoveAxisMapping(t, i) {
		var e, n;
		this.CEe?.IsValid()
			? (e = this.GetInputAxisKeyMap(t)) &&
				((n = e.get(i))
					? (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug(
								"InputSettings",
								8,
								"删除Axis按键映射",
								["axisName", t],
								["key", i],
							),
						this.BEe(n, e))
					: Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn(
							"InputSettings",
							8,
							"删除Axis按键映射,找不到对应按键",
							["actionName", t],
							["key", i],
						))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"InputSettings",
					8,
					"添加Axis按键映射时，InputSetting不可用",
					["actionName", t],
				);
	}
	static BEe(t, i) {
		var e = t.KeyName;
		this.CEe.RemoveAxisMapping(t.ToUeInputAxisKeyMapping()), i.delete(e);
	}
	static ClearAxisMapping(t) {
		var i = this.GetInputAxisKeyMap(t);
		if (i) {
			for (const e of i.values())
				this.CEe.RemoveAxisMapping(e.ToUeInputAxisKeyMapping());
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InputSettings", 8, "删除Axis所有按键映射", [
					"axisName",
					t,
				]),
				i.clear();
		}
	}
	static GetInputAxisKeyMap(t) {
		return this.yEe.get(t);
	}
	static GetInputAxisKey(t, i) {
		t = this.yEe.get(t);
		if (t) return t.get(i);
	}
	static GetAxisNames() {
		return this.CEe.GetAxisNames(this.vEe), (0, puerts_1.$unref)(this.vEe);
	}
	static GetAxisMappings(t) {
		return (
			(this.EEe = (0, puerts_1.$ref)(void 0)),
			this.CEe.GetAxisMappingByName(
				FNameUtil_1.FNameUtil.GetDynamicFName(t),
				this.EEe,
			),
			(0, puerts_1.$unref)(this.EEe)
		);
	}
	static GetCombinationActionKeyMap(t) {
		return this.LEe.get(t);
	}
	static GetCombinationActionKey(t, i) {
		t = this.LEe.get(t);
		if (t) return t.get(i);
	}
	static GetCombinationAxisKeyMap(t) {
		return this.REe.get(t);
	}
	static GetCombinationAxisKey(t, i) {
		t = this.REe.get(t);
		if (t) return t.get(i);
	}
	static SetUseMouseForTouch(t) {
		this.CEe && (this.CEe.bUseMouseForTouch = t);
	}
	static GetKeyboardPrimaryLangId() {
		return this.CEe
			? this.CEe.GetKeyboardPrimaryLangId().toString()
			: "Default";
	}
}
((exports.InputSettings = InputSettings).CEe = void 0),
	(InputSettings.UEe = new Map()),
	(InputSettings.SEe = new Map()),
	(InputSettings.yEe = new Map()),
	(InputSettings.LEe = new Map()),
	(InputSettings.REe = new Map()),
	(InputSettings.vEe = (0, puerts_1.$ref)(void 0)),
	(InputSettings.MEe = (0, puerts_1.$ref)(void 0)),
	(InputSettings.EEe = (0, puerts_1.$ref)(void 0));
//# sourceMappingURL=InputSettings.js.map
