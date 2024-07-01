"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTask = void 0);
const LevelAiStandaloneNode_1 = require("./LevelAiStandaloneNode");
class LevelAiTask extends LevelAiStandaloneNode_1.LevelAiStandaloneNode {
	constructor() {
		super(...arguments),
			(this.NotifyTick = !1),
			(this.NotifyTaskFinished = !1),
			(this.Params = void 0);
	}
	Serialize(e, i, s, t) {
		super.Serialize(e, i, s), (this.Params = t);
	}
	MakePlanExpansions(e, i) {
		this.PrintDescription(
			"Task Make Plan Expansions",
			["LevelIndex", e.CurrentLevelIndex],
			["StepIndex", e.CurrentStepIndex],
		),
			this.CreatePlanSteps(e, i.MakeCopy());
	}
	WrappedExecuteTask() {
		return this.PrintDescription("Execute Task"), this.ExecuteTask();
	}
	WrappedAbortTask() {
		return this.PrintDescription("Abort Task"), this.AbortTask();
	}
	WrappedTickTask(e) {
		this.NotifyTick && this.TickTask(e);
	}
	WrappedOnTaskFinished(e) {
		this.NotifyTaskFinished &&
			(this.PrintDescription("Task Finished", ["Result", e]),
			this.OnTaskFinished(e));
	}
	CreatePlanSteps(e, i) {
		e.SubmitCandidatePlanStep(this, i, 0);
	}
	FinishLatentTask(e) {
		var i = this.CharacterPlanComponent.FindActiveTaskInfo(this);
		i && i.PlanInstance.OnTaskFinished(this, i.PlanStepId, e);
	}
	ExecuteTask() {
		return 0;
	}
	AbortTask() {
		return 2;
	}
	TickTask(e) {}
	OnTaskFinished(e) {}
}
exports.LevelAiTask = LevelAiTask;
