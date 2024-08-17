"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonEntranceController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
	Log_1 = require("../../../Core/Common/Log"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
	Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
	Vector_1 = require("../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	BossRushController_1 = require("../Activity/ActivityContent/BossRush/BossRushController"),
	ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController"),
	ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
	RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData"),
	OnlineController_1 = require("../Online/OnlineController"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	TeleportController_1 = require("../Teleport/TeleportController"),
	TowerController_1 = require("../TowerDetailUi/TowerController"),
	InstanceDungeonController_1 = require("./InstanceDungeonController"),
	InstanceDungeonEntranceConfig_1 = require("./InstanceDungeonEntranceConfig"),
	ONE_SECONDS = 1e3,
	INSTANCE_SUCCESS = 3004,
	INSTANCE_FAIL = 3005,
	INSTANCE_SUCCESS_NO_REWARD = 3007,
	SETTLE_TYPE_ONETIME = 1,
	SETTLE_TYPE_ROLETRIAL = 2,
	SETTLE_TYPE_NONE = 3,
	SETTLE_TYPE_MATERIALS = 4,
	SETTLE_TYPE_CLOSE = 5;
class InstanceDungeonEntranceController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			(this._ai =
				ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
					5,
				).IconSmall),
			!0
		);
	}
	static OnClear() {
		return (this.uai = void 0), !(this._ai = void 0);
	}
	static OnAddOpenViewCheckFunction() {
		UiManager_1.UiManager.AddOpenViewCheckFunction(
			"All",
			InstanceDungeonEntranceController.OpenViewLimit,
			"InstanceDungeonEntranceController.OpenViewLimit",
		);
	}
	static OnRemoveOpenViewCheckFunction() {
		UiManager_1.UiManager.RemoveOpenViewCheckFunction(
			"All",
			InstanceDungeonEntranceController.OpenViewLimit,
		);
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.WorldDone,
			InstanceDungeonEntranceController.nye,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLeaveOnlineWorld,
				InstanceDungeonEntranceController.cai,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnPowerChanged,
				InstanceDungeonEntranceController.gVe,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.WorldDone,
			InstanceDungeonEntranceController.nye,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLeaveOnlineWorld,
				InstanceDungeonEntranceController.cai,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnPowerChanged,
				InstanceDungeonEntranceController.gVe,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(26533, InstanceDungeonEntranceController.mai),
			Net_1.Net.Register(4361, InstanceDungeonEntranceController.dai),
			Net_1.Net.Register(7582, InstanceDungeonEntranceController.Cai),
			Net_1.Net.Register(
				3810,
				InstanceDungeonEntranceController.MatchTeamNotify,
			),
			Net_1.Net.Register(5714, InstanceDungeonEntranceController.gai),
			Net_1.Net.Register(
				23752,
				InstanceDungeonEntranceController.MatchTeamStateNotify,
			),
			Net_1.Net.Register(6648, InstanceDungeonEntranceController.fai),
			Net_1.Net.Register(5899, InstanceDungeonEntranceController.pai),
			Net_1.Net.Register(26875, InstanceDungeonEntranceController.vai),
			Net_1.Net.Register(3408, InstanceDungeonEntranceController.Mai),
			Net_1.Net.Register(27037, InstanceDungeonEntranceController.Sai),
			Net_1.Net.Register(24218, InstanceDungeonEntranceController.Eai),
			Net_1.Net.Register(14087, InstanceDungeonEntranceController.yai),
			Net_1.Net.Register(10889, InstanceDungeonEntranceController.Iai),
			Net_1.Net.Register(1320, InstanceDungeonEntranceController.Tai),
			Net_1.Net.Register(9452, InstanceDungeonEntranceController.Lai),
			Net_1.Net.Register(8740, InstanceDungeonEntranceController.Dai),
			Net_1.Net.Register(23215, InstanceDungeonEntranceController.Rai);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(26533),
			Net_1.Net.UnRegister(4361),
			Net_1.Net.UnRegister(7582),
			Net_1.Net.UnRegister(3810),
			Net_1.Net.UnRegister(5714),
			Net_1.Net.UnRegister(23752),
			Net_1.Net.UnRegister(6648),
			Net_1.Net.UnRegister(5899),
			Net_1.Net.UnRegister(26875),
			Net_1.Net.UnRegister(3408),
			Net_1.Net.UnRegister(27037),
			Net_1.Net.UnRegister(24218),
			Net_1.Net.UnRegister(14087),
			Net_1.Net.UnRegister(10889),
			Net_1.Net.UnRegister(1320),
			Net_1.Net.UnRegister(9452),
			Net_1.Net.UnRegister(8740);
	}
	static async EnterEntrance(e, n = 0, o) {
		var t;
		return e
			? ((t =
					ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
						e,
					)),
				(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId =
					n),
				o && this.RegisterDungeonEntranceRestoreCb(o),
				t !==
					InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType
						.SingleTimeTower &&
					t !==
						InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType
							.CycleTower &&
					(t ===
					InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType.BossRush
						? BossRushController_1.BossRushController.OpenDefaultBossRushView()
						: t ===
								InstanceDungeonEntranceConfig_1.EInstanceEntranceFlowType
									.NewTower
							? TowerController_1.TowerController.OpenTowerView()
							: ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId =
									e),
								InstanceDungeonEntranceController.Uai())))
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("InstanceDungeon", 17, "副本入口打开错误", [
						"entranceId",
						e,
					]),
				!1);
	}
	static async Uai() {
		var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
		const n =
			ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlow(
				e,
			);
		return (
			!!n &&
			InstanceDungeonEntranceController.InstEntranceDetailRequest(e).finally(
				() => {
					n.Start();
				},
			)
		);
	}
	static ContinueEntranceFlow() {
		var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
		(e =
			ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlow(
				e,
			)) && e.Flow();
	}
	static RevertEntranceFlowStep() {
		var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
		e &&
			(e =
				ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlow(
					e,
				)) &&
			e.RevertStep();
	}
	static async EnterInstanceDungeon() {
		var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
		return e
			? InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
					e,
					ModelManager_1.ModelManager.EditBattleTeamModel
						.GetOwnRoleConfigIdList[0],
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId,
				)
			: (Log_1.Log.CheckError() &&
					Log_1.Log.Error("InstanceDungeon", 17, "进入副本失败，副本Id不存在", [
						"instanceId",
						e,
					]),
				!1);
	}
	static async EnterInstanceDungeonByAutoRole() {
		var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
		if (!e)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"InstanceDungeon",
						17,
						"请求进入副本失败，副本Id不存在",
						["instanceId", e],
					),
				!1
			);
		if (!(t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)))
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"InstanceDungeon",
						17,
						"请求进入副本失败，副本不存在",
						["instanceId", e],
					),
				!1
			);
		let n = !1;
		var o =
			((o = t.TrialRoleFormation) &&
				(o =
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTrialRoleConfig(
						o,
					)) &&
				((a = 0 < o.MaleFormation.length && 0 < o.FemaleFormation.length),
				(n = o.OnlyTrial && a)),
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId);
		if (n)
			return InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
				e,
				[],
				o,
			);
		var t,
			a = t.FightFormationId;
		if (
			!(t =
				ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
					a,
				))
		)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("InstanceDungeon", 17, "副本没有编队配置", [
						"instanceId",
						e,
					]),
				!1
			);
		if (!(a = t.AutoRole) || 0 === a.length)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"InstanceDungeon",
						17,
						"请求进入副本失败，自动上阵角色列表为空",
						["autoRoleGroupIdList", a],
					),
				!1
			);
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info(
				"InstanceDungeon",
				17,
				"请求进入副本跳过编队，并且配置了自动上阵角色",
				["instanceId", e],
				["autoRoleGroupIdList", a],
			);
		var r = new Array();
		for (const e of a)
			r.push(
				ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
					e,
				),
			);
		return InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
			e,
			r,
			o,
		);
	}
	static async LeaveInstanceDungeon() {
		return (
			ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo(),
			InstanceDungeonEntranceController.LeaveInstanceDungeonRequest()
		);
	}
	static async LeaveInstanceDungeonRequest(e, n) {
		var o = Protocol_1.Aki.Protocol.Fes.create();
		return !(
			!(e =
				((o.vFn = e ?? 0),
				(o.Pkn = n ?? 0),
				await Net_1.Net.CallAsync(13328, o))) ||
			(e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
				(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					5358,
				),
				1))
		);
	}
	static async RestartInstanceDungeon() {
		let e = ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList;
		if (!e) {
			e = [];
			for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
				e.push(n.GetConfigId);
		}
		return InstanceDungeonController_1.InstanceDungeonController.SingleInstReChallengeRequest(
			e,
		);
	}
	static async InstEntranceDetailRequest(e) {
		var n = new Protocol_1.Aki.Protocol.kes();
		if (!(e = ((n.G5n = e), await Net_1.Net.CallAsync(22844, n)))) return !1;
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10209" + Protocol_1.Aki.Protocol.Nes.name,
				]),
			e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
		)
			return (
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					7038,
				),
				!1
			);
		ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList.length = 0;
		for (const n of e.KRs)
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList.push(
				n.vFn,
			),
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetInstanceResetTime(
					n.vFn,
					n.REs,
				);
		return (
			(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEndTime =
				e.HTs),
			!0
		);
	}
	static async MatchChangeRoleRequest(e) {
		var n = new Protocol_1.Aki.Protocol.Urs();
		return (
			!!(e = ((n.l3n = e), await Net_1.Net.CallAsync(18638, n))) &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10061" + Protocol_1.Aki.Protocol.wrs.name,
				]),
			e.lkn === Protocol_1.Aki.Protocol.lkn.Sys ||
				(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					4753,
				),
				!1))
		);
	}
	static async MatchChangeReadyRequest(e) {
		var n;
		return (
			!!(n =
				(((n = new Protocol_1.Aki.Protocol.brs()).O5n = e),
				await Net_1.Net.CallAsync(17935, n))) &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10064" + Protocol_1.Aki.Protocol.Brs.name,
				]),
			n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
				? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						n.lkn,
						28871,
					),
					!1)
				: ((n = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
					ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarPlayerReadyState(
						n,
						e,
					),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.PrewarReadyChanged,
						n,
						e,
					),
					!0))
		);
	}
	static async LeaveMatchTeamRequest() {
		var e = new Protocol_1.Aki.Protocol.Grs();
		return (
			!!(e = await Net_1.Net.CallAsync(4722, e)) &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10066" + Protocol_1.Aki.Protocol.Ors.name,
				]),
			e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
				? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						1680,
					),
					!1)
				: (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam),
					!0))
		);
	}
	static async KickMatchTeamPlayerRequest(e) {
		var n = new Protocol_1.Aki.Protocol.Frs();
		return (
			!!(e = ((n.aFn = e), await Net_1.Net.CallAsync(26953, n))) &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10071" + Protocol_1.Aki.Protocol.Vrs.name,
				]),
			e.lkn === Protocol_1.Aki.Protocol.lkn.Sys ||
				(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					1297,
				),
				!1))
		);
	}
	static async SetMatchTeamMatchFlagRequest(e) {
		var n = new Protocol_1.Aki.Protocol.$rs();
		return (
			!!(e = ((n.DFn = e), await Net_1.Net.CallAsync(14330, n))) &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10075" + Protocol_1.Aki.Protocol.Hrs.name,
				]),
			e.lkn === Protocol_1.Aki.Protocol.lkn.Sys ||
				(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					25756,
				),
				!1))
		);
	}
	static async EnterMatchInstRequest() {
		var e = new Protocol_1.Aki.Protocol.Wrs();
		return (
			!!(e = await Net_1.Net.CallAsync(20383, e)) &&
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10073" + Protocol_1.Aki.Protocol.Krs.name,
				]),
			e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
				? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
						e.lkn,
						18130,
					),
					!1)
				: (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam),
					!0))
		);
	}
	static CheckInstanceShieldView(e) {
		var n;
		return (
			!!InstanceDungeonEntranceController.LimitOpenView &&
			!!(n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()) &&
			ConfigManager_1.ConfigManager.InstanceDungeonConfig.CheckViewShield(n, e)
		);
	}
	static RestoreDungeonEntranceEntity() {
		var e =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId;
		e &&
			(e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))
				?.IsInit &&
			e.Entity.GetComponent(72)?.Restore();
	}
	static RegisterDungeonEntranceRestoreCb(e) {
		var n =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId;
		n &&
		(n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(n))?.IsInit &&
		(n = n.Entity.GetComponent(72))
			? n.RegisterRestoreCb(e)
			: e();
	}
	static StartMatchRequest(e, n = !1) {
		var o = new Protocol_1.Aki.Protocol.vrs();
		(o.vFn = e),
			(o.N5n =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId),
			(o.k5n = n),
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(e),
			Net_1.Net.Call(29426, o, (e) => {
				e &&
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
							"协议id",
							"10051" + Protocol_1.Aki.Protocol.prs.name,
						]),
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								20141,
							)
						: (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
								1,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnMatchingBegin,
							)));
			});
	}
	static CancelMatchRequest() {
		var e = new Protocol_1.Aki.Protocol.Srs();
		Net_1.Net.Call(11604, e, (e) => {
			Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10053" + Protocol_1.Aki.Protocol.Ers.name,
				]),
				e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
					? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							15624,
						)
					: (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
							0,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnMatchingChange,
						));
		}),
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"CancelMatch",
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
					ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
						ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId(),
					).MapName,
				),
			),
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(0);
	}
	static MatchConfirmRequest(e) {
		var n = new Protocol_1.Aki.Protocol.Lrs();
		(n.F5n = e),
			Net_1.Net.Call(3269, n, (n) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
						"协议id",
						"10059" + Protocol_1.Aki.Protocol.Rrs.name,
					]),
					n.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								n.lkn,
								19297,
							),
							ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
								0,
							),
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.OnMatchingChange,
							))
						: (ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchingPlayerConfirmState(
								ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
								!0,
							),
							e
								? ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
										3,
									)
								: (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
										0,
									),
									EventSystem_1.EventSystem.Emit(
										EventDefine_1.EEventName.OnMatchingChange,
									)));
			});
	}
	static TeamChallengeRequest(e, n) {
		var o = new Protocol_1.Aki.Protocol.Qrs();
		(o.vFn = e),
			(o.N5n =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId),
			(o.k5n = n),
			Net_1.Net.Call(14194, o, (e) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
						"协议id",
						"10080" + Protocol_1.Aki.Protocol.Xrs.name,
					]),
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							8200,
						);
			});
	}
	static TeamMatchAcceptInviteRequest(e) {
		var n = new Protocol_1.Aki.Protocol.Zrs();
		(n.vFn = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId()),
			(n.F5n = e),
			(n.Q4n = ModelManager_1.ModelManager.OnlineModel.OwnerId),
			Net_1.Net.Call(20815, n, (e) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
						"协议id",
						"10085" + Protocol_1.Aki.Protocol.eos.name,
					]),
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							23367,
						);
			});
	}
	static TeamMatchInviteRequest() {
		var e = new Protocol_1.Aki.Protocol.Yrs();
		(e.vFn = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId()),
			Net_1.Net.Call(25390, e, (e) => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
						"协议id",
						"10085" + Protocol_1.Aki.Protocol.Jrs.name,
					]),
					e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							29924,
						);
			});
	}
	static async OpenInstanceDungeonFailView() {
		if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
			return !1;
		if (ModelManager_1.ModelManager.RoguelikeModel?.CheckInRoguelike())
			return !1;
		var e = InstanceDungeonEntranceController.Aai(!1);
		if (
			UiManager_1.UiManager.IsViewShow("InstanceDungeonFailView") ||
			ModelManager_1.ModelManager.GameModeModel.IsMulti
		)
			return !1;
		{
			var n = InstanceDungeonEntranceController.Pai();
			const o = new CustomPromise_1.CustomPromise();
			return (
				ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
					3005,
					!1,
					void 0,
					void 0,
					n,
					e,
					void 0,
					void 0,
					void 0,
					void 0,
					(e) => {
						o.SetResult(e);
					},
				),
				o.Promise
			);
		}
	}
	static Aai(e) {
		var n = [],
			o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
				ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
			),
			t = o.SettleButtonType,
			a = ModelManager_1.ModelManager.GameModeModel.IsMulti;
		if (
			((e && !a && 3 !== t && 1 !== t && 4 !== t) ||
				((o = {
					ButtonTextId: "Text_ButtonTextExit_Text",
					DescriptionTextId: "GenericPromptTypes_2_GeneralText",
					DescriptionArgs: void 0,
					TimeDown: o.AutoLeaveTime * TimeUtil_1.TimeUtil.InverseMillisecond,
					IsTimeDownCloseView: !0,
					OnTimeDownOnCallback: () => {
						InstanceDungeonEntranceController.LeaveInstanceDungeon();
					},
					IsClickedCloseView: !1,
					OnClickedCallback: (e) => {
						InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
							() => {
								UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
									UiManager_1.UiManager.CloseView("ExploreRewardView");
							},
						);
					},
				}),
				n.push(o)),
			a)
		)
			(o = ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
				? "Text_ContinueChallenge_Text"
				: "Text_SuggestContinueChallenge_Text"),
				(a = []),
				(r = ModelManager_1.ModelManager.PowerModel.PowerCount),
				a.push(r),
				(r = `<texture=${this._ai}/>`),
				a.push(r),
				(r = {
					ButtonTextId: o,
					DescriptionTextId: "Text_RemainText_Text",
					DescriptionArgs: a,
					IsTimeDownCloseView: !1,
					IsClickedCloseView: !1,
					OnClickedCallback: InstanceDungeonEntranceController.xai,
				}),
				n.push(r);
		else {
			if (!e || 4 === t) {
				(this.wai = !0), (o = []);
				let e = ModelManager_1.ModelManager.PowerModel.PowerCount.toString();
				const t =
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
				a =
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
						t,
					);
				var r =
					(ModelManager_1.ModelManager.PowerModel.IsPowerEnough(a) ||
						(e = `<color=#dc0300>${e}</color>`),
					o.push(e),
					`<texture=${this._ai}/>`);
				r =
					(o.push(r),
					{
						ButtonTextId: "Text_ChallengeAgain_Text",
						DescriptionTextId: a ? "Text_RemainText_Text" : void 0,
						DescriptionArgs: a ? o : void 0,
						IsTimeDownCloseView: !1,
						IsClickedCloseView: !1,
						OnClickedCallback: (e) => {
							var n,
								o =
									ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
										t,
									);
							ModelManager_1.ModelManager.PowerModel.IsPowerEnough(o)
								? ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(
										t,
									)
									? InstanceDungeonEntranceController.RestartInstanceDungeon().finally(
											() => {
												UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
													UiManager_1.UiManager.CloseView("ExploreRewardView");
											},
										)
									: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
											"InstanceDungeonLackChallengeTimes",
										)
								: (((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
										176,
									)).ShowPowerItem = !0),
									n.SetTextArgs(
										o.toString(),
										ModelManager_1.ModelManager.PowerModel.PowerCount.toString(),
									),
									n.FunctionMap.set(1, () => {}),
									n.FunctionMap.set(2, () => {
										InstanceDungeonEntranceController.RestartInstanceDungeon().finally(
											() => {
												UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
													UiManager_1.UiManager.CloseView("ExploreRewardView");
											},
										);
									}),
									ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
										n,
									));
						},
					});
				n.push(r);
			}
			!e ||
				(2 !== t && 3 !== t) ||
				n.push({
					ButtonTextId: "Text_KeepOnButton_Text",
					DescriptionTextId: void 0,
					IsTimeDownCloseView: !1,
					IsClickedCloseView: !1,
					OnClickedCallback: (e) => {
						UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
							(UiManager_1.UiManager.CloseView("ExploreRewardView"),
							(this.wai = !1));
					},
				});
		}
		return n;
	}
	static Pai() {
		var e = [],
			n = ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
		if (n) {
			for (const t of n) {
				var o = { TrainingData: t };
				e.push(o);
			}
			return e;
		}
	}
	static Bai(e) {
		var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
			ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).MapName,
		);
		ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
			"TeamLeaderMatch",
			n,
		);
		const o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
		o.SetMatchingId(e),
			o.SetMatchingState(1),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingBegin),
			UiManager_1.UiManager.IsViewOpen("OnlineWorldHallView") ||
				UiManager_1.UiManager.IsViewOpen("InstanceDungeonEntranceView") ||
				UiManager_1.UiManager.IsViewOpen("EditBattleTeamView") ||
				((o.MatchingTime = 0),
				(o.OnStopTimer = () => 1 !== o.GetMatchingState()),
				this.StartMatchTimer());
	}
	static StartMatchTimer(e) {
		const n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
		void 0 !== n.MatchingTimer &&
			TimerSystem_1.TimerSystem.Remove(n.MatchingTimer),
			(n.MatchingTimer = TimerSystem_1.TimerSystem.Forever(() => {
				n.OnStopTimer
					? n.OnStopTimer()
						? (void 0 !== n.MatchingTimer &&
								TimerSystem_1.TimerSystem.Remove(n.MatchingTimer),
							(n.MatchingTimer = void 0),
							n.OnStopHandle && n.OnStopHandle())
						: (n.MatchingTimeIncrease(), e && e())
					: (void 0 !== n.MatchingTimer &&
							TimerSystem_1.TimerSystem.Remove(n.MatchingTimer),
						(n.OnStopTimer = void 0),
						(n.OnStopHandle = void 0),
						(n.MatchingTimer = void 0));
			}, 1e3));
	}
}
(exports.InstanceDungeonEntranceController = InstanceDungeonEntranceController),
	((_a = InstanceDungeonEntranceController).uai = void 0),
	(InstanceDungeonEntranceController.LimitOpenView = !0),
	(InstanceDungeonEntranceController._ai = void 0),
	(InstanceDungeonEntranceController.wai = !1),
	(InstanceDungeonEntranceController.bai = !1),
	(InstanceDungeonEntranceController.nye = () => {
		(_a.wai = !1),
			InstanceDungeonEntranceController.uai &&
				(InstanceDungeonEntranceController.Iai(
					InstanceDungeonEntranceController.uai,
				),
				(InstanceDungeonEntranceController.uai = void 0));
	}),
	(InstanceDungeonEntranceController.gVe = () => {
		var e;
		_a.wai &&
			((e = _a.Aai(_a.bai)),
			ItemRewardController_1.ItemRewardController.SetButtonList(e),
			(e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
			(e =
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
					e,
				)),
			ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e)) &&
			UiManager_1.UiManager.IsViewOpen("ConfirmBoxView") &&
			UiManager_1.UiManager.CloseView("ConfirmBoxView");
	}),
	(InstanceDungeonEntranceController.cai = () => {
		ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
			0,
		),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
	}),
	(InstanceDungeonEntranceController.Cai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10054" + Protocol_1.Aki.Protocol.Irs.name,
			]),
			e.V5n === Protocol_1.Aki.Protocol.ONs.Proto_TimeOut &&
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"MatchingTimeOut",
				),
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
				0,
			),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange),
			ModelManager_1.ModelManager.InstanceDungeonModel.ResetData();
	}),
	(InstanceDungeonEntranceController.MatchTeamNotify = (e) => {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10056" + Protocol_1.Aki.Protocol.Trs.name,
				]),
			ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchTeamInfo(e.JAs),
			ModelManager_1.ModelManager.InstanceDungeonModel.InitMatchingTeamConfirmReadyState(
				e.JAs.ZEs,
			),
			ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchingPlayerConfirmStateByPlayerId(
				ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
			))
		) {
			if (
				(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
					4,
				),
				!UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") &&
					!UiManager_1.UiManager.IsViewShow("EditBattleTeamView"))
			)
				return void InstanceDungeonEntranceController.OpenEditBattleView();
		} else {
			if (
				(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
					2,
				),
				UiManager_1.UiManager.IsViewOpen("OnlineMatchSuccessView"))
			)
				return;
			if (
				!UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") &&
				!UiManager_1.UiManager.IsViewShow("EditBattleTeamView")
			)
				return void UiManager_1.UiManager.OpenView("OnlineMatchSuccessView");
		}
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
	}),
	(InstanceDungeonEntranceController.gai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10057" + Protocol_1.Aki.Protocol.Ars.name,
			]),
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
				1,
			),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
	}),
	(InstanceDungeonEntranceController.MatchTeamStateNotify = (e) => {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10075" + Protocol_1.Aki.Protocol.Prs.name,
				]),
			ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchTeamState(e.H5n),
			e.H5n === Protocol_1.Aki.Protocol.kNs.Proto_ReadyConfirm)
		) {
			if (
				(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
					4,
				),
				!UiManager_1.UiManager.IsViewOpen("InstanceDungeonEntranceView"))
			)
				return (
					InstanceDungeonEntranceController.OpenEditBattleView(),
					void (
						UiManager_1.UiManager.IsViewShow("OnlineMatchSuccessView") &&
						UiManager_1.UiManager.CloseView("OnlineMatchSuccessView")
					)
				);
		} else
			e.H5n === Protocol_1.Aki.Protocol.kNs.Proto_WaiteConfirm &&
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
					3,
				);
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
	}),
	(InstanceDungeonEntranceController.fai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10076" + Protocol_1.Aki.Protocol.Drs.name,
			]),
			ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchingPlayerConfirmState(
				e.zAs,
				!0,
			);
		var n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
		e.zAs === n &&
			ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchingTeamReady() &&
			(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
				4,
			),
			UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView")
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnMatchingChange,
					)
				: (InstanceDungeonEntranceController.OpenEditBattleView(),
					UiManager_1.UiManager.IsViewOpen("OnlineMatchSuccessView") &&
						UiManager_1.UiManager.CloseView("OnlineMatchSuccessView")));
	}),
	(InstanceDungeonEntranceController.pai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10062" + Protocol_1.Aki.Protocol.xrs.name,
			]),
			ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchTeamInfoPlayerRole(
				e.aFn,
				e.j5n,
			);
	}),
	(InstanceDungeonEntranceController.vai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10065" + Protocol_1.Aki.Protocol.qrs.name,
			]),
			ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarPlayerReadyState(
				e.aFn,
				e.O5n,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.PrewarReadyChanged,
				e.aFn,
				e.O5n,
			),
			ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(
				e.aFn,
				e.O5n
					? Protocol_1.Aki.Protocol.FNs.WMs
					: Protocol_1.Aki.Protocol.FNs.Proto_Wait,
			);
	}),
	(InstanceDungeonEntranceController.Mai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10068" + Protocol_1.Aki.Protocol.krs.name,
			]);
		var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
		e.aFn === n
			? (ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost() ||
					e.ZAs !== Protocol_1.Aki.Protocol.NNs.Proto_HostLeave ||
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"LeaderExitMatching",
					),
				e.ZAs === Protocol_1.Aki.Protocol.NNs.Proto_BeKick &&
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"MatchLeaveTeamByKickOut",
					),
				ModelManager_1.ModelManager.InstanceDungeonModel.ResetData(),
				EditBattleTeamController_1.EditBattleTeamController.ExitEditBattleTeam(
					!1,
				),
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
					0,
				),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
				ModelManager_1.ModelManager.OnlineModel.ClearPlayerTeleportState(),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.OnMatchingChange,
				),
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam))
			: ((n = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamName(
					e.aFn,
				)),
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"OthersLeaveMatchTeam",
					n,
				),
				ModelManager_1.ModelManager.InstanceDungeonModel.RemovePrewarFormationDataByPlayer(
					e.aFn,
				),
				ModelManager_1.ModelManager.OnlineModel.DeletePlayerTeleportState(
					e.aFn,
				),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.PrewarFormationChanged,
				));
	}),
	(InstanceDungeonEntranceController.Sai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10076" + Protocol_1.Aki.Protocol.Nrs.name,
			]),
			ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchingPlayerConfirmState(
				e.pys.aFn,
				!1,
			),
			ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarPlayerReadyState(
				e.pys.aFn,
				!1,
			),
			ModelManager_1.ModelManager.InstanceDungeonModel.AddPrewarFormationDataByPlayerInfo(
				e.pys,
			),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.PrewarFormationChanged,
			);
	}),
	(InstanceDungeonEntranceController.Eai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10076" + Protocol_1.Aki.Protocol.jrs.name,
			]);
		var n = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
		n
			? ((n = n.Q4n),
				ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(
					n,
					e.ePs
						? Protocol_1.Aki.Protocol.FNs.Proto_Matching
						: Protocol_1.Aki.Protocol.FNs.Proto_Wait,
				),
				ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
					e.ePs,
				))
			: e.ePs
				? _a.Bai(e.vFn)
				: (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CancelMatchingTimer(),
					ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
						ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"LeaderCancelMatch",
						));
	}),
	(InstanceDungeonEntranceController.Iai = (e) => {
		if (
			(Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
					"协议id",
					"10216" + Protocol_1.Aki.Protocol.Wes.name,
				]),
			(_a.bai = e.QRs),
			ModelManager_1.ModelManager.GameModeModel.WorldDone)
		)
			if (e.XRs)
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"InstanceDungeonRewardTimeNotEnough",
				);
			else if (
				(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SyncSettleRewardItemList(
					e.HRs,
				),
				e.QRs)
			) {
				var n = InstanceDungeonEntranceController.Aai(e.QRs),
					o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
						ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
					).SettleButtonType;
				if (5 !== o) {
					var t = [];
					for (const n of Object.keys(e.HRs)) {
						var a = new RewardItemData_1.RewardItemData(
							Number.parseInt(n),
							e.HRs[n],
						);
						t.push(a);
					}
					(o =
						1 < e.W5n
							? ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip(
									[1, 2],
								)
							: void 0),
						ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
							0 < t.length ? 3004 : 3007,
							!0,
							t,
							void 0,
							void 0,
							n,
							void 0,
							void 0,
							void 0,
							o,
						);
				}
			} else InstanceDungeonEntranceController.OpenInstanceDungeonFailView();
		else
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("InstanceDungeon", 5, "副本结算通知时，世界未加载完成"),
				(InstanceDungeonEntranceController.uai = e);
	}),
	(InstanceDungeonEntranceController.yai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10217" + Protocol_1.Aki.Protocol.hYn.name,
			]);
		var n = MathUtils_1.MathUtils.LongToNumber(e.Ekn);
		if ((n = ModelManager_1.ModelManager.CreatureModel.GetEntity(n))) {
			let o;
			switch (e.ckn) {
				case Protocol_1.Aki.Protocol.qqs.Proto_NotUnlock:
					o = -421801185;
					break;
				case Protocol_1.Aki.Protocol.qqs.Proto_Unlockable:
					o = 1960897308;
					break;
				case Protocol_1.Aki.Protocol.qqs.Proto_Unlocked:
					o = 1196894179;
					break;
				default:
					o = -421801185;
			}
			(e = n.Entity.GetComponent(92)) && e.ChangeLockTag(o);
		}
	}),
	(InstanceDungeonEntranceController.mai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10200" + Protocol_1.Aki.Protocol.xes.name,
			]),
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InitInstanceDataList(
				e.jRs,
			);
	}),
	(InstanceDungeonEntranceController.dai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10201" + Protocol_1.Aki.Protocol.bes.name,
			]),
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InitInstanceDataList(
				e.jRs,
			);
	}),
	(InstanceDungeonEntranceController.Tai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10083" + Protocol_1.Aki.Protocol.zrs.name,
			]);
		var n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
		n.CancelMatchingTimer(),
			ModelManager_1.ModelManager.InstanceDungeonModel.SetInstanceId(e.vFn),
			n.SetMatchingId(e.vFn),
			UiManager_1.UiManager.IsViewShow("OnlineChallengeApplyView") &&
				UiManager_1.UiManager.CloseView("OnlineChallengeApplyView"),
			UiManager_1.UiManager.OpenView("OnlineChallengeApplyView");
	}),
	(InstanceDungeonEntranceController.Lai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"10087" + Protocol_1.Aki.Protocol.Mrs.name,
			]),
			_a.Bai(e.vFn);
	}),
	(InstanceDungeonEntranceController.Dai = (e) => {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
				"协议id",
				"11865" + Protocol_1.Aki.Protocol.yrs.name,
			]);
		var n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
		ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
			1 !== n.GetMatchingState() ||
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"LeaderCancelMatch",
			),
			n.CancelMatchingTimer();
	}),
	(InstanceDungeonEntranceController.Rai = (e) => {
		e.F5n ||
			((e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
				e.aFn,
			).Name),
			ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
				"RefuseInviteMatch",
				e,
			));
	}),
	(InstanceDungeonEntranceController.OpenViewLimit = (e) =>
		!InstanceDungeonEntranceController.CheckInstanceShieldView(e) ||
		(ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
			"InstanceDungeonShieldViewCantOpen",
		),
		!1)),
	(InstanceDungeonEntranceController.OpenEditBattleView = () => {
		const e =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId();
		var n =
				ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
					?.$kn,
			o =
				ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
					?.D3n;
		n && o
			? ((n = Vector_1.Vector.Create(n)),
				(o = Rotator_1.Rotator.Create(o)),
				TeleportController_1.TeleportController.TeleportToPosition(
					n.ToUeVector(),
					o.ToUeRotator(),
					"InstanceDungeonEntranceController.OpenEditBattleView",
				).finally(() => {
					(ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
						!0),
						EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
							e,
							!0,
						),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnEnterTeam,
						);
				}))
			: ((ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
					!0),
				EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
					e,
					!0,
				),
				EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterTeam));
	}),
	(InstanceDungeonEntranceController.xai = (e) => {
		var n, o;
		ModelManager_1.ModelManager.OnlineModel.AllowInitiate
			? ((n = ModelManager_1.ModelManager.CreatureModel.IsMyWorld()),
				0 < (o = ModelManager_1.ModelManager.OnlineModel.NextInitiateLeftTime)
					? n
						? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"NextInviteTime",
								TimeUtil_1.TimeUtil.GetCoolDown(o),
							)
						: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
								"NextSuggestTime",
								TimeUtil_1.TimeUtil.GetCoolDown(o),
							)
					: (UiManager_1.UiManager.IsViewOpen("OnlineChallengeApplyView") &&
							UiManager_1.UiManager.CloseView("OnlineChallengeApplyView"),
						2 !==
							ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
								ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
							) && n
							? OnlineController_1.OnlineController.InviteRechallengeRequest()
							: OnlineController_1.OnlineController.ApplyRechallengeRequest(
									Protocol_1.Aki.Protocol.h3s.Proto_Settle,
								)))
			: ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"CannotInvite",
				);
	});
