"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KeySettingRowData = void 0);
const InputSettings_1 = require("../../../InputSettings/InputSettings"),
	InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager");
class KeySettingRowData {
	constructor() {
		(this.xAi = void 0),
			(this.wAi = void 0),
			(this.BAi = 0),
			(this.IsExpandDetail = !1),
			(this.bAi = ""),
			(this.qAi = ""),
			(this.IsActionOrAxis = !0),
			(this.GAi = void 0),
			(this.NAi = void 0),
			(this.OAi = void 0),
			(this.OneActionBinding = void 0),
			(this.TwoActionBinding = void 0),
			(this.kAi = 0),
			(this.dRn = 0),
			(this.HAi = 0),
			(this.CRn = 0),
			(this.IsLock = !1),
			(this.KAi = []),
			(this.QAi = []),
			(this.XAi = []),
			(this.ConnectedKeySettingId = 0),
			(this.KeyTypeName = ""),
			(this.KeyTypeIconSpritePath = ""),
			(this.DetailTextId = ""),
			(this.ConfigId = 0),
			(this.BothActionName = []),
			(this.CanCombination = !1),
			(this.OpenViewType = 0),
			(this.IsCheckSameKey = !0),
			(this.ButtonTextId = void 0);
	}
	InitializeKeyType(t) {
		(this.ConfigId = t.TypeId),
			(this.xAi = t),
			(this.BAi = 1),
			(this.KeyTypeName = t.Name),
			(this.KeyTypeIconSpritePath = t.IconSpritePath);
	}
	InitializeKeySetting(t) {
		var i;
		(this.ConfigId = t.Id),
			(this.wAi = t),
			(this.BAi = 2),
			(this.bAi = t.Name),
			(this.qAi = t.ActionOrAxisName),
			(this.IsActionOrAxis = 1 === t.ActionOrAxis),
			(this.kAi = t.PcKeyIndex),
			(this.dRn = t.XBoxKeyIndex),
			(this.HAi = t.PcAxisValue),
			(this.CRn = t.XBoxAxisValue),
			(this.IsLock = t.IsLock),
			(this.KAi = t.AllowKeys),
			(this.DetailTextId = t.DetailTextId),
			(this.BothActionName = t.BothActionName),
			(this.CanCombination = t.CanCombination),
			(this.QAi = t.AllowMainKeys),
			(this.XAi = t.AllowSecondKeys),
			(this.OpenViewType = t.OpenViewType),
			(this.IsCheckSameKey = t.IsCheckSameKey),
			(this.ButtonTextId = t.ButtonTextId),
			(this.ConnectedKeySettingId = t.ConnectedKeySettingId),
			this.BothActionName && 2 === this.BothActionName.length
				? ((t = this.BothActionName[0]),
					(i = this.BothActionName[1]),
					(this.OneActionBinding =
						InputSettingsManager_1.InputSettingsManager.GetActionBinding(t)),
					(this.TwoActionBinding =
						InputSettingsManager_1.InputSettingsManager.GetActionBinding(i)))
				: this.IsActionOrAxis
					? (this.GAi =
							InputSettingsManager_1.InputSettingsManager.GetActionBinding(
								this.qAi,
							))
					: ((this.OAi =
							InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingByActionName(
								this.qAi,
							)),
						(this.NAi =
							InputSettingsManager_1.InputSettingsManager.GetAxisBinding(
								this.qAi,
							)));
	}
	$Ai() {
		return InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
			this.qAi,
		);
	}
	Clear() {
		(this.GAi = void 0),
			(this.NAi = void 0),
			(this.OAi = void 0),
			(this.OneActionBinding = void 0),
			(this.TwoActionBinding = void 0);
	}
	GetRowType() {
		return this.BAi;
	}
	GetKeyTypeConfig() {
		return this.xAi;
	}
	GetKeySettingConfig() {
		return this.wAi;
	}
	GetSettingName() {
		return this.bAi;
	}
	GetDisplayKeyName(t) {
		return this.OneActionBinding && this.TwoActionBinding
			? this.GetBothActionKeyName(
					this.OneActionBinding,
					this.TwoActionBinding,
					t,
				)
			: this.GetCurrentKeyName(t);
	}
	GetBothActionKeyName(t, i, e) {
		if (t && i)
			return (
				t.GetKeyNameList((t = [])),
				i.GetKeyNameList((i = [])),
				[t[this.GetKeyIndex(e)], i[this.GetKeyIndex(e)]]
			);
	}
	GetCurrentKeyName(t) {
		return this.IsActionOrAxis ? this.YAi(t) : this.JAi(t);
	}
	GetCurrentKeyNameRichText(t, i = "+") {
		var e = this.GetDisplayKeyName(t);
		return e ? this.GetKeyNameRichTextByKeyNameList(t, e, i) : "";
	}
	GetKeyNameRichTextByKeyNameList(t, i, e = "+") {
		if (!i) return "";
		let n = "";
		for (let a = 0; a < i.length; a++) {
			var s = i[a];
			(s = this.GetKeyIconPath(s, t)) && (n += `<texture=${s}>`),
				a < i.length - 1 && (n += e);
		}
		return n;
	}
	GetKeyIconPath(t, i) {
		var e = ConfigManager_1.ConfigManager.InputSettingsConfig;
		switch (i) {
			case 1:
				var n = e?.GetPcKeyConfig(t);
				if (n) return n.KeyIconPath;
				break;
			case 2:
				if (((n = e?.GetGamepadKeyConfig(t)), n))
					return 7 ===
						ModelManager_1.ModelManager.PlatformModel.GetCurrentDeviceControllerPlatform()
						? n.PsKeyIconPath
						: n.KeyIconPath;
				break;
			default:
				return;
		}
	}
	zAi(t) {
		var i;
		return (
			!!this.GAi &&
			((t = this.GetKeyIndex(t)),
			this.GAi.GetKeyNameList((i = [])),
			!!(i = i[t])) &&
			InputSettings_1.InputSettings.IsValidKey(i)
		);
	}
	IsCombination(t) {
		if (this.IsActionOrAxis) {
			var i = this.$Ai();
			if (!i) return !this.zAi(t);
			if (i)
				switch (t) {
					case 1:
						return i.HasKeyboardCombinationAction();
					case 2:
						return i.HasGamepadCombinationAction();
				}
		} else if (this.OAi)
			switch (t) {
				case 1:
					return this.OAi.HasKeyboardCombinationAxis();
				case 2:
					return this.OAi.HasGamepadCombinationAxis();
			}
		return !1;
	}
	YAi(t) {
		if (this.IsCombination(t)) {
			var i,
				e,
				n = new Map();
			switch (t) {
				case 1:
					this.$Ai()?.GetPcKeyNameMap(n);
					break;
				case 2:
					this.$Ai()?.GetGamepadKeyNameMap(n);
					break;
				default:
					return;
			}
			if (n) for ([i, e] of n) return [i, e];
		} else if (this.GAi) {
			var s = [];
			switch ((this.GAi?.GetKeyNameList(s), t)) {
				case 1:
					return [s[this.kAi]];
				case 2:
					return [s[this.dRn]];
				default:
					return;
			}
		}
	}
	JAi(t) {
		if (this.IsCombination(t)) {
			var i,
				e,
				n = new Map();
			switch (t) {
				case 1:
					this.OAi?.GetPcKeyNameMap(n);
					break;
				case 2:
					this.OAi?.GetGamepadKeyNameMap(n);
					break;
				default:
					return;
			}
			if (n) for ([i, e] of n) return [i, e];
		} else {
			var s = this.NAi?.GetInputAxisKeyMap();
			if (s)
				for (var [a, r] of s) {
					var h = r.GetKey();
					if (h)
						switch (t) {
							case 1:
								if (
									(h.IsKeyboardKey || h.IsMouseButton) &&
									r.Scale === this.HAi
								)
									return [a];
								break;
							case 2:
								if (h.IsGamepadKey && r.Scale === this.CRn) return [a];
								break;
							default:
								return;
						}
				}
		}
	}
	ChangeBothAction(t) {
		var i, e, n;
		this.OneActionBinding &&
			this.TwoActionBinding &&
			((e = []),
			this.OneActionBinding.GetKeyNameList((i = [])),
			this.TwoActionBinding.GetKeyNameList(e),
			i) &&
			e &&
			((n = e[(t = this.GetKeyIndex(t))]),
			(e[t] = i[t]),
			(i[t] = n),
			this.OneActionBinding.SetKeys(i),
			this.TwoActionBinding.SetKeys(e));
	}
	ZAi(t) {
		if (this.GAi) {
			var i = [],
				e = (this.GAi.GetKeyNameList(i), this.GetKeyIndex(t));
			switch (t) {
				case 1:
					i[e] = "Keyboard_Invalid";
					break;
				case 2:
					i[e] = "Gamepad_Invalid";
			}
			this.GAi.SetKeys(i);
		}
	}
	ePi(t) {
		for (let i = 0; i < t.length; i++) t[i] || (t[i] = "Keyboard_Invalid");
	}
	SetKey(t, i) {
		return this.IsActionOrAxis
			? this.tPi(t, i)
			: !this.IsCombination(i) && this.iPi(t[0], i);
	}
	tPi(t, i) {
		if (!t || t.length <= 0)
			this.GAi && this.GAi.SetKeys([]),
				InputSettingsManager_1.InputSettingsManager.ClearCombinationActionKeyMap();
		else {
			var e = this.GetCurrentKeyName(i);
			if (e[0] !== t[0] || e[1] !== t[1])
				if (
					(1 < e.length &&
						InputSettingsManager_1.InputSettingsManager.RemoveCombinationActionKeyMap(
							this.qAi,
							e[0],
							e[1],
						),
					1 !== t.length && this.CanCombination)
				)
					1 < t.length &&
						(InputSettingsManager_1.InputSettingsManager.AddCombinationActionKeyMap(
							this.qAi,
							t[0],
							t[1],
						),
						this.ZAi(i));
				else if (((e = t[0]), (i = this.GetKeyIndex(i)), this.GAi)) {
					const t = [];
					return (
						this.GAi.GetKeyNameList(t),
						!!t && ((t[i] = e), this.ePi(t), this.GAi.SetKeys(t), !0)
					);
				}
		}
		return !0;
	}
	iPi(t, i) {
		if (!this.NAi) return !1;
		if (!t && this.NAi) {
			const t = new Map();
			this.NAi.SetKeys(t);
		} else {
			let a, r;
			const h = this.GetAxisKeyScaleMap();
			for (var [e, n] of h) {
				var s = InputSettings_1.InputSettings.GetKey(e);
				if (s) {
					if (
						(s.IsKeyboardKey || s.IsMouseButton) &&
						1 === i &&
						n === this.HAi
					) {
						(a = e), (r = n);
						break;
					}
					if (s.IsGamepadKey && 2 === i && n === this.CRn) {
						(a = e), (r = n);
						break;
					}
				}
			}
			a && h.delete(a), r && t && h.set(t, r), this.NAi.SetKeys(h);
		}
		return !0;
	}
	SetAxisBindingKeys(t) {
		this.NAi?.SetKeys(t);
	}
	GetAxisKeyScaleMap() {
		var t = new Map();
		if (this.NAi) {
			var i = this.NAi.GetInputAxisKeyMap();
			if (i) for (var [e, n] of i) t.set(e, n.Scale);
		}
		return t;
	}
	GetKeyIndex(t) {
		switch (t) {
			case 1:
				return this.kAi;
			case 2:
				return this.dRn;
			default:
				return -1;
		}
	}
	GetKeyScale(t) {
		switch (t) {
			case 1:
				return this.HAi;
			case 2:
				return this.CRn;
			default:
				return 0;
		}
	}
	IsAllowKey(t) {
		return !this.KAi || this.KAi.length <= 0 || this.KAi.includes(t);
	}
	IsAllowCombinationKey(t, i) {
		let e = !1;
		if (!(e = !this.QAi || this.QAi.length <= 0 || this.QAi.includes(t)))
			return !1;
		return !this.XAi || this.XAi.length <= 0 || this.XAi.includes(i);
	}
	HasKey(t, i) {
		if (1 < t.length) {
			if (this.IsCombination(i)) {
				var e = this.$Ai();
				if (e) return e.HasKey(t[0], t[1]);
				if (this.OAi) return this.OAi.HasKey(t[0], t[1]);
			}
		} else {
			var n = t[0];
			if (this.GAi)
				return (
					(e = this.GetKeyIndex(i)),
					this.GAi.GetKeyNameList((t = [])),
					t[e] === n
				);
			if (this.NAi) {
				t = this.GetKeyScale(i);
				for (const i of this.NAi.GetKey(t)) if (i.KeyName === n) return !0;
			}
		}
		return !1;
	}
	GetActionOrAxisName() {
		return this.qAi;
	}
}
exports.KeySettingRowData = KeySettingRowData;
