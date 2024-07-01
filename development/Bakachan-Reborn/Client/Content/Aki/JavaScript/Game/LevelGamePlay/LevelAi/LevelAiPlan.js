"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiPlan =
		exports.LevelAiPlanLevel =
		exports.LevelAiPlanStep =
		exports.SubNodesInfo =
		exports.LevelAiPlanStepId =
			void 0);
const Log_1 = require("../../../Core/Common/Log");
class LevelAiPlanStepId {
	constructor(e = -1, t = -1) {
		(this.LevelIndex = e), (this.StepIndex = t);
	}
	Reset() {
		(this.LevelIndex = -1), (this.StepIndex = -1);
	}
	CopyFrom(e) {
		(this.LevelIndex = e.LevelIndex), (this.StepIndex = e.StepIndex);
	}
	Equal(e) {
		return this.LevelIndex === e.LevelIndex && this.StepIndex === e.StepIndex;
	}
	static Equal(e, t) {
		return e.LevelIndex === t.LevelIndex && e.StepIndex === t.StepIndex;
	}
}
(exports.LevelAiPlanStepId = LevelAiPlanStepId).None = new LevelAiPlanStepId(
	-1,
	-1,
);
class SubNodesInfo {
	constructor() {
		(this.SubDecorators = new Array()),
			(this.LastFrameSubNodesTicked = -1),
			(this.SubNodesExecuting = !1);
	}
}
exports.SubNodesInfo = SubNodesInfo;
class LevelAiPlanStep {
	constructor(e, t, s = 0, l = -1) {
		(this.Node = e),
			(this.WorldState = t),
			(this.SubNodesInfo = new SubNodesInfo()),
			(this.SubLevelIndex = l),
			(this.Cost = Math.max(0, s));
	}
}
exports.LevelAiPlanStep = LevelAiPlanStep;
class LevelAiPlanLevel {
	constructor(e, t = LevelAiPlanStepId.None) {
		(this.Steps = new Array()),
			(this.WorldStateAtLevelStart = e),
			(this.RootSubNodesInfo = new SubNodesInfo()),
			(this.ParentStepId = new LevelAiPlanStepId()),
			this.ParentStepId.CopyFrom(t),
			(this.Cost = 0);
	}
	MakeCopy() {
		var e = new LevelAiPlanLevel(
			this.WorldStateAtLevelStart,
			this.ParentStepId,
		);
		e.Steps.length = this.Steps.length;
		for (let t = 0; t < this.Steps.length; ++t) e.Steps[t] = this.Steps[t];
		return (e.Cost = this.Cost), e;
	}
}
exports.LevelAiPlanLevel = LevelAiPlanLevel;
class LevelAiPlan {
	constructor(e, t) {
		(this.Levels = new Array()),
			(this.yIe = e),
			t && this.Levels.push(new LevelAiPlanLevel(t)),
			(this.Cost = 0);
	}
	HasLevel(e) {
		return e < this.Levels.length && void 0 !== this.Levels[e];
	}
	HasStep(e, t = 0) {
		var s;
		return (
			!(!this.HasLevel(e.LevelIndex) || !this.HasLevel(t)) &&
			(e.LevelIndex === t
				? ((s = this.Levels[t]),
					e.StepIndex < s.Steps.length && void 0 !== s.Steps[e.StepIndex])
				: 0 !== e.LevelIndex &&
					this.HasStep(this.Levels[e.LevelIndex].ParentStepId, t))
		);
	}
	GetStep(e) {
		if (e) {
			var t = this.Levels[e.LevelIndex];
			if (t) return t.Steps[e.StepIndex];
		}
	}
	IsComplete() {
		for (let e = 0; e < this.Levels.length; ++e)
			if (!this.IsLevelComplete(e)) return !1;
		return !0;
	}
	IsLevelComplete(e) {
		var t;
		return !(
			!this.HasLevel(e) ||
			0 === (e = this.Levels[e]).Steps.length ||
			((t = e.Steps.length - 1),
			(t = -1 !== (e = e.Steps[t]).SubLevelIndex) ||
			(void 0 !== e.Node && !e.Node.PlanNextNodesAfterThis)
				? t && !this.IsLevelComplete(e.SubLevelIndex)
				: 0 !== e.Node.NextNodes.length)
		);
	}
	FindStepToAddAfter(e) {
		for (let s = this.Levels.length - 1; 0 <= s; --s) {
			var t;
			if (!this.IsLevelComplete(s))
				return (
					(t = this.Levels[s]),
					(e.LevelIndex = s),
					(e.StepIndex = t.Steps.length ? t.Steps.length - 1 : -1),
					!0
				);
		}
		return e.Reset(), !1;
	}
	GetNextNodes(e) {
		var t,
			s = this.Levels[e.LevelIndex];
		return -1 === e.StepIndex
			? s.ParentStepId.Equal(LevelAiPlanStepId.None)
				? this.yIe.StartNodes.values()
				: (t = this.GetStep(s.ParentStepId))
					? t.Node.NextNodes.values()
					: void (
							Log_1.Log.CheckError() &&
							Log_1.Log.Error("LevelAi", 30, "子层的父节点未定义")
						)
			: s.Steps[e.StepIndex].Node.NextNodes.values();
	}
	GetWorldState(e) {
		var t = this.Levels[e.LevelIndex];
		return -1 === e.StepIndex
			? t.WorldStateAtLevelStart
			: t.Steps[e.StepIndex].WorldState;
	}
	MakeCopy() {
		var e = new LevelAiPlan(this.yIe, void 0);
		e.Levels.length = this.Levels.length;
		for (let t = 0; t < this.Levels.length; ++t)
			e.Levels[t] = this.Levels[t].MakeCopy();
		return (e.Cost = this.Cost), e;
	}
	GetSubNodesAtPlanStep(e, t) {
		if (this.HasStep(e)) {
			let n = e;
			for (;;) {
				var s = this.Levels[n.LevelIndex],
					l = s.Steps[n.StepIndex];
				if (
					(t.push(l.SubNodesInfo),
					t.push(s.RootSubNodesInfo),
					!(0 < n.LevelIndex))
				)
					break;
				n = s.ParentStepId;
			}
		}
	}
}
exports.LevelAiPlan = LevelAiPlan;
