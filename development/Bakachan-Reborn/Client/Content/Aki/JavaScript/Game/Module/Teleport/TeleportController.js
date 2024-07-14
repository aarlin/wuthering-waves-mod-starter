"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TeleportController = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
	Net_1 = require("../../../Core/Net/Net"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	TickSystem_1 = require("../../../Core/Tick/TickSystem"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	CameraController_1 = require("../../Camera/CameraController"),
	CameraUtility_1 = require("../../Camera/CameraUtility"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	ScreenEffectSystem_1 = require("../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	WorldDefine_1 = require("../../World/Define/WorldDefine"),
	AsyncTask_1 = require("../../World/Task/AsyncTask"),
	TaskSystem_1 = require("../../World/Task/TaskSystem"),
	AreaController_1 = require("../Area/AreaController"),
	DeadReviveController_1 = require("../DeadRevive/DeadReviveController"),
	LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
	PlotData_1 = require("../Plot/PlotData"),
	RoleController_1 = require("../RoleUi/RoleController"),
	TeleportDefine_1 = require("./TeleportDefine"),
	VideoLauncher_1 = require("../Video/VideoLauncher"),
	DISTANCE_THRESHOLD_1 = 3e3,
	DISTANCE_THRESHOLD_2 = MathUtils_1.MathUtils.MaxFloat,
	SKIP_FALL_INJURE_TIME = 1e3;
class TeleportController extends ControllerBase_1.ControllerBase {
	static OnInit() {
		return (
			Net_1.Net.Register(1095, this.wyo),
			Net_1.Net.Register(17111, this.Byo),
			!0
		);
	}
	static OnClear() {
		return Net_1.Net.UnRegister(1095), Net_1.Net.UnRegister(17111), !0;
	}
	static OnTick(e) {
		ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
			(void 0 !== TeleportController.byo && this.wyo(TeleportController.byo));
	}
	static CheckCanTeleport() {
		return !RoleController_1.RoleController.IsInRoleTrial();
	}
	static async TeleportToPositionNoLoading(e, o, r) {
		return Global_1.Global.BaseCharacter?.IsValid()
			? this.QueryCanTeleportNoLoading(e)
				? this.qyo(e, o, r, void 0, 0)
				: ((ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2),
					this.Gyo(e, o, r, new TeleportDefine_1.TeleportContext()))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("Teleport", 30, "无加载传送:失败,找不到当前玩家", [
						"Reason",
						r,
					]),
				!1);
	}
	static QueryCanTeleportNoLoading(e) {
		var o = Global_1.Global.BaseCharacter;
		return o?.IsValid()
			? UE.Vector.Dist(o.CharacterActorComponent.ActorLocation, e) <
					(ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
					!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition
						? DISTANCE_THRESHOLD_2
						: 3e3)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"Teleport",
						30,
						"查询是否可以无加载传送:失败,找不到当前玩家",
					),
				!1);
	}
	static async TeleportToPosition(e, o, r, t) {
		Global_1.Global.BaseCharacter?.IsValid() ||
			(Log_1.Log.CheckWarn() &&
				Log_1.Log.Warn(
					"Teleport",
					30,
					"传送:传送时无主角，建议调整配置，避免在切换编队过程中传送",
					["Reason", r],
				));
		let a = t;
		return (((a = a || new TeleportDefine_1.TeleportContext())
			.TeleportReason === Protocol_1.Aki.Protocol.EOs.Proto_Action ||
			a.TeleportReason === Protocol_1.Aki.Protocol.EOs.RCs) &&
			ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) ||
			(a.TeleportReason === Protocol_1.Aki.Protocol.EOs.Proto_Gm &&
				ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot())
			? (Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Teleport",
						40,
						"传送:遇到不应执行传送的情况，使用伪传送替代",
						["TeleportReason", a.TeleportReason],
						["Reason", r],
					),
				TeleportController.Nyo(a, r))
			: TeleportController.Gyo(e, o, r, a);
	}
	static SendTeleportTransferRequest(e) {
		(ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem = e),
			this.SendTeleportTransferRequestById(e.MarkConfigId);
	}
	static SendTeleportTransferRequestById(e) {
		(ModelManager_1.ModelManager.GameModeModel.IsTeleport = !0),
			ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
				"SendTeleportTransferRequestById",
			),
			(e = Protocol_1.Aki.Protocol.cus.create({ Ekn: e })),
			Net_1.Net.Call(3195, e, (e) => {
				ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
					"SendTeleportTransferRequestById",
				),
					GlobalData_1.GlobalData.World
						? e.lkn !==
								Protocol_1.Aki.Protocol.lkn
									.Proto_ErrPlayerIsTeleportCanNotDoTeleport &&
							e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
							((ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
							(ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem =
								void 0),
							ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								22378,
							))
						: ((ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
							(ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem =
								void 0));
			});
	}
	static async qyo(e, o, r, t, a = 0) {
		var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		let n;
		l && (n = l.Entity.GetComponent(3));
		const d = ModelManager_1.ModelManager.TeleportModel;
		return d.IsTeleport
			? (Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Teleport", 30, "无加载传送:重复调用,正在传送中", [
						"Reason",
						r,
					]),
				!1)
			: ((d.CallSource = a),
				n?.Valid &&
					(d.StartPosition.DeepCopy(n.ActorLocationProxy),
					d.StartRotation.DeepCopy(n.ActorRotationProxy)),
				d.TargetPosition.DeepCopy(e),
				o
					? (d.TargetRotation.DeepCopy(o), (d.TargetRotation.Pitch = 0))
					: ((d.TargetRotation.Pitch = 0),
						(d.TargetRotation.Yaw = n?.Valid ? n.ActorRotationProxy.Yaw : 0)),
				(d.TargetRotation.Roll = 0),
        // MOD: Teleport Logs
				// Log_1.Log.CheckInfo() &&
				// 	Log_1.Log.Info(
				// 		"Teleport",
				// 		30,
				// 		"无加载传送:开始",
				// 		["开始位置", n.ActorLocationProxy],
				// 		["目标位置", e],
				// 		["开始角度", n.ActorRotationProxy.Yaw],
				// 		["目标角度", o],
				// 		["Reason", r],
				// 	),
				(d.IsTeleport = !0),
				(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 2),
				(ModelManager_1.ModelManager.GameModeModel.IsTeleport = !0),
				ModelManager_1.ModelManager.GameModeModel.SetBornInfo(e, o),
				ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
					"TeleportToPositionNoLoadingImpl",
				),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Teleport", 30, "无加载传送:处理开始事件(开始)"),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.TeleportStart,
					!1,
				),
				l?.Valid &&
					EventSystem_1.EventSystem.EmitWithTarget(
						l.Entity,
						EventDefine_1.EEventName.TeleportStartEntity,
					),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Teleport", 30, "无加载传送:处理开始事件(完成)"),
				this.Oyo(),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Teleport", 30, "无加载传送:设置角色状态(开始)"),
				TeleportController.kyo(),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Teleport", 30, "无加载传送:设置角色状态(完成)"),
				(ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
				d.CreatePromise(),
				(r = new AsyncTask_1.AsyncTask(
					"TeleportToPositionNoLoadingImpl",
					async () => (
						(ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
							!ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) ||
							((ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Teleport", 30, "无加载传送:检测体素流送(开始)"),
							await this.Fyo(!0),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Teleport", 30, "无加载传送:检测体素流送(完成)"),
							(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 12),
							(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Teleport", 30, "无加载传送:检测场景流送(开始)"),
							await this.Fyo(),
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Teleport", 30, "无加载传送:检测场景流送(完成)"),
							(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14)),
						ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
							"TeleportToPositionNoLoadingImpl",
						),
						(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15),
						ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
							Protocol_1.Aki.Protocol.jBs.Proto_Normal,
						),
						(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16),
						d.ResetPromise(),
						(d.IsTeleport = !1),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Teleport", 30, "无加载传送:处理完成事件(开始)"),
						(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.TeleportComplete,
							a,
						),
						TeleportController.Vyo(t),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Teleport", 30, "无加载传送:处理完成事件(完成)"),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Teleport", 30, "无加载传送:完成"),
						!0
					),
				)),
				TaskSystem_1.TaskSystem.AddTask(r),
				TaskSystem_1.TaskSystem.Run(),
				r.Promise);
	}
	static async Nyo(e, o) {
		const r = ModelManager_1.ModelManager.TeleportModel;
		if (r.IsTeleport)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Teleport", 40, "伪传送:无法调用,正在传送中", [
						"Reason",
						o,
					]),
				!1
			);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Teleport",
				40,
				"伪传送:开始",
				["原因", e.TeleportReason],
				["Reason", o],
			),
			(r.IsTeleport = !0);
		var t = new AsyncTask_1.AsyncTask(
			"FakeTeleportToPositionImpl",
			async () => (
				r.CreatePromise(),
				e.TeleportReason === Protocol_1.Aki.Protocol.EOs.Proto_Gm &&
					(await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
						7,
					)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Teleport", 40, "伪传送:通知服务器传送完成(开始)"),
				this.Hyo(),
				await r.TeleportFinishRequest.Promise,
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Teleport", 40, "伪传送:通知服务器传送完成(完成)"),
				r.ResetPromise(),
				(r.IsTeleport = !1),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Teleport", 40, "伪传送:完成", ["Reason", o]),
				!0
			),
		);
		return (
			TaskSystem_1.TaskSystem.AddTask(t),
			TaskSystem_1.TaskSystem.Run(),
			t.Promise
		);
	}
	static async Gyo(e, o, r, t) {
		var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		let l;
		a && (l = a.Entity.GetComponent(3));
		const n = ModelManager_1.ModelManager.TeleportModel;
		if (n.IsTeleport)
			return (
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Teleport", 30, "传送:重复调用,正在传送中", [
						"Reason",
						r,
					]),
				!1
			);
		switch (
			((n.CallSource = t.TeleportCallSource),
			l?.Valid &&
				(n.StartPosition.DeepCopy(l.ActorLocationProxy),
				n.StartRotation.DeepCopy(l.ActorRotationProxy)),
			n.TargetPosition.DeepCopy(e),
			o
				? (n.TargetRotation.DeepCopy(o), (n.TargetRotation.Pitch = 0))
				: ((n.TargetRotation.Pitch = 0),
					(n.TargetRotation.Yaw = l?.Valid ? l.ActorRotationProxy.Yaw : 0)),
			(n.TargetRotation.Roll = 0),
      // MOD: Teleport Logs
			// Log_1.Log.CheckInfo() &&
			// 	Log_1.Log.Info(
			// 		"Teleport",
			// 		30,
			// 		"传送:开始",
			// 		["开始位置", n.StartPosition],
			// 		["目标位置", n.TargetPosition],
			// 		["开始角度", n.StartRotation.Yaw],
			// 		["目标角度", n.TargetRotation.Yaw],
			// 		["原因", t.TeleportReason],
			// 		["传送类型", t.CtxType],
			// 		["Reason", r],
			// 	),
			(n.IsTeleport = !0),
			ModelManager_1.ModelManager.GameModeModel.SetBornInfo(e, o),
			(ModelManager_1.ModelManager.GameModeModel.IsTeleport = !0),
			(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 2),
			ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
				"TeleportToPositionImpl",
			),
			(ModelManager_1.ModelManager.GameModeModel.RenderAssetDone = !1),
      // MOD: Teleport Logs
			// Log_1.Log.CheckInfo() &&
			// 	Log_1.Log.Info("Teleport", 30, "传送:处理开始事件(开始)", [
			// 		"Reason",
			// 		r,
			// 	]),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.TeleportStart,
				!0,
			),
			a?.Valid &&
				EventSystem_1.EventSystem.EmitWithTarget(
					a.Entity,
					EventDefine_1.EEventName.TeleportStartEntity,
				),
      // MOD: Teleport Logs
			// Log_1.Log.CheckInfo() &&
			// 	Log_1.Log.Info("Teleport", 30, "传送:处理开始事件(完成)"),
			n.CreatePromise(),
			(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 3),
			t.TeleportReason)
		) {
			case Protocol_1.Aki.Protocol.EOs.Proto_Fall:
			case Protocol_1.Aki.Protocol.EOs.Proto_Rouge:
				break;
			case Protocol_1.Aki.Protocol.EOs.Proto_Action:
			case Protocol_1.Aki.Protocol.EOs.RCs:
				if (t.Option)
					switch (t.Option.wkn) {
						case Protocol_1.Aki.Protocol.wkn.Proto_PlayMp4:
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Teleport", 46, "TransitionType.PlayMp4开始"),
								this.jyo(t.Option.Nkn);
							break;
						case Protocol_1.Aki.Protocol.wkn.Proto_CenterText:
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Teleport", 46, "TransitionType.CenterText开始"),
								this.TeleportWithCenterTextStart(t.Option.Okn);
							break;
						case Protocol_1.Aki.Protocol.wkn.Proto_PlayEffect:
							Log_1.Log.CheckInfo() &&
								Log_1.Log.Info("Teleport", 46, "TransitionType.PlayEffect开始"),
								"" !== t.Option.Nkn &&
									ResourceSystem_1.ResourceSystem.LoadAsync(
										t.Option.Nkn,
										UE.EffectScreenPlayData_C,
										(e) => {
											ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(
												e,
											);
										},
										102,
									);
							break;
						default:
							await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
								7,
								n.TeleportMode,
							);
					}
				else
					await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
						7,
						n.TeleportMode,
					);
				break;
			default:
				await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
					7,
					n.TeleportMode,
				);
		}
		return (
			ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
				GlobalData_1.GlobalData.World,
				r,
			),
			(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 4),
			(2 !== ModelManager_1.ModelManager.TeleportModel.TeleportMode &&
				1 !== ModelManager_1.ModelManager.TeleportModel.TeleportMode) ||
				UE.KuroStaticLibrary.ForceGarbageCollection(!1),
			this.Oyo(),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				this.Oyo,
			),
			(o = new AsyncTask_1.AsyncTask("TeleportToPositionImpl", async () => {
				TickSystem_1.TickSystem.IsPaused &&
					(ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(
						!0,
					),
					(TeleportController.Wyo = !0),
					Log_1.Log.CheckInfo()) &&
					Log_1.Log.Info("Teleport", 30, "传送:时停解除(开始)", ["Reason", r]);
				var o =
					2 === ModelManager_1.ModelManager.TeleportModel.TeleportMode ||
					1 === ModelManager_1.ModelManager.TeleportModel.TeleportMode;
				switch (
					((ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 11),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:检测体素流送(开始)"),
					o &&
						ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool(),
					await this.Kyo(!0),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:检测体素流送(完成)"),
					o && UE.KuroStaticLibrary.ForceGarbageCollection(!1),
					ControllerHolder_1.ControllerHolder.GameModeController.AddOrRemoveRenderAssetsQueryViewInfo(
						e,
						ResourceSystem_1.WAIT_RENDER_ASSET_DURATION,
					),
					(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 13),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 7, "传送:检测场景流送(开始)"),
					await this.Kyo(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 7, "传送:检测场景流送(完成)"),
					(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 14),
					o &&
						(UE.KuroStaticLibrary.ForceGarbageCollection(!1),
						ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool()),
					ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
						"TeleportToPositionImpl",
					),
					(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 15),
					ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
						Protocol_1.Aki.Protocol.jBs.Proto_Normal,
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:等待编队加载(开始)"),
					await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise
						?.Promise,
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:等待编队加载(完成)"),
					EventSystem_1.EventSystem.Remove(
						EventDefine_1.EEventName.OnUpdateSceneTeam,
						this.Oyo,
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:设置角色状态(开始)"),
					TeleportController.kyo(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:设置角色状态(完成)"),
					(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 16),
					(ModelManager_1.ModelManager.GameModeModel.IsTeleport = !1),
					ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
						GlobalData_1.GlobalData.World,
						r,
					),
					o && UE.KuroStaticLibrary.ForceGarbageCollection(!1),
					await ControllerHolder_1.ControllerHolder.GameModeController.CheckRenderAssetsStreamingCompleted(
						e,
						"传送:",
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.FixBornLocation,
					),
					(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 19),
					t.TeleportReason)
				) {
					case Protocol_1.Aki.Protocol.EOs.Proto_Fall:
						await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
							1,
						);
						break;
					case Protocol_1.Aki.Protocol.EOs.Proto_Action:
					case Protocol_1.Aki.Protocol.EOs.RCs:
						if (t.Option)
							switch (t.Option.wkn) {
								case Protocol_1.Aki.Protocol.wkn.Proto_PlayMp4:
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info("Teleport", 46, "传送:CG传送完成(开始)"),
										await n.CgTeleportCompleted?.Promise,
										await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
											8,
										),
										(ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 =
											!1),
										Log_1.Log.CheckInfo() &&
											Log_1.Log.Info("Teleport", 46, "传送:CG传送完成(完成)");
									break;
								case Protocol_1.Aki.Protocol.wkn.Proto_CenterText:
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Teleport",
											46,
											"传送:黑幕白字传送完成(开始)",
										),
										await n.CgTeleportCompleted?.Promise,
										await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
											8,
										),
										(ModelManager_1.ModelManager.GameModeModel.UseShowCenterText =
											!1),
										Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"Teleport",
												46,
												"传送:黑幕白字传送完成(完成)",
											);
									break;
								case Protocol_1.Aki.Protocol.wkn.Proto_PlayEffect:
									Log_1.Log.CheckInfo() &&
										Log_1.Log.Info(
											"Teleport",
											46,
											"TransitionType.PlayEffect结束",
										);
									break;
								default:
									await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
										7,
									);
							}
						else
							await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
								7,
							);
						break;
					default:
						await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
							7,
						);
				}
				return (
					(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 20),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:通知服务器传送完成(开始)"),
					this.Hyo(),
					await n.TeleportFinishRequest.Promise,
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:通知服务器传送完成(完成)"),
					InputDistributeController_1.InputDistributeController.RefreshInputTag(),
					(n.IsTeleport = !1),
					TeleportController.Vyo(t.TeleportId),
					n.ResetPromise(),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:处理完成事件(开始)"),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.TeleportComplete,
						t.TeleportCallSource,
						t.TeleportReason,
					),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:处理完成事件(完成)"),
					TeleportController.Wyo &&
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Teleport", 46, "传送:更新游戏时停状态"),
						ControllerHolder_1.ControllerHolder.GameModeController.ForceDisableGamePaused(
							!1,
						),
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Teleport", 30, "传送:时停解除(完成)", [
								"Reason",
								r,
							]),
						(TeleportController.Wyo = !1)),
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("Teleport", 30, "传送:完成", ["Reason", r]),
					(ModelManager_1.ModelManager.GameModeModel.LoadingPhase = 1),
					!0
				);
			})),
			TaskSystem_1.TaskSystem.AddTask(o),
			TaskSystem_1.TaskSystem.Run(),
			o.Promise
		);
	}
	static O6s(e, o) {
		const r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
				GlobalData_1.GlobalData.World,
				UE.WorldPartitionSubsystem.StaticClass(),
			),
			t =
				((TeleportController.Qyo = 3e3),
				TimerSystem_1.TimerSystem.Forever(() => {
					var a, l;
					ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid() &&
						((a = new UE.WorldPartitionStreamingQuerySource(
							ModelManager_1.ModelManager.GameModeModel.StreamingSource.K2_GetActorLocation(),
							ResourceSystem_1.STREAMING_SOURCE_RADIUS,
							!1,
							!1,
							void 0,
							!1,
							!0,
							o,
						)),
						(l = UE.NewArray(UE.WorldPartitionStreamingQuerySource)).Add(a),
						r && r.IsStreamingCompleted(2, l, !1, void 0, void 0, !0)
							? ((TeleportController.Qyo = 0),
								TimerSystem_1.TimerSystem.Remove(t),
								e.SetResult(!0))
							: ((TeleportController.Qyo +=
									ResourceSystem_1.CHECK_STREAMING_INTERVAL),
								3e3 < TeleportController.Qyo &&
									((TeleportController.Qyo = 0), Log_1.Log.CheckDebug()) &&
									Log_1.Log.Debug(
										"Teleport",
										30,
										"无加载传送:流送中",
										[
											"StreamingSource",
											ModelManager_1.ModelManager.GameModeModel.StreamingSource.K2_GetActorLocation(),
										],
										["QuerySource", a.Location],
									)));
				}, ResourceSystem_1.CHECK_STREAMING_INTERVAL));
		return t;
	}
	static async Fyo(e = !1) {
		var o = ModelManager_1.ModelManager.TeleportModel;
		if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
			ModelManager_1.ModelManager.GameModeModel.StreamingSource?.IsValid() &&
				!e &&
				ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
					ModelManager_1.ModelManager.GameModeModel.StreamingSource.K2_GetActorLocation(),
					!0,
					!0,
				);
			var r = e ? o.VoxelStreamingCompleted : o.StreamingCompleted;
			let t;
			e && (t = UE.NewSet(UE.BuiltinName)).Add(WorldDefine_1.VOXEL_GRID_NAME),
				(o.CheckStreamingCompletedTimerId = this.O6s(r, t)),
				await r.Promise,
				(o.CheckStreamingCompletedTimerId = void 0);
		} else (e ? o.VoxelStreamingCompleted : o.StreamingCompleted).SetResult(!0);
	}
	static N6s(e, o, r, t) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"Teleport",
				61,
				"传送:检测参数",
				["dataLayers", null != r && 0 < r.Num() ? r.Get(0).toString() : void 0],
				[
					"targetGrids",
					null != t && 0 < t.Num() ? t.Get(0).toString() : void 0,
				],
			);
		const a = new UE.WorldPartitionStreamingQuerySource(
				e,
				ResourceSystem_1.STREAMING_SOURCE_RADIUS,
				!0,
				null != r && 0 < r.Num(),
				r,
				!1,
				!0,
				t,
			),
			l = UE.NewArray(UE.WorldPartitionStreamingQuerySource),
			n =
				(l.Add(a),
				UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
					GlobalData_1.GlobalData.World,
					UE.WorldPartitionSubsystem.StaticClass(),
				)),
			d =
				((TeleportController.Qyo = 3e3),
				TimerSystem_1.TimerSystem.Forever(() => {
					n && n.IsStreamingCompleted(2, l, !1, void 0, void 0, !0)
						? ((TeleportController.Qyo = 0),
							TimerSystem_1.TimerSystem.Remove(d),
							o.SetResult(!0))
						: ((TeleportController.Qyo +=
								ResourceSystem_1.CHECK_STREAMING_INTERVAL),
							3e3 < TeleportController.Qyo &&
								(n && !n.IsStreamingEnable() && n.SetStreamingEnable(!0),
								(TeleportController.Qyo = 0),
								Log_1.Log.CheckInfo()) &&
								Log_1.Log.Info(
									"Teleport",
									30,
									"传送:流送中",
									["StreamingSource", e],
									["QuerySource", a.Location],
								));
				}, ResourceSystem_1.CHECK_STREAMING_INTERVAL));
		return d;
	}
	static async Kyo(e = !1) {
		var o = ModelManager_1.ModelManager.TeleportModel;
		if (ModelManager_1.ModelManager.GameModeModel.UseWorldPartition) {
			var r = o.TargetPosition.ToUeVector();
			let l, n;
			if (
				((e
					? ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource
					: ModelManager_1.ModelManager.GameModeModel.StreamingSource
				).K2_SetActorLocation(r, !1, void 0, !1),
				e)
			)
				(n = UE.NewSet(UE.BuiltinName)).Add(WorldDefine_1.VOXEL_GRID_NAME);
			else {
				l = UE.NewArray(UE.BuiltinName);
				let e =
					ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
						r,
						!0,
						!0,
					);
				if (e) {
					var t = (0, puerts_1.$ref)(void 0);
					UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
						GlobalData_1.GlobalData.World,
						e,
						t,
					),
						l.Add((0, puerts_1.$unref)(t));
				} else
					for (const o of WorldDefine_1.dataLayerRuntimeHLOD) {
						var a = (0, puerts_1.$ref)(void 0);
						(e = FNameUtil_1.FNameUtil.GetDynamicFName(o)),
							UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
								GlobalData_1.GlobalData.World,
								e,
								a,
							),
							l.Add((0, puerts_1.$unref)(a));
					}
			}
			(t = e ? o.VoxelStreamingCompleted : o.StreamingCompleted),
				(o.CheckStreamingCompletedTimerId = this.N6s(r, t, l, n)),
				await t.Promise,
				(o.CheckStreamingCompletedTimerId = void 0);
		} else (e ? o.VoxelStreamingCompleted : o.StreamingCompleted).SetResult(!0);
	}
	static Hyo() {
		var e = new Protocol_1.Aki.Protocol.fus();
		Net_1.Net.Call(5004, e, (e) => {
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"Teleport",
					30,
					"传送:TeleportFinishRequestSetResult(开始)",
				),
				ModelManager_1.ModelManager.TeleportModel.TeleportFinishRequest.SetResult(
					!0,
				),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"Teleport",
						30,
						"传送:TeleportFinishRequestSetResult(完成)",
					);
		});
	}
	static kyo() {
		var e,
			o,
			r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		r?.Valid
			? ((e = r.Entity.GetComponent(3)),
				(o = ModelManager_1.ModelManager.TeleportModel),
				e.Actor.CharacterMovement?.SetMovementMode(
					e.Actor.CharacterMovement?.DefaultLandMovementMode,
				),
				e.TeleportAndFindStandLocation(o.TargetPosition),
				e.SetInputRotator(o.TargetRotation),
				e.SetActorRotation(
					o.TargetRotation.ToUeRotator(),
					"TeleportController",
					!1,
				),
				r.Entity.GetComponent(158)?.ResetCharState(),
				r.Entity.GetComponent(160)?.MainAnimInstance?.SyncAnimStates(void 0),
				(TeleportController.Xyo = TimerSystem_1.TimerSystem.Delay(() => {
					(ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = !1),
						(TeleportController.Xyo = void 0);
				}, 1e3)),
				CameraController_1.CameraController.FightCamera.LogicComponent.SetRotation(
					CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator(),
				),
				CameraController_1.CameraController.FightCamera.LogicComponent.ResetFightCameraLogic(),
				1 === o.CallSource &&
					DeadReviveController_1.DeadReviveController.PlayerReviveEnded(),
				r.Entity.GetComponent(172)?.ResetDrowning())
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("Teleport", 30, "传送:失败,找不到当前实体");
	}
	static $yo(e) {
		var o;
		return ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
			(Global_1.Global.BaseCharacter?.IsValid() &&
				((o = Global_1.Global.BaseCharacter.CharacterActorComponent),
				(o = UE.Vector.Dist(o.ActorLocation, e)),
				(e = CommonParamById_1.configCommonParamById.GetIntConfig(
					"TeleportRatingRange",
				)
					? CommonParamById_1.configCommonParamById.GetIntConfig(
							"TeleportRatingRange",
						)
					: 3e3),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("LevelEvent", 46, "QueryDefaultTeleportMode", [
						"threshold",
						e,
					]),
				o < e))
			? 3
			: 2;
	}
	static Vyo(e) {
		e &&
			(e =
				ConfigManager_1.ConfigManager.WorldMapConfig.GetTeleportEntityConfigId(
					e,
				)) &&
			(e =
				ModelManager_1.ModelManager.CreatureModel?.GetEntityData(e)?.AreaId) &&
			AreaController_1.AreaController.BeginOverlap(e, !0);
	}
	static OnLeaveLevel() {
		return (
			(TeleportController.Qyo = 0),
			ModelManager_1.ModelManager.TeleportModel
				.CheckStreamingCompletedTimerId &&
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Teleport", 30, "传送:终止,离开关卡"),
				TimerSystem_1.TimerSystem.Has(
					ModelManager_1.ModelManager.TeleportModel
						.CheckStreamingCompletedTimerId,
				)) &&
				TimerSystem_1.TimerSystem.Remove(
					ModelManager_1.ModelManager.TeleportModel
						.CheckStreamingCompletedTimerId,
				),
			(ModelManager_1.ModelManager.TeleportModel.CheckStreamingCompletedTimerId =
				void 0),
			(ModelManager_1.ModelManager.TeleportModel.CheckPhysicsCompletedTimerId =
				void 0),
			ModelManager_1.ModelManager.TeleportModel.StreamingCompleted?.SetResult(
				!0,
			),
			!0
		);
	}
	static async jyo(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Teleport", 46, "传送:CG传送开始(视频)"),
			(ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = !0),
			VideoLauncher_1.VideoLauncher.ShowVideoCg(e, () => {
				ModelManager_1.ModelManager.TeleportModel.CgTeleportCompleted?.SetResult(
					!0,
				);
			}),
			await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
				8,
				2,
			);
	}
	static async TeleportWithCenterTextStart(e) {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("Teleport", 46, "传送:CG传送开始(黑幕白字)"),
			(ModelManager_1.ModelManager.GameModeModel.UseShowCenterText = !0),
			e
				? (ModelManager_1.ModelManager.PlotModel.PlayFlow =
						new PlotData_1.PlotFlow(e.bkn, e.qkn, e.Gkn))
				: Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("Teleport", 46, "transitionFlow为空"),
			await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
				8,
				0,
			),
			ModelManager_1.ModelManager.PlotModel.ShowCenterTextForTeleport(
				ModelManager_1.ModelManager.PlotModel.OnShowCenterTextFinished,
			);
	}
}
(exports.TeleportController = TeleportController),
	((_a = TeleportController).Qyo = 0),
	(TeleportController.Xyo = void 0),
	(TeleportController.byo = void 0),
	(TeleportController.Wyo = !1),
	(TeleportController.Oyo = () => {
		TeleportController.Xyo &&
			(TimerSystem_1.TimerSystem.Remove(TeleportController.Xyo),
			(TeleportController.Xyo = void 0)),
			(ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure = !0);
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		e?.Valid &&
			(e = e.Entity.GetComponent(3))?.Valid &&
			e.Actor?.IsValid() &&
			e.Actor.CharacterMovement?.IsValid() &&
			e.Actor.CharacterMovement.SetMovementMode(0);
	}),
	(TeleportController.wyo = (e) => {
		var o = e.Hms,
			r = e.Bkn,
			t =
				ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem
					?.MarkConfigId,
			a =
				((t =
					((ModelManager_1.ModelManager.LoadingModel.TargetTeleportId = t),
					new TeleportDefine_1.TeleportContext(
						e.V5n,
						t,
						void 0,
						o ? o.Xms : void 0,
						r,
					))),
				new UE.Vector(e.N6n, e.k6n, e.O6n)),
			l = new UE.Rotator(0, e.IIs, 0);
		let n = "";
		try {
			n = JSON.stringify(o);
		} catch {
			n = "Context序列化解析失败";
		}
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"LevelEvent",
					7,
					"服务端驱动执行行为组",
					["Context", n],
					["PosX", e.N6n],
					["PosY", e.k6n],
					["PosZ", e.O6n],
					["Reason", e.V5n],
				),
			ModelManager_1.ModelManager.TeleportModel.IsTeleport)
		)
			(TeleportController.byo = e);
        // MOD: Teleport Logs
				// Log_1.Log.CheckDebug() &&
				// 	Log_1.Log.Debug(
				// 		"Teleport",
				// 		30,
				// 		"传送: 传送中，缓存TeleportNotify",
				// 		[
				// 			"开始位置",
				// 			ModelManager_1.ModelManager.TeleportModel.StartPosition,
				// 		],
				// 		[
				// 			"目标位置",
				// 			ModelManager_1.ModelManager.TeleportModel.TargetPosition,
				// 		],
				// 		[
				// 			"开始角度",
				// 			ModelManager_1.ModelManager.TeleportModel.StartRotation.Yaw,
				// 		],
				// 		[
				// 			"目标角度",
				// 			ModelManager_1.ModelManager.TeleportModel.TargetRotation.Yaw,
				// 		],
				// 		["原因", t.TeleportReason],
				// 	);
		else {
			switch (((TeleportController.byo = void 0), t.TeleportReason)) {
				case Protocol_1.Aki.Protocol.EOs.Proto_Action:
				case Protocol_1.Aki.Protocol.EOs.RCs:
					r && r.wkn === Protocol_1.Aki.Protocol.wkn.Proto_CenterText
						? (ModelManager_1.ModelManager.TeleportModel.TeleportMode = 0)
						: (ModelManager_1.ModelManager.TeleportModel.TeleportMode =
								_a.$yo(a));
					break;
				case Protocol_1.Aki.Protocol.EOs.Proto_Drown:
					ModelManager_1.ModelManager.TeleportModel.TeleportMode = 2;
					break;
				default:
					ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
			}
			TeleportController.TeleportToPosition(
				a,
				l,
				"OnTeleportNotify",
				t,
			).finally(() => {
				ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
			}),
				(ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkItem =
					void 0);
		}
	}),
	(TeleportController.Byo = (e) => {
		ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim = !1;
	});
