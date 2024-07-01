"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InputCombinationAxisMapping = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	InputCombinationAxisBinding_1 = require("../Binding/InputCombinationAxisBinding");
class InputCombinationAxisMapping {
	constructor() {
		(this.ZSe = new Map()), (this.eEe = new Map()), (this.zSe = new Set());
	}
	Initialize() {
		var e =
			ConfigManager_1.ConfigManager.InputSettingsConfig.GetAllCombinationAxisConfig();
		if (e) for (const i of e) this.tEe(i);
	}
	Clear() {
		for (const e of this.ZSe.values()) e.Clear();
		this.ZSe.clear(), this.eEe.clear();
	}
	tEe(e) {
		var i = e.AxisName,
			n = new InputCombinationAxisBinding_1.InputCombinationAxisBinding();
		n.Initialize(e),
			this.ZSe.set(i, n),
			(e = new Map()),
			n.GetPcKeyNameMap(e),
			(i = new Map());
		n.GetGamepadKeyNameMap(i), this.iEe(n, e), this.iEe(n, i);
	}
	iEe(e, i) {
		for (var [n, t] of i) {
			let i = this.eEe.get(t),
				a = (i || ((i = new Map()), this.eEe.set(t, i)), i.get(n));
			a || ((a = []), i.set(n, a)),
				a.push(e),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Test",
						8,
						"[AddKeyMap]",
						["mainKeyName", t],
						["secondaryKeyName", n],
						["MainKeySet", this.zSe],
					),
				this.zSe.add(t);
		}
	}
	GetCombinationAxisBindingMapByMainKeyName(e) {
		return this.eEe.get(e);
	}
	GetCombinationAxisBindingByKeyName(e, i) {
		if ((e = this.eEe.get(e))) return e.get(i);
	}
	GetCombinationAxisBindingByActionName(e) {
		return this.ZSe.get(e);
	}
	IsMainKey(e) {
		return this.zSe.has(e);
	}
}
exports.InputCombinationAxisMapping = InputCombinationAxisMapping;
