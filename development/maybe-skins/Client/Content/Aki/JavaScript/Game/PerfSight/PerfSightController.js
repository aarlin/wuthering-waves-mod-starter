"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PerfSightController = void 0);
const UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Stats_1 = require("../../Core/Common/Stats"),
	CommonDefine_1 = require("../../Core/Define/CommonDefine"),
	ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
	NetInfo_1 = require("../../Core/Net/NetInfo"),
	TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
	BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	LocalStorage_1 = require("../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../Common/LocalStorageDefine"),
	Global_1 = require("../Global"),
	ControllerHolder_1 = require("../Manager/ControllerHolder"),
	ModelManager_1 = require("../Manager/ModelManager"),
	APP_ID_LOCAL = "688476493",
	APP_ID_GLOBAL = "424155224",
	CHECKTIMEGAP =
		CommonDefine_1.MILLIONSECOND_PER_SECOND *
		CommonDefine_1.SECOND_PER_MINUTE *
		5,
	DEBUG_LOG = !1;
class PerfSightController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		if (!super.OnInit())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("Performance", 55, "PerfSightController OnInit失败"),
				!1
			);
		if (PerfSightController.IsEnable) {
			var e =
				(e =
					((e =
						"CN" !==
						BaseConfigController_1.BaseConfigController.GetPublicValue(
							"SdkArea",
						))
						? UE.PerfSightHelper.SetPCServerURL("pc.perfsight.wetest.net")
						: UE.PerfSightHelper.SetPCServerURL("pc.perfsight.qq.com"),
					e
						? UE.PerfSightHelper.InitContext("424155224")
						: UE.PerfSightHelper.InitContext("688476493"),
					UE.KuroLauncherLibrary.GetAppVersion())) +
				"_" +
				LocalStorage_1.LocalStorage.GetGlobal(
					LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
					e,
				);
			if (
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Performance", 55, "当前母包_热更版本号", [
						"version",
						e,
					]),
				3 === ModelManager_1.ModelManager.PlatformModel.PlatformType)
			)
				UE.PerfSightHelper.SetPCAppVersion(e);
			else {
				if (
					2 !== ModelManager_1.ModelManager.PlatformModel.PlatformType &&
					1 !== ModelManager_1.ModelManager.PlatformModel.PlatformType
				)
					return !0;
				UE.PerfSightHelper.SetVersionIden(e);
			}
			PerfSightController.sCe();
		}
		return !0;
	}
	static OnClear() {
		return (
			PerfSightController.IsEnable &&
				(PerfSightController.aCe(),
				PerfSightController.U7s(),
				PerfSightController.p7e(),
				PerfSightController.T7s()),
			super.OnClear()
		);
	}
	static Tit() {
		PerfSightController.p7e(),
			PerfSightController.j3
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Performance",
						55,
						"PerfSightController.Timer不该有值,请检查",
					)
				: (PerfSightController.j3 = TimerSystem_1.RealTimeTimerSystem.Forever(
						PerfSightController.c7e,
						CHECKTIMEGAP,
						1,
						void 0,
						void 0,
						!1,
					));
	}
	static p7e() {
		PerfSightController.j3 &&
			(TimerSystem_1.RealTimeTimerSystem.Remove(PerfSightController.j3),
			(PerfSightController.j3 = void 0));
	}
	static L7s() {
		PerfSightController.T7s(),
			PerfSightController.D7s
				? Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Performance",
						55,
						"PerfSightController.PositionTimer,请检查",
					)
				: (PerfSightController.D7s = TimerSystem_1.RealTimeTimerSystem.Forever(
						PerfSightController.A7s,
						CommonDefine_1.MILLIONSECOND_PER_SECOND,
					));
	}
	static T7s() {
		PerfSightController.D7s &&
			(TimerSystem_1.RealTimeTimerSystem.Remove(PerfSightController.D7s),
			(PerfSightController.D7s = void 0));
	}
	static mbn(e) {
		PerfSightController.IsRecording
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("Performance", 55, "正在录制, 本次StartRecord无效")
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Performance", 55, "开始录制MarkLevelLoad", [
						"tagName",
						e,
					]),
				(PerfSightController.IsRecording = !0),
				UE.PerfSightHelper.MarkLevelLoad(e));
	}
	static U7s() {
		PerfSightController.IsRecording &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Performance", 55, "停止录制MarkLevelFin"),
			(PerfSightController.IsRecording = !1),
			UE.PerfSightHelper.MarkLevelFin());
	}
	static sCe() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnGetPlayerBasicInfo,
			PerfSightController.Wpi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDone,
				PerfSightController.nye,
			);
	}
	static aCe() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnGetPlayerBasicInfo,
			PerfSightController.Wpi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDone,
				PerfSightController.nye,
			);
	}
	static OnTick(e) {
		PerfSightController.IsEnable && UE.PerfSightHelper.PostFrame(e);
	}
}
((exports.PerfSightController = PerfSightController).IsTickEvenPausedInternal =
	!0),
	(PerfSightController.j3 = void 0),
	(PerfSightController.D7s = void 0),
	(PerfSightController.IsEnable = !0),
	(PerfSightController.IsRecording = !1),
	(PerfSightController.MJ = void 0),
	(PerfSightController.c7e = () => {
		PerfSightController.U7s(), PerfSightController.mbn("Persistent");
	}),
	(PerfSightController.A7s = () => {
		var e =
			Global_1.Global.BaseCharacter?.CharacterActorComponent
				?.ActorLocationProxy;
		e &&
			UE.PerfSightHelper.PostValueF3(
				"PositionAnalysis",
				"position",
				e.X,
				e.Y,
				e.Z,
			);
	}),
	(PerfSightController.Wpi = () => {
		var e = ModelManager_1.ModelManager.FunctionModel.PlayerId.toString();
		UE.PerfSightHelper.SetUserId(e),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Performance", 55, "SetUserId", ["playerId", e]),
			NetInfo_1.NetInfo.SetCallback(PerfSightController.R7s),
			PerfSightController.L7s();
	}),
	(PerfSightController.nye = () => {
		var e;
		PerfSightController.U7s(),
			PerfSightController.p7e(),
			ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
				? ((e =
						"Dungeon_" +
						ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
					PerfSightController.mbn(e))
				: (PerfSightController.mbn("Persistent"), PerfSightController.Tit());
	}),
	(PerfSightController.R7s = (e) => {
		PerfSightController.IsEnable && UE.PerfSightHelper.PostNetworkLatency(e);
	});
