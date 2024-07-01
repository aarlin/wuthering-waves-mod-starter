"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ReConnectController = void 0);
const cpp_1 = require("cpp"),
	UE = require("ue"),
	Application_1 = require("../../../Core/Application/Application"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	AppLinks_1 = require("../../../Launcher/AppLinks"),
	BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
	NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
	HotFixSceneManager_1 = require("../../../Launcher/Ui/HotFix/HotFixSceneManager"),
	AppUtil_1 = require("../../../Launcher/Update/AppUtil"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	LocalStorage_1 = require("../../Common/LocalStorage"),
	LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	GlobalData_1 = require("../../GlobalData"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	LoadingController_1 = require("../Loading/LoadingController"),
	Heartbeat_1 = require("../Login/Heartbeat"),
	HeartbeatDefine_1 = require("../Login/HeartbeatDefine"),
	LoginController_1 = require("../Login/LoginController"),
	LogReportController_1 = require("../LogReport/LogReportController"),
	LogReportDefine_1 = require("../LogReport/LogReportDefine"),
	ReconnectDefine_1 = require("./ReconnectDefine"),
	ReConnectModel_1 = require("./ReConnectModel"),
	ONE_THOUSAND = 1e3,
	TWO_THOUSAND = 2e3,
	RECONNECT_TIME_OUT = 2e4;
class ReconnectResult {
	constructor(e, o, n = void 0) {
		(this.Result = 0),
			(this.Step = ReconnectDefine_1.EReconnectProcessStep.Max),
			(this.ErrorCode = void 0),
			(this.Result = e),
			(this.Step = o),
			(this.ErrorCode = n);
	}
}
function reportReconnectProcess(e, o = Protocol_1.Aki.Protocol.lkn.Sys) {
	var n = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig(),
		t = new LogReportDefine_1.ReconvProcessLink();
	(t.s_trace_id = ModelManager_1.ModelManager.ReConnectModel.ReconvTraceId),
		(t.s_player_id =
			ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0"),
		(t.s_user_id = n?.Uid ?? ""),
		(t.s_user_name =
			n?.UserName ?? ModelManager_1.ModelManager.LoginModel.GetAccount()),
		(t.s_reconv_step = ReconnectDefine_1.EReconnectProcessStep[e]),
		(t.s_app_version = UE.KuroLauncherLibrary.GetAppVersion()),
		(t.s_launcher_version = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.LauncherPatchVersion,
			t.s_app_version,
		)),
		(t.s_resource_version = LocalStorage_1.LocalStorage.GetGlobal(
			LocalStorageDefine_1.ELocalStorageGlobalKey.PatchVersion,
			t.s_app_version,
		)),
		(t.s_client_version =
			BaseConfigController_1.BaseConfigController.GetVersionString()),
		(t.i_error_code = o),
		LogReportController_1.LogReportController.LogReport(t);
}
class ReConnectController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		Heartbeat_1.Heartbeat.SetMaxTimeOutHandler(ReConnectController.o8s),
			Net_1.Net.SetAddRequestMaskHandle(ReConnectController.mno),
			Net_1.Net.SetRemoveRequestMaskHandle(ReConnectController.dno),
			Net_1.Net.SetNetworkErrorHandle(ReConnectController.Cno);
		var e = ModelManager_1.ModelManager.PlatformModel.PlatformType;
		return (
			(1 !== e && 2 !== e) ||
				Application_1.Application.AddApplicationHandler(
					1,
					ReConnectController.DHe,
				),
			!0
		);
	}
	static OnClear() {
		var e = ModelManager_1.ModelManager.PlatformModel.PlatformType;
		return (
			(1 !== e && 2 !== e) ||
				Application_1.Application.RemoveApplicationHandler(
					1,
					ReConnectController.DHe,
				),
			!0
		);
	}
	static OnAddEvents() {
		var e = ModelManager_1.ModelManager.ReConnectModel;
		(e.LastNetworkType = AppUtil_1.AppUtil.GetNetworkConnectionType()),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("Reconnect", 31, "Reconnect OnNetworkChange listen"),
			e.NetworkListener.NetworkChangeDelegate.Add(ReConnectController.gno);
	}
	static OnRemoveEvents() {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Reconnect", 31, "Reconnect OnNetworkChange unlisten"),
			ModelManager_1.ModelManager.ReConnectModel.NetworkListener.NetworkChangeDelegate.Remove(
				ReConnectController.gno,
			);
	}
	static GmBackToLoginView(e, o) {
		ReConnectController.fno(e, o);
	}
	static pno(e) {
		return 0 !== ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus()
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Reconnect", 9, "正在尝试重连中, 请勿重复!", [
						"调用函数",
						e,
					]),
				!1)
			: !(
					!Net_1.Net.IsServerConnected() ||
					(ModelManager_1.ModelManager.LoginModel.HasReconnectInfo()
						? !LoginController_1.LoginController.CheckCanReConnect() &&
							(Log_1.Log.CheckWarn() &&
								Log_1.Log.Warn(
									"Reconnect",
									31,
									"当前还在登录界面, 不触发重连",
									["调用函数", e],
								),
							1)
						: (Log_1.Log.CheckError() &&
								Log_1.Log.Error("Reconnect", 9, "没有重连信息！", [
									"调用函数",
									e,
								]),
							1))
				);
	}
	static qqi() {
		var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(38);
		e.SetCloseFunction(() => {
			ReConnectController.vno();
		}),
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
				e,
			);
	}
	static async Mno(e) {
		return (
			Net_1.Net.StartReconnecting(),
			ModelManager_1.ModelManager.ReConnectModel.SetCurIncId(),
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug(
					"Reconnect",
					9,
					"重连中...",
					[
						"重连状态",
						ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus(),
					],
					[
						"当前尝试次数",
						ModelManager_1.ModelManager.ReConnectModel.GetReConnectCount(),
					],
					[
						"当前第几次流程",
						ModelManager_1.ModelManager.ReConnectModel.GetTryCount() + 1,
					],
					["距离上次重连时间", (e / 1e3).toFixed(2)],
				),
			0 !== (e = await ReConnectController.Sno()).Result ||
			0 !== (e = await ReConnectController.xvi()).Result
				? e
				: await ReConnectController.Eno()
		);
	}
	static async Sno() {
		var e = ModelManager_1.ModelManager.LoginModel.GetReconnectHost(),
			o = ModelManager_1.ModelManager.LoginModel.GetReconnectPort();
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Reconnect", 9, "重连流程, 尝试连接网关"),
			reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ConvGate),
			(e = await Net_1.Net.ConnectAsync(e, o, 3e3, 1)),
			(o = ReconnectDefine_1.EReconnectProcessStep.ConvRet);
		return ModelManager_1.ModelManager.ReConnectModel.IsReConnectIdSame()
			? 0 !== e
				? (reportReconnectProcess(
						o,
						Protocol_1.Aki.Protocol.lkn.Proto_ConvGateTimeout,
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Reconnect", 9, "重连流程, 连接网关失败"),
					new ReconnectResult(1, o))
				: (reportReconnectProcess(o),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Reconnect", 9, "重连流程, 连接网关成功"),
					new ReconnectResult(0, o))
			: new ReconnectResult(2, o);
	}
	static async xvi() {
		reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ProtoKeyReq);
		var e =
				(((e = new Protocol_1.Aki.Protocol.Eis()).W4n = !1),
				(e.A6n = ModelManager_1.ModelManager.ReConnectModel.ReconvTraceId),
				Net_1.Net.ChangeState1(),
				await Net_1.Net.CallAsync(111, e, 3e3)),
			o = ReconnectDefine_1.EReconnectProcessStep.ProtoKeyRet;
		return ModelManager_1.ModelManager.ReConnectModel.IsReConnectIdSame()
			? e
				? (reportReconnectProcess(o),
					Net_1.Net.SetDynamicProtoKey(e.Ikn, e.Ckn),
					new ReconnectResult(0, o))
				: (reportReconnectProcess(
						o,
						Protocol_1.Aki.Protocol.lkn.Proto_ProtoKeyTimeout,
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Reconnect", 22, "重连流程, 获取ProtoKey失败!"),
					new ReconnectResult(1, o))
			: new ReconnectResult(2, o);
	}
	static async Eno() {
		var e = Net_1.Net.GetDownStreamSeqNo(),
			o = ModelManager_1.ModelManager.LoginModel.GetReconnectToken(),
			n = new Protocol_1.Aki.Protocol.vis();
		(n.aFn = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
			(n.R8n = e),
			(n.R6n = o),
			(n.x8n = ModelManager_1.ModelManager.ReConnectModel.ReconvTraceId),
			cpp_1.FuncOpenLibrary.SetFirstTimestamp(0),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Reconnect",
					9,
					"重连流程, 发起登录",
					["下行包", e],
					["token", o],
				),
			Net_1.Net.ChangeStateEnterGame(),
			reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ReconvReq),
			(e = await Net_1.Net.CallAsync(107, n, 2e4)),
			(o = ReconnectDefine_1.EReconnectProcessStep.ReconvRet);
		return ModelManager_1.ModelManager.ReConnectModel.IsReConnectIdSame()
			? e
				? e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							108,
							void 0,
							!1,
						),
						reportReconnectProcess(o, e.lkn),
						new ReconnectResult(1, o, e.lkn))
					: (reportReconnectProcess(
							ReconnectDefine_1.EReconnectProcessStep.ReconvRet,
						),
						Net_1.Net.ReconnectSuccessAndReSend(e.mAs),
						TimeUtil_1.TimeUtil.SetServerTimeStamp(e.tDs),
						(n = Number(MathUtils_1.MathUtils.LongToBigInt(e.tDs))),
						cpp_1.FuncOpenLibrary.SetFirstTimestamp(n / 1e3),
						new ReconnectResult(0, o))
				: (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Reconnect", 9, "重连流程, Reconnect超时!"),
					reportReconnectProcess(
						o,
						Protocol_1.Aki.Protocol.lkn.Proto_ReReconvReqTimeout,
					),
					new ReconnectResult(1, o))
			: new ReconnectResult(2, o);
	}
}
(exports.ReConnectController = ReConnectController),
	((_a = ReConnectController).mno = (e) => {
		ModelManager_1.ModelManager.ReConnectModel.AddRpc(e),
			ReConnectController.yno(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.NetWorkMaskRpcAdd,
				e,
			);
	}),
	(ReConnectController.dno = (e) => {
		ModelManager_1.ModelManager.ReConnectModel.DelRpc(e),
			ModelManager_1.ModelManager.ReConnectModel.IsRpcEmpty() &&
				UiManager_1.UiManager.CloseView("NetWorkMaskView"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.NetWorkMaskRpcRemove,
				e,
			);
	}),
	(ReConnectController.Logout = (e) => {
		var o =
			0 !== ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus();
		o &&
			reportReconnectProcess(
				ReconnectDefine_1.EReconnectProcessStep.ReconvCancel,
			),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Reconnect",
					9,
					"调用登出",
					["原因", ReconnectDefine_1.ELogoutReason[e]],
					["是否正在重连", o],
				),
			ReConnectModel_1.ReConnectModel.AddReConnectIncId(),
			ReConnectController.fno(ReconnectDefine_1.EBackLoginViewReason.Logout);
	}),
	(ReConnectController.o8s = () => {
		Net_1.Net.IsServerConnected()
			? ReConnectController.TryReConnect(!1, "Heartbeat max time out")
			: Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Reconnect", 31, "未完成连接，但是触发心跳超时最大次数");
	}),
	(ReConnectController.TryReConnect = (e, o) => {
		ReConnectController.pno(o) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Reconnect",
					9,
					"尝试重连",
					["调用函数", o],
					["是否静默重连", e],
				),
			(o = ModelManager_1.ModelManager.ReConnectModel).SetReconnectDoing(),
			Heartbeat_1.Heartbeat.StopHeartBeat(
				HeartbeatDefine_1.EStopHeartbeat.ReconnectStart,
			),
			e
				? o.StartShowMaskTimer(ReConnectController.yno)
				: ReConnectController.yno(),
			Net_1.Net.Disconnect(1),
			(o.ReconvTraceId = UE.KismetGuidLibrary.NewGuid().ToString()),
			ReConnectController.Mno(0).then(
				ReConnectController.Ino,
				ReConnectController.Tno,
			));
	}),
	(ReConnectController.Cno = () => {
		ReConnectController.TryReConnect(!1, "Net.OnNetworkError");
	}),
	(ReConnectController.gno = (e) => {
		var o = ModelManager_1.ModelManager.ReConnectModel;
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Reconnect", 31, "OnNetworkTypeChange called", [
				"new type",
				e,
			]),
			e !== o.LastNetworkType &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Reconnect", 31, "OnNetworkTypeChange fire", [
						"old type",
						o.LastNetworkType,
					]),
				((o.LastNetworkType = e) !== NetworkDefine_1.ENetworkType.WiFi &&
					e !== NetworkDefine_1.ENetworkType.Cell) ||
					ReConnectController.TryReConnect(!0, "OnNetworkTypeChange"));
	}),
	(ReConnectController.DHe = () => {
		var e = Date.now();
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Reconnect",
				31,
				"Application Reactivated",
				["nowMs", e],
				["lastMs", Net_1.Net.LastReceiveTimeMs],
			),
			e - Net_1.Net.LastReceiveTimeMs >
			ModelManager_1.ModelManager.ReConnectModel.ServerChannelCloseTimeMs
				? ReConnectController.TryReConnect(
						!0,
						"Application Reactivated and channel closed",
					)
				: Heartbeat_1.Heartbeat.SendHeartbeatImmediately();
	}),
	(ReConnectController.fno = (e, o = !1) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Reconnect",
				9,
				"返回登录界面",
				["原因", e],
				["是否重连失败触发", o],
			),
			ModelManager_1.ModelManager.ReConnectModel.CancelShowMaskTimer(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BackLoginView),
			Net_1.Net.Disconnect(0),
			Heartbeat_1.Heartbeat.StopHeartBeat(
				HeartbeatDefine_1.EStopHeartbeat.BackLoginView,
			),
			(e = o ? ReConnectController.Lno : ReConnectController.vno),
			UiManager_1.UiManager.IsViewShow("NetWorkMaskView")
				? UiManager_1.UiManager.CloseView("NetWorkMaskView", e)
				: e();
	}),
	(ReConnectController.vno = () => {
		LoadingController_1.LoadingController.OpenLoadingView(void 0, () => {
			LoadingController_1.LoadingController.CloseLoadingView().then(
				async () => {
					cpp_1.FuncOpenLibrary.SetFirstTimestamp(0),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ClearSceneBegin,
						),
						await GlobalData_1.GlobalData.ClearSceneDone?.Promise,
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ExitGamePush,
						),
						ThirdPartySdkManager_1.ThirdPartySdkManager.Logout(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.DoLeaveLevel,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ReconnectClearData,
						),
						UE.KuroLauncherLibrary.LogoutToLauncher(),
						HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
						AppLinks_1.AppLinks.Destroy(),
						UE.GameplayStatics.OpenLevel(
							GlobalData_1.GlobalData.World,
							ReconnectDefine_1.reconnectMapName,
						);
				},
			);
		});
	}),
	(ReConnectController.Lno = () => {
		UiManager_1.UiManager.IsInited
			? ReConnectController.qqi()
			: (ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction =
					() => {
						ReConnectController.qqi();
					});
	}),
	(ReConnectController.yno = () => {
		UiManager_1.UiManager.IsInited &&
			!UiManager_1.UiManager.IsViewOpen("NetWorkMaskView") &&
			UiManager_1.UiManager.OpenView("NetWorkMaskView");
	}),
	(ReConnectController.Tno = (e) => {
		ModelManager_1.ModelManager.ReConnectModel &&
			ModelManager_1.ModelManager.ReConnectModel.ClearReconnectData(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Reconnect", 9, "由于其他原因, 重连流程中断"),
			ReConnectController.TryReConnect(
				!1,
				"ReconnectController.ForceBreakReconnectHandle",
			);
	}),
	(ReConnectController.Ino = (e) => {
		switch (e.Result) {
			case 0:
				ReConnectController.Dno();
				break;
			case 1:
				ReConnectController.Rno(e.Step, e.ErrorCode);
				break;
			case 2:
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Reconnect", 9, "由于用户登出, 重连流程不再执行");
		}
	}),
	(ReConnectController.Dno = () => {
		ModelManager_1.ModelManager.ReConnectModel.CancelShowMaskTimer(),
			ModelManager_1.ModelManager.ReConnectModel.IsRpcEmpty() &&
				UiManager_1.UiManager.IsViewOpen("NetWorkMaskView") &&
				UiManager_1.UiManager.CloseView("NetWorkMaskView"),
			reportReconnectProcess(
				ReconnectDefine_1.EReconnectProcessStep.ReconvSuccess,
			);
		var e = ModelManager_1.ModelManager.LoginModel.GetReconnectToken();
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Reconnect",
				9,
				"重连流程, 重登成功!",
				["重连后下行包:", Net_1.Net.GetDownStreamSeqNo()],
				["重连后token", e],
			),
			ModelManager_1.ModelManager.ReConnectModel.ClearReconnectData(),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReConnectSuccess),
			Heartbeat_1.Heartbeat.BeginHeartBeat(
				HeartbeatDefine_1.EBeginHeartbeat.ReConnectSuccess,
			);
	}),
	(ReConnectController.Rno = (e, o = void 0) => {
		if (
			(Net_1.Net.Disconnect(1),
			ModelManager_1.ModelManager.ReConnectModel.ResetReconnectStatus(),
			e === ReconnectDefine_1.EReconnectProcessStep.ReconvRet && void 0 !== o)
		)
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("Reconnect", 9, "重连流程, 服务器拒绝", [
					"ErrorCode",
					o,
				]),
				ReConnectController.fno(
					ReconnectDefine_1.EBackLoginViewReason.ReconnectError,
					!0,
				),
				reportReconnectProcess(
					ReconnectDefine_1.EReconnectProcessStep.ReconvFail,
				);
		else if (ModelManager_1.ModelManager.ReConnectModel.IsReConnectMaxCount())
			ModelManager_1.ModelManager.ReConnectModel.AddTryCount(),
				ModelManager_1.ModelManager.ReConnectModel.ReSetReConnectCount(),
				ModelManager_1.ModelManager.ReConnectModel.IsTryMaxCount()
					? (Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"Reconnect",
								9,
								"已达最大重连流程次数,不再尝试重连!",
							),
						ReConnectController.fno(
							ReconnectDefine_1.EBackLoginViewReason.ReconnectMax,
							!0,
						),
						reportReconnectProcess(
							ReconnectDefine_1.EReconnectProcessStep.ReconvFail,
						))
					: (ReConnectController.Mno(0).then(
							ReConnectController.Ino,
							ReConnectController.Tno,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ReConnectFail,
						));
		else {
			e = ModelManager_1.ModelManager.ReConnectModel.AddReConnectCount();
			const o = 1e3 * Math.pow(2, e) + (2e3 * Math.random() - 1e3);
			TimerSystem_1.TimerSystem.Delay(() => {
				ModelManager_1.ModelManager.ReConnectModel.IsReConnectIdSame() &&
					ReConnectController.Mno(o).then(
						ReConnectController.Ino,
						ReConnectController.Tno,
					);
			}, o),
				Net_1.Net.StartReconnecting();
		}
	});
