"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PerfSight = void 0);
const UE = require("ue"),
	BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
	Info_1 = require("../Common/Info"),
	DEBUG_LOG = !1,
	APP_ID_LOCAL = "688476493",
	APP_ID_GLOBAL = "424155224";
class PerfSight {
	static Initialize() {
		var t;
		return (
			this.IsEnable &&
				(DEBUG_LOG && UE.PerfSightHelper.EnableDebugMode(),
				(t =
					"CN" !==
					BaseConfigController_1.BaseConfigController.GetPublicValue(
						"SdkArea",
					)),
				Info_1.Info.IsPcOrGamepadPlatform() &&
					(t
						? UE.PerfSightHelper.SetPCServerURL("pc.perfsight.wetest.net")
						: UE.PerfSightHelper.SetPCServerURL("pc.perfsight.qq.com")),
				t
					? UE.PerfSightHelper.InitContext(APP_ID_GLOBAL)
					: UE.PerfSightHelper.InitContext(APP_ID_LOCAL)),
			!0
		);
	}
	static SetPcAppVersion(t) {
		UE.PerfSightHelper.SetPCAppVersion(t);
	}
	static SetVersionIden(t) {
		UE.PerfSightHelper.SetVersionIden(t);
	}
	static PostEvent(t, e) {
		UE.PerfSightHelper.PostEvent(t, e);
	}
	static PostValueF1(t, e, s, a) {
		UE.PerfSightHelper.PostValueF1(t, e, s, a);
	}
	static PostValueF2(t, e, s, a, i) {
		UE.PerfSightHelper.PostValueF2(t, e, s, a, i);
	}
	static PostValueF3(t, e, s, a, i, o) {
		UE.PerfSightHelper.PostValueF3(t, e, s, a, i, o);
	}
	static PostValueI1(t, e, s, a) {
		UE.PerfSightHelper.PostValueI1(t, e, s, a);
	}
	static PostValueI2(t, e, s, a, i) {
		UE.PerfSightHelper.PostValueI2(t, e, s, a, i);
	}
	static PostValueI3(t, e, s, a, i, o) {
		UE.PerfSightHelper.PostValueI3(t, e, s, a, i, o);
	}
	static PostValueS(t, e, s, a) {
		UE.PerfSightHelper.PostValueS(t, e, s, a);
	}
	static MarkLevelLoad(t, e) {
		UE.PerfSightHelper.MarkLevelLoad(t, e);
	}
	static MarkLevelFin() {
		UE.PerfSightHelper.MarkLevelFin();
	}
	static MarkLevelLoadCompleted() {
		UE.PerfSightHelper.MarkLevelLoadCompleted();
	}
	static SetUserId(t) {
		UE.PerfSightHelper.SetUserId(t);
	}
	static BeginExtTag(t) {
		UE.PerfSightHelper.BeginExtTag(t);
	}
	static EndExtTag(t) {
		UE.PerfSightHelper.EndExtTag(t);
	}
	static PostFrame(t, e) {
		UE.PerfSightHelper.PostFrame(t, e);
	}
	static PostNetworkLatency(t, e, s) {
		UE.PerfSightHelper.PostNetworkLatency(t, e, s);
	}
}
(exports.PerfSight = PerfSight).IsEnable = !0;
//# sourceMappingURL=PerfSight.js.map
