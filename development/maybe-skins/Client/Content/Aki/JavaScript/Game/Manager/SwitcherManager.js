"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SwitcherManager = void 0);
const TimeOfDayController_1 = require("../Module/TimeOfDay/TimeOfDayController"),
	EffectGlobal_1 = require("../Render/Effect/EffectGlobal");
class SwitcherManager {
	static Initialize() {
		this.AllSwitcher.set("特效生成Log", [
			() => EffectGlobal_1.EffectGlobal.EnableSpawnLog,
			(e) => {
				EffectGlobal_1.EffectGlobal.EnableSpawnLog = e;
			},
		]),
			this.AllSwitcher.set("打开TOD时间同步", [
				() => TimeOfDayController_1.TimeOfDayController.IsSyncToEngine,
				(e) => {
					TimeOfDayController_1.TimeOfDayController.IsSyncToEngine = e;
				},
			]);
	}
}
(exports.SwitcherManager = SwitcherManager).AllSwitcher = new Map();
