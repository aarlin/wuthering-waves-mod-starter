"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.CdKeyInputController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	CDKEY_USE_INTERVAL = 5e3;
class CdKeyInputController extends UiControllerBase_1.UiControllerBase {
	static Qvt() {
		(this.d4s = !0),
			(this.Xvt = 0),
			(this.$vt = TimerSystem_1.TimerSystem.Forever(
				this.Yvt,
				TimeUtil_1.TimeUtil.InverseMillisecond,
			));
	}
	static Jvt() {
		TimerSystem_1.TimerSystem.Has(this.$vt) &&
			TimerSystem_1.TimerSystem.Remove(this.$vt),
			(this.d4s = !1),
			(this.Xvt = 0),
			(this.$vt = void 0);
	}
	static OnClear() {
		return this.Jvt(), !0;
	}
	static CheckInCdKeyUseCd() {
		return this.d4s;
	}
	static GetCdKeyUseCd() {
		var e = Math.ceil(
			(5e3 - this.Xvt) / TimeUtil_1.TimeUtil.InverseMillisecond,
		);
		return Math.max(1, e);
	}
}
(exports.CdKeyInputController = CdKeyInputController),
	((_a = CdKeyInputController).$vt = void 0),
	(CdKeyInputController.d4s = !1),
	(CdKeyInputController.Xvt = 0),
	(CdKeyInputController.Yvt = (e) => {
		(CdKeyInputController.Xvt += e),
			CdKeyInputController.Xvt >= 5e3 && CdKeyInputController.Jvt();
	}),
	(CdKeyInputController.RequestCdKey = async (e) => {
		var t = new Protocol_1.Aki.Protocol.bQn();
		if (
			(e =
				((t.F3n = e),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Functional", 38, "请求CdKey兑换", ["CdKey", e]),
				CdKeyInputController.Qvt(),
				await Net_1.Net.CallAsync(18692, t)))
		)
			return e.lkn;
	});
