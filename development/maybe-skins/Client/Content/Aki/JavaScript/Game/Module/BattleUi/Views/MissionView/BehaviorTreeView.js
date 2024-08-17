"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BehaviorTreeView = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	InputSettings_1 = require("../../../../InputSettings/InputSettings"),
	InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
	InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
	BehaviorTreeShowBridge_1 = require("../../../GeneralLogicTree/BaseBehaviorTree/BehaviorTreeShowBridge"),
	GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController"),
	GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
	PlatformController_1 = require("../../../Platform/PlatformController"),
	BattleUiDefine_1 = require("../../BattleUiDefine"),
	BattleChildView_1 = require("../BattleChildView/BattleChildView"),
	MissionPanelStep_1 = require("./MissionPanelStep");
class BehaviorTreeView extends BattleChildView_1.BattleChildView {
	constructor() {
		super(...arguments),
			(this.J_t = void 0),
			(this.z_t = void 0),
			(this.Z_t = void 0),
			(this.TotalTitleSequencePlayer = void 0),
			(this.QuestFinishSequencePlayer = void 0),
			(this.tut = void 0),
			(this.w_t = void 0),
			(this.IsShowingBehaviorTreeView = !1),
			(this.Vbn = !1),
			(this.iut = !1),
			(this.G_t = 0),
			(this.Hbn = 0),
			(this.out = 0),
			(this.uAn = (e) => {
				"Start" === e &&
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("BattleUiSet", 19, "开始调用ProcessItem节点Active"),
					this.SetUiActive(!0),
					this.GetText(8).IsUIActiveSelf()
						? this.tut?.SetUiActive(!1)
						: this.tut?.PlayStartSequence(
								this.G_t,
								this.w_t.TreeIncId,
								this.w_t.TrackTextConfig,
							));
			}),
			(this.cAn = (e) => {
				switch (e) {
					case "Start":
						this.GetText(8).IsUIActiveSelf() &&
							this.tut?.PlayStartSequence(
								this.G_t,
								this.w_t.TreeIncId,
								this.w_t.TrackTextConfig,
							);
						break;
					case "Close":
						this.SetUiActive(!1), this.hut();
				}
			}),
			(this.hFs = (e) => {
				"Start" === e &&
					(this.GetText(6).SetText(this.w_t?.QuestName ?? ""),
					this.J_t.SetUIActive(!1),
					this.z_t.SetUIActive(!0));
			}),
			(this._ut = (e) => {
				switch (e) {
					case "Start":
						this.QuestFinishSequencePlayer.PlayLevelSequenceByName("Close");
						break;
					case "Close":
						this.J_t.SetUIActive(!0), this.z_t.SetUIActive(!1), this.hut();
				}
			}),
			(this.CAn = () => {
				var e,
					t = this.GetText(8);
				return this.w_t &&
					this.w_t.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
					(e =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							this.w_t.TreeIncId,
						)) &&
					(e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
						e.TreeConfigId,
					))
					? (t.SetText(e.Name), t.SetUIActive(!0), !0)
					: (t.SetUIActive(!1), !1);
			}),
			(this.Uwn = (e) => {
				this.TreeIncId !== e ||
					this.GetText(8).IsUIActiveSelf() ||
					this.GetSprite(0)?.SetUIActive(!1);
			}),
			(this.Rwn = (e) => {
				this.TreeIncId !== e || this.GetText(8).IsUIActiveSelf() || this.Dnt();
			}),
			(this.nut = () => {
				this.w_t && this.GetText(6).SetText(this.w_t.QuestName);
			}),
			(this.sut = () => {
				var e,
					t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMarkConfig(
						this.w_t?.TrackIconConfigId ?? 0,
					);
				t &&
					(e = this.GetUiNiagara(7)) &&
					(e.SetColor(UE.Color.FromHex(t.TrackTextStartEffectColor)),
					e.ActivateSystem(!0));
			}),
			(this.cut = (e) => {
				e === this.w_t?.TreeIncId && this.Wbn(0);
			}),
			(this.mut = (e) => {
				6 === e.Type &&
					e.TreeIncId === this.w_t?.TreeIncId &&
					(this.dut(), this.cut(this.w_t.TreeIncId));
			}),
			(this.gut = (e) => {
				7 === e && this.dut();
			}),
			(this.fut = (e) => {
				7 === e && this.dut();
			}),
			(this.bMe = (e, t) => {
				1 === t && this.vut();
			}),
			(this.vut = () => {
				if (this.w_t && !this.iut)
					switch (((this.iut = !0), this.out)) {
						case 1:
							var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(114);
							e.SetCloseFunction(() => {
								var e;
								this.w_t?.IsRollbackWaiting() &&
									((e = this.w_t.GetBlackboard()),
									EventSystem_1.EventSystem.EmitWithTarget(
										e,
										EventDefine_1.EEventName
											.GeneralLogicTreeRollbackWaitingUpdate,
									));
							}),
								e.FunctionMap.set(1, () => {
									this.iut = !1;
								}),
								e.FunctionMap.set(2, () => {
									!this.w_t || this.w_t?.IsRollbackWaiting()
										? (this.iut = !1)
										: GeneralLogicTreeController_1.GeneralLogicTreeController.RequestGiveUp(
												this.w_t.TreeIncId,
												() => {
													this.iut = !1;
												},
											);
								}),
								ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
									e,
								);
							break;
						case 2:
							(e = this.w_t.GetCurrentCommunicateId()),
								EventSystem_1.EventSystem.Emit(
									EventDefine_1.EEventName.CommunicateAgain,
									e,
								),
								this.dut(),
								(this.iut = !1);
					}
			}),
			(this.Sut = () => {
				this.w_t?.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
						this.w_t.BtType,
						this.w_t.TreeIncId,
					);
			}),
			(this.dKe = () => {
				this.dut();
			});
	}
	get TreeIncId() {
		return this.w_t?.TreeIncId;
	}
	get BtType() {
		return this.w_t?.BtType;
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UIItem],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIText],
			[7, UE.UINiagara],
			[8, UE.UIText],
		]),
			(this.BtnBindInfo = [[3, this.vut]]);
	}
	OnStart() {
		this.SetUiActive(!0),
			this.GetText(2).SetAlpha(1),
			this.GetItem(1).SetUIActive(!1),
			(this.J_t = this.GetItem(5)),
			this.J_t.SetUIActive(!0),
			(this.z_t = this.GetItem(4)),
			this.z_t.SetUIActive(!1),
			this.GetText(6).OnSelfLanguageChange.Bind(this.nut),
			this.GetText(8).OnSelfLanguageChange.Bind(this.CAn),
			(this.TotalTitleSequencePlayer =
				new LevelSequencePlayer_1.LevelSequencePlayer(this.J_t)),
			this.TotalTitleSequencePlayer.BindSequenceStartEvent(this.uAn),
			this.TotalTitleSequencePlayer.BindSequenceCloseEvent(this.cAn),
			(this.QuestFinishSequencePlayer =
				new LevelSequencePlayer_1.LevelSequencePlayer(this.z_t)),
			this.QuestFinishSequencePlayer.BindSequenceStartEvent(this.hFs),
			this.QuestFinishSequencePlayer.BindSequenceCloseEvent(this._ut),
			(this.Z_t = this.RootItem.GetOwner().GetComponentByClass(
				UE.UIButtonComponent.StaticClass(),
			)),
			this.GetUiNiagara(7).SetNiagaraUIActive(!0, !1);
		var e = this.GetItem(1);
		(this.tut = new MissionPanelStep_1.MissionPanelStep()), this.tut.Init(e);
	}
	OnBeforeDestroy() {
		InputDistributeController_1.InputDistributeController.UnBindAction(
			InputMappingsDefine_1.actionMappings.玩法放弃,
			this.bMe,
		),
			InputDistributeController_1.InputDistributeController.UnBindAction(
				InputMappingsDefine_1.actionMappings.任务追踪,
				this.bMe,
			);
	}
	Reset() {
		this.tut && (this.tut.Dispose(), (this.tut = void 0)),
			this.RootActor?.OnSequencePlayEvent.Unbind(),
			this.TotalTitleSequencePlayer?.Clear(),
			(this.TotalTitleSequencePlayer = void 0);
	}
	OnPanelShow() {
		(this.Vbn = !0),
			this.Ore(),
			this.QuestFinishSequencePlayer.GetCurrentSequence() &&
				this.QuestFinishSequencePlayer.ResumeSequence(),
			this.TotalTitleSequencePlayer.GetCurrentSequence() &&
				this.TotalTitleSequencePlayer.ResumeSequence(),
			this.tut?.ResumeSequence(),
			this.dut();
	}
	OnPanelHide() {
		(this.Vbn = !1),
			this.kre(),
			this.QuestFinishSequencePlayer.GetCurrentSequence() &&
				this.QuestFinishSequencePlayer.PauseSequence(),
			this.TotalTitleSequencePlayer.GetCurrentSequence() &&
				this.TotalTitleSequencePlayer.PauseSequence(),
			this.tut?.PauseSequence();
	}
	Ore() {
		this.Z_t?.OnClickCallBack.Bind(this.Sut),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
				this.mut,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.mut,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeAddTag,
				this.gut,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeRemoveTag,
				this.fut,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
				this.cut,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MissionPanelStepTitleAnimStart,
				this.Uwn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd,
				this.Rwn,
			),
			ModelManager_1.ModelManager.PlatformModel.IsMobile() ||
				EventSystem_1.EventSystem.Add(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.dKe,
				);
	}
	kre() {
		this.Z_t?.OnClickCallBack.Unbind(),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
				this.mut,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
				this.mut,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeAddTag,
				this.gut,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeRemoveTag,
				this.fut,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
				this.cut,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MissionPanelStepTitleAnimStart,
				this.Uwn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd,
				this.Rwn,
			),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.OnPlatformChanged,
				this.dKe,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.OnPlatformChanged,
					this.dKe,
				);
	}
	UpdateSelfData(e) {
		this.Iut(e), this.Dnt(), this.dut();
	}
	Iut(e) {
		this.w_t &&
			this.w_t !== e &&
			BehaviorTreeShowBridge_1.BehaviorTreeShowBridge.Recycle(this.w_t),
			(this.w_t = e);
	}
	Dnt() {
		var e, t;
		this.w_t &&
			(e = this.w_t.TrackIconConfigId) &&
			((t = this.GetSprite(0)),
			this.CheckVisible()
				? (t.SetUIActive(!0),
					this.SetSpriteByPath(
						ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(e),
						t,
						!1,
					))
				: t.SetUIActive(!1));
	}
	jbn() {
		this.w_t && this.tut.Update(this.w_t.TreeIncId, this.w_t.TrackTextConfig);
	}
	dut() {
		let e = void (this.out = 0);
		var t = this.GetText(2),
			i = this.w_t?.TreeIncId;
		switch (
			(i &&
				(e =
					ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
						i,
					)) &&
				(this.out = e.GetCurrentNodeShortcutShow()),
			this.out)
		) {
			case 0:
				InputDistributeController_1.InputDistributeController.UnBindAction(
					InputMappingsDefine_1.actionMappings.玩法放弃,
					this.bMe,
				),
					InputDistributeController_1.InputDistributeController.UnBindAction(
						InputMappingsDefine_1.actionMappings.任务追踪,
						this.bMe,
					),
					t.SetUIActive(!1);
				break;
			case 1: {
				let i = e.GetGiveUpText();
				if (
					((i =
						i ||
						ConfigManager_1.ConfigManager.TextConfig.GetTextById(
							"GeneralLogicTreeGiveUp",
						)),
					ModelManager_1.ModelManager.PlatformModel.IsPc())
				) {
					if (
						!(n = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
							InputMappingsDefine_1.actionMappings.玩法放弃,
						))
					) {
						t.SetUIActive(!1);
						break;
					}
					if (!(n = n.GetPcKey())) {
						t.SetUIActive(!1),
							Log_1.Log.CheckError() &&
								Log_1.Log.Error("GeneralLogicTree", 19, "pcKey为空", [
									"actionMapping",
									InputMappingsDefine_1.actionMappings.玩法放弃,
								]);
						break;
					}
					var n = `<texture=${n.GetKeyIconPath()}/>` + i;
					t.SetText(n);
				} else
					ModelManager_1.ModelManager.PlatformModel.IsGamepad()
						? ((n =
								this.Tut(InputMappingsDefine_1.actionMappings.玩法放弃, i) ??
								i),
							t.SetText(n))
						: ((n =
								`<texture=${ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("FightMissionStop")}/>` +
								i),
							t.SetText(n));
				t.SetAlpha(1),
					t.SetUIActive(!0),
					InputDistributeController_1.InputDistributeController.UnBindAction(
						InputMappingsDefine_1.actionMappings.玩法放弃,
						this.bMe,
					),
					InputDistributeController_1.InputDistributeController.BindAction(
						InputMappingsDefine_1.actionMappings.玩法放弃,
						this.bMe,
					);
				break;
			}
			case 2: {
				if (
					!(n = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
						InputMappingsDefine_1.actionMappings.任务追踪,
					))
				) {
					t.SetUIActive(!1),
						Log_1.Log.CheckError() &&
							Log_1.Log.Error(
								"GeneralLogicTree",
								19,
								"找不到actionBinding配置",
								[
									"actionMapping",
									InputMappingsDefine_1.actionMappings.任务追踪,
								],
							);
					break;
				}
				InputDistributeController_1.InputDistributeController.UnBindAction(
					InputMappingsDefine_1.actionMappings.任务追踪,
					this.bMe,
				),
					InputDistributeController_1.InputDistributeController.BindAction(
						InputMappingsDefine_1.actionMappings.任务追踪,
						this.bMe,
					);
				var r = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
					"QuestCommunicateCallback",
				);
				let e = r;
				if (PlatformController_1.PlatformController.IsPc()) {
					if (!(n = n.GetPcKey())) {
						t.SetUIActive(!1),
							Log_1.Log.CheckError() &&
								Log_1.Log.Error("GeneralLogicTree", 19, "pcKey为空", [
									"actionMapping",
									InputMappingsDefine_1.actionMappings.任务追踪,
								]);
						break;
					}
					e = `<texture=${(n = n.GetKeyIconPath())}/>` + r;
				} else
					ModelManager_1.ModelManager.PlatformModel.IsGamepad() &&
						(e =
							this.Tut(InputMappingsDefine_1.actionMappings.任务追踪, r) ?? r);
				t.SetText(e), t.SetAlpha(1), t.SetUIActive(!0);
				break;
			}
		}
	}
	Tut(e, t) {
		var i =
			InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
				e,
			);
		if (i) {
			var n = new Map();
			if ((i.GetCurrentPlatformKeyNameMap(n), n)) {
				let i = e,
					a = e;
				for (var [r, s] of n) {
					(r = InputSettings_1.InputSettings.GetKey(r)),
						(s = InputSettings_1.InputSettings.GetKey(s)),
						r && (i = r.GetKeyIconPath()),
						s && (a = s.GetKeyIconPath());
					break;
				}
				return `<texture=${i}/>+<texture=${a}/>` + t;
			}
		}
	}
	dAn(e) {
		return (
			(this.G_t = e),
			TimerSystem_1.TimerSystem.Next(this.sut),
			this.TotalTitleSequencePlayer.StopCurrentSequence(!0, !0),
			this.TotalTitleSequencePlayer.PlayLevelSequenceByName("Start"),
			"Disabled" !==
				ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() &&
				this.TotalTitleSequencePlayer.StopCurrentSequence(!0, !0),
			!1
		);
	}
	StartShow(e, t) {
		return (
			(this.IsShowingBehaviorTreeView = !0),
			this.UpdateSelfData(t),
			this.CAn(),
			this.dAn(e)
		);
	}
	EndShow(e, t) {
		return (
			(this.IsShowingBehaviorTreeView = !1),
			this.GetActive()
				? ((this.G_t = e),
					2 === t
						? this.QuestFinishSequencePlayer.PlayLevelSequenceByName("Start")
						: (this.TotalTitleSequencePlayer.StopCurrentSequence(!0, !0),
							this.TotalTitleSequencePlayer.PlayLevelSequenceByName("Close")),
					this.Iut(void 0),
					!1)
				: (this.Iut(void 0), !0)
		);
	}
	OnLogicTreeUpdateShow(e, t) {
		var i = this.w_t.TrackTextConfig,
			n = t.TrackTextConfig;
		return i.CheckTextEqual(n)
			? (this.UpdateSelfData(t), this.jbn(), !0)
			: ((this.G_t = e),
				this.tut.ExecuteSequenceOnUpdate(e, t, () => {
					this.UpdateSelfData(t);
				}),
				!1);
	}
	OnRefresh(e, t) {
		this.Vbn &&
			(this.Hbn > BattleUiDefine_1.REFRESH_POSITION_INTERVAL &&
				((this.Hbn -= BattleUiDefine_1.REFRESH_POSITION_INTERVAL), this.Wbn(t)),
			(this.Hbn += e));
	}
	Wbn(e) {
		(e && e === this.G_t) ||
			(this.CheckVisible()
				? (this.jbn(), this.SetUiActive(!0))
				: this.SetUiActive(!1));
	}
	CheckVisible() {
		var e;
		return !(
			!this.w_t ||
			!this.IsShowingBehaviorTreeView ||
			!(e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
				this.w_t.BtType,
				this.w_t.TreeConfigId,
			)) ||
			(this.BtType !== Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest
				? !e.CanShowInUiPanel() || this.w_t.CheckShowConfigEmpty()
				: ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
					!e.CanShowInUiPanel())
		);
	}
	hut() {
		this.G_t &&
			(EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.MissionPanelProcessEnd,
				this.G_t,
			),
			(this.G_t = 0));
	}
}
exports.BehaviorTreeView = BehaviorTreeView;
