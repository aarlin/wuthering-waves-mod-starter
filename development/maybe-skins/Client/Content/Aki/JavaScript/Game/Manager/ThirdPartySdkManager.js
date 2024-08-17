"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ThirdPartySdkManager = void 0);
const UE = require("ue"),
	ue_1 = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Protocol_1 = require("../../Core/Define/Net/Protocol"),
	Net_1 = require("../../Core/Net/Net"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
	ACE_DATA_TRANSFER_INTERVAL_PC = 100,
	ACE_DATA_TRANSFER_INTERVAL_MOBILE = 4e3;
class ThirdPartySdkManager {
	static Init() {
		var e =
				BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
					"Stream",
				),
			r = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
				"Changelist",
				"",
			);
		"Android" ===
			(r =
				((e =
					(ue_1.CrashSightProxy.SetBranchInfo(e, r),
					UE.KuroStaticLibrary.IsModuleLoaded("TpSafe"))) &&
					(void 0 !== ThirdPartySdkManager.BBe &&
						(TimerSystem_1.TimerSystem.Remove(ThirdPartySdkManager.BBe),
						(ThirdPartySdkManager.BBe = void 0)),
					ThirdPartySdkManager.InitDataTransferTimerForTpSafe(),
					Net_1.Net.Register(21630, ThirdPartySdkManager.bBe)),
				UE.GameplayStatics.GetPlatformName())) &&
			((e = UE.KuroAudioStatics.IsAndroidApiUsingOpenSL()),
			ue_1.CrashSightProxy.SetCustomData("AudioAPI", e ? "OpenSL" : "AAudio")),
			this.ARn();
	}
	static ARn() {
		var e = UE.BlueprintPathsLibrary.ProjectSavedDir() + "crashes/trigger";
		UE.BlueprintPathsLibrary.FileExists(e) &&
			(Log_1.Log.CheckError() && Log_1.Log.Error("Login", 22, "崩溃测试！"),
			ue_1.CrashSightProxy.Test());
	}
	static SetUserInfo(e) {
		"" !== e && ThirdPartySdkManager.qBe(e);
	}
	static qBe(e) {
		ue_1.CrashSightProxy.SetUserId(e);
	}
	static SetUserInfoForTpSafe(e, r) {
		var a;
		ue_1.CrashSightProxy.SetCustomData("PlayerId", r.toString()),
			UE.KuroStaticLibrary.IsModuleLoaded("TpSafe") &&
				((a = ThirdPartySdkManager.GBe()),
				ue_1.TpSafeProxy.SetUserInfo(a, 0, e, r));
	}
	static InitDataTransferTimerForTpSafe() {
		let e = 4e3;
		"Windows" === UE.GameplayStatics.GetPlatformName() && (e = 100),
			(ThirdPartySdkManager.BBe = TimerSystem_1.TimerSystem.Forever(() => {
				ThirdPartySdkManager.NBe();
			}, e));
	}
	static NBe() {}
	static GBe() {
		return "Windows" === UE.GameplayStatics.GetPlatformName() ? 601 : 99;
	}
	static Logout() {
		ue_1.TpSafeProxy.Logout();
	}
}
((exports.ThirdPartySdkManager = ThirdPartySdkManager).BBe = void 0),
	(ThirdPartySdkManager.bBe = (e) => {
		ue_1.TpSafeProxy.RecvAntiData(e.bFn);
	});
