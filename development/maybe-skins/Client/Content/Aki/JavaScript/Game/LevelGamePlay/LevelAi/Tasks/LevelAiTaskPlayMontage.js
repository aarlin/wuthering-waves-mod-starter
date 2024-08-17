"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelAiTaskPlayMontage = void 0);
const BasePerformComponent_1 = require("../../../NewWorld/Character/Common/Component/BasePerformComponent"),
	LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskPlayMontage extends LevelAiTask_1.LevelAiTask {
	constructor() {
		super(...arguments),
			(this.bTe = 0),
			(this.qTe = !1),
			(this.GTe = !1),
			(this.NTe = 0),
			(this.OTe = 0),
			(this.kTe = !1);
	}
	ExecuteTask() {
		if (!(s = this.Params)) return 1;
		(this.NTe = s.LoopDuration ?? 0),
			(this.OTe = s.RepeatTimes ?? 0),
			(this.qTe = void 0 !== this.NTe && 0 !== this.NTe),
			(this.GTe = -1 === this.NTe || -1 === this.OTe);
		var e = this.CreatureDataComponent.Entity.GetComponent(37),
			t = new BasePerformComponent_1.PlayMontageConfig(
				this.OTe,
				this.NTe,
				this.qTe,
				this.GTe,
			),
			s = { IsAbp: s.IsAbpMontage, MontageId: s.MontageId };
		return (
			(this.kTe = !1),
			(this.bTe = e.LoadAndPlayMontageById(
				s,
				t,
				void 0,
				() => {
					this.kTe || this.FinishLatentTask(0);
				},
				() => !this.kTe,
			)),
			this.bTe < 0 ? 0 : 3
		);
	}
	AbortTask() {
		return (
			(this.kTe = !0),
			this.CreatureDataComponent.Entity.GetComponent(37).ClearAndStopMontage(
				this.bTe,
			),
			2
		);
	}
}
exports.LevelAiTaskPlayMontage = LevelAiTaskPlayMontage;
