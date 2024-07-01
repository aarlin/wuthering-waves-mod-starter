"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AiStateMachineBase = exports.appendDepthSpace = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	StateMachineCommon_1 = require("../../../Core/Utils/StateMachine/StateMachineCommon"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
	CombatDebugController_1 = require("../../Utils/CombatDebugController"),
	AiStateMachineTransition_1 = require("./AiStateMachineTransition");
function appendDepthSpace(t, e) {
	for (let i = 0; i < e; i++) t.Append("    ");
}
exports.appendDepthSpace = appendDepthSpace;
class AiStateMachineBase extends StateMachineCommon_1.StateMachineCommon {
	constructor(t, e, i) {
		if (
			(super(t, i.Name, e),
			(this.AiComponent = void 0),
			(this.TagComponent = void 0),
			(this.AttributeComponent = void 0),
			(this.SkillComponent = void 0),
			(this.ActorComponent = void 0),
			(this.BuffComponent = void 0),
			(this.MontageComponent = void 0),
			(this.AnimationComponent = void 0),
			(this.HitComponent = void 0),
			(this.TimeScaleComponent = void 0),
			(this.GameplayCueComponent = void 0),
			(this.MoveComponent = void 0),
			(this.FightStateComponent = void 0),
			(this.AiController = void 0),
			(this.SummonerAiController = void 0),
			(this.IsReferenceNode = !1),
			(this.IsOverrideNode = !1),
			(this.OverrideNodeUuid = 0),
			(this.SkillId = 0),
			(this.TakeControlType = 0),
			(this.Task = void 0),
			(this.TransitionMap = void 0),
			(this.Children = void 0),
			(this.ChildrenMap = void 0),
			(this.ElapseTime = -0),
			(this.SkillEnd = !1),
			(this.TaskFinish = !1),
			(this.ExecutedAction = !1),
			(this.Entity = void 0),
			(this.CurrentMessageIdCache = void 0),
			(this.LastState = 0),
			(this.HasTaskFinishCondition = !1),
			(this.Hre = void 0),
			(this.jre = !1),
			(this.WaitSwitchState = !1),
			(this.RemoteSwitchPending = void 0),
			(this.RemoteSwitchMessageId = void 0),
			(this.MBn = void 0),
			(this.SBn = void 0),
			t.Entity &&
				((this.Entity = t.Entity),
				(this.AiComponent = this.Entity.GetComponent(38)),
				(this.TagComponent = this.Entity.GetComponent(185)),
				(this.AttributeComponent = this.Entity.GetComponent(156)),
				(this.SkillComponent = this.Entity.GetComponent(33)),
				(this.BuffComponent = this.Entity.GetComponent(157)),
				(this.ActorComponent = this.Entity.GetComponent(3)),
				(this.MontageComponent = this.Entity.GetComponent(22)),
				(this.AnimationComponent = this.Entity.GetComponent(160)),
				(this.HitComponent = this.Entity.GetComponent(51)),
				(this.TimeScaleComponent = this.Entity.GetComponent(107)),
				(this.GameplayCueComponent = this.Entity.GetComponent(19)),
				(this.MoveComponent = this.Entity.GetComponent(161)),
				(this.FightStateComponent = this.Entity.GetComponent(46)),
				(this.AiController = this.AiComponent.AiController),
				(e = this.Entity.GetComponent(0).GetSummonerId())) &&
				((e =
					ModelManager_1.ModelManager.CreatureModel.GetEntity(
						e,
					)?.Entity.GetComponent(38)),
				(this.SummonerAiController = e?.AiController)),
			(this.Uuid = i.Uuid),
			(this.Name = i.Name),
			(e = t.NodeReferenceMap.get(i.Uuid)),
			(this.IsReferenceNode = !!e),
			(this.OverrideNodeUuid = i.OverrideCommonUuid),
			(this.IsOverrideNode = !!i.OverrideCommonUuid),
			this.IsReferenceNode)
		) {
			let i = this.Owner.GetNodeByUuid(e);
			(i = i || new AiStateMachineBase(t, void 0, this.Owner.GetNodeData(e))),
				(this.MBn = i),
				this.Owner.RegisterNode(this);
		} else {
			if (
				((this.TakeControlType = i.TakeControlType),
				(this.BindStates = []),
				(this.OnEnterActions = []),
				(this.OnExitActions = []),
				i.Task &&
					(this.Task =
						ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateTask(
							this,
							i.Task,
						)),
				i.BindStates?.length)
			)
				for (const t of i.BindStates) {
					var o =
						ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateState(
							this,
							t,
						);
					o && this.BindStates.push(o);
				}
			if (i.OnEnterActions?.length)
				for (const t of i.OnEnterActions) {
					var n =
						ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateAction(
							this,
							t,
						);
					n && this.OnEnterActions.push(n);
				}
			if (i.OnExitActions?.length)
				for (const t of i.OnExitActions) {
					var s =
						ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateAction(
							this,
							t,
						);
					s && this.OnExitActions.push(s);
				}
			if (i.Children?.length) {
				(this.Children = []), (this.ChildrenMap = new Map());
				var a = i.Children.length;
				for (let e = 0; e < a; e++) {
					var r = new AiStateMachineBase(
						t,
						this,
						this.Owner.GetNodeData(i.Children[e]),
					);
					this.Children.push(r),
						this.ChildrenMap.set(r.Name, r),
						this.AddStateInstance(r.Name, r);
				}
			}
			if (i.Transitions)
				for (const t of i.Transitions) {
					var h,
						d,
						C = this.Owner.GetNodeByUuid(t.From);
					C
						? (h = this.Owner.GetNodeByUuid(t.To))
							? (d = new AiStateMachineTransition_1.AiStateMachineTransition(
									C,
									t,
								))
								? ((this.HasTaskFinishCondition ||= d.HasTaskFinishCondition),
									C.TransitionMap || (C.TransitionMap = new Map()),
									C.TransitionMap.set(h.Uuid, d))
								: CombatDebugController_1.CombatDebugController.CombatError(
										"StateMachineNew",
										this.Entity,
										"初始化状态机失败，条件创建失败",
										["node", this.Name],
										["from", C.Name],
										["to", h.Name],
									)
							: CombatDebugController_1.CombatDebugController.CombatError(
									"StateMachineNew",
									this.Entity,
									"初始化状态机失败，条件创建失败，to节点不存在",
									["node", this.Name],
									["to", t.To],
								)
						: CombatDebugController_1.CombatDebugController.CombatError(
								"StateMachineNew",
								this.Entity,
								"初始化状态机失败，条件创建失败，from节点不存在",
								["node", this.Name],
								["from", t.From],
							);
				}
			this.Owner.RegisterNode(this);
		}
	}
	get MappingNode() {
		var t;
		return (
			this.MBn ||
				((t = this.Owner.NodeReferenceMap.get(this.Uuid)),
				(this.MBn = this.Owner.GetNodeByUuid(t))),
			this.MBn
		);
	}
	get CurrentLeafNode() {
		return this.CurrentNode ? this.CurrentNode.CurrentLeafNode : this;
	}
	get RootNode() {
		return this.Root;
	}
	OnSwitchState(t, e) {
		this.Owner.SwitchStateFrequencyMonitor?.Execute(),
			(t = t ? `[${t?.Name}|${t?.Uuid}]` : "进入"),
			(e = e ? `[${e?.Name}|${e?.Uuid}]` : "退出"),
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"StateMachineNew",
				this.Entity,
				`状态机切换 [${this.Name}|${this.Uuid}] : ${t} => ` + e,
				["主控", this.ActorComponent.IsAutonomousProxy],
			);
	}
	OnClear() {
		if (this.TransitionMap && 0 < this.TransitionMap.size)
			for (var [, t] of this.TransitionMap) t.Clear();
		if (this.BindStates && 0 < this.BindStates.length)
			for (const t of this.BindStates) t.Clear();
		if (this.OnEnterActions && 0 < this.OnEnterActions.length)
			for (const t of this.OnEnterActions) t.Clear();
		if (this.OnExitActions && 0 < this.OnExitActions.length)
			for (const t of this.OnExitActions) t.Clear();
		this.Task?.Clear(),
			(this.Task = void 0),
			(this.AiComponent = void 0),
			(this.TagComponent = void 0),
			(this.AttributeComponent = void 0),
			(this.SkillComponent = void 0),
			(this.ActorComponent = void 0),
			(this.BuffComponent = void 0),
			(this.MontageComponent = void 0),
			(this.AnimationComponent = void 0),
			(this.GameplayCueComponent = void 0),
			(this.MoveComponent = void 0),
			(this.FightStateComponent = void 0),
			(this.AiController = void 0),
			(this.SummonerAiController = void 0),
			(this.OnEnterActions = void 0),
			(this.OnExitActions = void 0),
			(this.BindStates = void 0),
			(this.TransitionMap = void 0),
			(this.Children = void 0),
			(this.ChildrenMap = void 0);
	}
	OnActivate(t, e = !1, i = 0) {
		if (this.IsReferenceNode) this.MappingNode.ActiveByReferenceNode(this.Uuid);
		else {
			if (
				((this.ElapseTime = i),
				(this.SkillEnd = !1),
				(this.TaskFinish = !1),
				(this.ExecutedAction = !1),
				(this.jre = !1),
				this.TransitionMap)
			)
				for (var [, o] of this.TransitionMap) o.Enter();
			this.HasTaskFinishCondition &&
				this.Owner.ForceDisableAnimOptimization &&
				this.AnimationComponent.StartForceDisableAnimOptimization(2),
				this.Task &&
					!this.Task.CanBeInterrupt &&
					(this.Task.OnActivate(),
					this.Owner.SetCurrentTaskNode(this),
					(this.Hre = this.FightStateComponent?.TrySwitchState(8, 0, e)));
			for (const e of this.BindStates) e.OnActivate(t);
		}
	}
	Wre() {
		this.Hre && this.FightStateComponent?.ConfirmState(this.Hre),
			this.CurrentNode && this.CurrentNode.Wre();
	}
	OnDeactivate(t) {
		if (this.IsReferenceNode)
			this.MappingNode.DeactiveByReferenceNode(this.Uuid);
		else {
			if (
				((this.ElapseTime = 0),
				(this.SkillEnd = !1),
				(this.TaskFinish = !1),
				(this.ExecutedAction = !1),
				this.TransitionMap)
			)
				for (var [, e] of this.TransitionMap) e.Exit();
			this.HasTaskFinishCondition &&
				(this.AnimationComponent.CancelForceDisableAnimOptimization(2),
				(this.Owner.ForceDisableAnimOptimization = !1)),
				this.Task &&
					(this.Task.OnDeactivate(),
					this.Owner.RemoveCurrentTaskNode(this),
					void 0 !== this.Hre
						? (this.FightStateComponent?.ExitState(this.Hre),
							(this.Hre = void 0))
						: CombatDebugController_1.CombatDebugController.CombatWarn(
								"StateMachineNew",
								this.Entity,
								"状态机退出主状态Handle清理失败",
								["node", this.Name],
							));
			for (const e of this.BindStates) e.OnDeactivate(t);
		}
	}
	OnEnter(t) {
		if (!this.IsReferenceNode) {
			var e,
				i = this.RootNode.Uuid;
			this.Task &&
				(((e = Protocol_1.Aki.Protocol.QNn.create())._kn =
					Protocol_1.Aki.Protocol.DGs.Proto_BT_Task),
				(e.ukn = i),
				(e.ckn = this.Uuid),
				(i = CombatMessage_1.CombatNet.Call(
					13713,
					this.Entity,
					e,
					(t) => {
						t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
							CombatDebugController_1.CombatDebugController.CombatWarn(
								"StateMachineNew",
								this.Entity,
								`FsmStateBehaviorRequest 节点Task行为失败 [${this.Name}|${this.Uuid}]`,
								["ErrorCode", t.lkn],
							);
					},
					this.RootNode.CurrentMessageIdCache,
					void 0,
					void 0,
					!0,
				)),
				this.Task.OnEnter(i),
				CombatMessage_1.CombatNet.RemovePendingCall(i));
			for (const t of this.OnEnterActions) t.DoAction();
			for (const e of this.BindStates) e.OnEnter(t);
			this.ActorComponent.IsAutonomousProxy && (this.ExecutedAction = !0);
		}
	}
	OnExit(t) {
		if (!this.IsReferenceNode) {
			this.Task?.OnExit();
			for (const t of this.OnExitActions) t.DoAction();
			for (const e of this.BindStates) e.OnExit(t);
		}
	}
	OnTick(t) {
		if (!this.IsReferenceNode) {
			if (((this.ElapseTime += t), this.BindStates))
				for (const e of this.BindStates) e.Tick(t);
			if ((this.Task?.Tick(t), this.TransitionMap)) {
				for (var [, e] of this.TransitionMap) e.Tick();
				if (!this.jre)
					for (var [, i] of this.TransitionMap)
						!this.RootNode.WaitSwitchState &&
							i.CheckPredictionCondition() &&
							this.TrySwitch(i.To);
			}
		}
	}
	OnControl() {
		1 === this.TakeControlType
			? (this.OnEnter(),
				CombatDebugController_1.CombatDebugController.CombatInfo(
					"StateMachineNew",
					this.Entity,
					"接管控制权，节点重入，执行相关行为",
					["node", this.Name],
				))
			: (this.ExecutedAction
					? ((this.SkillEnd = !0),
						(this.TaskFinish = !0),
						CombatDebugController_1.CombatDebugController.CombatInfo(
							"StateMachineNew",
							this.Entity,
							"接管控制权，状态已执行行为，标记技能结束",
							["node", this.Name],
						))
					: (this.OnEnter(),
						CombatDebugController_1.CombatDebugController.CombatInfo(
							"StateMachineNew",
							this.Entity,
							"接管控制权，状态未执行行为，执行相关行为",
							["node", this.Name],
						)),
				this.CurrentNode && this.CurrentNode.OnControl());
	}
	ActiveByReferenceNode(t) {
		this.SBn || (this.SBn = new Set()),
			this.SBn.add(t),
			this.Activated || this.Enter();
	}
	DeactiveByReferenceNode(t) {
		this.SBn.delete(t), this.SBn && 0 === this.SBn.size && this.Exit();
	}
	ForceActive(t = !0) {
		var e;
		this.Parent
			? ((e = this.Parent).Activated || e.ForceActive(t),
				e.Switch(this.Name, t, !0, !1))
			: this.Enter(void 0, t, !0, !1);
	}
	TrySwitch(t) {
		const e = this.Owner.GetNodeByUuid(t);
		var i = Protocol_1.Aki.Protocol.INn.create();
		(i.ukn = this.RootNode.Uuid),
			(i.mkn = this.Uuid),
			(i.dkn = e.Uuid),
			(this.RootNode.WaitSwitchState = !0),
			(this.RootNode.LastState = this.CurrentLeafNode.Uuid),
			(this.RootNode.CurrentMessageIdCache = CombatMessage_1.CombatNet.Call(
				4409,
				this.Entity,
				i,
				(i) => {
					if (this.Owner?.Entity) {
						if (i.K0s.lkn === Protocol_1.Aki.Protocol.lkn.Sys)
							CombatDebugController_1.CombatDebugController.CombatInfo(
								"StateMachineNew",
								this.Entity,
								`客户端先行切换状态 成功 [${this.Name}|${this.Uuid}] => [${e?.Name}|${e?.Uuid}]`,
							),
								this.Wre();
						else if (
							(CombatDebugController_1.CombatDebugController.CombatWarn(
								"StateMachineNew",
								this.Entity,
								`客户端先行切换状态 失败 [${this.Name}|${this.Uuid}] => [${e?.Name}|${e?.Uuid}]`,
								["ErrorCode", i.K0s],
							),
							this.RootNode.RemoteSwitchPending)
						) {
							if (
								!(i = this.Owner.GetNodeByUuid(
									this.RootNode.RemoteSwitchPending,
								))
							)
								return;
							CombatDebugController_1.CombatDebugController.CombatWarn(
								"StateMachineNew",
								this.Entity,
								`切换远端搁置状态 [${i.Name}|${i.Uuid}]`,
							),
								(this.RootNode.CurrentMessageIdCache =
									this.RootNode.RemoteSwitchMessageId),
								i.ForceActive(!0),
								(this.RootNode.CurrentMessageIdCache = void 0),
								this.ActorComponent.IsAutonomousProxy &&
									(((i = Protocol_1.Aki.Protocol.TNn.create()).ukn =
										this.RootNode.Uuid),
									(i.ckn = t),
									CombatMessage_1.CombatNet.Call(28719, this.Entity, i));
						} else {
							if (!(i = this.Owner.GetNodeByUuid(this.RootNode.LastState)))
								return;
							CombatDebugController_1.CombatDebugController.CombatWarn(
								"StateMachineNew",
								this.Entity,
								`回退状态 [${i.Name}|${i.Uuid}]`,
							),
								i.ForceActive(!1),
								(i.jre = !0);
						}
						(this.RootNode.WaitSwitchState = !1),
							(this.RootNode.RemoteSwitchPending = void 0);
					} else
						CombatDebugController_1.CombatDebugController.CombatInfo(
							"StateMachineNew",
							this.Entity,
							`客户端先行切换状态 失败，实体已被销毁 [${this.Name}|${this.Uuid}] => [${e?.Name}|${e?.Uuid}]`,
						);
				},
				void 0,
			)),
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"StateMachineNew",
				this.Entity,
				"客户端先行切换状态",
				["from", this.Name],
				["to", e.Name],
			),
			this.Parent.Switch(e.Name, !0, !0, !0),
			(this.RootNode.CurrentMessageIdCache = void 0);
	}
	SetExecutedAction() {
		if ((this.Task?.OnExecuted(), this.BindStates?.length))
			for (const t of this.BindStates) t.OnExecuted();
		(this.ExecutedAction = !0),
			this.CurrentNode && this.CurrentNode.SetExecutedAction(),
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"StateMachineNew",
				this.Entity,
				"状态切换行为执行通知",
				["node", this.Name],
			);
	}
	HandleServerDebugInfo(t) {
		for (const e of t.ySs)
			this.TransitionMap.get(e.ISs)?.HandleServerDebugInfo(e.TSs);
	}
	OnCharSkillEnd(t) {
		this.Activated &&
			this.SkillId === t &&
			((this.SkillEnd = !0),
			(this.TaskFinish = !0),
			CombatDebugController_1.CombatDebugController.CombatInfo(
				"StateMachineNew",
				this.Entity,
				`监听技能完成 [${this.Name}]`,
			));
	}
	ToString(t, e, i = 0, o = !1, n = !1) {
		if (
			(this.WaitSwitchState && t.Append(">>> 等待服务器确认切换状态 <<<\n"),
			appendDepthSpace(t, i),
			t.Append(`${this.Name}|${this.Uuid}${this.Activated ? " <<<" : ""}\n`),
			this.TransitionMap && 0 < this.TransitionMap.size && this.Activated)
		) {
			for (var [s, a] of (e.Append(
				"-------------------------------------------------------------\n",
			),
			e.Append(
				`${this.Name} [持续时长:${(this.ElapseTime / 1e3).toFixed(1)}]\n`,
			),
			this.TransitionMap)) {
				appendDepthSpace(e, 1);
				var r = this.Owner.GetNodeByUuid(s);
				r
					? (e.Append(`目标：${r.Name} | ${r.Uuid}\n`),
						a.Condition.ToString(e, 2))
					: e.Append(`错误下标：${s}\n`);
			}
			e.Append(
				"-------------------------------------------------------------\n",
			);
		}
		var h = this.Children?.length;
		if (this.Children && h && 0 < h)
			for (let s = 0; s < h; s++) this.Children[s].ToString(t, e, i + 1, o, n);
	}
	GetCurrentStateString() {
		let t = this.Name;
		this.WaitSwitchState && (t = "[先行]" + t);
		var e = this.Children?.length ?? 0;
		for (let i = 0; i < e; i++)
			this.Children[i].Activated &&
				(t += "->" + this.Children[i].GetCurrentStateString());
		return t;
	}
}
exports.AiStateMachineBase = AiStateMachineBase;
