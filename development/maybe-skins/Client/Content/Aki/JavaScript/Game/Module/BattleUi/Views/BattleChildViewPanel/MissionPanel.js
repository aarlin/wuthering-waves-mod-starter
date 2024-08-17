"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MissionPanel = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../Core/Common/Log"),
	Stats_1 = require("../../../../../Core/Common/Stats"),
	Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
	TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
	GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
	QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	BattleQuestUpdateTipsView_1 = require("../MissionView/BattleQuestUpdateTipsView"),
	BehaviorTreeView_1 = require("../MissionView/BehaviorTreeView"),
	BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
	MISSION_IN = "MissionIn",
	MISSION_OUT = "MissionOut";
class PendingProcess {
	constructor(e) {
		(this.ProcessType = e),
			(this.ProcessId = 0),
			(this.Finished = !1),
			(this.ProcessId = ++PendingProcess.Id);
	}
}
PendingProcess.Id = 0;
class TreeViewStartTrackProcess extends PendingProcess {
	constructor(e, t) {
		super(0), (this.ShowBridge = e), (this.Reason = t);
	}
}
class TreeViewEndTrackProcess extends PendingProcess {
	constructor(e, t) {
		super(1), (this.TreeIncId = e), (this.Reason = t);
	}
}
class TreeViewUpdateShowProcess extends PendingProcess {
	constructor(e) {
		super(2), (this.ShowBridge = e);
	}
}
class ShowQuestUpdateTipsProcess extends PendingProcess {
	constructor(e) {
		super(3), (this.Info = e);
	}
}
class MissionPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
	constructor() {
		super(...arguments),
			(this.Pze = void 0),
			(this.xze = void 0),
			(this.wze = void 0),
			(this.Bze = void 0),
			(this.bze = void 0),
			(this.SequencePlayer = void 0),
			(this.iAn = 0),
			(this.V_t = void 0),
			(this.b4e = !1),
			(this.qze = (e, t) => {
				this.GetActive() || this.Gze(e.TreeIncId),
					this.Nze(new TreeViewStartTrackProcess(e, t));
			}),
			(this.Oze = (e, t) => {
				this.GetActive() || this.Gze(e),
					this.Nze(new TreeViewEndTrackProcess(e, t));
			}),
			(this.kze = (e) => {
				this.Nze(new TreeViewUpdateShowProcess(e));
			}),
			(this.Fze = (e) => {
				this.Nze(new ShowQuestUpdateTipsProcess(e));
			}),
			(this.nye = () => {
				this.b4e = !0;
			}),
			(this.rAn = (e) => {
				this.bze && e === this.bze.ProcessId && this.Jze(e);
			}),
			(this.Vze = (e) => {
				var t = e.ShowBridge,
					i = t.TreeIncId,
					s =
						ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
							i,
						);
				if (s) {
					var n = s.BtType,
						r = this.Hze(n, e.Reason);
					switch (r) {
						case 0:
							if (
								ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
							)
								break;
							return this.Pze.get(r).StartShow(e.ProcessId, t);
						case 1:
							return this.jze(e.ProcessId, n, i, s.TreeConfigId, t);
					}
				}
				return !0;
			}),
			(this.Wze = (e) => {
				var t = this.Pze.get(0),
					i = e.TreeIncId;
				return i === t.TreeIncId
					? t.EndShow(e.ProcessId, e.Reason)
					: (t = this.Kze(i)) < 0 ||
							((i = this.Pze.get(1)),
							this.wze.splice(t, 1),
							0 === this.wze.length
								? i.EndShow(e.ProcessId)
								: this.Qze(e.ProcessId));
			}),
			(this.ZPt = (e) => {
				switch (e) {
					case MISSION_IN:
						var t = this.bze;
						1 === this.iAn
							? (Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Log",
										19,
										"MissionPanel:QuestUpdateStart - MISSION_IN Start",
									),
								this.xze.OnBeforePlayShowSequence(t.Info),
								this.GetItem(1)?.SetUIActive(!0),
								this.GetItem(2)?.SetUIActive(!1))
							: 3 === this.iAn &&
								(Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Log",
										19,
										"MissionPanel:QuestUpdateEnd - MISSION_IN Start",
									),
								(t = t.Info.ShowBridge),
								this.Xze(t),
								this.GetItem(1)?.SetUIActive(!1),
								this.GetItem(2)?.SetUIActive(!0));
						break;
					case MISSION_OUT:
						1 === this.iAn
							? (Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Log",
										19,
										"MissionPanel:VerticalLayout - MISSION_OUT 开始播放",
									),
								this.GetItem(1)?.SetUIActive(!1),
								this.GetItem(2)?.SetUIActive(!0))
							: 3 === this.iAn &&
								(Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Log",
										19,
										"MissionPanel:QuestUpdateEnd - MISSION_OUT Start",
									),
								this.GetItem(1)?.SetUIActive(!0),
								this.GetItem(2)?.SetUIActive(!1),
								this.xze.OnBeforePlayHideSequence());
				}
			}),
			(this.aut = (e) => {
				switch (e) {
					case MISSION_IN:
						var t = this.bze;
						if (1 === this.iAn) {
							(this.iAn = 2),
								Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Log",
										19,
										"MissionPanel:QuestUpdateStart - MISSION_IN End",
									);
							var i = t.Info.ShowBridge;
							if (i) {
								let e =
									ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestUpdateShowTime(
										i.QuestType,
									);
								(e = e || TimerSystem_1.MIN_TIME),
									Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"Log",
											19,
											"MissionPanel:QuestUpdateStay - Stay",
										),
									(this.V_t = TimerSystem_1.TimerSystem.Delay(
										this.oAn,
										1e3 * e,
									));
							} else this.oAn();
						} else
							3 === this.iAn &&
								(Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Log",
										19,
										"MissionPanel:QuestUpdateEnd - MISSION_IN End",
									),
								this.nAn(t));
						break;
					case MISSION_OUT:
						1 === this.iAn
							? this.SequencePlayer.PlayLevelSequenceByName(MISSION_IN)
							: 3 === this.iAn &&
								(Log_1.Log.CheckDebug() &&
									Log_1.Log.Debug(
										"Log",
										19,
										"MissionPanel:QuestUpdateEnd - MISSION_OUT End",
									),
								this.SequencePlayer.PlayLevelSequenceByName(MISSION_IN),
								this.sAn()) &&
								this.SequencePlayer.StopCurrentSequence(!0, !0);
				}
			}),
			(this.Awn = () => {
				switch (
					(Log_1.Log.CheckDebug() &&
						Log_1.Log.Debug("Log", 19, "MissionPanel:Press Track"),
					this.iAn)
				) {
					case 1:
						this.SequencePlayer.StopCurrentSequence(!1, !0);
						break;
					case 2:
						TimerSystem_1.TimerSystem.Has(this.V_t) &&
							TimerSystem_1.TimerSystem.Remove(this.V_t);
				}
				this.oAn();
			}),
			(this.oAn = () => {
				Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug(
						"Log",
						19,
						"MissionPanel:切换到QuestUpdateEnd - MISSION_OUT 开始播放",
					),
					(this.iAn = 3),
					this.SequencePlayer.PlayLevelSequenceByName(MISSION_OUT);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	OnStart() {
		this.RootItem.SetAnchorOffsetX(0),
			this.GetItem(1)?.SetUIActive(!1),
			this.GetItem(2).SetUIActive(!0);
	}
	async OnBeforeStartAsync() {
		await super.OnBeforeStartAsync(), (this.Pze = new Map());
		var e = this.GetItem(0),
			t =
				((t = await this.NewDynamicChildViewAsync(
					e.GetOwner(),
					BehaviorTreeView_1.BehaviorTreeView,
				)).SetActive(!1),
				this.Pze.set(0, t),
				LguiUtil_1.LguiUtil.CopyItem(e, e.GetParentAsUIItem()));
		(e = await this.NewDynamicChildViewAsync(
			t.GetOwner(),
			BehaviorTreeView_1.BehaviorTreeView,
		)).SetActive(!1),
			this.Pze.set(1, e),
			(this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.RootItem,
			)),
			this.SequencePlayer.BindSequenceStartEvent(this.ZPt),
			this.SequencePlayer.BindSequenceCloseEvent(this.aut);
	}
	InitializeTemp() {
		(this.wze = []), (this.Bze = []);
	}
	async InitializeAsync() {
		var e = this.GetItem(1);
		this.xze = await this.NewDynamicChildViewAsync(
			e.GetOwner(),
			BattleQuestUpdateTipsView_1.BattleQuestUpdateTipsView,
		);
	}
	Reset() {
		for (var [, e] of ((this.wze = void 0),
		this.xze?.Destroy(),
		(this.xze = void 0),
		this.Pze))
			e.Destroy();
		this.Pze.clear(), super.Reset();
	}
	OnShowBattleChildViewPanel() {
		for (var [, e] of this.Pze) e.OnPanelShow();
		this.xze.OnPanelShow(),
			this.SequencePlayer.GetCurrentSequence() &&
				this.SequencePlayer.ResumeSequence(),
			TimerSystem_1.TimerSystem.Has(this.V_t) &&
				TimerSystem_1.TimerSystem.IsPause(this.V_t) &&
				TimerSystem_1.TimerSystem.Resume(this.V_t);
	}
	OnHideBattleChildViewPanel() {
		for (var [, e] of this.Pze) e.OnPanelHide();
		this.xze.OnPanelHide(),
			this.SequencePlayer.GetCurrentSequence() &&
				this.SequencePlayer.PauseSequence(),
			TimerSystem_1.TimerSystem.Has(this.V_t) &&
				TimerSystem_1.TimerSystem.Pause(this.V_t);
	}
	AddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
			this.qze,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
				this.Oze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
				this.kze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.QuestUpdateInfoAdd,
				this.Fze,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				this.nye,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MissionPanelProcessEnd,
				this.rAn,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.QuestUpdateTipsClickTrack,
				this.Awn,
			);
	}
	RemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
			this.qze,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
				this.Oze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
				this.kze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.QuestUpdateInfoAdd,
				this.Fze,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.WorldDoneAndCloseLoading,
				this.nye,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MissionPanelProcessEnd,
				this.rAn,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.QuestUpdateTipsClickTrack,
				this.Awn,
			);
	}
	Gze(e) {
		if (0 !== this.Bze.length)
			for (let s = 0; s < this.Bze.length; s++) {
				var t = this.Bze[s];
				let n = !1;
				switch (t.ProcessType) {
					case 0:
					case 2:
						n = t.ShowBridge.TreeIncId === e;
						break;
					case 1:
						n = t.TreeIncId === e;
						break;
					case 3:
						n = t.Info.TreeIncId === e;
				}
				var i = this.bze && this.bze.ProcessId === t.ProcessId;
				n && !i && this.Bze.splice(s, 1);
			}
	}
	Nze(e) {
		this.Bze.push(e);
	}
	Nbn(e) {
		this.Bze.unshift(e);
	}
	OnTickBattleChildViewPanel(e) {
		this.b4e && (this.kbn(), this.Fbn(e));
	}
	kbn() {
		if (0 !== this.Bze.length && !this.bze) {
			switch (((this.bze = this.Bze[0]), this.bze.ProcessType)) {
				case 0:
					this.bze.Finished = this.Vze(this.bze);
					break;
				case 1:
					this.bze.Finished = this.Wze(this.bze);
					break;
				case 2:
					this.bze.Finished = this.$ze(this.bze);
					break;
				case 3:
					this.bze.Finished = this.Yze(this.bze);
			}
			this.bze?.Finished && this.Jze(this.bze.ProcessId);
		}
	}
	Fbn(e) {
		if (this.Pze)
			for (var [, t] of this.Pze) t.OnRefresh(e, this.bze?.ProcessId ?? 0);
	}
	Jze(e) {
		0 !== this.Bze.length &&
			this.Bze[0].ProcessId === e &&
			(this.Bze.shift(), (this.bze = void 0));
	}
	Hze(e, t) {
		let i = 1;
		switch (e) {
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
				i = 1 === t ? 1 : 0;
				break;
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
			case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
				i = 1;
		}
		return i;
	}
	$ze(e) {
		for (var [, t] of (this.Xze(e.ShowBridge), this.Pze))
			if (t.TreeIncId === e.ShowBridge.TreeIncId)
				return t.OnLogicTreeUpdateShow(e.ProcessId, e.ShowBridge);
		return !0;
	}
	Xze(e) {
		var t = this.wze.find((t) => t.ShowBridge.TreeIncId === e.TreeIncId);
		t && (t.ShowBridge = e);
	}
	Kze(e) {
		return this.wze.findIndex((t) => t.ShowBridge.TreeIncId === e);
	}
	zze() {
		this.wze.sort((e, t) =>
			e.ShowPriority !== t.ShowPriority
				? e.ShowPriority > t.ShowPriority
					? 1
					: -1
				: e.BtType !== t.BtType
					? e.BtType > t.BtType
						? 1
						: -1
					: e.ShowBridge.TreeIncId > t.ShowBridge.TreeIncId
						? 1
						: -1,
		);
	}
	jze(e, t, i, s, n) {
		return !this.Zze(t, i, s, n) || this.Qze(e);
	}
	Zze(e, t, i, s) {
		return (
			this.Pze.get(1).TreeIncId !== t &&
			!(
				0 <= this.Kze(t) ||
				((t = {
					ShowPriority:
						GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
							e,
							i,
						).GetUiPriority(),
					BtType: e,
					ShowBridge: s,
				}),
				this.wze.push(t),
				0)
			)
		);
	}
	Qze(e) {
		this.zze();
		var t = this.wze[this.wze.length - 1];
		return this.Pze.get(1).StartShow(e, t.ShowBridge);
	}
	Yze(e) {
		var t,
			i,
			s = e.Info;
		return (
			!s ||
			!(t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
				s.TreeIncId,
			)) ||
			!(
				t.GetNode(s.NodeId) &&
				((t =
					ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id),
				(i = s.ShowBridge.TreeConfigId),
				s.IsGmFinished
					? (t !== i &&
							QuestController_1.QuestNewController.RequestTrackQuest(i, !0, 0),
						this.nAn(e),
						0)
					: t === i
						? (this.nAn(e), 0)
						: (this.sAn()
								? ((this.iAn = 1),
									Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug("Log", 19, "MissionPanel: In 开始"),
									this.SequencePlayer.PlayLevelSequenceByName(MISSION_IN))
								: ((this.iAn = 1),
									Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug("Log", 19, "MissionPanel: Out 开始"),
									this.SequencePlayer.PlayLevelSequenceByName(MISSION_OUT)),
							1))
			)
		);
	}
	nAn(e) {
		Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("Log", 19, "MissionPanel:QuestUpdateTipsEnd -  AllOver"),
			this.xze.OnAfterPlayHideSequence(),
			this.rAn(e.ProcessId),
			this.Nbn(new TreeViewUpdateShowProcess(e.Info.ShowBridge)),
			(this.iAn = 0);
	}
	sAn() {
		for (var [, e] of this.Pze)
			if (e.IsShowingBehaviorTreeView && e.CheckVisible()) return !1;
		return !0;
	}
}
(exports.MissionPanel = MissionPanel).aYe = void 0;
