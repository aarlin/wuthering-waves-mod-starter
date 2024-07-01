"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiPlanInstance = exports.GetNextStepsContext = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	Time_1 = require("../../../Core/Common/Time"),
	LevelAiDefines_1 = require("./LevelAiDefines"),
	LevelAiPlan_1 = require("./LevelAiPlan"),
	LevelAiPlanner_1 = require("./LevelAiPlanner");
class GetNextStepsContext {
	constructor(e, t, i) {
		(this.IIe = e), (this.IsExecutingPlan = t), (this.TIe = i), (this.LIe = 0);
	}
	SubmitPlanStep(e) {
		this.TIe.push(e), ++this.LIe;
	}
	AddNextStepsAfter(e) {
		if (!this.IIe.HasLevel(e.LevelIndex)) return 0;
		var t = this.LIe,
			i = this.IIe.Levels[e.LevelIndex];
		for (let r = e.StepIndex + 1; r < i.Steps.length; ++r) {
			var s = i.Steps[r],
				n = new LevelAiPlan_1.LevelAiPlanStepId(e.LevelIndex, r);
			if ((s.Node.GetNextSteps(this, n), 0 < this.LIe - t)) return this.LIe - t;
		}
		return i.ParentStepId.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)
			? this.LIe - t
			: this.AddNextStepsAfter(i.ParentStepId);
	}
	GetNumSubmittedSteps() {
		return this.LIe;
	}
	GetStep(e) {
		return this.IIe.GetStep(e);
	}
}
exports.GetNextStepsContext = GetNextStepsContext;
class LevelAiPlanInstance {
	constructor() {
		(this.DIe = 0),
			(this.RIe = void 0),
			(this.UIe = new Array()),
			(this.AIe = new Array()),
			(this.PIe = new Array()),
			(this.xIe = void 0),
			(this.wIe = void 0),
			(this.BIe = !1),
			(this.kC = !0),
			(this.bIe = void 0),
			(this.qIe = (e, t) => {
				var i;
				this.RIe &&
					e === this.wIe &&
					((i = e.WasCanceled),
					e.Clear(),
					(this.wIe = void 0),
					i
						? this.Stop()
						: 1 === this.DIe &&
							(t
								? this.GIe(t) ||
									(Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"LevelAi",
											30,
											"[OnPlanningTaskFinished] 执行规划失败",
										),
									this.Stop())
								: (Log_1.Log.CheckDebug() &&
										Log_1.Log.Debug(
											"LevelAi",
											30,
											"[OnPlanningTaskFinished] 没有有效的规划",
										),
									this.Stop())));
			});
	}
	Initialize(e) {
		this.RIe = e;
	}
	IsPlanning() {
		return void 0 !== this.wIe;
	}
	HasPlan() {
		return void 0 !== this.xIe && this.BIe;
	}
	HasActiveTasks() {
		return 0 < this.UIe.length || 0 < this.AIe.length || 0 < this.PIe.length;
	}
	HasActivePlan() {
		return this.HasPlan() && this.HasActiveTasks();
	}
	CanLoop() {
		return this.kC && !this.RIe.Paused;
	}
	Start() {
		1 === this.DIe
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("LevelAi", 30, "[Start] 执行中，忽略开始调用")
			: ((this.DIe = 1),
				(this.bIe = void 0),
				this.NIe(),
				this.CancelActivePlanning(),
				this.OIe());
	}
	Tick(e) {
		1 !== this.DIe || this.HasActivePlan() || this.IsPlanning() || this.OIe(),
			1 === this.DIe &&
				!this.HasActivePlan() &&
				this.IsPlanning() &&
				this.wIe.DoPlanning(),
			this.HasActivePlan() && this.kIe(e);
	}
	Stop() {
		1 !== this.DIe
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("LevelAi", 30, "[Stop] 未执行，忽略停止调用")
			: (this.CancelActivePlanning(), this.AbortCurrentPlan());
	}
	Pause() {
		1 !== this.DIe
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("LevelAi", 30, "[Pause] 未执行，忽略Pause调用")
			: (!this.IsPlanning() && this.HasActiveTasks() && (this.bIe = this.xIe),
				this.CancelActivePlanning(),
				this.AbortCurrentPlan());
	}
	Resume() {
		1 === this.DIe
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("LevelAi", 30, "[Resume] 执行中，忽略Resume调用")
			: ((this.DIe = 1),
				this.NIe(),
				this.CancelActivePlanning(),
				this.FIe() ? this.GIe(this.bIe) : this.OIe(),
				(this.bIe = void 0));
	}
	RecheckCurrentPlan() {
		let e;
		for (
			this.BIe
				? (e = this.UIe.concat())
				: ((e = new Array()),
					this.VIe(e, new LevelAiPlan_1.LevelAiPlanStepId(0), !1));
			0 < e.length;
		) {
			var t = e.pop();
			if (!this.HIe(t, !1, !0)) return !1;
		}
		return !0;
	}
	RePlan() {
		1 !== this.DIe
			? Log_1.Log.CheckDebug() &&
				Log_1.Log.Debug("LevelAi", 30, "[RePlan] 未执行，忽略RePlan调用")
			: (this.AbortCurrentPlan(), this.IsPlanning() || this.OIe());
	}
	AbortCurrentPlan() {
		if (this.HasPlan()) {
			for (let t = this.AIe.length - 1; 0 <= t; --t) {
				var e = this.AIe[t];
				this.AIe.splice(t, 1), this.jIe(e, 2);
			}
			if (0 < this.UIe.length)
				for (let e = this.UIe.length - 1; 0 <= e; --e) this.WIe(this.UIe[e]);
			else this.KIe();
		}
	}
	CancelActivePlanning() {
		this.IsPlanning() &&
			(this.wIe.CancelPlanning(), this.wIe) &&
			(this.wIe.Clear(), (this.wIe = void 0));
	}
	OIe() {
		this.IsPlanning()
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("LevelAi", 30, "[StartPlanning] 规划中，重复调用")
			: this.RIe &&
				this.RIe.GetCurrentLevelAiAsset() &&
				((this.wIe = new LevelAiPlanner_1.LevelAiPlanner()),
				this.wIe.SetUp(this.RIe.GetCurrentLevelAiAsset(), this.RIe),
				(this.wIe.OnPlanningFinished = this.qIe),
				this.wIe.StartPlanning());
	}
	GIe(e) {
		return (
			!!e &&
			!(
				!this.RIe ||
				!this.RIe.GetCurrentLevelAiAsset() ||
				(LevelAiDefines_1.LEVEL_AI_DEBUG_MODE &&
					Log_1.Log.CheckDebug() &&
					Log_1.Log.Debug("LevelAi", 30, "Start Execute Plan"),
				this.QIe(e),
				this.RecheckCurrentPlan()
					? ((e =
							0 < this.VIe(this.AIe, new LevelAiPlan_1.LevelAiPlanStepId(0))),
						(this.BIe = !0),
						e ? this.XIe() : this.$Ie(),
						0)
					: (this.NIe(), 1))
			)
		);
	}
	XIe() {
		var e = this.AIe[0];
		void 0 !== e && (this.AIe.splice(0, 1), this.YIe(e));
	}
	YIe(e) {
		if (!this.HasPlan())
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelAi", 30, "[StartExecuteTask] 当前没有规划"),
				1
			);
		var t = this.xIe.GetStep(e).Node;
		if (!t)
			return (
				Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelAi", 30, "[StartExecuteTask] 执行了非Task节点"),
				1
			);
		LevelAiDefines_1.LEVEL_AI_DEBUG_MODE &&
			Log_1.Log.CheckDebug() &&
			Log_1.Log.Debug("LevelAi", 30, "Start Execute Task");
		var i = new Array();
		this.JIe(i, e);
		for (let t = i.length - 1; 0 <= t; --t) {
			var s = i[t];
			if (!this.zIe(s, 2)) return this.jIe(e, 2), this.AbortCurrentPlan(), 1;
			this.ZIe(s);
		}
		this.UIe.push(e);
		var n = t.WrappedExecuteTask();
		return 3 !== n && this.OnTaskFinished(t, e, n), n;
	}
	kIe(e) {
		this.XIe();
		var t = (t) =>
			this.HIe(t, !0, !1)
				? (this.eTe(t).WrappedTickTask(e), !0)
				: (this.AbortCurrentPlan(), !1);
		for (const e of this.UIe.concat())
			if (this.UIe.includes(e) && !t(e)) return;
	}
	HIe(e, t, i) {
		var s = t || i,
			n = new Array();
		this.tTe(n, e);
		for (let e = n.length - 1; 0 <= e; --e) {
			var r = n[e];
			if (s && !this.zIe(r, i ? 1 : 2)) return !1;
		}
		return !0;
	}
	WIe(e) {
		var t = this.eTe(e),
			i = this.UIe.indexOf(e);
		2 !== (i = (this.UIe.splice(i, 1), this.UIe.push(e), t.WrappedAbortTask()))
			? Log_1.Log.CheckError() &&
				Log_1.Log.Error("LevelAi", 30, "[AbortExecutingPlanStep] 失败")
			: 2 === i && this.OnTaskFinished(t, e, i);
	}
	OnTaskFinished(e, t, i) {
		e
			? this.HasPlan()
				? (e.WrappedOnTaskFinished(i),
					this.iTe(t, i),
					0 === i && this.VIe(this.AIe, t),
					this.jIe(t, i),
					(e = this.UIe.indexOf(t)),
					this.UIe.splice(e, 1),
					0 === i
						? this.HasActiveTasks() || this.$Ie()
						: 2 === i
							? ((e = this.UIe.indexOf(t)),
								this.PIe.splice(e, 1),
								this.HasActiveTasks() || this.KIe())
							: this.AbortCurrentPlan())
				: Log_1.Log.CheckError() &&
					Log_1.Log.Error("LevelAi", 30, "[OnTaskFinished] Plan无效")
			: Log_1.Log.CheckError() &&
				Log_1.Log.Error("LevelAi", 30, "[OnTaskFinished] Task无效");
	}
	NotifyEventBasedDecoratorCondition(e, t) {
		return (
			!!this.HasActivePlan() &&
			!t &&
			(e.PrintDescription(
				"[NotifyEventBasedDecoratorCondition] Decorator通知RePlan",
			),
			this.RePlan(),
			!0)
		);
	}
	iTe(e, t) {
		var i, s, n;
		0 === this.UIe.length ||
			((i = (s = this.xIe.Levels[e.LevelIndex]).ParentStepId),
			(s = 0 === t && e.StepIndex === s.Steps.length - 1),
			i.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) ||
			((n = this.xIe.GetStep(i)).Node &&
				n.Node.OnSubLevelStepFinished(this, i, e, t, s) &&
				this.iTe(i, t));
	}
	KIe() {
		this.CanLoop() ? (this.DIe = 1) : (this.DIe = 3), this.NIe();
	}
	$Ie() {
		this.CanLoop() ? (this.DIe = 1) : (this.DIe = 2), this.NIe();
	}
	QIe(e) {
		if (this.xIe)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelAi",
					30,
					"[OnPlanningTaskFinished] 初始化规划失败，当前规划正在运行",
				);
		else {
			this.xIe = e;
			for (const e of this.xIe.Levels)
				for (const t of e.Steps) {
					t.SubNodesInfo.SubDecorators.length = 0;
					for (const e of t.Node.Decorators)
						t.SubNodesInfo.SubDecorators.push(e);
				}
		}
	}
	NIe() {
		if (this.xIe) {
			for (const e of this.xIe.Levels)
				for (const t of e.Steps) t.SubNodesInfo.SubDecorators.length = 0;
			this.xIe = void 0;
		}
		(this.UIe.length = 0),
			(this.AIe.length = 0),
			(this.PIe.length = 0),
			(this.BIe = !1);
	}
	eTe(e) {
		return this.xIe.GetStep(e).Node;
	}
	VIe(e, t, i = !0) {
		return (
			(i = new GetNextStepsContext(this.xIe, i, e)).AddNextStepsAfter(t),
			i.GetNumSubmittedSteps()
		);
	}
	JIe(e, t) {
		if (this.xIe && this.xIe.HasStep(t)) {
			let n = t;
			for (;;) {
				var i = this.xIe.Levels[n.LevelIndex],
					s = i.Steps[n.StepIndex];
				if (
					s.SubNodesInfo.SubNodesExecuting ||
					(e.push(s.SubNodesInfo), !(0 < n.LevelIndex))
				)
					break;
				n = i.ParentStepId;
			}
		}
	}
	tTe(e, t) {
		if (this.xIe && this.xIe.HasStep(t)) {
			let n = t;
			for (;;) {
				var i = this.xIe.Levels[n.LevelIndex],
					s = i.Steps[n.StepIndex];
				if (
					!(
						s.SubNodesInfo.LastFrameSubNodesTicked !== Time_1.Time.Frame &&
						(e.push(s.SubNodesInfo), 0 < n.LevelIndex)
					)
				)
					break;
				n = i.ParentStepId;
			}
		}
	}
	oTe(e, t) {
		if (this.xIe && this.xIe.HasStep(t)) {
			let n = t;
			for (;;) {
				var i = this.xIe.Levels[n.LevelIndex],
					s = i.Steps[n.StepIndex];
				if (s.SubNodesInfo.SubNodesExecuting) {
					e.push(s.SubNodesInfo);
					let t = !0;
					for (const e of this.AIe)
						(e.LevelIndex === n.LevelIndex && e.StepIndex <= n.StepIndex) ||
							(this.xIe.HasStep(e, n.LevelIndex) && (t = !1));
					if (t && 0 < n.LevelIndex) {
						n = i.ParentStepId;
						continue;
					}
				}
				break;
			}
		}
	}
	rTe(e, t) {
		if (this.xIe && this.xIe.HasStep(t)) {
			let n = t;
			for (;;) {
				var i = this.xIe.Levels[n.LevelIndex],
					s = i.Steps[n.StepIndex];
				if (
					!(
						s.SubNodesInfo.SubNodesExecuting &&
						(e.push(s.SubNodesInfo), 0 < n.LevelIndex)
					)
				)
					break;
				n = i.ParentStepId;
			}
		}
	}
	zIe(e, t) {
		if (!this.xIe) return !1;
		for (const i of e.SubDecorators)
			if (0 === i.WrappedCheckCondition(t)) return !1;
		return !0;
	}
	ZIe(e) {
		var t;
		if (e.SubNodesExecuting)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelAi",
					30,
					"[StartSubNodesInSubNodeGroup] 错误的调用，子节点执行中",
				);
		else {
			e.SubNodesExecuting = !0;
			for (const i of e.SubDecorators) (t = i) && t.WrappedExecutionStart();
		}
	}
	jIe(e, t) {
		var i = new Array();
		switch (t) {
			case 0:
				this.oTe(i, e);
				break;
			case 1:
			case 2:
				this.rTe(i, e);
				break;
			case 3:
				Log_1.Log.CheckError() &&
					Log_1.Log.Error(
						"LevelAi",
						30,
						"[FinishSubNodesAtPlanStep] 错误的调用，结束时节点状态为InProgress",
					);
		}
		for (const e of i) this.nTe(e, t);
	}
	nTe(e, t) {
		if (e.SubNodesExecuting) {
			e.SubNodesExecuting = !1;
			var i,
				s = e.SubDecorators;
			for (let e = s.length - 1; 0 <= e; --e)
				(i = s[e]) && i.WrappedExecutionFinish(t);
		} else
			Log_1.Log.CheckError() &&
				Log_1.Log.Error(
					"LevelAi",
					30,
					"[FinishSubNodesInSubNodeGroup] 错误的调用，子节点非执行中",
				);
	}
	FindActiveTaskInfo(e) {
		var t;
		if (this.HasActivePlan())
			return (
				(t = void 0),
				(t =
					(t = this.UIe.find((t) => e === this.eTe(t))) ||
					this.PIe.find((t) => e === this.eTe(t)))
					? { PlanInstance: this, PlanStepId: t }
					: void 0
			);
	}
	FindActiveDecoratorInfo(e) {
		if (this.HasActivePlan()) {
			const s = new Array();
			var t,
				i = (t) => {
					(s.length = 0), this.xIe.GetSubNodesAtPlanStep(t, s);
					for (const t of s) for (const i of t.SubDecorators) return i === e;
					return !1;
				};
			return (t = this.UIe.find(i)) || (t = this.PIe.find(i))
				? { PlanInstance: this, PlanStepId: t }
				: void 0;
		}
	}
	FIe() {
		return void 0 !== this.bIe;
	}
}
exports.LevelAiPlanInstance = LevelAiPlanInstance;
