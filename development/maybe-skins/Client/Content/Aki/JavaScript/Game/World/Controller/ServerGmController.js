"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ServerGmController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	GlobalData_1 = require("../../GlobalData");
class ServerGmController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			Net_1.Net.Register(17692, ServerGmController.OnServerCommandNotify), !0
		);
	}
	static OnClear() {
		return Net_1.Net.UnRegister(17692), !0;
	}
}
(exports.ServerGmController = ServerGmController).OnServerCommandNotify = (
	e,
) => {
	e.n7s.startsWith("AnimErrorCheck") &&
		(Log_1.Log.CheckWarn() && Log_1.Log.Warn("Test", 6, "AnimErrorCheck Begin"),
		UE.KismetSystemLibrary.ExecuteConsoleCommand(
			GlobalData_1.GlobalData.World,
			"a.CheckBoneNan true",
		),
		UE.KismetSystemLibrary.ExecuteConsoleCommand(
			GlobalData_1.GlobalData.World,
			"a.PrintSkeletalMeshText true",
		),
		TimerSystem_1.TimerSystem.Delay(() => {
			UE.KismetSystemLibrary.ExecuteConsoleCommand(
				GlobalData_1.GlobalData.World,
				"a.CheckBoneNan false",
			),
				UE.KismetSystemLibrary.ExecuteConsoleCommand(
					GlobalData_1.GlobalData.World,
					"a.PrintSkeletalMeshText false",
				),
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Test", 6, "AnimErrorCheck End");
		}, 3e3));
};
