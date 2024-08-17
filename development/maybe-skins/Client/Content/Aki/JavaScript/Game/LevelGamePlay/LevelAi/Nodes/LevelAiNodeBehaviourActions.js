"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiNodeBehaviourActions = void 0);
const LevelAiPlan_1 = require("../LevelAiPlan"),
	LevelAiRegistry_1 = require("../LevelAiRegistry"),
	LevelAiStandaloneNode_1 = require("../LevelAiStandaloneNode"),
	LevelAiTaskSuccess_1 = require("../Tasks/LevelAiTaskSuccess");
class LevelAiNodeBehaviourActions extends LevelAiStandaloneNode_1.LevelAiStandaloneNode {
	constructor() {
		super(...arguments),
			(this.Actions = void 0),
			(this.CanRecordPlanProgress = !1),
			(this.Cost = 0),
			(this.ITe = !1),
			(this.TTe = new LevelAiPlan_1.LevelAiPlanStepId());
	}
	MakePlanExpansions(e, t) {
		var i, s, n;
		void 0 !== this.Actions &&
			(this.PrintDescription(
				"Behaviour Actions Make Plan Expansions",
				["LevelIndex", e.CurrentLevelIndex],
				["StepIndex", e.CurrentStepIndex],
			),
			this.ITe || this.LTe(),
			this.CanRecordPlanProgress || this.TTe.Reset(),
			(i = (n = e.MakePlanCopyWithAddedStep()).PlanCopy),
			(s = n.OutAddedStep),
			(n = n.OutAddedStepId),
			(s.SubLevelIndex = e.AddLevel(i, n)),
			e.SubmitCandidatePlan(i));
	}
	GetNextSteps(e, t) {
		if (!this.TTe.Equal(LevelAiPlan_1.LevelAiPlanStepId.None)) {
			var i = this.TTe.LevelIndex,
				s = this.TTe.StepIndex;
			if ((e.IsExecutingPlan && this.TTe.Reset(), 0 <= i && 0 <= s))
				return void e.AddNextStepsAfter(
					new LevelAiPlan_1.LevelAiPlanStepId(i, s - 1),
				);
		}
		(i = e.GetStep(t)),
			e.AddNextStepsAfter(new LevelAiPlan_1.LevelAiPlanStepId(i.SubLevelIndex));
	}
	OnSubLevelStepFinished(e, t, i, s, n) {
		return 2 === s && this.TTe.CopyFrom(i), !0;
	}
	LTe() {
		var e = new LevelAiTaskSuccess_1.LevelAiTaskSuccess(),
			t =
				(e.Serialize(
					this.CharacterPlanComponent,
					this.CreatureDataComponent,
					this.Description,
				),
				(e.Cost = this.Cost),
				this.NextNodes.push(e),
				LevelAiRegistry_1.LevelAiRegistry.Instance());
		let i = e;
		for (let e = 0; e < this.Actions.length; ++e) {
			var s = this.Actions[e],
				n = new (t.FindTaskCtor(s.Name))();
			n.Serialize(
				this.CharacterPlanComponent,
				this.CreatureDataComponent,
				this.Description + " 任务" + e,
				s.Params,
			),
				i.NextNodes.push(n),
				(i = n);
		}
		this.ITe = !0;
	}
}
exports.LevelAiNodeBehaviourActions = LevelAiNodeBehaviourActions;
