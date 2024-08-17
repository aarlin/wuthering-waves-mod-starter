"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.KuroPerformanceController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	GameQualitySettingsManager_1 = require("../../GameQualitySettings/GameQualitySettingsManager"),
	BOOST_SWITCH = !1,
	TEMPERATURE_SWITCH = !1,
	BOOST_TIME = 1e4;
class KuroPerformanceController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.SettingFrameRateChanged,
				this.z0i,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangePerformanceLimitMode,
				this.Z0i,
			),
			(this.dqo = (0, puerts_1.toManualReleaseDelegate)(this.Rqn)),
			!0
		);
	}
	static OnClear() {
		return (
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBattleStateChanged,
				this.Zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.SettingFrameRateChanged,
				this.z0i,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangePerformanceLimitMode,
				this.Z0i,
			),
			(0, puerts_1.releaseManualReleaseDelegate)(this.Rqn),
			!0
		);
	}
	static OnTick(e) {
		(this.V2t += e),
			this.V2t > 1e4 &&
				((this.V2t = 0), this.xEn(), 0 < this.JIn.size) &&
				this.BEn(!0);
	}
	static Open(e) {
		return 0;
	}
	static Close(e) {}
	static xEn() {}
	static BEn(e) {
		UE.KuroPerformanceBPLibrary.BoostCPU(e ? 100 : 0, 1e4) &&
			e &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Performance", 29, "KuroPerformanceController.BoostCpu");
	}
}
(exports.KuroPerformanceController = KuroPerformanceController),
	((_a = KuroPerformanceController).V2t = 0),
	(KuroPerformanceController.zIn = 0),
	(KuroPerformanceController.JIn = new Map()),
	(KuroPerformanceController.ZIn = 0),
	(KuroPerformanceController.eTn = 0),
	(KuroPerformanceController.xqn = !1),
	(KuroPerformanceController.dqo = void 0),
	(KuroPerformanceController.Zpe = (e) => {
		e ? (_a.ZIn = _a.Open("Battle")) : _a.Close(_a.ZIn);
	}),
	(KuroPerformanceController.z0i = (e) => {
		0 < _a.JIn.size && UE.KuroPerformanceBPLibrary.SetTargetFPS(e);
	}),
	(KuroPerformanceController.Z0i = (e, r) => {
		e && !r ? (_a.eTn = _a.Open("PerformanceLimitMode")) : _a.Close(_a.eTn);
	}),
	(KuroPerformanceController.Rqn = (e, r, t) => {
		if (e) {
			if (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Performance",
						29,
						"KuroPerformanceController.OnGetCurrentTemperature",
						["CurrentTemperature", r],
						["TempBudget", t],
					),
				(r = (e =
					GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo()).GetFrameRate()),
				t < 5)
			)
				30 <= r && ((_a.xqn = !0), e.SetFrameRateTemploary(30));
			else if (t < 10) 45 <= r && ((_a.xqn = !0), e.SetFrameRateTemploary(45));
			else {
				if (!_a.xqn) return;
				(_a.xqn = !1), e.CancelFrameRateTemploary();
			}
			e.ApplyFrameRate();
		}
	});
