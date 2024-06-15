"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombinationActionHandle = void 0);
const Log_1 = require("../../Core/Common/Log"),
	TimeUtil_1 = require("../Common/TimeUtil"),
	InputSettingsManager_1 = require("../InputSettings/InputSettingsManager"),
	InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController");
class CombinationActionHandle {
	constructor() {
		(this._de = void 0),
			(this.ude = void 0),
			(this.cde = 0),
			(this.mde = void 0);
	}
	Clear() {
		this.mde = void 0;
	}
	PressAnyKey(t) {
		if (this._de) {
			var i =
				InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByKeyName(
					this._de,
					t,
				);
			if (i && !(i.size <= 0)) {
				this.ude = t;
				var e = [];
				for (const n of i.values()) e.push(n);
				this.dde(e);
			}
		} else
			InputSettingsManager_1.InputSettingsManager.IsCombinationActionMainKey(
				t,
			) && this.Cde(t);
	}
	ReleaseAnyKey(t) {
		this.ude === t && this.mde
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"InputSettings",
						8,
						"[Input]先抬起组合键副键,广播Action抬起",
						["MainKeyName", this._de],
						["SecondaryKeyName", this.ude],
					),
				this.gde(),
				(this.ude = void 0))
			: this._de === t && this.fde();
	}
	Cde(t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "[Input]按下组合Action主键", [
				"MainKeyName",
				t,
			]),
			(this._de = t),
			(this.cde = TimeUtil_1.TimeUtil.GetServerTimeStamp());
	}
	fde() {
		this.ude &&
			this.mde &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InputSettings",
					8,
					"[Input]先抬起组合主副键,若副键还没抬起，则也会广播Action抬起",
					["MainKeyName", this._de],
					["SecondaryKeyName", this.ude],
				),
			this.gde()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("InputSettings", 8, "[Input]抬起组合Action主键", [
					"PressMainKeyName",
					this._de,
				]),
			(this.mde = void 0),
			(this._de = void 0),
			(this.cde = 0),
			(this.ude = void 0);
	}
	dde(t) {
		for (const n of (this.mde = t)) {
			var i = n.GetActionName(),
				e = n.GetSecondaryKeyValidTime();
			if (0 < e)
				if (TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.cde > e) {
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"InputSettings",
							8,
							"[Input]当按下主键超过此时间没有按下副键时，再按下副键不会广播副键的按下和抬起",
							["MainKeyName", this._de],
							["SecondaryKeyName", this.ude],
							["ActionName", i],
							["secondaryKeyValidTime", e],
						);
					continue;
				}
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InputSettings",
					8,
					"[Input]按下组合Action",
					["MainKeyName", this._de],
					["SecondaryKeyName", this.ude],
					["ActionName", i],
				),
				InputDistributeController_1.InputDistributeController.InputAction(
					i,
					!0,
				);
		}
	}
	gde() {
		if (this.mde)
			for (const i of this.mde) {
				var t = i.GetActionName();
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"InputSettings",
						8,
						"[Input]抬起组合Action",
						["MainKeyName", this._de],
						["SecondaryKeyName", this.ude],
						["ActionName", t],
					);
				try {
					InputDistributeController_1.InputDistributeController.InputAction(
						t,
						!1,
					);
				} catch (t) {
					Log_1.Log.CheckError() &&
						Log_1.Log.Error("InputSettings", 8, "抬起组合Action时出现异常");
				}
			}
	}
	CheckCombinationAction(t) {
		if (this._de) {
			var i = [];
			InputSettingsManager_1.InputSettingsManager.GetActionBinding(
				t,
			).GetKeyNameList(i);
			for (const e of i)
				if (
					InputSettingsManager_1.InputSettingsManager.IsCombinationAction(
						this._de,
						e,
					)
				)
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"InputSettings",
								8,
								"[Input]当前已经按下组合键主键，现在按下了任意组合键副键，不会执行副键自己的Action输入",
								["actionName", t],
								["keyName", e],
							),
						!1
					);
		}
		return !0;
	}
}
exports.CombinationActionHandle = CombinationActionHandle;
//# sourceMappingURL=CombinationActionHandle.js.map
