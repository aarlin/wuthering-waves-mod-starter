"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTaskSuccess = void 0);
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskSuccess extends LevelAiTask_1.LevelAiTask {
	constructor() {
		super(...arguments), (this.Cost = 0);
	}
	CreatePlanSteps(e, s) {
		e.SubmitCandidatePlanStep(this, s, this.Cost);
	}
}
exports.LevelAiTaskSuccess = LevelAiTaskSuccess;
