"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.DeadReviveController = void 0);
const UE = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	SceneTeamController_1 = require("../SceneTeam/SceneTeamController"),
	TeleportController_1 = require("../Teleport/TeleportController"),
	TeleportDefine_1 = require("../Teleport/TeleportDefine"),
	TIME_TO_REVIVE = 3e3,
	LOGIN_REVIVE = 1e3,
	OPEN_FADE_DURATION = 0.1,
	CLOSE_FADE_DURATION = 0.5;
class DeadReviveController extends UiControllerBase_1.UiControllerBase {
	static OnChangeMode() {
		return UiManager_1.UiManager.CloseView("ReviveView"), !0;
	}
	static OnAddEvents() {
		Net_1.Net.Register(8225, (e) => {
			DeadReviveController.NotifyOnPlayerDead(e);
		}),
			Net_1.Net.Register(20495, (e) => {
				DeadReviveController.NotifyOnPlayerRevive(e);
			}),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.PlotNetworkEnd,
				DeadReviveController.YHe,
			);
	}
	static OnRemoveEvents() {
		Net_1.Net.UnRegister(8225),
			Net_1.Net.UnRegister(20495),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.PlotNetworkEnd,
				DeadReviveController.YHe,
			);
	}
	static NotifyOnPlayerDead(e) {
		var o = ModelManager_1.ModelManager.DeadReviveModel,
			r = e.aFn;
		o.SetPlayerIsDead(r, !0),
			r !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnOtherPlayerDead,
					)
				: (o.InitReviveConfig(e.zUs),
					(o.ReviveLimitTime = e.YUs),
					(o.AllDead = !0),
					(r = !e.JUs && e.ZUs),
					(o.NeedOpenRevive = r) &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.ResetToBattleView,
						),
					EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerDead),
					e.W4n
						? EventSystem_1.EventSystem.Add(
								EventDefine_1.EEventName.WorldDone,
								DeadReviveController.LoginDeadFinish,
							)
						: o.SkipDeathAnim
							? DeadReviveController.DeadFinish()
							: TimerSystem_1.TimerSystem.Delay(
									DeadReviveController.DeadFinish,
									3e3,
								));
	}
	static NotifyOnPlayerRevive(e) {
		var o = ModelManager_1.ModelManager.DeadReviveModel,
			r = e.aFn;
		if (
			(o.SetPlayerIsDead(r, !1),
			r !== ModelManager_1.ModelManager.PlayerInfoModel.GetId())
		)
			DeadReviveController.ReviveOtherPlayer(e);
		else {
			o.ClearReviveMap();
			for (const r of e.rws) {
				var t = MathUtils_1.MathUtils.LongToNumber(r.rkn);
				t = ModelManager_1.ModelManager.CreatureModel.GetEntityId(t);
				o.SetReviveMap(t, r.ews.NFn);
			}
			(o.RevivePositionType = e.tws),
				(o.ReviveTeleportId = e.sws),
				e.$kn && (o.RevivePosition = new UE.Vector(e.$kn.X, e.$kn.Y, e.$kn.Z)),
				e.iws &&
					(o.ReviveRotator = new UE.Rotator(
						e.iws.Pitch,
						e.iws.Yaw,
						e.iws.Roll,
					)),
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"World",
						3,
						"[DeadReviveController.NotifyOnPlayerRevive] 复活",
						["Location", e.$kn],
						["ReviveType", e.tws],
					),
				e.ows &&
					ControllerHolder_1.ControllerHolder.CreatureController.LoadOrUnloadSubLevel(
						e.nws,
					),
				(o.CanRevive = !0),
				o.DelayRevive && DeadReviveController.AllRevive(),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.PlayerRevive,
					e.aFn,
				);
		}
	}
	static ReviveOtherPlayer(e) {
		for (const a of e.rws) {
			var o,
				r,
				t,
				l,
				n = MathUtils_1.MathUtils.LongToNumber(a.rkn);
			n = ModelManager_1.ModelManager.CreatureModel.GetEntity(n);
			n?.Valid &&
				((o = a.ews?.NFn),
				n.IsInit
					? (o && n.Entity.CheckGetComponent(172).ExecuteReviveLocal(),
						(t = n.Entity.GetComponent(3)),
						(r = new UE.Rotator(e.iws.Pitch, e.iws.Yaw, e.iws.Roll)),
						(l = new UE.Vector(e.$kn.X, e.$kn.Y, e.$kn.Z)),
						t.SetInputRotator(r),
						t.SetActorLocationAndRotation(l, r, "复活流程.复活其他角色", !1),
						n.Entity.GetComponent(57)?.ClearReplaySamples())
					: ((t = n.Entity.GetComponent(0)),
						o && t?.SetLivingStatus(Protocol_1.Aki.Protocol.Rvs.Proto_Alive),
						(l = e.$kn) && t?.SetInitLocation(l)));
		}
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"World",
				5,
				"[DeadReviveController.AllRevive] 复活其他人角色",
				["Location", e.$kn],
				["Rotator", e.iws],
				["ReviveType", e.tws],
			),
			SceneTeamController_1.SceneTeamController.ShowControlledRole(e.aFn);
	}
	static async AllRevive() {
		var e, o, r;
		for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
			!0,
		)) {
			ModelManager_1.ModelManager.DeadReviveModel.GetReviveHp(e.Id) &&
				e.Entity.CheckGetComponent(172).ExecuteReviveLocal(),
				EventSystem_1.EventSystem.EmitWithTarget(
					e,
					EventDefine_1.EEventName.AllRevive,
				);
			var t = e.Entity.GetComponent(3);
			t.SetInputRotator(
				ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
			),
				t.SetActorLocationAndRotation(
					ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
					ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
					"复活流程.全部复活",
					!1,
				);
		}
		if (
			(ModelManager_1.ModelManager.DeadReviveModel.ClearReviveData(),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"World",
					3,
					"[DeadReviveController.AllRevive] 复活",
					[
						"Location",
						ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
					],
					[
						"ReviveRotator",
						ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
					],
					[
						"ReviveType",
						ModelManager_1.ModelManager.DeadReviveModel.RevivePositionType,
					],
				),
			!(ModelManager_1.ModelManager.DeadReviveModel.RevivePositionType <= 0))
		)
			return DeadReviveController.P2t()
				? (Log_1.Log.CheckInfo() &&
						Log_1.Log.Info("World", 49, "播放剧情并进行无加载传送"),
					(e =
						ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig
							?.ReviveSequencePath) && "" !== e
						? ((o = (e = e.split(","))[0]),
							(r = Number(e[1])),
							(e = Number(e[2])),
							ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(
								0,
								3,
								void 0,
								0.1,
							),
							(o = ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
								o,
								r,
								e,
							)),
							void (ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId =
								o))
						: void DeadReviveController.EOn())
				: ((r = new TeleportDefine_1.TeleportContext(
						void 0,
						ModelManager_1.ModelManager.DeadReviveModel.ReviveTeleportId,
						1,
					)),
					void (
						(await TeleportController_1.TeleportController.TeleportToPosition(
							ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
							ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
							"DeadReviveController.AllRevive",
							r,
						)) ||
						(Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("World", 49, "复活传送失败，复活结束"),
						DeadReviveController.PlayerReviveEnded())
					));
		TimerSystem_1.TimerSystem.Delay(
			DeadReviveController.PlayerReviveEnded,
			1e3,
		);
	}
	static P2t() {
		if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
			return (
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("World", 49, "非副本中不允许复活表演"),
				!1
			);
		let e = !1;
		for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
			!0,
		))
			if (o.Entity?.GetComponent(185)?.HasTag(-58810558)) {
				e = !0;
				break;
			}
		var o;
		return (
			!!e &&
			((o = ModelManager_1.ModelManager.DeadReviveModel.RevivePosition),
			!!ControllerHolder_1.ControllerHolder.TeleportController.QueryCanTeleportNoLoading(
				o,
			) ||
				(Log_1.Log.CheckInfo() &&
					Log_1.Log.Info("World", 49, "复活位置不可无加载传送，不允许复活表演"),
				!1))
		);
	}
	static EOn() {
		TeleportController_1.TeleportController.TeleportToPositionNoLoading(
			ModelManager_1.ModelManager.DeadReviveModel.RevivePosition,
			ModelManager_1.ModelManager.DeadReviveModel.ReviveRotator,
			"RevivePerform",
		).finally(() => {
			SceneTeamController_1.SceneTeamController.ShowControlledRole(
				ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
			);
			var e = new Protocol_1.Aki.Protocol.fus();
			Net_1.Net.Call(5004, e, () => {});
		});
	}
	static RoleReviveEnded(e) {
		var o;
		(e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
			ParamType: 1,
		})) &&
			((o = ModelManager_1.ModelManager.DeadReviveModel),
			(e = e.GetPlayerId()),
			o.IsPlayerDead(e)) &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("World", 49, "角色复活时，该玩家未复活"),
			o.SetPlayerIsDead(e, !1),
			e === ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
				(o.ClearReviveData(),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.PlayerRevive,
					e,
				)),
			ControllerHolder_1.ControllerHolder.SceneTeamController.ShowControlledRole(
				e,
			));
	}
	static ReviveRequest(e, o) {
		var r;
		DeadReviveController.IsReviving ||
			(ModelManager_1.ModelManager.DeadReviveModel.AllDead
				? (((r = new Protocol_1.Aki.Protocol.Xss()).K4n = e),
					(DeadReviveController.IsReviving = !0),
					Net_1.Net.Call(9903, r, (e) => {
						(DeadReviveController.IsReviving = !1),
							e
								? e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
									? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
											e.lkn,
											9885,
										),
										o?.(!1))
									: o?.(!0)
								: o?.(!1);
					}))
				: o?.(!0));
	}
}
((exports.DeadReviveController = DeadReviveController).IsReviving = !1),
	(DeadReviveController.DeadFinish = () => {
		var e,
			o = ModelManager_1.ModelManager.DeadReviveModel;
		o.CanRevive
			? DeadReviveController.AllRevive()
			: o.AllDead &&
				((e =
					ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
					ModelManager_1.ModelManager.GameModeModel.IsMulti),
				o.NeedOpenRevive && !e
					? UiManager_1.UiManager.OpenView("ReviveView")
					: e &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OpenOnlineInstanceDeath,
						),
				(o.DelayRevive = !0));
	}),
	(DeadReviveController.LoginDeadFinish = () => {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldDone,
			DeadReviveController.LoginDeadFinish,
		),
			TimerSystem_1.TimerSystem.Delay(DeadReviveController.DeadFinish, 1e3);
	}),
	(DeadReviveController.YHe = (e) => {
		var o = ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId;
		o &&
			e.FlowIncId === o &&
			(DeadReviveController.EOn(),
			ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(
				0,
				void 0,
				0.5,
			),
			(ModelManager_1.ModelManager.DeadReviveModel.ReviveFlowIncId = 0));
	}),
	(DeadReviveController.PlayerReviveEnded = () => {
		SceneTeamController_1.SceneTeamController.ShowControlledRole(
			ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
		);
		var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0)[0],
			o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
		!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
			e &&
			e.GetCreatureDataId() !== o?.GetCreatureDataId() &&
			SceneTeamController_1.SceneTeamController.RequestChangeRole(
				e.GetCreatureDataId(),
				!1,
			);
	});
