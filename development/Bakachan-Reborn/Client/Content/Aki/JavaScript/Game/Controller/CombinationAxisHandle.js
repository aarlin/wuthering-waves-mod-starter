"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CombinationAxisHandle = void 0);
const Log_1 = require("../../Core/Common/Log"),
	TimeUtil_1 = require("../Common/TimeUtil"),
	Global_1 = require("../Global"),
	InputSettings_1 = require("../InputSettings/InputSettings"),
	InputSettingsManager_1 = require("../InputSettings/InputSettingsManager"),
	InputDistributeController_1 = require("../Ui/InputDistribute/InputDistributeController");
class CombinationAxisHandle {
	constructor() {
		(this.Hde = void 0),
			(this.PressMainKeyTimeStamp = 0),
			(this.Jde = void 0),
			(this.zde = !1);
	}
	Clear() {
		this.Jde = void 0;
	}
	PressAnyKey(t) {
		this.Hde ||
			(InputSettingsManager_1.InputSettingsManager.IsCombinationAxisMainKey(t)
				? this.Xde(t)
				: (this.zde = !0));
	}
	ReleaseAnyKey(t) {
		this.Hde === t ? this.Yde() : (this.zde = !1);
	}
	Xde(t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InputSettings", 8, "[Input]按下组合Axis主键", [
				"MainKeyName",
				t,
			]),
			(this.Hde = t),
			(this.PressMainKeyTimeStamp = TimeUtil_1.TimeUtil.GetServerTimeStamp()),
			(this.Jde =
				InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingMapByMainKeyName(
					t,
				));
	}
	Yde() {
		for (const e of this.Jde.values())
			for (const i of e) {
				var t = i.GetAxisName();
				InputDistributeController_1.InputDistributeController.InputAxis(t, 0);
			}
		(this.Jde = void 0), (this.Hde = void 0), (this.PressMainKeyTimeStamp = 0);
	}
	Tick(t) {
		if (!this.zde && this.Jde && !(this.Jde.size <= 0)) {
			var e,
				i,
				n = Global_1.Global.CharacterController;
			for ([e, i] of this.Jde) {
				var s = InputSettings_1.InputSettings.GetUeKey(e),
					o = n.GetInputAnalogKeyState(s);
				for (const t of i) {
					var r = t.GetAxisName(),
						a = o * t.GetSourceAxisValue(e);
					InputDistributeController_1.InputDistributeController.InputAxis(r, a);
				}
			}
		}
	}
}
exports.CombinationAxisHandle = CombinationAxisHandle;
