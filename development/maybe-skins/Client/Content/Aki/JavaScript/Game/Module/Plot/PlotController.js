"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PlotController = void 0);
const ue_1 = require("ue"),
	Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
	CameraController_1 = require("../../Camera/CameraController"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	Global_1 = require("../../Global"),
	GlobalData_1 = require("../../GlobalData"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterBuffIds_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
	InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine"),
	UiManager_1 = require("../../Ui/UiManager"),
	PlotFormation_1 = require("./PlotFormation"),
	PlotViewManager_1 = require("./PlotView/PlotViewManager"),
	SequenceController_1 = require("./Sequence/SequenceController");
class PlotController extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return (
			(this.y$i = !1),
			ResourceSystem_1.ResourceSystem.LoadAsync(
				ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
					.PlotGoBattleMaterialPath,
				ue_1.PD_CharacterControllerData_C,
				(e) => {
					e
						? (ModelManager_1.ModelManager.PlotModel.GoBattleMaterial = e)
						: Log_1.Log.CheckError() &&
							Log_1.Log.Error("Plot", 27, "剧情切人效果资产加载失败", [
								"path",
								ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
									.PlotGoBattleMaterialPath,
							]);
				},
			),
			!0
		);
	}
	static OnTick(e) {
		this.TickAll(e),
			ModelManager_1.ModelManager.PlotModel &&
				(ModelManager_1.ModelManager.PlotModel.PlotWeather.OnTick(e),
				ModelManager_1.ModelManager.PlotModel.PlotTemplate.OnTick(e),
				ModelManager_1.ModelManager.PlotModel.PlotCleanRange.OnTick(e));
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.BeforeLoadMap,
			PlotController.I$i,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				PlotController.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnChangeRole,
				PlotController.OnChangeRole,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnStartLoadingState,
				PlotController.hMe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnBattleStateChanged,
				PlotController.Zpe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLeaveOnlineWorld,
				PlotController.hJe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				PlotController.dLe,
			),
			this.PlotViewManager.RegisterEvent();
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.BeforeLoadMap,
			PlotController.I$i,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				PlotController.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnChangeRole,
				PlotController.OnChangeRole,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnStartLoadingState,
				PlotController.hMe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnBattleStateChanged,
				PlotController.Zpe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLeaveOnlineWorld,
				PlotController.hJe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnUpdateSceneTeam,
				PlotController.dLe,
			),
			this.PlotViewManager.UnRegisterEvent();
	}
	static OnClear() {
		return !0;
	}
	static ChangeFormation() {
		this.T$i.ChangeFormation();
	}
	static async CheckFormation() {
		return this.T$i.CheckFormationPromise();
	}
	static OnStartPlotNetwork(e) {
		(ModelManager_1.ModelManager.PlotModel.IsInPlot = !0),
			(ModelManager_1.ModelManager.PlotModel.PlotStartFrame =
				Time_1.Time.Frame),
			(ModelManager_1.ModelManager.PlotModel.FlowListName = e.FlowListName),
			(ModelManager_1.ModelManager.PlotModel.CurContext = e.Context),
			(ModelManager_1.ModelManager.PlotModel.IsServerNotify = e.IsServerNotify),
			(ModelManager_1.ModelManager.PlotModel.IsAsync = e.IsAsync),
			(ModelManager_1.ModelManager.PlotModel.KeepBgAudio = e.KeepMusic),
			ModelManager_1.ModelManager.PlotModel.PlotResult.Reset(),
			(ModelManager_1.ModelManager.PlotModel.PlotResult.FlowListName =
				e.FlowListName),
			(ModelManager_1.ModelManager.PlotModel.PlotResult.FlowId = e.FlowId),
			(ModelManager_1.ModelManager.PlotModel.PlotResult.StateId = e.StateId),
			(ModelManager_1.ModelManager.PlotModel.PlotResult.FlowIncId =
				e.FlowIncId),
			e.IsBackground ||
				"LevelD" === e.PlotLevel ||
				"Prompt" === e.PlotLevel ||
				this.PlotViewManager.ProtectPlotView(),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.PlotNetworkStart,
				e,
			);
	}
	static OnEndPlotNetwork() {
		(ModelManager_1.ModelManager.PlotModel.KeepBgAudio = !1),
			ModelManager_1.ModelManager.PlotModel.ResetAudioState(),
			(ModelManager_1.ModelManager.PlotModel.IsInPlot = !1),
			ModelManager_1.ModelManager.PlotModel.FinishMontage(),
			SequenceController_1.SequenceController.ManualFinish(),
			ModelManager_1.ModelManager.PlotModel.SetRender(!1),
			ModelManager_1.ModelManager.PlotModel.SetInPlotGameBudget(!1),
			ModelManager_1.ModelManager.PlotModel.FinishTemplate(),
			ModelManager_1.ModelManager.PlotModel.PlotWeather.OnPlotEnd(),
			ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.OnPlotEnd(),
			ModelManager_1.ModelManager.PlotModel.PlotCleanRange.Close(),
			ModelManager_1.ModelManager.PlotModel.GrayOptionMap.clear(),
			(ModelManager_1.ModelManager.PlotModel.PlotConfig.DisableInput = !1),
			(ModelManager_1.ModelManager.PlotModel.IsTipsViewShowed = !1),
			(ModelManager_1.ModelManager.PlotModel.CurTalkItem = void 0),
			(ModelManager_1.ModelManager.PlotModel.CurShowTalk = void 0),
			(Global_1.Global.CharacterCameraManager.FadeAmount = 0),
			CameraController_1.CameraController.ExitDialogMode(),
			InputDistributeController_1.InputDistributeController.RefreshInputTag(),
			this.TogglePlotProtect(!1);
		var e = ModelManager_1.ModelManager.PlotModel.PlotResult;
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlotNetworkEnd, e),
			e.Reset(),
			ModelManager_1.ModelManager.PlotModel.ClearContext(),
			ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Clear(),
			0 < ModelManager_1.ModelManager.PlotModel.PlotPendingList.length
				? ((ModelManager_1.ModelManager.PlotModel.IsBackInteractionAfterFlow =
						!1),
					this.EndInteraction(!0))
				: ModelManager_1.ModelManager.PlotModel.IsBackInteractionAfterFlow &&
					((ModelManager_1.ModelManager.PlotModel.IsBackInteractionAfterFlow =
						!1),
					this.TriggerInteraction());
	}
	static CloseAllUi() {
		this.PlotViewManager.ClosePlotView();
	}
	static ClearUi() {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClearPlotSubtitle);
	}
	static HideUi(e) {
		EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HidePlotUi, e);
	}
	static GetCurrentViewName() {
		return this.PlotViewManager.GetCurrentViewName();
	}
	static OpenPlotView(e, t, o) {
		this.PlotViewManager.OpenPlotView(e, t, o);
	}
	static ProtectPlotView() {
		this.PlotViewManager.ProtectPlotView();
	}
	static UnProtectPlotView() {
		this.PlotViewManager.UnProtectPlotView();
	}
	static OpenCurrentPlotView(e, t) {
		let o;
		switch (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel) {
			case "LevelA":
			case "LevelB":
				o = "PlotSubtitleView";
				break;
			case "LevelC":
				o = "PlotView";
				break;
			case "LevelD":
				o = "PlotViewHUD";
		}
		o ? this.PlotViewManager.OpenPlotView(o, e, t) : e?.(!0);
	}
	static WaitViewCallback(e) {
		this.PlotViewManager.WaitOpenCallback(e);
	}
	static RemoveViewCallback(e) {
		this.PlotViewManager.RemoveCallback(e);
	}
	static HandleShowCenterText(e) {
		(e = e ? "PlotTransitionViewPop" : "PlotTransitionView"),
			UiManager_1.UiManager.IsViewShow(e)
				? EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.UpdatePlotCenterText,
					)
				: UiManager_1.UiManager.IsViewOpen(e) ||
					UiManager_1.UiManager.OpenView(e, void 0, () => {
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.UpdatePlotCenterText,
						);
					});
	}
	static ShowTipsView(e, t) {
		return (
			!ModelManager_1.ModelManager.PlotModel.IsTipsViewShowed &&
			((ModelManager_1.ModelManager.PlotModel.IsTipsViewShowed = !0),
			(ModelManager_1.ModelManager.PlotModel.CurTalkItem = e),
			this.PlotViewManager.OpenPlotView("PlotTipsView", void 0, t),
			!0)
		);
	}
	static HandleSeqPlayerInput(e, t) {
		var o, l;
		GlobalData_1.GlobalData.GameInstance &&
			((o = Global_1.Global.BaseCharacter),
			(l = Global_1.Global.CharacterController),
			void 0 !== o) &&
			void 0 !== l &&
			(e ||
				ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(
					InputDistributeDefine_1.inputDistributeTagDefine.FightInputRootTag,
				),
			ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(e),
			l.SetIgnoreLookInput(t));
	}
	static TogglePlotProtect(e) {
		this.y$i !== e &&
			((this.y$i = e)
				? ModelManager_1.ModelManager.PlotModel.SaveCharacterLockOn()
				: ModelManager_1.ModelManager.PlotModel.RevertCharacterLockOn()),
			e ? this.ProtectCurrentRole() : this.L$i();
	}
	static ProtectCurrentRole() {
		var e,
			t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
		t &&
			!this.D$i.has(t.Id) &&
			(this.D$i.add(t.Id),
			(e = t?.Entity?.GetComponent(157)),
			(t = t?.Entity?.GetComponent(185)) &&
				(t.HasTag(this.R$i) || t.AddTag(this.R$i),
				t.HasTag(this.U$i) || t.AddTag(this.U$i)),
			e?.AddBuff(CharacterBuffIds_1.buffId.StoryInvincibleCommon, {
				InstigatorId: e.CreatureDataId,
				Reason: "PlotController.ProtectCurrentRole",
			}));
	}
	static L$i() {
		for (const t of this.D$i) {
			var e = EntitySystem_1.EntitySystem.Get(t);
			this.A$i(e, !0);
		}
		this.D$i.clear();
	}
	static A$i(e, t) {
		var o = e?.GetComponent(157);
		e = e?.GetComponent(185);
		t && (e?.RemoveTag(this.R$i), e?.RemoveTag(this.U$i)),
			o?.RemoveBuff(
				CharacterBuffIds_1.buffId.StoryInvincibleCommon,
				-1,
				"PlotController.RemoveProtect",
			);
	}
	static IsEnableInteract() {
		return (
			!ModelManager_1.ModelManager.PlotModel.IsInPlot ||
			"LevelD" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ||
			"Prompt" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
		);
	}
	static NeedInputRefresh() {
		return (
			ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot() ||
			0 < ModelManager_1.ModelManager.PlotModel.PlotPendingList.length
		);
	}
	static TriggerInteraction(e = !0) {
		if (ModelManager_1.ModelManager.PlotModel.IsInPlot)
			return (
				("LevelD" ===
					ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ||
					"Prompt" ===
						ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel) &&
				((ModelManager_1.ModelManager.PlotModel.IsInInteraction = !0),
				this.SetBackInteractionAfterFlow(),
				ControllerHolder_1.ControllerHolder.FlowController.FinishFlow(
					"触发交互结束剧情",
				),
				!0)
			);
		(ModelManager_1.ModelManager.PlotModel.IsInInteraction = !0),
			ModelManager_1.ModelManager.PlotModel.PlotConfig.SetMode(
				{ Mode: "LevelC", IsSwitchMainRole: !1, UseFlowCamera: !0 },
				!0,
			),
			ModelManager_1.ModelManager.PlotModel.ApplyPlotConfig();
		var t =
			ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
		if (t) {
			var o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
			if (!o) return !1;
			var l = o.Entity.GetComponent(178);
			if (!l) return !1;
			if (!l.IsPawnInteractive()) return !1;
			(ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity = o),
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("Interaction", 37, "设置当前交互目标", [
						"EntityId",
						t,
					]),
				EventSystem_1.EventSystem.EmitWithTarget(
					o.Entity,
					EventDefine_1.EEventName.OnInteractPlotStart,
				);
			const a = l.GetInteractController();
			(ModelManager_1.ModelManager.PlotModel.InteractController = a),
				this.ProtectPlotView(),
				this.OpenPlotView("PlotView", (t) => {
					e &&
						t &&
						ModelManager_1.ModelManager.PlotModel.IsInInteraction &&
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.TriggerPlotInteraction,
							a,
						),
						t &&
							EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.PlotInteractViewOpen,
							);
				});
		} else
			this.EndInteraction(),
				Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 18, "交互目标为空");
		return !0;
	}
	static EndInteractionByInteractController(e) {
		ModelManager_1.ModelManager.PlotModel.InteractController === e &&
			this.EndInteraction();
	}
	static EndInteraction(e = !1, t = !1) {
		(ModelManager_1.ModelManager.PlotModel.IsInInteraction || t) &&
			((ModelManager_1.ModelManager.PlotModel.IsInInteraction = !1),
			(ModelManager_1.ModelManager.PlotModel.InteractController = void 0),
			e
				? this.ClearUi()
				: (ModelManager_1.ModelManager.PlotModel.ResetAudioState(),
					CameraController_1.CameraController.ExitDialogMode(),
					this.UnProtectPlotView(),
					this.CloseAllUi(),
					InputDistributeController_1.InputDistributeController.RefreshInputTag(),
					this.TogglePlotProtect(!1)),
			ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity
				? (EventSystem_1.EventSystem.EmitWithTarget(
						ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity.Entity,
						EventDefine_1.EEventName.OnInteractPlotEnd,
					),
					Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Interaction", 37, "清空当前交互目标", [
							"EntityId",
							ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity.Id,
						]),
					(ModelManager_1.ModelManager.PlotModel.CurrentInteractEntity =
						void 0))
				: Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn("Interaction", 37, "当前交互目标为空"));
	}
	static SetBackInteractionAfterFlow() {
		ModelManager_1.ModelManager.PlotModel.IsBackInteractionAfterFlow = !0;
	}
	static GetTalkItemsOfFlow(e) {
		if (e) {
			var t = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(
				e.FlowListName,
				e.FlowId,
				e.StateId,
			);
			if (t) {
				if (((t = t.find((e) => "ShowTalk" === e.Name)), t))
					return t.Params.TalkItems;
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						7,
						"[PlotController.StartPlotNetwork] 无法找到对应剧情的ShowTalk行为",
						["FlowListName", e.FlowListName],
						["FlowId", e.FlowId],
						["StateId", e.StateId],
					);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						7,
						"[PlotController.StartPlotNetwork] 无法找到对应剧情的状态",
						["FlowListName", e.FlowListName],
						["FlowId", e.FlowId],
						["StateId", e.StateId],
					);
		}
	}
	static GetTalkItemsOfCenterText(e) {
		if (e) {
			var t = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(
				e.FlowListName,
				e.FlowId,
				e.StateId,
			);
			if (t) {
				if (((t = t.find((e) => "ShowCenterText" === e.Name)), t))
					return t.Params.TidCenterText;
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						46,
						"[PlotController.StartPlotNetwork] 无法找到对应剧情的ShowCenterText行为",
						["FlowListName", e.FlowListName],
						["FlowId", e.FlowId],
						["StateId", e.StateId],
					);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						46,
						"[PlotController.StartPlotNetwork] 无法找到对应剧情的状态",
						["FlowListName", e.FlowListName],
						["FlowId", e.FlowId],
						["StateId", e.StateId],
					);
		}
	}
	static GetTalkItemsOfCenterTextForTeleport() {
		var e = ModelManager_1.ModelManager.PlotModel.PlayFlow;
		if (e) {
			var t = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(
				e.FlowListName,
				e.FlowId,
				e.StateId,
			);
			if (t) {
				if (((t = t.find((e) => "ShowCenterText" === e.Name)), t))
					return t.Params.TidCenterText;
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						46,
						"[PlotController.StartPlotNetwork] 无法找到对应剧情的ShowCenterText行为",
						["FlowListName", e.FlowListName],
						["FlowId", e.FlowId],
						["StateId", e.StateId],
					);
			} else
				Log_1.Log.CheckWarn() &&
					Log_1.Log.Warn(
						"Level",
						46,
						"[PlotController.StartPlotNetwork] 无法找到对应剧情的状态",
						["FlowListName", e.FlowListName],
						["FlowId", e.FlowId],
						["StateId", e.StateId],
					);
		}
	}
	static TriggerBlackSequence() {
		EventSystem_1.EventSystem.Emit(
			EventDefine_1.EEventName.TriggerBlackSequence,
		);
	}
	static ChangeWeather(e, t, o) {
		(ModelManager_1.ModelManager.PlotModel.IsInPlot ||
			GlobalData_1.GlobalData.IsPlayInEditor) &&
			ModelManager_1.ModelManager.PlotModel.PlotWeather.ChangeWeather(e, t, o);
	}
	static ChangePlotTimeOfDay(e, t, o = 0, l = 0) {
		(ModelManager_1.ModelManager.PlotModel.IsInPlot ||
			GlobalData_1.GlobalData.IsPlayInEditor) &&
			ModelManager_1.ModelManager.PlotModel.PlotTimeOfDay.SetTimeDuration(
				e,
				t,
				o,
				l,
			);
	}
	static AddTick(e) {
		return this.P$i++, this.x$i++, this.w$i.set(this.P$i, e), this.P$i;
	}
	static RemoveTick(e) {
		this.w$i.delete(e) && this.x$i--;
	}
	static TickAll(e) {
		this.x$i <= 0 ||
			this.w$i.forEach((t, o) => {
				try {
					t(e);
				} catch (t) {
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Event",
							27,
							"PlotModel Tick 异常",
							["name", o],
							["error", t],
						);
				}
			});
	}
}
((exports.PlotController = PlotController).PlotViewManager =
	new PlotViewManager_1.PlotViewManager()),
	(PlotController.T$i = new PlotFormation_1.PlotFormation()),
	(PlotController.R$i = 1659230325),
	(PlotController.U$i = 426183687),
	(PlotController.y$i = !1),
	(PlotController.D$i = new Set()),
	(PlotController.P$i = 0),
	(PlotController.w$i = new Map()),
	(PlotController.x$i = 0),
	(PlotController.I$i = () => {
		ModelManager_1.ModelManager.PlotModel.IsInPlot &&
			((ModelManager_1.ModelManager.PlotModel.PlotResult.ResultCode = 1),
			ControllerHolder_1.ControllerHolder.FlowController.BackgroundFlow(
				"加载地图前跳过当前剧情",
				!1,
			));
	}),
	(PlotController.nye = () => {
		ModelManager_1.ModelManager.PlotModel.IsInPlot ||
			PlotController.A$i(
				ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity,
				!1,
			);
	}),
	(PlotController.hMe = () => {
		PlotController.EndInteraction();
	}),
	(PlotController.hJe = () => {
		ModelManager_1.ModelManager.PlotModel.IsInPlot &&
			(ControllerHolder_1.ControllerHolder.FlowController.FinishFlow(
				"退出联机时退出剧情",
			),
			ControllerHolder_1.ControllerHolder.FlowController.ClearOnLeaveOnlineWorld());
	}),
	(PlotController.Zpe = (e) => {
		e &&
			ControllerHolder_1.ControllerHolder.FlowController.IsInShowTalk() &&
			ModelManager_1.ModelManager.PlotModel.PlotConfig.SkipTalkWhenFighting &&
			ControllerHolder_1.ControllerHolder.FlowController.FinishFlow(
				"战斗状态改变结束剧情",
			);
	}),
	(PlotController.OnChangeRole = (e, t) => {
		ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()
			? PlotController.ProtectCurrentRole()
			: PlotController.A$i(e.Entity, !1);
	}),
	(PlotController.dLe = () => {
		3 === ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType &&
			PlotController.ProtectCurrentRole();
	});
