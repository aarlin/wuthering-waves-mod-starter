"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiPlanner = exports.PlanningContext = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	PriorityQueue_1 = require("../../../Core/Container/PriorityQueue"),
	LevelAiPlan_1 = require("./LevelAiPlan");
class PlanningContext {
	constructor(e, t, i, n, s) {
		(this.sTe = void 0),
			(this.aTe = void 0),
			(this.hTe = void 0),
			(this.lTe = void 0),
			(this._Te = void 0),
			(this.sTe = e),
			(this.aTe = t),
			(this.hTe = i),
			(this.lTe = n),
			(this._Te = s);
	}
	get CurrentLevelIndex() {
		return this.lTe.LevelIndex;
	}
	get CurrentStepIndex() {
		return this.lTe.StepIndex;
	}
	MakePlanCopyWithAddedStep() {
		var e = this.hTe.MakeCopy(),
			t = e.Levels[this.lTe.LevelIndex],
			i = new LevelAiPlan_1.LevelAiPlanStep(this.aTe, this._Te);
		return {
			PlanCopy: e,
			OutAddedStep: i,
			OutAddedStepId: (t =
				(t.Steps.push(i),
				new LevelAiPlan_1.LevelAiPlanStepId(
					this.lTe.LevelIndex,
					t.Steps.length - 1,
				))),
		};
	}
	AddLevel(e, t = LevelAiPlan_1.LevelAiPlanStepId.None) {
		return e.Levels.push(new LevelAiPlan_1.LevelAiPlanLevel(this._Te, t)) - 1;
	}
	SubmitCandidatePlanStep(e, t, i) {
		var n = this.hTe.MakeCopy();
		e = new LevelAiPlan_1.LevelAiPlanStep(e, t, i);
		(t = n.Levels[this.lTe.LevelIndex]).Steps.push(e),
			(t.Cost += i),
			(n.Cost += i),
			this.SubmitCandidatePlan(n);
	}
	SubmitCandidatePlan(e) {
		this.sTe.SubmitCandidatePlan(e);
	}
}
exports.PlanningContext = PlanningContext;
class LevelAiPlanner {
	constructor() {
		(this.RIe = void 0),
			(this.uTe = void 0),
			(this.lTe = new LevelAiPlan_1.LevelAiPlanStepId()),
			(this.cTe = void 0),
			(this.mTe = void 0),
			(this.dTe = !1),
			(this.CTe = new PriorityQueue_1.PriorityQueue((e, t) => e.Cost - t.Cost)),
			(this.gTe = !1),
			(this.OnPlanningFinished = void 0);
	}
	get WasCanceled() {
		return this.dTe;
	}
	SetUp(e, t) {
		(this.RIe = t),
			(this.cTe = new LevelAiPlan_1.LevelAiPlan(
				e,
				this.RIe.WorldState.MakeCopy(),
			));
	}
	StartPlanning() {
		var e;
		this.gTe ||
			((e = this.cTe),
			this.Clear(),
			this.CTe.Push(e),
			(this.gTe = !0),
			this.DoPlanning());
	}
	CancelPlanning() {
		(this.dTe = !0), (this.mTe = void 0), (this.gTe = !1);
	}
	DoPlanning() {
		this.dTe ||
			((this.uTe = this.fTe()),
			void 0 === this.uTe
				? this.pTe()
				: this.uTe.IsComplete()
					? ((this.mTe = this.uTe), this.pTe())
					: this.vTe());
	}
	pTe() {
		this.MTe(),
			this.CTe.Clear(),
			this.OnPlanningFinished(this, this.mTe),
			(this.gTe = !1);
	}
	Clear() {
		this.MTe(), (this.cTe = void 0), this.CTe.Clear(), (this.mTe = void 0);
	}
	MTe() {
		(this.uTe = void 0), this.lTe.Reset();
	}
	fTe() {
		if (!this.CTe.Empty) return this.CTe.Pop();
	}
	vTe() {
		if (
			!this.uTe.FindStepToAddAfter(this.lTe) ||
			this.lTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)
		)
			Log_1.Log.CheckError() &&
				Log_1.Log.Error("LevelAi", 30, "没有未完成的任务层", [
					"Owner",
					this.RIe.GetCreatureDataComponent().GetPbDataId(),
				]);
		else {
			var e,
				t = this.uTe.GetNextNodes(this.lTe),
				i = this.uTe.GetWorldState(this.lTe);
			for (const n of t)
				(this.RIe.WorldStateProxy = i),
					LevelAiPlanner.STe(n) &&
						((e = new PlanningContext(this, n, this.uTe, this.lTe, i)),
						n.MakePlanExpansions(e, i));
			this.MTe();
		}
	}
	static STe(e) {
		return !!((e) => {
			let t = 1;
			for (const n of e)
				if (n) {
					var i = n.WrappedCheckCondition(0);
					if (1 !== (t = Math.min(t, i))) return !1;
				}
			return !0;
		})(e.Decorators);
	}
	SubmitCandidatePlan(e) {
		this.CTe.Push(e);
	}
}
exports.LevelAiPlanner = LevelAiPlanner;
