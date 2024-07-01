"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiTimeDilation = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Net_1 = require("../../../Core/Net/Net"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../../../Game/Manager/ModelManager"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	UiConfig_1 = require("../Define/UiConfig");
class UiTimeDilation {
	static set GmSwitch(i) {
		UiTimeDilation.R4s = i;
	}
	static get GmSwitch() {
		return UiTimeDilation.R4s;
	}
	static get Qht() {
		return UiTimeDilation.x4s?.TimeDilation ?? 1;
	}
	static get P4s() {
		return UiTimeDilation.x4s?.ViewId ?? 0;
	}
	static get B4s() {
		return UiTimeDilation.x4s?.DebugName;
	}
	static get pLe() {
		return UiTimeDilation.x4s?.Reason ?? "UiTimeDilation";
	}
	static Init() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OpenView,
			UiTimeDilation.T_r,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.CloseView,
				UiTimeDilation.L_r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ResetModuleByResetToBattleView,
				UiTimeDilation.D_r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ClearWorld,
				UiTimeDilation.D_r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ChangeMode,
				UiTimeDilation.R_r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
				UiTimeDilation.U_r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.ReConnectSuccess,
				UiTimeDilation.A_r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnSequenceCameraStatus,
				UiTimeDilation.P_r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.EnterGameSuccess,
				UiTimeDilation.A_r,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnStartLoadingState,
				UiTimeDilation.Jxn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnFinishLoadingState,
				UiTimeDilation.zxn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.LevelLoadingLockTimeDilation,
				UiTimeDilation.w4s,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.LevelLoadingUnlockDilation,
				UiTimeDilation.b4s,
			);
	}
	static Destroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OpenView,
			UiTimeDilation.T_r,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.CloseView,
				UiTimeDilation.L_r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ResetModuleByResetToBattleView,
				UiTimeDilation.D_r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ClearWorld,
				UiTimeDilation.D_r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ChangeMode,
				UiTimeDilation.R_r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.UpdatePanelQteWorldTimeDilation,
				UiTimeDilation.U_r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.ReConnectSuccess,
				UiTimeDilation.A_r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnSequenceCameraStatus,
				UiTimeDilation.P_r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.EnterGameSuccess,
				UiTimeDilation.A_r,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnStartLoadingState,
				UiTimeDilation.Jxn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnFinishLoadingState,
				UiTimeDilation.zxn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.LevelLoadingLockTimeDilation,
				UiTimeDilation.w4s,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.LevelLoadingUnlockDilation,
				UiTimeDilation.b4s,
			);
	}
	static w_r(i, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"UiTimeDilation",
				11,
				"输出外部调用时停原因",
				["原因", e],
				["是否触发真时停", i < MathUtils_1.MathUtils.KindaSmallNumber],
			);
	}
	static q4s(i) {
		(UiTimeDilation.F_r && 1 !== UiTimeDilation.F_r.TimeDilation) ||
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"UiTimeDilation",
					11,
					"缓存数据添加",
					["触发界面", i.DebugName],
					["界面Id", i.ViewId],
				),
			(UiTimeDilation.F_r = i));
	}
	static G4s(i) {
		return ModelManager_1.ModelManager.GameModeModel
			? UiTimeDilation.O_r()
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiTimeDilation",
							11,
							"联机状态,不允许设置界面时停",
							["触发界面", i.DebugName],
							["界面Id", i.ViewId],
						),
					!1)
				: (UiTimeDilation.B_r(i),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiTimeDilation",
							11,
							"界面时停设置",
							["触发界面", i.DebugName],
							["设置流速", i.TimeDilation],
							["界面Id", i.ViewId],
						),
					!0)
			: (Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiTimeDilation",
						11,
						"GameModeModel不存在,不允许设置界面时停",
						["触发界面", i.DebugName],
						["界面Id", i.ViewId],
					),
				!1);
	}
	static B_r(i) {
		var e = i.TimeDilation;
		(UiTimeDilation.x4s = 1 !== e ? i : void 0),
			UiTimeDilation.w_r(e, i.Reason),
			UiTimeDilation.q_r
				? ((UiTimeDilation.G_r = e < MathUtils_1.MathUtils.KindaSmallNumber),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiTimeDilation",
							11,
							"界面时停被更高级别时停影响，实际未生效",
						))
				: UiTimeDilation.GmSwitch
					? ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
							e * UiTimeDilation.O4s,
						)
					: e < MathUtils_1.MathUtils.KindaSmallNumber
						? ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
								!0,
								"UiTimeDilation",
							)
						: ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
								!1,
								"UiTimeDilation",
								e * UiTimeDilation.O4s,
							);
	}
	static SetGameTimeDilation(i) {
		return (
			Net_1.Net.IsServerConnected() || UiTimeDilation.S_r("ServerConnect"),
			UiTimeDilation.k_r()
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiTimeDilation",
							11,
							"有需要等待设置时停的tag,不允许设置界面时停",
							["触发界面", i.DebugName],
							["界面Id", i.ViewId],
							["Tag", UiTimeDilation.E_r],
						),
					UiTimeDilation.q4s(i),
					!1)
				: UiTimeDilation.G4s(i)
		);
	}
	static O_r() {
		return ModelManager_1.ModelManager.GameModeModel.IsMulti;
	}
	static SetTimeDilationHighLevel(i, e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"UiTimeDilation",
				11,
				"设置高级别时停",
				["时停参数", i],
				["Reason", e],
			),
			(UiTimeDilation.q_r = !0),
			UiTimeDilation.GmSwitch
				? ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
						i,
					)
				: i < MathUtils_1.MathUtils.KindaSmallNumber
					? ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
							!0,
							e,
						)
					: ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
							!1,
							"UiTimeDilation",
							i,
						);
	}
	static ResetTimeDilationHighLevel(i) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiTimeDilation", 11, "恢复高级别时停"),
			(UiTimeDilation.q_r = !1),
			ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
				UiTimeDilation.G_r,
				"UiTimeDilation",
			);
		var e = UiTimeDilation.Qht;
		UiTimeDilation.GmSwitch
			? ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
					e,
				)
			: e < MathUtils_1.MathUtils.KindaSmallNumber
				? ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
						!1,
						i,
					)
				: ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
						!1,
						i,
						e,
					);
	}
	static V_r() {
		var i;
		UiTimeDilation.F_r &&
			(UiTimeDilation.H_r !== UiTimeDilation.F_r.ViewId
				? (UiTimeDilation.F_r = void 0)
				: UiTimeDilation.SetGameTimeDilation(UiTimeDilation.F_r) &&
					((UiTimeDilation.H_r = UiTimeDilation.F_r.ViewId),
					(i = UiTimeDilation.F_r.DebugName),
					(UiTimeDilation.F_r = void 0),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info(
						"UiTimeDilation",
						11,
						"缓存数据设置成功",
						["界面", i],
						["界面Id", UiTimeDilation.H_r],
					));
	}
	static AddViewData(i, e) {
		(i = UiConfig_1.UiConfig.TryGetViewInfo(i)).TimeDilation < 1 &&
			(UiTimeDilation.j_r.push(e),
			UiTimeDilation.W_r.set(e, {
				ViewId: e,
				TimeDilation: i.TimeDilation,
				DebugName: i.Name,
				Reason: "UiTimeDilation",
			}));
	}
	static RemoveViewData(i) {
		UiTimeDilation.W_r.delete(i) &&
			((i = UiTimeDilation.j_r.indexOf(i)), UiTimeDilation.j_r.splice(i, 1));
	}
	static SetNextViewTimeDilation() {
		var i,
			e = UiTimeDilation.j_r.shift();
		e &&
			((i = UiTimeDilation.W_r.get(e)),
			UiTimeDilation.SetGameTimeDilation(i)) &&
			((UiTimeDilation.H_r = e), Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"UiTimeDilation",
				11,
				"界面时停设置下个数据",
				["界面", i?.DebugName],
				["界面Id", e],
			);
	}
	static S_r(i) {
		UiTimeDilation.E_r.add(i),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiTimeDilation", 11, "添加等待设置时停的tag", [
					"Tag",
					i,
				]),
			UiTimeDilation.x4s &&
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"UiTimeDilation",
						11,
						"目前存在界面正在时停中,缓存并且临时恢复",
						["Tag", i],
					),
				UiTimeDilation.q4s(UiTimeDilation.x4s),
				UiTimeDilation.G4s({
					ViewId: UiTimeDilation.x4s.ViewId,
					TimeDilation: 1,
					DebugName: UiTimeDilation.x4s.DebugName,
					Reason: UiTimeDilation.x4s.Reason,
				}));
	}
	static y_r(i) {
		UiTimeDilation.E_r.delete(i) &&
			Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("UiTimeDilation", 11, "删除等待设置时停的tag", ["Tag", i]),
			UiTimeDilation.V_r();
	}
	static I_r() {
		UiTimeDilation.E_r.clear(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiTimeDilation", 11, "清理等待设置时停的tag");
	}
	static k_r() {
		return 0 < UiTimeDilation.E_r.size;
	}
}
((exports.UiTimeDilation = UiTimeDilation).R4s = !1),
	(UiTimeDilation.H_r = 0),
	(UiTimeDilation.G_r = !1),
	(UiTimeDilation.q_r = !1),
	(UiTimeDilation.F_r = void 0),
	(UiTimeDilation.x4s = void 0),
	(UiTimeDilation.T_r = (i, e) => {
		i &&
			(UiTimeDilation.AddViewData(i, e), 0 === UiTimeDilation.H_r) &&
			1 !== (i = UiConfig_1.UiConfig.TryGetViewInfo(i)).TimeDilation &&
			UiTimeDilation.SetGameTimeDilation({
				ViewId: e,
				TimeDilation: i.TimeDilation,
				DebugName: i.Name,
				Reason: "UiTimeDilation",
			}) &&
			(UiTimeDilation.H_r = e);
	}),
	(UiTimeDilation.L_r = (i, e) => {
		UiTimeDilation.RemoveViewData(e),
			UiTimeDilation.F_r?.ViewId === e
				? ((UiTimeDilation.F_r = void 0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiTimeDilation",
							11,
							"缓存的数据清除",
							["恢复界面", i],
							["界面Id", e],
						),
					UiTimeDilation.H_r === e && (UiTimeDilation.H_r = 0))
				: e === UiTimeDilation.H_r &&
					UiTimeDilation.SetGameTimeDilation({
						ViewId: e,
						TimeDilation: 1,
						DebugName: i,
						Reason: "UiTimeDilation",
					}) &&
					((UiTimeDilation.H_r = 0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"UiTimeDilation",
							11,
							"界面时停恢复",
							["恢复界面", i],
							["界面Id", e],
						),
					UiTimeDilation.SetNextViewTimeDilation());
	}),
	(UiTimeDilation.D_r = () => {
		!ModelManager_1.ModelManager.GameModeModel ||
			UiTimeDilation.O_r() ||
			(Net_1.Net.IsServerConnected() && UiTimeDilation.R_r());
	}),
	(UiTimeDilation.R_r = () => {
		(UiTimeDilation.x4s = void 0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("UiTimeDilation", 11, "时停强制重置为1"),
			UiTimeDilation.GmSwitch
				? ControllerHolder_1.ControllerHolder.GameModeController.SetTimeDilation(
						1,
					)
				: ControllerHolder_1.ControllerHolder.GameModeController.SetGamePaused(
						!1,
						"UiTimeDilation",
						1,
					),
			(UiTimeDilation.F_r = void 0),
			UiTimeDilation.I_r(),
			(UiTimeDilation.H_r = 0),
			(UiTimeDilation.G_r = !1);
	}),
	(UiTimeDilation.O4s = 1),
	(UiTimeDilation.U_r = (i) => {
		UiTimeDilation.O4s !== i &&
			((UiTimeDilation.O4s = i), 0 !== UiTimeDilation.Qht) &&
			((i = UiTimeDilation.x4s ?? {
				ViewId: UiTimeDilation.P4s,
				TimeDilation: UiTimeDilation.Qht,
				DebugName: UiTimeDilation.B4s,
				Reason: UiTimeDilation.pLe,
			}),
			UiTimeDilation.B_r(i));
	}),
	(UiTimeDilation.A_r = () => {
		UiTimeDilation.y_r("ServerConnect");
	}),
	(UiTimeDilation.P_r = (i) => {
		i
			? UiTimeDilation.S_r("CameraSequence")
			: UiTimeDilation.y_r("CameraSequence");
	}),
	(UiTimeDilation.Jxn = () => {
		UiTimeDilation.S_r("Loading");
	}),
	(UiTimeDilation.zxn = () => {
		UiTimeDilation.y_r("Loading");
	}),
	(UiTimeDilation.w4s = () => {
		UiTimeDilation.S_r("LevelLoading");
	}),
	(UiTimeDilation.b4s = () => {
		UiTimeDilation.y_r("LevelLoading");
	}),
	(UiTimeDilation.j_r = []),
	(UiTimeDilation.W_r = new Map()),
	(UiTimeDilation.E_r = new Set());
