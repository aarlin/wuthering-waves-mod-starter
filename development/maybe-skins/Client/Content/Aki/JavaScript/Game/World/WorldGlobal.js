"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldGlobal =
		exports.ONE_METER_FOR_CENTIMETER =
		exports.ONE_SECOND_FOR_MILLISECOND =
		exports.RAY_DISTANCE =
			void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../Core/Common/Log"),
	Protocol_1 = require("../../Core/Define/Net/Protocol"),
	Vector_1 = require("../../Core/Utils/Math/Vector"),
	EventDefine_1 = require("../Common/Event/EventDefine"),
	EventSystem_1 = require("../Common/Event/EventSystem"),
	Global_1 = require("../Global"),
	GlobalData_1 = require("../GlobalData"),
	ConfigManager_1 = require("../Manager/ConfigManager"),
	ControllerHolder_1 = require("../Manager/ControllerHolder"),
	ModelManager_1 = require("../Manager/ModelManager"),
	SeamlessTravelController_1 = require("../Module/SeamlessTravel/SeamlessTravelController");
(exports.RAY_DISTANCE = 200),
	(exports.ONE_SECOND_FOR_MILLISECOND = 1e3),
	(exports.ONE_METER_FOR_CENTIMETER = 100);
class WorldGlobal {
	constructor() {}
	static Initialize() {
		(GlobalData_1.GlobalData.GameInstance.场景加载通知器 = UE.NewObject(
			UE.LoadMapNotify.StaticClass(),
			GlobalData_1.GlobalData.GameInstance,
		)),
			GlobalData_1.GlobalData.GameInstance.场景加载通知器.Clear(),
			GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindBeginTravelLoadMap(
				(0, puerts_1.toManualReleaseDelegate)(WorldGlobal.ZMr),
			),
			GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindBeginLoadMap(
				(0, puerts_1.toManualReleaseDelegate)(WorldGlobal.eSr),
			),
			GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindEndLoadMap(
				(0, puerts_1.toManualReleaseDelegate)(WorldGlobal.tSr),
			),
			GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindLoadStreamLevel(
				(0, puerts_1.toManualReleaseDelegate)(WorldGlobal.iSr),
			),
			GlobalData_1.GlobalData.GameInstance.场景加载通知器.BindUnLoadStreamLevel(
				(0, puerts_1.toManualReleaseDelegate)(WorldGlobal.Kxn),
			);
	}
	static Clear() {
		(0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.eSr),
			(0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.ZMr),
			(0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.tSr),
			(0, puerts_1.releaseManualReleaseDelegate)(WorldGlobal.iSr),
			GlobalData_1.GlobalData.GameInstance.场景加载通知器.Clear();
	}
	static LoadFromMap(e) {
		var a =
			ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapSourceConfig(e);
		a
			? this.OpenLevel(a.MapPath)
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"World",
					3,
					"[WorldGlobal.LoadFromMap] 不存在Id:的AkiMapSourceConfig。",
					["id", e],
				);
	}
	static OpenLevel(e) {
		(ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel &&
			SeamlessTravelController_1.SeamlessTravelController.StartTravel(e)) ||
			WorldGlobal.PlayerClientTravel(
				Global_1.Global.CharacterController,
				ModelManager_1.ModelManager.GameModeModel.MapConfig.MapPath,
			);
	}
	static PlayerClientTravel(e, a) {
		e.ClientTravel(a, 2, !0, void 0);
	}
	static ToUeInt32Array(e, a) {
		if ((a.Empty(), e)) for (const o of e) a.Add(o);
	}
	static ToUeInt64Array(e, a) {
		if ((a.Empty(), e)) for (const o of e) a.Add(o);
	}
	static ToUeFloatArray(e, a) {
		if ((a.Empty(), e)) for (const o of e) a.Add(o);
	}
	static ToUeStringArray(e, a) {
		if ((a.Empty(), e)) for (const o of e) a.Add(o);
	}
	static ToTsArray(e, a) {
		if (e) {
			var o = e.Num();
			a.length = o;
			for (let l = 0; l < o; ++l) a[l] = e.Get(l);
		} else a.length = 0;
	}
	static ResetArraySize(e, a, o) {
		for (; e.Num() > a; ) e.RemoveAt(e.Num() - 1);
		for (; e.Num() < a; ) e.Add(o);
	}
	static ResetTsArraySize(e, a, o) {
		for (; e.length > a; ) e.pop();
		for (; e.length < a; ) e.push(o);
	}
	static ToTsVector(e) {
		var a = Protocol_1.Aki.Protocol.VBs.create();
		return (a.X = e.X), (a.Y = e.Y), (a.Z = e.Z), a;
	}
	static ToUeVector(e) {
		return e ? new UE.Vector(e.X, e.Y, e.Z) : Vector_1.Vector.ZeroVector;
	}
	static ToTsRotator(e) {
		var a = Protocol_1.Aki.Protocol.iws.create();
		return (a.Pitch = e.Pitch), (a.Yaw = e.Yaw), (a.Roll = e.Roll), a;
	}
	static ToUeRotator(e) {
		return e ? new UE.Rotator(e.Pitch, e.Yaw, e.Roll) : new UE.Rotator();
	}
	static ToUeGameplayAttribute(e) {
		var a = new UE.GameplayAttributeData();
		return (
			void 0 !== e &&
				((a.AttributeType = e.Ugs),
				(a.BaseValue = e.Pgs),
				(a.CurrentValue = e.NFn)),
			a
		);
	}
}
((exports.WorldGlobal = WorldGlobal).OnStatStart = () => {
	GlobalData_1.GlobalData.World &&
		!UE.KuroStaticLibrary.IsBuildShipping() &&
		(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Stat", 34, "STAT统计开启"),
		UE.KismetSystemLibrary.ExecuteConsoleCommand(
			GlobalData_1.GlobalData.World,
			"STAT STARTFILE",
		));
}),
	(WorldGlobal.OnStatStop = () => {
		GlobalData_1.GlobalData.World &&
			!UE.KuroStaticLibrary.IsBuildShipping() &&
			(UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"STAT STOPFILE",
			),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug("Stat", 34, "STAT统计结束");
	}),
	(WorldGlobal.ResetLoadTime = () => {
		GlobalData_1.GlobalData.World &&
			!UE.KuroStaticLibrary.IsBuildShipping() &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Stat", 34, "重置LoadTime时长"),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"LoadTimes.TestTime 0",
			));
	}),
	(WorldGlobal.GetLoadTime = () =>
		UE.KuroStaticLibrary.IsBuildShipping()
			? 0
			: UE.KismetSystemLibrary.GetConsoleVariableFloatValue(
					"LoadTimes.TestTime",
				)),
	(WorldGlobal.LoadTimesCheckBegin = (e = "default") => {
		GlobalData_1.GlobalData.World &&
			!UE.KuroStaticLibrary.IsBuildShipping() &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Stat", 34, "LoadTime统计开启：", ["groupName", e]),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"LoadTimes.TestSwitch 1",
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"LoadTimes.DumpTest Start " + e,
			));
	}),
	(WorldGlobal.LoadTimesCheckEnd = () => {
		GlobalData_1.GlobalData.World &&
			!UE.KuroStaticLibrary.IsBuildShipping() &&
			(UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"LoadTimes.DumpTest LOWTIME=-1",
			),
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"LoadTimes.TestSwitch 0",
			),
			Log_1.Log.CheckDebug()) &&
			Log_1.Log.Debug("Stat", 34, "LoadTime统计结束");
	}),
	(WorldGlobal.ZMr = (e) => {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BeforeTravelMap);
	}),
	(WorldGlobal.eSr = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("World", 3, "地图开始加载", ["mapName", e]),
			ModelManager_1.ModelManager.GameModeModel.MapPath === e &&
				ControllerHolder_1.ControllerHolder.GameModeController.BeforeLoadMap();
	}),
	(WorldGlobal.tSr = (e) => {
		GlobalData_1.GlobalData.World?.IsValid()
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("World", 3, "地图加载完成。", ["MapName", e]),
				ModelManager_1.ModelManager.GameModeModel.MapPath === e &&
					(ControllerHolder_1.ControllerHolder.GameModeController.AfterLoadMap(),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.EndTravelMap,
					)))
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("World", 3, "加载地图失败，因为World为空。", [
					"MapName",
					e,
				]);
	}),
	(WorldGlobal.iSr = (e, a, o) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("World", 3, "LoadStream完成。", [
				"LevelName",
				a.toString(),
			]),
			GlobalData_1.GlobalData.World?.IsValid() &&
				ControllerHolder_1.ControllerHolder.GameModeController.OnLoadSubLevel(
					e,
					a.toString(),
					o,
				);
	}),
	(WorldGlobal.Kxn = (e, a) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"World",
				3,
				"UnLoadStream完成。",
				["LinkId", e],
				["LevelName", a.toString()],
			),
			GlobalData_1.GlobalData.World?.IsValid() &&
				ControllerHolder_1.ControllerHolder.GameModeController.OnUnLoadSubLevel(
					e,
					a.toString(),
				);
	});
