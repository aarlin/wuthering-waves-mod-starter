"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.InstanceDungeonController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation"),
	InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
	UiManager_1 = require("../../Ui/UiManager"),
	WorldGlobal_1 = require("../../World/WorldGlobal"),
	AdventureDefine_1 = require("../AdventureGuide/AdventureDefine"),
	BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
	ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
	RoleController_1 = require("../RoleUi/RoleController"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	TowerController_1 = require("../TowerDetailUi/TowerController"),
	InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonController extends UiControllerBase_1.UiControllerBase {
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
			this.oai,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				this.b4e,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.InputDistribute,
				this.rai,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnInstResultNotify,
				this.nai,
			);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
			this.oai,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				this.b4e,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.InputDistribute,
				this.rai,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnInstResultNotify,
				this.nai,
			);
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(16691, InstanceDungeonController.sai),
			Net_1.Net.Register(19997, InstanceDungeonController.nai);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(16691), Net_1.Net.UnRegister(19997);
	}
	static GetBeInviteOverdueTime(e) {
		return e
			? (e.GetLimitTimestamp() - TimeUtil_1.TimeUtil.GetServerTimeStamp()) /
					WorldGlobal_1.ONE_SECOND_FOR_MILLISECOND
			: 0;
	}
	static GetInstExchangeRewardRequest() {
		var e = new Protocol_1.Aki.Protocol.Hes();
		Net_1.Net.Call(13229, e, (e) => {
			e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeScrollingTipsView(
					e.lkn,
					[],
				),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
						"协议id",
						"10214" + Protocol_1.Aki.Protocol.jes.name,
					]);
		});
	}
	static OnClickInstanceDungeonExitButton(e, n) {
		let o = 4;
		if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
			o = 133;
			const r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o);
			(r.IsEscViewTriggerCallBack = !1),
				r.FunctionMap.set(1, () => {
					TowerController_1.TowerController.LeaveTower(), n && n();
				}),
				r.FunctionMap.set(2, () => {
					TowerController_1.TowerController.ReChallengeTower(), e && e();
				}),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					r,
				);
		} else if (ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike())
			UiManager_1.UiManager.OpenView("RoguelikeExitTips");
		else {
			const t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o);
			(t.IsEscViewTriggerCallBack = !1),
				t.FunctionMap.set(0, n),
				t.FunctionMap.set(1, () => {
					n && n();
				}),
				t.FunctionMap.set(2, () => {
					this.vPr() ||
						InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest(),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
						),
						e && e();
				}),
				(t.BeforePlayCloseFunction = () => {
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("InstanceDungeon", 5, "副本离开确认框时停结束"),
						-1 !== this.aai &&
							((this.aai = -1),
							UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
								ViewId: this.aai,
								TimeDilation: 1,
								DebugName: "ConfirmBoxView",
								Reason: "InstanceDungeon",
							}));
				}),
				ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
					t,
				),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("InstanceDungeon", 5, "副本离开确认框触发时停");
			var r = UiManager_1.UiManager.GetViewByName("ConfirmBoxView");
			r &&
				((this.aai = r.GetViewId()),
				UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
					ViewId: this.aai,
					TimeDilation: 0,
					DebugName: "ConfirmBoxView",
					Reason: "InstanceDungeon",
				}));
		}
	}
	static vPr() {
		let e =
			ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId;
		ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
			(e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
		var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
		return (
			n?.InstSubType === AdventureDefine_1.EDungeonSubType.Mowing ||
			n?.InstSubType === AdventureDefine_1.EDungeonSubType.BossRush
		);
	}
	static async PrewarTeamFightRequest(e, n, o = 0, r = 0, t) {
		if (RoleController_1.RoleController.IsInRoleTrial())
			return (
				ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
					"TrialRoleDungeonsLimit",
				),
				!1
			);
		if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
			return (
				ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"PhantomFormationEnterInstanceTip",
				),
				!1
			);
		InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
		var l = Protocol_1.Aki.Protocol.Bes.create();
		return (e =
			((l.Rkn = e),
			(l.xkn = n),
			(l.G5n = o),
			(l.Pkn = r),
			(l.Bkn = t),
			BlackScreenController_1.BlackScreenController.AddBlackScreen(
				"None",
				"LeaveScene",
			),
			await Net_1.Net.CallAsync(29077, l).finally(() => {
				BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
					"None",
					"LeaveScene",
				);
			}))).lkn !== Protocol_1.Aki.Protocol.lkn.Sys
			? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					e.lkn,
					26884,
				),
				!1)
			: ((ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList =
					n),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.EnterInstanceDungeon,
				),
				!0);
	}
	static async SingleInstReChallengeRequest(e) {
		return ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
			? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
					"PhantomFormationEnterInstanceTip",
				),
				!1)
			: (InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity(),
				(n =
					(((n = Protocol_1.Aki.Protocol.Zes.create()).xkn = e),
					await Net_1.Net.CallAsync(11734, n))).lkn !==
				Protocol_1.Aki.Protocol.lkn.Sys
					? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							n.lkn,
							5840,
						),
						!1)
					: ((ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList =
							e),
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.EnterInstanceDungeon,
						),
						!0));
		var n;
	}
}
((exports.InstanceDungeonController = InstanceDungeonController).aai = -1),
	(InstanceDungeonController.rai = (e) => {
		!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
			e !== InputMappingsDefine_1.actionMappings.功能菜单 ||
			LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc ||
			ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() ||
			InstanceDungeonController.OnClickInstanceDungeonExitButton();
	}),
	(InstanceDungeonController.oai = () => {
		var e;
		ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
			((e =
				ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()) ||
				(Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("InstanceDungeon", 28, "加载结束但是副本行为树为空")),
			e?.SetTrack(!0));
	}),
	(InstanceDungeonController.b4e = () => {
		ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
			(ModelManager_1.ModelManager.InstanceDungeonModel.ConstructCurrentDungeonAreaName(),
			ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonName() &&
				UiManager_1.UiManager.OpenView("InstanceDungeonAreaView"),
			(ModelManager_1.ModelManager.InstanceDungeonModel.CurrentInstanceIsFinish =
				ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(
					ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
				)));
	}),
	(InstanceDungeonController.sai = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InstanceDungeon", 5, "副本信息通知", [
				"副本玩法Id:",
				e.Ekn,
			]),
			ModelManager_1.ModelManager.InstanceDungeonModel.CreateInstanceInfo(
				e.Ekn,
			);
	}),
	(InstanceDungeonController.nai = (e) => {
		Log_1.Log.CheckInfo() &&
			Log_1.Log.Info("InstanceDungeon", 5, "副本结束通知", ["副本Id:", e.Ekn]),
			e.Ekn === ModelManager_1.ModelManager.CreatureModel.GetInstanceId() &&
				((ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess =
					e.U0s ? 1 : 2),
				(ModelManager_1.ModelManager.InstanceDungeonModel.InstanceRewardHaveTake =
					e.YRs));
	});
