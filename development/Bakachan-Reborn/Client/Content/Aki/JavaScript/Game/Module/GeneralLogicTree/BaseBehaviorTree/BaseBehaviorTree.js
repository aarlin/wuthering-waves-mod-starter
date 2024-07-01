"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BaseBehaviorTree = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	Queue_1 = require("../../../../Core/Container/Queue"),
	Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
	NodeTypeDefine_1 = require("../Define/NodeTypeDefine"),
	GeneralLogicTreeController_1 = require("../GeneralLogicTreeController"),
	BehaviorTreeSuspendComponent_1 = require("./BehaviorTreeSuspendComponent"),
	BehaviorTreeTimerComponent_1 = require("./BehaviorTreeTimerComponent"),
	BlackBoard_1 = require("./BlackBoard"),
	BehaviorTreeExpressionComponent_1 = require("./Express/BehaviorTreeExpressionComponent"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class BaseBehaviorTree {
	constructor(e, t, o, r, i) {
		(this.InnerId = BigInt(0)),
			(this.InnerTreeConfigId = 0),
			(this.BtType = Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInvalid),
			(this.YWt = void 0),
			(this.JWt = void 0),
			(this.FlowInfo = void 0),
			(this.BlackBoard = void 0),
			(this.Expression = void 0),
			(this.TimerCenter = void 0),
			(this.Suspend = void 0),
			(this.zWt = (e) => {
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.PlayerRevive,
					this.zWt,
				),
					this.ZWt();
			}),
			(this.ZWt = (e) => {
				this.BlackBoard.ContainTag(5) &&
					!this.BlackBoard.ContainTag(6) &&
					GeneralLogicTreeController_1.GeneralLogicTreeController.RequestRollback(
						this.InnerId,
						e,
					);
			}),
			(this.InnerId = e),
			(this.InnerTreeConfigId = t),
			(this.BtType = o),
			(this.YWt = []),
			(this.JWt = new Queue_1.Queue()),
			(this.BlackBoard = new BlackBoard_1.Blackboard(this.BtType, e, t, r, i)),
			this.BlackBoard.AddTag(8);
	}
	get TreeIncId() {
		return this.InnerId;
	}
	get TreeConfigId() {
		return this.InnerTreeConfigId;
	}
	get DungeonId() {
		return this.BlackBoard.DungeonId;
	}
	InitTree(e, t = !1) {
		this.eKt(), this.SetSleep(t), this.Recover(e), this.tKt();
	}
	Destroy() {
		this.iKt(),
			this.SetTrack(!1),
			this.FlowInfo.Dispose(),
			this.Expression.Dispose(),
			this.TimerCenter.Dispose(),
			this.BlackBoard.Dispose();
	}
	CreateNode(e, t) {
		if (this.BlackBoard.IsSleeping)
			this.oKt({ ProcessType: 0, Reason: e, NodeInfo: t });
		else if (t) {
			var o = this.BlackBoard.GetNodeConfig(t.NodeId),
				r = (0, NodeTypeDefine_1.newNodeObj)(o);
			if (r)
				return (
					this.BlackBoard.AddNode(t.NodeId, r),
					this.BlackBoard.AddNodeToStatusGroup(r, t.n3n),
					r.Init(this.BlackBoard, e, t, o, this.BtType),
					r
				);
		}
	}
	oKt(e) {
		this.JWt.Push(e);
	}
	eKt() {
		(this.FlowInfo = new DynamicFlowInfo()),
			(this.TimerCenter =
				new BehaviorTreeTimerComponent_1.BehaviorTreeTimerCenter(this.InnerId)),
			(this.Suspend =
				new BehaviorTreeSuspendComponent_1.BehaviorTreeSuspendComponent(
					this.InnerId,
					this.BlackBoard,
				)),
			(this.Expression =
				new BehaviorTreeExpressionComponent_1.BehaviorTreeExpressionComponent(
					this.BlackBoard,
				)),
			this.Expression.Init();
	}
	Recover(e) {
		e &&
			(this.rKt(e.Gfs),
			this.nKt(e.kfs),
			this.sKt(e.Ofs),
			this.aKt(e.Nfs, e.Ffs));
	}
	rKt(e) {
		if (e)
			for (const o of Object.keys(e)) {
				var t = e[o];
				((t.NodeId = Number(o)), this.GetNode(t.NodeId))
					? Log_1.Log.CheckWarn() &&
						Log_1.Log.Warn("GeneralLogicTree", 19, "创建节点时：节点已存在", [
							"节点Id",
							t.NodeId,
						])
					: this.CreateNode(1, t);
			}
	}
	nKt(e) {
		if (e) for (const t of e) this.UpdateTimer(t);
	}
	sKt(e) {
		for (const o of Object.keys(e)) {
			var t = e[o];
			this.BlackBoard.UpdateTreeVar(o, t);
		}
	}
	aKt(e, t) {
		this.Suspend.UpdateOccupations(0, e, t);
	}
	tKt() {
		EventSystem_1.EventSystem.AddWithTarget(
			this.BlackBoard,
			EventDefine_1.EEventName.GeneralLogicTreeRemovePrepareRollbackNode,
			this.ZWt,
		),
			EventSystem_1.EventSystem.AddWithTarget(
				this.BlackBoard,
				EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate,
				this.ZWt,
			);
	}
	iKt() {
		EventSystem_1.EventSystem.RemoveWithTarget(
			this.BlackBoard,
			EventDefine_1.EEventName.GeneralLogicTreeRemovePrepareRollbackNode,
			this.ZWt,
		),
			EventSystem_1.EventSystem.Has(
				EventDefine_1.EEventName.PlayerRevive,
				this.zWt,
			) &&
				EventSystem_1.EventSystem.Remove(
					EventDefine_1.EEventName.PlayerRevive,
					this.zWt,
				),
			EventSystem_1.EventSystem.HasWithTarget(
				this.BlackBoard,
				EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate,
				this.ZWt,
			) &&
				EventSystem_1.EventSystem.RemoveWithTarget(
					this.BlackBoard,
					EventDefine_1.EEventName.GeneralLogicTreeRollbackWaitingUpdate,
					this.ZWt,
				);
	}
	SetSleep(e) {
		if (
			((this.BlackBoard.IsSleeping = e),
			!this.BlackBoard.IsSleeping && 0 !== this.JWt.Size)
		) {
			let e = this.JWt.Pop();
			for (; void 0 !== e; ) {
				switch (e.ProcessType) {
					case 0:
						this.CreateNode(e.Reason, e.NodeInfo);
						break;
					case 1:
						this.UpdateNodeState(e.Reason, e.NodeId, e.NodeStatus);
						break;
					case 2:
						this.UpdateNodeProgress(e.NodeId, e.NodeInfo);
						break;
					case 3:
						this.UpdateChildQuestNodeState(e.NodeId, e.NodeStatus, e.Reason);
						break;
					case 4:
						this.SetTrack(e.Value);
						break;
					case 5:
						this.DoAction(
							e.ContextType,
							e.NodeId,
							e.PlayerId,
							e.SessionId,
							e.StartIndex,
							e.EndIndex,
						);
						break;
					case 6:
						this.UpdateTimer(e.TimerInfo);
						break;
					case 7:
						this.UpdateOccupations(e.Notify);
						break;
					case 8:
						this.UpdateTreeVars(e.Notify);
				}
				e = 0 < this.JWt.Size ? this.JWt.Pop() : void 0;
			}
		}
	}
	UpdateNodeState(e, t, o) {
		var r;
		this.BlackBoard.IsSleeping
			? this.oKt({ ProcessType: 1, Reason: e, NodeId: t, NodeStatus: o })
			: (r = this.GetNode(t))
				? (this.BlackBoard.UpdateNodeInStatusGroup(r, r.Status, o),
					r.UpdateStatus(e, o))
				: (((r = new GeneralLogicTreeDefine_1.NodeInfo()).NodeId = t),
					(r.n3n = o),
					this.CreateNode(e, r));
	}
	UpdateNodeProgress(e, t) {
		this.BlackBoard.IsSleeping
			? this.oKt({ ProcessType: 2, NodeId: e, NodeInfo: t })
			: t && (e = this.GetNode(e)) && e.UpdateProgress(t);
	}
	UpdateChildQuestNodeState(e, t, o) {
		this.BlackBoard.IsSleeping
			? this.oKt({ ProcessType: 3, NodeId: e, NodeStatus: t, Reason: o })
			: (e = this.GetNode(e)) &&
				"ChildQuest" === e.NodeType &&
				e.UpdateChildQuestStatus(t, o);
	}
	GetNode(e) {
		return this.BlackBoard.GetNode(e);
	}
	GetNodesByGroupId(e) {
		return this.BlackBoard.GetNodesByGroupId(e);
	}
	GetTreeVarByKey(e) {
		return this.BlackBoard.GetTreeVar(e);
	}
	CheckCanGiveUp() {
		if (!ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) return !1;
		var e, t;
		if (!(t = this.GetProcessingFailedNode())) return !1;
		if (!t.CanGiveUp) return !1;
		if (!(t = this.GetNodesByGroupId(1))) return !1;
		let o = !0;
		for ([, e] of t)
			if ("ChildQuest" === e.NodeType && !e.CanGiveUp) {
				o = !1;
				break;
			}
		return o;
	}
	GetProcessingFailedNode() {
		var e = this.GetNodesByGroupId(1);
		if (e) {
			let o;
			for (var [, t] of e)
				if ("QuestFailed" === t.NodeType && t.CanGiveUp) {
					o = t;
					break;
				}
			return o;
		}
	}
	GetCurrentActiveChildQuestNode() {
		return this.BlackBoard.GetCurrentActiveChildQuestNode();
	}
	GetActiveChildQuestNodesId() {
		return this.BlackBoard.GetActiveChildQuestNodesId();
	}
	GetCurrentCorrelativeEntities() {
		var e = this.GetNodesByGroupId(1);
		if (e) {
			for (var [, t] of (this.YWt.splice(0, this.YWt.length), e))
				if ("ChildQuest" === t.NodeType && (t = t.GetCorrelativeEntities()))
					for (const e of t) this.YWt.push(e);
			return this.YWt;
		}
	}
	AddDynamicFlowNpc(e) {
		this.FlowInfo.AddDynamicFlowNpc(e);
	}
	PrepareRollback(e) {
		this.SetRollbackWaiting(!0), this.BlackBoard.AddTag(6);
		var t,
			o,
			r = this.BlackBoard.PreparingRollbackNodes,
			i = (r.splice(0, r.length), this.BlackBoard.GetAllNodes());
		for ([t, o] of i)
			o.ContainTag(6) &&
				(r.push(t), Log_1.Log.CheckInfo()) &&
				Log_1.Log.Info(
					"GeneralLogicTree",
					19,
					"GeneralLogicTree:节点暂时不能回退",
					["nodeId", t],
				);
		0 === r.length &&
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info(
					"GeneralLogicTree",
					19,
					"GeneralLogicTree:行为树所有节点均可回退",
					["treeConfigId", this.TreeConfigId],
				),
			this.BlackBoard.RemoveTag(6)),
			(i = ModelManager_1.ModelManager.DeadReviveModel.AllDead),
			e === Protocol_1.Aki.Protocol.gvs.Proto_CharacterDieFail && i
				? EventSystem_1.EventSystem.Add(
						EventDefine_1.EEventName.PlayerRevive,
						this.zWt,
					)
				: this.ZWt(e);
	}
	SetRollbackWaiting(e) {
		e && !this.BlackBoard.ContainTag(5)
			? this.BlackBoard.AddTag(5)
			: !e && this.BlackBoard.ContainTag(5) && this.BlackBoard.RemoveTag(5);
	}
	IsTracking() {
		return this.BlackBoard.IsTracking;
	}
	SetTrack(e, t = 0) {
		(e && this.BlackBoard.IsSuspend()) ||
			(this.BlackBoard.IsSleeping
				? this.oKt({ ProcessType: 4, Value: e })
				: this.BlackBoard.IsTracking !== e &&
					((this.BlackBoard.IsTracking = e),
					this.Expression.EnableTrack(e, t),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
						this.BtType,
						this.TreeIncId,
					)));
	}
	SetMapMarkResident(e) {
		this.BlackBoard.SetMapMarkResident(e);
	}
	StartTextExpress(e = 0) {
		this.Expression.StartTextExpress(e);
	}
	EndTextExpress(e = 0) {
		this.Expression.EndTextExpress(e);
	}
	CreateShowBridge() {
		return this.BlackBoard.CreateShowBridge();
	}
	GetSilentAreaShowInfo() {
		return this.BlackBoard.GetSilentAreaShowInfo();
	}
	GetTrackIconId() {
		return this.BlackBoard.TaskMarkTableId;
	}
	IsChallengeUi() {
		return this.BlackBoard.IsChallengeUi();
	}
	CheckCanShow() {
		return this.Expression.CheckCanShow();
	}
	GetNodeTrackPosition(e) {
		return this.Expression.GetNodeTrackPosition(e);
	}
	GetTrackDistance(e) {
		return this.Expression.GetTrackDistance(e);
	}
	GetDefaultMark(e) {
		return this.Expression.GetDefaultMark(e);
	}
	IsInTrackRange() {
		return this.BlackBoard.ContainTag(11);
	}
	IsRangeTrack(e) {
		let t = e;
		return (
			void 0 !==
				(t =
					void 0 === t ? this.GetCurrentActiveChildQuestNode()?.NodeId : t) &&
			0 !== this.GetRangeMarkSize(e)
		);
	}
	GetRangeMarkSize(e) {
		return this.Expression.GetRangeMarkSize(e);
	}
	GetRangeMarkShowDis(e) {
		return this.Expression.GetRangeMarkShowDis(e);
	}
	GetGuideLineHideDistance(e) {
		return this.IsInTrackRange() ? this.GetRangeMarkSize(e) : 0;
	}
	GetCurrentNodeShortcutShow() {
		return this.BlackBoard.ContainTag(7) ? 2 : this.CheckCanGiveUp() ? 1 : 0;
	}
	GetGiveUpText() {
		var e = this.GetProcessingFailedNode();
		return e && e.GiveUpText
			? PublicUtil_1.PublicUtil.GetConfigTextByKey(e.GiveUpText)
			: "";
	}
	CreateMapMarks() {
		this.Expression.CreateMapMarks();
	}
	DoAction(e, t, o, r, i, s) {
		if (this.BlackBoard.IsSleeping)
			this.oKt({
				ProcessType: 5,
				ContextType: e,
				NodeId: t,
				PlayerId: o,
				SessionId: r,
				StartIndex: i,
				EndIndex: s,
			});
		else {
			var a = this.BlackBoard.GetNodeConfig(t);
			if (a) {
				let n;
				switch (e) {
					case Protocol_1.Aki.Protocol.Pbs.mCs:
						"QuestSucceed" === a.Type && (n = a.FinishActions);
						break;
					case Protocol_1.Aki.Protocol.Pbs.SCs:
						"Action" === a.Type && (n = a.Actions);
						break;
					case Protocol_1.Aki.Protocol.Pbs.gCs:
						("ConditionSelector" !== a.Type &&
							"ParallelSelect" !== a.Type &&
							"Select" !== a.Type &&
							"Sequence" !== a.Type) ||
							(n = a.SaveConfig?.EnterActions);
						break;
					case Protocol_1.Aki.Protocol.Pbs.CCs:
						"QuestFailed" === a.Type && (n = a.FinishActions);
						break;
					case Protocol_1.Aki.Protocol.Pbs.cCs:
						"ChildQuest" === a.Type && (n = a.EnterActions);
						break;
					case Protocol_1.Aki.Protocol.Pbs.dCs:
						"ChildQuest" === a.Type && (n = a.FinishActions);
				}
				if (n && 0 !== n.length) {
					const a = this.GetNode(t);
					a?.AddTag(6),
						ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsByServerNotify(
							n,
							LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
								this.BtType,
								this.TreeIncId,
								this.TreeConfigId,
								t,
								e,
							),
							o,
							r,
							i,
							s,
							() => {
								a?.RemoveTag(6),
									this.BlackBoard.ContainTag(6) &&
										(Log_1.Log.CheckInfo() &&
											Log_1.Log.Info(
												"GeneralLogicTree",
												19,
												"节点完成行为后回滚",
												["行为树Id", this.TreeConfigId],
												["节点Id", t],
											),
										this.BlackBoard.RemovePreparingRollbackNode(t));
							},
						);
				} else
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"GeneralLogicTree",
							19,
							"服务器推送执行行为时，没有找到行为配置",
							["contextType", e],
							["treeConfigId", this.TreeConfigId],
							["nodeId", t],
						);
			} else
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"GeneralLogicTree",
						19,
						"服务器推送执行行为时，没有找到节点配置",
						["contextType", e],
						["treeConfigId", this.TreeConfigId],
						["nodeId", t],
					);
		}
	}
	UpdateTimer(e) {
		this.BlackBoard.IsSleeping
			? this.oKt({ ProcessType: 6, TimerInfo: e })
			: this.TimerCenter.UpdateTimerInfo(e);
	}
	GetChallengeRemainTime(e = "CountDownChallenge") {
		return this.TimerCenter.GetRemainTime(e);
	}
	UpdateTreeVars(e) {
		this.BlackBoard.IsSleeping
			? this.oKt({ ProcessType: 8, Notify: e })
			: (this.BlackBoard.UpdateTreeVar(e.Svs, e.Evs),
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
					this.TreeIncId,
				));
	}
	IsSuspend() {
		return this.BlackBoard.IsSuspend();
	}
	GetSuspendType() {
		return this.Suspend.GetSuspendType();
	}
	GetSuspendText() {
		return this.Suspend.GetSuspendText();
	}
	GetOccupations() {
		return this.Suspend.GetOccupations();
	}
	UpdateOccupations(e) {
		this.BlackBoard.IsSleeping
			? this.oKt({ ProcessType: 7, Notify: e })
			: this.Suspend.UpdateOccupations(e.Jkn, e.Nfs, e.Ffs);
	}
	HasRefOccupiedEntity() {
		return this.BlackBoard.HasRefOccupiedEntity();
	}
	GetRefOccupiedEntityText() {
		return this.BlackBoard.GetRefOccupiedEntityText();
	}
}
exports.BaseBehaviorTree = BaseBehaviorTree;
class DynamicFlowInfo {
	constructor() {
		(this.hKt = void 0), (this.hKt = []);
	}
	Dispose() {
		this.ClearDynamicFlowNpcList();
	}
	AddDynamicFlowNpc(e) {
		this.hKt.push(e);
	}
	ClearDynamicFlowNpcList() {
		for (const t of this.hKt) {
			var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
			e && (e = e.Entity.GetComponent(167)) && e.PlayDynamicFlowEnd();
		}
		this.hKt.splice(0, this.hKt.length);
	}
}
