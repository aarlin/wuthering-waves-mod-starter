"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTaskLeisureInteract = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
	IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
	LevelAiTask_1 = require("../LevelAiTask"),
	LevelAiTaskSitDown_1 = require("./LevelAiTaskSitDown");
class LevelAiTaskLeisureInteract extends LevelAiTask_1.LevelAiTask {
	constructor() {
		super(...arguments),
			(this.CanRecordPlanProgress = !1),
			(this.Cost = 0),
			(this.gU = !1);
	}
	MakePlanExpansions(e, t) {
		this.PrintDescription(
			"Leisure Interact Task Make Plan Expansions",
			["LevelIndex", e.CurrentLevelIndex],
			["StepIndex", e.CurrentStepIndex],
		),
			this.gU || this.Init(),
			this.CreatePlanSteps(e, t.MakeCopy());
	}
	Init() {
		if (!this.gU) {
			var e = this.Params;
			if (e) {
				let t;
				if (
					(e.Option.Type === IAction_1.ENpcLeisureInteract.SitDown
						? (t = new LevelAiTaskSitDown_1.LevelAiTaskSitDown()).Serialize(
								this.CharacterPlanComponent,
								this.CreatureDataComponent,
								this.Description + " SitDownTask",
								e,
							)
						: Log_1.Log.CheckWarn() &&
							Log_1.Log.Warn(
								"LevelAi",
								51,
								"[LevelAiTaskLeisureInteract] 未配置正确的行为类型",
								["PbDataId", this.CreatureDataComponent.GetPbDataId()],
							),
					t)
				) {
					if (this.NextNodes.length) {
						for (const e of this.NextNodes) t.NextNodes.push(e);
						this.NextNodes.length = 0;
					}
					this.NextNodes.push(t);
				}
				this.gU = !0;
			}
		}
	}
}
exports.LevelAiTaskLeisureInteract = LevelAiTaskLeisureInteract;
