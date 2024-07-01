"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombinationActionHandle = void 0);
const Log_1 = require("../../Core/Common/Log"),
	TimeUtil_1 = require("../Common/TimeUtil"),
	InputSettingsManager_1 = require("../InputSettings/InputSettingsManager"),
	InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController");
class CombinationActionHandle {
	constructor() {
		(this.Hde = void 0),
			(this.jde = void 0),
			(this.Wde = 0),
			(this.Kde = void 0);
	}
	Clear() {
		this.Kde = void 0;
	}
	PressAnyKey(t) {
		if (this.Hde) {
			var e =
				InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByKeyName(
					this.Hde,
					t,
				);
			if (e && !(e.size <= 0)) {
				this.jde = t;
				var i = [];
				for (const t of e.values()) i.push(t);
				this.Qde(i);
			}
		} else
			InputSettingsManager_1.InputSettingsManager.IsCombinationActionMainKey(
				t,
			) && this.Xde(t);
	}
	ReleaseAnyKey(t) {
		this.jde === t && this.Kde
			? (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"InputSettings",
						8,
						"[Input]先抬起组合键副键,广播Action抬起",
						["MainKeyName", this.Hde],
						["SecondaryKeyName", this.jde],
					),
				this.$de(),
				(this.jde = void 0))
			: this.Hde === t && this.Yde();
	}
	Xde(t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "[Input]按下组合Action主键", [
				"MainKeyName",
				t,
			]),
			(this.Hde = t),
			(this.Wde = TimeUtil_1.TimeUtil.GetServerTimeStamp());
	}
	Yde() {
		this.jde &&
			this.Kde &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"InputSettings",
					8,
					"[Input]先抬起组合主副键,若副键还没抬起，则也会广播Action抬起",
					["MainKeyName", this.Hde],
					["SecondaryKeyName", this.jde],
				),
			this.$de()),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("InputSettings", 8, "[Input]抬起组合Action主键", [
					"PressMainKeyName",
					this.Hde,
				]),
			(this.Kde = void 0),
			(this.Hde = void 0),
			(this.Wde = 0),
			(this.jde = void 0);
	}
	Qde(t) {
		for (const n of (this.Kde = t)) {
			var e = n.GetActionName(),
				i = n.GetSecondaryKeyValidTime();
			0 < i && TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.Wde > i
				? Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"InputSettings",
						8,
						"[Input]当按下主键超过此时间没有按下副键时，再按下副键不会广播副键的按下和抬起",
						["MainKeyName", this.Hde],
						["SecondaryKeyName", this.jde],
						["ActionName", e],
						["secondaryKeyValidTime", i],
					)
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"InputSettings",
							8,
							"[Input]按下组合Action",
							["MainKeyName", this.Hde],
							["SecondaryKeyName", this.jde],
							["ActionName", e],
						),
					InputDistributeController_1.InputDistributeController.InputAction(
						e,
						!0,
					));
		}
	}
	$de() {
		if (this.Kde)
			for (const e of this.Kde) {
				var t = e.GetActionName();
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"InputSettings",
						8,
						"[Input]抬起组合Action",
						["MainKeyName", this.Hde],
						["SecondaryKeyName", this.jde],
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
		if (this.Hde) {
			var e = [];
			InputSettingsManager_1.InputSettingsManager.GetActionBinding(
				t,
			).GetKeyNameList(e);
			for (const i of e)
				if (
					InputSettingsManager_1.InputSettingsManager.IsCombinationAction(
						this.Hde,
						i,
					)
				)
					return (
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"InputSettings",
								8,
								"[Input]当前已经按下组合键主键，现在按下了任意组合键副键，不会执行副键自己的Action输入",
								["actionName", t],
								["keyName", i],
							),
						!1
					);
		}
		return !0;
	}
}
exports.CombinationActionHandle = CombinationActionHandle;
