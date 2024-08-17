"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiStandaloneNode = void 0);
const LevelAiNode_1 = require("./LevelAiNode");
class LevelAiStandaloneNode extends LevelAiNode_1.LevelAiNode {
	constructor() {
		super(...arguments),
			(this.PlanNextNodesAfterThis = !0),
			(this.NextNodes = new Array()),
			(this.Decorators = new Array());
	}
	MakePlanExpansions(e, t) {}
	GetNextSteps(e, t) {
		e.SubmitPlanStep(t);
	}
	OnSubLevelStepFinished(e, t, o, s, n) {
		return !0;
	}
}
exports.LevelAiStandaloneNode = LevelAiStandaloneNode;
